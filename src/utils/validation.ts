import { INPUT_LIMITS, ERROR_MESSAGES } from '../config/constants';

export interface ValidationResult {
  isValid: boolean;
  error: string | null;
  characterCount: number;
  isNearLimit: boolean;
}

export const validateInput = (text: string): ValidationResult => {
  const trimmedText = text.trim();
  const characterCount = text.length;
  const isNearLimit = characterCount >= INPUT_LIMITS.warningThreshold;

  if (trimmedText.length === 0) {
    return {
      isValid: false,
      error: ERROR_MESSAGES.EMPTY_INPUT,
      characterCount,
      isNearLimit,
    };
  }

  if (trimmedText.length < INPUT_LIMITS.minLength) {
    return {
      isValid: false,
      error: ERROR_MESSAGES.TOO_SHORT,
      characterCount,
      isNearLimit,
    };
  }

  if (characterCount > INPUT_LIMITS.maxLength) {
    return {
      isValid: false,
      error: ERROR_MESSAGES.TOO_LONG,
      characterCount,
      isNearLimit,
    };
  }

  return {
    isValid: true,
    error: null,
    characterCount,
    isNearLimit,
  };
};

export const sanitizeText = (text: string): string => {
  return text
    .replace(/[\u0000-\u001F\u007F-\u009F]/g, '') // Remove control characters
    .trim();
};
