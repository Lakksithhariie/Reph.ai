import React, { useEffect, useState } from 'react';

interface AnimatedLogoKnotProps {
  className?: string;
  size?: number;
}

export const AnimatedLogoKnot: React.FC<AnimatedLogoKnotProps> = ({ 
  className = '', 
  size = 48 
}) => {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPhase((prev) => (prev + 1) % 4);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        {/* Animated gradient */}
        <linearGradient id="ropeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00F5FF">
            <animate
              attributeName="stop-color"
              values="#00F5FF; #A78BFA; #FF9A62; #00F5FF"
              dur="3s"
              repeatCount="indefinite"
            />
          </stop>
          <stop offset="100%" stopColor="#A78BFA">
            <animate
              attributeName="stop-color"
              values="#A78BFA; #FF9A62; #00F5FF; #A78BFA"
              dur="3s"
              repeatCount="indefinite"
            />
          </stop>
        </linearGradient>

        {/* Glow filter */}
        <filter id="knotGlow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>

      {/* Background circle pulse */}
      <circle cx="50" cy="50" r="45" fill="url(#ropeGrad)" opacity="0.05">
        <animate
          attributeName="r"
          values="40; 45; 40"
          dur="2s"
          repeatCount="indefinite"
        />
      </circle>

      {/* Left rope strand */}
      <path
        d="M 25 20 Q 25 50 25 80"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinecap="round"
        fill="none"
        className="origin-center"
        style={{
          strokeDasharray: 60,
          strokeDashoffset: phase === 0 ? 60 : 0,
          transition: 'stroke-dashoffset 0.8s ease-out',
        }}
      />

      {/* Right rope strand - crossing */}
      <path
        d="M 75 20 Q 50 40 25 50 Q 50 60 75 80"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinecap="round"
        fill="none"
        style={{
          strokeDasharray: 120,
          strokeDashoffset: phase <= 1 ? 120 : 0,
          transition: 'stroke-dashoffset 0.8s ease-out 0.3s',
        }}
      />

      {/* Knot center - animated */}
      <g filter="url(#knotGlow)">
        {/* Outer knot circle */}
        <circle
          cx="25"
          cy="50"
          r={phase >= 2 ? "8" : "0"}
          fill="url(#ropeGrad)"
          style={{
            transition: 'r 0.4s ease-out',
          }}
        />
        
        {/* Inner knot circle */}
        <circle
          cx="25"
          cy="50"
          r={phase >= 2 ? "4" : "0"}
          fill="currentColor"
          style={{
            transition: 'r 0.4s ease-out 0.2s',
          }}
        />

        {/* Knot wrapping lines */}
        <path
          d="M 20 45 Q 18 50 20 55"
          stroke="url(#ropeGrad)"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
          opacity={phase >= 3 ? 1 : 0}
          style={{
            transition: 'opacity 0.3s ease-out',
          }}
        />
        <path
          d="M 30 45 Q 32 50 30 55"
          stroke="url(#ropeGrad)"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
          opacity={phase >= 3 ? 1 : 0}
          style={{
            transition: 'opacity 0.3s ease-out',
          }}
        />
      </g>

      {/* Sparkles */}
      <g opacity={phase >= 3 ? 1 : 0} style={{ transition: 'opacity 0.3s ease-out' }}>
        <circle cx="15" cy="40" r="2" fill="#00F5FF">
          <animate
            attributeName="opacity"
            values="0; 1; 0"
            dur="1.5s"
            repeatCount="indefinite"
          />
        </circle>
        <circle cx="35" cy="40" r="2" fill="#A78BFA">
          <animate
            attributeName="opacity"
            values="0; 1; 0"
            dur="1.5s"
            begin="0.3s"
            repeatCount="indefinite"
          />
        </circle>
        <circle cx="25" cy="35" r="2" fill="#FF9A62">
          <animate
            attributeName="opacity"
            values="0; 1; 0"
            dur="1.5s"
            begin="0.6s"
            repeatCount="indefinite"
          />
        </circle>
      </g>

      {/* Letter K overlay (subtle) */}
      <text
        x="50"
        y="70"
        fontSize="40"
        fontFamily="Bakbak One"
        fill="currentColor"
        textAnchor="middle"
        opacity="0.3"
      >
        K
      </text>
    </svg>
  );
};
