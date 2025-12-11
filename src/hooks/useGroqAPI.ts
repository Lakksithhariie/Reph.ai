import { useState, useCallback } from 'react';
import Groq from 'groq-sdk';
import { ToneType, APIError, ConversionState } from '../types';
import { ERROR_MESSAGES } from '../config/constants';
import { sanitizeText } from '../utils/validation';

const initializeGroq = (): Groq | null => {
  const apiKey = import.meta.env.VITE_GROQ_API_KEY;
  
  if (!apiKey) {
    console.error(ERROR_MESSAGES.NO_API_KEY);
    return null;
  }

  return new Groq({
    apiKey,
    dangerouslyAllowBrowser: true,
  });
};

const groq = initializeGroq();

export const useGroqAPI = () => {
  const [state, setState] = useState<ConversionState>({
    isLoading: false,
    error: null,
    output: '',
  });

  const buildPrompt = (text: string, tone: ToneType): string => {
    const toneInstructions: Record<ToneType, string> = {
      Standard: 'Use clear, balanced, and natural language.',
      Casual: 'Write in a relaxed, friendly, conversational tone.',
      Professional: 'Maintain formal, polished, business-appropriate language.',
      Witty: 'Inject clever humor and wordplay while keeping core message intact.',
      Empathetic: 'Write with warmth, understanding, and emotional intelligence.',
      Assertive: 'Use confident, direct, and authoritative language.',
    };

    return `You are an expert human writer. Rewrite this text to sound natural and human.

**Tone**: ${tone}
${toneInstructions[tone]}

**Rules**:
1. Remove all robotic patterns
2. Vary sentence structure naturally
3. Maintain original meaning
4. Output ONLY the rewritten text

**Text**:
${text}`;
  };

  const convertText = useCallback(async (inputText: string, selectedTone: ToneType, modelId: string) => {
    if (!groq) {
      setState({
        isLoading: false,
        error: { message: ERROR_MESSAGES.NO_API_KEY },
        output: '',
      });
      return;
    }

    setState({ isLoading: true, error: null, output: '' });

    try {
      const sanitizedText = sanitizeText(inputText);
      const prompt = buildPrompt(sanitizedText, selectedTone);

      const completion = await groq.chat.completions.create({
        model: modelId,
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 8192,
        temperature: 0.7,
      });

      const result = completion.choices[0]?.message?.content?.trim();

      if (!result) {
        throw new Error('No output generated');
      }

      setState({
        isLoading: false,
        error: null,
        output: result,
      });
    } catch (err: unknown) {
      const apiError = handleAPIError(err);
      setState({
        isLoading: false,
        error: apiError,
        output: '',
      });
    }
  }, []);

  const reset = useCallback(() => {
    setState({
      isLoading: false,
      error: null,
      output: '',
    });
  }, []);

  return {
    ...state,
    convertText,
    reset,
  };
};

const handleAPIError = (err: unknown): APIError => {
  if (err instanceof Error) {
    if (err.message.includes('rate limit')) {
      return { message: ERROR_MESSAGES.RATE_LIMIT, code: 'RATE_LIMIT' };
    }
    if (err.message.includes('network')) {
      return { message: ERROR_MESSAGES.NETWORK_ERROR, code: 'NETWORK_ERROR' };
    }
    if (err.message.includes('API key')) {
      return { message: ERROR_MESSAGES.NO_API_KEY, code: 'AUTH_ERROR' };
    }
    
    return { message: `${ERROR_MESSAGES.API_ERROR}: ${err.message}`, code: 'API_ERROR' };
  }
  
  return { message: ERROR_MESSAGES.API_ERROR, code: 'UNKNOWN_ERROR' };
};
