import React, { useEffect, useState } from 'react';
import { commentContext } from '../Context/context';
import CommentList from "../Components/CommentList";
import { LikeContext } from '../Context/context';
import Like from './Like';

const PostList = () => {
    const [posts, setPosts] = useState([]);
    const [comment, setComment] = useState('');

    const handleChange = (e,id) => {
        setComment({...comment,[id]:e.target.value});
    }
    const handleClick = (id) => { 
        console.log(comment[id]);
        setComment({...comment, [id]:''});
    }

    
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
            {posts.map((posts, index)=>(
                <div key={index} className=' m-16 flex-col'>
                    <img src={posts.urlToImage} alt="User Post"  className='w-full h-64 sm:h-80 sm:w-80 object-cover'/>
                    <h1 className='text-2xl sm:w-80'>{posts.caption}</h1>
                    <LikeContext.Provider value={posts.Like}>
                        <Like/>
                    </LikeContext.Provider>
                    <commentContext.Provider value={posts.author}>
                        <CommentList/>
                    </commentContext.Provider>
                    <div className='flex items-center'>
                        <input type='text' placeholder='Add a comment' className='border border-gray-300 rounded-md p-1 m-1' value={comment[posts.urlToImage]} onChange={(e)=>handleChange(e,posts.urlToImage)}/>
                        <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded m-1' onClick={()=>handleClick(posts.urlToImage)}>
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