import React, { useEffect, useState } from 'react';

const PostList = () => {
    const [posts, setPosts] = useState([]);
    
useEffect(() => {
    fetchData();
async function fetchData() {
    const response = await fetch('https://saurav.tech/NewsAPI/everything/cnn.json');
    const data = await response.json();
    setPosts(data.articles);
    }
}, []);


    return (
        <div className='pt-20 pl-0  sm:pt-20 sm:pl-72 sm:flex' >
            {posts.map((post, index)=>(
                <div key={index} className=' m-16 flex-col'>
                    <img src={post.urlToImage} alt="User Post"  className='w-full h-64 sm:h-80 sm:w-80 object-cover'/>
                    <h1 className='text-2xl sm:w-80'>{post.caption}</h1>
                    <p className='text-lg sm:w-80'>{post.comment}</p>
                    <div className='flex items-center'>
                        <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-1'>
                            <img src="https://pngimg.com/uploads/like/small/like_PNG84.png" alt="Like" className='h-5 w-5' />
                        </button>
                        <span className='ml-2'>{post.likes} Likes</span>
                    </div>
                    <div className='flex items-center'>
                        <input type='text' placeholder='Add a comment' className='border border-gray-300 rounded-md p-1 m-1'r/>
                        <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded m-1'>
                            Post
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default PostList;

// 5Nue7XZQ7rbfFB81hTDiVT9wPF2JqaafIfHZOKmlLcpe5mVDNGeRGO7V