import React from 'react'
import NavBar from './NavBar'
import Posts from './Posts'
import { useEffect } from 'react'

import SideBar from './SideBar'


const HomePage = () => {

  useEffect(() => {
    document.title = 'BlogYY'
  }, [])

  return (
    <>
      <NavBar />
      <div className="home-page">
        <div className='side-bar'>
          <SideBar />
        </div>
        <div>
          <Posts />
        </div>
        <div className="side-bar"></div>
      </div>
    </>
  );
}

export default HomePage