// Intent types (CRITICAL)
export type Intent = 'inform' | 'request' | 'persuade' | 'neutral';

export interface IntentOption {
  value: Intent;
  label: string;
  description: string;
}

// User types
export interface User {
  id: string;
  email: string;
  isPro: boolean;
  createdAt: Date;
}

// Auth state
export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

// Usage state
export interface UsageState {
  remaining: number;
  isExhausted: boolean;
}

// Editor state
export interface EditorState {
  originalText: string;
  editedText: string;
  selectedIntent: Intent | null;
  isProcessing: boolean;
  error: string | null;
  intentPreserved: boolean;
  riskDetected: boolean;
}

// API response
export interface EditResponse {
  editedText: string;
  intentPreserved: boolean;
  confidence: number;
}