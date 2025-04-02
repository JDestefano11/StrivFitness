import React, { useEffect, lazy, Suspense } from "react";
import Navbar from "./components/Navbar";
import SaleTopBar from "./components/SaleTopBar";
import HeroSection from "./components/HeroSection";

// Lazy load non-critical components
const FeaturedProducts = lazy(() => import("./components/FeaturedProducts"));
const WhyChooseUs = lazy(() => import("./components/WhyChooseUs"));
const ArticlesSection = lazy(() => import("./components/ArticlesSection"));
const TrustBadgeSection = lazy(() => import("./components/TrustBadgeSection"));

// Simple loading fallback that doesn't cause layout shifts
const LoadingFallback = () => <div className="h-96 bg-black"></div>;

const App = () => {
  useEffect(() => {
    // Scroll to top on page load
    window.scrollTo(0, 0);

    // Smooth scroll to sections
    const scrollHandler = () => {
      const scrollPosition = window.scrollY;
    };

    // Set up scroll listener
    window.addEventListener('scroll', scrollHandler);
    
    // Cleanup
    let timer;
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
