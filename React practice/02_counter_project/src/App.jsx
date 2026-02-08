import React from 'react'
import { useState } from 'react';

const App = () => {
 let [counter,setcounter]=useState(5);

  const addvalue=()=>{
    setcounter(counter+1);
    
    
  }
   const reducevalue=()=>{
    if(counter==0){
      return;
    }
    else{
 setcounter(counter-1);
    }
   
    
   }
  return (
    <>
    <h1>hello everyone</h1>
    <h2>counter value: {counter}</h2>
    
    <br />
    <button onClick={addvalue}>add value</button>
    <br />
    <button onClick={reducevalue}>reduce value</button>
    </>
  )
}

export default App
