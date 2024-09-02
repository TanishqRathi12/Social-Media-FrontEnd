import React, { useEffect } from 'react';
import axios from '../Components/axios'
import {jwtDecode} from 'jwt-decode';
import { useState } from 'react';




const Navbar = () => {

    const [userImage, setUserImage] = useState('');

    useEffect(() => {
        const fetchUserData = async () => {
          const token = localStorage.getItem('token');
          const decoded = jwtDecode(token);
          const userId = decoded.id;
          try {
            const response = await axios.get(`/getUserById/${userId}`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
            setUserImage({
              image: response.data.ProfilePicture,
            });
          } catch (error) {
            console.error('Error fetching user data:', error);
          }
        };
    
        fetchUserData();
      }, []);
    return (
        <nav className="bg-gradient-to-r from-blue-500 to-indigo-600 fixed w-full z-10 shadow-lg">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="relative flex h-16 items-center justify-between">
                    <div className="flex flex-1 items-center justify-between">
                        <div className="flex justify-end">
                            <h1 className="ml-4 text-2xl font-extrabold text-white">Social Media App</h1>
                        </div>
                        <div className="flex items-center space-x-4">
                            <button 
                                type="button" 
                                className="relative rounded-full bg-white p-2 text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white transition-colors duration-300"
                            >
                                <svg 
                                    className="h-6 w-6" 
                                    fill="none" 
                                    viewBox="0 0 24 24" 
                                    stroke-width="1.5" 
                                    stroke="currentColor" 
                                    aria-hidden="true"
                                >
                                    <path 
                                        stroke-linecap="round" 
                                        stroke-linejoin="round" 
                                        d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" 
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                    <img className="h-12 w-12 ml-5 rounded-full" src={`${userImage.image}`} alt="Social Media Logo" />
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
