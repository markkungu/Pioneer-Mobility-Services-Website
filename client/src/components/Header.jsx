import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useSelector } from "react-redux";
import logo from "../assets/LOGO PNG/header.png";

const NAV_LINKS = [
  { title: "Home", path: "/" },
  { title: "About", path: "/about" },
  { title: "Services", path: "/services" },
  { title: "Bookings", path: "/bookings" },
  { title: "Contact", path: "/contact" },
  { title: "Profile", path: "/profile" },
];

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { currentUser } = useSelector((state) => state.user);

  console.log("Current User:", currentUser); // Debugging

  return (
    <header className="bg-white shadow-md w-full top-0 left-0 z-50">
      <div className="container mx-auto flex justify-between items-center p-2 text-white">
        {/* Logo */}
        <div>
          <Link to="/">
            <img src={logo} alt="Logo" className="h-28 w-auto" />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6">
          {NAV_LINKS.map(({ title, path }) => (
            <Link key={title} to={path} className="hover:text-[#0B3D5A] text-black">
              {title}
            </Link>
          ))}
        </nav>

        {/* Show "Book a Ride" if logged in, otherwise "Sign In" */}
        <div className="hidden md:block">
          {currentUser ? (
            <Link to="/services">
              <button className="bg-[#128178] text-white px-4 py-2 rounded-lg shadow-md hover:bg-[#0B3D5A] font-semibold">
                Book a Ride
              </button>
            </Link>
          ) : (
            <Link to="/signin">
              <button className="bg-[#128178] text-white px-4 py-2 rounded-lg shadow-md hover:bg-[#0B3D5A] font-semibold">
                Sign In
              </button>
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <nav className="md:hidden bg-white shadow-md p-4 absolute top-16 left-0 w-full flex flex-col space-y-4">
          {NAV_LINKS.map(({ title, path }) => (
            <Link key={title} to={path} className="hover:text-[#0B3D5A]">
              {title}
            </Link>
          ))}

          {/* Show "Book a Ride" if logged in, otherwise "Sign In" */}
          {currentUser ? (
            <Link to="/services">
              <button className="bg-[#128178] text-white px-4 py-2 rounded-lg shadow-md hover:bg-[#0B3D5A] font-semibold">
                Book a Ride
              </button>
            </Link>
          ) : (
            <Link to="/signin">
              <button className="bg-[#128178] text-white px-4 py-2 rounded-lg shadow-md hover:bg-[#0B3D5A] font-semibold">
                Sign In
              </button>
            </Link>
          )}
        </nav>
      )}

      {/* Help Section (Visible on Medium Screens and Larger) */}
      <div className="hidden md:block text-right px-6">
        <p className="text-gray-600 text-lg">GET HELP 24/7</p>
        <p className="text-[#188754] text-xl font-semibold">206-307-7496</p>
      </div>
    </header>
  );
};

export default Header;
