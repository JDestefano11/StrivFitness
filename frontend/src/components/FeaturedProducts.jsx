import React, { useState, useEffect, memo, useCallback, useMemo } from "react";

// Memoized Product Card component to prevent unnecessary re-renders
const ProductCard = memo(({ product }) => {
  // Calculate discounted price
  const calculateDiscountedPrice = (price, discount) => {
    if (!discount) return price;
    return price - (price * (discount / 100));
  };

  // Simple star rating component - memoized to prevent re-renders
  const StarRating = memo(({ rating }) => (
    <div className="flex items-center mr-2">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          className={`w-4 h-4 ${
            i < Math.floor(rating) ? "text-[#efc75e]" : "text-gray-600"
          }`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  ));

  return (
    <div 
      className="bg-gradient-to-b from-black/60 to-black/80 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-800 hover:border-[#efc75e]/50 cursor-pointer group transition-all duration-300 relative h-full will-change-transform hover:shadow-[0_0_15px_rgba(239,199,94,0.3)] hover:-translate-y-1"
    >
      {/* Minimal background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-32 h-32">
          <div className="absolute top-0 right-0 w-full h-[1px] bg-gradient-to-l from-[#efc75e]/30 to-transparent group-hover:from-[#efc75e]/80"></div>
          <div className="absolute top-0 right-0 h-full w-[1px] bg-gradient-to-b from-[#efc75e]/30 to-transparent group-hover:from-[#efc75e]/80"></div>
        </div>
        <div className="absolute bottom-0 left-0 w-32 h-32">
          <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-[#efc75e]/30 to-transparent group-hover:from-[#efc75e]/80"></div>
          <div className="absolute bottom-0 left-0 h-full w-[1px] bg-gradient-to-t from-[#efc75e]/30 to-transparent group-hover:from-[#efc75e]/80"></div>
        </div>
        {/* Add subtle radial gradient on hover */}
        <div className="absolute inset-0 bg-radial-gradient from-[#efc75e]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
      
      {/* Product tag */}
      {product.discount > 0 && (
        <div className="absolute top-3 left-3 z-10">
          <span className="bg-[#efc75e] text-black text-xs font-bold px-2 py-1 rounded">
            {product.discount}% OFF
          </span>
        </div>
      )}

      {/* Product image with overlay - optimized for performance */}
      <div className="relative h-64 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10"></div>
        <img 
          src={product.imageURL}
          alt={product.name}
          loading="lazy"
          decoding="async"
          fetchpriority="low"
          className="w-full h-full object-cover object-center transform-gpu transition-transform duration-700 ease-out group-hover:scale-105"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=500&auto=format&fit=crop";
          }}
        />
      </div>

      {/* Product details */}
      <div className="p-5">
        <h3 className="text-white font-bold text-lg mb-2 line-clamp-2 font-['Rajdhani'] tracking-wide group-hover:text-[#efc75e] transition-colors duration-300">
          {product.name}
        </h3>
        <p className="text-gray-400 text-sm mb-3 line-clamp-2 group-hover:text-gray-300 transition-colors duration-300">
          {product.description}
        </p>

        {/* Rating */}
        <div className="flex items-center mb-3">
          <StarRating rating={4.8} />
          <span className="text-gray-400 text-xs">
            ({Math.floor(Math.random() * 100) + 50} reviews)
          </span>
        </div>

        {/* Price and button */}
        <div className="flex items-center justify-between">
          <div>
            {product.discount > 0 ? (
              <div>
                <span className="text-gray-400 text-sm line-through mr-2">
                  ${product.price.toFixed(2)}
                </span>
                <span className="text-[#efc75e] font-bold text-xl font-['Rajdhani'] group-hover:text-white group-hover:drop-shadow-[0_0_3px_rgba(239,199,94,0.8)] transition-all duration-300">
                  ${calculateDiscountedPrice(product.price, product.discount).toFixed(2)}
                </span>
              </div>
            ) : (
              <span className="text-[#efc75e] font-bold text-xl font-['Rajdhani'] group-hover:text-white group-hover:drop-shadow-[0_0_3px_rgba(239,199,94,0.8)] transition-all duration-300">
                ${product.price.toFixed(2)}
              </span>
            )}
          </div>
          <button 
            className="bg-[#efc75e] text-black p-2 rounded-full cursor-pointer hover:bg-black hover:text-[#efc75e] border-2 border-transparent hover:border-[#efc75e] transform hover:scale-110 transition-all duration-300 shadow-md hover:shadow-[0_0_10px_rgba(239,199,94,0.5)] relative overflow-hidden group-hover:scale-110"
            aria-label="Add to cart"
          >
            <svg className="w-5 h-5 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            <span className="absolute inset-0 bg-gradient-to-r from-[#efc75e] to-[#f5d57b] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
          </button>
        </div>
      </div>
    </div>
  );
});

