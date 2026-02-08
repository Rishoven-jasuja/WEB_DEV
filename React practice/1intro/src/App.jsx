import React from 'react'
import Card from './components/card'
import Navbar from './components/navbar'
const App = () => {
  return (
     <> 
      {/* this is called fragment in which we can return multiple items and its not visible unlike div */}
      <Navbar />
     <Card user="rishu" age={20} />
      {Card()}
       {Card()}
    
    </>
  )
}

export default App
