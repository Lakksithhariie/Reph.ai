import React, { useState, useEffect } from 'react';

interface LandingProps {
  onNavigate: (path: string) => void;
}

// Typing Animation Component
const TypingText: React.FC<{ text: string; className?: string; speed?: number }> = ({ 
  text, 
  className = '',
  speed = 100 
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, speed);

      return () => clearTimeout(timeout);
    } else {
      setIsComplete(true);
    }
  }, [currentIndex, text, speed]);

  return (
    <span className={className}>
      {displayedText}
      {!isComplete && <span className="animate-pulse">|</span>}
    </span>
  );
};

// Demo scenarios with unique timing
const demoScenarios = [
  {
    id: 'email',
    label: 'Professional Email',
    original: "Can you send the quarterly numbers by Friday? I need them to finish the presentation.",
    risk: "⚠️ Risk: may sound demanding",
    fixed: "Could you please share the quarterly numbers by Friday? I need them to complete the presentation.",
    timing: "1.8s",
    highlights: [
      { original: "Can you send", fixed: "Could you please share" },
      { original: "finish", fixed: "complete" }
    ]
  },
  {
    id: 'academic',
    label: 'Academic Writing',
    original: "This study proves that the proposed method is the most effective approach.",
    risk: "⚠️ Risk: claim may be overstated",
    fixed: "This study suggests that the proposed method is an effective approach.",
    timing: "2.4s",
    highlights: [
      { original: "proves", fixed: "suggests" },
      { original: "the most effective", fixed: "an effective" }
    ]
  },
  {
    id: 'team',
    label: 'Team Update',
    original: "We will implement the changes if the issue continues.",
    risk: "⚠️ Risk: unclear condition",
    fixed: "We will implement the changes if the issue persists.",
    timing: "2.1s",
    highlights: [
      { original: "continues", fixed: "persists" }
    ]
  }
];

