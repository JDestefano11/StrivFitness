import React, { useState, useEffect } from "react";
import logo from "../../public/assets/STRIV FITNESS LABS (1).png";
import SaleTopBar from "./SaleTopBar";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("");

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
        {/* Sale Top Bar with Social Media and Email */}
        <SaleTopBar />

        {/* Main Navigation */}
        <div
          className={`w-full transition-all duration-500 ${
            isScrolled
              ? "bg-[#222222]/95 shadow-[0_4px_30px_rgba(0,0,0,0.3)] backdrop-blur-lg border-b border-[#efc75e]/10"
              : "bg-gradient-to-r from-[#222222]/90 to-[#222222]/80 backdrop-blur-sm"
          }`}
        >
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center justify-between h-20">
              {/* Logo - Left aligned with consistent spacing */}
              <div className="flex items-center justify-center">
                <img
                  src={logo}
                  alt="Logo"
                  className={`h-20 w-auto object-contain transition-all duration-500 ${
                    isScrolled
                      ? "filter drop-shadow-[0_0_3px_rgba(239,199,94,0.3)]"
                      : ""
                  }`}
                />
              </div>

              {/* Mobile menu button and icons - Properly aligned */}
              <div className="md:hidden flex items-center space-x-4">
                {/* Cart Icon - Mobile */}
                <a
                  href="/cart"
                  className="relative text-[#ffffff] hover:text-[#efc75e] transition-colors duration-200 cursor-pointer hover:scale-110 transform flex items-center justify-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-6 w-6 transition-all duration-300 ${
                      isScrolled
                        ? "filter drop-shadow-[0_0_2px_rgba(239,199,94,0.5)]"
                        : ""
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  <span className="absolute -top-2 -right-2 bg-[#dc143c] text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center font-['Rajdhani']">
                    0
                  </span>
                </a>

                {/* Menu Button - Mobile */}
                <button
                  onClick={toggleMenu}
                  className="text-[#ffffff] hover:text-[#efc75e] focus:outline-none cursor-pointer hover:scale-110 transform transition-all duration-200 flex items-center justify-center"
                >
                  <svg
                    className={`h-6 w-6 transition-all duration-300 ${
                      isScrolled
                        ? "filter drop-shadow-[0_0_2px_rgba(239,199,94,0.5)]"
                        : ""
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    {isMenuOpen ? (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    ) : (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 6h16M4 12h16M4 18h16"
                      />
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
                  className={`px-3 py-2 text-[#ffffff] hover:text-[#efc75e] hover:bg-[#333333]/50 rounded-md transition-all duration-300 text-sm font-medium cursor-pointer relative overflow-hidden flex items-center justify-center h-10 ${
                    activeLink === "home" ? "scale-105" : ""
                  } font-['Rajdhani'] tracking-wide`}
                >
                  <span className="relative z-10">HOME</span>
                  {activeLink === "home" && (
                    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-[#efc75e] to-[#efc75e]/50 animate-pulse"></span>
                  )}
                </a>

                {/* Articles Dropdown - Hover Version */}
                <div className="relative group flex items-center">
                  <button
                    onMouseEnter={() => handleHover("articles")}
                    className={`px-3 py-2 text-[#ffffff] hover:text-[#efc75e] hover:bg-[#333333]/50 rounded-md transition-all duration-300 text-sm font-medium flex items-center justify-center h-10 cursor-pointer relative overflow-hidden ${
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
                      <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-[#efc75e] to-[#efc75e]/50 animate-pulse"></span>
                    )}
                  </button>
                  <div className="absolute left-0 mt-0 top-full w-48 bg-[#333333]/90 backdrop-blur-md rounded-md shadow-[0_5px_15px_rgba(0,0,0,0.3)] overflow-hidden z-10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top scale-95 group-hover:scale-100 border border-[#efc75e]/10">
                    <a
                      href="/articles/fitness"
                      className="block px-4 py-3 text-sm text-[#ffffff] hover:bg-[#222222] hover:text-[#efc75e] w-full cursor-pointer transition-all duration-200 relative overflow-hidden group/item font-['Rajdhani'] tracking-wide flex items-center"
                    >
                      <span className="relative z-10">FITNESS</span>
                      <span className="absolute left-0 w-0 h-full bg-gradient-to-r from-[#efc75e]/20 to-transparent top-0 group-hover/item:w-full transition-all duration-300"></span>
                    </a>
                    <a
                      href="/articles/nutrition"
                      className="block px-4 py-3 text-sm text-[#ffffff] hover:bg-[#222222] hover:text-[#efc75e] w-full cursor-pointer transition-all duration-200 relative overflow-hidden group/item font-['Rajdhani'] tracking-wide flex items-center"
                    >
                      <span className="relative z-10">NUTRITION</span>
                      <span className="absolute left-0 w-0 h-full bg-gradient-to-r from-[#efc75e]/20 to-transparent top-0 group-hover/item:w-full transition-all duration-300"></span>
                    </a>
                    <a
                      href="/articles/wellness"
                      className="block px-4 py-3 text-sm text-[#ffffff] hover:bg-[#222222] hover:text-[#efc75e] w-full cursor-pointer transition-all duration-200 relative overflow-hidden group/item font-['Rajdhani'] tracking-wide flex items-center"
                    >
                      <span className="relative z-10">WELLNESS</span>
                      <span className="absolute left-0 w-0 h-full bg-gradient-to-r from-[#efc75e]/20 to-transparent top-0 group-hover/item:w-full transition-all duration-300"></span>
                    </a>
                  </div>
                </div>

                {/* Shop Dropdown - Hover Version */}
                <div className="relative group flex items-center">
                  <button
                    onMouseEnter={() => handleHover("shop")}
                    className={`px-3 py-2 text-[#ffffff] hover:text-[#efc75e] hover:bg-[#333333]/50 rounded-md transition-all duration-300 text-sm font-medium flex items-center justify-center h-10 cursor-pointer relative overflow-hidden ${
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
                      <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-[#efc75e] to-[#efc75e]/50 animate-pulse"></span>
                    )}
                  </button>
                  <div className="absolute left-0 mt-0 top-full w-48 bg-[#333333]/90 backdrop-blur-md rounded-md shadow-[0_5px_15px_rgba(0,0,0,0.3)] overflow-hidden z-10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top scale-95 group-hover:scale-100 border border-[#efc75e]/10">
                    <a
                      href="/shop/supplements"
                      className="block px-4 py-3 text-sm text-[#ffffff] hover:bg-[#222222] hover:text-[#efc75e] w-full cursor-pointer transition-all duration-200 relative overflow-hidden group/item font-['Rajdhani'] tracking-wide flex items-center"
                    >
                      <span className="relative z-10">SUPPLEMENTS</span>
                      <span className="absolute left-0 w-0 h-full bg-gradient-to-r from-[#efc75e]/20 to-transparent top-0 group-hover/item:w-full transition-all duration-300"></span>
                    </a>
                    <a
                      href="/shop/apparel"
                      className="block px-4 py-3 text-sm text-[#ffffff] hover:bg-[#222222] hover:text-[#efc75e] w-full cursor-pointer transition-all duration-200 relative overflow-hidden group/item font-['Rajdhani'] tracking-wide flex items-center"
                    >
                      <span className="relative z-10">APPAREL</span>
                      <span className="absolute left-0 w-0 h-full bg-gradient-to-r from-[#efc75e]/20 to-transparent top-0 group-hover/item:w-full transition-all duration-300"></span>
                    </a>
                    <a
                      href="/shop/equipment"
                      className="block px-4 py-3 text-sm text-[#ffffff] hover:bg-[#222222] hover:text-[#efc75e] w-full cursor-pointer transition-all duration-200 relative overflow-hidden group/item font-['Rajdhani'] tracking-wide flex items-center"
                    >
                      <span className="relative z-10">EQUIPMENT</span>
                      <span className="absolute left-0 w-0 h-full bg-gradient-to-r from-[#efc75e]/20 to-transparent top-0 group-hover/item:w-full transition-all duration-300"></span>
                    </a>
                  </div>
                </div>

                <a
                  href="/about"
                  onMouseEnter={() => handleHover("about")}
                  onMouseLeave={() => handleHover("")}
                  className={`px-3 py-2 text-[#ffffff] hover:text-[#efc75e] hover:bg-[#333333]/50 rounded-md transition-all duration-300 text-sm font-medium cursor-pointer relative overflow-hidden flex items-center justify-center h-10 ${
                    activeLink === "about" ? "scale-105" : ""
                  } font-['Rajdhani'] tracking-wide`}
                >
                  <span className="relative z-10">ABOUT</span>
                  {activeLink === "about" && (
                    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-[#efc75e] to-[#efc75e]/50 animate-pulse"></span>
                  )}
                </a>

                <a
                  href="/contact"
                  onMouseEnter={() => handleHover("contact")}
                  onMouseLeave={() => handleHover("")}
                  className={`px-3 py-2 text-[#ffffff] hover:text-[#efc75e] hover:bg-[#333333]/50 rounded-md transition-all duration-300 text-sm font-medium cursor-pointer relative overflow-hidden flex items-center justify-center h-10 ${
                    activeLink === "contact" ? "scale-105" : ""
                  } font-['Rajdhani'] tracking-wide`}
                >
                  <span className="relative z-10">CONTACT</span>
                  {activeLink === "contact" && (
                    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-[#efc75e] to-[#efc75e]/50 animate-pulse"></span>
                  )}
                </a>
              </div>

              {/* Right side icons - Desktop */}
              <div className="hidden md:flex items-center space-x-6">
                {/* Join Now Button - Enhanced animated design */}
                <div className="relative group">
                  <a href="/login" className="relative block overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-[#efc75e] to-[#f5d78e] text-[#222222] font-bold py-3 px-6 relative z-10 
                      font-['Bebas_Neue'] tracking-widest text-lg flex items-center justify-center
                      clip-path-join-button transform hover:scale-105 transition-all duration-300
                      shadow-[0_4px_10px_rgba(239,199,94,0.3)] hover:shadow-[0_8px_20px_rgba(239,199,94,0.6)]
                      group-hover:bg-gradient-to-r group-hover:from-[#f5d78e] group-hover:to-[#efc75e]
                      group-hover:text-[#111111]"
                    >
                      <span className="relative z-10 flex items-center">
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

                      {/* Inner pulse effect */}
                      <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 group-hover:animate-pulse-fast rounded-sm"></span>
                    </div>

                    {/* Enhanced animated border effect */}
                    <div
                      className="absolute -inset-[2px] bg-gradient-to-r from-[#efc75e] via-[#ffffff] to-[#efc75e] 
                      opacity-70 blur-[2px] group-hover:opacity-100 group-hover:blur-[3px] transition-all duration-300 -z-10
                      clip-path-join-button animate-gradient-x group-hover:animate-gradient-x-fast"
                    ></div>

                    {/* 3D lighting effect */}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-300
                      bg-[linear-gradient(135deg,rgba(255,255,255,0.8)_0%,transparent_50%,transparent_100%)] z-20"
                    ></div>

                    {/* Bottom shadow for 3D effect */}
                    <div
                      className="absolute bottom-0 left-[10%] right-[10%] h-[6px] bg-black opacity-0 group-hover:opacity-20 
                      blur-[3px] transition-all duration-300 transform group-hover:translate-y-[3px] rounded-full"
                    ></div>
                  </a>
                </div>

                {/* Cart Icon - Desktop */}
                <a
                  href="/cart"
                  className="relative text-[#ffffff] hover:text-[#efc75e] transition-colors duration-200 cursor-pointer hover:scale-110 transform flex items-center justify-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-6 w-6 transition-all duration-300 ${
                      isScrolled
                        ? "filter drop-shadow-[0_0_2px_rgba(239,199,94,0.5)]"
                        : ""
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  <span className="absolute -top-2 -right-2 bg-[#dc143c] text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center font-['Rajdhani']">
                    0
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden bg-[#222222]/95 backdrop-blur-lg overflow-hidden transition-all duration-300 ${
            isMenuOpen
              ? "max-h-[500px] border-b border-[#efc75e]/10 shadow-[0_4px_30px_rgba(0,0,0,0.3)]"
              : "max-h-0"
          }`}
        >
          <div className="px-4 py-2 space-y-1">
            <a
              href="/"
              className="block px-3 py-2 text-[#ffffff] hover:text-[#efc75e] hover:bg-[#333333]/50 rounded-md transition-all duration-200 text-base font-medium cursor-pointer font-['Rajdhani'] tracking-wide flex items-center"
            >
              <span>HOME</span>
            </a>
            <a
              href="/articles"
              className="block px-3 py-2 text-[#ffffff] hover:text-[#efc75e] hover:bg-[#333333]/50 rounded-md transition-all duration-200 text-base font-medium cursor-pointer font-['Rajdhani'] tracking-wide flex items-center"
            >
              <span>ARTICLES</span>
            </a>
            <a
              href="/shop"
              className="block px-3 py-2 text-[#ffffff] hover:text-[#efc75e] hover:bg-[#333333]/50 rounded-md transition-all duration-200 text-base font-medium cursor-pointer font-['Rajdhani'] tracking-wide flex items-center"
            >
              <span>SHOP</span>
            </a>
            <a
              href="/about"
              className="block px-3 py-2 text-[#ffffff] hover:text-[#efc75e] hover:bg-[#333333]/50 rounded-md transition-all duration-200 text-base font-medium cursor-pointer font-['Rajdhani'] tracking-wide flex items-center"
            >
              <span>ABOUT</span>
            </a>
            <a
              href="/contact"
              className="block px-3 py-2 text-[#ffffff] hover:text-[#efc75e] hover:bg-[#333333]/50 rounded-md transition-all duration-200 text-base font-medium cursor-pointer font-['Rajdhani'] tracking-wide flex items-center"
            >
              <span>CONTACT</span>
            </a>
            {/* Updated Mobile Join Now Button */}
            <a
              href="/login"
              className="block mt-4 relative overflow-hidden group"
            >
              <div
                className="bg-gradient-to-r from-[#efc75e] to-[#f5d78e] text-[#222222] font-bold py-3 px-4 
                relative z-10 font-['Bebas_Neue'] tracking-widest text-lg flex items-center justify-center
                clip-path-join-button transform hover:scale-105 transition-all duration-300
                shadow-[0_4px_10px_rgba(239,199,94,0.3)] hover:shadow-[0_6px_15px_rgba(239,199,94,0.5)]"
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
                className="absolute -inset-[2px] bg-gradient-to-r from-[#efc75e] via-[#ffffff] to-[#efc75e] 
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
      `}</style>
    </>
  );
};

export default Navbar;
