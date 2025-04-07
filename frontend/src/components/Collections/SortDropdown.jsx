import React, { useState, useRef, useEffect } from "react";
import ReactDOM from "react-dom";

const SortDropdown = ({ value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);
  const [buttonPosition, setButtonPosition] = useState({ top: 0, left: 0, width: 0 });

  // Sort options with labels
  const sortOptions = [
    { value: "featured", label: "Featured" },
    { value: "price-low-high", label: "Price: Low to High" },
    { value: "price-high-low", label: "Price: High to Low" },
    { value: "newest", label: "Newest First" },
    { value: "name-a-z", label: "Name: A to Z" },
    { value: "name-z-a", label: "Name: Z to A" },
  ];

  // Get current selected option label
  const selectedOption = sortOptions.find(option => option.value === value) || sortOptions[0];

  // Toggle dropdown
  const toggleDropdown = () => {
    if (!isOpen && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setButtonPosition({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
        width: rect.width
      });
    }
    setIsOpen(!isOpen);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Handle option selection
  const handleSelect = (optionValue) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        type="button"
        ref={buttonRef}
        className={`bg-black/40 border ${isOpen ? 'border-[#efc75e]' : 'border-gray-700'} rounded-lg py-2 px-4 text-white flex items-center justify-between min-w-[180px] hover:border-[#efc75e]/50 transition-colors focus:outline-none focus:ring-2 focus:ring-[#efc75e]/30 relative cursor-pointer`}
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        <span className="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-[#efc75e]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
          </svg>
          <span className="font-medium">{selectedOption.label}</span>
        </span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`h-4 w-4 ml-2 transition-transform duration-200 ${isOpen ? "transform rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && ReactDOM.createPortal(
        <div 
          className="fixed inset-0 z-[9990] bg-transparent pointer-events-none"
          onClick={toggleDropdown}
        >
          <div 
            ref={dropdownRef}
            className={`absolute bg-black/95 backdrop-blur-md border border-[#efc75e]/50 rounded-lg shadow-xl z-[9999] overflow-hidden pointer-events-auto`}
            style={{ 
              top: `${buttonPosition.top}px`,
              left: `${buttonPosition.left}px`,
              width: `${buttonPosition.width}px`,
              boxShadow: '0 10px 25px rgba(0, 0, 0, 0.8), 0 0 10px rgba(239, 199, 94, 0.3)',
              animation: 'dropdownFadeIn 0.2s ease-out'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="py-1 max-h-60 overflow-y-auto scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
              {sortOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleSelect(option.value)}
                  className={`w-full text-left px-4 py-2 text-sm ${
                    value === option.value
                      ? "bg-[#efc75e]/20 text-[#efc75e] font-medium"
                      : "text-gray-300 hover:bg-gray-800 hover:text-[#efc75e]/80"
                  } transition-colors duration-150 flex items-center`}
                >
                  {value === option.value ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-[#efc75e]" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <span className="w-4 mr-2"></span>
                  )}
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
};

export default SortDropdown;
