import React from 'react'
import {Routes, Route} from 'react-router-dom'
import Navbar from './assets/js/Navbar'
import Footer from './assets/js/Footer'
import Home from './pages/Home'
import Location from './pages/Location'
import Checkout from './pages/Checkout'
import Cart from './pages/Cart'
import Admin from './pages/Admin/Admin.js'
function App() {
  const url = window.location.pathname
  return (
    <>
    {
      (url.includes('/admin')) ? <></> : <Navbar/>
    }
    <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/location" element={<Location/>}/>
        <Route path="/checkout" element={<Checkout/>}/>
        <Route path="/cart" element={<Cart/>}/>
        <Route path="/admin" element={<Admin/>} />
        <Route path="/admin/:select" element={<Admin/>} />
    </Routes>
    <Footer/>
    </>
  )
}

export default App
