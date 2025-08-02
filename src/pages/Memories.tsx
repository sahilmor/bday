import { useState } from 'react';
import { ArrowLeft, Heart, Calendar, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const memories = [
  {
    id: 1,
    date: "Last Year's Birthday",
    title: "First Birthday Celebration",
    description: "The day we celebrated your special day with so much joy and laughter. The cake was delicious and your smile was even sweeter! 🎂",
    emoji: "🎉",
    color: "birthday-pink"
  },
  {
    id: 2,
    date: "Summer Adventure",
    title: "Beach Day Fun",
    description: "That perfect sunny day when we went to the beach and built sandcastles. You looked so happy playing in the waves! 🏖️",
    emoji: "🌊",
    color: "birthday-purple"
  },
  {
    id: 3,
    date: "Christmas Morning",
    title: "Holiday Magic",
    description: "Opening presents together and watching your eyes light up with each surprise. The Christmas tree looked perfect behind you! 🎄",
    emoji: "🎁",
    color: "birthday-gold"
  },
  {
    id: 4,
    date: "Spring Picnic",
    title: "Garden Party",
    description: "Among the blooming flowers, we had the most wonderful picnic. You picked daisies and made a beautiful crown! 🌸",
    emoji: "🌺",
    color: "birthday-pink"
  },
  {
    id: 5,
    date: "Movie Night",
    title: "Cozy Evening",
    description: "Snuggled up watching your favorite movie with popcorn and hot chocolate. Those quiet moments are just as precious! 🍿",
    emoji: "🎬",
    color: "birthday-purple"
  }
];

const Memories = () => {
  const [likedMemories, setLikedMemories] = useState<Set<number>>(new Set());
  const navigate = useNavigate();

  const toggleLike = (memoryId: number) => {
    const newLiked = new Set(likedMemories);
    if (newLiked.has(memoryId)) {
      newLiked.delete(memoryId);
    } else {
      newLiked.add(memoryId);
    }
    setLikedMemories(newLiked);
  };

  return (
    <div className="min-h-screen p-6">
      {/* Header */}
      <div className="max-w-4xl mx-auto mb-8">
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
              Beautiful Memories 💝
            </h1>
            <p className="text-muted-foreground mt-2">
              Treasured moments we've shared together ✨
            </p>
          </div>
        </div>
      </div>

      {/* Memories Timeline */}
      <div className="max-w-4xl mx-auto">
        <div className="space-y-8">
          {memories.map((memory, index) => (
            <div 
              key={memory.id}
              className="relative"
            >
              {/* Timeline line */}
              {index !== memories.length - 1 && (
                <div className="absolute left-12 top-20 w-0.5 h-24 bg-gradient-to-b from-birthday-pink to-birthday-purple opacity-30" />
              )}
              
              <Card className="bg-card/80 backdrop-blur-sm border-birthday-pink/20 hover:shadow-birthday transition-all duration-300 p-6 ml-6">
                <div className="flex items-start space-x-4">
                  {/* Timeline dot and emoji */}
                  <div className="flex flex-col items-center">
                    <div className={`w-8 h-8 rounded-full bg-${memory.color}/20 border-2 border-${memory.color} flex items-center justify-center`}>
                      <Star className={`h-3 w-3 text-${memory.color}`} />
                    </div>
                    <div className="text-2xl mt-2 animate-pulse-heart">
                      {memory.emoji}
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">{memory.date}</span>
                      </div>
                      
                      <Button
                        onClick={() => toggleLike(memory.id)}
                        variant="ghost"
                        size="icon"
                        className={`transition-all duration-200 ${
                          likedMemories.has(memory.id)
                            ? 'text-birthday-pink scale-110'
                            : 'text-muted-foreground hover:text-birthday-pink hover:scale-105'
                        }`}
                      >
                        <Heart 
                          className={`h-4 w-4 ${
                            likedMemories.has(memory.id) ? 'fill-current' : ''
                          }`}
                        />
                      </Button>
                    </div>
                    
                    <h3 className="text-xl font-semibold birthday-text mb-3">
                      {memory.title}
                    </h3>
                    
                    <p className="text-foreground leading-relaxed">
                      {memory.description}
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </div>
        
        {/* End of timeline */}
        <div className="flex justify-center mt-12">
          <div className="text-center p-6 bg-gradient-to-r from-birthday-pink/10 to-birthday-purple/10 rounded-2xl border border-birthday-gold/20">
            <div className="text-4xl mb-2">💕</div>
            <p className="text-muted-foreground font-medium">
              And many more beautiful memories to come...
            </p>
          </div>
        </div>
      </div>

      {/* Floating decorations */}
      <div className="fixed top-20 right-10 text-birthday-pink text-2xl animate-float">💖</div>
      <div className="fixed top-1/3 left-10 text-birthday-purple text-xl animate-sparkle">✨</div>
      <div className="fixed bottom-32 right-20 text-birthday-gold text-2xl animate-float">🌟</div>
    </div>
  );
};

export default Memories;