import React from "react";
import PostList from "../Components/PostList";
import LoadingHoc from "../Components/LoadingHocs";
import axios from "../Components/axios";
import { useEffect, useState, useCallback } from "react";

const PostListWithLoading = LoadingHoc(PostList);

function Home({ sendData }) {
  const [post, setPost] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get("/posts");
      const data = response.data;
      setPost(data);
      sendData(data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  }, [sendData]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <>
      <PostListWithLoading isLoading={loading} posts={post} />
    </>
  );
}

export default Home;
