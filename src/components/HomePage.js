import React from 'react'
import NavBar from './NavBar'
import Posts from './Posts'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import SideBar from './SideBar'


const HomePage = () => {

  useEffect(() => {
    document.title = 'BlogYY'
  }, [])

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
}

export default HomePage