import React, { useEffect, lazy, Suspense, createContext } from "react";
import Navbar from "./components/Navbar";
import SaleTopBar from "./components/SaleTopBar";
import HeroSection from "./components/Home Page/HeroSection";
import Footer from "./components/Footer";
import { useCart } from "./hooks/useCart";

// Lazy load non-critical components
const FeaturedProducts = lazy(() =>
  import("./components/Home Page/FeaturedProducts")
);
const WhyChooseUs = lazy(() => import("./components/Home Page/WhyChooseUs"));
const ArticlesSection = lazy(() =>
  import("./components/Home Page/ArticlesSection")
);
const TrustBadgeSection = lazy(() =>
  import("./components/Home Page/TrustBadgeSection")
);
const NewsletterSection = lazy(() =>
  import("./components/Home Page/NewsletterSection")
);

// Lazy load pages
const Collections = lazy(() => import("./components/Collections/Collections"));
const ProductDetail = lazy(() => import("./components/Product/ProductDetail"));
const CartPage = lazy(() => import("./components/Cart/CartPage"));

// Simple loading fallback that doesn't cause layout shifts
const LoadingFallback = () => <div className="h-96 bg-black"></div>;

// Create CartContext
export const CartContext = createContext();

// Create CartProvider component
const CartProvider = ({ children }) => {
  const cartContext = useCart();
  return (
    <CartContext.Provider value={cartContext}>
      {children}
    </CartContext.Provider>
  );
};

const App = () => {
  // Optimize initial load
  useEffect(() => {
    // Add preconnect for domains
    const addPreconnect = (url) => {
      const link = document.createElement("link");
      link.rel = "preconnect";
      link.href = url;
      link.crossOrigin = "anonymous";
      document.head.appendChild(link);
    };

    // Add preload for critical resources
    const addPreload = (url, as, type = "") => {
      const link = document.createElement("link");
      link.rel = "preload";
      link.href = url;
      link.as = as;
      if (type) link.type = type;
      document.head.appendChild(link);
    };

    // Add preconnect for API domain
    addPreconnect("http://localhost:3001");

    // Preload hero static image for immediate display
    addPreload("/assets/hero-static.jpg", "image");

    // Preload fonts
    addPreload(
      "https://fonts.googleapis.com/css2?family=Rajdhani:wght@500;700&display=swap",
      "style"
    );

    // Apply GPU acceleration for smoother scrolling
    document.body.style.transform = "translateZ(0)";
    document.body.style.backfaceVisibility = "hidden";

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
    window.addEventListener("scroll", scrollHandler, { passive: true });

    // Load non-critical resources after initial render
    const timer = setTimeout(() => {
      // Preload video after initial render
      const videoLink = document.createElement("link");
      videoLink.rel = "preload";
      videoLink.href = "/assets/1502318-hd_1920_1080_30fps.mp4";
      videoLink.as = "video";
      document.head.appendChild(videoLink);
    }, 2000);

    // Clean up function
    return () => {
      window.removeEventListener("scroll", scrollHandler);
      clearTimeout(timer);
    };
  }, []);

  // Get the current path from window.location
  const currentPath = window.location.pathname;
  const isShopPage = currentPath.startsWith('/shop/');
  const isProductPage = currentPath.startsWith('/product/');
  const isCartPage = currentPath.startsWith('/cart');

  return (
    <CartProvider>
      <div className="min-h-screen w-full relative overflow-x-hidden">
        {/* Main content */}
        <SaleTopBar />
        <Navbar />
      
      {isShopPage ? (
        <Suspense fallback={<LoadingFallback />}>
          <Collections />
        </Suspense>
      ) : isProductPage ? (
        <Suspense fallback={<LoadingFallback />}>
          <ProductDetail />
        </Suspense>
      ) : isCartPage ? (
        <Suspense fallback={<LoadingFallback />}>
          <CartPage />
        </Suspense>
      ) : (
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
      )}
      
      <Footer />
      </div>
    </CartProvider>
  );
};

export default App;
