import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "../Components/axios";
import { jwtDecode } from "jwt-decode";

const UserProfile = () => {
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
      console.log(userId);
      try {
        const response = await axios.get(`/getUserById/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserData({
          name: response.data.username,
          image: response.data.ProfilePicture,
          Bio: response.data.Bio,
          followerCount: response.data.followerCount,
          followingCount: response.data.followingCount,
        });
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className="h-screen dark:bg-gray-800 bg-gray-200 pt-12">
      <h1 className="text-xl font-semibold text-center text-gray-800 pt-7 dark:text-white mb-8">
        Following and Followers feature coming soon globally!
      </h1>
      <div className="m-8 max-w-sm mx-auto bg-white dark:bg-gray-900 rounded-lg overflow-hidden shadow-lg">
        <div className="px-4 pb-6">
          <div className="text-center my-4">
            <img
              className="h-52 w-52 rounded-full border-4 border-white dark:border-gray-800 mx-auto"
              src={userData.image || "https://randomuser.me/api/portraits/women/21.jpg"}
              alt="User Profile"
            />
            <div className="py-2">
              <h3 className="font-bold text-2xl text-gray-800 dark:text-white mb-1">
                {userData.name || 'Cait Genevieve'}
              </h3>
              <p className="text-gray-700 dark:text-gray-400 mt-2">
                {userData.Bio || 'Nulla facilisi. Sed euismod justo id nunc tincidunt, sed lacinia nunc tincidunt. Nulla facilisi.'}
              </p>
            </div>
          </div>

          <div className="flex gap-2 px-2 justify-center mb-4">
            <button className="flex-1 rounded-full bg-green-600 dark:bg-green-800 text-white font-bold hover:bg-green-700 dark:hover:bg-green-900 px-4 py-2">
              Followers ({userData.followerCount})
            </button>
            <button className="flex-1 rounded-full bg-purple-600 dark:bg-purple-800 text-white font-bold hover:bg-purple-700 dark:hover:bg-purple-900 px-4 py-2">
              Following ({userData.followingCount})
            </button>
          </div>
          <div className="flex justify-center mt-4">
            <Link to="/EditUser">
              <button className="rounded-full bg-blue-600 dark:bg-blue-800 text-white font-bold hover:bg-blue-700 dark:hover:bg-blue-900 px-6 py-2">
                Edit Profile
              </button>
            </Link>
          </div>
        </div>
      </div>
      <div className="mt-8">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
          My Posts
        </h2>
        <div className="grid grid-cols-1 gap-4">
          {/* Posts will be displayed here */}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
