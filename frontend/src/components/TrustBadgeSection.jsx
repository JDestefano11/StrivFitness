import React, { memo } from 'react';

// Simple trust badge component
const TrustBadge = memo(({ icon, text }) => (
  <div className="flex flex-col items-center text-center p-4">
    <div className="text-[#efc75e] mb-3">
      {icon}
    </div>
    <p className="text-white text-sm uppercase tracking-wide font-bold heading-font">
      {text}
    </p>
  </div>
));

// Main component
const TrustBadgeSection = () => {
  // Badge data
  const badges = [
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
  ];

  return (
    <section className="py-12 bg-black border-t border-gray-800">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
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

export default memo(TrustBadgeSection);
