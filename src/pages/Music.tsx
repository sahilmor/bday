import MusicPlayer from '@/components/MusicPlayer';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Music = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="p-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center space-x-4">
            <Button
              onClick={() => navigate('/')}
              variant="ghost"
              size="icon"
              className="text-birthday-purple hover:text-birthday-pink hover:bg-birthday-light"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-4xl font-bold birthday-text">
                Music Center 🎵
              </h1>
              <p className="text-muted-foreground mt-2">
                Your favorite tunes for the special day ✨
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Music Player */}
      <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
        <MusicPlayer />
      </div>

      {/* Floating decorations */}
      <div className="fixed top-20 left-10 text-birthday-pink text-3xl animate-float">🎼</div>
      <div className="fixed top-1/4 right-10 text-birthday-purple text-2xl animate-sparkle">🎤</div>
      <div className="fixed bottom-32 left-20 text-birthday-gold text-2xl animate-float">🎸</div>
    </div>
  );
};

export default Music;