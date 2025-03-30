import React, { useRef, useEffect, useMemo } from "react";
import whyPhoto from "/assets/pexels-victorfreitas-791763.jpg";
import gear from "../../public/assets/7674510-uhd_4096_2160_25fps.mp4";

const WhyChooseUs = () => {
  // Refs for animation elements
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const pointsRef = useRef([]);
  const testimonialRef = useRef(null);

  // Animation frame ID for cleanup
  const animationRef = useRef(null);

  useEffect(() => {
    // Use Intersection Observer to trigger animations when section is visible
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          animateElements();
          observer.unobserve(sectionRef.current);
        }
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.1,
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    // Animation function using requestAnimationFrame
    const animateElements = () => {
      const startTime = performance.now();
      const duration = 600;

      const animate = (currentTime) => {
        const elapsedTime = currentTime - startTime;
        const progress = Math.min(elapsedTime / duration, 1);

        // Easing function (ease-out)
        const easeOutProgress = 1 - Math.pow(1 - progress, 3);

        // Animate heading
        if (headingRef.current) {
          headingRef.current.style.opacity = easeOutProgress;
          headingRef.current.style.transform = `translateY(${
            20 * (1 - easeOutProgress)
          }px)`;
        }

        // Animate points with staggered delay
        pointsRef.current.forEach((point, index) => {
          if (point) {
            const delayedProgress =
              elapsedTime > index * 120
                ? (elapsedTime - index * 120) / duration
                : 0;
            const easedProgress =
              1 - Math.pow(1 - Math.min(delayedProgress, 1), 3);

            point.style.opacity = easedProgress;
            point.style.transform = `translateX(${20 * (1 - easedProgress)}px)`;
          }
        });

        // Animate testimonial
        if (testimonialRef.current && elapsedTime > 600) {
          const delayedProgress = (elapsedTime - 600) / duration;
          const easedProgress =
            1 - Math.pow(1 - Math.min(delayedProgress, 1), 3);

          testimonialRef.current.style.opacity = easedProgress;
          testimonialRef.current.style.transform = `translateY(${
            20 * (1 - easedProgress)
          }px)`;
        }

        // Continue animation if not complete
        if (elapsedTime < duration + 600) {
          animationRef.current = requestAnimationFrame(animate);
        }
      };

      // Start the animation
      animationRef.current = requestAnimationFrame(animate);
    };

    // Cleanup
    return () => {
      observer.disconnect();
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  // Features data with icons - memoized to prevent recreating on each render
  const features = useMemo(
    () => [
      {
        icon: (
          <svg
            className="w-10 h-10 text-[#efc75e]"
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
            className="w-10 h-10 text-[#efc75e]"
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
            className="w-10 h-10 text-[#efc75e]"
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
            className="w-10 h-10 text-[#efc75e]"
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
    ],
    []
  );

  return (
    <section
      ref={sectionRef}
      className="py-20 md:py-24 relative overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Animated gradient background */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-br from-[#efc75e]/10 via-transparent to-[#efc75e]/5 transform-gpu"></div>
        </div>

        {/* Corner accents */}
        <div className="absolute top-0 right-0 w-96 h-96 opacity-20">
          <div className="absolute top-0 right-0 w-full h-[2px] bg-gradient-to-l from-[#efc75e] to-transparent"></div>
          <div className="absolute top-0 right-0 h-full w-[2px] bg-gradient-to-b from-[#efc75e] to-transparent"></div>
        </div>
        <div className="absolute bottom-0 left-0 w-96 h-96 opacity-20">
          <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-[#efc75e] to-transparent"></div>
          <div className="absolute bottom-0 left-0 h-full w-[2px] bg-gradient-to-t from-[#efc75e] to-transparent"></div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
        {/* Section title */}
        <div
          ref={headingRef}
          className="text-center mb-16"
          style={{ opacity: 0, transform: "translateY(20px)" }}
        >
          <div className="inline-flex items-center justify-center mb-3">
            <span className="h-[1px] w-10 bg-gradient-to-r from-transparent to-[#efc75e]"></span>
            <span className="mx-4 text-[#efc75e] text-sm font-bold tracking-widest uppercase font-['Rajdhani']">
              Why Choose Us
            </span>
            <span className="h-[1px] w-10 bg-gradient-to-l from-transparent to-[#efc75e]"></span>
          </div>

          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-6 font-['Rajdhani'] tracking-wide uppercase">
            Transform Your{" "}
            <span className="text-[#efc75e] relative">
              Fitness Journey
              <span className="absolute bottom-0 left-0 w-full h-[3px] bg-[#efc75e]/30"></span>
            </span>
          </h2>

          <p className="text-gray-300 max-w-3xl mx-auto text-base md:text-lg">
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
                <div
                  key={index}
                  ref={(el) => (pointsRef.current[index] = el)}
                  className="flex gap-5 items-start"
                  style={{ opacity: 0, transform: "translateX(20px)" }}
                >
                  {/* Icon with animated background */}
                  <div className="flex-shrink-0 relative">
                    <div className="absolute -inset-2 bg-black/50 rounded-full blur-sm group-hover:bg-[#efc75e]/10 transition-colors duration-300"></div>
                    <div className="relative transform-gpu">{feature.icon}</div>
                  </div>

                  {/* Content */}
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2 font-['Rajdhani'] tracking-wide">
                      {feature.title}
                    </h3>
                    <p className="text-gray-400 text-base">
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
                {/* Background image */}
                <video
                  src={gear}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover object-center transform-gpu transition-transform duration-700 ease-out group-hover:scale-105"
                  width="800"
                  height="500"
                />

                {/* Overlay gradients */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/30 z-10"></div>

                {/* Decorative elements */}
                <div className="absolute -top-4 -right-4 w-24 h-24 md:w-32 md:h-32">
                  <div className="absolute top-0 right-0 w-full h-[2px] bg-gradient-to-l from-[#efc75e] to-transparent"></div>
                  <div className="absolute top-0 right-0 h-full w-[2px] bg-gradient-to-b from-[#efc75e] to-transparent"></div>
                </div>
                <div className="absolute -bottom-4 -left-4 w-24 h-24 md:w-32 md:h-32">
                  <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-[#efc75e] to-transparent"></div>
                  <div className="absolute bottom-0 left-0 h-full w-[2px] bg-gradient-to-t from-[#efc75e] to-transparent"></div>
                </div>
              </div>

              {/* Overlapping second image */}
              <div className="absolute -bottom-10 -right-10 w-48 h-48 md:w-64 md:h-64 rounded-xl overflow-hidden border-2 border-[#efc75e]/30 shadow-[0_0_15px_rgba(0,0,0,0.4)] z-20 transform-gpu">
                <div className="absolute inset-0 bg-gradient-to-br from-black/20 to-black/50 z-10"></div>
                <img
                  src={whyPhoto}
                  className="absolute inset-0 w-full h-full object-cover object-center"
                  loading="lazy"
                  decoding="async"
                  width="400"
                  height="400"
                />
              </div>

              {/* Testimonial overlay - smaller and positioned */}
              <div
                ref={testimonialRef}
                className="absolute bottom-8 left-8 z-30 max-w-[220px] md:max-w-[260px]"
                style={{ opacity: 0, transform: "translateY(20px)" }}
              >
                <div className="bg-black/80 backdrop-blur-sm rounded-xl p-4 border border-[#efc75e]/30 will-change-transform">
                  <svg
                    className="w-6 h-6 text-[#efc75e] mb-2"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                  <p className="text-white text-sm italic mb-2">
                    "Striv Fitness has completely transformed my workout
                    routine. The gear is amazing!"
                  </p>
                  <div className="flex items-center">
                    <div className="w-7 h-7 rounded-full bg-[#efc75e] flex items-center justify-center text-black font-bold mr-2">
                      MD
                    </div>
                    <div>
                      <p className="text-white font-bold text-xs">Mike D.</p>
                      <p className="text-[#efc75e] text-xs">
                        Fitness Enthusiast
                      </p>
                    </div>
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
            className="inline-flex items-center justify-center bg-[#efc75e] text-black font-bold px-8 py-3 rounded-md relative overflow-hidden group transition-all duration-300 ease-out transform hover:scale-[1.02] hover:shadow-[0_0_15px_rgba(239,199,94,0.5)] font-['Rajdhani'] tracking-wider uppercase text-sm md:text-base"
          >
            <span className="relative z-10">Shop Premium Fitness Gear</span>
            <span className="absolute inset-0 bg-gradient-to-r from-[#f5d57b] to-[#efc75e] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-black group-hover:w-full transition-all duration-300 ease-out"></span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default React.memo(WhyChooseUs);
