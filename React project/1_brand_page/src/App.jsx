import React from 'react'
import Navbar from './components/Navbar'
import LeftContent from './components/LeftContent'
import RightContent from './components/RightContent'
import Hero from './components/hero'
import DarkMode from './components/DarkMode'

const App = () => {
  return (
       <div className="min-h-screen-colors duration-300">
      <DarkMode />
      <Navbar />
      <Hero />
     
    </div>
  )
}

export default App
