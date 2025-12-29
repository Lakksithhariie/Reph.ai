import React, { useState } from 'react';
import { Button } from '../components/Button';

interface LoginProps {
  onNavigate: (path: string) => void;
  onLogin: (email: string, password: string) => void;
}

export const Login: React.FC<LoginProps> = ({ onNavigate, onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [emailTouched, setEmailTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);

  // Email validation
  const isEmailValid = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Password validation (min 8 characters)
  const isPasswordValid = (password: string) => {
    return password.length >= 8;
  };

  const showEmailError = emailTouched && email && !isEmailValid(email);
  const showPasswordError = passwordTouched && password && !isPasswordValid(password);
  const isFormValid = isEmailValid(email) && isPasswordValid(password);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!isFormValid) {
      setEmailTouched(true);
      setPasswordTouched(true);
      return;
    }

    setIsLoading(true);

    try {
      await onLogin(email, password);
    } catch (err) {
      setError('Invalid email or password. Please try again.');
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

      {/* Main Content - Centered Login */}
      <div className="min-h-screen flex items-center justify-center px-6 py-20 relative z-10">
        <div className="w-full max-w-md">
          {/* Floating Login Card with Glass Effect */}
          <div className="relative">
            {/* Glow Effect Behind Card */}
            <div className="absolute -inset-1 bg-gradient-to-r from-accent-cyan via-accent-purple to-accent-cyan opacity-20 blur-xl rounded-3xl"></div>
            
            {/* Main Card */}
            <div className="relative bg-white/95 backdrop-blur-xl rounded-3xl shadow-navy border border-white/20 p-10">
              {/* Welcome Message - No Icon */}
              <div className="text-center mb-8">
                <h1 className="text-3xl font-display text-navy mb-2">
                  Welcome back
                </h1>
                <p className="text-gray-600">
                  Continue editing with intent preservation
                </p>
              </div>

              {/* Login Form */}
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Global Error Message */}
                {error && (
                  <div className="bg-red-50 border-2 border-red-100 rounded-xl p-4 animate-shake">
                    <div className="flex items-start space-x-3">
                      <svg className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                      <div>
                        <p className="text-sm font-semibold text-red-900">Login failed</p>
                        <p className="text-sm text-red-700 mt-0.5">{error}</p>
                      </div>
                    </div>
                  </div>
                )}

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
                  <div className="flex items-center justify-between mb-2">
                    <label htmlFor="password" className="block text-sm font-semibold text-gray-900">
                      Password
                    </label>
                    <button
                      type="button"
                      onClick={() => onNavigate('/forgot-password')}
                      className="text-xs text-navy hover:text-navy-dark font-medium transition-colors"
                    >
                      Forgot password?
                    </button>
                  </div>
                  <div className="relative">
                    <input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      onBlur={() => setPasswordTouched(true)}
                      required
                      placeholder="Enter your password"
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
                  {showPasswordError && (
                    <p className="text-xs text-red-600 mt-1.5 flex items-center space-x-1">
                      <span>•</span>
                      <span>Password must be at least 8 characters</span>
                    </p>
                  )}
                </div>

                {/* Remember Me */}
                <div className="flex items-center pt-1">
                  <input
                    id="remember"
                    type="checkbox"
                    className="w-4 h-4 text-navy border-gray-300 rounded focus:ring-navy focus:ring-2 transition-all cursor-pointer"
                  />
                  <label htmlFor="remember" className="ml-2.5 text-sm text-gray-700 cursor-pointer select-none">
                    Remember me for 30 days
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
                      <span>Signing in...</span>
                    </span>
                  ) : (
                    'Sign in'
                  )}
                </button>
              </form>

              {/* Divider */}
              <div className="relative my-8">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center">
                  <span className="px-4 bg-white text-sm text-gray-500">New to KeepMeaning?</span>
                </div>
              </div>

              {/* Sign Up Link */}
              <button
                onClick={() => onNavigate('/signup')}
                className="w-full py-3.5 border-2 border-navy text-navy rounded-xl font-semibold text-base hover:bg-navy hover:text-white transition-all"
              >
                Create free account
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
