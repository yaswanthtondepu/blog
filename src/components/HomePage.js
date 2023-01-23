import React from 'react'
import NavBar from './NavBar'
import Posts from './Posts'
import { useEffect } from 'react'

import SideBar from './SideBar'



const HomePage = () => {
  useEffect(() => {
    document.title = 'BlogYY'
    console.log('HomePage');
  }, [])

  return (
    <>
    
      <NavBar className='flex-1' />
      <div className="home-page">
        <div className='md:block hidden' >
          <SideBar />
        </div>
        <div>
          <Posts />
        </div>

      </div>
    </>

  );
}

export default HomePage