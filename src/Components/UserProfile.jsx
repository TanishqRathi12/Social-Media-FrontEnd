import { Link } from "react-router-dom";
import CreateButton from "./CreateButton";
import Delete from "./deleteButton";
import EditButton from "./EditPost";
import { motion } from "framer-motion";

const UserProfile = ({ userData, posts }) => {
  return (
    <>
      <div className="h-full dark:bg-gray-800 bg-gray-200 pt-12 pb-8">
        <div className="container mx-auto px-4 flex flex-col items-center mt-16">
          <motion.div
            className="flex flex-col items-center bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6 max-w-md"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <img
              className="h-40 w-40 rounded-full border-4 border-white dark:border-gray-800 mb-4 transform hover:scale-110 transition-all duration-300"
              src={userData.image}
              alt="User Profile"
            />
            <h3 className="font-bold text-2xl text-gray-800 dark:text-white mb-2">
              {userData.name}
            </h3>
            <p className="text-gray-700 dark:text-gray-400 text-center mb-4">
              {userData.Bio}
            </p>
            <div className="flex gap-4 mb-4">
              <button className="rounded-full bg-green-600 dark:bg-green-800 text-white font-bold hover:bg-green-700 dark:hover:bg-green-900 px-4 py-2 transition-all duration-300 transform hover:scale-105">
                Followers ({userData.followerCount.length})
              </button>
              <button className="rounded-full bg-purple-600 dark:bg-purple-800 text-white font-bold hover:bg-purple-700 dark:hover:bg-purple-900 px-4 py-2 transition-all duration-300 transform hover:scale-105">
                Following ({userData.followingCount.length})
              </button>
            </div>
            <Link to="/EditUser">
              <button className="rounded-full bg-blue-600 dark:bg-blue-800 text-white font-bold hover:bg-blue-700 dark:hover:bg-blue-900 px-6 py-2 transition-all duration-300 transform hover:scale-105">
                Edit Profile
              </button>
            </Link>
          </motion.div>
        </div>

        <div className="sm:ml-80 m-5">
          <CreateButton />
        </div>

        <motion.div
          className="sm:ml-80 flex flex-col mx-auto px-4 mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 text-center">
            My Posts
          </h2>
          {posts.length === 0 ? (
            <p className="text-center text-gray-500 dark:text-gray-300">
              No posts yet.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {posts.map((post, index) => (
                <motion.div
                  key={index}
                  className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg transform transition duration-500 hover:scale-105 hover:shadow-2xl"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: index * 0.1 }}
                >
                  <img
                    src={post.image}
                    alt="User Post"
                    className="w-full h-64 object-cover rounded-t-xl"
                  />
                  <div className="p-6">
                    <h1 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 truncate">
                      {post?.caption || "Untitled Post"}
                    </h1>
                    <div className="flex justify-between mt-4 gap-2">
                      <button className="flex-1 bg-red-500 text-white font-bold py-2 mx-2 rounded-lg transition-all duration-300 transform hover:scale-110 hover:bg-red-600">
                        <Delete id={post._id} />
                      </button>
                      <button className="flex-1 bg-blue-500 text-white font-bold py-2 mx-2 rounded-lg transition-all duration-300 transform hover:scale-110 hover:bg-blue-600">
                        <EditButton id={post._id} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </>
  );
};

export default UserProfile;
