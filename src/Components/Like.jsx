import React, { useState, useContext } from 'react';
import { LikeContext } from '../Context/context';
import axios from '../Components/axios';
//import {jwtDecode} from 'jwt-decode';

function Like({ postId }) {
    const likeCount = useContext(LikeContext);
    const [likes, setLikes] = useState(likeCount);
    const [loading, setLoading] = useState(false);
    

    const handleLike = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                throw new Error('User not logged in');
            }

            const response = await axios.post(`/posts/${postId}/like`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.status === 200) {
                setLikes(response.data.likes); 
            } else {
                console.error('Failed to like the post:', response.data.message);
            }
        } catch (error) {
            console.error('Error liking the post:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='flex items-center'>
            <button
                className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-1'
                onClick={handleLike}
                disabled={loading}
            >
                <img
                    src="https://pngimg.com/uploads/like/small/like_PNG84.png"
                    alt="Like"
                    className='h-5 w-5'
                />
            </button>
            <span className='ml-2'>{likes.length} Likes</span>
        </div>
    );
}

export default Like;
