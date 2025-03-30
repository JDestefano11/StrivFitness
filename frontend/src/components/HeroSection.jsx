import React, { useState, useEffect, useRef } from "react";
import heroVideo from "../../public/assets/1502318-hd_1920_1080_30fps.mp4";

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  // Refs for elements we'll animate
  const brandBadgeRef = useRef(null);
  const headingRef = useRef(null);
  const descriptionRef = useRef(null);
  const ctaButtonsRef = useRef(null);
  const trustIndicatorsRef = useRef(null);
  
  // Animation frame ID for cleanup
  const animationRef = useRef(null);

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
    
    // Animation function using requestAnimationFrame
    const animateElements = () => {
      const startTime = performance.now();
      const duration = 700; 
      
      const animate = (currentTime) => {
        const elapsedTime = currentTime - startTime;
        const progress = Math.min(elapsedTime / duration, 1);
        
        // Easing function (ease-out)
        const easeOutProgress = 1 - Math.pow(1 - progress, 3);
        
        // Apply animations with different delays
        if (brandBadgeRef.current) {
          const delayedProgress = elapsedTime > 0 ? easeOutProgress : 0;
          brandBadgeRef.current.style.opacity = delayedProgress;
          brandBadgeRef.current.style.transform = `translateY(${10 * (1 - delayedProgress)}px)`;
        }
        
        if (headingRef.current) {
          const delayedProgress = elapsedTime > 100 ? (elapsedTime - 100) / duration : 0;
          const easedProgress = 1 - Math.pow(1 - Math.min(delayedProgress, 1), 3);
          headingRef.current.style.opacity = easedProgress;
          headingRef.current.style.transform = `translateY(${10 * (1 - easedProgress)}px)`;
        }
        
        if (descriptionRef.current) {
          const delayedProgress = elapsedTime > 200 ? (elapsedTime - 200) / duration : 0;
          const easedProgress = 1 - Math.pow(1 - Math.min(delayedProgress, 1), 3);
          descriptionRef.current.style.opacity = easedProgress;
          descriptionRef.current.style.transform = `translateY(${10 * (1 - easedProgress)}px)`;
        }
        
        if (ctaButtonsRef.current) {
          const delayedProgress = elapsedTime > 300 ? (elapsedTime - 300) / duration : 0;
          const easedProgress = 1 - Math.pow(1 - Math.min(delayedProgress, 1), 3);
          ctaButtonsRef.current.style.opacity = easedProgress;
          ctaButtonsRef.current.style.transform = `translateY(${10 * (1 - easedProgress)}px)`;
        }
        
        if (trustIndicatorsRef.current) {
          const delayedProgress = elapsedTime > 400 ? (elapsedTime - 400) / duration : 0;
          const easedProgress = 1 - Math.pow(1 - Math.min(delayedProgress, 1), 3);
          trustIndicatorsRef.current.style.opacity = easedProgress;
          trustIndicatorsRef.current.style.transform = `translateY(${10 * (1 - easedProgress)}px)`;
        }
        
        // Continue animation if not complete
        if (elapsedTime < duration + 400) { // 400 is the max delay
          animationRef.current = requestAnimationFrame(animate);
        }
      };
      
      // Start the animation
      animationRef.current = requestAnimationFrame(animate);
    };
    
    // Start animation when component mounts
    animateElements();
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', checkMobile);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <section className="relative w-full min-h-screen overflow-hidden bg-black font-['Inter']">
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

      {/* Content Section - Moved further to the left */}
      <div className="relative z-10 flex items-center justify-start h-full min-h-screen content-visibility-auto">
        <div className="w-full max-w-2xl px-4 sm:px-8 lg:px-12 py-6 md:py-8 mx-auto md:mx-0 md:ml-10 lg:ml-20">
          {/* Logo/Brand Badge - Hidden on mobile */}
          <div
            ref={brandBadgeRef}
            className="hidden md:inline-flex items-center space-x-2 bg-black/50 backdrop-blur-sm border border-[#efc75e]/20 rounded-full px-3 py-1 mb-4 md:mb-6"
            style={{ opacity: 0, transform: 'translateY(10px)' }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#efc75e] animate-pulse"></span>
            <span className="text-[#efc75e] text-xs font-bold tracking-widest font-['Rajdhani']">
              STRIV FITNESS
            </span>
          </div>

          {/* Main Heading */}
          <h1
            ref={headingRef}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-3 md:mb-4 font-['Rajdhani'] tracking-wide uppercase will-change-transform"
            style={{ opacity: 0, transform: 'translateY(10px)' }}
          >
            Premium Fitness <span className="text-[#efc75e]">Equipment</span> &{" "}
            <span className="text-[#efc75e]">Articles</span>
          </h1>

          {/* Simple Description */}
          <p
            ref={descriptionRef}
            className="text-base sm:text-lg md:text-xl text-gray-300 mb-6 md:mb-10 max-w-xl will-change-transform"
            style={{ opacity: 0, transform: 'translateY(10px)' }}
          >
            Everything you need for your fitness journey in one place. Quality
            equipment, expert articles, and personalized training plans.
          </p>

          {/* Main CTA Buttons */}
          <div
            ref={ctaButtonsRef}
            className={`flex ${isMobile ? 'flex-col w-full' : 'flex-row'} gap-3 md:gap-4 mb-6 md:mb-10 will-change-transform`}
            style={{ opacity: 0, transform: 'translateY(10px)' }}
          >
            <a
              href="/shop"
              className={`${
                isMobile ? 'w-full text-center py-2.5' : ''
              } bg-[#efc75e] text-black font-bold px-5 sm:px-7 md:px-9 py-3 md:py-4 rounded-md relative overflow-hidden group transition-all duration-300 ease-out transform hover:scale-[1.02] hover:shadow-[0_0_15px_rgba(239,199,94,0.5)] font-['Rajdhani'] tracking-wider uppercase text-sm md:text-base flex items-center justify-center`}
            >
              <span className="relative z-10">Shop Equipment</span>
              <span className="absolute inset-0 bg-gradient-to-r from-[#f5d57b] to-[#efc75e] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-black group-hover:w-full transition-all duration-300 ease-out"></span>
            </a>
            <a
              href="/articles"
              className={`${
                isMobile ? 'w-full text-center py-2.5' : ''
              } bg-black/30 backdrop-blur-sm border-2 border-[#efc75e] text-white font-bold px-5 sm:px-7 md:px-9 py-3 md:py-4 rounded-md relative overflow-hidden group transition-all duration-300 ease-out transform hover:scale-[1.02] hover:shadow-[0_0_15px_rgba(239,199,94,0.3)] font-['Rajdhani'] tracking-wider uppercase text-sm md:text-base flex items-center justify-center`}
            >
              <span className="relative z-10">Read Articles</span>
              <span className="absolute inset-0 bg-[#efc75e]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#efc75e] group-hover:w-full transition-all duration-300 ease-out"></span>
            </a>
          </div>

          {/* Trust Indicators */}
          <div
            ref={trustIndicatorsRef}
            className="grid grid-cols-2 gap-3 md:gap-5 will-change-transform"
            style={{ opacity: 0, transform: 'translateY(10px)' }}
          >
            <div className="flex items-center">
              <svg
                className="w-5 h-5 md:w-6 md:h-6 text-[#efc75e] mr-2 md:mr-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                ></path>
              </svg>
              <span className="text-white text-sm md:text-base font-['Rajdhani']">
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
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M16 15v-1a4 4 0 00-4-4H8m0 0l3 3m-3-3l3-3m9 14V5a2 2 0 00-2-2H6a2 2 0 00-2 2v16l4-2 4 2 4-2 4 2z"
                ></path>
              </svg>
              <span className="text-white text-sm md:text-base font-['Rajdhani']">30-Day Returns</span>
            </div>
            <div className="flex items-center">
              <svg
                className="w-5 h-5 md:w-6 md:h-6 text-[#efc75e] mr-2 md:mr-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                ></path>
              </svg>
              <span className="text-white text-sm md:text-base font-['Rajdhani']">Expert Advice</span>
            </div>
            <div className="flex items-center">
              <svg
                className="w-5 h-5 md:w-6 md:h-6 text-[#efc75e] mr-2 md:mr-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                ></path>
              </svg>
              <span className="text-white text-sm md:text-base font-['Rajdhani']">Secure Checkout</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
