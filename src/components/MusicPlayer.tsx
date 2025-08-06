import { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, List } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const playlist = [
  {
    id: 1,
    title: "All Too Well",
    artist: "Taylor Swift",
    duration: "10:13",
    src: "/music/ATW.mp3",
    image: "/images/atw.jpeg"
  },
  {
    id: 2,
    title: "August",
    artist: "Taylor Swift",
    duration: "4:25",
    src: "/music/August.mp3",
    image: "/images/august.jpg"
  },
  {
    id: 3,
    title: "Delicate",
    artist: "Taylor Swift",
    duration: "3:54",
    src: "/music/Delicate.mp3",
    image: "/images/delicate.jpg"
  },
  {
    id: 4,
    title: "Ik Kudi",
    artist: "Arpit Bala",
    duration: "3:49",
    src: "/music/kudi.mp3",
    image: "/images/kudi.jpg"
  },
  {
    id: 5,
    title: "Cornelia Street",
    artist: "Taylor Swift",
    duration: "4.49",
    src: "/music/Street.mp3",
    image: "/images/street.png"
  },
  {
    id: 5,
    title: "Laybrinth",
    artist: "Taylor Swift",
    duration: "4.08",
    src: "/music/laybrinth.mp3",
    image: "/images/labyrinth.jpg"
  }
];

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const currentSong = playlist[currentTrack];

  useEffect(() => {
  if (audioRef.current) {
    const tryPlay = () => {
      audioRef.current?.play().then(() => {
        setIsPlaying(true);
      }).catch((error) => {
        console.error("Autoplay failed:", error);
        setIsPlaying(false);
      });
    };

    const onLoaded = () => tryPlay();

    audioRef.current.addEventListener('loadedmetadata', onLoaded);
    audioRef.current.load();

    return () => {
      audioRef.current?.removeEventListener('loadedmetadata', onLoaded);
    };
  }
}, []);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const playAudio = () => {
    if (audioRef.current) {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const pauseAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const togglePlay = () => {
    isPlaying ? pauseAudio() : playAudio();
  };

  const nextTrack = () => {
    const next = (currentTrack + 1) % playlist.length;
    setCurrentTrack(next);
  };

  const prevTrack = () => {
    const prev = currentTrack === 0 ? playlist.length - 1 : currentTrack - 1;
    setCurrentTrack(prev);
  };

  const selectTrack = (index: number) => {
    setCurrentTrack(index);
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
  }, []);

  

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.load();
      playAudio();
    }
  }, [currentTrack]);

  return (
    <div className="relative flex items-center justify-center h-screen p-8 overflow-hidden">
      {/* Hidden Audio */}
      <audio
        ref={audioRef}
        src={currentSong.src}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />

      {/* Music Player Card */}
      <Card className="glass-card shadow-2xl rounded-3xl w-[450px] p-8 z-10 relative">
        {/* Rotating Disc */}
        <div className="flex justify-center">
          <div className="relative w-80 h-80 flex items-center justify-center">
            {/* Rotating disc as background */}
            <img
              src="/images/disc.png"
              alt="Disc"
              className={`w-80 h-80 rounded-full object-cover transition-transform duration-600 ${isPlaying ? 'animate-spin-very-slow' : ''
                }`}
            />

            {/* Song artwork in center of disc */}
            <img
              src={currentSong.image}
              alt={currentSong.title}
              className={`absolute w-32 h-32 rounded-full object-cover border-[3px] border-white shadow-lg ${isPlaying ? 'animate-spin-very-slow' : ''}`}
            />
          </div>
        </div>

        {/* Song Info */}
        <div className="text-center mb-6">
          <h3 className="text-xl font-bold">{currentSong.title}</h3>
          <p className="text-sm text-muted-foreground">{currentSong.artist}</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div
            className="w-full bg-gray-300/40 dark:bg-gray-600 rounded-full h-2 mb-2 relative cursor-pointer"
            onClick={(e) => {
              const progressBar = e.currentTarget;
              const rect = progressBar.getBoundingClientRect();
              const clickPosition = e.clientX - rect.left;
              const clickRatio = clickPosition / rect.width;
              const newTime = clickRatio * duration;

              if (audioRef.current) {
                audioRef.current.currentTime = newTime;
              }
            }}
          >
            {/* Filled progress */}
            <div
              className="bg-pink-500 h-2 rounded-full transition-all duration-200"
              style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
            ></div>

            {/* Knob */}
            <div
              className="absolute top-1/2 -translate-y-1/2 bg-pink-500 w-4 h-4 rounded-full pointer-events-none"
              style={{ left: `calc(${duration ? (currentTime / duration) * 100 : 0}% - 8px)` }}
            ></div>
          </div>

          <div className="flex justify-between text-xs text-muted-foreground mt-1">
            <span>{formatTime(currentTime)}</span>
            <span>{currentSong.duration}</span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center space-x-6 mb-4">
          <Button variant="ghost" size="icon" onClick={prevTrack}>
            <SkipBack className="w-5 h-5 text-pink-700" />
          </Button>
          <Button
            onClick={togglePlay}
            className="w-14 h-14 rounded-full bg-pink-500 hover:bg-pink-600 text-white"
          >
            {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-1" />}
          </Button>
          <Button variant="ghost" size="icon" onClick={nextTrack}>
            <SkipForward className="w-5 h-5 text-pink-700" />
          </Button>
        </div>

        {/* Volume and Playlist Toggle */}
        <div className="flex justify-between items-center">
          <Button variant="ghost" size="icon">
            <Volume2 className="w-4 h-4 text-gray-500" />
          </Button>
          <Button variant="ghost" size="icon" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            <List className="w-4 h-4 text-gray-500" />
          </Button>
        </div>
      </Card>

      {/* Sidebar - Positioned absolutely */}
      {isSidebarOpen && (
        <div className="absolute right-6 top-1/2 -translate-y-1/2 w-[100px] glass-card rounded-3xl p-4 shadow-2xl z-20 transition-all duration-500">
          <div className="flex flex-col gap-4">
            {playlist.map((song, index) => (
              <button
                key={song.id}
                onClick={() => selectTrack(index)}
                className={`w-16 h-16 rounded-full bg-pink-400/70 hover:bg-pink-500 bg-cover bg-center bg-no-repeat flex items-center justify-center transition ${index === currentTrack ? 'ring-2 ring-white' : ''
                  }`}
                style={{
                  backgroundImage: `url(${song.image})`,
                }}
                title={song.title}
              >
                <Play className="w-4 h-4 text-white" />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MusicPlayer;