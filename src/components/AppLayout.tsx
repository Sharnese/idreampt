import React, { useState } from 'react';
import StarryBackground from './StarryBackground';
import DreamInput from './DreamInput';
import DreamInterpretation from './DreamInterpretation';
import LoadingMessage from './LoadingMessage';
import AdPlaceholder from './AdPlaceholder';
import { interpretDream, type DreamAnalysis } from '../services/dreamInterpreter';

import { Moon, Stars } from 'lucide-react';
type AppState = 'input' | 'loading' | 'ad' | 'result' | 'error';

const AppLayout: React.FC = () => {
  const [interpretation, setInterpretation] = useState<DreamAnalysis | null>(null);
  const [appState, setAppState] = useState<AppState>('input');
  const [error, setError] = useState<string | null>(null);
  const [dreamText, setDreamText] = useState('');

  const handleDreamSubmit = async (dreamText: string) => {
    setAppState('loading');
    setError(null);
    setInterpretation(null);
    setDreamText(dreamText);

    try {
      // Start interpretation in background
      const interpretationPromise = interpretDream(dreamText);
      
      // Show ad for 10 seconds
      setTimeout(() => {
        setAppState('ad');
      }, 1000);
      
      // Wait for interpretation and show after ad period
      const result = await interpretationPromise;
      
      setTimeout(() => {
        setInterpretation(result);
        setAppState('result');
      }, 10000); // 10 seconds for ad
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to interpret dream');
      setAppState('error');
    }
  };

  const handleStartNew = () => {
    setInterpretation(null);
    setError(null);
    setDreamText('');
    setAppState('input');
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <StarryBackground />
      
      <div className="relative z-10 min-h-screen flex flex-col">
        <header className="text-center py-8 px-4">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Moon className="w-8 h-8 text-yellow-300" />
            <h1 className="text-4xl md:text-5xl font-bold text-white">
              iDreampt
            </h1>
            <Stars className="w-8 h-8 text-purple-300" />
          </div>
          <p className="text-purple-200/80 text-lg max-w-2xl mx-auto">
            Unlock the mysteries of your subconscious with AI-powered dream interpretation
          </p>
        </header>

        <main className="flex-1 px-4 pb-8">
          <div className="max-w-4xl mx-auto space-y-8">
            <DreamInput onSubmit={handleDreamSubmit} isLoading={appState !== 'input'} initialValue={dreamText} />
            
            {appState === 'loading' && <LoadingMessage />}
            
            {appState === 'ad' && <AdPlaceholder />}
            
            {appState === 'error' && (
              <div className="text-center p-4 bg-red-900/20 border border-red-400/30 rounded-lg">
                <p className="text-red-300">{error}</p>
              </div>
            )}
            
            {appState === 'result' && interpretation && (
              <DreamInterpretation analysis={interpretation} onStartNew={handleStartNew} />
            )}
          </div>
        </main>

        <footer className="text-center py-6 px-4">
          <p className="text-purple-300/60 text-sm">
            Powered by OpenAI • Your dreams hold the keys to understanding yourself
          </p>
        </footer>
      </div>
    </div>
  );
};

export default AppLayout;