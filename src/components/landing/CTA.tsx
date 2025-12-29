import React from 'react';
import { Button } from '../Button';

interface CTAProps {
  onTryFree: () => void;
}

export const CTA: React.FC<CTAProps> = ({ onTryFree }) => {
  return (
    <div className="py-20 px-4">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-white mb-6">
          Ready to protect your meaning?
        </h2>
        
        <p className="text-xl text-white/70 mb-8">
          Start editing with confidence today.
        </p>
        
        <Button
          onClick={onTryFree}
          variant="primary"
          className="text-lg px-8 py-4"
        >
          Try Reph.ai free
        </Button>
      </div>
    </div>
  );
};
