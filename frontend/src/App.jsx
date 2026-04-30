import React, { useEffect, useState } from 'react'
import { Toaster } from "react-hot-toast";
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import { Footer } from './components/Footer'
import Register from './pages/Register'
import UpdateProfile from './components/UpdateProfile'
import Services from './components/Services'
import Booking from './components/Booking'
import Appointment from './components/Appointment'
import Forgetpass from './pages/Forgetpass';
import About from './pages/About';
import Contact from './pages/Contact';
import Loader from './components/Loader'

//  Layout fix
const Layout = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    const timer = setTimeout(() => {
      setLoading(false);
    }, 1300);

    return () => clearTimeout(timer);
  }, [location]);

  return (
    <>
      <Navbar />
      <Toaster position="top-right" />

      {loading ? (
        <Loader />
      ) : (
        <div className='pt-18'>
          <Routes>
            {/* User */}
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forget" element={<Forgetpass />} />
            <Route path="/profile" element={<UpdateProfile />} />
            {/* Service & Booking */}
            <Route path="/services" element={<Services />} />
            <Route path="/booking/:id" element={<Booking />} />
            <Route path="/appointments" element={<Appointment />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </div>
      )}

      <Footer />
    </>
  );
};


const App = () => {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  )
}

export default App;