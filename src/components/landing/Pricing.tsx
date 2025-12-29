import React from 'react';
import { PRICING } from '../../config/constants';

interface PricingProps {
  onUpgrade: () => void;
}

export const Pricing: React.FC<PricingProps> = ({ onUpgrade }) => {
  return (
    <div className="py-16 px-4" id="pricing">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-white text-center mb-12">
          Simple pricing
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Free */}
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
            <h3 className="text-xl font-bold text-white mb-2">Free</h3>
            <div className="text-3xl font-bold text-white mb-4">$0</div>
            <ul className="space-y-2 text-white/70 mb-6">
              <li>• 2 edits</li>
              <li>• Intent preservation</li>
              <li>• No storage</li>
            </ul>
          </div>
          
          {/* Monthly */}
          <div className="bg-blue-500/10 backdrop-blur-sm rounded-xl p-6 border-2 border-blue-500/50 relative">
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white text-xs px-3 py-1 rounded-full font-semibold">
              Popular
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Monthly</h3>
            <div className="text-3xl font-bold text-white mb-4">${PRICING.MONTHLY}/mo</div>
            <ul className="space-y-2 text-white/70 mb-6">
              <li>• Unlimited edits</li>
              <li>• Intent preservation</li>
              <li>• Priority support</li>
            </ul>
            <button
              onClick={onUpgrade}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg transition-colors"
            >
              Upgrade
            </button>
          </div>
          
          {/* Lifetime */}
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
            <h3 className="text-xl font-bold text-white mb-2">Lifetime</h3>
            <div className="text-3xl font-bold text-white mb-4">${PRICING.LIFETIME}</div>
            <ul className="space-y-2 text-white/70 mb-6">
              <li>• Everything in Monthly</li>
              <li>• Pay once, use forever</li>
              <li>• Early adopter</li>
            </ul>
            <button
              onClick={onUpgrade}
              className="w-full bg-white/10 hover:bg-white/20 text-white font-semibold py-2 rounded-lg transition-colors border border-white/20"
            >
              Upgrade
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
