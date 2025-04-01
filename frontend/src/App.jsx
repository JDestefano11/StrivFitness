import React, { useEffect, lazy, Suspense } from "react";
import Navbar from "./components/Navbar";
import SaleTopBar from "./components/SaleTopBar";
import HeroSection from "./components/HeroSection";

// Lazy load non-critical components
const FeaturedProducts = lazy(() => import("./components/FeaturedProducts"));
const WhyChooseUs = lazy(() => import("./components/WhyChooseUs"));
const DiscountBanner = lazy(() => import("./components/DiscountBanner"));
const ArticlesSection = lazy(() => import("./components/ArticlesSection"));
const TrustBadgeSection = lazy(() => import("./components/TrustBadgeSection"));

// Simple loading fallback that doesn't cause layout shifts
const LoadingFallback = () => <div className="h-96 bg-black"></div>;

// Critical CSS styles for immediate rendering
const criticalStyles = `
  body {
    margin: 0;
    padding: 0;
    background-color: #000;
    color: #fff;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
    line-height: 1.5;
  }
  
  /* Typography System */
  h1, h2, h3, h4, h5, h6, .heading-font {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
    font-weight: 700;
    letter-spacing: 0.02em;
    line-height: 1.2;
    margin-top: 0;
  }
  
  p, .body-font {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
    font-weight: 400;
  }
  
  button, .button-font, .accent-font {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
    font-weight: 600;
    letter-spacing: 0.05em;
    text-transform: uppercase;
  }
  
  .hero-heading {
    font-size: 3rem;
    margin-bottom: 1rem;
    color: #fff;
  }
  
  .hero-accent {
    color: #efc75e;
  }
  
  @media (min-width: 768px) {
    .hero-heading {
      font-size: 4rem;
    }
  }
`;

const App = () => {
  // Inject critical CSS and optimize initial load
  useEffect(() => {
    // Inject critical CSS
    const style = document.createElement('style');
    style.innerHTML = criticalStyles;
    document.head.appendChild(style);
    
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
    
    // Apply GPU acceleration to the body for smoother scrolling
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
      document.head.removeChild(style);
      window.removeEventListener('scroll', scrollHandler);
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className="min-h-screen w-full bg-black relative overflow-x-hidden">
      {/* Main content */}
      <SaleTopBar />
      <Navbar />
      <main>
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
          <DiscountBanner />
        </Suspense>
        <Suspense fallback={<LoadingFallback />}>
          <ArticlesSection />
        </Suspense>
        <Suspense fallback={<LoadingFallback />}>
          <TrustBadgeSection />
        </Suspense>
      </main>
    </div>
  );
};

export default App;
