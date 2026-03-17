import React, { useState } from 'react'
import { BsCart4 } from "react-icons/bs";
import "./Navbar.css"
import {Link} from "react-router-dom"
const Navbar = () => {

  const [active, setActive] = useState("Shop");
  const [cartcount, setcartcount] = useState(0)
const menuItems = ["Shop", "Mens", "Womens", "Kids"];

  const logo='https://img.freepik.com/free-photo/shopping-cart-3d-render-icon_460848-6902.jpg?semt=ais_rp_progressive&w=740&q=80'
  return (
    <div>
      

      <nav className='flex flex-wrap items-center justify-between w-screen px-4 md:px-10 mt-2.5'>
       
       <div className='navlogo flex justify-center items-center md:gap-4  text-2xl text-blue-700'>
        <img className=' md:h-14 md:w-16 h-8 w-8 bg-white' src={logo} alt="" /> Digicart
      </div>
      
<ul className='nav-list flex w-full md:w-80 justify-between items-center text-lg order-3 md:order-none mt-2 md:mt-0'>
  {menuItems.map((item) => (
    <li
  key={item}
  onClick={() => setActive(item)}
  className={`relative cursor-pointer transition ${
    active === item ? "text-blue-700 font-bold" : "text-gray-700"
  }`}
>
  <Link to={item === "Shop" ? "/" : `/${item.toLowerCase()}`}>
      <span
  className={`after:block after:h-[2px] after:transition-transform after:duration-300 after:origin-left
  ${
    active === item
      ? "after:scale-x-100 after:bg-blue-700 "
      : "after:scale-x-0 after:bg-blue-400 hover:after:scale-x-100"
  }`}
>
        {item}
      </span>
      </Link>
    </li>
  ))}
</ul>

    <div className='btns'>

      <Link to="/login">
      
            <button className='signbtn border-blue-700 border-2 text-blue-700 md:text-lg '  >Sign In</button>

      </Link>

     <Link to="/cart">
     
      <button className='carticon relative font-bold '  ><BsCart4 />
      {cartcount > 0 && (
  <span className='bg-red-600 -right-3 -top-3 absolute h-5 w-5 text-sm text-white rounded-2xl flex justify-center items-center'>
    {cartcount}
  </span>
)}

      </button>
      </Link>
       </div>
      </nav>
       
       
      </div>
      
  )
}

export default Navbar
