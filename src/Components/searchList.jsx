import React, { useContext, useEffect, useState } from 'react';
import axios from './axios';
import { searchContest } from '../Context/context';
import { jwtDecode } from 'jwt-decode';

const SearchList = () => {
    const data = useContext(searchContest);
    const [searchResults, setSearchResults] = useState([]);
    const token2 = localStorage.getItem('token');
    const decoded = jwtDecode(token2);
    const userId = decoded.id;
    const search = [...data].reverse();

    useEffect(() => {
        const fetchFollowStates = async () => {
            const token = localStorage.getItem('token');
            try {
                const { data } = await axios.get('/getFollowStates', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                const updatedResults = search.map((user) => ({
                    ...user,
                    isFollowed: data.following.includes(user._id), 
                }));
                setSearchResults(updatedResults);
                const filteredPosts = updatedResults.filter((user) => user._id !== userId);
                setSearchResults(filteredPosts);

            } catch (error) {
                console.error('Error fetching follow states:', error);
            }
        };

        fetchFollowStates();
    }, [userId, search]);

    const handleFollowToggle = async (id, isFollowed) => {
        const token = localStorage.getItem('token');
        try {
            if (isFollowed) {
                await axios.post('/unFollow', { unFollowUserId: id }, { headers: { Authorization: `Bearer ${token}` } });
            } else {
                await axios.post('/follow', { followUserId: id }, { headers: { Authorization: `Bearer ${token}` } });
            }
            setSearchResults((prevResults) => {
                return prevResults.map((result) =>
                    result._id === id ? { ...result, isFollowed: !isFollowed } : result
                );
            });



        } catch (error) {
            console.error('Error toggling follow status:', error);
            alert('There was an error toggling the follow status. Please try again.');
        }
    };

    return (
        <div className="sm:ml-72 text-white">
            <h2 className="text-3xl font-bold mb-8 text-center m-12">Search Results</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 px-4 mb-32">
                {searchResults.length === 0 ? (
                    <p className="text-center text-gray-300 text-2xl font-extrabold mt-20 mb-20">
                        No users found
                    </p>
                ) : (
                    searchResults.map((result) => (
                        <div
                            key={result._id}
                            className="bg-gray-900 p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col items-center text-center"
                        >
                            <img
                                src={result.ProfilePicture || '/user_png.png'}
                                alt={`${result.username}'s profile`}
                                className="w-24 h-24 rounded-full mb-4 object-cover border-4 border-gray-700"
                            />
                            <h3 className="text-xl font-semibold text-white">{result.username}</h3>
                            <div className="text-gray-400 text-sm mt-2">
                                <p className="mb-1">
                                    <span className="font-semibold text-gray-300">Followers:</span> {result.followers.length || 'None'}
                                </p>
                                <p>
                                    <span className="font-semibold text-gray-300">Following:</span> {result.following.length || 'None'}
                                </p>
                            </div>
                            <button
                                onClick={() => handleFollowToggle(result._id, result.isFollowed)}
                                className={`mt-4 px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                                    result.isFollowed ? 'bg-red-600 hover:bg-red-700' : 'bg-blue-600 hover:bg-blue-700'
                                }`}
                            >
                                {result.isFollowed ? 'Unfollow' : 'Follow'}
                            </button>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default SearchList;
