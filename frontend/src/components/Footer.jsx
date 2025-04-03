import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube, FaEnvelope, FaPhone, FaMapMarkerAlt, FaArrowUp } from 'react-icons/fa';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-black/95 backdrop-blur-lg shadow-[0_-4px_30px_rgba(0,0,0,0.5)] relative border-t border-[#efc75e]/20">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 xl:px-8 pt-16 pb-8 relative">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-x-20 gap-y-12 mb-16">
          {/* About Section */}
          <div>
            <h3 className="text-[#efc75e] font-montserrat font-bold text-xl mb-4 uppercase tracking-wider">About Us</h3>
            <div className="h-[2px] w-12 bg-[#efc75e] mb-6"></div>
            <p className="text-gray-400 mb-4">Transform your body and mind with StrivFitness. Premium fitness programs and supplements for your journey to greatness.</p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" className="text-gray-400 hover:text-[#efc75e] transition-colors duration-300">
                <FaFacebook size={24} />
              </a>
              <a href="https://twitter.com" className="text-gray-400 hover:text-gym-accent transition-colors">
                <FaTwitter size={24} />
              </a>
              <a href="https://instagram.com" className="text-gray-400 hover:text-gym-accent transition-colors">
                <FaInstagram size={24} />
              </a>
              <a href="https://youtube.com" className="text-gray-400 hover:text-gym-accent transition-colors">
                <FaYoutube size={24} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-[#efc75e] font-montserrat font-bold text-xl mb-4 uppercase tracking-wider">Quick Links</h3>
            <div className="h-[2px] w-12 bg-[#efc75e] mb-6"></div>
            <ul className="space-y-2">
              {['Home', 'Shop', 'Articles', 'Training', 'About', 'Contact'].map((link) => (
                <li key={link}>
                  <a href={`/${link.toLowerCase()}`} className="text-gray-400 hover:text-[#efc75e] transition-colors duration-300">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-[#efc75e] font-montserrat font-bold text-xl mb-4 uppercase tracking-wider">Contact Us</h3>
            <div className="h-[2px] w-12 bg-[#efc75e] mb-6"></div>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <FaEnvelope className="text-[#efc75e]" />
                <a href="mailto:info@strivfitness.com" className="text-gray-400 hover:text-[#efc75e] transition-colors duration-300">
                  info@strivfitness.com
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <FaPhone className="text-[#efc75e]" />
                <a href="tel:+1234567890" className="text-gray-400 hover:text-[#efc75e] transition-colors duration-300">
                  (123) 456-7890
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <FaMapMarkerAlt className="text-[#efc75e]" />
                <span className="text-gray-400">123 Fitness Street, NY 10001</span>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-[#efc75e] font-montserrat font-bold text-xl mb-4 uppercase tracking-wider">Newsletter</h3>
            <div className="h-[2px] w-12 bg-[#efc75e] mb-6"></div>
            <p className="text-gray-400 mb-4">Subscribe to get special offers, free giveaways, and training tips.</p>
            <form className="space-y-3">
              <input
                type="email"
                placeholder="Your email"
                className="w-full px-4 py-3 bg-[#1a1a1a] border border-[#efc75e]/20 rounded focus:outline-none focus:border-[#efc75e] hover:border-[#efc75e]/50 text-gray-300 transition-all duration-300 hover:shadow-[0_2px_8px_rgba(239,199,94,0.15)] cursor-text"
              />
              <button
                type="submit"
                className="w-full bg-[#efc75e] text-[#121212] font-bold py-3 px-4 rounded hover:bg-[#efc75e]/90 transition-all duration-300 !cursor-pointer transform hover:scale-[1.02] hover:shadow-[0_4px_15px_rgba(239,199,94,0.3)]"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-[#efc75e]/10 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-center md:text-left mb-4 md:mb-0">
              © {new Date().getFullYear()} StrivFitness. All rights reserved.
            </p>
            <div className="flex space-x-4 text-gray-400">
              <a href="/privacy" className="hover:text-[#efc75e] transition-colors duration-300">Privacy Policy</a>
              <a href="/terms" className="hover:text-[#efc75e] transition-colors duration-300">Terms of Service</a>
            </div>
          </div>
        </div>

        {/* Scroll to top button */}
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-[#efc75e] text-[#121212] p-3 rounded-full shadow-lg hover:bg-[#efc75e]/90 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-[0_4px_15px_rgba(239,199,94,0.4)] cursor-pointer z-50"
          aria-label="Scroll to top"
        >
          <FaArrowUp size={20} />
        </button>
      </div>
    </footer>
  );
};

export default Footer;
