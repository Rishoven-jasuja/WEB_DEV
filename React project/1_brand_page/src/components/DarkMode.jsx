import React, { useState } from "react";
import { MdDarkMode, MdLightMode } from "react-icons/md";

const DarkMode = () => {
  const [dark, setDark] = useState(false);

  const toggleDark = () => {
    setDark(!dark);
    document.body.classList.toggle("dark");
  };

  return (
    <button
      onClick={toggleDark}
      className="fixed right-4 top-48 p-3 rounded-full bg-red-600 text-white shadow-lg hover:scale-110 transition z-50"
    >
      {dark ? <MdLightMode size={22} /> : <MdDarkMode size={22} />}
    </button>
  );
};

export default DarkMode;
