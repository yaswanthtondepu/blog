import React from 'react'
import Post from './Post'
import { useEffect, useState } from 'react'
import axios from 'axios'

const Posts = () => {
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_URL}/post/getallposts`)
            .then((res) => {
                setPosts(res.data);
            })
            .catch((err) => {
                console.log(err);
            })
    }, [])
  return (
    <div className='posts'>
          {posts.map((post) => (<Post key={post.postId} content={post} />))}

    </div>
  )
}

export default Posts