import React from 'react'
import Post from './Post'
import {data} from '../data'

const Posts = () => {
  return (
    <div className='posts'>
        {data.map((post) => (<Post key={post.id} content={post} />))}

    </div>
  )
}

export default Posts