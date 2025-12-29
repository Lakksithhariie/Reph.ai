import React from 'react';
import { DiffHighlights } from './DiffHighlights';
import { IntentStatusBadge } from './IntentStatusBadge';

interface ResultViewProps {
  originalText: string;
  editedText: string;
  intentPreserved: boolean;
  riskDetected: boolean;
  onCopy: () => void;
}

export const ResultView: React.FC<ResultViewProps> = ({
  originalText,
  editedText,
  intentPreserved,
  riskDetected,
  onCopy
}) => {
  return (
    <div className="space-y-6">
      {/* Status Badge */}
      <IntentStatusBadge
        intentPreserved={intentPreserved}
        riskDetected={riskDetected}
      />
      
      {/* Side-by-side view */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Original */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
            <h3 className="text-sm font-semibold text-gray-900">Original</h3>
          </div>
          
          <div className="p-6">
            <div className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
              {originalText}
            </div>
          </div>
        </div>
        
        {/* Edited */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
            <h3 className="text-sm font-semibold text-gray-900">Edited</h3>
            <button
              onClick={onCopy}
              className="text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors flex items-center space-x-1"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              <span>Copy</span>
            </button>
          </div>
          
          <div className="p-6">
            <DiffHighlights
              originalText={originalText}
              editedText={editedText}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
