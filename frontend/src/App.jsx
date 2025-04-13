import React, { useEffect, lazy, Suspense, createContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import SaleTopBar from "./components/SaleTopBar";
import Footer from "./components/Footer";
import { useCart } from "./hooks/useCart";

// Lazy load pages
const Home = lazy(() => import("./pages/Home"));
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

  return (
    <Router>
      <CartProvider>
        <div className="min-h-screen w-full relative overflow-x-hidden bg-[#0A0F2C]">
          {/* Main content */}
          <SaleTopBar />
          <Navbar />
          
          <Routes>
            {/* Home page route */}
            <Route path="/" element={
              <Suspense fallback={<LoadingFallback />}>
                <Home />
              </Suspense>
            } />
            
            {/* Shop routes */}
            <Route path="/shop/*" element={
              <Suspense fallback={<LoadingFallback />}>
                <Collections />
              </Suspense>
            } />
            
            {/* Product detail route */}
            <Route path="/product/:productId" element={
              <Suspense fallback={<LoadingFallback />}>
                <ProductDetail />
              </Suspense>
            } />
            
            {/* Cart route */}
            <Route path="/cart" element={
              <Suspense fallback={<LoadingFallback />}>
                <CartPage />
              </Suspense>
            } />
            
      
          </Routes>
          
          <Footer />
        </div>
      </CartProvider>
    </Router>
  );
};

export default App;
