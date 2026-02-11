import React from 'react'
import { useState } from 'react'
 const App = () => {

  const submit_handler = (e) => {
    e.preventDefault();
    console.log(title,details);
    const copy_task=[...task];
    copy_task.push({title,details});
    settask(copy_task);
    console.log(task)
  }
  const [title, settitle] = useState("");
  const [details, setdetails] = useState("");

  const [task, settask] = useState([]);



  const del_note=(idx)=>{
     const del_task=[...task]
     del_task.splice(idx,1);
     settask(del_task)
  }
  return (
    <div className='h-screen w-screen bg-black'>
      
      <form
        onSubmit={submit_handler}
        className='flex justify-center items-center flex-col p-6 gap-5'
      >
        <input
          type='text'
          placeholder='Enter notes Heading'
         onChange={(e)=>{
            settitle(e.target.value)
          }}
          className='px-5 py-2 w-1/2 bg-emerald-200 text-black border-2 rounded-xl text-xl'
        />

        <textarea
          className='px-5 py-2 w-1/2 bg-emerald-200 text-black border-2 rounded-xl h-28 text-xl'
          placeholder='Enter notes details'
          value={details}
          onChange={(e)=>{
            setdetails(e.target.value)
          }}
        />

        <button
          type="submit"
          className='px-5 py-2 w-1/2 bg-emerald-200 text-black border-2 rounded-xl text-xl'
        >
          Add Note
        </button>
      </form>

      <div
        id='data'
        className='flex flex-wrap p-10 bg-gray-900 w-full min-h-[50vh] justify-center gap-8'
      >
        <h1 className='text-emerald-200 w-full text-center text-2xl'>
          Your Notes
        </h1>

  {task.map(function(elem,idx){
    return  <div className='min-h-45  w-2/3 rounded-2xl bg-emerald-200 text-xl text-black flex justify-center items-center flex-col'>
      <h1 className='font-bold text-2xl'>{elem.title}</h1>
      <p>{elem.details}</p>
      <button className='bg-emerald-800 p-4 text-white -left-60 -top-3 relative ' onClick={()=>del_note(idx)}>del</button>
    </div>
  })}
       
        
      </div>

    </div>
  )
}

export default App;

