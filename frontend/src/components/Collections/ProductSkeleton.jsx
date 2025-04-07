import React, { memo } from "react";

// Loading skeleton component for products
const ProductSkeleton = memo(() => (
  <div className="bg-gradient-to-b from-black/60 to-black/80 rounded-xl overflow-hidden border border-gray-800 h-[400px] relative will-change-transform">
    {/* Enhanced background elements */}
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute top-0 right-0 w-32 h-32">
        <div className="absolute top-0 right-0 w-full h-[1px] bg-gradient-to-l from-gray-700/30 to-transparent"></div>
        <div className="absolute top-0 right-0 h-full w-[1px] bg-gradient-to-b from-gray-700/30 to-transparent"></div>
      </div>
      <div className="absolute bottom-0 left-0 w-32 h-32">
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-gray-700/30 to-transparent"></div>
        <div className="absolute bottom-0 left-0 h-full w-[1px] bg-gradient-to-t from-gray-700/30 to-transparent"></div>
      </div>
    </div>

    {/* Image skeleton */}
    <div className="h-64 bg-gradient-to-r from-gray-800/50 to-gray-700/50 animate-pulse"></div>

    {/* Content skeleton */}
    <div className="p-5">
      {/* Title skeleton */}
      <div className="h-6 bg-gradient-to-r from-gray-800/80 to-gray-700/80 rounded w-3/4 mb-3 animate-pulse"></div>
      
      {/* Description skeleton */}
      <div className="h-4 bg-gradient-to-r from-gray-800/60 to-gray-700/60 rounded w-full mb-2 animate-pulse"></div>
      <div className="h-4 bg-gradient-to-r from-gray-800/60 to-gray-700/60 rounded w-2/3 mb-3 animate-pulse"></div>
      
      {/* Rating skeleton */}
      <div className="flex items-center mb-3">
        <div className="flex space-x-1">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="w-4 h-4 rounded-full bg-gray-700/60 animate-pulse"></div>
          ))}
        </div>
        <div className="h-3 bg-gradient-to-r from-gray-800/60 to-gray-700/60 rounded w-16 ml-2 animate-pulse"></div>
      </div>
      
      {/* Price skeleton */}
      <div className="h-6 bg-gradient-to-r from-gray-800/80 to-gray-700/80 rounded w-1/3 animate-pulse"></div>
    </div>
  </div>
));

export default ProductSkeleton;
