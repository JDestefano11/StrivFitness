import React, { useContext, useState, useEffect } from 'react';
import { CartContext } from '../../App';

const CartPage = () => {
  const { cart, removeFromCart, updateQuantity, clearCart } = useContext(CartContext);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  
  // Effect to hide global gradients when cart page is mounted
  useEffect(() => {
    // Add a class to the body to hide global gradients
    document.body.classList.add('hide-global-gradients');
    
    // Clean up when component unmounts
    return () => {
      document.body.classList.remove('hide-global-gradients');
    };
  }, []);

  // Calculate subtotal
  const subtotal = cart.reduce((total, item) => {
    return total + (item.price * item.quantity);
  }, 0);

  // Handle quantity change
  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity < 1) return;
    updateQuantity(id, newQuantity);
  };

  // Format price with currency
  const formatPrice = (price) => {
    return `$${price.toFixed(2)}`;
  };

  // Checkout function
  const handleCheckout = () => {
    setIsCheckingOut(true);
    // Here you would normally redirect to a checkout page or process
    setTimeout(() => {
      alert('Checkout functionality will be implemented in the future!');
      setIsCheckingOut(false);
    }, 1500);
  };

  return (
    <div className="cart-page-container">
      {/* Custom styles for cart page with green gradient */}
      <style dangerouslySetInnerHTML={{ __html: `
        /* Hide global gradients on cart page */
        body.hide-global-gradients::before,
        body.hide-global-gradients::after {
          display: none !important;
          opacity: 0 !important;
          visibility: hidden !important;
        }
        
        /* Cart page specific styles */
        .cart-page-container {
          position: relative;
          background: linear-gradient(135deg, #050B20 0%, #0A1428 100%) !important;
          min-height: 100vh;
          z-index: 2;
        }
        
        /* Animation keyframes */
        @keyframes pulse {
          0% { opacity: 0.8; transform: scale(0.98); }
          100% { opacity: 1; transform: scale(1.02); }
        }
        
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
          100% { transform: translateY(0px); }
        }
      `}} />
      
      {/* Green gradient background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
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
      
      {/* Main content with proper spacing */}
      <div className="container mx-auto px-4 pt-24 pb-16 relative z-10">
        <h1 className="text-4xl font-bold text-white mb-8 font-['Rajdhani'] tracking-wider uppercase">Your Cart</h1>
        
        {cart.length === 0 ? (
          <div className="text-center py-16 bg-black/50 backdrop-blur-sm border border-[#1DD1A1]/30 rounded-xl">
            <div className="text-gray-400 text-xl mb-6">Your cart is empty</div>
            <a 
              href="/shop" 
              className="inline-block bg-gradient-to-r from-[#00FF94] to-[#1DD1A1] text-[#0A0F2C] py-3 px-8 rounded-lg font-bold hover:shadow-[0_0_15px_rgba(0,255,148,0.4)] transition-all duration-300 cursor-pointer"
            >
              CONTINUE SHOPPING
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items - Left Column */}
            <div className="lg:col-span-2">
              <div className="bg-black/50 backdrop-blur-sm rounded-xl p-6 border border-[#1DD1A1]/30">
                {/* Header */}
                <div className="hidden md:grid grid-cols-12 gap-4 pb-4 border-b border-[#1DD1A1]/20 text-gray-400 font-medium">
                  <div className="col-span-6">PRODUCT</div>
                  <div className="col-span-2 text-center">PRICE</div>
                  <div className="col-span-2 text-center">QUANTITY</div>
                  <div className="col-span-2 text-center">TOTAL</div>
                </div>
                
                {/* Cart Items */}
                <div className="divide-y divide-[#1DD1A1]/20">
                  {cart.map((item) => (
                    <div key={item.id} className="py-6 grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                      {/* Product Info */}
                      <div className="col-span-6 flex items-center space-x-4">
                        <div className="w-20 h-20 bg-gray-900 rounded-lg overflow-hidden flex-shrink-0 border border-gray-800">
                          <img 
                            src={item.image} 
                            alt={item.name} 
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = '/assets/placeholder.jpg';
                            }}
                          />
                        </div>
                        <div>
                          <h3 className="text-white font-medium font-['Rajdhani']">{item.name}</h3>
                          <p className="text-gray-400 text-sm">{item.category}</p>
                          <button 
                            onClick={() => removeFromCart(item.id)}
                            className="text-[#FF4757] hover:text-[#FF4757]/80 transition-all duration-300 group mt-2 cursor-pointer"
                            aria-label="Remove item"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transform group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </div>
                      
                      {/* Price */}
                      <div className="md:col-span-2 flex md:block items-center justify-between">
                        <span className="md:hidden text-gray-400">Price:</span>
                        <span className="text-white text-center block">{formatPrice(item.price)}</span>
                      </div>
                      
                      {/* Quantity */}
                      <div className="md:col-span-2 flex md:block items-center justify-between">
                        <span className="md:hidden text-gray-400">Quantity:</span>
                        <div className="flex items-center justify-center">
                          <button 
                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                            className="w-8 h-8 flex items-center justify-center border border-[#1DD1A1]/30 rounded-l-md bg-black/60 text-gray-200 hover:text-white hover:bg-[#1DD1A1]/20 transition-all duration-300 hover:border-[#00FF94]/50 cursor-pointer"
                          >
                            -
                          </button>
                          <span className="w-10 h-8 flex items-center justify-center border-t border-b border-[#1DD1A1]/30 bg-black/60 text-white font-medium">
                            {item.quantity}
                          </span>
                          <button 
                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                            className="w-8 h-8 flex items-center justify-center border border-[#1DD1A1]/30 rounded-r-md bg-black/60 text-gray-200 hover:text-white hover:bg-[#1DD1A1]/20 transition-all duration-300 hover:border-[#00FF94]/50 cursor-pointer"
                          >
                            +
                          </button>
                        </div>
                      </div>
                      
                      {/* Total */}
                      <div className="md:col-span-2 flex md:block items-center justify-between">
                        <span className="md:hidden text-gray-400">Total:</span>
                        <span className="text-[#00FF94] font-bold text-center block">
                          {formatPrice(item.price * item.quantity)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Cart Actions */}
                <div className="flex justify-between items-center mt-6 pt-6 border-t border-[#1DD1A1]/20">
                  <button 
                    onClick={clearCart}
                    className="text-red-500 hover:text-red-400 transition-colors cursor-pointer"
                  >
                    Clear Cart
                  </button>
                  <a 
                    href="/shop" 
                    className="text-[#00FF94] hover:text-[#00FF94]/80 transition-colors cursor-pointer"
                  >
                    Continue Shopping
                  </a>
                </div>
              </div>
            </div>
            
            {/* Order Summary - Right Column */}
            <div className="lg:col-span-1">
              <div className="bg-black/50 backdrop-blur-sm rounded-xl p-6 border border-[#1DD1A1]/30 sticky top-24">
                <h2 className="text-xl font-bold text-white mb-6 font-['Rajdhani'] uppercase tracking-wider">Order Summary</h2>
                
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Subtotal</span>
                    <span className="text-white font-medium">{formatPrice(subtotal)}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-400">Shipping</span>
                    <span className="text-white font-medium">Calculated at checkout</span>
                  </div>
                  
                  <div className="flex justify-between pt-4 border-t border-[#1DD1A1]/20">
                    <span className="text-white font-bold">Total</span>
                    <span className="text-[#00FF94] font-bold">{formatPrice(subtotal)}</span>
                  </div>
                </div>
                
                <button 
                  onClick={handleCheckout}
                  disabled={isCheckingOut}
                  className={`w-full py-4 px-6 mt-6 rounded-lg font-bold text-lg flex items-center justify-center transition-all duration-300 
                    ${isCheckingOut 
                      ? 'bg-gray-700 text-gray-400 cursor-not-allowed' 
                      : 'bg-gradient-to-r from-[#00FF94] to-[#1DD1A1] text-[#0A0F2C] hover:shadow-[0_0_15px_rgba(0,255,148,0.4)] cursor-pointer'
                    }`}
                >
                  {isCheckingOut ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      PROCESSING...
                    </>
                  ) : 'CHECKOUT'}
                </button>
                
                <div className="mt-6 text-center text-sm text-gray-500">
                  Secure checkout powered by Stripe
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Removed black barrier */}
    </div>
  );
};

export default CartPage;
