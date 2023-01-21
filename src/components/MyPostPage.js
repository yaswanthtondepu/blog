import React from "react";
import NavBar from "./NavBar";
import Post from "./Post";
import { useState, useEffect } from "react";

import SideBar from "./SideBar";
import axios from "axios";

const MyPostPage = () => {
  const [posts, setPosts] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const [publishedPosts, setPublishedPosts] = useState([]);
  const [draftPosts, setDraftPosts] = useState([]);
  const [current, setCurrent] = useState('All');


  useEffect(() => {
    document.title = `${current} Posts`;
  }, [current]);

  useEffect(() => {
    let user = JSON.parse(sessionStorage.getItem('user'));

    axios({
      method: "post",
      url: `${process.env.REACT_APP_URL}/post/getpostbyuserid`,
      headers: {
        "content-type": "application/json",
      },
      data: {
        author: {
          id: user.id
        },
      },
    })
      .then((res) => {
        console.log(res.data);
        setPosts(res.data);
        setAllPosts(res.data);
        setPublishedPosts(res.data.filter((post) => post.isPublished === 1));
        setDraftPosts(res.data.filter((post) => post.isPublished === 0));
      })
      .catch((err) => {
        console.log(err);
      });

  }, []);

 function togglePosts(e){
    setCurrent(e.target.innerText);
    if(e.target.innerText === 'All'){
      setPosts(allPosts);
    }
    else if(e.target.innerText === 'Published'){
      setPosts(publishedPosts);
    }
    else if(e.target.innerText === 'Drafts'){
      setPosts(draftPosts);
    }
  }

  return (
    <>
      <NavBar />
      <div className="home-page">
        <SideBar/>
        <div>
          <div className="tabs">
            <div onClick={togglePosts}>All</div>
            <div onClick={togglePosts}>Published</div>
            <div onClick={togglePosts}>Drafts</div>
          </div>

          <div>
            <div style={{fontSize:"1.5rem"}}>
              {current} Posts ({posts.length})
            </div>

            <div>
              {posts.length > 0 ? 
                posts.map((post) => (<Post key={post.postId} content={post} />))
              : <div style={{display:"flex", alignItems:"center", justifyContent:"center", fontSize:"2rem"}}>Nothing to see here!</div>}
            </div>

          </div>
          
        </div>
        <div className="side-bar"></div>
      </div>
    </>
  );
};

export default MyPostPage;
