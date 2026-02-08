import React from 'react'
import Section1 from './components/Section1/Section1'
import Section2 from './components/Section2/Section2'
const App = () => {
  const users=[
    {
      img:'https://plus.unsplash.com/premium_photo-1767615278643-3bc025bf74cb?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDl8Ym84alFLVGFFMFl8fGVufDB8fHx8fA%3D%3D',
      intro:'',
      tag:'satisfied'
    },
    {
      img:'https://images.unsplash.com/photo-1770445622808-eaa50700824a?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      intro:'',
      tag:'underserved'
    },
     {
      img:'https://images.unsplash.com/photo-1767463551794-b78c924b98a1?q=80&w=1885&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      intro:'',
      tag:'happy'
    }

  ];
  return (
    <div>
       <Section1 users={users} />
       <Section2 />
    </div>
  )
}

export default App
