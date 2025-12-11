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
    <div className="flex items-center space-x-2">
      <label className="text-black text-xs font-bold min-w-[60px]">MODEL:</label>
      <select
        value={selectedModel}
        onChange={(e) => onModelChange(e.target.value)}
        className="flex-1 text-xs h-6 px-1 border-2 border-black bg-white text-black focus:outline-none focus:ring-2 focus:ring-black font-mono"
        disabled={disabled}
      >
        {MODEL_TIERS.map((tier) => (
          <optgroup key={tier.tier} label={`━━━ ${tier.tier.toUpperCase()} ━━━`}>
            {tier.models.map((model) => (
              <option key={model.id} value={model.id}>
                {model.name.toUpperCase()} - {model.speed} - ${model.price}
              </option>
            ))}
          </optgroup>
        ))}
      </select>
    </div>
  );
};
