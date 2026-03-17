import React from 'react'
import {useState} from 'react'
const App = () => {

  const [intext, setintext] = useState("")
  const [inpass, setinpass] = useState("")
  const [submittedData, setSubmittedData] = useState(null);
  function handlesubmit(e) {
    e.preventDefault();
    console.log("form submitted");
    

    setSubmittedData({
      text: intext,
      pass: inpass
    });

  }


  return (
    <div className='flex justify-center items-center w-screen h-screen '>
      <form onSubmit={handlesubmit} className=' flex flex-col gap-3'>

        <input type='text' placeholder='enter text here' className='border-2 border-black' value={intext} onChange={(e)=>setintext(e.target.value)}></input>
        <input type='password' placeholder='enter pass' className='border-2 border-black' value={inpass} onChange={(e)=>setinpass(e.target.value)}></input>
        <button type='submit' className='border-2'> submit</button>

        {submittedData && (
  <div className='mt-3 border p-2'>
    <p>Text: {submittedData.text}</p>
    <p>Password: {submittedData.pass}</p>
  </div>
)}
      </form>
    </div>
  )
}

export default App
