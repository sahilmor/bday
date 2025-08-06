import BirthdayWishes from '@/components/BirthdayWishes';
import MusicPlayer from '@/components/MusicPlayer';
import { BackgroundLines } from '@/components/ui/background-lines';

const Index = () => {
  return (
    <div className="min-h-screen">
      <div className="absolute top-10 left-10 text-birthday-gold text-2xl animate-sparkle">✨</div>
      <div className="absolute top-20 right-20 text-birthday-pink text-3xl animate-float">🎈</div>
      <div className="absolute bottom-20 left-20 text-birthday-purple text-2xl animate-sparkle">⭐</div>
      <div className="absolute bottom-10 right-10 text-birthday-gold text-3xl animate-float">🎂</div>
      {/* Left Side - Birthday Wishes */}

       <div className="flex h-screen">
        {/* Left Side with BackgroundLines */}
        <div className="flex-1 relative overflow-hidden">
          <BackgroundLines className="h-full w-full absolute inset-0 z-0">
            <div className="relative z-10 h-full w-full">
              <BirthdayWishes />
            </div>
          </BackgroundLines>
        </div>

        {/* Right Side - Music Player */}
        <div className="flex-1 relative">
          <MusicPlayer />
        </div>
      </div>
    </div>
  );
};

export default Index;
