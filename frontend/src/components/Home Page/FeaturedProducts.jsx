import React, { useState, useEffect, memo, useCallback, useMemo } from "react";

// Data and utility functions
const API_URL = "http://localhost:3001/api/products/featured";
const PRODUCT_LIMIT = 4;

// Calculate discounted price
const calculateDiscountedPrice = (price, discount) => {
  if (!discount) return price;
  return price - price * (discount / 100);
};

// Simple star rating component
const StarRating = memo(({ rating }) => (
  <div className="flex items-center mr-2">
    {[...Array(5)].map((_, i) => (
      <svg
        key={i}
        className={`w-4 h-4 ${
          i < Math.floor(rating) ? "text-[#00FF94]" : "text-gray-600"
        }`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ))}
  </div>
));

// Product Card component
const ProductCard = memo(({ product }) => {
  // Function to handle click on product card
  const handleProductClick = () => {
    // Navigate to the product detail page
    window.location.href = `/product/${product._id}`;
  };

  return (
    <div 
      onClick={handleProductClick}
      className="bg-gradient-to-b from-[#1C1C1E] to-[#111827] backdrop-blur-sm rounded-xl overflow-hidden border border-[#1DD1A1]/30 hover:border-[#00FF94]/70 cursor-pointer group transition-all duration-300 relative h-full will-change-transform hover:shadow-[0_0_15px_rgba(0,255,148,0.3)] hover:-translate-y-1 shadow-md shadow-black/30"
    >
      {/* Enhanced background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-32 h-32">
          <div className="absolute top-0 right-0 w-full h-[1px] bg-gradient-to-l from-[#00FF94]/30 to-transparent group-hover:from-[#00FF94]/80"></div>
          <div className="absolute top-0 right-0 h-full w-[1px] bg-gradient-to-b from-[#00FF94]/30 to-transparent group-hover:from-[#00FF94]/80"></div>
        </div>
        <div className="absolute bottom-0 left-0 w-32 h-32">
          <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-[#1DD1A1]/30 to-transparent group-hover:from-[#1DD1A1]/80"></div>
          <div className="absolute bottom-0 left-0 h-full w-[1px] bg-gradient-to-t from-[#1DD1A1]/30 to-transparent group-hover:from-[#1DD1A1]/80"></div>
        </div>
        {/* Enhanced radial gradient on hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out bg-gradient-to-br from-[#00FF94]/10 to-transparent"></div>
      </div>

      {/* Discount badge with enhanced styling */}
      {product.discount > 0 && (
        <div className="absolute top-3 left-3 z-20">
          <span className="bg-gradient-to-r from-[#EF476F] to-[#FF4757] text-white text-xs font-bold px-2 py-1 rounded-md shadow-lg transform group-hover:scale-110 transition-transform duration-300 border border-white/10">
            {product.discount}% OFF
          </span>
        </div>
      )}

      {/* Product image with enhanced overlay */}
      <div className="relative h-64 overflow-hidden">
        <img
          src={product.imageURL}
          alt={product.name}
          loading="lazy"
          decoding="async"
          fetchpriority="low"
          className="w-full h-full object-cover object-center transform-gpu transition-all duration-500 ease-out group-hover:scale-125 group-hover:translate-x-4 group-hover:-translate-y-4"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src =
              "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=500&auto=format&fit=crop";
          }}
        />
      </div>

      {/* Product details with enhanced styling */}
      <div className="p-5">
        <h3 className="text-white font-bold text-lg mb-2 line-clamp-2 heading-font tracking-wide group-hover:text-[#00FF94] transition-colors duration-300">
          {product.name}
        </h3>
        <p className="text-gray-400 text-sm mb-3 line-clamp-2 body-font group-hover:text-gray-300 transition-colors duration-300">
          {product.description}
        </p>

        {/* Rating with enhanced styling */}
        <div className="flex items-center mb-3">
          <StarRating rating={product.rating || 4.8} />
          <span className="text-gray-400 text-xs">
            ({product.reviewCount || Math.floor(Math.random() * 100) + 50}{" "}
            reviews)
          </span>
        </div>

        {/* Price with enhanced styling - No buttons, PREMIUM badge in bottom right */}
        <div className="flex items-center justify-between">
          {product.discount > 0 ? (
            <div className="flex items-center w-full">
              <span className="text-gray-400 text-sm line-through mr-2 body-font">
                ${product.price.toFixed(2)}
              </span>
              <span className="text-[#EF476F] font-bold text-xl heading-font group-hover:text-white group-hover:drop-shadow-[0_0_3px_rgba(239,71,111,0.8)] transition-all duration-300">
                $
                {calculateDiscountedPrice(
                  product.price,
                  product.discount
                ).toFixed(2)}
              </span>
              <span className="ml-auto text-xs text-[#1DD1A1]/80 font-semibold bg-[#0A0F2C]/70 px-2 py-1 rounded border border-[#1DD1A1]/30 uppercase tracking-wider shadow-inner shadow-[#00FF94]/5">
                PREMIUM
              </span>
            </div>
          ) : (
            <div className="flex items-center w-full">
              <span className="text-[#EF476F] font-bold text-xl heading-font group-hover:text-white group-hover:drop-shadow-[0_0_3px_rgba(239,71,111,0.8)] transition-all duration-300">
                ${product.price.toFixed(2)}
              </span>
              <span className="ml-auto text-xs text-[#1DD1A1]/80 font-semibold bg-[#0A0F2C]/70 px-2 py-1 rounded border border-[#1DD1A1]/30 uppercase tracking-wider shadow-inner shadow-[#00FF94]/5">
                PREMIUM
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
});

// Loading skeleton component
const ProductSkeleton = memo(() => (
  <div className="bg-gradient-to-b from-[#1C1C1E] to-[#111827] rounded-xl overflow-hidden border border-[#1DD1A1]/30 h-[400px] relative will-change-transform shadow-md shadow-black/30">
    <div className="h-64 bg-[#0A0F2C] animate-pulse"></div>
    <div className="p-5">
      <div className="h-4 bg-[#1DD1A1]/20 rounded w-3/4 mb-3 animate-pulse"></div>
      <div className="h-3 bg-[#1DD1A1]/20 rounded w-full mb-2 animate-pulse"></div>
      <div className="h-3 bg-[#1DD1A1]/20 rounded w-5/6 mb-4 animate-pulse"></div>
      <div className="flex justify-between items-center">
        <div className="h-6 bg-[#1DD1A1]/20 rounded w-1/3 animate-pulse"></div>
        <div className="h-8 w-20 rounded bg-[#1DD1A1]/20 animate-pulse"></div>
      </div>
    </div>
  </div>
));

// Error component
const ErrorMessage = memo(({ error, onRetry }) => (
  <div className="text-center py-10">
    <p className="text-red-400 mb-4 body-font">
      {error || "Failed to load products. Please try again later."}
    </p>
    <button
      className="bg-[#efc75e] text-black px-4 py-2 rounded-lg font-medium cursor-pointer hover:bg-[#efc75e]/90 transition-colors button-font tracking-wide"
      onClick={onRetry}
    >
      Try Again
    </button>
  </div>
));

// Section header component
const SectionHeader = memo(() => (
  <div className="text-center mb-12">
    <span className="inline-block px-4 py-1 bg-[#00FF94]/20 text-[#00FF94] text-sm font-semibold rounded-full mb-3 border border-[#00FF94]/30 accent-font tracking-wide">
      TOP SELLERS
    </span>
    <h2 className="text-4xl md:text-5xl font-bold mb-3 heading-font tracking-wide">
      <span className="text-white">Elevate Your </span>
      <span className="text-[#00FF94]">Fitness</span>
    </h2>
    <p className="text-gray-400 max-w-2xl mx-auto body-font">
      Discover our handpicked selection of premium fitness equipment and
      supplements
    </p>
  </div>
));

// Main FeaturedProducts component
const FeaturedProducts = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch products function
  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const controller = new AbortController();
      const signal = controller.signal;

      const response = await fetch(`${API_URL}?limit=${PRODUCT_LIMIT}`, {
        headers: {
          Accept: "application/json",
        },
        signal,
        cache: "default",
      });

      if (!response.ok) {
        throw new Error(
          `Failed to fetch featured products: ${response.status}`
        );
      }

      const data = await response.json();
      setFeaturedProducts(data.slice(0, PRODUCT_LIMIT));
      setLoading(false);
    } catch (err) {
      if (err.name !== "AbortError") {
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

    return () => {
      controller.abort();
    };
  }, [fetchProducts]);

  // Render loading state
  if (loading) {
    return (
      <section id="featured-products" className="py-16 relative">
        <div className="gold-accent-top"></div>
        <div className="container mx-auto px-4 relative z-10">
          <SectionHeader />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 content-visibility-auto">
            {[...Array(PRODUCT_LIMIT)].map((_, index) => (
              <ProductSkeleton key={index} />
            ))}
          </div>
        </div>
        <div className="gold-accent-bottom"></div>
      </section>
    );
  }

  // Render error state
  if (error) {
    return (
      <section id="featured-products" className="py-16 relative">
        <div className="gold-accent-top"></div>
        <div className="container mx-auto px-4 relative z-10">
          <SectionHeader />
          <ErrorMessage error={error} onRetry={fetchProducts} />
        </div>
        <div className="gold-accent-bottom"></div>
      </section>
    );
  }

  // Render empty state
  if (!featuredProducts || featuredProducts.length === 0) {
    return (
      <section id="featured-products" className="py-16 relative">
        <div className="gold-accent-top"></div>
        <div className="container mx-auto px-4 relative z-10">
          <SectionHeader />
          <div className="text-center py-10">
            <p className="text-gray-400">
              No featured products available at this time.
            </p>
          </div>
        </div>
        <div className="gold-accent-bottom"></div>
      </section>
    );
  }

  // Render products
  return (
    <section id="featured-products" className="py-16 relative">
      <div className="gold-accent-top"></div>

      <div className="container mx-auto px-4 relative z-10">
        <SectionHeader />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 content-visibility-auto contain-intrinsic-size: auto 500px">
          {featuredProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            href="/products"
            className="inline-block border border-[#00FF94] text-[#00FF94] px-6 py-3 rounded-lg font-medium hover:bg-gradient-to-r hover:from-[#00FF94] hover:to-[#1DD1A1] hover:text-[#0A0F2C] cursor-pointer transition-colors button-font tracking-wide uppercase"
          >
            View All Products
          </a>
        </div>
      </div>
      
      <div className="gold-accent-bottom"></div>
    </section>
  );
};

export default FeaturedProducts;
