import React from 'react';
import { Button } from '@/components/ui/button';
import { Copy, Link } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ShareButtonsProps {
  interpretation: string;
}

const ShareButtons: React.FC<ShareButtonsProps> = ({ interpretation }) => {
  const { toast } = useToast();
  
  const shareText = `Check out my dream interpretation: ${interpretation.substring(0, 100)}...`;
  const shareUrl = window.location.href;
  
  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      toast({ title: "Link Copied!", description: "Shareable link copied to clipboard" });
    } catch (err) {
      toast({ title: "Error", description: "Failed to copy link", variant: "destructive" });
    }
  };
  
  const handleTikTokShare = () => {
    const url = `https://www.tiktok.com/share?url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(shareText)}`;
    window.open(url, '_blank');
  };
  
  const handleInstagramShare = () => {
    // Instagram doesn't have direct URL sharing, so copy to clipboard
    navigator.clipboard.writeText(`${shareText} ${shareUrl}`);
    toast({ title: "Ready for Instagram!", description: "Text copied - paste in your Instagram story or post" });
  };
  
  const handleFacebookShare = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareText)}`;
    window.open(url, '_blank');
  };
  
  return (
    <div className="flex flex-wrap gap-2 mt-4">
      <Button size="sm" onClick={handleTikTokShare} className="bg-black hover:bg-gray-800 text-white">
        TikTok
      </Button>
      <Button size="sm" onClick={handleInstagramShare} className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white">
        Instagram
      </Button>
      <Button size="sm" onClick={handleFacebookShare} className="bg-blue-600 hover:bg-blue-700 text-white">
        Facebook
      </Button>
      <Button size="sm" variant="outline" onClick={handleCopyLink} className="bg-purple-600/20 border-purple-400/30 text-purple-200 hover:bg-purple-600/30">
        <Link className="w-4 h-4 mr-1" />
        Copy Link
      </Button>
    </div>
  );
};

export default ShareButtons;