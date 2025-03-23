import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa";
import logo from "../assets/LOGO PNG/header.png";

const Footer = () => {
  return (
    <footer className="bg-[#eafff5] py-10">
      {/* Footer Container */}
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Logo & About Section */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <img className="w-28 md:w-36 h-auto mb-4" src={logo} alt="Pioneer MS LOGO" />
            <p className="text-[#1e1e1e] text-base md:text-lg leading-relaxed">
              Pioneer Mobility Services delivers exceptional NEMT solutions in
              Washington State, including specialized school transportation and
              strategic partnerships with healthcare providers, prioritizing
              safety and client care.
            </p>
          </div>

          {/* Quick Links Section */}
          <div className="text-center md:text-left">
            <h3 className="text-[#1e1e1e] text-xl md:text-2xl font-semibold mb-4">Quick Links</h3>
            <ul className="text-[#3e3e3e] text-base md:text-lg space-y-2">
              <li><a href="#">Home</a></li>
              <li><a href="#">About Us</a></li>
              <li><a href="#">Our Services</a></li>
              <li><a href="#">Blog</a></li>
              <li><a href="#">Terms of Service</a></li>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Careers</a></li>
            </ul>
          </div>

          {/* Contact Us Section */}
          <div className="text-center md:text-left">
            <h3 className="text-[#1e1e1e] text-xl md:text-2xl font-semibold mb-4">Contact Us</h3>
            <p className="text-[#3e3e3e] text-base md:text-lg leading-relaxed">
              206-307-7496 | 206-307-5575 <br />
              info@pioneermobilityservices.com <br />
              123 Pioneer Mobility Road, <br />
              Washington, USA
            </p>
          </div>
        </div>

        {/* Social Icons & Copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center mt-10 border-t border-gray-300 pt-6">
          {/* Social Media Icons */}
          <div className="flex space-x-6">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <FaFacebookF className="text-[#1877F2] text-2xl md:text-3xl hover:text-[#1255a5] transition" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <FaInstagram className="text-[#E4405F] text-2xl md:text-3xl hover:text-[#c13584] transition" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <FaTwitter className="text-[#1DA1F2] text-2xl md:text-3xl hover:text-[#0d8ddb] transition" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <FaLinkedinIn className="text-[#0A66C2] text-2xl md:text-3xl hover:text-[#084d91] transition" />
            </a>
          </div>

          {/* Copyright */}
          <p className="text-black text-sm md:text-lg mt-6 md:mt-0 text-center">
            Copyright 2025. Pioneer Mobility Services. All Rights Reserved
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
