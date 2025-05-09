import React, { useState, useEffect, useContext } from "react";
import logo from "../../public/assets/STRIV FITNESS LABS (3).png";
import SaleTopBar from "./SaleTopBar";
import { CartContext } from "../App";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("");
  const { cartCount } = useContext(CartContext);

  // Debug cart count
  useEffect(() => {
    console.log("Cart count in Navbar:", cartCount);
  }, [cartCount]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleHover = (link) => {
    setActiveLink(link);
  };

  return (
    <>
      <nav className="w-full fixed top-0 z-50 font-['Inter']">
        <SaleTopBar />

        {/* Main Navigation */}
        <div
          className={`w-full transition-all duration-500 ${
            isScrolled
              ? "bg-[#050B20]/95 shadow-[0_4px_30px_rgba(0,0,0,0.5)] backdrop-blur-lg border-b border-[#1DD1A1]/40"
              : "bg-gradient-to-r from-black/90 to-[#050B20]/90 backdrop-blur-md border-b border-[#1DD1A1]/30"
          }`}
        >
          {/* Premium navbar accent line */}
          <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#00FF94]/70 to-transparent"></div>

          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center justify-between h-20">
              {/* Logo - Left aligned with consistent spacing */}
              <div className="flex items-center justify-center">
                <img
                  src={logo}
                  alt="Logo"
                  className={`h-20 w-auto object-contain transition-all duration-500 ${
                    isScrolled
                      ? "filter drop-shadow-[0_0_3px_rgba(29,209,161,0.3)]"
                      : ""
                  }`}
                />
              </div>

              {/* Mobile menu button and icons - Improved alignment */}
              <div className="md:hidden flex items-center justify-end space-x-6">
                {/* Cart Icon - Mobile - Improved */}
                <a
                  href="/cart"
                  className="relative text-[#ffffff] hover:text-[#00FF94] transition-all duration-300 cursor-pointer transform hover:scale-110 flex items-center justify-center"
                  aria-label="Shopping Cart"
                >
                  {/* Improved Fitness Cart Icon */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-6 w-6 transition-all duration-300 ${
                      isScrolled
                        ? "filter drop-shadow-[0_0_3px_rgba(0,255,148,0.7)]"
                        : ""
                    }`}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    {/* Base of the shopping bag */}
                    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                    {/* Handles of the bag */}
                    <path d="M3 6h18" />
                    <path d="M16 10a4 4 0 0 1-8 0" />
                    {/* Fitness element - dumbbell icon inside bag */}
                    <circle cx="9" cy="14" r="1" fill="currentColor" />
                    <circle cx="15" cy="14" r="1" fill="currentColor" />
                    <path d="M9 14h6" />
                  </svg>
                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-[#FF4757] text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center font-['Montserrat'] text-[11px] shadow-lg border border-white/20">
                      {cartCount}
                    </span>
                  )}
                </a>

                {/* Menu Button - Mobile */}
                <button
                  onClick={toggleMenu}
                  className="text-[#ffffff] hover:text-[#1DD1A1] focus:outline-none cursor-pointer transform hover:scale-110 transition-all duration-300 flex items-center justify-center relative group"
                  aria-label="Menu"
                  aria-expanded={isMenuOpen}
                >
                  {/* Custom Fitness Menu Icon */}
                  <svg
                    className={`h-7 w-7 transition-all duration-300 ${
                      isScrolled
                        ? "filter drop-shadow-[0_0_3px_rgba(29,209,161,0.7)]"
                        : ""
                    }`}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    {isMenuOpen ? (
                      <>
                        {/* X close icon with dumbbell style */}
                        <path d="M6 6l12 12" />
                        <path d="M18 6L6 18" />
                        <circle cx="6" cy="6" r="1.5" fill="currentColor" />
                        <circle cx="18" cy="18" r="1.5" fill="currentColor" />
                        <circle cx="6" cy="18" r="1.5" fill="currentColor" />
                        <circle cx="18" cy="6" r="1.5" fill="currentColor" />
                      </>
                    ) : (
                      <>
                        {/* Dumbbell-inspired menu */}
                        <path d="M4 6h16" />
                        <circle cx="4" cy="6" r="1.5" fill="currentColor" />
                        <circle cx="20" cy="6" r="1.5" fill="currentColor" />

                        <path d="M4 12h16" />
                        <circle cx="4" cy="12" r="1.5" fill="currentColor" />
                        <circle cx="20" cy="12" r="1.5" fill="currentColor" />

                        <path d="M4 18h16" />
                        <circle cx="4" cy="18" r="1.5" fill="currentColor" />
                        <circle cx="20" cy="18" r="1.5" fill="currentColor" />
                      </>
                    )}
                  </svg>
                </button>
              </div>

              {/* Navigation Links - Desktop - Properly centered */}
              <div className="hidden md:flex items-center justify-center space-x-2 absolute left-1/2 transform -translate-x-1/2">
                <a
                  href="/"
                  onMouseEnter={() => handleHover("home")}
                  onMouseLeave={() => handleHover("")}
                  className={`px-3 py-2 text-[#ffffff] hover:text-[#00FF94] hover:bg-[#1C1C1E]/70 rounded-md transition-all duration-300 text-sm font-medium cursor-pointer relative overflow-hidden flex items-center justify-center h-10 ${
                    activeLink === "home" ? "scale-105" : ""
                  } font-['Rajdhani'] tracking-wide`}
                >
                  <span className="relative z-10">HOME</span>
                  {activeLink === "home" && (
                    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#00FF94] animate-pulse"></span>
                  )}
                </a>

                {/* Articles Dropdown - Hover Version */}
                <div className="relative group flex items-center">
                  <button
                    onMouseEnter={() => handleHover("articles")}
                    className={`px-3 py-2 text-[#ffffff] hover:text-[#1DD1A1] hover:bg-[#050B20]/70 rounded-md transition-all duration-300 text-sm font-medium flex items-center justify-center h-10 cursor-pointer relative overflow-hidden ${
                      activeLink === "articles" ? "scale-105" : ""
                    } font-['Rajdhani'] tracking-wide`}
                  >
                    <span className="relative z-10">ARTICLES</span>
                    <svg
                      className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:rotate-180"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7m0 0l-7-7m7-7H3"
                      />
                    </svg>
                    {activeLink === "articles" && (
                      <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#1DD1A1] animate-pulse"></span>
                    )}
                  </button>
                  <div className="absolute left-0 mt-0 top-full w-48 bg-gradient-to-b from-[#050B20]/95 to-black/95 backdrop-blur-md rounded-md shadow-[0_5px_15px_rgba(0,0,0,0.5)] overflow-hidden z-10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top scale-95 group-hover:scale-100 border border-[#1DD1A1]/30">
                    <a
                      href="/articles/fitness"
                      className="block px-4 py-3 text-sm text-[#ffffff] hover:bg-[#050B20]/80 hover:text-[#1DD1A1] w-full cursor-pointer transition-all duration-200 relative overflow-hidden group/item font-['Rajdhani'] tracking-wide flex items-center"
                    >
                      <span className="relative z-10">FITNESS</span>
                      <span className="absolute left-0 w-0 h-full bg-gradient-to-r from-[#00FF94]/20 to-transparent top-0 group-hover/item:w-full transition-all duration-300"></span>
                    </a>
                    <a
                      href="/articles/nutrition"
                      className="block px-4 py-3 text-sm text-[#ffffff] hover:bg-[#050B20]/80 hover:text-[#1DD1A1] w-full cursor-pointer transition-all duration-200 relative overflow-hidden group/item font-['Rajdhani'] tracking-wide flex items-center"
                    >
                      <span className="relative z-10">NUTRITION</span>
                      <span className="absolute left-0 w-0 h-full bg-gradient-to-r from-[#00FF94]/20 to-transparent top-0 group-hover/item:w-full transition-all duration-300"></span>
                    </a>
                    <a
                      href="/articles/wellness"
                      className="block px-4 py-3 text-sm text-[#ffffff] hover:bg-[#050B20]/80 hover:text-[#1DD1A1] w-full cursor-pointer transition-all duration-200 relative overflow-hidden group/item font-['Rajdhani'] tracking-wide flex items-center"
                    >
                      <span className="relative z-10">WELLNESS</span>
                      <span className="absolute left-0 w-0 h-full bg-gradient-to-r from-[#00FF94]/20 to-transparent top-0 group-hover/item:w-full transition-all duration-300"></span>
                    </a>
                  </div>
                </div>

                {/* Shop Dropdown - Hover Version */}
                <div className="relative group flex items-center">
                  <button
                    onMouseEnter={() => handleHover("shop")}
                    className={`px-3 py-2 text-[#ffffff] hover:text-[#1DD1A1] hover:bg-[#050B20]/70 rounded-md transition-all duration-300 text-sm font-medium flex items-center justify-center h-10 cursor-pointer relative overflow-hidden ${
                      activeLink === "shop" ? "scale-105" : ""
                    } font-['Rajdhani'] tracking-wide`}
                  >
                    <span className="relative z-10">SHOP</span>
                    <svg
                      className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:rotate-180"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7m0 0l-7-7m7-7H3"
                      />
                    </svg>
                    {activeLink === "shop" && (
                      <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#1DD1A1] animate-pulse"></span>
                    )}
                  </button>
                  <div className="absolute left-0 mt-0 top-full w-48 bg-gradient-to-b from-[#050B20]/95 to-black/95 backdrop-blur-md rounded-md shadow-[0_5px_15px_rgba(0,0,0,0.5)] overflow-hidden z-10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top scale-95 group-hover:scale-100 border border-[#1DD1A1]/30">
                    <a
                      href="/shop/all-products"
                      className="block px-4 py-4 text-base font-bold text-[#1DD1A1] hover:bg-[#050B20]/80 hover:text-[#1DD1A1] w-full cursor-pointer transition-all duration-200 relative overflow-hidden group/item font-['Rajdhani'] tracking-wide flex items-center"
                    >
                      <span className="relative z-10">ALL PRODUCTS</span>
                      <span className="absolute left-0 w-0 h-full bg-gradient-to-r from-[#00FF94]/20 to-transparent top-0 group-hover/item:w-full transition-all duration-300"></span>
                    </a>

                    <a
                      href="/shop/apparel"
                      className="block px-4 py-3 text-sm text-[#ffffff] hover:bg-[#050B20]/80 hover:text-[#1DD1A1] w-full cursor-pointer transition-all duration-200 relative overflow-hidden group/item font-['Rajdhani'] tracking-wide flex items-center"
                    >
                      <span className="relative z-10">APPAREL</span>
                      <span className="absolute left-0 w-0 h-full bg-gradient-to-r from-[#00FF94]/20 to-transparent top-0 group-hover/item:w-full transition-all duration-300"></span>
                    </a>
                    <a
                      href="/shop/equipment"
                      className="block px-4 py-3 text-sm text-[#ffffff] hover:bg-[#050B20]/80 hover:text-[#1DD1A1] w-full cursor-pointer transition-all duration-200 relative overflow-hidden group/item font-['Rajdhani'] tracking-wide flex items-center"
                    >
                      <span className="relative z-10">EQUIPMENT</span>
                      <span className="absolute left-0 w-0 h-full bg-gradient-to-r from-[#00FF94]/20 to-transparent top-0 group-hover/item:w-full transition-all duration-300"></span>
                    </a>
                    <a
                      href="/shop/accessories"
                      className="block px-4 py-3 text-sm text-[#ffffff] hover:bg-[#050B20]/80 hover:text-[#1DD1A1] w-full cursor-pointer transition-all duration-200 relative overflow-hidden group/item font-['Rajdhani'] tracking-wide flex items-center"
                    >
                      <span className="relative z-10">ACCESSORIES</span>
                      <span className="absolute left-0 w-0 h-full bg-gradient-to-r from-[#00FF94]/20 to-transparent top-0 group-hover/item:w-full transition-all duration-300"></span>
                    </a>
                  </div>
                </div>

                <a
                  href="/about"
                  onMouseEnter={() => handleHover("about")}
                  onMouseLeave={() => handleHover("")}
                  className={`px-3 py-2 text-[#ffffff] hover:text-[#00FF94] hover:bg-[#1C1C1E]/70 rounded-md transition-all duration-300 text-sm font-medium cursor-pointer relative overflow-hidden flex items-center justify-center h-10 ${
                    activeLink === "about" ? "scale-105" : ""
                  } font-['Rajdhani'] tracking-wide`}
                >
                  <span className="relative z-10">ABOUT</span>
                  {activeLink === "about" && (
                    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#00FF94] animate-pulse"></span>
                  )}
                </a>

                <a
                  href="/contact"
                  onMouseEnter={() => handleHover("contact")}
                  onMouseLeave={() => handleHover("")}
                  className={`px-3 py-2 text-[#ffffff] hover:text-[#00FF94] hover:bg-[#1C1C1E]/70 rounded-md transition-all duration-300 text-sm font-medium cursor-pointer relative overflow-hidden flex items-center justify-center h-10 ${
                    activeLink === "contact" ? "scale-105" : ""
                  } font-['Rajdhani'] tracking-wide`}
                >
                  <span className="relative z-10">CONTACT</span>
                  {activeLink === "contact" && (
                    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#00FF94] animate-pulse"></span>
                  )}
                </a>
              </div>

              {/* Right side icons - Desktop */}
              <div className="hidden md:flex items-center space-x-6">
                {/* Join Now Button - Premium rounded design */}
                <div className="relative h-full flex items-center">
                  <a
                    href="/signup"
                    className="relative h-full flex items-center justify-center"
                  >
                    <button className="relative group cursor-pointer overflow-hidden rounded-xl h-12 w-40 flex justify-center items-center">
                      {/* Background and glow effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-[#00FF94] to-[#1DD1A1] rounded-xl"></div>
                      <div className="absolute -inset-[1px] bg-gradient-to-r from-[#00FF94] via-[#FFFFFF] to-[#1DD1A1] rounded-xl opacity-0 group-hover:opacity-70 blur-[2px] transition-all duration-300 group-hover:duration-200 animate-gradient-x group-hover:animate-gradient-x-fast"></div>

                      {/* Shine effect */}
                      <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-30 transition-opacity duration-300 bg-[linear-gradient(135deg,rgba(255,255,255,0.8)_0%,transparent_50%,transparent_100%)]"></div>

                      {/* Content with hover animation */}
                      <div className="relative z-10 flex items-center justify-center w-full h-full px-4 py-2 font-['Bebas_Neue'] tracking-widest text-lg text-[#222222] group-hover:text-[#111111] transition-all duration-300 group-hover:scale-105">
                        <span className="flex items-center">
                          JOIN NOW
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 ml-2 transition-transform group-hover:translate-x-1 duration-300"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M14 5l7 7m0 0l-7 7m7-7H3"
                            />
                          </svg>
                        </span>
                      </div>

                      {/* Shadow for 3D effect */}
                      <div className="absolute -bottom-2 left-[10%] right-[10%] h-[6px] bg-black opacity-0 group-hover:opacity-20 blur-[3px] transition-all duration-300 transform group-hover:translate-y-[2px] rounded-full"></div>
                    </button>
                  </a>
                </div>

                {/* Cart Icon - Desktop - Improved */}
                <a
                  href="/cart"
                  className="relative text-[#ffffff] hover:text-[#00FF94] transition-all duration-300 cursor-pointer transform hover:scale-110 flex items-center justify-center"
                  aria-label="Shopping Cart"
                >
                  {/* Improved Fitness Cart Icon */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-6 w-6 transition-all duration-300 ${
                      isScrolled
                        ? "filter drop-shadow-[0_0_3px_rgba(0,255,148,0.7)]"
                        : ""
                    }`}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    {/* Base of the shopping bag */}
                    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                    {/* Handles of the bag */}
                    <path d="M3 6h18" />
                    <path d="M16 10a4 4 0 0 1-8 0" />
                    {/* Fitness element - dumbbell icon inside bag */}
                    <circle cx="9" cy="14" r="1" fill="currentColor" />
                    <circle cx="15" cy="14" r="1" fill="currentColor" />
                    <path d="M9 14h6" />
                  </svg>
                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-[#FF4757] text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center font-['Montserrat'] text-[11px] shadow-lg border border-white/20">
                      {cartCount}
                    </span>
                  )}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden bg-[#1C1C1E]/95 backdrop-blur-lg overflow-hidden transition-all duration-300 ${
            isMenuOpen
              ? "max-h-[500px] border-b border-[#00FF94]/10 shadow-[0_4px_30px_rgba(0,0,0,0.3)]"
              : "max-h-0"
          }`}
        >
          <div className="px-4 py-2 space-y-1">
            <a
              href="/"
              className="block px-3 py-2 text-[#ffffff] hover:text-[#00FF94] hover:bg-[#1C1C1E]/70 rounded-md transition-all duration-200 text-base font-medium cursor-pointer font-['Rajdhani'] tracking-wide flex items-center"
            >
              <span>HOME</span>
            </a>
            <a
              href="/articles"
              className="block px-3 py-2 text-[#ffffff] hover:text-[#00FF94] hover:bg-[#1C1C1E]/70 rounded-md transition-all duration-200 text-base font-medium cursor-pointer font-['Rajdhani'] tracking-wide flex items-center"
            >
              <span>ARTICLES</span>
            </a>
            <a
              href="/shop"
              className="block px-3 py-2 text-[#ffffff] hover:text-[#00FF94] hover:bg-[#1C1C1E]/70 rounded-md transition-all duration-200 text-base font-medium cursor-pointer font-['Rajdhani'] tracking-wide flex items-center"
            >
              <span>SHOP</span>
            </a>
            <a
              href="/about"
              className="block px-3 py-2 text-[#ffffff] hover:text-[#00FF94] hover:bg-[#1C1C1E]/70 rounded-md transition-all duration-200 text-base font-medium cursor-pointer font-['Rajdhani'] tracking-wide flex items-center"
            >
              <span>ABOUT</span>
            </a>
            <a
              href="/contact"
              className="block px-3 py-2 text-[#ffffff] hover:text-[#00FF94] hover:bg-[#1C1C1E]/70 rounded-md transition-all duration-200 text-base font-medium cursor-pointer font-['Rajdhani'] tracking-wide flex items-center"
            >
              <span>CONTACT</span>
            </a>
            {/* Updated Mobile Join Now Button */}
            <a
              href="/signup"
              className="block mt-4 relative overflow-hidden group"
            >
              <div
                className="bg-gradient-to-r from-[#00FF94] to-[#1DD1A1] text-[#0A0F2C] font-bold py-3 px-4 
                relative z-10 font-['Bebas_Neue'] tracking-widest text-lg flex items-center justify-center
                clip-path-join-button transform hover:scale-105 transition-all duration-300
                shadow-[0_4px_10px_rgba(0,255,148,0.3)] hover:shadow-[0_6px_15px_rgba(0,255,148,0.5)]"
              >
                <span className="relative z-10 flex items-center justify-center w-full">
                  JOIN NOW
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 ml-2 transition-transform group-hover:translate-x-1 duration-300"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </span>
              </div>

              {/* Animated border effect */}
              <div
                className="absolute -inset-[2px] bg-gradient-to-r from-[#1DD1A1] via-[#ffffff] to-[#00FF94] 
                opacity-70 blur-[2px] group-hover:opacity-100 group-hover:blur-[3px] transition-all duration-300 -z-10
                clip-path-join-button animate-gradient-x"
              ></div>

              {/* Animated shine effect */}
              <div
                className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 
                bg-gradient-to-r from-transparent via-white to-transparent opacity-20 z-20"
              ></div>
            </a>
          </div>
        </div>
      </nav>

      <style jsx global>{`
        .clip-path-join-button {
          clip-path: polygon(0 0, 100% 0, 95% 100%, 0% 100%);
        }

        @keyframes pulse-fast {
          0%,
          100% {
            opacity: 0.1;
          }
          50% {
            opacity: 0.3;
          }
        }

        @keyframes gradient-x {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        @keyframes gradient-x-fast {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        .animate-pulse-fast {
          animation: pulse-fast 1.5s ease-in-out infinite;
        }

        .animate-gradient-x {
          animation: gradient-x 3s ease infinite;
          background-size: 200% 200%;
        }

        .animate-gradient-x-fast {
          animation: gradient-x-fast 2s ease infinite;
          background-size: 200% 200%;
        }

        @keyframes pulse-once {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.2);
          }
          100% {
            transform: scale(1);
          }
        }

        .animate-pulse-once {
          animation: pulse-once 0.5s ease-in-out;
        }
      `}</style>
    </>
  );
};

export default Navbar;
