import React, { useState } from "react";
import { FiMenu } from "react-icons/fi";

const Navbar = () => {
  const [menu, setmenu] = useState(false);

  return (
<header className="shadow-md w-full 0 transition-colors duration-300">


      
      <div className="flex items-center justify-between px-6 py-3">

        <div id="logo" className="w-32 h-18">
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

        {/* Login */}
        <button className=" bg-red-600 text-white px-6 py-2 rounded-xl
  transition-all duration-200 ease-out
  hover:bg-red-700 hover:shadow-lg hover:-translate-y-0.5
  active:scale-95 active:shadow-md hidden md:inline-block">
          Login
        </button>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-xl"
          onClick={() => setmenu(!menu)}
        >
          <FiMenu />
        </button>
      </div>

      {/* Mobile menu BELOW navbar */}
      {menu && (
        <div className="pt-2 items-center flex flex-col">
  <ul className="md:hidden flex flex-row items-center gap-4  border-t py-2 justify-around">
          <li className="hover:text-red-600 hover:scale-110 active:scale-90 transition-all duration-300 text-lg font-semibold">MENU</li>
          <li className="hover:text-red-600 hover:scale-110 active:scale-90 transition-all duration-300 text-lg font-semibold">LOCATION</li>
          <li className="hover:text-red-600 hover:scale-110 active:scale-90 transition-all duration-300 text-lg font-semibold">ABOUT</li>
          <li className="hover:text-red-600 hover:scale-110 active:scale-90 transition-all duration-300 text-lg font-semibold">CONTACT</li>
  
         
        </ul>
         <button className="bg-red-600 text-white px-6 py-2 rounded-xl mb-4 md:hidden ">
            Login
          </button>
        </div>
      


      )}

    </header>
  );
};

export default Navbar;
