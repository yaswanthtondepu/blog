import React from 'react'
import Post from './Post'
import { useEffect, useState } from 'react'
import axios from 'axios'
var Loader = require('react-loader');

const Posts = () => {
    const [posts, setPosts] = useState([]);
    const [loaded, setLoaded] = useState(false);
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_URL}/post/getallposts`)
            .then((res) => {
                setPosts(res.data);
                setLoaded(true);
            })
            .catch((err) => {
                console.log(err);
            })
    }, [])
  return (
    <div className='posts'>
        <Loader loaded={loaded} />
        {posts.length>0 ? posts.map((post) => (<Post key={post.postId} content={post} />))
        : <div className='text-3xl'>Hmm! Looks like no one posted anything yet. </div>}

    </div>
  )
}

export default Posts