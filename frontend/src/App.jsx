import React, { useEffect, lazy, Suspense } from "react";
import Navbar from "./components/Navbar";
import SaleTopBar from "./components/SaleTopBar";
import HeroSection from "./components/HeroSection";
import Footer from "./components/Footer";

// Lazy load non-critical components
const FeaturedProducts = lazy(() => import("./components/FeaturedProducts"));
const WhyChooseUs = lazy(() => import("./components/WhyChooseUs"));
const ArticlesSection = lazy(() => import("./components/ArticlesSection"));
const TrustBadgeSection = lazy(() => import("./components/TrustBadgeSection"));
const NewsletterSection = lazy(() => import("./components/NewsletterSection"));

// Simple loading fallback that doesn't cause layout shifts
const LoadingFallback = () => <div className="h-96 bg-black"></div>;

const App = () => {
  // Optimize initial load
  useEffect(() => {
    // Add preconnect for domains
    const addPreconnect = (url) => {
      const link = document.createElement('link');
      link.rel = 'preconnect';
      link.href = url;
      link.crossOrigin = 'anonymous';
      document.head.appendChild(link);
    };

    // Add preload for critical resources
    const addPreload = (url, as, type = '') => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = url;
      link.as = as;
      if (type) link.type = type;
      document.head.appendChild(link);
    };

    // Add preconnect for API domain
    addPreconnect('http://localhost:3001');
    
    // Preload hero static image for immediate display
    addPreload('/assets/hero-static.jpg', 'image');
    
    // Preload fonts
    addPreload('https://fonts.googleapis.com/css2?family=Rajdhani:wght@500;700&display=swap', 'style');
    
    // Apply GPU acceleration for smoother scrolling
    document.body.style.transform = 'translateZ(0)';
    document.body.style.backfaceVisibility = 'hidden';
    
    // Optimize scroll behavior
    let ticking = false;
    const scrollHandler = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          ticking = false;
        });
        ticking = true;
      }
    };
    
    // Add passive event listeners with proper handler
    window.addEventListener('scroll', scrollHandler, { passive: true });
    
    // Load non-critical resources after initial render
    const timer = setTimeout(() => {
      // Preload video after initial render
      const videoLink = document.createElement('link');
      videoLink.rel = 'preload';
      videoLink.href = '/assets/1502318-hd_1920_1080_30fps.mp4';
      videoLink.as = 'video';
      document.head.appendChild(videoLink);
    }, 2000);
    
    // Clean up function
    return () => {
      window.removeEventListener('scroll', scrollHandler);
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className="min-h-screen w-full relative overflow-x-hidden">
      {/* Main content */}
      <SaleTopBar />
      <Navbar />
      <main className="section-container">
        {/* Critical path components loaded immediately */}
        <HeroSection />
        
        {/* Non-critical components lazy loaded */}
        <Suspense fallback={<LoadingFallback />}>
          <FeaturedProducts />
        </Suspense>
        <Suspense fallback={<LoadingFallback />}>
          <WhyChooseUs />
        </Suspense>
        <Suspense fallback={<LoadingFallback />}>
          <ArticlesSection />
        </Suspense>
        <Suspense fallback={<LoadingFallback />}>
          <TrustBadgeSection />
        </Suspense>
        <Suspense fallback={<LoadingFallback />}>
          <NewsletterSection />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
};

export default App;
