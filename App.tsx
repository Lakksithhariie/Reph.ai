import React, { useState, useCallback, useRef, useEffect } from 'react';
import { TextArea } from './src/components/TextArea';
import { Button } from './src/components/Button';
import { ModelSelector } from './src/components/ModelSelector';
import { useGroqAPI } from './src/hooks/useGroqAPI';
import { validateInput } from './src/utils/validation';
import { TONES, MODEL_TIERS } from './src/config/constants';
import type { ToneType } from './src/types';  // ← Removed ModelTier from here

export default function App() {
  const [inputText, setInputText] = useState('');
  const [selectedTone, setSelectedTone] = useState<ToneType>('Standard');
  const [selectedModel, setSelectedModel] = useState(MODEL_TIERS[0].models[0].id);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [copySuccess, setCopySuccess] = useState(false);

  const inputRef = useRef<HTMLTextAreaElement>(null);
  const { isLoading, error: apiError, output, convertText, reset } = useGroqAPI();

  // Auto-focus input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Keyboard shortcuts
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
      if ((e.metaKey || e.ctrlKey) && e.shiftKey && e.key === 'c') {
        e.preventDefault();
        if (output) handleCopy();
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

  return (
    <div className="min-h-screen p-2 sm:p-4 flex items-center justify-center bg-[#1a1a1a]">
      {/* Nokia 1112 Style Window */}
      <div className="w-full max-w-6xl bg-[#e8e8d0] border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col font-mono">
        
        {/* Nokia Header Bar */}
        <div className="bg-black px-3 py-2 flex justify-between items-center border-b-4 border-black">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-[#e8e8d0] border-2 border-[#e8e8d0]"></div>
            <span className="text-[#e8e8d0] font-bold text-xs tracking-wider uppercase">
              REPH.AI v2.0
            </span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="flex space-x-1">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className={`w-1 h-3 border border-[#e8e8d0] ${i <= 3 ? 'bg-[#e8e8d0]' : ''}`}></div>
              ))}
            </div>
            <span className="text-[#e8e8d0] text-xs">⚡</span>
          </div>
        </div>

        {/* Nokia Menu Bar */}
        <div className="bg-[#d0d0b8] border-b-2 border-black px-2 py-1 text-xs flex space-x-4">
          <span className="text-black hover:bg-black hover:text-[#e8e8d0] px-1 cursor-pointer">OPTIONS</span>
          <span className="text-black hover:bg-black hover:text-[#e8e8d0] px-1 cursor-pointer">TOOLS</span>
          <span className="text-black hover:bg-black hover:text-[#e8e8d0] px-1 cursor-pointer">HELP</span>
        </div>

        {/* Control Panel */}
        <div className="bg-[#e8e8d0] border-b-2 border-black p-3 space-y-2">
          {/* Tone Selector */}
          <div className="flex items-center space-x-2">
            <label className="text-black text-xs font-bold min-w-[60px]">TONE:</label>
            <select
              value={selectedTone}
              onChange={(e) => setSelectedTone(e.target.value as ToneType)}
              className="flex-1 text-xs h-6 px-1 border-2 border-black bg-white text-black focus:outline-none focus:ring-2 focus:ring-black font-mono"
              disabled={isLoading}
            >
              {TONES.map(tone => (
                <option key={tone} value={tone}>{tone.toUpperCase()}</option>
              ))}
            </select>
          </div>

          {/* Model Selector */}
          <ModelSelector
            selectedModel={selectedModel}
            onModelChange={setSelectedModel}
            disabled={isLoading}
          />
        </div>

        {/* Content Area */}
        <div className="p-3 space-y-3 bg-[#e8e8d0]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
            
            {/* Left: Input */}
            <div className="flex flex-col space-y-1">
              <label className="text-black text-xs font-bold uppercase tracking-wide">
                ▶ INPUT TEXT:
              </label>
              <TextArea
                ref={inputRef}
                value={inputText}
                onChange={handleInputChange}
                placeholder="Paste AI-generated text here..."
                disabled={isLoading}
                className="h-64 md:h-80"
                showCharCount={true}
                currentCount={validation.characterCount}
                maxCount={8000}
                isNearLimit={validation.isNearLimit}
              />
            </div>

            {/* Right: Output */}
            <div className="flex flex-col space-y-1">
              <label className="text-black text-xs font-bold uppercase tracking-wide">
                ◀ OUTPUT ({selectedTone.toUpperCase()}):
              </label>
              <TextArea
                readOnly
                value={output}
                placeholder={isLoading ? '[ PROCESSING... ]' : '[ WAITING FOR INPUT ]'}
                className={`h-64 md:h-80 ${isLoading ? 'animate-pulse' : ''}`}
              />
            </div>
          </div>

          {/* Controls */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3 pt-2 border-t-2 border-black">
            
            {/* Status Display */}
            <div className="text-xs border-2 border-black p-2 w-full sm:w-auto bg-white font-mono min-h-[32px] flex items-center px-3">
              {isLoading ? (
                <span className="animate-pulse">⏳ PROCESSING...</span>
              ) : displayError ? (
                <span>⚠ {displayError.toUpperCase()}</span>
              ) : copySuccess ? (
                <span>✓ COPIED!</span>
              ) : output ? (
                <span>✓ READY</span>
              ) : (
                <span>● READY</span>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-2">
              <Button onClick={handleClear} variant="secondary">
                CLEAR
              </Button>
              <Button
                onClick={handleConvert}
                disabled={!canConvert}
                variant="primary"
              >
                {isLoading ? 'WAIT...' : 'CONVERT'}
              </Button>
              {output && (
                <Button onClick={handleCopy} variant="secondary">
                  {copySuccess ? '✓ OK' : 'COPY'}
                </Button>
              )}
            </div>
          </div>

          {/* Error Display */}
          {displayError && (
            <div className="bg-white border-4 border-black p-3 text-center text-xs font-bold">
              ⚠ ERROR: {displayError.toUpperCase()}
            </div>
          )}
        </div>

        {/* Nokia Status Bar Footer */}
        <div className="mt-auto bg-black p-2 flex justify-between text-[#e8e8d0] text-xs font-mono">
          <div className="flex items-center space-x-4">
            <span>GROQ</span>
            <span>•</span>
            <span className="truncate max-w-[200px]">{selectedModel.split('/').pop()?.toUpperCase()}</span>
          </div>
          <div className="flex items-center space-x-2">
            <span>{validation.characterCount} CH</span>
            <span className="animate-pulse">●</span>
          </div>
        </div>
      </div>
    </div>
  );
}
