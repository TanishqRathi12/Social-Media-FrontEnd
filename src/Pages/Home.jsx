import React, { useRef } from "react";
import PostList from "../Components/PostList";
import LoadingHoc from "../Components/LoadingHocs";
import axios from "../Components/axios";
import { useEffect, useState, useCallback } from "react";

const PostListWithLoading = LoadingHoc(PostList);

function Home() {
  const [post, setPost] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const timeOut = useRef(null);

  const handleScroll = useCallback(() => {
    if(timeOut.current){
      clearTimeout(timeOut.current);
    };

    timeOut.current = setTimeout(()=>{
    const buffer = 1500;
      if (
        window.innerHeight + document.documentElement.scrollTop + buffer >=
          document.documentElement.scrollHeight &&
        !loading &&
        hasMore
      ) {
        setPage((pre) => pre + 1);
      }
      
    },300)
    },[loading,hasMore]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get(`/posts?page=${page}`);
      const data = response.data;
      setPost((prev) => [...prev, ...data]);
      if (data.length < 5) {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  }, [page]);

  useEffect(() => {
    fetchData();
  }, [fetchData, page]);

  return (
    <>
      <PostListWithLoading isLoading={loading} posts={post} hasMore={hasMore}/>
    </>
  );
}

export default Home;
