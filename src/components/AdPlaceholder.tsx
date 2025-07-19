import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { ExternalLink } from 'lucide-react';

const AdPlaceholder: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState(10);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <Card className="bg-gradient-to-r from-purple-900/30 to-blue-900/30 border-purple-400/30 p-6 text-center">
      <div className="space-y-3">
        <div className="flex items-center justify-center gap-2">
          <ExternalLink className="w-5 h-5 text-purple-300" />
          <span className="text-sm text-purple-300/80 font-medium">Advertisement</span>
          <span className="text-xs text-purple-400/60 ml-2">({timeLeft}s)</span>
        </div>
        
        <div className="bg-purple-800/20 border border-purple-400/20 rounded-lg p-8">
          <div className="text-purple-200 space-y-2">
            <div className="text-lg font-semibold">Discover Your Dream Journal</div>
            <div className="text-sm text-purple-300/80">
              Track and analyze your dreams with our premium features
            </div>
            <div className="mt-4">
              <div className="inline-block bg-purple-600/30 text-purple-200 px-4 py-2 rounded-md text-sm border border-purple-400/30">
                Learn More
              </div>
            </div>
          </div>
        </div>
        
        <div className="text-xs text-purple-400/60">
          Your dream interpretation will appear in {timeLeft} seconds...
        </div>
      </div>
    </Card>
  );
};

export default AdPlaceholder;