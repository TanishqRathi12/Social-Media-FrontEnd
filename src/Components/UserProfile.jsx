import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Users, UserPlus, Settings, Plus, MapPin, Calendar } from "lucide-react";
import CreateButton from "./CreateButton";
import MyPost from "./myPost";

const UserProfile = ({ userData, posts }) => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="relative bg-gradient-to-br">
        <div className="relative z-10 pt-24 pb-40 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col items-center text-center">
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, type: "spring", bounce: 0.4 }}
                className="relative mb-8"
              >
                <div className="relative">
                  <img
                    className="h-36 w-36 md:h-44 md:w-44 rounded-full border-4 border-white/20 shadow-2xl object-cover backdrop-blur-sm"
                    src={userData.image}
                    alt="User Profile"
                  />
                  <div className="absolute -bottom-2 -right-2 bg-emerald-500 w-8 h-8 rounded-full border-4 border-white shadow-lg flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-white max-w-2xl"
              >
                <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
                  {userData.name}
                </h1>

                {userData.Bio && (
                  <p className="text-white/90 text-lg md:text-xl mb-6 leading-relaxed font-medium">
                    {userData.Bio}
                  </p>
                )}

                <div className="flex flex-wrap items-center justify-center gap-6 mb-8 text-white/80">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm">Joined March 2024</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">New York, NY</span>
                  </div>
                </div>

                <div className="flex justify-center gap-8 md:gap-12 mb-10">
                  <motion.div whileHover={{ scale: 1.05 }} className="text-center cursor-pointer">
                    <div className="text-3xl md:text-4xl font-bold mb-1">{posts.length}</div>
                    <div className="text-white/80 text-sm md:text-base font-medium">Posts</div>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.05 }} className="text-center cursor-pointer">
                    <div className="text-3xl md:text-4xl font-bold mb-1">
                      {userData.followerCount?.length || 0}
                    </div>
                    <div className="text-white/80 text-sm md:text-base font-medium">Followers</div>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.05 }} className="text-center cursor-pointer">
                    <div className="text-3xl md:text-4xl font-bold mb-1">
                      {userData.followingCount?.length || 0}
                    </div>
                    <div className="text-white/80 text-sm md:text-base font-medium">Following</div>
                  </motion.div>
                </div>

                <div className="flex flex-wrap gap-4 justify-center">
                  <Link to="/EditUser">
                    <motion.button
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-white text-indigo-600 px-8 py-3 rounded-full font-semibold flex items-center gap-3 shadow-lg hover:shadow-xl transition-all duration-300 backdrop-blur-sm border border-white/20"
                    >
                      <Settings className="w-5 h-5" />
                      Edit Profile
                    </motion.button>
                  </Link>
                  <motion.button
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-white/10 backdrop-blur-md text-white px-8 py-3 rounded-full font-semibold flex items-center gap-3 border border-white/20 hover:bg-white/20 transition-all duration-300"
                  >
                    <Users className="w-5 h-5" />
                    Followers
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-white/10 backdrop-blur-md text-white px-8 py-3 rounded-full font-semibold flex items-center gap-3 border border-white/20 hover:bg-white/20 transition-all duration-300"
                  >
                    <UserPlus className="w-5 h-5" />
                    Following
                  </motion.button>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        <div className="relative -mt-32 z-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700 p-6 mb-12 backdrop-blur-sm"
            >
              <div className="flex items-center space-x-4">
                <img
                  src={userData.image}
                  alt="Your avatar"
                  className="w-14 h-14 rounded-full object-cover ring-2 ring-indigo-100 dark:ring-gray-700"
                />
                <div className="flex-1">
                  <CreateButton className="w-full">
                    <div className="bg-gray-50 dark:bg-gray-700 rounded-2xl py-4 px-6 text-left text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-600 transition-all duration-300 cursor-pointer flex items-center gap-3 border border-gray-200 dark:border-gray-600">
                      <Plus className="w-5 h-5 text-indigo-500" />
                      <span className="text-base">What's on your mind?</span>
                    </div>
                  </CreateButton>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">My Posts</h2>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {posts.length} post{posts.length !== 1 ? 's' : ''}
                </div>
              </div>

              {posts.length === 0 ? (
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="text-center py-20 bg-white dark:bg-gray-800 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700"
                >
                  <div className="w-32 h-32 bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-gray-700 dark:to-gray-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Plus className="w-16 h-16 text-indigo-400 dark:text-gray-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-3">
                    No posts yet
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 mb-8 text-lg max-w-md mx-auto">
                    Share your thoughts, experiences, and moments with your followers
                  </p>
                  <CreateButton>
                    <motion.button
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl"
                    >
                      Create Your First Post
                    </motion.button>
                  </CreateButton>
                </motion.div>
              ) : (
                <div className="grid gap-8 sm:p-28">
                  {posts.map((post, index) => (
                    <MyPost key={post._id || index} post={post} index={index} />
                  ))}
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
