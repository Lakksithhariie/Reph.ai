import React from 'react';

export const ExampleDiff: React.FC = () => {
  return (
    <div className="py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-white text-center mb-12">
          See the difference
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Before */}
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
            <div className="text-sm font-semibold text-white/50 mb-3">Before</div>
            <p className="text-white/80 leading-relaxed">
              I think we should definitely consider moving forward with this proposal because its really important for our teams success.
            </p>
          </div>
          
          {/* After */}
          <div className="bg-green-500/10 backdrop-blur-sm rounded-xl p-6 border border-green-500/30">
            <div className="text-sm font-semibold text-green-400 mb-3">
              After • ✅ Intent preserved
            </div>
            <p className="text-white leading-relaxed">
              I think we should consider moving forward with this proposal because it's important for our team's success.
            </p>
          </div>
        </div>
        
        <p className="text-center text-white/50 text-sm mt-6">
          Grammar fixed • Meaning protected
        </p>
      </div>
    </div>
  );
};
