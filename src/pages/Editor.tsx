import React, { useState, useEffect } from 'react';
import { EditorState } from '../types';
import { IntentSelector } from '../components/editor/IntentSelector';
import { TextInput } from '../components/editor/TextInput';
import { SubmitButton } from '../components/editor/SubmitButton';
import { ResultView } from '../components/editor/ResultView';
import { UsageGate } from '../components/editor/UsageGate';
import { useGroqAPI } from '../hooks/useGroqAPI';
import { useAuth } from '../hooks/useAuth';
import { useUsageLimit } from '../hooks/useUsageLimit';
import { VALIDATION, ERROR_MESSAGES } from '../config/constants';

interface EditorProps {
  onNavigate: (path: string) => void;
}

export const Editor: React.FC<EditorProps> = ({ onNavigate }) => {
  const { user, isAuthenticated, logout } = useAuth();
  const { editText, isProcessing, error } = useGroqAPI();
  const { remaining, isExhausted, decrementUsage } = useUsageLimit(
    user?.isPro || false,
    isAuthenticated
  );

  const [state, setState] = useState<EditorState>({
    originalText: '',
    editedText: '',
    selectedIntent: null,
    isProcessing: false,
    error: null,
    intentPreserved: false,
    riskDetected: false
  });

  // Restore text from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('reph_last_text');
    if (saved) {
      setState(prev => ({ ...prev, originalText: saved }));
    }
  }, []);

  // Save text to localStorage
  useEffect(() => {
    if (state.originalText) {
      localStorage.setItem('reph_last_text', state.originalText);
    }
  }, [state.originalText]);

  const handleSubmit = async () => {
    if (!state.selectedIntent) {
      setState(prev => ({ ...prev, error: ERROR_MESSAGES.NO_INTENT }));
      return;
    }

    if (state.originalText.length < VALIDATION.MIN_CHARS) {
      setState(prev => ({ ...prev, error: ERROR_MESSAGES.TEXT_TOO_SHORT }));
      return;
    }

    if (state.originalText.length > VALIDATION.MAX_CHARS) {
      setState(prev => ({ ...prev, error: ERROR_MESSAGES.TEXT_TOO_LONG }));
      return;
    }

    if (isExhausted) {
      return;
    }

    try {
      setState(prev => ({ ...prev, error: null, isProcessing: true }));

      const result = await editText(state.originalText, state.selectedIntent);

      setState(prev => ({
        ...prev,
        editedText: result.editedText,
        intentPreserved: result.intentPreserved,
        riskDetected: !result.intentPreserved || result.confidence < 0.7,
        isProcessing: false
      }));

      decrementUsage();
    } catch (err) {
      setState(prev => ({
        ...prev,
        error: err instanceof Error ? err.message : ERROR_MESSAGES.API_ERROR,
        isProcessing: false
      }));
    }
  };

  const handleCopy = async () => {
    if (state.editedText) {
      await navigator.clipboard.writeText(state.editedText);
      alert('Copied to clipboard!');
    }
  };

  const handleNewEdit = () => {
    setState({
      originalText: '',
      editedText: '',
      selectedIntent: null,
      isProcessing: false,
      error: null,
      intentPreserved: false,
      riskDetected: false
    });
    localStorage.removeItem('reph_last_text');
  };

  const canSubmit = 
    state.selectedIntent !== null &&
    state.originalText.length >= VALIDATION.MIN_CHARS &&
    state.originalText.length <= VALIDATION.MAX_CHARS &&
    !isProcessing &&
    !isExhausted;

  return (
    <div className="min-h-screen bg-white">
      {/* Header/Nav */}
      <header className="border-b border-gray-200 bg-white sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <button
              onClick={() => onNavigate('/')}
              className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
            >
              <div className="w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center">
                <span className="text-white text-lg font-bold">R</span>
              </div>
              <span className="text-xl font-semibold text-gray-900">Reph.ai</span>
            </button>
            
            <div className="flex items-center space-x-4">
              {!user?.isPro && (
                <div className="hidden sm:flex items-center px-3 py-1.5 rounded-lg bg-gray-50 border border-gray-200">
                  <span className="text-gray-700 text-sm">
                    {remaining} {remaining === 1 ? 'edit' : 'edits'} left
                  </span>
                </div>
              )}
              
              {isAuthenticated ? (
                <>
                  <span className="text-sm text-gray-600 hidden sm:inline">
                    {user?.email}
                  </span>
                  {!user?.isPro && (
                    <button
                      onClick={() => onNavigate('/pricing')}
                      className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
                    >
                      Upgrade
                    </button>
                  )}
                  <button
                    onClick={logout}
                    className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    Sign out
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => onNavigate('/login')}
                    className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    Sign in
                  </button>
                  <button
                    onClick={() => onNavigate('/signup')}
                    className="text-sm font-medium px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
                  >
                    Sign up
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Intent-Safe Editor
          </h1>
          <p className="text-gray-600">
            Fix grammar and clarity without changing your meaning
          </p>
        </div>

        {/* Editor Section */}
        {!state.editedText ? (
          <div className="space-y-6">
            {/* Intent Selector */}
            <IntentSelector
              selectedIntent={state.selectedIntent}
              onChange={(intent) => setState(prev => ({ ...prev, selectedIntent: intent }))}
              disabled={isProcessing}
            />

            {/* Text Input */}
            <TextInput
              value={state.originalText}
              onChange={(text) => setState(prev => ({ ...prev, originalText: text }))}
              disabled={isProcessing}
            />

            {/* Error Message */}
            {(state.error || error) && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-start">
                  <svg className="w-5 h-5 text-red-600 mt-0.5 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm text-red-800">
                    {state.error || error}
                  </span>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <SubmitButton
              onClick={handleSubmit}
              disabled={!canSubmit}
              isProcessing={isProcessing}
              intentSelected={state.selectedIntent !== null}
            />
          </div>
        ) : (
          <div className="space-y-6">
            {/* Results */}
            <ResultView
              originalText={state.originalText}
              editedText={state.editedText}
              intentPreserved={state.intentPreserved}
              riskDetected={state.riskDetected}
              onCopy={handleCopy}
            />

            {/* Action Buttons */}
            <div className="flex justify-center space-x-4">
              <button
                onClick={handleNewEdit}
                className="px-6 py-2.5 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors"
              >
                New edit
              </button>
              
              {!user?.isPro && !isExhausted && (
                <button
                  onClick={() => onNavigate('/pricing')}
                  className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                >
                  Upgrade for unlimited
                </button>
              )}
            </div>
          </div>
        )}
      </main>

      {/* Usage Gate Modal */}
      {isExhausted && (
        <UsageGate
          remaining={remaining}
          isExhausted={isExhausted}
          onUpgrade={() => onNavigate('/pricing')}
          onSignup={() => onNavigate('/signup')}
          isAuthenticated={isAuthenticated}
        />
      )}
    </div>
  );
};
