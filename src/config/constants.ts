import { IntentOption } from '../types';

// BRAND
export const BRAND = {
  NAME: 'KeepMeaning',
  DOMAIN: 'keepmeaning.co',
  TAGLINE: 'The AI editor that protects meaning'
};

// INTENT OPTIONS
export const INTENT_OPTIONS: IntentOption[] = [
  {
    value: 'inform',
    label: 'Inform',
    description: 'Share facts or information'
  },
  {
    value: 'request',
    label: 'Request',
    description: 'Ask for something'
  },
  {
    value: 'persuade',
    label: 'Persuade',
    description: 'Convince or argue'
  },
  {
    value: 'neutral',
    label: 'Neutral',
    description: 'General or mixed intent'
  }
];

// USAGE LIMITS
export const USAGE_LIMITS = {
  GUEST: 2,
  FREE_USER: 5,
  PRO_USER: Infinity
};

// PRICING
export const PRICING = {
  MONTHLY: 4,
  LIFETIME: 80
};

// VALIDATION
export const VALIDATION = {
  MIN_CHARS: 10,
  MAX_CHARS: 5000
};

// COLOR PALETTE (Navy & White Theme)
export const COLORS = {
  // Primary Navy
  NAVY: '#0B1D51',
  NAVY_DARK: '#081633',
  NAVY_LIGHT: '#1a3875',
  NAVY_LIGHTER: '#2d4d8f',
  
  // Accent Colors
  ACCENT_RED: '#FF4444',
  ACCENT_GREEN: '#10B981',
  ACCENT_BLUE: '#3B82F6',
  
  // Neutrals
  BLACK: '#000000',
  WHITE: '#FFFFFF',
  GRAY_900: '#111827',
  GRAY_800: '#1F2937',
  GRAY_700: '#374151',
  GRAY_600: '#4B5563',
  GRAY_500: '#6B7280',
  GRAY_400: '#9CA3AF',
  GRAY_300: '#D1D5DB',
  GRAY_200: '#E5E7EB',
  GRAY_100: '#F3F4F6',
  GRAY_50: '#F9FAFB',
  
  // Backgrounds
  BG_PRIMARY: '#FFFFFF',
  BG_SECONDARY: '#F9FAFB',
  BG_SUBTLE: '#FAFAFA',
  
  // Status
  SUCCESS: '#10B981',
  SUCCESS_BG: '#D1FAE5',
  WARNING: '#F59E0B',
  WARNING_BG: '#FEF3C7',
  ERROR: '#EF4444',
  ERROR_BG: '#FEE2E2',
  
  // Borders
  BORDER: '#E5E7EB',
  BORDER_LIGHT: '#F3F4F6'
};

// ERROR MESSAGES
export const ERROR_MESSAGES = {
  NO_INTENT: 'Please select an intent before editing',
  TEXT_TOO_SHORT: `Text must be at least ${VALIDATION.MIN_CHARS} characters`,
  TEXT_TOO_LONG: `Text must be less than ${VALIDATION.MAX_CHARS} characters`,
  NO_API_KEY: 'API key not configured',
  API_ERROR: 'Failed to process text. Please try again.',
  USAGE_LIMIT: 'Free usage limit reached. Sign up to continue.'
};
