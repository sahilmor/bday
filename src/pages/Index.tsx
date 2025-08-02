import BirthdayWishes from '@/components/BirthdayWishes';
import MusicPlayer from '@/components/MusicPlayer';

const Index = () => {
  return (
    <div className="min-h-screen flex">
      {/* Left Side - Birthday Wishes */}
      <div className="flex-1 relative overflow-hidden">
        <BirthdayWishes />
      </div>
      
      {/* Right Side - Music Player */}
      <div className="flex-1 relative">
        <MusicPlayer />
      </div>
    </div>
  );
};

export default Index;
