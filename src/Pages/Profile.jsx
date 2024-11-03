import React from 'react'
import UserProfile from '../Components/UserProfile'
import Loading from '../Components/LoadingHocs';
import { useEffect, useState } from 'react';
import {jwtDecode} from 'jwt-decode';
import axios from '../Components/axios';

function Profile({posts}){
  const UserProfileWithLoading = Loading(UserProfile);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState('');
  const [userData, setUserData] = useState({
    
    name: '',
    image: '',
    Bio: '',
    followerCount: 0,
    followingCount: 0,
  });
  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');
      const decoded = jwtDecode(token);
      const userId = decoded.id;
      setUserId(userId);
      try {
        const response = await axios.get(`/getUserById/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response.data);
        setUserData({
          name: response.data.username,
          image: response.data.ProfilePicture,
          Bio: response.data.Bio,
          followerCount: response.data.followers,
          followingCount: response.data.following,
        });
        
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
      finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div>
      <UserProfileWithLoading isLoading={loading} userData={userData} posts={posts} user={userId} />
    </div>
  )
}

export default Profile
