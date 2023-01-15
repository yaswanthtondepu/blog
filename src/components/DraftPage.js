import React from "react";
import NavBar from "./NavBar";
import Posts from "./Posts";


import SideBar from "./SideBar";

const DraftPage = () => {
  return (
    <>
      <NavBar />
      <div className="home-page">
        <SideBar/>
        <div>
          <Posts />
        </div>
        <div className="side-bar"></div>
      </div>
    </>
  );
};

export default DraftPage;
