import React, { useState, useRef } from 'react';

const NewsletterSection = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const inputRef = useRef(null);
  const formRef = useRef(null);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setIsError(true);
      setErrorMessage('Please enter a valid email address');
      return;
    }
    
    setIsSubmitting(true);
    setIsError(false);
    
    // Simulate API call
    try {
      // In a real app, you would make an API call here
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setIsSuccess(true);
      setEmail('');
      
      // Reset success state after 5 seconds
      setTimeout(() => {
        setIsSuccess(false);
      }, 5000);
    } catch (error) {
      setIsError(true);
      setErrorMessage('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Focus effect on input field
  const handleFocus = () => {
    if (formRef.current) {
      formRef.current.classList.add('form-focused');
    }
  };
  
  const handleBlur = () => {
    if (formRef.current) {
      formRef.current.classList.remove('form-focused');
    }
  };
  
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Gold accent lines */}
      <div className="gold-accent-top"></div>
      <div className="gold-accent-bottom"></div>
      
      <div className="container mx-auto px-4 relative z-20">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-10">
          {/* Left side content */}
          <div className="lg:w-1/2">
            {/* Section heading - aligned left */}
            <div className="mb-8 text-left">
              <div className="inline-flex items-center mb-3">
                <span className="text-[#efc75e] text-sm font-bold tracking-widest uppercase accent-font">
                  Stay Updated
                </span>
                <span className="ml-4 h-[1px] w-10 bg-gradient-to-l from-[#efc75e] to-transparent"></span>
              </div>
              
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 heading-font tracking-wide uppercase">
                Gain The <span className="text-[#efc75e]">Edge</span>
              </h2>
              
              <p className="text-gray-300 text-base md:text-lg body-font mb-8">
                Subscribe to our newsletter for exclusive workout tips, early access to new products, 
                and special offers only available to our community.
              </p>
            </div>
            
            {/* Benefits of subscribing - moved up and aligned left */}
            <div className="grid grid-cols-1 gap-6 mb-8">
              {[
                {
                  icon: (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                  ),
                  title: "Early Access",
                  description: "Be the first to know about new products and exclusive pre-orders."
                },
                {
                  icon: (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                  ),
                  title: "Exclusive Discounts",
                  description: "Subscriber-only deals and special promotions on premium products."
                },
                {
                  icon: (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                    </svg>
                  ),
                  title: "Expert Advice",
                  description: "Training tips and nutrition guidance from certified fitness experts."
                }
              ].map((benefit, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#efc75e]/10 flex items-center justify-center text-[#efc75e]">
                    {benefit.icon}
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-lg mb-1 heading-font">{benefit.title}</h3>
                    <p className="text-gray-400 body-font">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Right side - Email subscription box only */}
          <div className="lg:w-1/2">
            <div 
              ref={formRef}
              className="relative transition-all duration-500 group"
            >
              {/* Form background with glow effect */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-[#efc75e]/0 via-[#efc75e]/30 to-[#efc75e]/0 rounded-lg blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
              
              <div className="relative bg-black/80 backdrop-blur-sm p-8 md:p-10 rounded-lg border border-gray-800 shadow-xl">
                {isSuccess ? (
                  <div className="text-center py-6">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#efc75e]/20 mb-6">
                      <svg className="w-8 h-8 text-[#efc75e]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2 heading-font">You're In!</h3>
                    <p className="text-gray-300 body-font">
                      Thank you for subscribing to our newsletter. Get ready for exclusive content!
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="text-center mb-6">
                      <h3 className="text-xl md:text-2xl font-bold text-white mb-2 heading-font">
                        JOIN THE STRIV COMMUNITY
                      </h3>
                      <p className="text-gray-400 text-sm md:text-base body-font">
                        Enter your email to receive fitness tips, exclusive offers, and more.
                      </p>
                    </div>
                    
                    <div className="relative">
                      <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-grow relative">
                          <input
                            ref={inputRef}
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                            placeholder="Your email address"
                            className="w-full bg-black/50 border border-gray-700 focus:border-[#efc75e] text-white px-4 py-3 rounded-lg outline-none transition-all duration-300 body-font placeholder-gray-500"
                            disabled={isSubmitting}
                          />
                          {isError && (
                            <p className="absolute -bottom-6 left-0 text-red-400 text-xs mt-1">
                              {errorMessage}
                            </p>
                          )}
                        </div>
                        
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="relative px-6 py-3 bg-gradient-to-r from-[#efc75e] to-[#d9b04d] text-black font-bold rounded-lg overflow-hidden transition-all duration-300 hover:shadow-[0_0_20px_rgba(239,199,94,0.4)] disabled:opacity-70 disabled:cursor-not-allowed heading-font uppercase tracking-wider"
                        >
                          {isSubmitting ? (
                            <span className="flex items-center justify-center">
                              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                              Processing
                            </span>
                          ) : (
                            <>
                              <span className="relative z-10">Subscribe</span>
                              <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out"></span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                    
                    <p className="text-gray-500 text-xs text-center mt-4 body-font">
                      By subscribing, you agree to our Privacy Policy and consent to receive updates from us.
                      <br />We respect your privacy and will never share your information.
                    </p>
                  </form>
                )}
                
                {/* Decorative elements */}
                <div className="absolute -top-4 -right-4 w-24 h-24 md:w-32 md:h-32 pointer-events-none">
                  <div className="absolute top-0 right-0 w-full h-[2px] bg-gradient-to-l from-[#efc75e] to-transparent"></div>
                  <div className="absolute top-0 right-0 h-full w-[2px] bg-gradient-to-b from-[#efc75e] to-transparent"></div>
                </div>
                <div className="absolute -bottom-4 -left-4 w-24 h-24 md:w-32 md:h-32 pointer-events-none">
                  <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-[#efc75e] to-transparent"></div>
                  <div className="absolute bottom-0 left-0 h-full w-[2px] bg-gradient-to-t from-[#efc75e] to-transparent"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
