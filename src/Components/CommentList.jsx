import axios from '../Components/axios';
import React, { useState } from 'react';

function CommentList({ postId }) {
  const [comments, setComments] = useState([]);
  const [showComments, setShowComments] = useState(false);

  const fetchComments = async () => {
    try {
      const response = await axios.get(`/posts/${postId}/comments`);
      setComments(response.data);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const handleShowComments = () => {
    setShowComments(!showComments);
    if (!showComments) {
      fetchComments();
    }
  };

  return (
    <>
      <button onClick={handleShowComments}>
        {showComments ? "Hide Comments" : "Show Comments"}
      </button>

      {showComments && (
        <div>
          {comments.length > 0 ? (
            comments.map((comment) => (
              <div key={comment._id} className="comment">
                <p><strong>{comment.author.username}:</strong> {comment.content}</p>
              </div>
            ))
          ) : (
            <p>No comments yet , be the first to do</p>
          )}
        </div>
      )}
    </>
  );
}

export default CommentList;
