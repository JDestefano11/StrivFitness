import React, { useEffect } from "react";
import Navbar from "./components/Navbar";
import SaleTopBar from "./components/SaleTopBar";
import HeroSection from "./components/HeroSection";
import FeaturedProducts from "./components/FeaturedProducts";
import WhyChooseUs from "./components/WhyChooseUs";

const App = () => {
  // Optimize scrolling performance when component mounts
  useEffect(() => {
    // Set passive event listeners for better scroll performance
    const passiveSupported = () => {
      let passive = false;
      try {
        const options = {
          get passive() {
            passive = true;
            return true;
          }
        };
        window.addEventListener("test", null, options);
        window.removeEventListener("test", null, options);
      } catch (err) {
        passive = false;
      }
      return passive;
    };

    const passive = passiveSupported() ? { passive: true } : false;
    
    // Apply scroll optimization styles
    document.body.style.overscrollBehavior = 'none'; // Prevents bounce effects
    
    // Add passive event listeners to improve scroll performance
    document.addEventListener('wheel', () => {}, passive);
    document.addEventListener('touchstart', () => {}, passive);
    document.addEventListener('touchmove', () => {}, passive);
    
    // Optimize rendering with content-visibility
    const optimizeOffscreenContent = () => {
      const elements = document.querySelectorAll('section');
      if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.target && entry.target.style) {
              // When element is not in viewport, hint to the browser it can skip rendering
              if (!entry.isIntersecting) {
                entry.target.style.contentVisibility = 'auto';
              } else {
                entry.target.style.contentVisibility = 'visible';
              }
            }
          });
        }, { rootMargin: '200px' }); // Start loading before element is in view
        
        elements.forEach(el => observer.observe(el));
        
        return () => elements.forEach(el => observer.unobserve(el));
      }
      return () => {};
    };
    
    const cleanup = optimizeOffscreenContent();
    
    // Clean up function
    return () => {
      document.body.style.overscrollBehavior = 'auto';
      document.removeEventListener('wheel', () => {}, passive);
      document.removeEventListener('touchstart', () => {}, passive);
      document.removeEventListener('touchmove', () => {}, passive);
      cleanup();
    };
  }, []);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#2f4550] via-[#1a1a1a] to-[#2d2d2d] relative overflow-x-hidden will-change-transform">
      {/* Background elements with GPU acceleration */}
      <div className="absolute inset-0 bg-radial-gradient from-[#ff6b3505] via-transparent to-transparent opacity-80 pointer-events-none transform-gpu"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-transparent via-[#efc75e10] to-transparent opacity-70 mix-blend-overlay pointer-events-none transform-gpu"></div>
      
      {/* Main content */}
      <SaleTopBar />
      <Navbar />
      <main className="relative z-10">
        <HeroSection />
        <FeaturedProducts />
        <WhyChooseUs />
      </main>
    </div>
  );
};

export default App;
