import React, { useState, useEffect } from 'react';

const DiscountBanner = () => {
  const [hasClaimedDiscount, setHasClaimedDiscount] = useState(false);
  
  // Check if user has already claimed the discount (using localStorage)
  useEffect(() => {
    const claimed = localStorage.getItem('discountClaimed');
    if (claimed === 'true') {
      setHasClaimedDiscount(true);
    }
  }, []);

  const handleClaimDiscount = () => {
    // redirect to sign-up or checkout
    localStorage.setItem('discountClaimed', 'true');
    setHasClaimedDiscount(true);
    
    // Redirect to signup page
    window.location.href = '/signup';
  };

  // Don't show if user already claimed the discount
  if (hasClaimedDiscount) {
    return null;
  }

  return (
    <section className="py-10 relative overflow-hidden bg-[#111111]" aria-labelledby="discount-heading">
      {/* Subtle background elements */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none" aria-hidden="true">
        {/* Subtle dot pattern */}
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: 'radial-gradient(#efc75e 1px, transparent 1px)',
            backgroundSize: '30px 30px'
          }}
        ></div>
        
        {/* Gold accent lines */}
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#efc75e]/30 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#efc75e]/30 to-transparent"></div>
      </div>
      
      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <div className="bg-[#1a1a1a] border border-[#efc75e]/20 rounded-lg p-6 shadow-lg">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Left side content */}
            <div className="flex-1">
              <div className="flex items-center mb-2">
                <div className="bg-[#efc75e] text-black font-bold px-2 py-1 rounded text-xs uppercase tracking-wider transform -rotate-1 mr-3" aria-hidden="true">
                  Limited Offer
                </div>
                <h2 id="discount-heading" className="text-2xl font-['Rajdhani'] font-bold text-white">
                  15% Off Your First Order
                </h2>
              </div>
              <p className="text-gray-300 text-sm md:text-base">
                Sign up now to receive an exclusive discount and free shipping on orders over $50
              </p>
            </div>
            
            {/* Right side content */}
            <div className="flex items-center">
              <div className="mr-4 hidden md:block" aria-label="Promo code: STRIV15">
                <span className="text-[#efc75e] text-xl font-bold font-mono">STRIV15</span>
              </div>
              <button 
                onClick={handleClaimDiscount}
                className="bg-[#efc75e] hover:bg-[#e0b94f] text-black font-bold py-2 px-6 rounded transition-all duration-300 hover:shadow-[0_0_15px_rgba(239,199,94,0.3)] text-center"
                aria-label="Claim 15% discount on your first order"
              >
                Claim Discount
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DiscountBanner;
