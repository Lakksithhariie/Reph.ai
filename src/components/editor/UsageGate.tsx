import React from 'react';

interface UsageGateProps {
  remaining: number;
  isExhausted: boolean;
  onUpgrade: () => void;
  onSignup: () => void;
  isAuthenticated: boolean;
}

export const UsageGate: React.FC<UsageGateProps> = ({
  remaining,
  isExhausted,
  onUpgrade,
  onSignup,
  isAuthenticated
}) => {
  if (!isExhausted) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-8">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-[#e8f2ff] rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-[#134686]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            You've reached the free limit
          </h2>
          
          <p className="text-gray-600">
            {isAuthenticated 
              ? 'Upgrade to continue editing with unlimited access.'
              : 'Create an account to get more edits, or upgrade for unlimited access.'
            }
          </p>
        </div>
        
        <div className="space-y-3">
          {!isAuthenticated && (
            <button
              onClick={onSignup}
              className="w-full py-3 px-4 bg-[#134686] text-white rounded-lg font-medium hover:bg-[#0f3666] transition-colors"
            >
              Create account (5 more edits)
            </button>
          )}
          
          <button
            onClick={onUpgrade}
            className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
              isAuthenticated
                ? 'bg-[#134686] text-white hover:bg-[#0f3666]'
                : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}
          >
            Upgrade to unlimited
          </button>
        </div>
      </div>
    </div>
  );
};
