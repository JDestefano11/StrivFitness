import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

const Footer = () => {

  return (
    <footer className="bg-[#050B20] shadow-[0_-4px_30px_rgba(0,0,0,0.5)] relative">
      {/* Green line at the top of the footer */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#1DD1A1] to-transparent opacity-70"></div>
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 xl:px-8 pt-16 pb-8 relative">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-x-20 gap-y-12 mb-16">
          {/* About Section */}
          <div>
            <h3 className="text-[#1DD1A1] font-montserrat font-bold text-xl mb-6 uppercase tracking-wider">About Us</h3>
            <p className="text-gray-400 mb-4">Transform your body and mind with StrivFitness. Premium fitness programs and supplements for your journey to greatness.</p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" className="text-gray-400 hover:text-[#1DD1A1] transition-colors duration-300">
                <FaFacebook size={24} />
              </a>
              <a href="https://twitter.com" className="text-gray-400 hover:text-[#1DD1A1] transition-colors duration-300">
                <FaTwitter size={24} />
              </a>
              <a href="https://instagram.com" className="text-gray-400 hover:text-[#1DD1A1] transition-colors duration-300">
                <FaInstagram size={24} />
              </a>
              <a href="https://youtube.com" className="text-gray-400 hover:text-[#1DD1A1] transition-colors duration-300">
                <FaYoutube size={24} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-[#1DD1A1] font-montserrat font-bold text-xl mb-6 uppercase tracking-wider">Quick Links</h3>
            <ul className="space-y-2">
              {['Home', 'Shop', 'Articles', 'Training', 'About', 'Contact'].map((link) => (
                <li key={link}>
                  <a href={`/${link.toLowerCase()}`} className="text-gray-400 hover:text-[#00FF94] transition-colors duration-300">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-[#1DD1A1] font-montserrat font-bold text-xl mb-6 uppercase tracking-wider">Contact Us</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <FaEnvelope className="text-[#1DD1A1]" />
                <a href="mailto:info@strivfitness.com" className="text-gray-400 hover:text-[#1DD1A1] transition-colors duration-300">
                  info@strivfitness.com
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <FaPhone className="text-[#1DD1A1]" />
                <a href="tel:+1234567890" className="text-gray-400 hover:text-[#1DD1A1] transition-colors duration-300">
                  (123) 456-7890
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <FaMapMarkerAlt className="text-[#1DD1A1]" />
                <span className="text-gray-400">123 Fitness Street, NY 10001</span>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-[#1DD1A1] font-montserrat font-bold text-xl mb-6 uppercase tracking-wider">Newsletter</h3>
            <p className="text-gray-400 mb-4">Subscribe to get special offers, free giveaways, and training tips.</p>
            <form className="space-y-3">
              <input
                type="email"
                placeholder="Your email"
                className="w-full px-4 py-3 bg-[#050B20]/80 border border-[#1DD1A1]/30 rounded focus:outline-none focus:border-[#1DD1A1] hover:border-[#1DD1A1]/60 text-gray-300 transition-all duration-300 hover:shadow-[0_2px_8px_rgba(29,209,161,0.15)] cursor-text"
              />
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-[#1DD1A1] to-[#1DD1A1]/80 text-[#050B20] font-bold py-3 px-4 rounded hover:shadow-[0_4px_15px_rgba(29,209,161,0.3)] transition-all duration-300 !cursor-pointer transform hover:translate-y-[-2px] hover:shadow-lg"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-center md:text-left mb-4 md:mb-0">
              © {new Date().getFullYear()} StrivFitness. All rights reserved.
            </p>
            <div className="flex space-x-4 text-gray-400">
              <a href="/privacy" className="hover:text-[#1DD1A1] transition-colors duration-300">Privacy Policy</a>
              <a href="/terms" className="hover:text-[#1DD1A1] transition-colors duration-300">Terms of Service</a>
            </div>
          </div>
        </div>

        {/* Scroll to top button removed */}
      </div>
    </footer>
  );
};

export default Footer;
