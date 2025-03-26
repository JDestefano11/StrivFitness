import React, { useState, useEffect } from "react";
import heroVideo from "../../public/assets/AdobeStock_417477500.mov";

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative w-full min-h-screen overflow-hidden bg-black">
      {/* Full-screen video background */}
      <div className="absolute inset-0 w-full h-full z-0">
        <video 
          src={heroVideo}
          className="h-full w-full object-cover"
          autoPlay 
          muted 
          loop 
          playsInline
        />
        {/* Video overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-black/30"></div>
        
        {/* Corner accents */}
        <div className="absolute top-0 right-0 w-24 h-24">
          <div className="absolute top-0 right-0 w-full h-[2px] bg-gradient-to-l from-[#efc75e] to-transparent"></div>
          <div className="absolute top-0 right-0 h-full w-[2px] bg-gradient-to-b from-[#efc75e] to-transparent"></div>
        </div>
        <div className="absolute bottom-0 left-0 w-24 h-24">
          <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-[#efc75e] to-transparent"></div>
          <div className="absolute bottom-0 left-0 h-full w-[2px] bg-gradient-to-t from-[#efc75e] to-transparent"></div>
        </div>
      </div>

      {/* Content Section - Left aligned but overlaid on video */}
      <div className="relative z-10 flex items-center h-full min-h-screen">
        <div className="w-full max-w-xl px-6 sm:px-8 lg:px-16 py-8 ml-0 md:ml-12 lg:ml-24">
          {/* Logo/Brand Badge */}
          <div className={`inline-flex items-center space-x-2 bg-black/50 backdrop-blur-sm border border-[#efc75e]/20 rounded-full px-3 py-1 mb-6 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <span className="w-1.5 h-1.5 rounded-full bg-[#efc75e] animate-pulse"></span>
            <span className="text-[#efc75e] text-xs font-bold tracking-widest">STRIV FITNESS</span>
          </div>
          
          {/* Main Heading */}
          <h1 className={`text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-3 transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            Premium Fitness <span className="text-[#efc75e]">Equipment</span> & <span className="text-[#efc75e]">Articles</span>
          </h1>
          
          {/* Simple Description */}
          <p className={`text-base sm:text-lg text-gray-300 mb-8 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            Everything you need for your fitness journey in one place. Quality equipment, expert articles, and personalized training plans.
          </p>
          
          {/* Main CTA Buttons */}
          <div className={`flex flex-col sm:flex-row gap-3 mb-8 transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <a 
              href="/shop" 
              className="bg-[#efc75e] text-black font-bold px-8 py-4 rounded-lg hover:bg-[#d8b351] transition-colors duration-300 text-center"
            >
              Shop Equipment
            </a>
            <a 
              href="/articles" 
              className="bg-black/30 backdrop-blur-sm border-2 border-[#efc75e] text-white font-bold px-8 py-4 rounded-lg hover:bg-[#efc75e]/10 transition-colors duration-300 text-center"
            >
              Read Articles
            </a>
          </div>
          
          {/* Trust Indicators */}
          <div className={`grid grid-cols-2 gap-4 transition-all duration-700 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="flex items-center">
              <svg className="w-5 h-5 text-[#efc75e] mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span className="text-white text-sm">Free Shipping Over $50</span>
            </div>
            <div className="flex items-center">
              <svg className="w-5 h-5 text-[#efc75e] mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span className="text-white text-sm">30-Day Returns</span>
            </div>
            <div className="flex items-center">
              <svg className="w-5 h-5 text-[#efc75e] mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span className="text-white text-sm">Expert Advice</span>
            </div>
            <div className="flex items-center">
              <svg className="w-5 h-5 text-[#efc75e] mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span className="text-white text-sm">Secure Checkout</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
