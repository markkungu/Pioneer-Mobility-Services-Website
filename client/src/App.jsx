import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Blog from "./pages/Blog.jsx";
import Service from "./pages/Service.jsx";
import Booking from "./pages/Booking.jsx";
import Contact from "./pages/Contact.jsx";
import Header from "./components/Header.jsx";
import SignIn from "./pages/SignIn.jsx";
import Signup from "./pages/SignUp.jsx";
import React from "react";
import Footer from "./components/footer.jsx";


export default function App() {
  return (
    <Router>
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="flex-1 ">
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/service" element={<Service />} />
          <Route path="/Scheduling" element={<Booking />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  </Router>
  );
}
