import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2, Moon } from 'lucide-react';

const LoadingMessage: React.FC = () => {
  return (
    <Card className="w-full max-w-2xl mx-auto bg-white/10 backdrop-blur-md border-purple-300/30 mt-6">
      <CardContent className="p-6 text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Loader2 className="w-6 h-6 text-purple-300 animate-spin" />
          <Moon className="w-6 h-6 text-yellow-300" />
        </div>
        <h3 className="text-lg font-semibold text-white mb-2">
          Your dream is being interpreted. This may take a few moments.
        </h3>
        <div className="mt-6 p-4 bg-gray-800/50 rounded-lg border border-gray-600/30">
          <p className="text-gray-300 text-sm mb-2">Advertisement</p>
          <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 p-6 rounded border border-purple-400/30">
            <p className="text-white font-medium">Placeholder Ad Space</p>
            <p className="text-purple-200 text-xs mt-1">Your ad could be here</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LoadingMessage;