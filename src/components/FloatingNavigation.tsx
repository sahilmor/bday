import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Image, Music, Heart, Sparkles, Navigation } from 'lucide-react';
import { Button } from '@/components/ui/button';

const navigationItems = [
  { 
    title: 'Home', 
    icon: Home, 
    path: '/', 
    color: 'text-birthday-pink' 
  },
  { 
    title: 'Gallery', 
    icon: Image, 
    path: '/gallery', 
    color: 'text-birthday-purple' 
  },
  { 
    title: 'Music', 
    icon: Music, 
    path: '/music', 
    color: 'text-birthday-gold' 
  },
  { 
    title: 'Memories', 
    icon: Heart, 
    path: '/memories', 
    color: 'text-birthday-pink' 
  },
  { 
    title: 'Wishes', 
    icon: Sparkles, 
    path: '/wishes', 
    color: 'text-birthday-purple' 
  }
];

const FloatingNavigation = () => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (path: string) => {
    navigate(path);
    setIsHovered(false);
  };

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
      {/* Navigation Menu */}
      <div 
        className={`transition-all duration-300 ease-out ${
          isHovered 
            ? 'opacity-100 translate-y-0 pointer-events-auto' 
            : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
      >
        <div className="bg-card/95 backdrop-blur-md rounded-2xl shadow-birthday border border-birthday-pink/20 p-4 mb-4">
          <div className="flex space-x-3">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Button
                  key={item.path}
                  onClick={() => handleNavigation(item.path)}
                  variant="ghost"
                  size="icon"
                  className={`h-12 w-12 rounded-xl transition-all duration-200 ${
                    isActive 
                      ? 'bg-birthday-pink/20 border border-birthday-pink/30 shadow-sm' 
                      : 'hover:bg-birthday-light hover:scale-105'
                  }`}
                >
                  <Icon className={`h-5 w-5 ${item.color} ${isActive ? 'scale-110' : ''}`} />
                </Button>
              );
            })}
          </div>
          
          {/* Labels */}
          <div className="flex space-x-3 mt-2">
            {navigationItems.map((item) => (
              <div key={item.path} className="h-12 w-12 flex items-center justify-center">
                <span className="text-xs text-muted-foreground font-medium">
                  {item.title}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Navigation Button */}
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative"
      >
        <Button
          className={`h-16 w-16 rounded-full shadow-birthday transition-all duration-300 ${
            isHovered 
              ? 'bg-birthday-purple scale-110' 
              : 'bg-birthday-pink hover:bg-birthday-purple'
          }`}
        >
          <Navigation 
            className={`h-6 w-6 text-white transition-transform duration-300 ${
              isHovered ? 'rotate-45' : ''
            }`} 
          />
        </Button>
        
        {/* Glow effect */}
        <div className="absolute inset-0 rounded-full bg-birthday-pink/20 animate-pulse -z-10 scale-150"></div>
      </div>
    </div>
  );
};

export default FloatingNavigation;