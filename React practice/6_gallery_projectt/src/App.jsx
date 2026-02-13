import React, { useEffect } from 'react'
import { useState } from 'react';
import axios from 'axios'
const App = () => {

  const [idx, setIdx] = useState(1);

  const [Userdata, setUserdata] = useState([]);


  useEffect(function(){
    get_data(idx);
  },[idx]);
  

  const get_data= async (idx)=>{
let response= await axios.get(`https://picsum.photos/v2/list?page=${idx}&limit=15`);
let data=response.data;
setUserdata(data);
console.log(data);
  };


  const prev=(idx)=>{

    if(idx==1){
      return ;
    }
setIdx(idx-1);

  }

  const next=(idx)=>{
setIdx(idx+1);

  }

  
  
  let printuser="no user available";

  if(Userdata.length>0){
    printuser=Userdata.map((e,idx)=>{

      return <div>
      
        <img className='w-100 h-100 rounded m-5 object-cover' src={e.download_url} alt="no image" />
        <h2>{e.author}</h2>
        <a href={e.url} target='_blank'> view image </a>
        <a href={e.download_url} download target="_blank" rel="noreferrer">
  Download
</a>

      </div>
    });
  }

  return (
    
    <div className='bg-black h-screen text-white overflow-auto  '>
     
        <h2 className='bg-red-500 text-xl w-xl'>{idx}</h2>


      <div className='flex flex-wrap gap-10'> {printuser}</div>

       <button className='bg-green-400 rounded-2xl w-30 h-10 active:scale-95 m-7 ' onClick={()=>prev(idx)}>prev</button>


       <button className='bg-green-400 rounded-2xl w-30 h-10 active:scale-95 m-7 ' onClick={()=>next(idx)}>next</button>
    </div>

    
  )
}

export default App
