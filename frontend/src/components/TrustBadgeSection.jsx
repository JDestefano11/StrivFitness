import React, { memo, useMemo } from 'react';

// Optimized trust badge component with improved styling
const TrustBadge = memo(({ icon, text }) => (
  <div className="flex flex-col items-center text-center p-4 rounded-lg transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 group">
    <div className="text-[#efc75e] mb-4 relative">
      <div className="w-16 h-16 flex items-center justify-center rounded-full bg-black/40 border border-[#efc75e]/20 group-hover:border-[#efc75e]/40 transition-all duration-300">
        {icon}
      </div>
      <div className="absolute -inset-1 bg-[#efc75e]/10 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    </div>
    <h3 className="text-white text-sm md:text-base uppercase tracking-wide font-bold heading-font mb-1">
      {text}
    </h3>
    <p className="text-gray-400 text-xs body-font mt-1 opacity-80 group-hover:opacity-100 transition-opacity duration-300">
      {text === 'Free Shipping Over $50' && 'On all domestic orders'}
      {text === '30-Day Returns' && 'Hassle-free return policy'}
      {text === '100% Satisfaction Guarantee' && 'Quality guaranteed on all products'}
      {text === 'Secure Checkout' && 'Protected by 256-bit encryption'}
    </p>
  </div>
));

// Main component with performance optimizations
const TrustBadgeSection = () => {
  // Badge data - memoized to prevent recreating on each render
  const badges = useMemo(() => [
    {
      id: 'shipping',
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"></path>
        </svg>
      ),
      text: 'Free Shipping Over $50'
    },
    {
      id: 'returns',
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 15v-1a4 4 0 00-4-4H8m0 0l3 3m-3-3l3-3m9 14V5a2 2 0 00-2-2H6a2 2 0 00-2 2v16l4-2 4 2 4-2 4 2z"></path>
        </svg>
      ),
      text: '30-Day Returns'
    },
    {
      id: 'guarantee',
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
        </svg>
      ),
      text: '100% Satisfaction Guarantee'
    },
    {
      id: 'secure',
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
        </svg>
      ),
      text: 'Secure Checkout'
    }
  ], []);

  return (
    <section className="py-12 border-t border-gray-800/30 backdrop-blur-sm bg-gray-900/10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {badges.map(badge => (
            <TrustBadge 
              key={badge.id}
              icon={badge.icon}
              text={badge.text}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

// Export with memo for performance
export default memo(TrustBadgeSection);
