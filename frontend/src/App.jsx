import React, { useEffect } from "react";
import Navbar from "./components/Navbar";
import SaleTopBar from "./components/SaleTopBar";
import HeroSection from "./components/HeroSection";
import FeaturedProducts from "./components/FeaturedProducts";
import WhyChooseUs from "./components/WhyChooseUs";
import DiscountBanner from "./components/DiscountBanner";
import ArticlesSection from "./components/ArticlesSection";

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
    
    // Apply scroll optimization styles - but don't use overscrollBehavior as it can cause weird scrolling
    document.documentElement.style.scrollBehavior = 'auto';
    
    // Apply GPU acceleration to the body for smoother scrolling
    document.body.style.transform = 'translateZ(0)';
    document.body.style.backfaceVisibility = 'hidden';
    document.body.style.perspective = '1000px';
    
    // Reduce paint workload during scrolling
    document.body.style.willChange = 'transform';
    
    // Prevent layout thrashing by batching DOM reads/writes
    let ticking = false;
    const scrollHandler = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          // Any scroll-dependent calculations would go here
          ticking = false;
        });
        ticking = true;
      }
    };
    
    // Add passive event listeners with proper handler
    window.addEventListener('scroll', scrollHandler, passive);
    
    // Clean up function
    return () => {
      document.documentElement.style.scrollBehavior = '';
      document.body.style.transform = '';
      document.body.style.backfaceVisibility = '';
      document.body.style.perspective = '';
      document.body.style.willChange = '';
      window.removeEventListener('scroll', scrollHandler, passive);
    };
  }, []);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#2f4550] via-[#1a1a1a] to-[#2d2d2d] relative overflow-x-hidden">
      {/* Background elements with GPU acceleration */}
      <div className="fixed inset-0 bg-radial-gradient from-[#ff6b3505] via-transparent to-transparent opacity-80 pointer-events-none transform-gpu"></div>
      <div className="fixed inset-0 bg-gradient-to-t from-transparent via-[#efc75e10] to-transparent opacity-70 mix-blend-overlay pointer-events-none transform-gpu"></div>
      
      {/* Main content */}
      <SaleTopBar />
      <Navbar />
      <main className="relative z-10">
        <HeroSection />
        <FeaturedProducts />
        <WhyChooseUs />
        <DiscountBanner />
        <ArticlesSection />
      </main>
    </div>
  );
};

export default App;
