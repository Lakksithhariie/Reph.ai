import React from 'react';

interface IntentStatusBadgeProps {
  intentPreserved: boolean;
  riskDetected: boolean;
}

export const IntentStatusBadge: React.FC<IntentStatusBadgeProps> = ({
  intentPreserved,
  riskDetected
}) => {
  if (!intentPreserved || riskDetected) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <svg className="w-5 h-5 text-yellow-600 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          <div>
            <p className="text-sm font-medium text-yellow-900">
              Potential intent risk detected
            </p>
            <p className="text-xs text-yellow-700 mt-1">
              Review changes carefully to ensure meaning is preserved
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#e8f2ff] border border-[#134686] rounded-lg p-4">
      <div className="flex items-center space-x-3">
        <svg className="w-5 h-5 text-[#134686]" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
        <span className="text-sm font-medium text-[#134686]">
          Intent preserved
        </span>
      </div>
    </div>
  );
};
