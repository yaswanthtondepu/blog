import React from 'react'
import NavBar from './NavBar'
import Posts from './Posts'
import { useEffect } from 'react'


const HomePage = () => {

  useEffect(() => {
    document.title = 'BlogYY'
  }, [])

  return (
    <>
      <NavBar/>
      <div className='home-page'>
        <div>
          <Posts />
        </div>
      </div>
    </>
  )
}

export default HomePage