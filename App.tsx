import React, { useState, useCallback, useRef, useEffect } from 'react';
import { TextArea } from './src/components/TextArea';
import { Button } from './src/components/Button';
import { ModelSelector } from './src/components/ModelSelector';
import { useGroqAPI } from './src/hooks/useGroqAPI';
import { validateInput } from './src/utils/validation';
import { TONES, MODEL_TIERS } from './src/config/constants';
import type { ToneType } from './src/types';

export default function App() {
  const [inputText, setInputText] = useState('');
  const [selectedTone, setSelectedTone] = useState<ToneType>('Standard');
  const [selectedModel, setSelectedModel] = useState(MODEL_TIERS[0].models[0].id);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [copySuccess, setCopySuccess] = useState(false);

  const inputRef = useRef<HTMLTextAreaElement>(null);
  const { isLoading, error: apiError, output, convertText, reset } = useGroqAPI();

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
        e.preventDefault();
        handleConvert();
      }
      if (e.key === 'Escape') {
        e.preventDefault();
        handleClear();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [inputText, selectedTone, output]);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    setInputText(newText);
    setValidationError(null);
    setCopySuccess(false);
  };

  const handleConvert = useCallback(async () => {
    const validation = validateInput(inputText);

    if (!validation.isValid) {
      setValidationError(validation.error);
      return;
    }

    setValidationError(null);
    await convertText(inputText, selectedTone, selectedModel);
  }, [inputText, selectedTone, selectedModel, convertText]);

  const handleCopy = useCallback(async () => {
    if (!output) return;

    try {
      await navigator.clipboard.writeText(output);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  }, [output]);

  const handleClear = useCallback(() => {
    setInputText('');
    setValidationError(null);
    setCopySuccess(false);
    reset();
    inputRef.current?.focus();
  }, [reset]);

  const validation = validateInput(inputText);
  const canConvert = validation.isValid && !isLoading;
  const displayError = validationError || apiError?.message || null;

  // Get current time
  const [currentTime, setCurrentTime] = useState(new Date());
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1c1c1c] via-[#2a2a2a] to-[#1c1c1c] p-4 flex items-center justify-center">
      {/* iPhone-style Container */}
      <div className="w-full max-w-4xl">
        {/* Status Bar */}
        <div className="bg-gradient-to-b from-[#2d2d2d] to-[#1a1a1a] rounded-t-2xl px-4 py-2 flex justify-between items-center text-white text-xs shadow-lg border-b border-gray-700">
          <div className="flex items-center space-x-2">
            <div className="flex space-x-1">
              {[...Array(4)].map((_, i) => (
                <div key={i} className={`w-1 h-3 rounded-sm ${i < 3 ? 'bg-white' : 'bg-gray-500'}`}></div>
              ))}
            </div>
            <span className="font-medium">Carrier</span>
          </div>
          <div className="font-bold tracking-wide">
            {currentTime.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}
          </div>
          <div className="flex items-center space-x-2">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
            </svg>
            <span>100%</span>
          </div>
        </div>

        {/* Main App Container */}
        <div className="bg-gradient-to-b from-[#c5ccd3] to-[#8b9aa8] rounded-b-2xl shadow-2xl overflow-hidden">
          
          {/* Header */}
          <div className="bg-gradient-to-b from-[#6d84a1] via-[#5b7390] to-[#4a5f7a] px-4 py-3 text-center shadow-lg">
            <div className="flex items-center justify-center space-x-2 mb-1">
              <div className="w-8 h-8 bg-gradient-to-b from-[#4a90e2] to-[#2e5c8a] rounded-lg flex items-center justify-center shadow-md">
                <span className="text-white text-xl">✨</span>
              </div>
              <h1 className="text-white text-xl font-bold tracking-tight drop-shadow-md">
                Reph.ai
              </h1>
            </div>
            <p className="text-white/80 text-xs font-medium">AI Text Humanizer</p>
          </div>

          {/* Content Area */}
          <div className="p-4 space-y-4">
            
            {/* Settings Panel */}
            <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden border border-gray-300">
              <div className="bg-gradient-to-b from-[#f7f7f7] to-[#e0e0e0] border-b border-gray-300">
                <div className="px-4 py-2">
                  <label className="text-gray-700 text-sm font-semibold">Tone</label>
                </div>
              </div>
              <div className="p-3">
                <select
                  value={selectedTone}
                  onChange={(e) => setSelectedTone(e.target.value as ToneType)}
                  className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-800 text-sm font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                  disabled={isLoading}
                >
                  {TONES.map(tone => (
                    <option key={tone} value={tone}>{tone}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Model Selector Panel */}
            <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden border border-gray-300">
              <div className="bg-gradient-to-b from-[#f7f7f7] to-[#e0e0e0] border-b border-gray-300">
                <div className="px-4 py-2">
                  <label className="text-gray-700 text-sm font-semibold">AI Model</label>
                </div>
              </div>
              <div className="p-3">
                <ModelSelector
                  selectedModel={selectedModel}
                  onModelChange={setSelectedModel}
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* Text Areas */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* Input */}
              <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden border border-gray-300">
                <div className="bg-gradient-to-b from-[#f7f7f7] to-[#e0e0e0] border-b border-gray-300 px-4 py-2">
                  <h3 className="text-gray-700 text-sm font-semibold">Input Text</h3>
                </div>
                <div className="p-3">
                  <TextArea
                    ref={inputRef}
                    value={inputText}
                    onChange={handleInputChange}
                    placeholder="Type or paste your AI-generated text here..."
                    disabled={isLoading}
                    className="h-48 lg:h-64"
                    showCharCount={true}
                    currentCount={validation.characterCount}
                    maxCount={8000}
                    isNearLimit={validation.isNearLimit}
                  />
                </div>
              </div>

              {/* Output */}
              <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden border border-gray-300">
                <div className="bg-gradient-to-b from-[#f7f7f7] to-[#e0e0e0] border-b border-gray-300 px-4 py-2">
                  <h3 className="text-gray-700 text-sm font-semibold">Humanized Text</h3>
                </div>
                <div className="p-3">
                  <TextArea
                    readOnly
                    value={output}
                    placeholder={isLoading ? 'Processing...' : 'Your humanized text will appear here...'}
                    className={`h-48 lg:h-64 ${isLoading ? 'animate-pulse' : ''}`}
                  />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
              <Button
                onClick={handleConvert}
                disabled={!canConvert}
                variant="primary"
                className="w-full sm:w-auto"
              >
                {isLoading ? 'Converting...' : 'Humanize Text'}
              </Button>
              
              {output && (
                <Button
                  onClick={handleCopy}
                  variant="secondary"
                  className="w-full sm:w-auto"
                >
                  {copySuccess ? '✓ Copied!' : 'Copy Output'}
                </Button>
              )}
              
              <Button
                onClick={handleClear}
                variant="secondary"
                className="w-full sm:w-auto"
              >
                Clear All
              </Button>
            </div>

            {/* Status Message */}
            {(displayError || copySuccess || isLoading) && (
              <div className={`rounded-xl p-3 text-center text-sm font-medium shadow-lg ${
                displayError 
                  ? 'bg-gradient-to-b from-red-100 to-red-200 text-red-800 border border-red-300' 
                  : copySuccess 
                  ? 'bg-gradient-to-b from-green-100 to-green-200 text-green-800 border border-green-300'
                  : 'bg-gradient-to-b from-blue-100 to-blue-200 text-blue-800 border border-blue-300'
              }`}>
                {displayError ? `⚠️ ${displayError}` : copySuccess ? '✓ Copied to clipboard!' : '⏳ Processing...'}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="bg-gradient-to-b from-[#4a5f7a] to-[#3a4f6a] px-4 py-2 text-center border-t border-gray-700">
            <p className="text-white/70 text-xs">
              Powered by Groq • {validation.characterCount} characters
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
