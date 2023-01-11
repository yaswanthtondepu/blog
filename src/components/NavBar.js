import React from "react";
import { Link } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { IoPerson } from "react-icons/io5";
import { useState } from "react";
import useComponentVisible from "./useComponentVisible";

const NavBar = () => {
  const [showProfileInfo, setShowProfileInfo] = useState(false);
  const { ref, isComponentVisible, setIsComponentVisible } = useComponentVisible(false);

  return (
    <>
      <div style={Nav} className="navbar">
        <div style={{ paddingLeft: "2rem", display: "flex", alignItems: "center", gap: "2rem" }} className="left-header">
          <div>
            <Link to="/" style={{ fontFamily: "Moon Dance", fontSize: "2.5rem" }}>BlogYY</Link>
          </div>
          <div className="search">
            <input type="text" placeholder="Search..." className="inp-text" ></input>
            <div style={{ backgroundColor: "#ccc", cursor: "pointer", padding: "7px", borderRadius: "0 5px 5px 0" }}>
              <CiSearch style={{ fontSize: "22px" }} />
            </div>
          </div>
        </div>

        <div className="right-nav">

          <Link to="/createpost" className="btn">Create Post</Link>

          <div className="profile" onClick={() => { setIsComponentVisible(!isComponentVisible); setShowProfileInfo(!showProfileInfo) }}>
            <IoPerson style={{ fontSize: "1.5rem", cursor: "pointer" }}/>
            <div ref={ref}>
              {isComponentVisible && showProfileInfo &&
                (<div className="profile-info" onClick={() => setIsComponentVisible(!isComponentVisible)}>
                  <div className="profile-options">
                    <div className="pl-3">Yashu</div>
                    <div className="pl-3 text-sm">@yashu</div>
                  </div>

                  <div className="profile-options2">
                    <div><Link to="/createpost">Create Post</Link></div>
                    <div>Settings</div>
                  </div>
                  <div className="profile-options3">
                    <div>Logout</div>
                  </div>
                </div>)}
            </div>
          </div>

        </div>
      </div>
      <div className="search-container-small">
        <div className="search-small">
          <input type="text" placeholder="Search..." className="inp-text" ></input>
          <div style={{ backgroundColor: "#ccc", cursor: "pointer", padding: "7px", borderRadius: "0 5px 5px 0" }}>
            <CiSearch style={{ fontSize: "22px" }} />
          </div>
        </div>
      </div>
    </>
  );
};

const Nav = {
  height: "70px",
  display: "flex",
  fontSize: "1.2rem",
  boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
  alignItems: "center",
  justifyContent: "space-between"
}

export default NavBar;
