import { jwtDecode } from 'jwt-decode';
import { useEffect, useState } from 'react';
import axios from './axios';
import UserCard from './userCard';

const SearchList = ({ data }) => {
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [followActionLoading, setFollowActionLoading] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchFollowStates() {
      setLoading(true);
      setError('');
      try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('No authentication token found.');
        const decoded = jwtDecode(token);
        const userId = decoded?.id;
        if (!userId) throw new Error('Invalid token.');

        const { data: followData } = await axios.get('/getFollowStates', {
          headers: { Authorization: `Bearer ${token}` }
        });

        const results = [...data]
          .reverse()
          .filter(user => user._id !== userId)
          .map(user => ({
            ...user,
            isFollowed: followData?.following?.includes(user._id) || false
          }));

        setSearchResults(results);
      } catch (err) {
        setError(err?.response?.data?.message || err.message || 'An error occurred.');
      }
      setLoading(false);
    }
    fetchFollowStates();
  }, [data]);

  const handleFollowToggle = async (id, isFollowed) => {
  // Optimistically update UI
  setSearchResults(prev =>
    prev.map(user =>
      user._id === id ? { ...user, isFollowed: !isFollowed } : user
    )
  );
  setFollowActionLoading(id);

  try {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('No authentication token found.');
    const endpoint = isFollowed ? '/unFollow' : '/follow';
    const payload = isFollowed ? { unFollowUserId: id } : { followUserId: id };

    await axios.post(endpoint, payload, {
      headers: { Authorization: `Bearer ${token}` }
    });
  } catch (err) {
    // Revert UI on failure
    setSearchResults(prev =>
      prev.map(user =>
        user._id === id ? { ...user, isFollowed: isFollowed } : user
      )
    );
    alert('Error toggling follow status. Please try again.');
  }

  setFollowActionLoading(null);
};

  return (
    <div className="min-h-screen bg-gradient-to-br to-gray-800 py-8 px-2 sm:px-12">
      {error && (
        <div className="text-center p-4 rounded bg-red-800/80 text-white mb-8 font-bold shadow">
          {error}
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center h-60">
          <span className="text-lg text-gray-200 font-semibold animate-pulse">Loading users...</span>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {searchResults.length === 0 ? (
            <div className="col-span-full flex flex-col items-center py-20">
              <img className="w-28 mb-4 opacity-60" src="/user_png.png" alt="No Users" />
              <p className="text-gray-400 text-2xl font-bold">No users found</p>
            </div>
          ) : (
            searchResults.map(user => (
              <UserCard
                key={user._id}
                user={user}
                onToggleFollow={handleFollowToggle}
                followActionLoading={followActionLoading}
              />
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default SearchList;
