import React, { useRef } from "react";
import UserProfile from "../Components/UserProfile";
import Loading from "../Components/LoadingHocs";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "../Components/axios";
import _ from 'lodash'


function Profile() {
  const UserProfileWithLoading = Loading(UserProfile);
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const postsRef = useRef(null);
  const Profile = useRef(null);
  const [userData, setUserData] = useState({
    name: "",
    image: "",
    Bio: "",
    followerCount: 0,
    followingCount: 0,
  });
  const dataHasChanged = (result) => {
    const hasChanged = !_.isEqual(postsRef.current,result)
    console.log("Data comparison for posts:", hasChanged,postsRef.current, result);
    return hasChanged;
  };
  const ProfileHasChanged = (result) => {
    const hasChanged = !_.isEqual(Profile.current,result);
    console.log("Data comparison for Profile:", hasChanged,Profile.current, result);
    return hasChanged;
  }
  useEffect(() => {
    const fetchUserDataAndPost = async () => {
      const token = localStorage.getItem("token");
      const decoded = jwtDecode(token);
      const userId = decoded.id;
      try {
        const response = await axios.get(`/getUserById/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!Profile.current || ProfileHasChanged(response.data)) {
          console.log("Profile Data is Fetched")
          Profile.current = response.data;
          setUserData({
            name: response.data.username,
            image: response.data.ProfilePicture,
            Bio: response.data.Bio,
            followerCount: response.data.followers,
            followingCount: response.data.following,
          });
        } else {
          console.log("Data is not fetched thanks UseRef")
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUserDataAndPost();
  }, []);
  useEffect(() => {
    const fetchPostById = async () => {
      setLoading(true);
      const token = localStorage.getItem("token");
      const decoded = jwtDecode(token);
      const userId = decoded.id;
      try {
        const response2 = await axios.get(`/getPostById/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const result = response2.data;
        if (!postsRef.current || dataHasChanged(result)) {
          console.log("posts are fetched or changed");
          postsRef.current = result;
          setPosts(result);
        } else {
          console.log("Not fetched again Thanks UseRef");
        }
      } catch (error) {
        console.error("Error Fetching the posts", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPostById();
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
