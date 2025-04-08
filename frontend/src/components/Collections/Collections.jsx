import React, { useState, useEffect, useCallback, useMemo } from "react";
import ProductCard from "./ProductCard";
import ProductSkeleton from "./ProductSkeleton";
import FilterSidebar from "./FilterSidebar";
import SortDropdown from "./SortDropdown";

// API URL for products
const API_URL = "http://localhost:3001/api/products";

const Collections = () => {
  // State for products and filters
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    category: "all",
    gender: "all",
    priceRange: {
      min: 0,
      max: 500,
    },
    sortBy: "featured",
    inStock: false,
    featured: false,
    searchQuery: "",
  });

  // Get category from URL path
  const getCategoryFromPath = useCallback(() => {
    const path = window.location.pathname;
    if (path === '/shop/all-products') return 'all';
    if (path === '/shop/apparel') return 'apparel';
    if (path === '/shop/equipment') return 'equipment';
    if (path === '/shop/accessories') return 'accessories';
    return 'all';
  }, []);

  // Fetch all products
  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const controller = new AbortController();
      const signal = controller.signal;

      const response = await fetch(API_URL, {
        headers: {
          Accept: "application/json",
        },
        signal,
        cache: "default",
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch products: ${response.status}`);
      }

      const data = await response.json();
      setProducts(data);
      setLoading(false);
      
      // Set category filter based on URL path
      const categoryFromPath = getCategoryFromPath();
      if (categoryFromPath !== 'all') {
        setFilters(prev => ({
          ...prev,
          category: categoryFromPath
        }));
      }
    } catch (err) {
      if (err.name !== "AbortError") {
        console.error("Error fetching products:", err);
        setError(err.message || "Failed to load products");
        setLoading(false);
      }
    }
  }, [getCategoryFromPath]);

  // Fetch products on component mount or when URL changes
  useEffect(() => {
    const controller = new AbortController();
    fetchProducts();

    // Add event listener for URL changes (for browser back/forward buttons)
    const handleLocationChange = () => {
      fetchProducts();
    };
    window.addEventListener('popstate', handleLocationChange);

    return () => {
      controller.abort();
      window.removeEventListener('popstate', handleLocationChange);
    };
  }, [fetchProducts]);

  // Apply filters to products
  useEffect(() => {
    if (!products.length) return;

    let result = [...products];

    // Filter by category
    if (filters.category !== "all") {
      result = result.filter(
        (product) => product.category === filters.category
      );
    }
    
    // Filter by gender
    if (filters.gender !== "all") {
      result = result.filter(
        (product) => product.gender === filters.gender
      );
    }

    // Filter by price range
    result = result.filter(
      (product) =>
        product.price >= filters.priceRange.min &&
        product.price <= filters.priceRange.max
    );

    // Filter by stock
    if (filters.inStock) {
      result = result.filter((product) => product.stock > 0);
    }

    // Filter by featured
    if (filters.featured) {
      result = result.filter((product) => product.featured);
    }

    // Filter by search query
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      result = result.filter(
        (product) =>
          product.name.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query)
      );
    }

    // Sort products
    switch (filters.sortBy) {
      case "price-low-high":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-high-low":
        result.sort((a, b) => b.price - a.price);
        break;
      case "newest":
        result.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        break;
      case "name-a-z":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name-z-a":
        result.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "featured":
      default:
        result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        break;
    }

    setFilteredProducts(result);
  }, [products, filters]);

  // Handle filter changes
  const handleFilterChange = (newFilters) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  // Calculate category counts for sidebar
  const categoryCounts = useMemo(() => {
    if (!products.length) return {};
    
    return products.reduce((acc, product) => {
      const category = product.category;
      if (!acc[category]) {
        acc[category] = 0;
      }
      acc[category]++;
      return acc;
    }, {});
  }, [products]);

  // Page title and description based on filters
  const pageTitle = useMemo(() => {
    if (filters.category !== "all") {
      const categoryMap = {
        supplements: "Supplements",
        apparel: "Fitness Apparel",
        equipment: "Training Equipment",
        accessories: "Fitness Accessories"
      };
      return categoryMap[filters.category] || "All Products";
    }
    return "All Products";
  }, [filters.category]);

  // Render loading state
  if (loading) {
    return (
      <section className="py-16 relative bg-[#0A0F2C] min-h-screen">
        <div className="accent-top"></div>
        <div className="container mx-auto px-4 relative z-10 pt-24">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-white mb-4 heading-font tracking-wide">
              Collections
            </h1>
            <p className="text-gray-400 max-w-2xl mx-auto body-font">
              Loading our premium fitness products...
            </p>
          </div>
          
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar skeleton */}
            <div className="w-full lg:w-1/4 bg-black/60 backdrop-blur-sm rounded-xl border border-gray-800 h-[600px] animate-pulse"></div>
            
            {/* Products grid skeleton */}
            <div className="w-full lg:w-3/4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(9)].map((_, index) => (
                  <ProductSkeleton key={index} />
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="accent-bottom"></div>
      </section>
    );
  }

  // Render error state
  if (error) {
    return (
      <section className="py-16 relative bg-[#0A0F2C] min-h-screen">
        <div className="accent-top"></div>
        <div className="container mx-auto px-4 relative z-10 pt-24">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-white mb-4 heading-font tracking-wide">
              Collections
            </h1>
          </div>
          
          <div className="bg-black/60 backdrop-blur-sm rounded-xl border border-red-800 p-8 text-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-red-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <h2 className="text-xl font-bold text-white mb-2">Failed to Load Products</h2>
            <p className="text-gray-400 mb-4">{error}</p>
            <button 
              onClick={fetchProducts}
              className="bg-gradient-to-r from-[#00FF94] to-[#1DD1A1] text-[#0A0F2C] px-6 py-2 rounded-lg font-medium hover:shadow-[0_0_15px_rgba(0,255,148,0.4)] transition-all duration-300"
            >
              Try Again
            </button>
          </div>
        </div>
        <div className="accent-bottom"></div>
      </section>
    );
  }

  return (
    <section className="py-16 relative min-h-screen">
      {/* Override global styles */}
      <style jsx global>{`
        body {
          background: linear-gradient(135deg, #050B20 0%, #0A1428 100%) !important;
        }
        body::before, body::after {
          display: none !important;
        }
        
        @keyframes pulse {
          0% { opacity: 0.8; transform: scale(0.98); }
          100% { opacity: 1; transform: scale(1.02); }
        }
        
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
          100% { transform: translateY(0px); }
        }
      `}</style>
      {/* Premium background with very prominent green gradient circle */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Rich dark blue base with gradient */}
        <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-[#050B20] to-[#0A1428]"></div>
        
        {/* Main green gradient background */}
        <div className="absolute inset-0 w-full h-full opacity-40"
          style={{
            background: 'linear-gradient(135deg, rgba(29, 209, 161, 0.1) 0%, rgba(0, 255, 148, 0.05) 100%)'
          }}
        ></div>
        
        {/* Large central gradient circle */}
        <div 
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[150vh] h-[150vh]"
          style={{
            background: 'radial-gradient(circle, rgba(29, 209, 161, 0.2) 0%, rgba(0, 255, 148, 0.1) 40%, transparent 70%)',
            animation: 'pulse 15s infinite alternate ease-in-out',
            filter: 'blur(30px)'
          }}
        ></div>
        
        {/* Top-right floating accent */}
        <div 
          className="absolute top-[10%] right-[10%] w-[30vw] h-[30vw] max-w-[300px] max-h-[300px]"
          style={{
            background: 'radial-gradient(circle, rgba(0, 255, 148, 0.15) 0%, transparent 70%)',
            filter: 'blur(20px)',
            animation: 'float 20s infinite ease-in-out'
          }}
        ></div>
        
        {/* Bottom-left floating accent */}
        <div 
          className="absolute bottom-[10%] left-[10%] w-[25vw] h-[25vw] max-w-[250px] max-h-[250px]"
          style={{
            background: 'radial-gradient(circle, rgba(29, 209, 161, 0.15) 0%, transparent 70%)',
            filter: 'blur(20px)',
            animation: 'float 15s infinite ease-in-out reverse'
          }}
        ></div>
      </div>
      <div className="container mx-auto px-4 relative z-10 pt-24">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4 heading-font tracking-wide">
            {pageTitle}
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto body-font">
            Discover our selection of fitness equipment and supplements designed to elevate your training experience
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filter sidebar */}
          <FilterSidebar 
            filters={filters} 
            onFilterChange={handleFilterChange} 
            categoryCounts={categoryCounts}
            totalProducts={products.length}
            filteredCount={filteredProducts.length}
          />
          
          {/* Products grid */}
          <div className="w-full lg:w-3/4">
            {/* Sort and results info */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 bg-black/50 backdrop-blur-sm rounded-xl border border-[#1DD1A1]/30 p-4 relative">
              <div className="text-gray-400 mb-4 sm:mb-0">
                Showing <span className="text-white font-medium">{filteredProducts.length}</span> of <span className="text-white font-medium">{products.length}</span> products
              </div>
              <div className="relative" style={{ zIndex: 9999 }}>
                <SortDropdown 
                  value={filters.sortBy} 
                  onChange={(value) => handleFilterChange({ sortBy: value })} 
                />
              </div>
            </div>
            
            {/* No results message */}
            {filteredProducts.length === 0 && (
              <div className="bg-black/50 backdrop-blur-sm rounded-xl border border-[#1DD1A1]/30 p-8 text-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-600 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h2 className="text-xl font-bold text-white mb-2">No Products Found</h2>
                <p className="text-gray-400 mb-4">Try adjusting your filters or search query</p>
                <button 
                  onClick={() => setFilters({
                    category: "all",
                    priceRange: { min: 0, max: 500 },
                    sortBy: "featured",
                    inStock: false,
                    featured: false,
                    searchQuery: "",
                  })}
                  className="bg-gradient-to-r from-[#1DD1A1] to-[#1DD1A1]/80 text-[#0A0F2C] px-6 py-2 rounded-lg font-medium hover:shadow-[0_0_15px_rgba(29,209,161,0.4)] transition-all duration-300"
                >
                  Reset Filters
                </button>
              </div>
            )}
            
            {/* Products grid */}
            {filteredProducts.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="accent-bottom"></div>
    </section>
  );
};

export default Collections;
