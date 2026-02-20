import React, { useState } from "react";
import { FiMenu } from "react-icons/fi";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [menu, setmenu] = useState(false);

  return (
<header className="shadow-md w-full  transition-colors duration-300">


      
      <div className="flex items-center justify-between px-6 py-2">

        <div id="logo" className="w-28 h-16 ">
          <img 
            src="https://1000logos.net/wp-content/uploads/2021/11/Nike-Logo.png"
            alt=""
          />
        </div>

       
        <ul className="hidden md:flex gap-5">
          <li className="hover:text-red-600 hover:scale-110 active:scale-90 transition-all  text-lg"
>MENU</li>
          <li className="hover:text-red-600 hover:scale-110 active:scale-90 transition-all  text-lg"
>LOCATION</li>
        <li className="hover:text-red-600 hover:scale-110 active:scale-90 transition-all  text-lg"
>ABOUT</li>
        <li className="hover:text-red-600 hover:scale-110 active:scale-90 transition-all  text-lg"
>CONTACT</li>

        </ul>

       
       <button className="bg-red-600 text-white px-6 py-2 rounded-xl hidden md:inline-block">
  <Link to="/login" className="text-white" onClick={(e)=>e.target.classList.add('hidenav')}>Login</Link>
</button>


        
        <button
          className="md:hidden text-xl"
          onClick={() => setmenu(!menu)}
        >
          <FiMenu />
        </button>
      </div>

      {/* Mobile menu BELOW navbar */}
      {menu && (
        <div className="pt-2 items-center flex flex-col pb-4">
  <ul className="md:hidden flex flex-row items-center gap-4  border-t py-5 justify-around">
          <li className="hover:text-red-600 hover:scale-110 active:scale-90 transition-all duration-300 text-lg font-semibold">MENU</li>
          <li className="hover:text-red-600 hover:scale-110 active:scale-90 transition-all duration-300 text-lg font-semibold">LOCATION</li>
          <li className="hover:text-red-600 hover:scale-110 active:scale-90 transition-all duration-300 text-lg font-semibold">ABOUT</li>
          <li className="hover:text-red-600 hover:scale-110 active:scale-90 transition-all duration-300 text-lg font-semibold">CONTACT</li>

  
         
        </ul>
         <button>
            <Link
  to="/login"
  className="bg-red-600 text-white px-6 py-2 rounded-xl mb-4 md:hidden w-3/4 text-center"
>
  Login
</Link>

          </button>
        </div>
      


      )}

    </header>
  );
};

export default Navbar;
