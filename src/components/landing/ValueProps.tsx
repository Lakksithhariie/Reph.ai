import React from 'react';

export const ValueProps: React.FC = () => {
  const props = [
    {
      icon: '🎯',
      title: 'Intent-Safe',
      description: 'Edits grammar without changing your meaning'
    },
    {
      icon: '🔒',
      title: 'Private',
      description: 'We don\'t store your text'
    },
    {
      icon: '⚡',
      title: 'Instant',
      description: 'Get results in under 3 seconds'
    }
  ];

  return (
    <div className="py-16 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {props.map((prop, idx) => (
          <div key={idx} className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
            <div className="text-4xl mb-4">{prop.icon}</div>
            <h3 className="text-xl font-bold text-white mb-2">{prop.title}</h3>
            <p className="text-white/70">{prop.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
