import React, { useState } from 'react';
import { Button } from '../components/Button';

interface SignupProps {
  onNavigate: (path: string) => void;
  onSignup: (email: string, password: string, name: string) => void;
}

export const Signup: React.FC<SignupProps> = ({ onNavigate, onSignup }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [nameTouched, setNameTouched] = useState(false);
  const [emailTouched, setEmailTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);

  // Validation functions
  const isNameValid = (name: string) => {
    return name.trim().length >= 2;
  };

  const isEmailValid = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isPasswordValid = (password: string) => {
    return password.length >= 8;
  };

  // Password strength calculator
  const passwordStrength = (pass: string) => {
    if (pass.length === 0) return { strength: 0, label: '', color: '' };
    if (pass.length < 6) return { strength: 33, label: 'Weak', color: 'bg-red-500' };
    if (pass.length < 10) {
      // Check for mix of letters and numbers
      const hasLetters = /[a-zA-Z]/.test(pass);
      const hasNumbers = /[0-9]/.test(pass);
      if (hasLetters && hasNumbers) {
        return { strength: 66, label: 'Good', color: 'bg-yellow-500' };
      }
      return { strength: 50, label: 'Fair', color: 'bg-orange-500' };
    }
    return { strength: 100, label: 'Strong', color: 'bg-green-500' };
  };

  const strength = passwordStrength(password);

  const showNameError = nameTouched && name && !isNameValid(name);
  const showEmailError = emailTouched && email && !isEmailValid(email);
  const showPasswordError = passwordTouched && password && !isPasswordValid(password);
  const isFormValid = isNameValid(name) && isEmailValid(email) && isPasswordValid(password) && agreedToTerms;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Mark all fields as touched
    setNameTouched(true);
    setEmailTouched(true);
    setPasswordTouched(true);

    if (!agreedToTerms) {
      setError('Please agree to the Terms and Privacy Policy');
      return;
    }

    if (!isFormValid) {
      setError('Please fill in all fields correctly');
      return;
    }

    setIsLoading(true);

    try {
      await onSignup(email, password, name);
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-mesh relative overflow-hidden">
      {/* Animated Background Orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent-cyan/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent-purple/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-accent-orange/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>

      {/* Minimal Header */}
      <header className="absolute top-0 left-0 right-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-6">
          <div className="flex justify-between items-center">
            <button
              onClick={() => onNavigate('/')}
              className="text-xl font-display text-white hover:opacity-90 transition-opacity"
            >
              KeepMeaning
            </button>
            
            <button
              onClick={() => onNavigate('/')}
              className="text-sm font-medium text-white/70 hover:text-white transition-colors flex items-center space-x-2"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span>Back to home</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content - Centered Signup */}
      <div className="min-h-screen flex items-center justify-center px-6 py-20 relative z-10">
        <div className="w-full max-w-md">
          {/* Floating Signup Card with Glass Effect */}
          <div className="relative">
            {/* Glow Effect Behind Card */}
            <div className="absolute -inset-1 bg-gradient-to-r from-accent-cyan via-accent-purple to-accent-cyan opacity-20 blur-xl rounded-3xl"></div>
            
            {/* Main Card */}
            <div className="relative bg-white/95 backdrop-blur-xl rounded-3xl shadow-navy border border-white/20 p-10">
              {/* Welcome Message */}
              <div className="text-center mb-8">
                <h1 className="text-3xl font-display text-navy mb-2">
                  Create your account
                </h1>
                <p className="text-gray-600">
                  Start editing with intent preservation
                </p>
              </div>

              {/* Signup Form */}
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Global Error Message */}
                {error && (
                  <div className="bg-red-50 border-2 border-red-100 rounded-xl p-4 animate-shake">
                    <div className="flex items-start space-x-3">
                      <svg className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                      <div>
                        <p className="text-sm font-semibold text-red-900">Signup failed</p>
                        <p className="text-sm text-red-700 mt-0.5">{error}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Name Field */}
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-gray-900 mb-2">
                    Full name
                  </label>
                  <div className="relative">
                    <input
                      id="name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      onBlur={() => setNameTouched(true)}
                      required
                      placeholder="Jane Doe"
                      className={`w-full px-4 py-3 pr-12 border-2 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none transition-all ${
                        showNameError
                          ? 'border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-100'
                          : name && isNameValid(name)
                          ? 'border-green-300 focus:border-green-500 focus:ring-4 focus:ring-green-100'
                          : 'border-gray-200 focus:border-navy focus:ring-4 focus:ring-navy/10'
                      }`}
                    />
                    {/* Validation Icon */}
                    {name && (
                      <div className="absolute right-4 top-1/2 -translate-y-1/2">
                        {isNameValid(name) ? (
                          <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        ) : nameTouched ? (
                          <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                          </svg>
                        ) : null}
                      </div>
                    )}
                  </div>
                  {showNameError && (
                    <p className="text-xs text-red-600 mt-1.5 flex items-center space-x-1">
                      <span>•</span>
                      <span>Name must be at least 2 characters</span>
                    </p>
                  )}
                </div>

                {/* Email Field */}
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-900 mb-2">
                    Email address
                  </label>
                  <div className="relative">
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onBlur={() => setEmailTouched(true)}
                      required
                      placeholder="you@example.com"
                      className={`w-full px-4 py-3 pr-12 border-2 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none transition-all ${
                        showEmailError
                          ? 'border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-100'
                          : email && isEmailValid(email)
                          ? 'border-green-300 focus:border-green-500 focus:ring-4 focus:ring-green-100'
                          : 'border-gray-200 focus:border-navy focus:ring-4 focus:ring-navy/10'
                      }`}
                    />
                    {/* Validation Icon */}
                    {email && (
                      <div className="absolute right-4 top-1/2 -translate-y-1/2">
                        {isEmailValid(email) ? (
                          <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        ) : emailTouched ? (
                          <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                          </svg>
                        ) : null}
                      </div>
                    )}
                  </div>
                  {showEmailError && (
                    <p className="text-xs text-red-600 mt-1.5 flex items-center space-x-1">
                      <span>•</span>
                      <span>Please enter a valid email address</span>
                    </p>
                  )}
                </div>

                {/* Password Field */}
                <div>
                  <label htmlFor="password" className="block text-sm font-semibold text-gray-900 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      onBlur={() => setPasswordTouched(true)}
                      required
                      placeholder="Create a strong password"
                      className={`w-full px-4 py-3 pr-12 border-2 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none transition-all ${
                        showPasswordError
                          ? 'border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-100'
                          : password && isPasswordValid(password)
                          ? 'border-green-300 focus:border-green-500 focus:ring-4 focus:ring-green-100'
                          : 'border-gray-200 focus:border-navy focus:ring-4 focus:ring-navy/10'
                      }`}
                    />
                    {/* Validation Icon */}
                    {password && (
                      <div className="absolute right-4 top-1/2 -translate-y-1/2">
                        {isPasswordValid(password) ? (
                          <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        ) : passwordTouched ? (
                          <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                          </svg>
                        ) : null}
                      </div>
                    )}
                  </div>
                  
                  {/* Password Strength Indicator */}
                  {password.length > 0 && (
                    <div className="mt-2">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-gray-600">Password strength</span>
                        <span className={`text-xs font-semibold ${
                          strength.strength === 100 ? 'text-green-600' : 
                          strength.strength >= 66 ? 'text-yellow-600' : 
                          strength.strength >= 50 ? 'text-orange-600' : 'text-red-600'
                        }`}>
                          {strength.label}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full transition-all duration-300 ${strength.color}`}
                          style={{ width: `${strength.strength}%` }}
                        ></div>
                      </div>
                    </div>
                  )}

                  {showPasswordError && (
                    <p className="text-xs text-red-600 mt-1.5 flex items-center space-x-1">
                      <span>•</span>
                      <span>Password must be at least 8 characters</span>
                    </p>
                  )}
                </div>

                {/* Terms Agreement */}
                <div className="flex items-start pt-1">
                  <input
                    id="terms"
                    type="checkbox"
                    checked={agreedToTerms}
                    onChange={(e) => setAgreedToTerms(e.target.checked)}
                    className="w-4 h-4 mt-1 text-navy border-gray-300 rounded focus:ring-navy focus:ring-2 transition-all cursor-pointer"
                  />
                  <label htmlFor="terms" className="ml-2.5 text-sm text-gray-700 cursor-pointer select-none">
                    I agree to the{' '}
                    <button
                      type="button"
                      onClick={() => onNavigate('/terms')}
                      className="text-navy hover:text-navy-dark font-medium underline"
                    >
                      Terms of Service
                    </button>
                    {' '}and{' '}
                    <button
                      type="button"
                      onClick={() => onNavigate('/privacy')}
                      className="text-navy hover:text-navy-dark font-medium underline"
                    >
                      Privacy Policy
                    </button>
                  </label>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading || !isFormValid}
                  className={`w-full py-3.5 rounded-xl font-semibold text-base transition-all shadow-medium ${
                    isLoading || !isFormValid
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-navy text-white hover:bg-navy-dark hover:shadow-navy hover:-translate-y-0.5 active:translate-y-0'
                  }`}
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center space-x-2">
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                      <span>Creating account...</span>
                    </span>
                  ) : (
                    'Create account'
                  )}
                </button>
              </form>

              {/* Benefits Callout */}
              <div className="mt-6 bg-gradient-to-r from-accent-cyan/10 to-accent-purple/10 border-2 border-navy/10 rounded-xl p-4">
                <p className="text-sm font-semibold text-navy mb-2 flex items-center">
                  <svg className="w-4 h-4 mr-1.5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  What you get with a free account:
                </p>
                <ul className="space-y-1.5 text-sm text-gray-700">
                  <li className="flex items-center">
                    <svg className="w-4 h-4 text-navy mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    2 free intent-safe edits
                  </li>
                  <li className="flex items-center">
                    <svg className="w-4 h-4 text-navy mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Meaning preservation guarantee
                  </li>
                  <li className="flex items-center">
                    <svg className="w-4 h-4 text-navy mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Upgrade to unlimited anytime
                  </li>
                </ul>
              </div>

              {/* Divider */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center">
                  <span className="px-4 bg-white text-sm text-gray-500">Already have an account?</span>
                </div>
              </div>

              {/* Login Link */}
              <button
                onClick={() => onNavigate('/login')}
                className="w-full py-3.5 border-2 border-navy text-navy rounded-xl font-semibold text-base hover:bg-navy hover:text-white transition-all"
              >
                Sign in instead
              </button>
            </div>
          </div>

          {/* Try Without Account */}
          <div className="mt-6 text-center">
            <button
              onClick={() => onNavigate('/editor')}
              className="text-sm text-white/80 hover:text-white transition-colors flex items-center justify-center space-x-2 mx-auto group"
            >
              <span>Try without an account</span>
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
