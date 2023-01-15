import React from "react";


import { useEffect } from "react";
import { Link } from "react-router-dom";

const SideBar = () => {
  useEffect(() => {
    document.title = "BlogYY";
  }, []);

  return (
    <div className="left side-bar">
      <Link to="/" className="items">
        Home{" "}
      </Link>
      <Link to="/myposts" className="items">
        MyPosts{" "}
      </Link>
      <Link to="/drafts" className="items">
        Drafts{" "}
      </Link>
      <Link to="/bookmarks" className="items">
        Bookmarks{" "}
      </Link>
    </div>
  );
};

export default SideBar;
