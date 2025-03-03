import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import logo from "../assets/LOGO PNG/header.png";
import react from "react";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-gradient-to-r from-[#128178] to-[#0B3D5A] shadow-md w-full top-0 left-0 z-50">
      <div className="container mx-auto flex justify-between items-center p-2 text-white">
      <div>
          <Link to="/">
            <img src={logo} alt="Logo" className="h-28 w-auto" />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6">
          {[
            "Home",
            "About",
            "Services",
            "Scheduling",
            "Blog",
            "Contact",
          ].map((item) => (
            <Link
              key={item}
              to={`/${item.toLowerCase()}`}
              className=" hover:text-[#0B3D5A]"
            >
              {item}
            </Link>
          ))}
        </nav>

        {/* CTA Button */}
        <div className="hidden md:block">
          <Link to={"/services"}>
          <button className="bg-[#128178] text-white px-4 py-2 rounded-lg shadow-md hover:bg-[#0B3D5A] font-semibold ">
            Book a Ride
          </button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <nav className="md:hidden bg-white shadow-md p-4 absolute top-16 left-0 w-full flex flex-col space-y-4">
          {[
            "Home",
            "About",
            "Services",
            "Scheduling",
            "Blog",
            "Contact",
          ].map((item) => (
            <Link
              key={item}
              to={`/${item.toLowerCase()}`}
              className="text-[#128178] hover:text-[#0B3D5A]"
              onClick={() => setIsOpen(false)}
            >
              {item}
            </Link>
          ))}
          <button className="bg-[#0B3D5A] text-white px-4 py-2 rounded-lg shadow-md hover:bg-[#128178]">
            Book a Ride
          </button>
        </nav>
      )}
    </header>
  );
};

export default Header;
