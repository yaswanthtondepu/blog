import React from "react";
import NavBar from "./NavBar";
import { useEffect, useState } from "react";

import SideBar from "./SideBar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Post from "./Post";


const BookmarkPage = () => {
  const [bookmarkedPosts, setBookmarkedPosts] = useState([]);
  const [loaded, setLoaded] = useState(false);
  let user = JSON.parse(sessionStorage.getItem("user"));
  let Loader = require('react-loader');
  const navigate = useNavigate();
  useEffect(() => {
    document.title = "Bookmarks";
    if (!user) {
      alert("Please login to view your bookmarks");
      navigate("/");
    }
    else {
      axios({
        method: 'post',
        url: `${process.env.REACT_APP_URL}/bookmark/getuserbookmarks`,
        headers: {
          'content-type': 'application/json'
        },
        data: {
          bookmark: {
            userId: user.id
          }
        }
      })
        .then(result => {
          if (result.data) {
            setBookmarkedPosts(result.data);
            setLoaded(true);
          }
          else {
            alert("Something went wrong. Please try again later");
            navigate("/");
          }
        })
        .catch(error => {
          alert("Something went wrong. Please try again later");
          navigate("/");
        });

    }


  }, [user, navigate]);

  return (
    <>
      <NavBar />
      <div className="home-page">
        <SideBar />
        <div>
          <Loader loaded={loaded} />
          {bookmarkedPosts.length > 0 ? bookmarkedPosts.map((post) => (<Post key={post.postId} content={post} />))
            : <div className='text-3xl'>You haven't bookmarked any posts. Bookmark to see them here! </div>}
        </div>
        <div className="side-bar"></div>
      </div>
    </>
  );
};

export default BookmarkPage;
