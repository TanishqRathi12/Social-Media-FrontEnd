// MyPost.jsx
import { motion } from "framer-motion";
import {
  Heart,
  MessageCircle,
  Share,
  Edit3,
  Trash2,
  Eye,
} from "lucide-react";
import Delete from "./deleteButton";
import EditButton from "./EditPost";

const MyPost = ({ post, index }) => {
  const formatTimeAgo = () => {
    const timeOptions = [
      "2 hours ago",
      "5 hours ago",
      "1 day ago",
      "3 days ago",
      "1 week ago",
    ];
    return timeOptions[index % timeOptions.length] || "2 hours ago";
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 max-w-full"
    >
      {/* Post Header */}
      <div className="flex items-center justify-between p-4 sm:p-6 pb-2 sm:pb-4">
        <div className="flex items-center space-x-3 sm:space-x-4">
          <div className="relative">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
              <span className="text-white text-xs sm:text-sm font-bold">You</span>
            </div>
            <div className="absolute -bottom-1 -right-1 w-3 h-3 sm:w-4 sm:h-4 bg-emerald-500 border-2 border-white rounded-full"></div>
          </div>
          <div>
            <h3 className="font-bold text-gray-900 dark:text-white text-sm sm:text-base">Your Post</h3>
            <div className="flex items-center space-x-1 sm:space-x-2 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
              <span>{formatTimeAgo()}</span>
              <span>•</span>
              <div className="flex items-center space-x-1">
                <Eye className="w-3 h-3" />
                <span>Public</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex items-center space-x-1 sm:space-x-2 flex-wrap gap-4 justify-end">
          <EditButton id={post._id}>
            <motion.button
              whileHover={{ scale: 1.1, backgroundColor: "rgba(59, 130, 246, 0.1)" }}
              whileTap={{ scale: 0.9 }}
              className="p-2 sm:p-3 rounded-full hover:bg-blue-50 dark:hover:bg-gray-700 transition-all duration-200 group"
              title="Edit post"
            >
              <Edit3 className="w-4 h-4 text-gray-400 group-hover:text-blue-500 transition-colors" />
            </motion.button>
          </EditButton>

          <Delete id={post._id}>
            <motion.button
              whileHover={{ scale: 1.1, backgroundColor: "rgba(239, 68, 68, 0.1)" }}
              whileTap={{ scale: 0.9 }}
              className="p-2 sm:p-3 rounded-full hover:bg-red-50 dark:hover:bg-gray-700 transition-all duration-200 group"
              title="Delete post"
            >
              <Trash2 className="w-4 h-4 text-gray-400 group-hover:text-red-500 transition-colors" />
            </motion.button>
          </Delete>
        </div>
      </div>

      {/* Post Caption */}
      {post.caption && (
        <div className="px-4 sm:px-6 pb-2 sm:pb-4">
          <p className="text-gray-800 dark:text-gray-200 text-sm sm:text-base leading-relaxed break-words">{post.caption}</p>
        </div>
      )}

      {/* Image */}
      <div className="relative bg-gray-100 dark:bg-gray-900">
        <img
          src={post.image}
          alt="Post content"
          className="w-full h-48 sm:h-64 md:h-80 lg:h-96 object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-all duration-300 cursor-pointer"></div>
      </div>

      {/* Actions: Like, Comment, Share */}
      <div className="p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-2 sm:gap-0">
          <div className="flex items-center space-x-3 sm:space-x-6">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="flex items-center space-x-1 sm:space-x-2 text-gray-600 dark:text-gray-400 hover:text-red-500 transition-colors group"
            >
              <Heart className="w-6 h-6 group-hover:fill-red-500 transition-all" />
              <span className="text-xs sm:text-sm font-medium">Like</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="flex items-center space-x-1 sm:space-x-2 text-gray-600 dark:text-gray-400 hover:text-blue-500 transition-colors"
            >
              <MessageCircle className="w-6 h-6" />
              <span className="text-xs sm:text-sm font-medium">Comment</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="flex items-center space-x-1 sm:space-x-2 text-gray-600 dark:text-gray-400 hover:text-emerald-500 transition-colors"
            >
              <Share className="w-6 h-6" />
              <span className="text-xs sm:text-sm font-medium">Share</span>
            </motion.button>
          </div>
        </div>

        {/* Engagement Stats */}
        <div className="space-y-2">
          <div className="flex flex-wrap items-center space-x-2 sm:space-x-4 text-xs sm:text-sm">
            <span className="font-semibold text-gray-900 dark:text-white hover:underline cursor-pointer">
              127 likes
            </span>
            <span className="text-gray-500 dark:text-gray-400">•</span>
            <span className="text-gray-500 dark:text-gray-400 hover:underline cursor-pointer">
              23 comments
            </span>
            <span className="text-gray-500 dark:text-gray-400">•</span>
            <span className="text-gray-500 dark:text-gray-400">
              1.2K views
            </span>
          </div>

          {/* Likes Preview */}
          <div className="flex items-center space-x-2">
            <div className="flex -space-x-2">
              <div className="w-5 h-5 sm:w-6 sm:h-6 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full border-2 border-white dark:border-gray-800"></div>
              <div className="w-5 h-5 sm:w-6 sm:h-6 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full border-2 border-white dark:border-gray-800"></div>
              <div className="w-5 h-5 sm:w-6 sm:h-6 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full border-2 border-white dark:border-gray-800"></div>
            </div>
            <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 truncate">
              Liked by <span className="font-medium text-gray-700 dark:text-gray-300">sarah_m</span> and <span className="font-medium text-gray-700 dark:text-gray-300">125 others</span>
            </span>
          </div>
        </div>
      </div>
    </motion.article>
  );
};

export default MyPost;

