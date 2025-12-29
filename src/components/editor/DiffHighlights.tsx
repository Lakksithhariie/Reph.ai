import React from 'react';

interface DiffHighlightsProps {
  originalText: string;
  editedText: string;
}

export const DiffHighlights: React.FC<DiffHighlightsProps> = ({
  originalText,
  editedText
}) => {
  const originalWords = originalText.split(/\s+/);
  const editedWords = editedText.split(/\s+/);
  
  const renderHighlighted = () => {
    return editedWords.map((word, idx) => {
      const isChanged = originalWords[idx] !== word;
      
      return (
        <span
          key={idx}
          className={isChanged ? 'bg-[#e8f2ff] text-[#134686] px-1 rounded font-medium' : ''}
        >
          {word}{' '}
        </span>
      );
    });
  };

  return (
    <div className="text-sm text-gray-700 leading-relaxed">
      {renderHighlighted()}
    </div>
  );
};
