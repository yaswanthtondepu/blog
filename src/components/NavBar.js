import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { IoPerson } from "react-icons/io5";
import { useState } from "react";
import useComponentVisible from "./useComponentVisible";
import Modal from "./Modal";
import {RxHamburgerMenu} from "react-icons/rx";
// import { useNavigate } from 'react-router-dom';

const NavBar = () => {
  const [showProfileInfo, setShowProfileInfo] = useState(false);
  const { ref, isComponentVisible, setIsComponentVisible } = useComponentVisible(false);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [userDetails, setUserDetails] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [modalResponse, setModalResponse] = useState(0);
  // const navigate = useNavigate();
  useEffect(() => {
    if (sessionStorage.getItem("user")) {
      setIsUserLoggedIn(true);
      setUserDetails(JSON.parse(sessionStorage.getItem("user")));
    }
  }, [isUserLoggedIn]);

  useEffect(() => {
    if (modalResponse === 1) {
      logOut();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modalResponse])

  function logOut() {
    sessionStorage.removeItem("user");
    setIsUserLoggedIn(false);

    window.location.reload(false);
  }

  return (
    <>
      <div style={Nav} className="navbar w-full border">
        <div className="block md:hidden">
          <RxHamburgerMenu/>
        </div>
        <div style={{ paddingLeft: "2rem", display: "flex", alignItems: "center", gap: "2rem" }} className="left-header">
          <div>
            <Link to="/" style={{ fontFamily: "Moon Dance", fontSize: "2.5rem" }}>BlogYY</Link>
          </div>
          <div className="search">
            <input type="text" placeholder="Search..." className="inp-text" ></input>
            <div style={{ cursor: "pointer", padding: "7px", borderRadius: "0 5px 5px 0" }}>
              <CiSearch style={{ fontSize: "22px" }} />
            </div>
          </div>
        </div>

        <div className="right-nav">

          {isUserLoggedIn && <Link to="/createpost" className="btn">Create Post</Link>}
          {!isUserLoggedIn && <Link to="/login" className="btn1">Login</Link>}
          {!isUserLoggedIn && <Link to="/register" className="btn">Create account</Link>}

          {isUserLoggedIn && <div className="profile" onClick={() => { setIsComponentVisible(!isComponentVisible); setShowProfileInfo(!showProfileInfo) }}>
            <IoPerson style={{ fontSize: "1.5rem", cursor: "pointer" }} />
            <div ref={ref}>
              {isComponentVisible && showProfileInfo &&
                (<div className="profile-info" onClick={() => setIsComponentVisible(!isComponentVisible)}>
                  <div className="profile-options">
                    <div className="pl-3">{userDetails.firstname} {userDetails.lastname}</div>
                    <div className="pl-3 text-sm">@{userDetails.username}</div>
                  </div>

                  <div className="profile-options2">
                    <div><Link to="/createpost">Create Post</Link></div>
                    <div>Settings</div>
                  </div>
                  <div className="profile-options3" onClick={()=> setShowModal(true)}>
                    <div>Logout</div>
                  </div>
                </div>)}
            </div>
          </div>}

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

      {showModal && <Modal title="Logout"
        content="Are you sure you want to Logout?"
        btn1="Yes! Logout" btn2="No! Take me back" setShowModal={setShowModal} setModalResponse={setModalResponse} />}
    </>
  );
};

const Nav = {
  display: "flex",
  fontSize: "1.2rem",
  boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
  alignItems: "center",
  justifyContent: "space-between"
}

export default NavBar;
