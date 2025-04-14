import React from "react";
import gear from "../../../public/assets/7674510-uhd_4096_2160_25fps.mp4";

const WhyChooseUs = () => {
  // Features data with icons
  const features = [
    {
      icon: (
        <svg
          className="w-10 h-10 text-[#00FF94]"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
          ></path>
        </svg>
      ),
      title: "Expert-Designed Fitness Gear",
      description:
        "Our products are designed by fitness experts and athletes to provide top-tier performance, durability, and comfort. Every item is crafted to support your unique fitness journey.",
    },
    {
      icon: (
        <svg
          className="w-10 h-10 text-[#00FF94]"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M13 10V3L4 14h7v7l9-11h-7z"
          ></path>
        </svg>
      ),
      title: "Proven Results",
      description:
        "Thousands of happy customers have experienced significant improvements in their workouts with our gear. Whether you're a beginner or a seasoned pro, our products are here to help you level up.",
    },
    {
      icon: (
        <svg
          className="w-10 h-10 text-[#00FF94]"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
          ></path>
        </svg>
      ),
      title: "Satisfaction Guaranteed",
      description:
        "We stand by the quality of our products. If you're not 100% satisfied with your purchase, return it within 30 days for a full refund. No questions asked.",
    },
    {
      icon: (
        <svg
          className="w-10 h-10 text-[#00FF94]"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
          ></path>
        </svg>
      ),
      title: "Lightning-Fast Delivery, Risk-Free",
      description:
        "We ship at warp speed to your doorstep—100% FREE. Changed your mind? Send it back with zero hassle. Your satisfaction is our mission.",
    },
  ];

  // Testimonial data
  const testimonial = {
    quote:
      "Striv Fitness has completely transformed my workout routine. The gear is amazing!",
    name: "Mike D.",
    title: "Fitness Enthusiast",
    initials: "MD",
  };

  return (
    <section className="py-20 md:py-24 relative overflow-hidden">


      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
        {/* Section title */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center mb-3">
            <span className="h-[1px] w-10 bg-gradient-to-r from-transparent to-[#00FF94]"></span>
            <span className="mx-4 text-[#00FF94] text-sm font-bold tracking-widest uppercase accent-font">
              Our Promise
            </span>
            <span className="h-[1px] w-10 bg-gradient-to-l from-transparent to-[#00FF94]"></span>
          </div>

          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-6 heading-font tracking-wide uppercase">
            Transform Your{" "}
            <span className="text-[#00FF94] relative">
              Fitness Journey
              <span className="absolute bottom-0 left-0 w-full h-[3px] bg-gradient-to-r from-[#00FF94]/30 to-[#1DD1A1]/30"></span>
            </span>
          </h2>

          <p className="text-gray-300 max-w-3xl mx-auto text-base md:text-lg body-font">
            At Striv Fitness, we're committed to helping you achieve your
            fitness goals with premium equipment and expert guidance.
          </p>
        </div>

        {/* Main content - two columns on desktop */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">
          {/* Left column - Features */}
          <div className="w-full lg:w-1/2">
            <div className="space-y-8">
              {features.map((feature, index) => (
                <div key={index} className="flex gap-5 items-start">
                  {/* Icon with background */}
                  <div className="flex-shrink-0 relative">
                    <div className="absolute -inset-2 bg-black/50 rounded-full blur-sm group-hover:bg-[#efc75e]/10 transition-colors duration-300"></div>
                    <div className="relative">{feature.icon}</div>
                  </div>

                  {/* Content */}
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2 heading-font tracking-wide">
                      {feature.title}
                    </h3>
                    <p className="text-gray-400 text-base body-font">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right column - Image and testimonial */}
          <div className="w-full lg:w-1/2">
            <div className="relative">
              {/* Main image container */}
              <div className="relative rounded-xl overflow-hidden shadow-[0_0_25px_rgba(0,0,0,0.3)] border border-gray-800 group h-[500px]">
                {/* Background video */}
                <video
                  src={gear}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                  width="800"
                  height="500"
                  preload="auto"
                  disablePictureInPicture
                  disableRemotePlayback
                />

                {/* Overlay gradients */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/30 z-10"></div>

                {/* Decorative elements */}
                <div className="absolute -top-4 -right-4 w-24 h-24 md:w-32 md:h-32">
                  <div className="absolute top-0 right-0 w-full h-[2px] bg-gradient-to-l from-[#00FF94] to-transparent"></div>
                  <div className="absolute top-0 right-0 h-full w-[2px] bg-gradient-to-b from-[#00FF94] to-transparent"></div>
                </div>
                <div className="absolute -bottom-4 -left-4 w-24 h-24 md:w-32 md:h-32">
                  <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-[#1DD1A1] to-transparent"></div>
                  <div className="absolute bottom-0 left-0 h-full w-[2px] bg-gradient-to-t from-[#1DD1A1] to-transparent"></div>
                </div>
              </div>

              {/* Enhanced Testimonial in place of the image */}
              <div className="absolute -bottom-10 -right-10 w-48 h-48 md:w-64 md:h-64 rounded-xl overflow-hidden border-2 border-[#00FF94]/30 shadow-[0_0_15px_rgba(0,255,148,0.3)] z-20 bg-[#0A0F2C]/80 backdrop-blur-sm flex flex-col justify-center p-6">
                <svg
                  className="w-10 h-10 text-[#00FF94] mb-3"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
                <p className="text-white text-sm md:text-base italic mb-4 font-medium">
                  {testimonial.quote}
                </p>
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#00FF94] to-[#1DD1A1] flex items-center justify-center text-[#0A0F2C] font-bold mr-3">
                    {testimonial.initials}
                  </div>
                  <div>
                    <p className="text-white font-bold text-sm">
                      {testimonial.name}
                    </p>
                    <p className="text-[#1DD1A1] text-xs">
                      {testimonial.title}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Call to action */}
        <div className="mt-16 text-center">
          <a
            href="/shop"
            className="inline-flex items-center justify-center bg-gradient-to-r from-[#00FF94] to-[#1DD1A1] text-[#0A0F2C] font-bold px-8 py-3 rounded-md relative overflow-hidden group transition-all duration-300 ease-out transform hover:scale-[1.02] hover:shadow-[0_0_15px_rgba(0,255,148,0.5)] button-font tracking-wider uppercase text-sm md:text-base"
          >
            <span className="relative z-10">Shop Premium Fitness Gear</span>
            <span className="absolute inset-0 bg-gradient-to-r from-[#1DD1A1] to-[#00FF94] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-black group-hover:w-full transition-all duration-300 ease-out"></span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
