import React from 'react'
import { useContext } from 'react'
import { commentContext } from '../Context/context'

function CommentList() {
    const commentCont = useContext(commentContext);
    return(
    <>
    <p className='text-lg sm:w-80'>{commentCont}</p>
    </>
  )
}

export default CommentList
