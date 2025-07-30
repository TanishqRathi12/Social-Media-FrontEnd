import { Bookmark, Heart, MessageCircle, MoreHorizontal, Send, Share } from "lucide-react";
import { useState, useEffect } from "react";
import axios from "../Components/axios";
import CommentList from "../Components/CommentList";

const Post = ({ post, userId, token }) => {
  const [commentText, setCommentText] = useState("");
  const [posting, setPosting] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [isLiked, setIsLiked] = useState(userId ? post?.likes?.includes(userId) : false);
  const [likesCount, setLikesCount] = useState(post?.likes?.length || 0);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const currentPost = post;

  // Update like state when post prop changes
  useEffect(() => {
    setIsLiked(userId ? post?.likes?.includes(userId) : false);
    setLikesCount(post?.likes?.length || 0);
  }, [post, userId]);

  const handleCommentInput = (e) => setCommentText(e.target.value);

  const handleLike = async () => {
    if (!userId || !token) return;
    
    try {
      const newLikedState = !isLiked;
      setIsLiked(newLikedState);
      setLikesCount(prev => newLikedState ? prev + 1 : prev - 1);
      await axios.post(
        `/posts/${post._id}/like`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      console.error("Error liking post:", error);
      setIsLiked(!isLiked);
      setLikesCount(prev => isLiked ? prev + 1 : prev - 1);
    }
  };

  const postComment = async () => {
    if (!commentText.trim() || !token) return;
    
    try {
      setPosting(true);
      await axios.post(
        `/posts/${post._id}/comments`,
        {
          text: commentText,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setCommentText("");
    } catch (error) {
      console.error("Error posting comment:", error);
    } finally {
      setPosting(false);
    }
  };

  const formatTimeAgo = (date) => {
    const now = new Date();
    const postDate = new Date(date);
    const diffInHours = Math.floor((now - postDate) / (1000 * 60 * 60));
    if (diffInHours < 1) return "Just now";
    if (diffInHours < 24) return `${diffInHours}h`;
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d`;
    return `${Math.floor(diffInDays / 7)}w`;
  };

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 overflow-hidden max-w-lg mx-auto w-full">
      {/* Header */}
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <div className="w-11 h-11 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center text-white font-semibold text-sm">
              {currentPost.author.username.charAt(0).toUpperCase()}
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 rounded-full border-2 border-slate-800"></div>
          </div>
          <div className="flex flex-col">
            <h3 className="font-semibold text-white text-sm">
              {currentPost.author.username}
            </h3>
            <p className="text-xs text-gray-400">
              {formatTimeAgo(currentPost.createdAt)}
            </p>
          </div>
        </div>
        <button className="p-2 rounded-full text-gray-400">
          <MoreHorizontal className="w-5 h-5" />
        </button>
      </div>

      {/* Image */}
      <div className="relative">
        <img
          src={currentPost.image}
          alt={currentPost.caption}
          className="w-full aspect-square object-cover"
          loading="lazy"
        />
        
        {/* Quick actions overlay */}
        <div className="absolute top-4 right-4">
          <button 
            onClick={() => setIsBookmarked(!isBookmarked)}
            className="p-2 bg-black/40 backdrop-blur-sm rounded-full text-white"
          >
            <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current text-blue-400' : ''}`} />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Action Buttons */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <button
              onClick={handleLike}
              className="p-0"
            >
              <Heart 
                className={`w-6 h-6 ${
                  isLiked ? 'fill-red-500 text-red-500' : 'text-gray-300'
                }`} 
              />
            </button>
            <button
              onClick={() => setShowComments(!showComments)}
              className="p-0"
            >
              <MessageCircle className={`w-6 h-6 ${showComments ? 'text-blue-400' : 'text-gray-300'}`} />
            </button>
            <button className="p-0">
              <Share className="w-6 h-6 text-gray-300" />
            </button>
          </div>
        </div>

        {/* Likes Count */}
        <div className="mb-3">
          <button className="font-semibold text-sm text-white">
            {likesCount.toLocaleString()} {likesCount === 1 ? 'like' : 'likes'}
          </button>
        </div>

        {/* Caption */}
        <div className="mb-4">
          <p className="text-sm text-gray-300 leading-relaxed">
            <span className="font-semibold text-white mr-2">
              {currentPost.author.username}
            </span>
            {currentPost.caption}
          </p>
        </div>
        {/* Comments Section - Using your existing CommentList component */}
        {showComments && (
          <div className="mb-4 pb-4 border-b border-slate-700/50">
            <CommentList postId={currentPost._id} author={currentPost.author.username} />
          </div>
        )}

        {/* Comment Input */}
        <div className="flex items-center space-x-3 pt-4 border-t border-slate-700/50">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center text-white font-semibold text-xs flex-shrink-0">
            {userId ? "U" : "G"}
          </div>
          <div className="flex-1 flex items-center space-x-2">
            <div className="flex-1 relative">
              <input
                type="text"
                className="w-full bg-slate-700/30 border border-slate-600/30 rounded-full px-4 py-2 text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400/50"
                placeholder="Add a comment..."
                value={commentText}
                onChange={handleCommentInput}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && commentText.trim()) {
                    postComment();
                  }
                }}
                disabled={posting || !token}
              />
            </div>
            <button
              onClick={() => {
                if (commentText.trim()) postComment();
              }}
              className={`p-2 rounded-full ${
                commentText.trim() && !posting && token
                  ? 'text-blue-400' 
                  : 'text-gray-400 cursor-not-allowed'
              }`}
              disabled={posting || !commentText.trim() || !token}
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Loading indicator for posting */}
        {posting && (
          <div className="flex items-center justify-center mt-3">
            <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <span className="ml-2 text-xs text-gray-400">Posting...</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Post;