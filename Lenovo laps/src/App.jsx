import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./Components/Login";
import Register from "./Components/Register";
import Welcome1 from "./Components/Welcome1";
import Home from "./Components/Home";
import AddProduct from "./Components/Addproduct";
import Product from "./Components/Product";
import About from "./Components/About";
import Services from "./Components/Services";
import UpdateProduct from "./Components/Updateproduct";
import Cart from "./Components/Cart";
import CheckoutPopup from "./Components/CheckoutPopup";

import { CartProvider } from "./Components/CartContext";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./App.css";

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Welcome1 />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/addproduct" element={<AddProduct />} />
          <Route path="/product" element={<Product />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          
      <Route path="/update/:id" element={<UpdateProduct />} />
    



          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<CheckoutPopup />} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
