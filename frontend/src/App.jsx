import React from 'react'
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import PlaceOrder from './pages/placeOrder';
import './index.css';
import Collection from './pages/Collection';
import About from './pages/About';
import Product from './pages/Product';
import Cart from './pages/Cart';
import Orders from './pages/Orders';
import Navbar from './components/Navbar';
import Contact from './pages/Contact';
import Footer from './components/Footer';
import SearchBar from './pages/SearchBar';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className='px-4  md:px[7vw] lg:px[9vw]'>
      <ToastContainer />
      <Navbar />
      <SearchBar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='Collection' element={<Collection />} />
        <Route path='About' element={<About />} />
        <Route path='/login' element={<Login />} />
        <Route path='/Contact' element={<Contact />} />
        <Route path='/product/:id' element={<Product />} />
        <Route path='/Cart' element={<Cart />} />
        <Route path='/place-order' element={<PlaceOrder />} />
        <Route path='/Orders' element={<Orders />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App

