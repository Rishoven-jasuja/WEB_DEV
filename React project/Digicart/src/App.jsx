import React from "react";
import Navbar from "./components/Navbar/Navbar";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Product from "./pages/Product";
import Shop from "./pages/Shop";
import Shopcategory from "./pages/Shopcategory";
import Cart from "./pages/Cart";
import Login from "./pages/Login";

const App = () => {
  return (
    <BrowserRouter>
      

      <Routes>

        if(path!="/kids") {
          <Navbar />}
        <Route path="/" element={<Shop />} />

        <Route path="/mens" element={<Shopcategory category="mens" />} />
        <Route path="/womens" element={<Shopcategory category="womens" />} />
        <Route path="/kids" element={<Shopcategory category="kids" />} />

        <Route path="/product" element={<Product />} />
        <Route path="/product/:productId" element={<Product />} />

        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;