import React, { useState, useEffect, useCallback } from "react";
import heroVideo from "../../public/assets/1502318-hd_1920_1080_30fps.mp4";

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Handle animations
  useEffect(() => {
    setIsVisible(true); // Trigger animations when component mounts

    // Optimize resize event listener using debounce
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    const debounceResize = () => {
      clearTimeout(window.resizeTimeout);
      window.resizeTimeout = setTimeout(handleResize, 200);
    };

    window.addEventListener("resize", debounceResize);
    return () => {
      window.removeEventListener("resize", debounceResize);
    };
  }, []);

  return (
    <section className="relative w-full min-h-screen overflow-hidden bg-black font-['Inter']" aria-label="Hero Section">
      {/* Full-screen video background */}
      <div className="absolute inset-0 w-full h-full z-0">
        <video
          src={heroVideo}
          className="h-full w-full object-cover object-center"
          autoPlay
          muted
          loop
          playsInline
          loading="lazy"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30 md:from-black md:via-black/70 md:to-black/30"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex items-center justify-start h-full min-h-screen content-visibility-auto">
        <div className="w-full max-w-2xl px-4 sm:px-8 lg:px-12 py-6 md:py-8 mx-auto md:mx-0 md:ml-10 lg:ml-20">
          {/* Brand Badge */}
          <div
            className={`hidden md:inline-flex items-center space-x-2 bg-black/50 backdrop-blur-sm border border-[#efc75e]/20 rounded-full px-3 py-1 mb-4 md:mb-6 transition-all duration-700 ease-out ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#efc75e] animate-pulse"></span>
            <span className="text-[#efc75e] text-xs font-bold tracking-widest font-['Rajdhani']">
              STRIV FITNESS
            </span>
          </div>

          {/* Main Heading */}
          <h1
            className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-3 md:mb-4 font-['Rajdhani'] tracking-wide uppercase transition-all duration-700 ease-out ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
            }`}
          >
            Premium Fitness <span className="text-[#efc75e]">Equipment</span> &{" "}
            <span className="text-[#efc75e]">Articles</span>
          </h1>

          {/* Description */}
          <p
            className={`text-base sm:text-lg md:text-xl text-gray-300 mb-6 md:mb-10 max-w-xl transition-all duration-700 ease-out ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
            }`}
          >
            Everything you need for your fitness journey in one place. Quality
            equipment, expert articles, and personalized training plans.
          </p>

          {/* CTA Buttons */}
          <div
            className={`flex ${isMobile ? 'flex-col w-full' : 'flex-row'} gap-3 md:gap-4 mb-6 md:mb-10 transition-all duration-700 ease-out ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
            }`}
          >
            <a
              href="/shop"
              className="bg-[#efc75e] text-black font-bold px-5 sm:px-7 md:px-9 py-3 md:py-4 rounded-md relative overflow-hidden group transition-all duration-300 ease-out transform hover:scale-[1.02] hover:shadow-[0_0_15px_rgba(239,199,94,0.5)] font-['Rajdhani'] tracking-wider uppercase text-sm md:text-base flex items-center justify-center"
            >
              <span className="relative z-10">Shop Equipment</span>
            </a>
            <a
              href="/articles"
              className="bg-black/30 backdrop-blur-sm border-2 border-[#efc75e] text-white font-bold px-5 sm:px-7 md:px-9 py-3 md:py-4 rounded-md relative overflow-hidden group transition-all duration-300 ease-out transform hover:scale-[1.02] hover:shadow-[0_0_15px_rgba(239,199,94,0.3)] font-['Rajdhani'] tracking-wider uppercase text-sm md:text-base flex items-center justify-center"
            >
              <span className="relative z-10">Read Articles</span>
            </a>
          </div>

          {/* Trust Indicators */}
          <div
            className={`grid grid-cols-2 gap-3 md:gap-5 transition-all duration-700 ease-out ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
            }`}
          >
            <div className="flex items-center">
              <svg className="w-6 h-6 text-[#efc75e]" fill="currentColor"></svg>
              <span className="ml-2 text-white">100% Quality</span>
            </div>
            <div className="flex items-center">
              <svg className="w-6 h-6 text-[#efc75e]" fill="currentColor"></svg>
              <span className="ml-2 text-white">Secure Payments</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
