import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaEye, FaEyeSlash, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

const SignupPage = () => {
  // Form state
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  });

  // UI state
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState({});

  // Password validation
  const [passwordStrength, setPasswordStrength] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    special: false
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    
    setFormData(prev => ({
      ...prev,
      [name]: newValue
    }));

    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }

    // Check password strength
    if (name === 'password') {
      setPasswordStrength({
        length: value.length >= 8,
        uppercase: /[A-Z]/.test(value),
        lowercase: /[a-z]/.test(value),
        number: /[0-9]/.test(value),
        special: /[!@#$%^&*(),.?":{}|<>]/.test(value)
      });
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};
    
    // Required fields
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.username.trim()) newErrors.username = 'Username is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    if (!formData.confirmPassword) newErrors.confirmPassword = 'Please confirm your password';
    if (!formData.agreeToTerms) newErrors.agreeToTerms = 'You must agree to the terms and conditions';
    
    // Email format
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    // Username format (letters, numbers, underscores only)
    if (formData.username && !/^[a-zA-Z0-9_]+$/.test(formData.username)) {
      newErrors.username = 'Username can only contain letters, numbers, and underscores';
    }
    
    // Password strength
    if (formData.password && !passwordStrength.length) {
      newErrors.password = 'Password must be at least 8 characters long';
    }
    
    // Password match
    if (formData.password && formData.confirmPassword && formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    try {
      // Make a real API call to the backend
      const response = await fetch('http://localhost:3001/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          username: formData.username,
          email: formData.email,
          password: formData.password,
          confirmPassword: formData.confirmPassword
        }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }
      
      // Show success state
      setSuccess(true);
      
      // Reset form after success
      setTimeout(() => {
        setFormData({
          firstName: '',
          lastName: '',
          username: '',
          email: '',
          password: '',
          confirmPassword: '',
          agreeToTerms: false
        });
        setSuccess(false);
      }, 3000);
      
    } catch (error) {
      console.error('Signup error:', error);
      setErrors({ form: error.message || 'An error occurred. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  // Password strength indicator
  const getPasswordStrengthPercentage = () => {
    const { length, uppercase, lowercase, number, special } = passwordStrength;
    const criteria = [length, uppercase, lowercase, number, special];
    const metCriteria = criteria.filter(Boolean).length;
    return (metCriteria / criteria.length) * 100;
  };

  return (
    <main className="section-container bg-[#050B20] pb-0 relative pt-24 md:pt-16 lg:pt-12">
      {/* Cool gradient background */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        {/* Main gradient overlay */}
        <div className="absolute inset-0 bg-gradient-radial from-[#0A0F2C] via-[#050B20] to-[#0A0F2C] opacity-80"></div>
        
        {/* Glowing center */}
        <div className="absolute top-[30%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[80vh] h-[80vh] rounded-full bg-gradient-radial from-[#00FF94]/20 via-[#1DD1A1]/10 to-transparent blur-3xl"></div>
        
        {/* Diagonal gradient stripes */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#00FF94]/10 via-transparent to-[#1DD1A1]/5 transform rotate-12"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-tr from-[#1DD1A1]/5 via-transparent to-[#00FF94]/10 transform -rotate-12"></div>
        
        {/* Bottom glow */}
        <div className="absolute bottom-0 left-0 w-full h-[30vh] bg-gradient-to-t from-[#00FF94]/10 to-transparent blur-xl"></div>
        
        {/* Top accent */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#00FF94]/40 to-transparent"></div>
      </div>
      
      <div className="flex flex-col lg:flex-row w-full max-w-[1200px] mx-auto px-4 py-8 md:py-12 lg:py-16 xl:py-20 pb-8 relative z-1 mt-12 md:mt-4 lg:mt-0">
        {/* Left Content Section - Hidden on mobile, visible on lg screens and up */}
        <div className="hidden lg:flex w-full lg:w-1/2 p-4 lg:p-8 xl:p-16 flex-col justify-center">
          <div className="relative z-10">
            <h1 className="text-3xl md:text-4xl xl:text-5xl font-bold mb-4 md:mb-6 text-white">
              Join the <span className="text-[#00FF94]">STRIV</span> Community
            </h1>
            
            <p className="text-base md:text-lg text-gray-300 mb-6 md:mb-8">
              Take the first step towards your fitness goals. Sign up today and get access to:
            </p>
            
            <div className="space-y-6">
              {/* Benefits with icons */}
              <div className="flex items-start space-x-3 md:space-x-4">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#1DD1A1]/20 flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-[#00FF94]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-semibold text-white">Personalized Workouts</h3>
                  <p className="text-gray-400">Customized training plans tailored to your specific fitness goals</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3 md:space-x-4">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#1DD1A1]/20 flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-[#00FF94]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-semibold text-white">Premium Content</h3>
                  <p className="text-gray-400">Exclusive articles, videos, and nutrition guides from fitness experts</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3 md:space-x-4">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#1DD1A1]/20 flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-[#00FF94]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-semibold text-white">Exclusive Discounts</h3>
                  <p className="text-gray-400">Special pricing on supplements, apparel, and equipment</p>
                </div>
              </div>
            </div>
            
            <div className="mt-8 md:mt-12 p-6 md:p-8 bg-black/30 backdrop-blur-sm rounded-lg border border-[#1DD1A1]/20 text-center">
              <h3 className="text-xl font-bold text-white mb-3">Already have an account?</h3>
              <p className="text-gray-300 mb-4">Sign in to access your personalized fitness dashboard</p>
              <Link to="/login" className="inline-block px-8 py-3 bg-gradient-to-r from-[#050B20] to-[#0A0F2C] border border-[#1DD1A1]/40 rounded-lg text-[#00FF94] hover:text-white font-medium transition-all duration-300 hover:shadow-[0_0_15px_rgba(0,255,148,0.4)] hover:border-[#1DD1A1]/70">
                Log in to your account →
              </Link>
            </div>
          </div>
        </div>
        
        {/* Right Form Section - Full width on mobile, half width on lg screens */}
        <div className="w-full lg:w-1/2 p-4 md:p-8 xl:p-16 flex items-center justify-center mx-auto">
          <div className="w-full max-w-md bg-black/30 backdrop-blur-sm p-4 md:p-8 rounded-lg border border-[#1DD1A1]/20 relative z-10">
            {success ? (
              <div className="text-center py-12">
                <div className="w-20 h-20 rounded-full bg-[#00FF94]/20 flex items-center justify-center mx-auto mb-6">
                  <FaCheckCircle className="text-[#00FF94] text-4xl" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-4">Registration Successful!</h2>
                <p className="text-gray-300 mb-6">Your account has been created. You can now log in.</p>
                <Link 
                  to="/login" 
                  className="inline-block w-full py-3 px-6 bg-gradient-to-r from-[#00FF94] to-[#1DD1A1] text-black font-bold rounded-lg transition-transform hover:scale-105"
                >
                  Go to Login
                </Link>
              </div>
            ) : (
              <>
                <h2 className="text-2xl font-bold text-white mb-6">Create Your Account</h2>
                
                {errors.form && (
                  <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-lg">
                    <p className="text-red-400">{errors.form}</p>
                  </div>
                )}
                
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Name fields - side by side */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="firstName" className="block text-gray-300 mb-2">First Name</label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        className={`w-full bg-black/50 border ${errors.firstName ? 'border-red-500' : 'border-[#1DD1A1]/30'} rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#00FF94] transition-colors`}
                        placeholder="John"
                      />
                      {errors.firstName && <p className="mt-1 text-red-400 text-sm">{errors.firstName}</p>}
                    </div>
                    
                    <div>
                      <label htmlFor="lastName" className="block text-gray-300 mb-2">Last Name</label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        className={`w-full bg-black/50 border ${errors.lastName ? 'border-red-500' : 'border-[#1DD1A1]/30'} rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#00FF94] transition-colors`}
                        placeholder="Doe"
                      />
                      {errors.lastName && <p className="mt-1 text-red-400 text-sm">{errors.lastName}</p>}
                    </div>
                  </div>
                  
                  {/* Username */}
                  <div>
                    <label htmlFor="username" className="block text-gray-300 mb-2">Username</label>
                    <input
                      type="text"
                      id="username"
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                      className={`w-full bg-black/50 border ${errors.username ? 'border-red-500' : 'border-[#1DD1A1]/30'} rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#00FF94] transition-colors`}
                      placeholder="johndoe123"
                    />
                    {errors.username && <p className="mt-1 text-red-400 text-sm">{errors.username}</p>}
                  </div>
                  
                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block text-gray-300 mb-2">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full bg-black/50 border ${errors.email ? 'border-red-500' : 'border-[#1DD1A1]/30'} rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#00FF94] transition-colors`}
                      placeholder="john.doe@example.com"
                    />
                    {errors.email && <p className="mt-1 text-red-400 text-sm">{errors.email}</p>}
                  </div>
                  
                  {/* Password */}
                  <div>
                    <label htmlFor="password" className="block text-gray-300 mb-2">Password</label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className={`w-full bg-black/50 border ${errors.password ? 'border-red-500' : 'border-[#1DD1A1]/30'} rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#00FF94] transition-colors`}
                        placeholder="••••••••"
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </button>
                    </div>
                    {errors.password && <p className="mt-1 text-red-400 text-sm">{errors.password}</p>}
                    
                    {/* Password strength meter */}
                    {formData.password && (
                      <div className="mt-3">
                        <div className="h-1.5 w-full bg-gray-700 rounded-full overflow-hidden">
                          <div 
                            className="h-full rounded-full transition-all duration-300"
                            style={{ 
                              width: `${getPasswordStrengthPercentage()}%`,
                              backgroundColor: getPasswordStrengthPercentage() < 40 ? '#FF4757' : 
                                             getPasswordStrengthPercentage() < 80 ? '#FFC107' : 
                                             '#00FF94'
                            }}
                          ></div>
                        </div>
                        
                        <div className="grid grid-cols-1 xs:grid-cols-2 gap-2 mt-3">
                          <div className="flex items-center space-x-2">
                            {passwordStrength.length ? 
                              <FaCheckCircle className="text-[#00FF94]" /> : 
                              <FaTimesCircle className="text-red-400" />
                            }
                            <span className="text-xs text-gray-400">8+ characters</span>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            {passwordStrength.uppercase ? 
                              <FaCheckCircle className="text-[#00FF94]" /> : 
                              <FaTimesCircle className="text-red-400" />
                            }
                            <span className="text-xs text-gray-400">Uppercase</span>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            {passwordStrength.lowercase ? 
                              <FaCheckCircle className="text-[#00FF94]" /> : 
                              <FaTimesCircle className="text-red-400" />
                            }
                            <span className="text-xs text-gray-400">Lowercase</span>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            {passwordStrength.number ? 
                              <FaCheckCircle className="text-[#00FF94]" /> : 
                              <FaTimesCircle className="text-red-400" />
                            }
                            <span className="text-xs text-gray-400">Number</span>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            {passwordStrength.special ? 
                              <FaCheckCircle className="text-[#00FF94]" /> : 
                              <FaTimesCircle className="text-red-400" />
                            }
                            <span className="text-xs text-gray-400">Special character</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* Confirm Password */}
                  <div>
                    <label htmlFor="confirmPassword" className="block text-gray-300 mb-2">Confirm Password</label>
                    <div className="relative">
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        id="confirmPassword"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className={`w-full bg-black/50 border ${errors.confirmPassword ? 'border-red-500' : 'border-[#1DD1A1]/30'} rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#00FF94] transition-colors`}
                        placeholder="••••••••"
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                      </button>
                    </div>
                    {errors.confirmPassword && <p className="mt-1 text-red-400 text-sm">{errors.confirmPassword}</p>}
                  </div>
                  
                  {/* Terms and Conditions */}
                  <div>
                    <div className="flex items-start space-x-3">
                      <input
                        type="checkbox"
                        id="agreeToTerms"
                        name="agreeToTerms"
                        checked={formData.agreeToTerms}
                        onChange={handleChange}
                        className="mt-1 h-4 w-4 rounded border-gray-600 text-[#00FF94] focus:ring-[#00FF94]"
                      />
                      <label htmlFor="agreeToTerms" className="text-sm text-gray-300">
                        I agree to the <Link to="/terms" className="text-[#00FF94] hover:text-[#1DD1A1]">Terms of Service</Link> and <Link to="/privacy" className="text-[#00FF94] hover:text-[#1DD1A1]">Privacy Policy</Link>
                      </label>
                    </div>
                    {errors.agreeToTerms && <p className="mt-1 text-red-400 text-sm">{errors.agreeToTerms}</p>}
                  </div>
                  
                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3 px-6 bg-gradient-to-r from-[#00FF94] to-[#1DD1A1] text-black font-bold rounded-lg transition-all hover:scale-105 disabled:opacity-70 disabled:hover:scale-100 flex items-center justify-center"
                  >
                    {isLoading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Creating Account...
                      </>
                    ) : (
                      'Create Account'
                    )}
                  </button>
                </form>
                
                {/* Already have an account - Mobile Only */}
                <div className="mt-8 text-center lg:hidden">
                  <h3 className="text-xl font-bold text-white mb-3">Already have an account?</h3>
                  <Link to="/login" className="inline-block px-6 py-2 bg-gradient-to-r from-[#050B20] to-[#0A0F2C] border border-[#1DD1A1]/40 rounded-lg text-[#00FF94] hover:text-white font-medium transition-all duration-300 hover:shadow-[0_0_15px_rgba(0,255,148,0.4)] hover:border-[#1DD1A1]/70">
                    Log in to your account →
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default SignupPage;