// Optimized loading skeleton
const ProductSkeleton = memo(() => (
  <div className="bg-gradient-to-b from-black/60 to-black/80 rounded-xl overflow-hidden border border-gray-800 h-[400px] relative will-change-transform">
    <div className="h-64 bg-gray-800/50"></div>
    <div className="p-5">
      <div className="h-4 bg-gray-700/50 rounded w-3/4 mb-3"></div>
      <div className="h-3 bg-gray-700/50 rounded w-full mb-2"></div>
      <div className="h-3 bg-gray-700/50 rounded w-5/6 mb-4"></div>
      <div className="flex justify-between items-center">
        <div className="h-6 bg-gray-700/50 rounded w-1/3"></div>
        <div className="h-8 w-8 rounded-full bg-gray-700/50"></div>
      </div>
    </div>
  </div>
));

// Error component
const ErrorMessage = memo(({ error, onRetry }) => (
  <div className="text-center py-10">
    <p className="text-red-400 mb-4">{error || "Failed to load products. Please try again later."}</p>
    <button 
      className="bg-[#efc75e] text-black px-4 py-2 rounded-lg font-medium cursor-pointer hover:bg-[#efc75e]/90 transition-colors font-['Rajdhani'] tracking-wide"
      onClick={onRetry}
    >
      Try Again
    </button>
  </div>
));

const FeaturedProducts = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Memoized fetch function to prevent unnecessary recreation on re-renders
  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const controller = new AbortController();
      const signal = controller.signal;
      
      const response = await fetch("http://localhost:3001/api/products/featured?limit=4", {
        headers: {
          'Accept': 'application/json'
        },
        signal,
        // Use stale-while-revalidate caching strategy for better performance
        cache: 'default'
      });
      
      if (!response.ok) {
        throw new Error(`Failed to fetch featured products: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Ensure we only display exactly 4 products
      setFeaturedProducts(data.slice(0, 4));
      setLoading(false);
    } catch (err) {
      if (err.name !== 'AbortError') {
        console.error("Error fetching featured products:", err);
        setError(err.message || "Failed to load products");
        setLoading(false);
      }
    }
  }, []);

  // Fetch products on component mount
  useEffect(() => {
    const controller = new AbortController();
    
    fetchProducts();
    
    // Add a cleanup function to abort fetch if component unmounts
    return () => {
      controller.abort();
    };
  }, [fetchProducts]);

  // Memoize the section background for better performance
  const sectionBackground = useMemo(() => (
    <div className="absolute inset-0 opacity-10 pointer-events-none"
      style={{
        backgroundImage: 'radial-gradient(#efc75e 1px, transparent 1px)',
        backgroundSize: '40px 40px',
        backgroundPosition: '20px 20px'
      }}>
    </div>
  ), []);

  // Memoize the section header for better performance
  const sectionHeader = useMemo(() => (
    <div className="text-center mb-12">
      <span className="inline-block px-4 py-1 bg-[#efc75e]/20 text-[#efc75e] text-sm font-semibold rounded-full mb-3 border border-[#efc75e]/30 font-['Rajdhani'] tracking-wide">
        TOP SELLERS
      </span>
      <h2 className="text-4xl md:text-5xl font-bold mb-3 font-['Rajdhani'] tracking-wide">
        <span className="text-white">Elevate Your </span>
        <span className="text-[#efc75e]">Fitness</span>
      </h2>
      <p className="text-gray-400 max-w-2xl mx-auto">
        Discover our handpicked selection of premium fitness equipment and supplements
      </p>
    </div>
  ), []);

  // Render loading skeletons
  if (loading) {
    return (
      <section id="featured-products" className="py-16 bg-black relative">
        {sectionBackground}
        <div className="container mx-auto px-4 relative z-10">
          {sectionHeader}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 content-visibility-auto">
            {[...Array(4)].map((_, index) => (
              <ProductSkeleton key={index} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Render error message
  if (error) {
    return (
      <section id="featured-products" className="py-16 bg-black relative">
        {sectionBackground}
        <div className="container mx-auto px-4 relative z-10">
          {sectionHeader}
          <ErrorMessage error={error} onRetry={fetchProducts} />
        </div>
      </section>
    );
  }
  
  // Render empty state
  if (!featuredProducts || featuredProducts.length === 0) {
    return (
      <section id="featured-products" className="py-16 bg-black relative">
        {sectionBackground}
        <div className="container mx-auto px-4 relative z-10">
          {sectionHeader}
          <div className="text-center py-10">
            <p className="text-gray-400">No featured products available at this time.</p>
          </div>
        </div>
      </section>
    );
  }

  // Render products
  return (
    <section id="featured-products" className="py-16 bg-black relative">
      {sectionBackground}
      
      <div className="container mx-auto px-4 relative z-10">
        {sectionHeader}
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 content-visibility-auto contain-intrinsic-size: auto 500px">
          {featuredProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
        
        <div className="text-center mt-12">
          <a 
            href="/products" 
            className="inline-block border border-[#efc75e] text-[#efc75e] px-6 py-3 rounded-lg font-medium hover:bg-[#efc75e] hover:text-black cursor-pointer transition-colors font-['Rajdhani'] tracking-wide uppercase"
          >
            View All Products
          </a>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;