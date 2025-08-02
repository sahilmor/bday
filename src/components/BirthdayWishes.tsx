import { useEffect, useState } from 'react';

const BirthdayWishes = () => {
  const [showQuote, setShowQuote] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowQuote(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-full p-8">
      {/* Floating decorative elements */}
      <div className="absolute top-10 left-10 text-birthday-gold text-2xl animate-sparkle">✨</div>
      <div className="absolute top-20 right-20 text-birthday-pink text-3xl animate-float">🎈</div>
      <div className="absolute bottom-20 left-20 text-birthday-purple text-2xl animate-sparkle">⭐</div>
      <div className="absolute bottom-10 right-10 text-birthday-gold text-3xl animate-float">🎂</div>

      {/* Main content */}
      <div className="text-center space-y-8 max-w-md">
        {/* Birthday Girl Name */}
        <div className="animate-fade-in-up">
          <h1 className="text-5xl font-bold birthday-text mb-4 animate-pulse-heart">
            Happy Birthday
          </h1>
          <h2 className="text-6xl font-extrabold birthday-text animate-float">
            Beautiful! ✨
          </h2>
        </div>

        {/* Birthday Wishes */}
        <div className="animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
          <div className="bg-card/80 backdrop-blur-sm rounded-2xl p-6 shadow-birthday border border-birthday-pink/20">
            <p className="text-lg text-foreground leading-relaxed">
              🎉 Wishing you the most amazing birthday filled with love, laughter, and all your favorite things! 
              May this special day bring you endless joy and beautiful memories. 💕
            </p>
          </div>
        </div>

        {/* Quote */}
        {showQuote && (
          <div className="animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
            <div className="bg-gradient-to-r from-birthday-pink/20 to-birthday-purple/20 rounded-xl p-4 border border-birthday-gold/30">
              <p className="text-sm text-muted-foreground italic">
                "Age is merely mind over matter. If you don't mind, it doesn't matter!" 
              </p>
              <p className="text-xs text-muted-foreground mt-2">— Mark Twain</p>
            </div>
          </div>
        )}

        {/* Hearts decoration */}
        <div className="flex justify-center space-x-4 mt-8">
          <span className="text-2xl text-birthday-pink animate-pulse-heart">💖</span>
          <span className="text-2xl text-birthday-purple animate-pulse-heart" style={{ animationDelay: '0.3s' }}>💝</span>
          <span className="text-2xl text-birthday-gold animate-pulse-heart" style={{ animationDelay: '0.6s' }}>💕</span>
        </div>
      </div>
    </div>
  );
};

export default BirthdayWishes;