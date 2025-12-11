import { ToneType, ModelTier } from '../types';

export const TONES: readonly ToneType[] = [
  'Standard',
  'Casual',
  'Professional',
  'Witty',
  'Empathetic',
  'Assertive'
] as const;

// Model tiers based on official Groq documentation
export const MODEL_TIERS: readonly ModelTier[] = [
  {
    tier: '⭐ Premium Tier',
    models: [
      {
        id: 'openai/gpt-oss-120b',
        name: 'GPT-OSS 120B',
        speed: '500 t/s',
        price: '0.15/0.60',
        description: 'Best quality - 120B parameters',
      },
      {
        id: 'llama-3.3-70b-versatile',
        name: 'Llama 3.3 70B',
        speed: '280 t/s',
        price: '0.59/0.79',
        description: 'Balanced - 70B parameters',
      },
    ],
  },
  {
    tier: '⚡ Fast Tier',
    models: [
      {
        id: 'openai/gpt-oss-20b',
        name: 'GPT-OSS 20B',
        speed: '1000 t/s',
        price: '0.075/0.30',
        description: 'Fast and affordable',
      },
      {
        id: 'llama-3.1-8b-instant',
        name: 'Llama 3.1 8B',
        speed: '560 t/s',
        price: '0.05/0.08',
        description: 'Fastest and cheapest',
      },
    ],
  },
  {
    tier: '🔬 Preview Tier',
    models: [
      {
        id: 'meta-llama/llama-4-maverick-17b-128e-instruct',
        name: 'Llama 4 Maverick',
        speed: '600 t/s',
        price: '0.20/0.60',
        description: 'Experimental - Llama 4',
      },
      {
        id: 'meta-llama/llama-4-scout-17b-16e-instruct',
        name: 'Llama 4 Scout',
        speed: '750 t/s',
        price: '0.11/0.34',
        description: 'Experimental - Faster',
      },
    ],
  },
] as const;

export const INPUT_LIMITS = {
  minLength: 10,
  maxLength: 8000,
  warningThreshold: 6000,
} as const;

export const ERROR_MESSAGES = {
  NO_API_KEY: 'API key not configured',
  EMPTY_INPUT: 'Enter text to humanize',
  TOO_SHORT: `Min ${INPUT_LIMITS.minLength} chars`,
  TOO_LONG: `Max ${INPUT_LIMITS.maxLength} chars`,
  API_ERROR: 'Processing failed',
  NETWORK_ERROR: 'Network error',
  RATE_LIMIT: 'Rate limit exceeded',
} as const;

export const KEYBOARD_SHORTCUTS = {
  CONVERT: 'Ctrl/Cmd + Enter',
  CLEAR: 'Esc',
  COPY: 'Ctrl/Cmd + Shift + C',
} as const;
