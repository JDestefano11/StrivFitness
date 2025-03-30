import React, { useEffect } from "react";
import Navbar from "./components/Navbar";
import SaleTopBar from "./components/SaleTopBar";
import HeroSection from "./components/HeroSection";
import FeaturedProducts from "./components/FeaturedProducts";

const App = () => {
  // Optimize scrolling performance when component mounts
  useEffect(() => {
    // Set passive event listeners for better scroll performance
    const supportsPassive = false;
    try {
      window.addEventListener("test", null, 
        Object.defineProperty({}, 'passive', { 
          get: () => supportsPassive = true 
        })
      );
    } catch(e) {}
    
    // Apply scroll optimization styles
    document.body.style.overscrollBehavior = 'none'; // Prevents bounce effects
    
    // Clean up function
    return () => {
      document.body.style.overscrollBehavior = 'auto';
    };
  }, []);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#2f4550] via-[#1a1a1a] to-[#2d2d2d] relative overflow-x-hidden will-change-scroll">
      <div className="absolute inset-0 bg-radial-gradient from-[#ff6b3505] via-transparent to-transparent opacity-80 pointer-events-none"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-transparent via-[#efc75e10] to-transparent opacity-70 mix-blend-overlay pointer-events-none"></div>
      <SaleTopBar />
      <Navbar />
      <HeroSection />
      <FeaturedProducts />
    </div>
  );
};

export default App;
