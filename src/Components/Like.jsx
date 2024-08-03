import React from 'react'
import { useContext } from 'react'
import { LikeContext } from '../Context/context'

function Like() {
    const like = useContext(LikeContext)
  return (
    <div className='flex items-center'>
    <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-1'>
        <img src="https://pngimg.com/uploads/like/small/like_PNG84.png" alt="Like" className='h-5 w-5' />
    </button>
    <span className='ml-2'>{like} Likes</span>
    </div>
  )
}

export default Like
