import React, { useState } from "react";
import CommentList from "../Components/CommentList";
import { LikeContext } from "../Context/context";
import Like from "./Like";
import CreateButton from "./CreateButton";
import axios from "../Components/axios";
import { jwtDecode } from "jwt-decode";
import { motion } from "framer-motion";

const PostList = ({ posts, postLoad, hasMore }) => {
  const [comments, setComments] = useState({});
  const token = localStorage.getItem("token");
  const decoded = jwtDecode(token);
  const userId = decoded.id;

  const handleChange = (e, id) => {
    setComments({ ...comments, [id]: e.target.value });
  };

  const handleClick = (id) => {
    try {
      if (!token) {
        throw new Error("User not logged in");
      }
      axios.post(
        `/posts/${id}/comments`,
        {
          text: comments[id],
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      console.error("Error posting comment:", error);
    }
    setComments({ ...comments, [id]: "" });
  };

  return (
    <>
      <div className="flex flex-col items-center pt-20 justify-center space-y-8 w-full px-4">
        <CreateButton />
        {posts.map((post, index) => {
          const liked = userId ? post.likes.includes(userId) : false;
          return (
            <motion.div
              key={index}
              className="bg-white rounded-lg shadow-lg w-full max-w-md p-4 flex flex-col items-start"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <div className="relative w-full">
                <img
                  src={post.image}
                  alt="User Post"
                  className="w-full h-96 object-cover rounded-lg"
                />
                <div className="absolute top-4 left-4 bg-white px-3 py-1 rounded-md shadow">
                  <span className="text-sm font-semibold">
                    {post.author.username}
                  </span>
                </div>
              </div>
              <h1 className="text-lg font-medium text-gray-800 mt-4">
                {post.caption}
              </h1>
              <LikeContext.Provider value={post.likes}>
                <Like postId={post._id} likeToggle={liked} />
              </LikeContext.Provider>
              <CommentList postId={post._id} author={post.author.username} />
              <motion.div
                className="flex items-center mt-4 w-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <input
                  type="text"
                  placeholder="Add a comment"
                  className="border border-gray-300 rounded-md p-2 flex-grow focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                  value={comments[post._id] || ""}
                  onChange={(e) => handleChange(e, post._id)}
                />
                <motion.button
                  className="ml-2 bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700 transition-all"
                  onClick={() => handleClick(post._id)}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  Post
                </motion.button>
              </motion.div>
            </motion.div>
          );
        })}
        {postLoad && (
          <motion.p
            className="text-green-700 font-bold text-2xl pb-10 sm:pb-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            Loading more Posts...
          </motion.p>
        )}
        {!hasMore && (
          <motion.p
            className="text-red-600 font-bold text-2xl pb-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            No More Posts left!! Thanks for Visiting😇❤️
          </motion.p>
        )}
      </div>
    </>
  );
};

export default PostList;
