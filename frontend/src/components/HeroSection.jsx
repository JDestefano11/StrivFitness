import React, { useState, useEffect } from "react";
import heroVideo from "../../public/assets/1502318-hd_1920_1080_30fps.mp4";

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    
    // Check if the device is mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Initial check
    checkMobile();
    
    // Add event listener for window resize
    window.addEventListener('resize', checkMobile);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <section className="relative w-full min-h-screen overflow-hidden bg-black">
      {/* Full-screen video background */}
      <div className="absolute inset-0 w-full h-full z-0">
        <video
          src={heroVideo}
          className="h-full w-full object-cover object-center"
          autoPlay
          muted
          loop
          playsInline
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

      {/* Content Section - Moved to the left */}
      <div className="relative z-10 flex items-center justify-start h-full min-h-screen">
        <div className="w-full max-w-2xl px-4 sm:px-8 lg:px-16 py-6 md:py-8 mx-auto md:mx-0 md:ml-20 lg:ml-36">
          {/* Logo/Brand Badge - Hidden on mobile */}
          <div
            className={`hidden md:inline-flex items-center space-x-2 bg-black/50 backdrop-blur-sm border border-[#efc75e]/20 rounded-full px-3 py-1 mb-4 md:mb-6 transition-all duration-700 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#efc75e] animate-pulse"></span>
            <span className="text-[#efc75e] text-xs font-bold tracking-widest">
              STRIV FITNESS
            </span>
          </div>

          {/* Main Heading */}
          <h1
            className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-3 md:mb-4 transition-all duration-700 delay-100 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            Premium Fitness <span className="text-[#efc75e]">Equipment</span> &{" "}
            <span className="text-[#efc75e]">Articles</span>
          </h1>

          {/* Simple Description */}
          <p
            className={`text-base sm:text-lg md:text-xl text-gray-300 mb-6 md:mb-10 max-w-xl transition-all duration-700 delay-200 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            Everything you need for your fitness journey in one place. Quality
            equipment, expert articles, and personalized training plans.
          </p>

          {/* Main CTA Buttons */}
          <div
            className={`flex ${isMobile ? 'flex-col w-full' : 'flex-row'} gap-3 md:gap-4 mb-6 md:mb-10 transition-all duration-700 delay-300 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <a
              href="/shop"
              className={`${isMobile ? 'w-full text-center text-sm py-2.5' : ''} bg-[#efc75e] text-black font-bold px-4 sm:px-6 md:px-8 py-3 md:py-4 rounded-lg relative overflow-hidden group transition-all duration-300 ease-out transform hover:scale-[1.02] hover:shadow-[0_0_15px_rgba(239,199,94,0.5)]`}
            >
              <span className="relative z-10">Shop Equipment</span>
              <span className="absolute inset-0 bg-gradient-to-r from-[#f5d57b] to-[#efc75e] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-black group-hover:w-full transition-all duration-300 ease-out"></span>
            </a>
            <a
              href="/articles"
              className={`${isMobile ? 'w-full text-center text-sm py-2.5' : ''} bg-black/30 backdrop-blur-sm border-2 border-[#efc75e] text-white font-bold px-4 sm:px-6 md:px-8 py-3 md:py-4 rounded-lg relative overflow-hidden group transition-all duration-300 ease-out transform hover:scale-[1.02] hover:shadow-[0_0_15px_rgba(239,199,94,0.3)]`}
            >
              <span className="relative z-10">Read Articles</span>
              <span className="absolute inset-0 bg-[#efc75e]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#efc75e] group-hover:w-full transition-all duration-300 ease-out"></span>
            </a>
          </div>

          {/* Trust Indicators */}
          <div
            className={`grid grid-cols-2 gap-3 md:gap-5 transition-all duration-700 delay-400 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <div className="flex items-center">
              <svg
                className="w-5 h-5 md:w-6 md:h-6 text-[#efc75e] mr-2 md:mr-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                ></path>
              </svg>
              <span className="text-white text-sm md:text-base">
                Free Shipping Over $50
              </span>
            </div>
            <div className="flex items-center">
              <svg
                className="w-5 h-5 md:w-6 md:h-6 text-[#efc75e] mr-2 md:mr-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                ></path>
              </svg>
              <span className="text-white text-sm md:text-base">30-Day Returns</span>
            </div>
            <div className="flex items-center">
              <svg
                className="w-5 h-5 md:w-6 md:h-6 text-[#efc75e] mr-2 md:mr-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                ></path>
              </svg>
              <span className="text-white text-sm md:text-base">Expert Advice</span>
            </div>
            <div className="flex items-center">
              <svg
                className="w-5 h-5 md:w-6 md:h-6 text-[#efc75e] mr-2 md:mr-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                ></path>
              </svg>
              <span className="text-white text-sm md:text-base">Secure Checkout</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
