import React, { useEffect, useState } from 'react';
import axios from '../Components/axios';
import {jwtDecode} from 'jwt-decode';

const Navbar = () => {
  const [userImage, setUserImage] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        const decoded = jwtDecode(token);
        const userId = decoded.id;
        try {
          const response = await axios.get(`/getUserById/${userId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setUserImage(response.data.ProfilePicture);
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
    };

    fetchUserData();
  }, []);

  return (
    <nav className="bg-gray-800 fixed w-full z-10 shadow-lg">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4 ml-24">
            <img
              className="h-10 w-10 rounded-full"
              src="/KnackX Logo.png"
              alt="Logo"
            />
            <h1 className="text-2xl font-bold text-indigo-400">KnackX</h1>
          </div>
          <img
            className="h-10 w-10 rounded-full border-2 border-indigo-400"
            src={userImage || '/default-profile.png'}
            alt="User Profile"
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
