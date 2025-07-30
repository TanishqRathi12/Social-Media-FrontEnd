import CreateButton from "./CreateButton";
import Post from "./post";
import { jwtDecode } from "jwt-decode";
import { motion } from "framer-motion";

const PostList = ({ posts, postLoad, hasMore }) => {
  const token = localStorage.getItem("token");
  let userId = null;
  if (token) {
    try {
      const decoded = jwtDecode(token);
      userId = decoded.id;
    } catch (e) {
      userId = null;
    }
  }

  return (
    <div className="flex flex-col items-center pt-16 w-full px-2 sm:px-4 md:px-8 bg-slate-900 min-h-screen">
      <CreateButton />
      <div className="w-full flex flex-col items-center space-y-8 pt-2 max-w-2xl">
        {posts.map((post) => (
          <Post key={post._id} post={post} userId={userId} token={token} />
        ))}
      </div>

      {postLoad && (
        <motion.p
          className="text-green-400 font-bold text-2xl pb-10 sm:pb-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          Loading more Posts...
        </motion.p>
      )}
      
      {!hasMore && (
        <motion.p
          className="text-red-400 font-bold text-2xl pb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          No More Posts left!! Thanks for Visiting😇❤️
        </motion.p>
      )}
    </div>
  );
};

export default PostList;