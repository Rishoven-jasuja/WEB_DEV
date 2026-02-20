import React from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import DarkMode from "./components/DarkMode";
import Login from "./components/Login";
import { Analytics } from "@vercel/analytics/react"

import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

function Layout() {
  const location = useLocation();

  return (
    <>
      <Analytics />
       <DarkMode />
      {location.pathname !== "/login" && <Navbar />}

      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

const App = () => {
  return (
    <BrowserRouter>
     
      <Layout />
    </BrowserRouter>
  );
};

export default App;