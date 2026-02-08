import React from 'react'
import Navbar from './navbar'
import Pgcontent from '../Section1/Pgcontent'
const Section1 = (props) => {
  return (
    <div className='h-screen w-full bg-purple-200 '>
      <Navbar />
      <Pgcontent users={props.users} />
    </div>
  )
}

export default Section1
