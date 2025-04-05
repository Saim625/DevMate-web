import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto">
        <nav className="grid grid-flow-col gap-6 justify-center text-sm">
          <Link to="/about-us" className="hover:underline">About Us</Link>
          <Link to="/contact-us" className="hover:underline">Contact Us</Link>
          <Link to="/privacy-policy" className="hover:underline">Privacy Policy</Link>
          <Link to="/refund-policy" className="hover:underline">Refund Policy</Link>
          <Link to="/service-policy" className="hover:underline">Service Policy</Link>
          <Link to="/terms-and-conditions" className="hover:underline">Terms & Conditions</Link>
        </nav>
        <div className="mt-6 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} DevMate. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
