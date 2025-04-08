import React, { useState } from "react";

const FilterSidebar = ({ filters, onFilterChange, categoryCounts, totalProducts, filteredCount }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Category labels mapping
  const categoryLabels = {
    apparel: "Apparel",
    equipment: "Equipment",
    accessories: "Accessories"
  };
  
  // Gender options
  const genderOptions = {
    men: "Men",
    women: "Women"
  };

  // Handle category change
  const handleCategoryChange = (category) => {
    onFilterChange({ category });
  };

  // Handle price range change
  const handlePriceChange = (min, max) => {
    onFilterChange({ priceRange: { min, max } });
  };

  // Handle checkbox filters
  const handleCheckboxChange = (filterName) => {
    onFilterChange({ [filterName]: !filters[filterName] });
  };

  // Handle search query change
  const handleSearchChange = (e) => {
    onFilterChange({ searchQuery: e.target.value });
  };

  // Handle gender filter change
  const handleGenderChange = (gender) => {
    onFilterChange({ gender });
  };

  // Reset all filters
  const resetFilters = () => {
    onFilterChange({
      category: "all",
      gender: "all",
      priceRange: { min: 0, max: 500 },
      sortBy: "featured",
      inStock: false,
      featured: false,
      searchQuery: "",
    });
  };

  return (
    <div className={`w-full lg:w-1/4 bg-gradient-to-b from-[#111827] to-black/90 backdrop-blur-md rounded-xl border border-[#1DD1A1]/30 hover:border-[#00FF94]/50 overflow-hidden transition-all duration-300 shadow-lg shadow-black/30 ${isExpanded ? "h-auto" : "lg:h-auto h-auto"}`}>
      <div className="p-5 border-b border-[#1DD1A1]/20">
        <div className="flex justify-between items-center relative z-10">
          <h3 className="text-[#00FF94] font-bold text-lg heading-font tracking-wide flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clipRule="evenodd" />
            </svg>
            Filters
          </h3>
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className="lg:hidden text-gray-400 hover:text-[#00FF94]"
          >
            {isExpanded ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            )}
          </button>
        </div>
        <div className="text-gray-300 text-sm mt-2 bg-black/50 py-1.5 px-3 rounded-md border border-[#1DD1A1]/30 inline-block shadow-inner shadow-black/20">
          Showing <span className="text-[#00FF94] font-medium">{filteredCount}</span> of <span className="text-[#00FF94] font-medium">{totalProducts}</span> products
        </div>
      </div>

      <div className={`transition-all duration-300 ${isExpanded ? "block" : "lg:block hidden"}`}>
        {/* Search filter */}
        <div className="p-5 border-b border-[#1DD1A1]/30">
          <h4 className="text-[#1DD1A1] font-medium mb-3 text-sm uppercase tracking-wider flex items-center">Search</h4>
          <div className="relative">
            <input
              type="text"
              placeholder="Search products..."
              value={filters.searchQuery}
              onChange={handleSearchChange}
              className="w-full bg-[#0A0F2C]/40 border border-gray-700 rounded-lg py-2 px-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#00FF94]/50 focus:border-[#00FF94]"
            />
            <button 
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-[#00FF94]"
              onClick={() => onFilterChange({ searchQuery: "" })}
              style={{ display: filters.searchQuery ? 'block' : 'none' }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>

        {/* Category filter */}
        <div className="p-5 border-b border-[#1DD1A1]/30">
          <h4 className="text-[#1DD1A1] font-medium mb-3 text-sm uppercase tracking-wider flex items-center">Categories</h4>
          <div className="space-y-2">
            <div 
              className={`flex items-center justify-between cursor-pointer p-2 rounded-lg transition-colors ${
                filters.category === "all" ? "bg-[#00FF94]/20 text-[#00FF94]" : "text-gray-400 hover:bg-gray-800/50"
              }`}
              onClick={() => handleCategoryChange("all")}
            >
              <span className="font-medium">All Products</span>
              <span className="text-sm bg-gray-800 px-2.5 py-1 rounded-md min-w-[36px] inline-block text-center">{totalProducts}</span>
            </div>
            
            {Object.keys(categoryLabels).map((category) => (
              <div 
                key={category}
                className={`flex items-center justify-between cursor-pointer p-2 rounded-lg transition-colors ${
                  filters.category === category ? "bg-[#00FF94]/20 text-[#00FF94]" : "text-gray-400 hover:bg-gray-800/50"
                }`}
                onClick={() => handleCategoryChange(category)}
              >
                <span className="font-medium">{categoryLabels[category]}</span>
                <span className="text-sm bg-gray-800 px-2.5 py-1 rounded-md min-w-[36px] inline-block text-center">{categoryCounts[category] || 0}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Gender filter */}
        <div className="p-5 border-b border-[#1DD1A1]/30">
          <h4 className="text-[#1DD1A1] font-medium mb-3 text-sm uppercase tracking-wider flex items-center">Gender</h4>
          <div className="space-y-2">
            <div 
              className={`flex items-center justify-between cursor-pointer p-2 rounded-lg transition-colors ${
                filters.gender === "all" || !filters.gender ? "bg-[#00FF94]/20 text-[#00FF94]" : "text-gray-400 hover:bg-gray-800/50"
              }`}
              onClick={() => handleGenderChange("all")}
            >
              <span className="font-medium">All</span>
            </div>
            
            {Object.keys(genderOptions).map((gender) => (
              <div 
                key={gender}
                className={`flex items-center justify-between cursor-pointer p-2 rounded-lg transition-colors ${
                  filters.gender === gender ? "bg-[#00FF94]/20 text-[#00FF94]" : "text-gray-400 hover:bg-gray-800/50"
                }`}
                onClick={() => handleGenderChange(gender)}
              >
                <span className="font-medium">{genderOptions[gender]}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Price range filter */}
        <div className="p-5 border-b border-[#1DD1A1]/30">
          <h4 className="text-[#1DD1A1] font-medium mb-3 text-sm uppercase tracking-wider flex items-center">Price Range</h4>
          <div className="mb-4">
            <div className="flex justify-between text-gray-400 text-sm mb-2">
              <span>${filters.priceRange.min}</span>
              <span>${filters.priceRange.max}</span>
            </div>
            <input
              type="range"
              min="0"
              max="500"
              step="10"
              value={filters.priceRange.max}
              onChange={(e) => handlePriceChange(filters.priceRange.min, parseInt(e.target.value))}
              className="w-full accent-[#00FF94] bg-gray-700 h-2 rounded-lg appearance-none cursor-pointer"
            />
          </div>
          <div className="flex space-x-2">
            <div className="flex-1">
              <label className="text-gray-400 text-xs mb-1 block">Min ($)</label>
              <input
                type="number"
                min="0"
                max={filters.priceRange.max}
                value={filters.priceRange.min}
                onChange={(e) => handlePriceChange(parseInt(e.target.value), filters.priceRange.max)}
                className="w-full bg-[#0A0F2C]/40 border border-gray-700 rounded-lg py-1 px-2 text-white text-sm focus:outline-none focus:ring-1 focus:ring-[#00FF94]/50 focus:border-[#00FF94]"
              />
            </div>
            <div className="flex-1">
              <label className="text-gray-400 text-xs mb-1 block">Max ($)</label>
              <input
                type="number"
                min={filters.priceRange.min}
                max="500"
                value={filters.priceRange.max}
                onChange={(e) => handlePriceChange(filters.priceRange.min, parseInt(e.target.value))}
                className="w-full bg-[#0A0F2C]/40 border border-gray-700 rounded-lg py-1 px-2 text-white text-sm focus:outline-none focus:ring-1 focus:ring-[#00FF94]/50 focus:border-[#00FF94]"
              />
            </div>
          </div>
        </div>

        {/* Additional filters */}
        <div className="p-5 border-b border-[#1DD1A1]/30">
          <h4 className="text-[#1DD1A1] font-medium mb-3 text-sm uppercase tracking-wider flex items-center">Product Status</h4>
          <div className="space-y-3">
            <label className="flex items-center space-x-3 cursor-pointer group">
              <div className="relative">
                <input
                  type="checkbox"
                  className="sr-only"
                  checked={filters.inStock}
                  onChange={() => handleCheckboxChange("inStock")}
                />
                <div className={`w-5 h-5 border ${
                  filters.inStock ? "border-[#1DD1A1] bg-[#1DD1A1]/20" : "border-[#1DD1A1]/30 bg-black/50"
                } rounded flex items-center justify-center transition-colors group-hover:border-[#1DD1A1]/70 shadow-inner shadow-black/20`}>
                  {filters.inStock && (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-[#1DD1A1]" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
              </div>
              <span className={`${filters.inStock ? "text-[#1DD1A1]" : "text-gray-400"} group-hover:text-[#1DD1A1]/70 transition-colors`}>
                In Stock Only
              </span>
            </label>
            
            <label className="flex items-center space-x-3 cursor-pointer group">
              <div className="relative">
                <input
                  type="checkbox"
                  className="sr-only"
                  checked={filters.featured}
                  onChange={() => handleCheckboxChange("featured")}
                />
                <div className={`w-5 h-5 border ${
                  filters.featured ? "border-[#1DD1A1] bg-[#1DD1A1]/20" : "border-[#1DD1A1]/30 bg-black/50"
                } rounded flex items-center justify-center transition-colors group-hover:border-[#1DD1A1]/70 shadow-inner shadow-black/20`}>
                  {filters.featured && (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-[#1DD1A1]" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
              </div>
              <span className={`${filters.featured ? "text-[#1DD1A1]" : "text-gray-400"} group-hover:text-[#1DD1A1]/70 transition-colors`}>
                Featured Products
              </span>
            </label>
          </div>
        </div>

        {/* Reset filters button */}
        <div className="p-5">
          <button
            onClick={resetFilters}
            className="w-full bg-gradient-to-r from-black to-[#111827] border border-[#1DD1A1]/30 text-[#1DD1A1] py-2 rounded-lg font-medium hover:bg-gradient-to-r hover:from-[#1DD1A1]/20 hover:to-[#1DD1A1]/10 transition-all duration-300 hover:shadow-[0_0_10px_rgba(29,209,161,0.3)] relative overflow-hidden group shadow-inner shadow-black/20"
          >
            <span className="absolute inset-0 w-0 bg-gradient-to-r from-[#1DD1A1]/20 to-[#1DD1A1]/5 group-hover:w-full transition-all duration-700 ease-out"></span>
            <span className="relative z-10 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
              </svg>
            Reset Filters
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;
