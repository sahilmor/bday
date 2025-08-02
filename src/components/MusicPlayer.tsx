import { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, List } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

// Sample playlist - replace with actual music files
const playlist = [
  {
    id: 1,
    title: "Happy Birthday Song",
    artist: "Birthday Special",
    duration: "2:30",
    // Using a placeholder audio URL - replace with actual music files
    src: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav"
  },
  {
    id: 2,
    title: "Celebration",
    artist: "Kool & The Gang",
    duration: "3:45",
    src: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav"
  },
  {
    id: 3,
    title: "Dancing Queen",
    artist: "ABBA",
    duration: "3:52",
    src: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav"
  },
  {
    id: 4,
    title: "Good Vibes",
    artist: "Artist Name",
    duration: "4:15",
    src: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav"
  }
];

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [showPlaylist, setShowPlaylist] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Auto-start music when component mounts
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.3; // Set initial volume
      // Note: Auto-play might be blocked by browser policies
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
          })
          .catch(() => {
            // Auto-play was prevented, user will need to click play
            console.log("Auto-play was prevented");
          });
      }
    }
  }, []);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const nextTrack = () => {
    const next = (currentTrack + 1) % playlist.length;
    setCurrentTrack(next);
    setIsPlaying(true);
  };

  const prevTrack = () => {
    const prev = currentTrack === 0 ? playlist.length - 1 : currentTrack - 1;
    setCurrentTrack(prev);
    setIsPlaying(true);
  };

  const selectTrack = (index: number) => {
    setCurrentTrack(index);
    setIsPlaying(true);
    setShowPlaylist(false);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      const updateTime = () => setCurrentTime(audio.currentTime);
      const updateDuration = () => setDuration(audio.duration);
      
      audio.addEventListener('timeupdate', updateTime);
      audio.addEventListener('loadedmetadata', updateDuration);
      audio.addEventListener('ended', nextTrack);

      return () => {
        audio.removeEventListener('timeupdate', updateTime);
        audio.removeEventListener('loadedmetadata', updateDuration);
        audio.removeEventListener('ended', nextTrack);
      };
    }
  }, [currentTrack]);

  const currentSong = playlist[currentTrack];

  return (
    <div className="flex flex-col items-center justify-center h-full p-8 relative">
      {/* Hidden audio element */}
      <audio
        ref={audioRef}
        src={currentSong.src}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />

      {/* Main Music Player */}
      <Card className="bg-card/90 backdrop-blur-md shadow-music border-birthday-purple/30 p-8 rounded-3xl max-w-sm w-full">
        {/* Rotating Disc */}
        <div className="flex justify-center mb-8">
          <div 
            className={`music-disc w-48 h-48 flex items-center justify-center relative overflow-hidden ${
              isPlaying ? 'animate-spin-slow' : ''
            }`}
          >
            <div className="absolute inset-4 bg-card rounded-full flex items-center justify-center">
              <div className="w-8 h-8 bg-birthday-gold rounded-full shadow-glow"></div>
            </div>
            <div className="absolute inset-8 bg-gradient-to-br from-birthday-pink/30 to-birthday-purple/30 rounded-full"></div>
          </div>
        </div>

        {/* Song Info */}
        <div className="text-center mb-6">
          <h3 className="text-xl font-bold birthday-text mb-1">
            {currentSong.title}
          </h3>
          <p className="text-muted-foreground text-sm">{currentSong.artist}</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="w-full bg-muted rounded-full h-2 mb-2">
            <div 
              className="bg-birthday-pink h-2 rounded-full transition-all duration-300"
              style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>{formatTime(currentTime)}</span>
            <span>{currentSong.duration}</span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center space-x-6 mb-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={prevTrack}
            className="text-birthday-purple hover:text-birthday-pink hover:bg-birthday-light"
          >
            <SkipBack className="h-5 w-5" />
          </Button>
          
          <Button
            onClick={togglePlay}
            className="w-14 h-14 rounded-full bg-birthday-pink hover:bg-birthday-purple shadow-music"
          >
            {isPlaying ? (
              <Pause className="h-6 w-6 text-white" />
            ) : (
              <Play className="h-6 w-6 text-white ml-1" />
            )}
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={nextTrack}
            className="text-birthday-purple hover:text-birthday-pink hover:bg-birthday-light"
          >
            <SkipForward className="h-5 w-5" />
          </Button>
        </div>

        {/* Volume and Playlist Toggle */}
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            size="icon"
            className="text-birthday-purple hover:text-birthday-pink"
          >
            <Volume2 className="h-4 w-4" />
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowPlaylist(!showPlaylist)}
            className="text-birthday-purple hover:text-birthday-pink"
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </Card>

      {/* Playlist Sidebar */}
      <div 
        className={`absolute right-0 top-0 h-full bg-card/95 backdrop-blur-md border-l border-birthday-purple/30 transition-all duration-300 overflow-hidden shadow-music ${
          showPlaylist ? 'w-80 opacity-100' : 'w-0 opacity-0'
        }`}
        onMouseEnter={() => setShowPlaylist(true)}
        onMouseLeave={() => setShowPlaylist(false)}
      >
        <div className="p-6">
          <h3 className="text-lg font-bold birthday-text mb-4">Playlist 🎵</h3>
          <div className="space-y-2">
            {playlist.map((song, index) => (
              <div
                key={song.id}
                onClick={() => selectTrack(index)}
                className={`p-3 rounded-lg cursor-pointer transition-all hover:bg-birthday-light ${
                  index === currentTrack 
                    ? 'bg-birthday-pink/20 border border-birthday-pink/30' 
                    : 'hover:bg-birthday-light'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-sm">{song.title}</p>
                    <p className="text-xs text-muted-foreground">{song.artist}</p>
                  </div>
                  <span className="text-xs text-muted-foreground">{song.duration}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;