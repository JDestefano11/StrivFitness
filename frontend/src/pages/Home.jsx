import React, { lazy, Suspense } from "react";
import HeroSection from "../components/Home Page/HeroSection";

// Lazy load non-critical components
const FeaturedProducts = lazy(() => import("../components/Home Page/FeaturedProducts"));
const WhyChooseUs = lazy(() => import("../components/Home Page/WhyChooseUs"));
const ArticlesSection = lazy(() => import("../components/Home Page/ArticlesSection"));
const TrustBadgeSection = lazy(() => import("../components/Home Page/TrustBadgeSection"));
const NewsletterSection = lazy(() => import("../components/Home Page/NewsletterSection"));

// Simple loading fallback that doesn't cause layout shifts
const LoadingFallback = () => <div className="h-96 bg-black"></div>;

const Home = () => {
  return (
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
  );
};

export default Home;
