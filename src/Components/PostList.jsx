import React, { useEffect, useState } from 'react';
import CommentList from "../Components/CommentList";
import { LikeContext } from '../Context/context';
import Like from './Like';
import CreateButton from './CreateButton';
import axios from '../Components/axios';

const PostList = () => {
    const [posts, setPosts] = useState([]);
    const [comments, setComments] = useState({});

    const handleChange = (e, id) => {
        setComments({ ...comments, [id]: e.target.value });
    };

    const handleClick = (id) => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                throw new Error('User not logged in');
            }
            axios.post(`/posts/${id}/comments`, {
                text: comments[id],
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
        } catch (error) {
            console.error('Error posting comment:', error);
        }
        setComments({ ...comments, [id]: '' });
    };

    useEffect(() => {
        fetchData();
        async function fetchData() {
            try {
                const response = await axios.get('/posts');
                const data = response.data;
                setPosts(data);
            } catch (error) {
                console.error("Error fetching posts:", error);
            }
        }
    }, []);

    return (
        <>
            <div className="flex flex-col items-center pt-20 justify-center space-y-8 w-full px-4">
                <CreateButton />
                {posts.map((post, index) => (
                    <div 
                        key={index} 
                        className="bg-white rounded-lg shadow-lg w-full max-w-md p-4 flex flex-col items-start"
                    >
                        <div className="relative w-full">
                            <img 
                                src={post.image} 
                                alt="User Post"  
                                className="w-full h-96 object-cover rounded-lg" 
                            />
                            <div className="absolute top-4 left-4 bg-white px-3 py-1 rounded-md shadow">
                                <span className="text-sm font-semibold">{post.author.username}</span>
                            </div>
                        </div>
                        <h1 className="text-lg font-medium text-gray-800 mt-4">{post.caption}</h1>
                        <LikeContext.Provider value={post.likes}>
                            <Like postId={post._id} />
                        </LikeContext.Provider>
                            <CommentList postId={post._id}  author={post.author.username} />
                        <div className="flex items-center mt-4 w-full">
                            <input 
                                type="text" 
                                placeholder="Add a comment" 
                                className="border border-gray-300 rounded-md p-2 flex-grow" 
                                value={comments[post._id] || ''} 
                                onChange={(e) => handleChange(e, post._id)} 
                            />
                            <button 
                                className="ml-2 bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700 transition-all"
                                onClick={() => handleClick(post._id)}
                            >
                                Post
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default PostList;
