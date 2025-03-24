import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useSelector } from "react-redux";
import logo from "../assets/LOGO PNG/header.png";

const NAV_LINKS = [
  { title: "Home", path: "/", subtitle: "How we help" },
  { title: "About", path: "/about", subtitle: "Who we are" },
  { title: "Services", path: "/services", subtitle: "Schedule a ride" },
  { title: "Bookings", path: "/bookings", subtitle: "View your rides" },
  { title: "Contact", path: "/contact", subtitle: "Get in touch" },
  { title: "Profile", path: "/profile", subtitle: "Manage your account" },
];

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { currentUser } = useSelector((state) => state.user);

  // Function to close mobile menu on navigation click
  const handleNavClick = () => {
    setIsOpen(false);
  };

  return (
    <header className="bg-white  w-full top-0 left-0 z-50">
      <div className="container mx-auto flex justify-between items-center p-2">
        
        {/* Logo */}
        <div>
          <Link to="/">
            <img src={logo} alt="Logo" className="h-28 w-auto" />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6">
          {NAV_LINKS.map(({ title, path, subtitle }) => (
            <div key={title} className="flex flex-col items-start">
              <Link to={path} className="hover:text-[#0B3D5A] text-black font-semibold">
                {title}
              </Link>
              <span className="text-sm text-gray-500">{subtitle}</span>
            </div>
          ))}
        </nav>

        {/* Button and Help Section */}
        <div className="hidden md:flex items-center space-x-6">
          {currentUser ? (
            <Link to="/services">
              <button className="bg-[#188754] text-white px-4 py-2 rounded-lg shadow-md hover:bg-[#128178] font-semibold">
                Book a Ride
              </button>
            </Link>
          ) : (
            <Link to="/signin">
              <button className="bg-[#188754] text-white px-4 py-2 rounded-lg shadow-md hover:bg-[#128178] font-semibold">
                Sign In
              </button>
            </Link>
          )}

          {/* Help Section */}
          <div className="text-right border-l-2 border-l-gray-200 pl-4">
            <p className="text-gray-600 text-lg">GET HELP 24/7</p>
            <p className="text-[#188754] text-xl font-semibold">206-307-7496</p>
          </div>
        </div>

        {/* Mobile Menu Button (Green Color) */}
        <button className="md:hidden text-[#188754]" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={30} /> : <Menu size={30} />}
        </button>
      </div>

      {/* Mobile Navigation (Closes on click) */}
      {isOpen && (
        <nav className="md:hidden bg-white shadow-md p-4 absolute top-16 left-0 w-full flex flex-col space-y-4">
          {NAV_LINKS.map(({ title, path, subtitle }) => (
            <div key={title} className="flex flex-col items-center">
              <Link
                to={path}
                className="hover:text-[#0B3D5A] text-black font-semibold"
                onClick={handleNavClick} // Closes menu when clicked
              >
                {title}
              </Link>
              <span className="text-sm text-gray-500">{subtitle}</span>
            </div>
          ))}

          {/* Show "Book a Ride" if logged in, otherwise "Sign In" */}
          {currentUser ? (
            <Link to="/services" onClick={handleNavClick}>
              <button className="bg-[#188754] text-white px-4 py-2 rounded-lg shadow-md hover:bg-[#128178] font-semibold">
                Book a Ride
              </button>
            </Link>
          ) : (
            <Link to="/signin" onClick={handleNavClick}>
              <button className="bg-[#188754] text-white px-4 py-2 rounded-lg shadow-md hover:bg-[#128178] font-semibold">
                Sign In
              </button>
            </Link>
          )}
        </nav>
      )}
    </header>
  );
};

export default Header;
