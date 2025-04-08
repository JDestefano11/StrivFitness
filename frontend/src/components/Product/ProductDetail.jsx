import React, { useState, useEffect, useRef, useContext } from 'react';
import { CartContext } from '../../App';

// Calculate discounted price
const calculateDiscountedPrice = (price, discount) => {
  if (!discount) return price;
  return price - price * (discount / 100);
};

// Format currency
const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  }).format(amount);
};

const ProductDetail = () => {
  // Extract product ID from URL
  const productId = window.location.pathname.split('/').pop();
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [showZoom, setShowZoom] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const imageRef = useRef(null);
  const [timeLeft] = useState({
    hours: Math.floor(Math.random() * 24),
    minutes: Math.floor(Math.random() * 60)
  }); // Mock countdown timer
  
  // Get cart functions from context
  const { addToCart } = useContext(CartContext);

  // Fetch product data
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);
        
        console.log('Fetching product with ID:', productId);
        
        // First try to fetch all products
        const allProductsResponse = await fetch('http://localhost:3001/api/products');
        
        if (!allProductsResponse.ok) {
          throw new Error(`Failed to fetch products: ${allProductsResponse.status}`);
        }
        
        const allProducts = await allProductsResponse.json();
        
        // Find the specific product by ID
        const foundProduct = allProducts.find(p => p._id === productId);
        
        if (!foundProduct) {
          // If product not found in the array, try direct fetch
          const singleProductResponse = await fetch(`http://localhost:3001/api/products/${productId}`);
          
          if (!singleProductResponse.ok) {
            throw new Error(`Failed to fetch product: ${singleProductResponse.status}`);
          }
          
          const singleProductData = await singleProductResponse.json();
          setProduct(singleProductData);
          
          // For demo purposes, if we still don't have a product, create a mock one
          if (!singleProductData) {
            throw new Error('Product not found');
          }
        } else {
          setProduct(foundProduct);
        }
        
        // Set the product
        if (foundProduct) {
          setProduct(foundProduct);
        }
        
        setLoading(false);
      } catch (err) {
        console.error('Error fetching product:', err);
        
        // For demo purposes, create a mock product
        const mockProduct = {
          _id: productId || 'mock123',
          name: 'Premium Fitness Equipment',
          price: 129.99,
          discount: 15,
          description: 'High-quality fitness equipment designed for optimal performance and durability. Perfect for home gyms and professional training.',
          category: 'equipment',
          stock: 12,
          featured: true,
          imageURL: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=500&auto=format&fit=crop',
          gender: 'all'
        };
        
        setProduct(mockProduct);
        

        setLoading(false);
      }
    };
    
    if (productId) {
      fetchProduct();
    } else {
      // If no product ID, show mock data
      const mockProduct = {
        _id: 'default123',
        name: 'Premium Fitness Equipment',
        price: 129.99,
        discount: 15,
        description: 'High-quality fitness equipment designed for optimal performance and durability. Perfect for home gyms and professional training.',
        category: 'equipment',
        stock: 12,
        featured: true,
        imageURL: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=500&auto=format&fit=crop',
        gender: 'all'
      };
      
      setProduct(mockProduct);
      setLoading(false);
    }
  }, [productId]);

  // Handle quantity change
  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (value > 0 && value <= (product?.stock || 10)) {
      setQuantity(value);
    }
  };

  // Increment quantity
  const incrementQuantity = () => {
    if (quantity < (product?.stock || 10)) {
      setQuantity(quantity + 1);
    }
  };

  // Decrement quantity
  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  // Add to cart
  const handleAddToCart = () => {
    // Use the addToCart function from context
    addToCart(product, quantity);
    
    // Show success message
    alert('Product added to cart!');
  };

  // Loading state
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="animate-pulse">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="w-full md:w-1/2">
              <div className="bg-gray-800 rounded-xl h-96"></div>
              <div className="flex mt-4 gap-2">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="bg-gray-800 rounded-lg h-20 w-20"></div>
                ))}
              </div>
            </div>
            <div className="w-full md:w-1/2">
              <div className="h-10 bg-gray-800 rounded w-3/4 mb-4"></div>
              <div className="h-6 bg-gray-800 rounded w-1/4 mb-6"></div>
              <div className="h-4 bg-gray-800 rounded w-full mb-2"></div>
              <div className="h-4 bg-gray-800 rounded w-full mb-2"></div>
              <div className="h-4 bg-gray-800 rounded w-5/6 mb-6"></div>
              <div className="h-10 bg-gray-800 rounded w-full mb-6"></div>
              <div className="h-12 bg-gray-800 rounded w-full"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="bg-red-900/20 border border-red-500 text-red-400 p-4 rounded-lg">
          <h2 className="text-xl font-bold mb-2">Error Loading Product</h2>
          <p>{error}</p>
          <button 
            onClick={() => window.history.back()} 
            className="mt-4 bg-[#00FF94]/10 border border-[#00FF94]/30 text-[#00FF94] px-4 py-2 rounded-lg hover:bg-[#00FF94]/20 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  // If no product found
  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Product Not Found</h2>
          <p className="text-gray-400 mb-6">The product you're looking for doesn't exist or has been removed.</p>
          <button 
            onClick={() => window.location.href = '/shop/all-products'} 
            className="bg-gradient-to-r from-[#00FF94] to-[#1DD1A1] text-[#0A0F2C] px-6 py-3 rounded-lg font-medium hover:shadow-[0_0_15px_rgba(0,255,148,0.4)] transition-all duration-300"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  // Handle product images with fallbacks for both imageURL and imageUrl formats
  const productImages = [
    product.imageURL || product.imageUrl || "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=500&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=500&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1518002171953-a080ee817e1f?q=80&w=500&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?q=80&w=500&auto=format&fit=crop"
  ];

  // Image zoom handler
  const handleMouseMove = (e) => {
    if (!imageRef.current) return;
    
    const { left, top, width, height } = imageRef.current.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    
    setZoomPosition({ x, y });
  };
  
  // Share product handler
  const handleShareProduct = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: `Check out this awesome product: ${product.name}`,
        url: window.location.href,
      })
      .catch((error) => console.log('Error sharing', error));
    } else {
      // Fallback for browsers that don't support the Web Share API
      alert('Share this product: ' + window.location.href);
    }
  };

  return (
    <div className="product-detail-page min-h-screen relative overflow-hidden">
      {/* Override global styles */}
      <style jsx global>{`
        body {
          background: #050B20 !important;
        }
        body::before, body::after {
          display: none !important;
        }
      `}</style>
      
      {/* Premium background with circular green gradient */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Rich dark blue base */}
        <div className="absolute inset-0 bg-[#050B20]"></div>
        
        {/* Large central circular gradient */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[150vh] h-[150vh]">
          <div className="w-full h-full rounded-full bg-[radial-gradient(circle,#1DD1A1/30_0%,transparent_60%)]" style={{animation: 'pulse 15s infinite alternate ease-in-out'}}></div>
        </div>
        
        {/* Secondary circular gradient for depth */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[120vh] h-[120vh]">
          <div className="w-full h-full rounded-full bg-[radial-gradient(circle,#00FF94/25_0%,transparent_70%)]" style={{animation: 'pulse-delay 18s infinite alternate-reverse ease-in-out'}}></div>
        </div>
        
        {/* Additional inner glow */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[80vh] h-[80vh]">
          <div className="w-full h-full rounded-full bg-[radial-gradient(circle,#1DD1A1/10_0%,transparent_70%)]" style={{animation: 'pulse-fast 12s infinite alternate ease-in-out'}}></div>
        </div>
        
        {/* Top-right accent circle */}
        <div className="absolute -top-20 -right-20 w-80 h-80">
          <div className="w-full h-full rounded-full bg-[radial-gradient(circle,#00FF94/15_0%,transparent_70%)]"></div>
        </div>
        
        {/* Bottom-left accent circle */}
        <div className="absolute -bottom-20 -left-20 w-80 h-80">
          <div className="w-full h-full rounded-full bg-[radial-gradient(circle,#1DD1A1/15_0%,transparent_70%)]"></div>
        </div>
        
        {/* Custom animation keyframes */}
        <style jsx global>{`
          @keyframes pulse {
            0% { opacity: 0.2; transform: scale(0.98); }
            100% { opacity: 0.35; transform: scale(1.02); }
          }
          @keyframes pulse-delay {
            0% { opacity: 0.15; transform: scale(0.95); }
            100% { opacity: 0.3; transform: scale(1.05); }
          }
          @keyframes pulse-fast {
            0% { opacity: 0.1; transform: scale(0.9); }
            100% { opacity: 0.2; transform: scale(1.1); }
          }
        `}</style>
        
        {/* Subtle vignette effect */}
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(circle at center, transparent 30%, rgba(0,0,0,0.3) 100%)'
        }}></div>
        
        {/* Subtle green accents */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#1DD1A1] to-transparent opacity-60"></div>
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#00FF94] to-transparent opacity-60"></div>
      </div>
      
      {/* Clean product header */}
      <div className="pt-16 pb-4 bg-gradient-to-b from-[#1C1C1E]/90 to-transparent">
        <div className="container mx-auto px-4">
          <div className="flex items-center text-sm text-gray-400 mb-1">
            <a href="/" className="hover:text-white transition-colors">Home</a>
            <span className="mx-2 text-gray-600">/</span>
            <a href="/shop/all-products" className="hover:text-white transition-colors">Shop</a>
            <span className="mx-2 text-gray-600">/</span>
            <a href={`/shop/${product.category}`} className="hover:text-white transition-colors capitalize">
              {product.category}
            </a>
          </div>
        </div>
      </div>

      {/* Product Detail Section */}
      <div className="container mx-auto px-4 pt-2 pb-8">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* Product Images - Left Column */}
          <div className="w-full lg:w-1/2">
            {/* Main product image with zoom capability */}
            <div 
              className="relative mb-6 overflow-hidden rounded-xl border border-gray-800 bg-gradient-to-b from-black/60 to-black/80 shadow-xl shadow-black/30"
              onMouseEnter={() => setShowZoom(true)}
              onMouseLeave={() => setShowZoom(false)}
              onMouseMove={handleMouseMove}
              ref={imageRef}
            >
              {/* Sale badge if discounted */}
              {product.discount > 0 && (
                <div className="absolute top-4 left-4 z-10 bg-red-500 text-white text-sm font-bold px-3 py-1 rounded-full">
                  {product.discount}% OFF
                </div>
              )}
              
              {/* Stock warning if low */}
              {product.stock > 0 && product.stock < 5 && (
                <div className="absolute top-4 right-4 z-10 bg-orange-500/90 text-white text-sm font-bold px-3 py-1 rounded-full">
                  Only {product.stock} left!
                </div>
              )}
              

              
              {/* 360 view icon */}
              <div className="absolute bottom-4 right-4 z-10 bg-black/60 text-white p-2 rounded-full cursor-pointer hover:bg-black/80 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10 3.5a1.5 1.5 0 013 0V4a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-.5a1.5 1.5 0 000 3h.5a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-.5a1.5 1.5 0 00-3 0v.5a1 1 0 01-1 1H6a1 1 0 01-1-1v-3a1 1 0 00-1-1h-.5a1.5 1.5 0 010-3H4a1 1 0 001-1V6a1 1 0 011-1h3a1 1 0 001-1v-.5z" />
                </svg>
              </div>
              
              {/* Main product image with fallback handling */}
              <img 
                src={productImages[selectedImage]} 
                alt={product.name} 
                className="w-full h-[400px] md:h-[500px] lg:h-[550px] object-cover object-center hover:scale-105 transition-transform duration-700 ease-in-out"
                onError={(e) => {
                  console.log('Image failed to load, using fallback');
                  e.target.onerror = null;
                  e.target.src = "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=500&auto=format&fit=crop";
                }}
              />
              
              {/* Zoom overlay */}
              {showZoom && (
                <div 
                  className="absolute inset-0 bg-no-repeat bg-cover z-20 opacity-0 hover:opacity-100 transition-opacity duration-200"
                  style={{
                    backgroundImage: `url(${productImages[selectedImage] || "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=500&auto=format&fit=crop"})`,
                    backgroundPosition: `${zoomPosition.x}% ${zoomPosition.y}%`,
                    backgroundSize: '200%'
                  }}
                />
              )}
            </div>
            
            {/* Thumbnail gallery - centered under main image */}
            <div className="grid grid-cols-4 gap-5 mt-5" style={{width: "100%"}}>
              {productImages.map((image, index) => (
                <button 
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`cursor-pointer rounded-lg overflow-hidden transition-all duration-300 ${selectedImage === index 
                    ? 'ring-2 ring-[#00FF94] ring-offset-2 ring-offset-[#0A0F2C] scale-105 shadow-lg shadow-[#00FF94]/10' 
                    : 'border border-gray-800 hover:border-gray-600 hover:shadow-md hover:shadow-black/50'}`}
                  aria-label={`View product image ${index + 1}`}
                >
                  <div className="aspect-square relative group" style={{minHeight: "150px"}}>
                    <img 
                      src={image} 
                      alt={`${product.name} - view ${index + 1}`}
                      className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500"
                      onError={(e) => {
                        console.log('Thumbnail image failed to load, using fallback');
                        e.target.onerror = null;
                        e.target.src = "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=500&auto=format&fit=crop";
                      }}
                    />
                    <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="text-white text-xs font-medium">View</span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
            
            {/* Trust signals under photos - styled to match right content */}
            <div className="mt-13 mb-5">
              <div className="inline-flex items-center justify-between w-full bg-gradient-to-r from-[#1C1C1E]/70 to-[#0A0F2C]/60 rounded-lg py-5 px-6 backdrop-blur-sm border border-[#1DD1A1]/20 shadow-inner shadow-[#00FF94]/5">
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-[#0A0F2C]/70 flex items-center justify-center border border-[#1DD1A1]/40 mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#00FF94]" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-white text-lg font-medium">Secure Checkout</span>
                </div>
                
                <div className="flex items-center pl-4 border-l border-[#1DD1A1]/20">
                  <div className="w-12 h-12 rounded-full bg-[#0A0F2C]/70 flex items-center justify-center border border-[#1DD1A1]/40 mx-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#00FF94]" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                      <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1v-1h5a1 1 0 001-1v-1h1a1 1 0 100-2h-1V6a1 1 0 00-1-1h-5a1 1 0 00-1 1v1H3V5a1 1 0 00-1-1z" />
                    </svg>
                  </div>
                  <span className="text-white text-lg font-medium">Free Shipping</span>
                </div>
                
                <div className="flex items-center pl-4 border-l border-[#1DD1A1]/20">
                  <div className="w-12 h-12 rounded-full bg-[#0A0F2C]/70 flex items-center justify-center border border-[#1DD1A1]/40 mx-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#00FF94]" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-white text-lg font-medium">Easy Returns</span>
                </div>
                
                <div className="flex items-center pl-4 border-l border-[#1DD1A1]/20">
                  <div className="w-12 h-12 rounded-full bg-[#0A0F2C]/70 flex items-center justify-center border border-[#1DD1A1]/40 mx-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#00FF94]" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-white text-lg font-medium">100% Authentic</span>
                </div>
              </div>
            </div>
          </div>

          {/* Product Info - Right Column */}
          <div className="w-full lg:w-1/2 lg:sticky lg:top-24 self-start bg-[#0A0F2C]/60 backdrop-blur-sm p-6 rounded-xl border border-gray-800 shadow-xl shadow-[#0A0F2C]/30 relative" style={{height: "fit-content"}}>
            {/* Favorite and share buttons - top right */}
            <div className="absolute top-4 right-4 flex space-x-3">
              <button className="text-gray-400 hover:text-[#00FF94] transition-colors cursor-pointer" title="Add to Wishlist">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                </svg>
              </button>
              <button onClick={handleShareProduct} className="text-gray-400 hover:text-[#00FF94] transition-colors cursor-pointer" title="Share Product">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
                </svg>
              </button>
            </div>
            
            {/* Product title first */}
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 heading-font tracking-wide leading-tight">
              {product.name}
            </h1>
            
            {/* Product badges and gender in one row - discount removed */}
            <div className="flex flex-wrap gap-2 mb-2">
              {product.gender && product.gender !== 'all' && (
                <span className="text-gray-300 text-sm capitalize bg-gray-800/50 px-2 py-0.5 rounded">{product.gender}</span>
              )}
            </div>
            
            {/* Limited time offer countdown removed */}
            
            {/* Star ratings */}
            <div className="flex items-center mb-4">
              <div className="flex text-[#00FF94]">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg key={star} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="ml-2 text-gray-400 text-sm">{product.rating || '4.5 (24 reviews)'}</span>
            </div>

            {/* Product price */}
            <div className="mb-6">
              {product.discount > 0 ? (
                <div className="flex items-center">
                  <span className="text-gray-400 text-lg line-through mr-3">
                    ${product.price.toFixed(2)}
                  </span>
                  <span className="text-[#00FF94] text-2xl md:text-3xl font-bold">
                    ${calculateDiscountedPrice(product.price, product.discount).toFixed(2)}
                  </span>
                  <span className="ml-3 bg-[#1DD1A1]/20 text-[#00FF94] text-xs font-bold px-2 py-1 rounded border border-[#1DD1A1]/30">
                    SAVE ${(product.price - calculateDiscountedPrice(product.price, product.discount)).toFixed(2)}
                  </span>
                </div>
              ) : (
                <span className="text-[#00FF94] text-2xl md:text-3xl font-bold">
                  ${product.price.toFixed(2)}
                </span>
              )}
              

            </div>

            {/* Product description with key benefits */}
            <div className="mb-6">
              <p className="text-gray-300 leading-relaxed mb-4">
                {product.description}
              </p>
              
              {/* Key benefits */}
              <h3 className="text-white font-semibold mb-3">Key Benefits</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#00FF94] mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-300">Premium quality materials for durability</span>
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#00FF94] mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-300">Designed for optimal workout performance</span>
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#00FF94] mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-300">Exclusive StrivFitness design</span>
                </li>
              </ul>
            </div>
            
            {/* Product specifications */}
            <div className="mb-6 border-t border-gray-800 pt-4">
              <h3 className="text-white font-semibold mb-3">Product Specifications</h3>
              <div className="inline-flex items-center justify-between w-full bg-gradient-to-r from-[#0A0F2C]/70 to-[#1C1C1E]/50 rounded-lg py-2 px-3 backdrop-blur-sm border border-[#1DD1A1]/20 shadow-inner shadow-[#00FF94]/5">
                <div className="flex items-center mr-6">
                  <div className="w-6 h-6 rounded-full bg-[#1C1C1E]/70 flex items-center justify-center border border-[#1DD1A1]/40 mr-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-[#00FF94]" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <span className="text-[#00FF94] text-xs uppercase tracking-wide font-medium block">Material</span>
                    <p className="text-white text-sm font-medium">{product.material || 'Premium Blend'}</p>
                  </div>
                </div>
                
                <div className="flex items-center mr-6 pl-6 border-l border-[#1DD1A1]/20">
                  <div className="w-6 h-6 rounded-full bg-[#1C1C1E]/70 flex items-center justify-center border border-[#1DD1A1]/40 mr-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-[#00FF94]" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <span className="text-[#00FF94] text-xs uppercase tracking-wide font-medium block">Weight</span>
                    <p className="text-white text-sm font-medium">{product.weight || '0.5 kg'}</p>
                  </div>
                </div>
                
                <div className="flex items-center mr-6 pl-6 border-l border-[#1DD1A1]/20">
                  <div className="w-6 h-6 rounded-full bg-[#1C1C1E]/70 flex items-center justify-center border border-[#1DD1A1]/40 mr-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-[#00FF94]" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4 2a2 2 0 00-2 2v11a3 3 0 106 0V4a2 2 0 00-2-2H4zm1 14a1 1 0 100-2 1 1 0 000 2zm5-1.757l4.9-4.9a2 2 0 000-2.828L13.485 5.1a2 2 0 00-2.828 0L10 5.757v8.486zM16 18H9.071l6-6H16a2 2 0 012 2v2a2 2 0 01-2 2z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <span className="text-[#00FF94] text-xs uppercase tracking-wide font-medium block">Color</span>
                    <p className="text-white text-sm font-medium">{product.color || 'Black/Gold'}</p>
                  </div>
                </div>
                
                <div className="flex items-center pl-6 border-l border-[#1DD1A1]/20">
                  <div className="w-6 h-6 rounded-full bg-[#1C1C1E]/70 flex items-center justify-center border border-[#1DD1A1]/40 mr-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-[#00FF94]" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                    </svg>
                  </div>
                  <div>
                    <span className="text-[#00FF94] text-xs uppercase tracking-wide font-medium block">Size</span>
                    <p className="text-white text-sm font-medium">{product.size || 'Universal'}</p>
                  </div>
                </div>
              </div>
            </div>


            


            {/* Quantity selector */}
            {product.stock > 0 && (
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-white font-medium">Select Quantity</label>
                </div>
                <div className="relative">
                  <div className="flex items-center">
                    <button 
                      onClick={decrementQuantity}
                      className="bg-gradient-to-r from-[#0A0F2C]/60 to-[#1C1C1E]/60 border border-gray-700 text-white w-14 h-14 rounded-l-lg hover:bg-[#0A0F2C]/60 hover:border-[#00FF94]/50 transition-all active:bg-[#00FF94]/10 flex items-center justify-center shadow-inner shadow-black/50 group cursor-pointer"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400 group-hover:text-[#00FF94] transition-colors" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                      </svg>
                    </button>
                    <div className="relative flex items-center justify-center">
                      <div className="w-24 h-14 border-t border-b border-gray-700 bg-gradient-to-b from-black/40 to-gray-900/40 text-white text-xl font-medium shadow-inner shadow-black/30">
                        <div className="flex h-full w-full items-center justify-center">
                          {quantity}
                        </div>
                      </div>
                      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-transparent to-black/20 rounded-sm"></div>
                    </div>
                    <button 
                      onClick={incrementQuantity}
                      className="bg-gradient-to-r from-[#0A0F2C]/60 to-[#1C1C1E]/60 border border-gray-700 text-white w-14 h-14 rounded-r-lg hover:bg-[#0A0F2C]/60 hover:border-[#00FF94]/50 transition-all active:bg-[#00FF94]/10 flex items-center justify-center shadow-inner shadow-black/50 group cursor-pointer"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400 group-hover:text-[#00FF94] transition-colors" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                  <div className="absolute -bottom-3 left-0 right-0 h-6 bg-gradient-to-t from-black/20 to-transparent rounded-b-lg pointer-events-none opacity-70"></div>
                </div>
              </div>
            )}

            {/* Call to action buttons */}
            <div className="mb-8 space-y-4">
              {/* Add to cart button */}
              <button 
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className={`w-full py-4 px-6 rounded-lg font-bold text-lg flex items-center justify-center transition-all duration-300 relative overflow-hidden ${
                  product.stock === 0 
                    ? 'bg-gray-700/30 text-gray-500 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-[#00FF94] to-[#1DD1A1] text-[#0A0F2C] hover:shadow-[0_5px_15px_rgba(0,255,148,0.4)] cursor-pointer'
                }`}
              >
                {product.stock > 0 && (
                  <span className="absolute inset-0 w-full h-full">
                    <span className="absolute -top-10 -left-10 w-16 h-40 bg-white/20 rotate-12 transform translate-x-0 -translate-y-1 animate-shimmer"></span>
                  </span>
                )}
                <span className="relative z-10 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                  </svg>
                  {product.stock === 0 ? 'Out of Stock' : 'ADD TO CART'}
                </span>
              </button>
              
              {/* Buy now button */}
              {product.stock > 0 && (
                <button 
                  onClick={() => {
                    handleAddToCart();
                    // Navigate to checkout would go here
                  }}
                  className="w-full py-4 px-6 rounded-lg font-bold text-lg flex items-center justify-center transition-all duration-300 bg-white/10 text-white border border-[#00FF94]/30 hover:bg-white/20 hover:border-[#00FF94]/50 cursor-pointer"
                >
                  <span className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                    BUY NOW
                  </span>
                </button>
              )}
              
              {/* Satisfaction guarantee */}
              <div className="flex items-center justify-center mt-4 text-gray-400 text-sm">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#00FF94] mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>30-Day Money-Back Guarantee</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
