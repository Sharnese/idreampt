// src/pages/AppLayout.tsx
import React, { useState } from 'react';
import StarryBackground from './StarryBackground';
import DreamInput from './DreamInput';
import DreamInterpretation from './DreamInterpretation';
import LoadingMessage from './LoadingMessage';
import AdPlaceholder from './AdPlaceholder';
import { interpretDream, type DreamAnalysis } from '../services/dreamInterpreter';
import { supabase } from "@/lib/supabase";
import { Moon, Stars } from 'lucide-react';
import { useNavigate } from "react-router-dom";  // ✅ NEW

type AppState = 'input' | 'loading' | 'ad' | 'result' | 'error';

const AppLayout: React.FC = () => {
  const [interpretation, setInterpretation] = useState<DreamAnalysis | null>(null);
  const [appState, setAppState] = useState<AppState>('input');
  const [error, setError] = useState<string | null>(null);
  const [dreamText, setDreamText] = useState('');
  const navigate = useNavigate(); // ✅ NEW

  const handleDreamSubmit = async (dreamText: string) => {
    setAppState('loading');
    setError(null);
    setInterpretation(null);
    setDreamText(dreamText);

    try {
      // 1️⃣ Get logged-in user
      const { data: userData, error: userError } = await supabase.auth.getUser();
      if (userError || !userData.user) {
        console.error("User not signed in – dream will not be saved.");
      }
      const user = userData?.user;

      // 2️⃣ Start AI interpretation
      const interpretationPromise = interpretDream(dreamText);

      // Show the ad after 1 second
      setTimeout(() => {
        setAppState('ad');
      }, 1000);

      // 3️⃣ Wait for the AI's interpretation
      const result = await interpretationPromise;

      // 4️⃣ Save the dream + interpretation to Supabase
      if (user) {
        const { error: insertError } = await supabase
          .from("dreams")
          .insert({
            user_id: user.id,
            dream_text: dreamText,
            interpretation:
              (result as any)?.fullText ||
              (result as any)?.interpretation ||
              JSON.stringify(result),
          });

        if (insertError) {
          console.error("Error saving dream:", insertError);
        }
      }

      // 5️⃣ After the 10-second ad, show result
      setTimeout(() => {
        setInterpretation(result);
        setAppState('result');
      }, 10000);

    } catch (err) {
      console.error(err);
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
        {/* 🔙 Back to Dashboard */}
        <button
          onClick={() => navigate("/dashboard")}
          className="absolute top-4 left-4 z-20 inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-[11px] bg-black/60 border border-white/20 text-purple-100 hover:bg-black/80 transition"
        >
          ← Back to Dashboard
        </button>

        {/* Header */}
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

        {/* Main */}
        <main className="flex-1 px-4 pb-8">
          <div className="max-w-4xl mx-auto space-y-8">
            <DreamInput 
              onSubmit={handleDreamSubmit} 
              isLoading={appState !== 'input'} 
              initialValue={dreamText} 
            />

            {appState === 'loading' && <LoadingMessage />}
            {appState === 'ad' && <AdPlaceholder />}

            {appState === 'error' && (
              <div className="text-center p-4 bg-red-900/20 border border-red-400/30 rounded-lg">
                <p className="text-red-300">{error}</p>
              </div>
            )}

            {appState === 'result' && interpretation && (
              <DreamInterpretation 
                analysis={interpretation} 
                onStartNew={handleStartNew} 
              />
            )}
          </div>
        </main>

        {/* Footer */}
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

