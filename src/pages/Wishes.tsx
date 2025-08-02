import { useState, useEffect } from 'react';
import { ArrowLeft, Send, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';

const existingWishes = [
  {
    id: 1,
    name: "Mom & Dad",
    message: "Happy Birthday to our amazing daughter! You bring so much joy and love into our lives. May this new year be filled with endless happiness! 💕",
    time: "2 hours ago",
    avatar: "👨‍👩‍👧"
  },
  {
    id: 2,
    name: "Best Friend Sarah",
    message: "HAPPY BIRTHDAY GIRL! 🎉 Can't wait to party with you tonight! You deserve all the cake and presents in the world! Love you tons! 🎂💖",
    time: "4 hours ago",
    avatar: "👭"
  },
  {
    id: 3,
    name: "Grandma",
    message: "My sweet granddaughter, watching you grow into such a wonderful person has been my greatest joy. Have the most beautiful birthday! ✨",
    time: "6 hours ago",
    avatar: "👵"
  },
  {
    id: 4,
    name: "Cousin Mike",
    message: "Hope your special day is as awesome as you are! Let's celebrate soon! 🎈🎊",
    time: "1 day ago",
    avatar: "👨"
  }
];

const Wishes = () => {
  const [wishes, setWishes] = useState(existingWishes);
  const [newWish, setNewWish] = useState({ name: '', message: '' });
  const [likedWishes, setLikedWishes] = useState<Set<number>>(new Set());
  const navigate = useNavigate();

  const toggleLike = (wishId: number) => {
    const newLiked = new Set(likedWishes);
    if (newLiked.has(wishId)) {
      newLiked.delete(wishId);
    } else {
      newLiked.add(wishId);
    }
    setLikedWishes(newLiked);
  };

  const handleSubmitWish = () => {
    if (newWish.name.trim() && newWish.message.trim()) {
      const wish = {
        id: wishes.length + 1,
        name: newWish.name,
        message: newWish.message,
        time: "Just now",
        avatar: "👤"
      };
      setWishes([wish, ...wishes]);
      setNewWish({ name: '', message: '' });
    }
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
              Birthday Wishes 💌
            </h1>
            <p className="text-muted-foreground mt-2">
              Messages of love from everyone who cares about you ✨
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto">
        {/* Add New Wish Form */}
        <Card className="bg-card/80 backdrop-blur-sm border-birthday-pink/20 p-6 mb-8">
          <h3 className="text-lg font-semibold birthday-text mb-4">
            Leave a Birthday Wish 💝
          </h3>
          <div className="space-y-4">
            <Input
              placeholder="Your name..."
              value={newWish.name}
              onChange={(e) => setNewWish({ ...newWish, name: e.target.value })}
              className="border-birthday-pink/30 focus:border-birthday-pink"
            />
            <Textarea
              placeholder="Write your birthday message here..."
              value={newWish.message}
              onChange={(e) => setNewWish({ ...newWish, message: e.target.value })}
              className="border-birthday-pink/30 focus:border-birthday-pink min-h-[100px]"
            />
            <Button
              onClick={handleSubmitWish}
              className="bg-birthday-pink hover:bg-birthday-purple"
              disabled={!newWish.name.trim() || !newWish.message.trim()}
            >
              <Send className="h-4 w-4 mr-2" />
              Send Wish
            </Button>
          </div>
        </Card>

        {/* Wishes List */}
        <div className="space-y-6">
          {wishes.map((wish) => (
            <Card 
              key={wish.id}
              className="bg-card/80 backdrop-blur-sm border-birthday-pink/20 hover:shadow-birthday transition-all duration-300 p-6"
            >
              <div className="flex items-start space-x-4">
                {/* Avatar */}
                <div className="text-3xl animate-pulse-heart">
                  {wish.avatar}
                </div>
                
                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h4 className="font-semibold text-foreground">{wish.name}</h4>
                      <span className="text-sm text-muted-foreground">{wish.time}</span>
                    </div>
                    
                    <Button
                      onClick={() => toggleLike(wish.id)}
                      variant="ghost"
                      size="icon"
                      className={`transition-all duration-200 ${
                        likedWishes.has(wish.id)
                          ? 'text-birthday-pink scale-110'
                          : 'text-muted-foreground hover:text-birthday-pink hover:scale-105'
                      }`}
                    >
                      <Heart 
                        className={`h-4 w-4 ${
                          likedWishes.has(wish.id) ? 'fill-current' : ''
                        }`}
                      />
                    </Button>
                  </div>
                  
                  <p className="text-foreground leading-relaxed">
                    {wish.message}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Bottom decoration */}
        <div className="flex justify-center mt-12">
          <div className="text-center p-6 bg-gradient-to-r from-birthday-pink/10 to-birthday-purple/10 rounded-2xl border border-birthday-gold/20">
            <div className="text-4xl mb-2 animate-sparkle">🎂</div>
            <p className="text-muted-foreground font-medium">
              Thank you for all the beautiful wishes! 💕
            </p>
          </div>
        </div>
      </div>

      {/* Floating decorations */}
      <div className="fixed top-20 right-10 text-birthday-pink text-2xl animate-float">💌</div>
      <div className="fixed top-1/3 left-10 text-birthday-purple text-xl animate-sparkle">✨</div>
      <div className="fixed bottom-32 right-20 text-birthday-gold text-2xl animate-float">💖</div>
    </div>
  );
};

export default Wishes;