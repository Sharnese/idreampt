import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Sparkles, Brain } from 'lucide-react';

interface DreamInputProps {
  onSubmit: (dream: string) => void;
  isLoading: boolean;
  initialValue?: string;
}

const DreamInput: React.FC<DreamInputProps> = ({ onSubmit, isLoading, initialValue = '' }) => {
  const [dream, setDream] = useState(initialValue);

  useEffect(() => {
    setDream(initialValue);
  }, [initialValue]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (dream.trim()) {
      onSubmit(dream.trim());
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto bg-white/10 backdrop-blur-md border-purple-300/30">
      <CardHeader>
        <CardTitle className="text-2xl text-white flex items-center gap-2">
          <Sparkles className="text-yellow-300" />
          Tell Me Your Dream
        </CardTitle>
        <p className="text-purple-200/80 text-sm flex items-center gap-1">
          <Brain className="w-4 h-4" />
          AI-powered dream analysis using advanced interpretation techniques
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Textarea
            value={dream}
            onChange={(e) => setDream(e.target.value)}
            placeholder="Describe your dream in detail... Include emotions, colors, people, places, and any symbols you remember."
            className="min-h-32 bg-white/20 border-purple-300/30 text-white placeholder:text-gray-300 focus:border-purple-400/50"
            disabled={isLoading}
          />
          <div className="flex flex-col gap-2">
            <Button
              type="submit"
              disabled={!dream.trim() || isLoading}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <Brain className="w-4 h-4 mr-2 animate-pulse" />
                  AI is analyzing your dream...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 mr-2" />
                  Get AI Dream Interpretation
                </>
              )}
            </Button>
            {isLoading && (
              <p className="text-purple-200/60 text-xs text-center">
                Using advanced AI to analyze symbols, emotions, and meanings...
              </p>
            )}
          </div>
        </form>
        
        <div className="mt-4 p-3 bg-yellow-900/20 rounded-lg border border-yellow-400/20">
          <p className="text-yellow-200 text-xs">
            💡 Tip: The more details you provide, the more accurate your AI interpretation will be!
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default DreamInput;