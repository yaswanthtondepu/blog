import React from 'react'
import NavBar from './NavBar'
import SideBar from './SideBar'


const PageDown = () => {
  return (
      <>

          <NavBar className='flex-1' />
          <div className="home-page" style={{justifyContent: "center", fontSize:"32px", paddingTop:"5rem" }}>
              <div>
                  Sorry! This website is temporarily down. Please visit later.
                 
              </div>

          </div>
      </>
  )
}

export default PageDown