import React from 'react';

interface AnimatedLogoSimpleProps {
  className?: string;
  size?: number;
}

export const AnimatedLogoSimple: React.FC<AnimatedLogoSimpleProps> = ({ 
  className = '', 
  size = 48 
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} group`}
    >
      <defs>
        <linearGradient id="tieGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00F5FF" />
          <stop offset="100%" stopColor="#A78BFA" />
        </linearGradient>
      </defs>

      {/* Background circle */}
      <circle
        cx="32"
        cy="32"
        r="28"
        fill="url(#tieGradient)"
        opacity="0.1"
        className="group-hover:opacity-20 transition-opacity duration-300"
      />

      {/* Letter K with rope texture */}
      <g className="group-hover:scale-105 transition-transform duration-300 origin-center">
        {/* Vertical line */}
        <line
          x1="22"
          y1="18"
          x2="22"
          y2="46"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
          className="animate-draw-vertical"
        />
        
        {/* Top diagonal */}
        <line
          x1="22"
          y1="30"
          x2="38"
          y2="18"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
          className="animate-draw-diagonal-top"
        />
        
        {/* Bottom diagonal */}
        <line
          x1="22"
          y1="30"
          x2="38"
          y2="46"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
          className="animate-draw-diagonal-bottom"
        />

        {/* Knot point */}
        <circle
          cx="22"
          cy="30"
          r="3"
          fill="url(#tieGradient)"
          className="animate-pulse-knot"
        />

        {/* Tie loop */}
        <circle
          cx="22"
          cy="30"
          r="6"
          stroke="url(#tieGradient)"
          strokeWidth="1.5"
          fill="none"
          opacity="0.5"
          className="animate-loop-expand"
        />
      </g>

      <style>{`
        /* Draw animations */
        @keyframes draw-vertical {
          from { stroke-dashoffset: 28; }
          to { stroke-dashoffset: 0; }
        }

        @keyframes draw-diagonal-top {
          from { stroke-dashoffset: 24; }
          to { stroke-dashoffset: 0; }
        }

        @keyframes draw-diagonal-bottom {
          from { stroke-dashoffset: 24; }
          to { stroke-dashoffset: 0; }
        }

        .animate-draw-vertical {
          stroke-dasharray: 28;
          animation: draw-vertical 0.6s ease-out forwards;
        }

        .animate-draw-diagonal-top {
          stroke-dasharray: 24;
          animation: draw-diagonal-top 0.4s ease-out 0.3s forwards;
          stroke-dashoffset: 24;
        }

        .animate-draw-diagonal-bottom {
          stroke-dasharray: 24;
          animation: draw-diagonal-bottom 0.4s ease-out 0.5s forwards;
          stroke-dashoffset: 24;
        }

        /* Knot pulse */
        @keyframes pulse-knot {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.3); opacity: 0.8; }
        }

        .animate-pulse-knot {
          animation: pulse-knot 2s ease-in-out 0.7s infinite;
        }

        /* Loop expand */
        @keyframes loop-expand {
          0% { r: 3; opacity: 0; }
          50% { r: 8; opacity: 0.5; }
          100% { r: 6; opacity: 0.5; }
        }

        .animate-loop-expand {
          animation: loop-expand 0.8s ease-out 0.8s forwards;
          r: 3;
          opacity: 0;
        }
      `}</style>
    </svg>
  );
};
