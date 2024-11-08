import React from "react";
import UserProfile from "../Components/UserProfile";
import Loading from "../Components/LoadingHocs";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "../Components/axios";

function Profile() {
  const UserProfileWithLoading = Loading(UserProfile);
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [userData, setUserData] = useState({
    name: "",
    image: "",
    Bio: "",
    followerCount: 0,
    followingCount: 0,
  });
  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");
      const decoded = jwtDecode(token);
      const userId = decoded.id;
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
          followerCount: response.data.followers,
          followingCount: response.data.following,
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchPostById = async () => {
      const token = localStorage.getItem("token");
      const decoded = jwtDecode(token);
      const userId = decoded.id;
      try {
        const response = await axios.get(`/getPostById/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setPosts(response.data);
        //console.log(response.data)
      } catch (error) {
        console.error("Error Fetching the posts", error);
      }
    };
    fetchPostById();
    fetchUserData();
  }, []);

  return (
    <div>
      <UserProfileWithLoading
        isLoading={loading}
        userData={userData}
        posts={posts}
      />
    </div>
  );
}

export default Profile;
