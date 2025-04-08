import React, { memo } from 'react';

// Enhanced trust badge component
const TrustBadge = memo(({ icon, text, description }) => (
  <div className="flex flex-col items-center text-center p-6 relative group">
    {/* Brand accent hover effect */}
    <div className="absolute inset-0 bg-gradient-to-b from-[#00FF94]/0 to-[#00FF94]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg"></div>
    
    {/* Icon with enhanced styling */}
    <div className="relative mb-4 transform group-hover:scale-110 transition-transform duration-500">
      <div className="absolute -inset-1 bg-gradient-to-r from-[#00FF94]/0 via-[#00FF94]/30 to-[#00FF94]/0 rounded-full blur opacity-0 group-hover:opacity-70 transition duration-500"></div>
      <div className="relative bg-[#0A0F2C]/50 p-4 rounded-full border border-[#00FF94]/20 text-[#00FF94]">
        {icon}
      </div>
    </div>
    
    {/* Text with enhanced styling */}
    <h3 className="text-white text-base uppercase tracking-wide font-bold heading-font mb-2 group-hover:text-[#00FF94] transition-colors duration-300">
      {text}
    </h3>
    
    {/* Description text */}
    <p className="text-gray-400 text-sm body-font group-hover:text-gray-300 transition-colors duration-300">
      {description}
    </p>
  </div>
));

// Main component
const TrustBadgeSection = () => {
  // Enhanced badge data with descriptions
  const badges = [
    {
      id: 'shipping',
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"></path>
        </svg>
      ),
      text: 'Free Shipping',
      description: 'On all orders over $50, delivered straight to your door'
    },
    {
      id: 'returns',
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 15v-1a4 4 0 00-4-4H8m0 0l3 3m-3-3l3-3m9 14V5a2 2 0 00-2-2H6a2 2 0 00-2 2v16l4-2 4 2 4-2 4 2z"></path>
        </svg>
      ),
      text: '30-Day Returns',
      description: 'Not satisfied? Return any unused product within 30 days'
    },
    {
      id: 'guarantee',
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
        </svg>
      ),
      text: 'Satisfaction Guarantee',
      description: 'We stand behind the quality of every product we sell'
    },
    {
      id: 'secure',
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
        </svg>
      ),
      text: 'Secure Checkout',
      description: 'Your data is protected with industry-leading encryption'
    }
  ];

  return (
    <section className="py-14 relative border-t border-b border-gray-800 bg-[#0A0F2C]/30 backdrop-blur-sm">
      {/* Background image with overlay */}
      <div className="absolute inset-0 opacity-10 bg-cover bg-center" style={{ backgroundImage: "url('/assets/fitness-pattern.jpg')" }}></div>
      {/* Enhanced gold accents */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#00FF94]/30 to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#1DD1A1]/30 to-transparent"></div>
      
      <div className="container mx-auto px-4">
        {/* Section title */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center mb-3">
            <span className="h-[1px] w-8 bg-gradient-to-r from-transparent to-[#00FF94]"></span>
            <span className="text-[#00FF94] text-xs font-bold tracking-widest accent-font uppercase mx-3">
              WHY CHOOSE US
            </span>
            <span className="h-[1px] w-8 bg-gradient-to-l from-transparent to-[#00FF94]"></span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 heading-font">
            The <span className="text-[#1DD1A1]">Striv</span> Difference
          </h2>
        </div>
        
        {/* Trust badges with enhanced styling */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {badges.map(badge => (
            <TrustBadge 
              key={badge.id}
              icon={badge.icon}
              text={badge.text}
              description={badge.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default memo(TrustBadgeSection);
