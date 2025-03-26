import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Blog from "./pages/Blog.jsx";
import Service from "./pages/Service.jsx";
import Booking from "./pages/Bookings.jsx";
import Contact from "./pages/Contact.jsx";
import Header from "./components/Header.jsx";
import SignIn from "./pages/SignIn.jsx";
import Signup from "./pages/SignUp.jsx";
import React from "react";
import Footer from "./components/Footer.jsx";
import Scheduling from "./pages/Scheduling.jsx";
import Payment from "./pages/Payment.jsx";
import {PrivateRouter, AdminRouter} from "./components/PrivateRouter.jsx";
import Profile from "./pages/Profile.jsx";
import AdminBookings from "./pages/AdminBookings.jsx";
import AdminUsers from "./pages/AdminUsers.jsx";
import AdminSignIn from "./pages/AdminSignIn.jsx";
import AdminSignUp from "./pages/AdminSignUp.jsx";
import AdminHome from "./pages/AdminHome.jsx";

export default function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        {/* Header */}
        <Header />

        {/* Main Content */}
        <main className="flex-1 ">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/services" element={<Service />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<Signup />} />

            <Route element={<PrivateRouter />}>
              <Route path="/scheduling" element={<Scheduling />} />
              <Route path="/payment" element={<Payment />} />
              <Route path="/bookings" element={<Booking />} />
              <Route path="/profile" element={<Profile />} />
            </Route>

              <Route path="/adminsignup" element={<AdminSignUp />} />
              <Route path="/adminsignin" element={<AdminSignIn />} />
              
            <Route element={<AdminRouter />}>
              <Route path="/adminhome" element={<AdminHome />} />
              <Route path="/adminusers" element={<AdminUsers />} />
              <Route path="/adminbookings" element={<AdminBookings />} />
            </Route>
          </Routes>
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </Router>
  );
}
