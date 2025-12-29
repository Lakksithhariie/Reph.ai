import React, { useEffect, useState } from 'react';

interface AnimatedLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  animated?: boolean;
}

export const AnimatedLogo: React.FC<AnimatedLogoProps> = ({ 
  className = '', 
  size = 'md',
  animated = true 
}) => {
  const [isAnimating, setIsAnimating] = useState(animated);

  const sizes = {
    sm: { width: 32, height: 32, strokeWidth: 2.5 },
    md: { width: 48, height: 48, strokeWidth: 3 },
    lg: { width: 64, height: 64, strokeWidth: 3.5 },
  };

  const { width, height, strokeWidth } = sizes[size];

  useEffect(() => {
    if (animated) {
      const interval = setInterval(() => {
        setIsAnimating(false);
        setTimeout(() => setIsAnimating(true), 100);
      }, 4000); // Repeat every 4 seconds

      return () => clearInterval(interval);
    }
  }, [animated]);

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        {/* Gradient for the rope */}
        <linearGradient id="ropeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00F5FF" />
          <stop offset="50%" stopColor="#A78BFA" />
          <stop offset="100%" stopColor="#00F5FF" />
        </linearGradient>

        {/* Glow effect */}
        <filter id="glow">
          <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>

      {/* Background circle */}
      <circle
        cx="32"
        cy="32"
        r="30"
        fill="url(#ropeGradient)"
        opacity="0.1"
      />

      {/* Letter K - Left rope */}
      <path
        d="M 18 16 L 18 48"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        className={isAnimating ? 'animate-draw-k-left' : ''}
        style={{
          strokeDasharray: 32,
          strokeDashoffset: isAnimating ? 0 : 32,
        }}
      />

      {/* Letter K - Top diagonal */}
      <path
        d="M 18 28 L 35 16"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        className={isAnimating ? 'animate-draw-k-top' : ''}
        style={{
          strokeDasharray: 24,
          strokeDashoffset: isAnimating ? 0 : 24,
          animationDelay: '0.3s',
        }}
      />

      {/* Letter K - Bottom diagonal */}
      <path
        d="M 18 28 L 35 48"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        className={isAnimating ? 'animate-draw-k-bottom' : ''}
        style={{
          strokeDasharray: 28,
          strokeDashoffset: isAnimating ? 0 : 28,
          animationDelay: '0.6s',
        }}
      />

      {/* Knot/Tie effect - Circle at intersection */}
      <circle
        cx="18"
        cy="28"
        r="4"
        fill="url(#ropeGradient)"
        filter="url(#glow)"
        className={isAnimating ? 'animate-knot-pulse' : ''}
        style={{
          animationDelay: '0.9s',
        }}
      />

      {/* Binding loop - decorative element */}
      <path
        d="M 35 16 Q 42 22 35 28 Q 28 34 35 40 Q 42 46 35 48"
        stroke="url(#ropeGradient)"
        strokeWidth={strokeWidth * 0.6}
        strokeLinecap="round"
        fill="none"
        opacity="0.5"
        className={isAnimating ? 'animate-loop' : ''}
        style={{
          strokeDasharray: 60,
          strokeDashoffset: isAnimating ? 0 : 60,
          animationDelay: '1.2s',
        }}
      />

      {/* Sparkle effects */}
      <g className={isAnimating ? 'animate-sparkle' : ''} style={{ animationDelay: '1.5s' }}>
        <circle cx="28" cy="20" r="1.5" fill="#00F5FF" opacity="0" />
        <circle cx="38" cy="32" r="1.5" fill="#A78BFA" opacity="0" />
        <circle cx="28" cy="44" r="1.5" fill="#00F5FF" opacity="0" />
      </g>

      <style>{`
        /* Drawing animations */
        .animate-draw-k-left {
          animation: draw-line 0.5s ease-out forwards;
        }

        .animate-draw-k-top {
          animation: draw-line 0.4s ease-out forwards;
        }

        .animate-draw-k-bottom {
          animation: draw-line 0.4s ease-out forwards;
        }

        .animate-loop {
          animation: draw-line 0.8s ease-out forwards;
        }

        @keyframes draw-line {
          from {
            stroke-dashoffset: inherit;
          }
          to {
            stroke-dashoffset: 0;
          }
        }

        /* Knot pulse animation */
        .animate-knot-pulse {
          animation: knot-pulse 0.6s ease-out forwards;
        }

        @keyframes knot-pulse {
          0% {
            r: 0;
            opacity: 0;
          }
          50% {
            r: 6;
            opacity: 1;
          }
          100% {
            r: 4;
            opacity: 1;
          }
        }

        /* Sparkle animation */
        .animate-sparkle circle {
          animation: sparkle 0.8s ease-out forwards;
        }

        .animate-sparkle circle:nth-child(1) {
          animation-delay: 0s;
        }

        .animate-sparkle circle:nth-child(2) {
          animation-delay: 0.2s;
        }

        .animate-sparkle circle:nth-child(3) {
          animation-delay: 0.4s;
        }

        @keyframes sparkle {
          0%, 100% {
            opacity: 0;
            transform: scale(0);
          }
          50% {
            opacity: 1;
            transform: scale(1.5);
          }
        }
      `}</style>
    </svg>
  );
};
