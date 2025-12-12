import React from 'react';
import { MODEL_TIERS } from '../config/constants';

interface ModelSelectorProps {
  selectedModel: string;
  onModelChange: (model: string) => void;
  disabled?: boolean;
}

export const ModelSelector: React.FC<ModelSelectorProps> = ({
  selectedModel,
  onModelChange,
  disabled = false,
}) => {
  return (
    <select
      value={selectedModel}
      onChange={(e) => onModelChange(e.target.value)}
      className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-800 text-sm font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
      disabled={disabled}
      style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif' }}
    >
      {MODEL_TIERS.map((tier) => (
        <optgroup key={tier.tier} label={tier.tier}>
          {tier.models.map((model) => (
            <option key={model.id} value={model.id}>
              {model.name} ({model.speed})
            </option>
          ))}
        </optgroup>
      ))}
    </select>
  );
};
