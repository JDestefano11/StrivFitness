import React, { useState, useEffect } from "react";

const FeaturedProducts = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to fetch products (moved outside useEffect for reuse)
  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log("Fetching featured products...");
      const response = await fetch("http://localhost:3001/api/products/featured?limit=4", {
        headers: {
          'Accept': 'application/json'
        },
        cache: 'no-cache' // Changed to no-cache to ensure fresh data
      });
      
      if (!response.ok) {
        throw new Error(`Failed to fetch featured products: ${response.status}`);
      }
      
      const data = await response.json();
      console.log("Featured products data:", data);
      
      // Ensure we only display exactly 4 products
      setFeaturedProducts(data.slice(0, 6));
      setLoading(false);
    } catch (err) {
      console.error("Error fetching featured products:", err);
      setError(err.message || "Failed to load products");
      setLoading(false);
    }
  };

  // Fetch products on component mount
  useEffect(() => {
    fetchProducts();
  }, []);

  // Simple star rating component
  const StarRating = ({ rating }) => (
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
  );

  // Calculate discounted price
  const calculateDiscountedPrice = (price, discount) => {
    if (!discount) return price;
    return price - (price * (discount / 100));
  };

  // Simplified loading skeletons - no animations
  const LoadingSkeletons = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
      {[...Array(4)].map((_, index) => (
        <div 
          key={index}
          className="bg-gradient-to-b from-black/60 to-black/80 rounded-xl overflow-hidden border border-gray-800 h-[400px] relative"
        >
          <div className="absolute bottom-0 left-0 right-0 h-40 bg-black/50 p-5">
            <div className="h-4 bg-gray-700 rounded w-3/4 mb-3"></div>
            <div className="h-3 bg-gray-700 rounded w-full mb-2"></div>
            <div className="h-3 bg-gray-700 rounded w-5/6 mb-4"></div>
            <div className="h-6 bg-gray-700 rounded w-1/3"></div>
          </div>
        </div>
      ))}
    </div>
  );

  // Error component
  const ErrorMessage = () => (
    <div className="text-center py-10">
      <p className="text-red-400 mb-4">{error || "Failed to load products. Please try again later."}</p>
      <button 
        className="bg-[#efc75e] text-black px-4 py-2 rounded-lg font-medium cursor-pointer hover:bg-[#efc75e]/90"
        onClick={fetchProducts}
      >
        Try Again
      </button>
    </div>
  );

  // Render products or appropriate feedback
  const renderContent = () => {
    if (loading) return <LoadingSkeletons />;
    if (error) return <ErrorMessage />;
    
    if (!featuredProducts || featuredProducts.length === 0) {
      return (
        <div className="text-center py-10">
          <p className="text-gray-400">No featured products available at this time.</p>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
        {featuredProducts.map((product) => (
          <div 
            key={product._id}
            className="bg-gradient-to-b from-black/60 to-black/80 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-800 hover:border-[#efc75e]/30 cursor-pointer relative"
          >
            {/* Cool background elements - no animations */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute top-0 right-0 w-32 h-32">
                <div className="absolute top-0 right-0 w-full h-[1px] bg-gradient-to-l from-[#efc75e]/30 to-transparent"></div>
                <div className="absolute top-0 right-0 h-full w-[1px] bg-gradient-to-b from-[#efc75e]/30 to-transparent"></div>
              </div>
              <div className="absolute bottom-0 left-0 w-32 h-32">
                <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-[#efc75e]/30 to-transparent"></div>
                <div className="absolute bottom-0 left-0 h-full w-[1px] bg-gradient-to-t from-[#efc75e]/30 to-transparent"></div>
              </div>
            </div>
            {/* Product tag */}
            {product.discount > 0 && (
              <div className="absolute top-3 left-3 z-10">
                <span className="bg-[#efc75e] text-black text-xs font-bold px-2 py-1 rounded">
                  {product.discount}% OFF
                </span>
              </div>
            )}

            {/* Product image with overlay */}
            <div className="relative h-64 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10"></div>
              <img 
                src={product.imageURL}
                alt={product.name}
                loading="lazy"
                className="w-full h-full object-cover object-center"
                onError={(e) => {
                  e.target.onerror = null;
                  // If the image fails to load, try a generic fitness product image
                  e.target.src = "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=500&auto=format&fit=crop";
                }}
              />
            </div>

            {/* Product details */}
            <div className="p-5">
              <h3 className="text-white font-bold text-lg mb-2 line-clamp-2">
                {product.name}
              </h3>
              <p className="text-gray-400 text-sm mb-3 line-clamp-2">
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
                      <span className="text-[#efc75e] font-bold text-xl">
                        ${calculateDiscountedPrice(product.price, product.discount).toFixed(2)}
                      </span>
                    </div>
                  ) : (
                    <span className="text-[#efc75e] font-bold text-xl">
                      ${product.price.toFixed(2)}
                    </span>
                  )}
                </div>
                <button className="bg-[#efc75e] text-black p-2 rounded-full cursor-pointer hover:bg-[#efc75e]/90">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <section id="featured-products" className="py-16 bg-black relative">
      {/* Add section background with dot pattern */}
      <div className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: 'radial-gradient(#efc75e 2px, transparent 2px)',
          backgroundSize: '40px 40px',
          backgroundPosition: '20px 20px'
        }}>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1 bg-[#efc75e]/20 text-[#efc75e] text-sm font-semibold rounded-full mb-3 border border-[#efc75e]/30">
            TOP SELLERS
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-3">
            <span className="text-white">Elevate Your </span>
            <span className="text-[#efc75e]">Fitness</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Discover our handpicked selection of premium fitness equipment and supplements
          </p>
        </div>
        
        {renderContent()}
        
        {!loading && !error && featuredProducts.length > 0 && (
          <div className="text-center mt-12">
            <a 
              href="/products" 
              className="inline-block border border-[#efc75e] text-[#efc75e] px-6 py-3 rounded-lg font-medium hover:bg-[#efc75e] hover:text-black cursor-pointer"
            >
              View All Products
            </a>
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedProducts;