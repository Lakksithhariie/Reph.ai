import React, { useState, useCallback, useRef, useEffect } from 'react';
import Groq from "groq-sdk";
// CORRECTED IMPORTS:
import { TextArea } from "./src/components/TextArea";
import { Button } from "./src/components/Button";

const TONES = ['Standard', 'Casual', 'Professional', 'Witty', 'Empathetic', 'Assertive'];

// Initialize Groq SDK (Client-side)
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY, 
  dangerouslyAllowBrowser: true 
});

export default function App() {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [selectedTone, setSelectedTone] = useState('Standard');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Focus input on mount
  const inputRef = useRef<HTMLTextAreaElement>(null);
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleConvert = useCallback(async () => {
    if (!inputText.trim()) return;

    setIsLoading(true);
    setError(null);
    
    try {
      const prompt = `
        You are an expert human writer and editor. Your task is to rewrite the provided text to sound completely natural, human, and engaging, removing all traces of robotic or AI-generated patterns.
        
        Target Tone: ${selectedTone}
        
        Strict Instructions:
        1. Maintain the original meaning but drastically improve flow, vocabulary, and sentence structure.
        2. Avoid repetitive sentence starts and stiff transitions.
        3. Do not output explanations, preambles, or conversational filler (like "Here is the text"). 
        4. Output ONLY the rewritten content.
        
        Original Text:
        ${inputText}
      `;

      const completion = await groq.chat.completions.create({
        model: "openai/gpt-oss-120b",
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
      });

      const result = completion.choices[0]?.message?.content || "No output generated.";
      setOutputText(result);

    } catch (err: any) {
      setError("Error: " + (err.message || "Connection failure or API Key missing."));
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [inputText, selectedTone]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
      e.preventDefault();
      handleConvert();
    }
  };

  const handleCopy = () => {
    if (!outputText) return;
    navigator.clipboard.writeText(outputText);
    alert("Text copied to clipboard!");
  };

  const handleClear = () => {
    setInputText('');
    setOutputText('');
    setError(null);
    if(inputRef.current) inputRef.current.focus();
  };

  return (
    <div className="min-h-screen p-2 sm:p-8 flex items-center justify-center">
      
      {/* Main Window */}
      <div className="w-full max-w-5xl bg-[#c0c0c0] border-[3px] border-t-white border-l-white border-r-black border-b-black shadow-2xl flex flex-col">
        
        {/* Title Bar */}
        <div className="bg-[#000080] px-2 py-1 flex justify-between items-center select-none">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-white rounded-sm relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-300 to-blue-600 opacity-50"></div>
            </div> 
            <span className="text-white font-bold tracking-wide text-sm font-sans">Humanizer AI - v1.1 (Groq Edition)</span>
          </div>
          <div className="flex space-x-1">
             <button className="w-5 h-5 bg-[#c0c0c0] border-2 border-t-white border-l-white border-r-black border-b-black text-[10px] font-bold flex items-center justify-center leading-none active:border-t-black active:border-l-black active:border-r-white active:border-b-white">_</button>
             <button className="w-5 h-5 bg-[#c0c0c0] border-2 border-t-white border-l-white border-r-black border-b-black text-[10px] font-bold flex items-center justify-center leading-none active:border-t-black active:border-l-black active:border-r-white active:border-b-white">□</button>
             <button className="w-5 h-5 bg-[#c0c0c0] border-2 border-t-white border-l-white border-r-black border-b-black text-[10px] font-bold flex items-center justify-center leading-none active:border-t-black active:border-l-black active:border-r-white active:border-b-white">×</button>
          </div>
        </div>

        {/* Menu Bar */}
        <div className="flex space-x-4 px-3 py-1 text-sm border-b border-[#808080] shadow-sm bg-[#c0c0c0]">
          <span className="underline cursor-pointer hover:bg-[#000080] hover:text-white px-1">F</span>ile
          <span className="underline cursor-pointer hover:bg-[#000080] hover:text-white px-1">E</span>dit
          <span className="underline cursor-pointer hover:bg-[#000080] hover:text-white px-1">V</span>iew
          <span className="underline cursor-pointer hover:bg-[#000080] hover:text-white px-1">H</span>elp
        </div>

        {/* Toolbar (Tone Selector) */}
        <div className="flex items-center space-x-2 px-3 py-2 border-b border-white bg-[#c0c0c0] shadow-sm">
          <span className="text-sm">Tone:</span>
          <select 
            value={selectedTone}
            onChange={(e) => setSelectedTone(e.target.value)}
            className="text-sm h-6 min-w-[140px] border-2 border-t-[#808080] border-l-[#808080] border-r-white border-b-white bg-white focus:outline-none"
          >
            {TONES.map(tone => (
              <option key={tone} value={tone}>{tone}</option>
            ))}
          </select>
          <div className="h-5 w-[1px] bg-[#808080] border-r border-white mx-2"></div>
          <span className="text-xs text-gray-600 italic">Select a human personality</span>
        </div>

        {/* Content Area */}
        <div className="p-4 space-y-4">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Left: Input */}
            <div className="flex flex-col space-y-1">
              <label className="text-sm font-bold truncate">Input Text (Raw):</label>
              <TextArea
                ref={inputRef}
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type or paste robotic text here..."
                disabled={isLoading}
                className="h-64 md:h-80"
              />
            </div>

            {/* Right: Output */}
            <div className="flex flex-col space-y-1">
              <label className="text-sm font-bold truncate">Output (Humanized - {selectedTone}):</label>
              <TextArea
                readOnly
                value={outputText}
                placeholder="Waiting for input..."
                className={`h-64 md:h-80 ${isLoading ? 'bg-gray-100' : 'bg-white'}`}
              />
            </div>

          </div>

          {/* Controls */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-2 border-t border-[#808080] mt-2">
            
            <div className="text-xs text-gray-600 border border-[#808080] border-b-white border-r-white p-1 w-full sm:w-auto bg-[#c0c0c0] inset-border px-2 shadow-inner">
              Status: {isLoading ? 'Processing...' : error ? 'Error' : 'Ready'}
            </div>

            <div className="flex space-x-4">
              <Button onClick={handleClear} variant="secondary">
                Clear All
              </Button>
              <Button
                onClick={handleConvert}
                disabled={!inputText.trim() || isLoading}
                variant="primary"
                className="px-8 font-bold"
              >
                {isLoading ? 'Working...' : 'Convert Text'}
              </Button>
              {outputText && (
                <Button onClick={handleCopy} variant="secondary">
                  Copy
                </Button>
              )}
            </div>
          </div>

          {error && (
            <div className="bg-[#c0c0c0] p-2 border-2 border-red-500 text-red-600 font-bold text-center text-sm">
              ! {error}
            </div>
          )}

        </div>

        {/* Status Bar Footer */}
        <div className="mt-auto border-t border-[#808080] p-1 bg-[#c0c0c0] flex justify-between text-xs text-gray-800">
          <span>Groq driver loaded. Model: openai/gpt-oss-120b</span>
          <div className="flex space-x-1">
             <span className="border border-[#808080] border-b-white border-r-white px-2 bg-[#c0c0c0] shadow-inner text-gray-400">NUM</span>
             <span className="border border-[#808080] border-b-white border-r-white px-2 bg-[#c0c0c0] shadow-inner">CAPS</span>
          </div>
        </div>

      </div>
    </div>
  );
}