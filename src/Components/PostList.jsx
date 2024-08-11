import React, { useEffect, useState } from 'react';
import { commentContext } from '../Context/context';
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
        console.log(comments[id]);
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
        <h1 className="text-xl font-semibold text-black sm:pl-72 pt-20 pb-0">Comments and Likes feature will be available soon!</h1>
        <div className='pt-10 pl-0 sm:pt-10 sm:pl-72 sm:flex'>
            <CreateButton />
            {posts.map((post, index) => (
                <div key={index} className='m-16 flex-col relative'>
                    <div className='relative'>
                        <img 
                            src={post.image} 
                            alt="User Post"  
                            className='w-full h-64 sm:h-80 sm:w-80 object-cover' 
                        />
                        <div className='absolute top-2 left-2 bg-white p-1 rounded-md shadow-md'>
                            <span className='text-sm font-semibold'>{post.author}</span>
                        </div>
                    </div>
                    <h1 className='text-2xl sm:w-80 mt-2'>{post.caption}</h1>
                    <LikeContext.Provider value={post.likes}>
                        <Like />
                    </LikeContext.Provider>
                    <commentContext.Provider value={comments.author}>
                        <CommentList />
                    </commentContext.Provider>
                    <div className='flex items-center mt-2'>
                        <input 
                            type='text' 
                            placeholder='Add a comment' 
                            className='border border-gray-300 rounded-md p-1 m-1 w-full max-w-xs' 
                            value={comments[post.id] || ''} 
                            onChange={(e) => handleChange(e, post.id)} 
                        />
                        <button 
                            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded m-1' 
                            onClick={() => handleClick(post.id)}
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
