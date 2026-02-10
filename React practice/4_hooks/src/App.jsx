import React, { useState } from 'react';

const App = () => {
const [num, setnum] = useState(10);
const [arr, setarr] = useState([10,20,30]);
const [user, setuser] = useState({name:'rishoven',age:20});
// now we will handle advance state management like of object


const [valin, setvalin] = useState(""); // this will be used to get the value of input
function btnclicked(){
  setnum(num+10);
  setarr([34,65,87]);
  
  const newuser={...user};// here we used destructring to create a copy of object which has same address as our original object so changes made in copy will also reflect in the original one.
  newuser.name="rishu";
  newuser.age=18;
  setuser(newuser)

}
 const submit_handler=(e)=>{
e.preventDefault();
console.log(`form submitted by ${valin} `);
setvalin("");
 }

  return (
    <div>
      <h1> the value of num is {num}</h1>
      <h1> the value of arr is {arr}</h1>
      <h1>the name of user is {user.name} and age of user is {user.age}</h1>
      <button onClick={btnclicked}>click me</button>


      <div>
        <form onSubmit={submit_handler}> 
          <input type="text" value={valin} onChange={(e)=>{
            setvalin(e.target.value)
            console.log(valin);
          }} placeholder='enter the text here'></input>
        <button> submit</button>
        </form>
      </div>
    </div>
  )
}

export default App
