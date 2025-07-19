import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Moon, Star, Eye, Brain, Copy, Share2 } from 'lucide-react';
import { type DreamAnalysis } from '@/services/dreamInterpreter';
import { useToast } from '@/hooks/use-toast';
import ShareButtons from './ShareButtons';

interface DreamInterpretationProps {
  analysis: DreamAnalysis;
  onStartNew: () => void;
}

const DreamInterpretation: React.FC<DreamInterpretationProps> = ({ analysis, onStartNew }) => {
  const { interpretation, symbols, mood } = analysis;
  const { toast } = useToast();
  
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(interpretation);
      toast({ title: "Copied!", description: "Dream interpretation copied to clipboard" });
    } catch (err) {
      toast({ title: "Error", description: "Failed to copy text", variant: "destructive" });
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'My Dream Interpretation',
          text: interpretation
        });
      } catch (err) {
        console.log('Share cancelled');
      }
    } else {
      handleCopy();
    }
  };
  
  return (
    <Card className="w-full max-w-2xl mx-auto bg-white/10 backdrop-blur-md border-purple-300/30 mt-6">
      <CardHeader>
        <CardTitle className="text-2xl text-white flex items-center gap-2">
          <Brain className="text-blue-300" />
          AI Dream Interpretation
        </CardTitle>
        <p className="text-purple-200/80 text-sm flex items-center gap-1">
          <Eye className="w-4 h-4" />
          Powered by OpenAI GPT
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold text-purple-200 flex items-center gap-2">
              <Moon className="w-5 h-5" />
              AI Analysis
            </h3>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" onClick={handleCopy} className="bg-purple-600/20 border-purple-400/30 text-purple-200 hover:bg-purple-600/30">
                <Copy className="w-4 h-4 mr-1" />
                Copy
              </Button>
              <Button size="sm" variant="outline" onClick={handleShare} className="bg-blue-600/20 border-blue-400/30 text-blue-200 hover:bg-blue-600/30">
                <Share2 className="w-4 h-4 mr-1" />
                Share
              </Button>
            </div>
          </div>
          <p className="text-white/90 leading-relaxed bg-purple-900/20 p-4 rounded-lg border border-purple-400/20">
            {interpretation}
          </p>
        </div>
        
        {symbols && symbols.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold text-purple-200 mb-2 flex items-center gap-2">
              <Star className="w-5 h-5" />
              Identified Symbols
            </h3>
            <div className="flex flex-wrap gap-2">
              {symbols.map((symbol, index) => (
                <Badge key={index} variant="secondary" className="bg-purple-600/30 text-purple-100 border-purple-400/30 text-xs">
                  {symbol}
                </Badge>
              ))}
            </div>
          </div>
        )}
        
        <div>
          <h3 className="text-lg font-semibold text-purple-200 mb-2">Emotional Tone</h3>
          <Badge className="bg-red-600/30 text-red-100 border-red-400/30">
            {mood || 'Blood Moon Mystery'}
          </Badge>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold text-purple-200 mb-2">Share Your Dream</h3>
          <ShareButtons interpretation={interpretation} />
        </div>
        
        <div className="mt-4 p-3 bg-indigo-900/20 rounded-lg border border-indigo-400/20">
          <p className="text-indigo-200 text-xs">
            💡 This interpretation is powered by OpenAI's advanced language model, providing personalized insights into your dream's meaning.
          </p>
        </div>
        
        <div className="pt-4 border-t border-purple-400/20">
          <Button 
            onClick={onStartNew} 
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
          >
            Start New Dream Interpretation
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default DreamInterpretation;