export const Landing: React.FC<LandingProps> = ({ onNavigate }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeDemo, setActiveDemo] = useState(0);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const currentDemo = demoScenarios[activeDemo];

  // Smooth scroll to section
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header - Minimal Floating Navigation */}
      <header className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-6xl px-6">
        <nav className="backdrop-blur-xl bg-navy/80 rounded-2xl border border-white/10 shadow-navy">
          <div className="flex items-center justify-between h-14 px-6">
            {/* Logo - Left */}
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="hover:opacity-90 transition-opacity"
            >
              <TypingText 
                text="KeepMeaning" 
                className="text-lg font-display text-white"
                speed={150}
              />
            </button>
            
            {/* Navigation - Right */}
            <div className="flex items-center gap-8">
              {/* Text Links */}
              <div className="hidden md:flex items-center gap-6">
                <button
                  onClick={() => scrollToSection('demo')}
                  className="text-sm font-medium text-white/70 hover:text-white transition-colors"
                >
                  Demo
                </button>
                <button
                  onClick={() => scrollToSection('pricing')}
                  className="text-sm font-medium text-white/70 hover:text-white transition-colors"
                >
                  Pricing
                </button>
                <button
                  onClick={() => onNavigate('/login')}
                  className="text-sm font-medium text-white/70 hover:text-white transition-colors"
                >
                  Login
                </button>
              </div>

              {/* Primary CTA Button - Smaller */}
              <button
                onClick={() => onNavigate('/editor')}
                className="px-4 py-2 bg-white text-navy text-sm font-semibold rounded-xl hover:bg-white/90 transition-all hover:-translate-y-0.5 shadow-soft"
              >
                Start editing free
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Hero Section - Navy Background (70%) */}
      <section className="relative pt-32 pb-20 px-6 bg-gradient-mesh overflow-hidden">
        {/* Gradient Orbs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent-cyan/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent-purple/20 rounded-full blur-3xl"></div>

        <div className={`max-w-4xl mx-auto text-center relative z-10 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-8">
            <div className="w-2 h-2 bg-accent-cyan rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-white/90">
              The AI editor that protects meaning
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-display text-white mb-8 leading-tight">
            Fix grammar.
          </h1>
          
          <p className="text-2xl md:text-3xl text-white/90 mb-6 max-w-3xl mx-auto leading-relaxed">
            AI editing that improves clarity without changing what you mean.
          </p>
          
          <p className="text-lg text-white/70 mb-12 max-w-2xl mx-auto leading-relaxed">
            No rewrites. No tone shifts. No meaning drift. Just grammar fixes that respect your intent.
          </p>
          
          {/* CTA Button - Large */}
          <div className="flex flex-col items-center">
            <button
              onClick={() => onNavigate('/editor')}
              className="group relative px-10 py-5 bg-white text-navy text-lg font-semibold rounded-2xl shadow-large hover:shadow-navy transition-all hover:-translate-y-1 active:translate-y-0"
            >
              <span className="relative z-10">Start editing free</span>
              <div className="absolute inset-0 bg-gradient-to-r from-accent-cyan to-accent-purple opacity-0 group-hover:opacity-20 rounded-2xl transition-opacity"></div>
            </button>
            <span className="text-sm text-white/60 mt-3">No signup required</span>
          </div>

          {/* Stats */}
          <div className="mt-12 flex flex-wrap justify-center gap-8 text-white/80 text-sm">
            <span>✓ 2 free edits</span>
            <span>✓ No credit card</span>
            <span>✓ Results in &lt; 3s</span>
          </div>
        </div>
      </section>

      {/* Trust Strip - White Section */}
      <section className="py-16 bg-white border-y border-gray-100">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-3 gap-8 text-center">
            <div className="group">
              <div className="text-5xl font-display text-navy mb-3 group-hover:scale-110 transition-transform">
                100%
              </div>
              <div className="text-sm text-gray-600 font-medium">Intent preserved</div>
            </div>
            <div className="group">
              <div className="text-5xl font-display text-navy mb-3 group-hover:scale-110 transition-transform">
                &lt; 3s
              </div>
              <div className="text-sm text-gray-600 font-medium">Average speed</div>
            </div>
            <div className="group">
              <div className="text-5xl font-display text-navy mb-3 group-hover:scale-110 transition-transform">
                Private
              </div>
              <div className="text-sm text-gray-600 font-medium">Never stored</div>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Section - Gradient Background */}
      <section id="demo" className="py-24 px-6 bg-gradient-peach scroll-mt-24">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-2 bg-white rounded-full text-xs font-semibold text-navy uppercase tracking-wider mb-6 shadow-soft">
              Demo
            </span>
            
            {/* Critical callout */}
            <p className="text-lg text-gray-700 font-medium mb-6 max-w-2xl mx-auto">
              Small wording changes can have big consequences. KeepMeaning prevents that.
            </p>
            
            <h2 className="text-5xl md:text-6xl font-display text-navy mb-6">
              See it in action
            </h2>
            <p className="text-xl text-gray-700 max-w-2xl mx-auto">
              Watch how KeepMeaning fixes grammar while preserving your exact intent
            </p>
          </div>

          {/* Demo Tabs */}
          <div className="flex justify-center mb-8 gap-3 flex-wrap">
            {demoScenarios.map((demo, idx) => (
              <button
                key={demo.id}
                onClick={() => setActiveDemo(idx)}
                className={`px-6 py-3 rounded-xl font-semibold text-sm transition-all ${
                  activeDemo === idx
                    ? 'bg-navy text-white shadow-medium'
                    : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                }`}
              >
                {demo.label}
              </button>
            ))}
          </div>

          {/* Demo Card */}
          <div className="bg-white rounded-3xl shadow-large overflow-hidden max-w-5xl mx-auto">
            {/* Browser Chrome */}
            <div className="bg-gray-50 border-b border-gray-200 px-6 py-4 flex items-center space-x-3">
              <div className="flex space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-400"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                <div className="w-3 h-3 rounded-full bg-green-400"></div>
              </div>
              <div className="flex-1 text-center">
                <div className="inline-block bg-white px-5 py-2 rounded-full text-sm text-gray-500 font-medium shadow-soft">
                  keepmeaning.co/editor
                </div>
              </div>
            </div>

            {/* Demo Content */}
            <div className="p-8 md:p-12">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Before - With Risk Label */}
                <div className="bg-gray-50 rounded-2xl p-8 border-2 border-gray-200 flex flex-col">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-semibold text-gray-900 uppercase tracking-wide">Original</span>
                    <span className="px-3 py-1 bg-red-50 text-red-600 text-xs rounded-full font-semibold">
                      Needs fixing
                    </span>
                  </div>
                  
                  <p className="text-base text-gray-700 leading-relaxed mb-auto">
                    {currentDemo.original}
                  </p>
                  
                  {/* Risk Label - Always at bottom */}
                  <div className="flex items-start space-x-2 bg-red-50 border border-red-100 rounded-lg p-3 mt-4">
                    <span className="text-red-600 text-sm font-medium">
                      {currentDemo.risk}
                    </span>
                  </div>
                </div>

                {/* After - With Intent Preserved Badge */}
                <div className="bg-gradient-to-br from-navy to-navy-light rounded-2xl p-8 border-2 border-navy relative overflow-hidden flex flex-col">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-accent-cyan/20 rounded-full blur-2xl"></div>
                  <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-accent-purple/20 rounded-full blur-2xl"></div>
                  
                  <div className="relative z-10 flex flex-col h-full">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm font-semibold text-white uppercase tracking-wide">Fixed</span>
                      <span className="px-3 py-1 bg-white/20 text-white text-xs rounded-full font-semibold backdrop-blur-sm">
                        {currentDemo.timing}
                      </span>
                    </div>
                    
                    <p className="text-base text-white leading-relaxed mb-auto">
                      {currentDemo.fixed}
                    </p>
                    
                    {/* Intent Preserved Badge - Always at bottom, aligned with risk */}
                    <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-3 mt-4">
                      <svg className="w-5 h-5 text-white flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-white text-sm font-semibold">Intent preserved</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA below demo */}
          <div className="text-center mt-8">
            <button
              onClick={() => onNavigate('/editor')}
              className="px-8 py-4 bg-navy text-white font-semibold rounded-2xl hover:bg-navy-dark shadow-medium hover:shadow-navy transition-all hover:-translate-y-1"
            >
              Try with your own text →
            </button>
          </div>
        </div>
      </section>

      {/* Features - Navy Section */}
      <section className="py-24 px-6 bg-navy relative overflow-hidden">
        {/* Gradient Orbs */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent-orange/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent-green/10 rounded-full blur-3xl"></div>

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-display text-white mb-6">
              Why KeepMeaning
            </h2>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              The only AI editor with intent preservation built-in
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                ),
                title: 'Intent-Safe Editing',
                description: 'Lock your meaning before AI touches your text. Guaranteed preservation.',
                gradient: 'from-accent-cyan/20 to-accent-purple/20'
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                ),
                title: 'Privacy First',
                description: 'Your text is processed and discarded immediately. Never stored, never trained on.',
                gradient: 'from-accent-green/20 to-accent-cyan/20'
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                ),
                title: 'Instant Results',
                description: 'Grammar fixes in under 3 seconds. Powered by ultra-fast LLM infrastructure.',
                gradient: 'from-accent-orange/20 to-accent-purple/20'
              }
            ].map((feature, idx) => (
              <div
                key={idx}
                className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 hover:bg-white/10 hover:border-white/20 transition-all hover:-translate-y-2"
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform`}>
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-display text-white mb-4">
                  {feature.title}
                </h3>
                <p className="text-white/70 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing - Gradient Background */}
      <section id="pricing" className="py-24 px-6 bg-gradient-mint scroll-mt-24">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-display text-navy mb-6">
              Simple pricing
            </h2>
            <p className="text-xl text-gray-700">
              Start free. Upgrade when you're ready.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Free */}
            <div className="bg-white rounded-3xl p-8 shadow-soft border border-gray-100">
              <h3 className="text-2xl font-display text-navy mb-2">Free</h3>
              <div className="mb-8">
                <span className="text-6xl font-display text-navy">$0</span>
              </div>
              <ul className="space-y-4 mb-10">
                <li className="flex items-start text-sm text-gray-700">
                  <svg className="w-5 h-5 text-navy mr-3 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  2 intent-safe edits
                </li>
                <li className="flex items-start text-sm text-gray-700">
                  <svg className="w-5 h-5 text-navy mr-3 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  No signup required
                </li>
              </ul>
              <button
                onClick={() => onNavigate('/editor')}
                className="w-full py-4 border-2 border-navy text-navy font-semibold rounded-2xl hover:bg-navy hover:text-white transition-all"
              >
                Start editing free
              </button>
            </div>

            {/* Pro - Featured */}
            <div className="bg-gradient-to-br from-navy to-navy-light rounded-3xl p-8 shadow-navy relative transform md:-translate-y-4 overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-accent-cyan/20 rounded-full blur-2xl"></div>
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-accent-purple/20 rounded-full blur-2xl"></div>
              
              <div className="relative z-10">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-accent-orange text-white text-xs px-4 py-2 rounded-full font-bold shadow-soft">
                  Most popular
                </div>
                <h3 className="text-2xl font-display text-white mb-2 mt-4">Pro</h3>
                <div className="mb-8">
                  <span className="text-6xl font-display text-white">$4</span>
                  <span className="text-white/80 text-xl">/month</span>
                </div>
                <ul className="space-y-4 mb-10">
                  <li className="flex items-start text-sm text-white/90">
                    <svg className="w-5 h-5 text-white mr-3 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <strong>Unlimited edits</strong>
                  </li>
                  <li className="flex items-start text-sm text-white/90">
                    <svg className="w-5 h-5 text-white mr-3 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Priority processing
                  </li>
                </ul>
                <button
                  onClick={() => onNavigate('/signup')}
                  className="w-full py-4 bg-white text-navy font-semibold rounded-2xl hover:bg-white/90 transition-all shadow-soft"
                >
                  Start free trial
                </button>
              </div>
            </div>

            {/* Lifetime */}
            <div className="bg-white rounded-3xl p-8 shadow-soft border border-gray-100">
              <div className="inline-block bg-accent-orange/10 text-accent-orange text-xs px-3 py-1 rounded-full font-bold mb-4">
                Limited time
              </div>
              <h3 className="text-2xl font-display text-navy mb-2">Lifetime</h3>
              <div className="mb-8">
                <span className="text-6xl font-display text-navy">$80</span>
                <span className="text-gray-600 text-sm block mt-2">one-time</span>
              </div>
              <ul className="space-y-4 mb-10">
                <li className="flex items-start text-sm text-gray-700">
                  <svg className="w-5 h-5 text-navy mr-3 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  All Pro features
                </li>
                <li className="flex items-start text-sm text-gray-700">
                  <svg className="w-5 h-5 text-navy mr-3 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Pay once, use forever
                </li>
              </ul>
              <button
                onClick={() => onNavigate('/signup')}
                className="w-full py-4 border-2 border-navy text-navy font-semibold rounded-2xl hover:bg-navy hover:text-white transition-all"
              >
                Buy lifetime
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA - Navy Section */}
      <section className="py-32 px-6 bg-navy relative overflow-hidden">
        {/* Gradient Orbs */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent-cyan/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent-purple/10 rounded-full blur-3xl"></div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-display text-white mb-8 leading-tight">
            Start editing free
          </h2>
          
          <p className="text-xl text-white/80 mb-12 max-w-2xl mx-auto">
            Join writers who trust KeepMeaning to fix grammar without changing what they mean
          </p>
          
          <div className="flex flex-col items-center">
            <button
              onClick={() => onNavigate('/editor')}
              className="px-12 py-5 bg-white text-navy text-lg font-semibold rounded-2xl shadow-large hover:shadow-navy transition-all hover:-translate-y-1"
            >
              Start editing free
            </button>
            <span className="text-sm text-white/50 mt-4">No signup required</span>
          </div>

          <p className="text-white/60 text-sm mt-8">
            ✓ No credit card · ✓ 2 free edits · ✓ Cancel anytime
          </p>
        </div>
      </section>

      {/* Footer - Compact */}
      <footer className="py-8 px-6 bg-white border-t border-gray-100">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <span className="text-sm font-display text-navy">
              KeepMeaning
            </span>
            
            <span className="text-xs text-gray-500">
              © 2025 KeepMeaning · We don't store your text
            </span>

            <div className="flex items-center gap-6 text-xs text-gray-600 font-medium">
              <button className="hover:text-navy transition-colors">Privacy</button>
              <button className="hover:text-navy transition-colors">Terms</button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
