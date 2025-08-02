import { useState } from 'react';
import { ArrowLeft, Download, Heart, Share2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

// Sample gallery images - replace with actual photos
const galleryImages = [
  {
    id: 1,
    src: "/placeholder.svg",
    alt: "Birthday Memory 1",
    title: "Sweet Moments",
    description: "Beautiful memories captured"
  },
  {
    id: 2,
    src: "/placeholder.svg", 
    alt: "Birthday Memory 2",
    title: "Celebration Time",
    description: "Joy and laughter"
  },
  {
    id: 3,
    src: "/placeholder.svg",
    alt: "Birthday Memory 3", 
    title: "Special Day",
    description: "Unforgettable moments"
  },
  {
    id: 4,
    src: "/placeholder.svg",
    alt: "Birthday Memory 4",
    title: "Happy Times",
    description: "Cherished memories"
  },
  {
    id: 5,
    src: "/placeholder.svg",
    alt: "Birthday Memory 5",
    title: "Best Friends",
    description: "Together forever"
  },
  {
    id: 6,
    src: "/placeholder.svg",
    alt: "Birthday Memory 6",
    title: "Party Vibes",
    description: "Dancing and fun"
  }
];

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [likedImages, setLikedImages] = useState<Set<number>>(new Set());
  const navigate = useNavigate();

  const toggleLike = (imageId: number) => {
    const newLiked = new Set(likedImages);
    if (newLiked.has(imageId)) {
      newLiked.delete(imageId);
    } else {
      newLiked.add(imageId);
    }
    setLikedImages(newLiked);
  };

  const openImage = (imageId: number) => {
    setSelectedImage(imageId);
  };

  const closeImage = () => {
    setSelectedImage(null);
  };

  const selectedImg = galleryImages.find(img => img.id === selectedImage);

  return (
    <div className="min-h-screen p-6">
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-8">
        <div className="flex items-center justify-between">
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
                Memory Gallery 📸
              </h1>
              <p className="text-muted-foreground mt-2">
                Beautiful moments captured in time ✨
              </p>
            </div>
          </div>
          
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="icon"
              className="border-birthday-pink/30 hover:bg-birthday-pink/10"
            >
              <Share2 className="h-4 w-4 text-birthday-pink" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="border-birthday-purple/30 hover:bg-birthday-purple/10"
            >
              <Download className="h-4 w-4 text-birthday-purple" />
            </Button>
          </div>
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryImages.map((image) => (
            <Card 
              key={image.id}
              className="group overflow-hidden bg-card/80 backdrop-blur-sm border-birthday-pink/20 hover:shadow-birthday transition-all duration-300 cursor-pointer"
              onClick={() => openImage(image.id)}
            >
              <div className="relative aspect-square overflow-hidden">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Heart Button */}
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleLike(image.id);
                  }}
                  variant="ghost"
                  size="icon"
                  className={`absolute top-3 right-3 transition-all duration-200 ${
                    likedImages.has(image.id)
                      ? 'text-birthday-pink scale-110'
                      : 'text-white/70 hover:text-birthday-pink hover:scale-105'
                  }`}
                >
                  <Heart 
                    className={`h-5 w-5 ${
                      likedImages.has(image.id) ? 'fill-current' : ''
                    }`}
                  />
                </Button>

                {/* Title Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <h3 className="font-semibold text-lg">{image.title}</h3>
                  <p className="text-sm text-white/80">{image.description}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Modal for selected image */}
      {selectedImage && selectedImg && (
        <div 
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={closeImage}
        >
          <div className="relative max-w-4xl max-h-[90vh] w-full">
            <img
              src={selectedImg.src}
              alt={selectedImg.alt}
              className="w-full h-full object-contain rounded-lg"
            />
            
            {/* Close button */}
            <Button
              onClick={closeImage}
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 text-white hover:bg-white/20"
            >
              ✕
            </Button>
            
            {/* Image info */}
            <div className="absolute bottom-4 left-4 right-4 bg-black/60 backdrop-blur-sm rounded-lg p-4">
              <h3 className="text-white font-semibold text-xl">{selectedImg.title}</h3>
              <p className="text-white/80">{selectedImg.description}</p>
            </div>
          </div>
        </div>
      )}

      {/* Floating hearts decoration */}
      <div className="fixed top-20 left-10 text-birthday-pink text-2xl animate-float">💖</div>
      <div className="fixed top-1/3 right-10 text-birthday-purple text-xl animate-sparkle">✨</div>
      <div className="fixed bottom-32 left-20 text-birthday-gold text-2xl animate-float">🌟</div>
    </div>
  );
};

export default Gallery;