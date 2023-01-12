import React from 'react'
import { useParams } from 'react-router-dom'
import NavBar from './NavBar'
import { data } from '../data'
import { useState, useEffect } from 'react'

const  PostContainer = () => {
    const { postId } = useParams();
    const [post, setPost] = useState({});
    useEffect(() => {
        const post1 = data.find((p) => p.id === Number(postId));
        setPost(post1);
    }, [postId]);
    
    useEffect(() => {
       
        if(post){
            console.log(post);
            document.title = post.title;
        }
            
    }, [post])
    
    console.log(postId);
  return (
    <>
      <NavBar />
      <div className="post-content">
        <div style={{ flex: "1" }}>left box</div>
        <div style={{width:"40%",backgroundColor:"white",borderRadius:"20px"}}>Hello</div>
        <div style={{ flex: "1" }}>right box</div>
      </div>
    </>
  );
}

export default PostContainer