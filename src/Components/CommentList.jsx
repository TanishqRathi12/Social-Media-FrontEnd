import axios from '../Components/axios';
import React, { useEffect, useState } from 'react';

// Format time ago helper (same as before)
function formatTimeAgo(date) {
  const now = new Date();
  const commentDate = new Date(date);
  const diffInMinutes = Math.floor((now - commentDate) / (1000 * 60));
  if (diffInMinutes < 1) return "Just now";
  if (diffInMinutes < 60) return `${diffInMinutes}m`;
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours}h`;
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) return `${diffInDays}d`;
  return `${Math.floor(diffInDays / 7)}w`;
}

function CommentList({ postId }) {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    // Fetch comments right away when mounted (when showComments is true)
    axios
      .get(`/posts/${postId}/comments`)
      .then((res) => setComments(res.data))
      .catch((err) => console.error('Error fetching comments:', err));
  }, [postId]);

  return (
    <div className="space-y-1">
      {comments.length > 0 ? (
        comments.map((comment) => (
          <div key={comment._id} className="flex items-center text-sm">
            <span className="font-semibold text-white mr-2">
              {comment.author.username}
            </span>
            <span className="text-gray-200">{comment.content}</span>
            <span className="ml-2 text-xs text-gray-400">
              {comment.createdAt ? formatTimeAgo(comment.createdAt) : ''}
            </span>
          </div>
        ))
      ) : (
        <p className="text-xs text-gray-400 mt-2">
          No comments yet, be the first to comment
        </p>
      )}
    </div>
  );
}

export default CommentList;
