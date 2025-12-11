export type ToneType = 'Standard' | 'Casual' | 'Professional' | 'Witty' | 'Empathetic' | 'Assertive';

export interface APIError {
  message: string;
  code?: string;
  status?: number;
}

export interface GroqResponse {
  choices: Array<{
    message: {
      content: string;
    };
  }>;
}

export interface ConversionState {
  isLoading: boolean;
  error: APIError | null;
  output: string;
}

export interface ModelInfo {
  id: string;
  name: string;
  speed: string;
  price: string;
  description: string;
}

export interface ModelTier {
  tier: string;
  models: ModelInfo[];
}
