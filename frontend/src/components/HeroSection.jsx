import React, { useState, useEffect } from "react";
import heroVideo from "../../public/assets/1502318-hd_1920_1080_30fps.mp4";

const HeroSection = () => {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    // Check if the device is mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Initial check
    checkMobile();
    
    // Add event listener for window resize
    window.addEventListener('resize', checkMobile);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  return (
    <section className="relative w-full min-h-screen overflow-hidden bg-black body-font" aria-label="Hero Section">
      {/* Full-screen video background */}
      <div className="absolute inset-0 w-full h-full z-0">
        <video
          src={heroVideo}
          className="h-full w-full object-cover object-center"
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
        />
        {/* Video overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30 md:from-black md:via-black/70 md:to-black/30"></div>

        {/* Corner accents */}
        <div className="absolute top-0 right-0 w-16 h-16 md:w-24 md:h-24">
          <div className="absolute top-0 right-0 w-full h-[2px] bg-gradient-to-l from-[#efc75e] to-transparent"></div>
          <div className="absolute top-0 right-0 h-full w-[2px] bg-gradient-to-b from-[#efc75e] to-transparent"></div>
        </div>
        <div className="absolute bottom-0 left-0 w-16 h-16 md:w-24 md:h-24">
          <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-[#efc75e] to-transparent"></div>
          <div className="absolute bottom-0 left-0 h-full w-[2px] bg-gradient-to-t from-[#efc75e] to-transparent"></div>
        </div>
      </div>

      {/* Content Section - Moved further to the left */}
      <div className="relative z-10 flex items-center justify-start h-full min-h-screen">
        <div className="w-full max-w-2xl px-4 sm:px-8 lg:px-12 py-6 md:py-8 mx-auto md:mx-0 md:ml-10 lg:ml-20">
          {/* Logo/Brand Badge - Hidden on mobile */}
          <div
            className="hidden md:inline-flex items-center space-x-2 bg-black/50 backdrop-blur-sm border border-[#efc75e]/20 rounded-full px-3 py-1 mb-4 md:mb-6"
            aria-label="Striv Fitness Brand Badge"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#efc75e]" aria-hidden="true"></span>
            <span className="text-[#efc75e] text-xs font-bold tracking-widest heading-font uppercase">
              STRIV FITNESS
            </span>
          </div>

          {/* Main Heading */}
          <h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-3 md:mb-4 heading-font uppercase tracking-wide"
            id="hero-heading"
          >
            Premium Fitness <span className="text-[#efc75e]">Equipment</span> &{" "}
            <span className="text-[#efc75e]">Articles</span>
          </h1>

          {/* Simple Description */}
          <p
            className="text-base sm:text-lg md:text-xl text-gray-300 mb-6 md:mb-10 max-w-xl body-font"
          >
            Everything you need for your fitness journey in one place. Quality
            equipment, expert articles, and personalized training plans.
          </p>

          {/* Main CTA Buttons */}
          <div
            className={`flex ${isMobile ? 'flex-col w-full' : 'flex-row'} gap-3 md:gap-4 mb-6 md:mb-10`}
          >
            <a
              href="/shop"
              className={`${
                isMobile ? 'w-full text-center py-2.5' : ''
              } bg-[#efc75e] text-black font-bold px-5 sm:px-7 md:px-9 py-3 md:py-4 rounded-md accent-font text-sm md:text-base flex items-center justify-center transition-all duration-300 hover:bg-[#efc75e]/90 hover:shadow-[0_4px_15px_rgba(239,199,94,0.4)] transform hover:scale-[1.02] cursor-pointer`}
              aria-label="Shop for fitness equipment"
            >
              <span className="relative z-10">Shop Equipment</span>
            </a>
            <a
              href="/articles"
              className={`${
                isMobile ? 'w-full text-center py-2.5' : ''
              } bg-black/30 backdrop-blur-sm border-2 border-[#efc75e] text-white font-bold px-5 sm:px-7 md:px-9 py-3 md:py-4 rounded-md accent-font text-sm md:text-base flex items-center justify-center transition-all duration-300 hover:bg-black/50 hover:border-[#efc75e]/90 hover:shadow-[0_4px_15px_rgba(239,199,94,0.2)] transform hover:scale-[1.02] cursor-pointer`}
              aria-label="Read fitness articles"
            >
              <span className="relative z-10">Read Articles</span>
            </a>
          </div>

          {/* Trust Indicators */}
          <div
            className="grid grid-cols-2 gap-3 md:gap-5"
            aria-label="Our benefits"
          >
            <div className="flex items-center">
              <svg
                className="w-5 h-5 md:w-6 md:h-6 text-[#efc75e] mr-2 md:mr-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                ></path>
              </svg>
              <span className="text-white text-sm md:text-base heading-font">
                Free Shipping Over $50
              </span>
            </div>
            <div className="flex items-center">
              <svg
                className="w-5 h-5 md:w-6 md:h-6 text-[#efc75e] mr-2 md:mr-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M16 15v-1a4 4 0 00-4-4H8m0 0l3 3m-3-3l3-3m9 14V5a2 2 0 00-2-2H6a2 2 0 00-2 2v16l4-2 4 2 4-2 4 2z"
                ></path>
              </svg>
              <span className="text-white text-sm md:text-base heading-font">30-Day Returns</span>
            </div>
            <div className="flex items-center">
              <svg
                className="w-5 h-5 md:w-6 md:h-6 text-[#efc75e] mr-2 md:mr-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                ></path>
              </svg>
              <span className="text-white text-sm md:text-base heading-font">Expert Advice</span>
            </div>
            <div className="flex items-center">
              <svg
                className="w-5 h-5 md:w-6 md:h-6 text-[#efc75e] mr-2 md:mr-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                ></path>
              </svg>
              <span className="text-white text-sm md:text-base heading-font">Secure Checkout</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;