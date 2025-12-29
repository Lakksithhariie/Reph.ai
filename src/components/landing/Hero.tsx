import React from 'react';
import { Button } from '../Button';

interface HeroProps {
  onTryFree: () => void;
  onSignIn: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onTryFree, onSignIn }) => {
  return (
    <div className="text-center py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
          Fix grammar.<br />Protect meaning.
        </h1>
        
        <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto">
          AI editing that preserves your intent. No creativity. No meaning drift.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            onClick={onTryFree}
            variant="primary"
            className="text-lg px-8 py-4"
          >
            Try it free
          </Button>
          
          <button
            onClick={onSignIn}
            className="text-white/70 hover:text-white text-sm transition-colors"
          >
            Sign in
          </button>
        </div>
        
        <p className="text-white/50 text-sm mt-6">
          No credit card required • 2 free edits
        </p>
      </div>
    </div>
  );
};
