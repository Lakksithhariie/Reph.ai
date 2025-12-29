import { useState, useCallback } from 'react';
import Groq from 'groq-sdk';
import { Intent, EditResponse } from '../types';
import { ERROR_MESSAGES } from '../config/constants';

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

// INTENT-SAFE PROMPT (V1 CONTRACT)
const buildIntentSafePrompt = (text: string, intent: Intent): string => {
  return `You are an AI editor. Your task is to improve grammar and clarity WITHOUT changing the original intent or meaning.

Intent: ${intent}

Rules:
- Do not add new claims
- Do not change sentiment strength
- Do not remove qualifiers
- Preserve original meaning strictly
- Fix only grammar, punctuation, and clarity issues
- Do not alter the core message

Text:
${text}

Respond ONLY with the edited text. No explanations.`;
};

// Simple heuristic for intent preservation check
const checkIntentPreservation = (original: string, edited: string): { preserved: boolean; confidence: number } => {
  const origLen = original.length;
  const editLen = edited.length;
  
  // Length change > 30% is suspicious
  const lengthRatio = Math.abs(editLen - origLen) / origLen;
  
  // Simple keyword sentiment preservation check
  const riskKeywords = ['however', 'although', 'despite', 'unfortunately', 'fortunately'];
  const origHasRisk = riskKeywords.some(k => original.toLowerCase().includes(k));
  const editHasRisk = riskKeywords.some(k => edited.toLowerCase().includes(k));
  
  let confidence = 1.0;
  
  if (lengthRatio > 0.3) confidence -= 0.3;
  if (origHasRisk !== editHasRisk) confidence -= 0.2;
  
  return {
    preserved: confidence > 0.6,
    confidence
  };
};

export const useGroqAPI = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const editText = useCallback(async (
    text: string,
    intent: Intent
  ): Promise<EditResponse> => {
    if (!groq) {
      throw new Error(ERROR_MESSAGES.NO_API_KEY);
    }

    setIsProcessing(true);
    setError(null);

    try {
      const prompt = buildIntentSafePrompt(text, intent);

      const completion = await groq.chat.completions.create({
        model: 'llama-3.3-70b-versatile', // Fixed model for V1
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 4096,
        temperature: 0.3, // Low creativity
      });

      const editedText = completion.choices[0]?.message?.content?.trim();

      if (!editedText) {
        throw new Error('No output generated');
      }

      const { preserved, confidence } = checkIntentPreservation(text, editedText);

      return {
        editedText,
        intentPreserved: preserved,
        confidence
      };
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : ERROR_MESSAGES.API_ERROR;
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsProcessing(false);
    }
  }, []);

  return {
    editText,
    isProcessing,
    error
  };
};
