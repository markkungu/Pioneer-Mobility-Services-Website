import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#0B3D5A] text-white py-8">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
        
        {/* Contact Info */}
        <div>
          <h3 className="text-xl font-semibold mb-3">Contact Us</h3>
          <p className="text-gray-300">📍 123 Main Street, Washington, WA</p>
          <p className="text-gray-300">📞 (123) 456-7890</p>
          <p className="text-gray-300">✉️ info@example.com</p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2">
            {["Privacy Policy", "Terms", "Careers"].map((link, index) => (
              <li key={index}>
                <a href="#" className="text-gray-300 hover:text-[#128178] transition">{link}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* Social Media Links */}
        <div>
          <h3 className="text-xl font-semibold mb-3">Follow Us</h3>
          <div className="flex justify-center md:justify-start space-x-4">
            <a href="#" className="text-gray-300 hover:text-[#128178] text-xl transition"><FaFacebookF /></a>
            <a href="#" className="text-gray-300 hover:text-[#128178] text-xl transition"><FaTwitter /></a>
            <a href="#" className="text-gray-300 hover:text-[#128178] text-xl transition"><FaLinkedinIn /></a>
            <a href="#" className="text-gray-300 hover:text-[#128178] text-xl transition"><FaInstagram /></a>
          </div>
        </div>

      </div>

      {/* Copyright */}
      <div className="text-center text-gray-400 text-sm mt-6">
        &copy; {new Date().getFullYear()} Your Company. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;

