import React, { memo } from "react";

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

// Product Card component
const ProductCard = memo(({ product }) => {
  // Generate random rating for demo purposes
  const rating = product.rating || (Math.random() * 2 + 3).toFixed(1);
  const reviewCount = product.reviewCount || Math.floor(Math.random() * 100) + 50;
  
  return (
    <div className="bg-gradient-to-b from-black/60 to-black/80 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-800 hover:border-[#efc75e] cursor-pointer group transition-all duration-300 relative h-full will-change-transform hover:shadow-[0_0_15px_rgba(239,199,94,0.3)] hover:-translate-y-1">
      {/* Enhanced background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-32 h-32">
          <div className="absolute top-0 right-0 w-full h-[1px] bg-gradient-to-l from-[#efc75e]/30 to-transparent group-hover:from-[#efc75e]/80"></div>
          <div className="absolute top-0 right-0 h-full w-[1px] bg-gradient-to-b from-[#efc75e]/30 to-transparent group-hover:from-[#efc75e]/80"></div>
        </div>
        <div className="absolute bottom-0 left-0 w-32 h-32">
          <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-[#efc75e]/30 to-transparent group-hover:from-[#efc75e]/80"></div>
          <div className="absolute bottom-0 left-0 h-full w-[1px] bg-gradient-to-t from-[#efc75e]/30 to-transparent group-hover:from-[#efc75e]/80"></div>
        </div>
        {/* Enhanced radial gradient on hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out bg-gradient-to-br from-[#efc75e]/10 to-transparent"></div>
      </div>

      {/* Discount badge with enhanced styling */}
      {product.discount > 0 && (
        <div className="absolute top-3 left-3 z-20">
          <span className="bg-[#efc75e] text-black text-xs font-bold px-2 py-1 rounded-md shadow-lg transform group-hover:scale-110 transition-transform duration-300">
            {product.discount}% OFF
          </span>
        </div>
      )}

      {/* Stock badge */}
      {product.stock === 0 && (
        <div className="absolute top-3 right-3 z-20">
          <span className="bg-red-500/80 text-white text-xs font-bold px-2 py-1 rounded-md shadow-lg">
            OUT OF STOCK
          </span>
        </div>
      )}

      {/* Product image with enhanced overlay */}
      <div className="relative h-64 overflow-hidden">
        <img
          src={product.imageURL || product.imageUrl} /* Handle both field formats */
          alt={product.name}
          loading="lazy"
          decoding="async"
          fetchpriority="low"
          className="w-full h-full object-cover object-center transform-gpu transition-all duration-500 ease-out group-hover:scale-110"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src =
              "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=500&auto=format&fit=crop";
          }}
        />
        
        {/* Hover overlay with view details button */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <button className="bg-[#efc75e] text-black px-4 py-2 rounded-lg font-medium transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 cursor-pointer">
            View Details
          </button>
        </div>
      </div>

      {/* Category badge */}
      <div className="absolute top-0 left-0 w-full p-3 flex justify-between items-center pointer-events-none">
        <div className="ml-auto">
          <span className="bg-black/60 backdrop-blur-sm text-[#efc75e] text-xs px-2 py-1 rounded-md border border-[#efc75e]/30 uppercase tracking-wider font-medium">
            {product.category}
          </span>
        </div>
      </div>

      {/* Product details with enhanced styling */}
      <div className="p-5">
        <h3 className="text-white font-bold text-lg mb-2 line-clamp-2 heading-font tracking-wide group-hover:text-[#efc75e] transition-colors duration-300">
          {product.name}
        </h3>
        
        <p className="text-gray-400 text-sm mb-3 line-clamp-2 body-font">
          {product.description}
        </p>
        
        <div className="flex items-center mb-3">
          <StarRating rating={rating} />
          <span className="text-gray-500 text-xs">
            ({reviewCount} reviews)
          </span>
        </div>

        {/* Price with enhanced styling */}
        <div className="flex items-center justify-between">
          <div className="w-full">
            {product.discount > 0 ? (
              <div className="flex items-center">
                <span className="text-gray-400 text-sm line-through mr-2 body-font">
                  ${product.price.toFixed(2)}
                </span>
                <span className="text-[#efc75e] font-bold text-lg heading-font">
                  ${calculateDiscountedPrice(product.price, product.discount).toFixed(2)}
                </span>
                
                {product.featured && (
                  <span className="ml-auto text-xs text-[#efc75e]/80 font-semibold bg-[#efc75e]/10 px-2 py-1 rounded border border-[#efc75e]/20">
                    FEATURED
                  </span>
                )}
              </div>
            ) : (
              <div className="flex items-center">
                <span className="text-[#efc75e] font-bold text-lg heading-font">
                  ${product.price.toFixed(2)}
                </span>
                
                {product.featured && (
                  <span className="ml-auto text-xs text-[#efc75e]/80 font-semibold bg-[#efc75e]/10 px-2 py-1 rounded border border-[#efc75e]/20">
                    FEATURED
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
});

export default ProductCard;
