"use client";

import { DraggableCardBody, DraggableCardContainer } from "@/components/ui/draggable-card";
import { useEffect, useState } from "react";

type MediaItem = {
  type: "image" | "video";
  src: string;
  alt: string;
  aspect: "portrait" | "landscape";
};

const media: MediaItem[] = [
  { type: "image", src: "/images/i1.PNG", alt: "Portrait Selfie", aspect: "portrait" },
  { type: "image", src: "/images/i2.jpeg", alt: "Group Dance", aspect: "landscape" },
  { type: "image", src: "/images/i3.jpeg", alt: "Hill view", aspect: "landscape" },
  { type: "video", src: "/videos/v1.mp4", alt: "Laugh moment", aspect: "portrait" },
  { type: "video", src: "/videos/v2.mp4", alt: "Throwback", aspect: "portrait" },
  { type: "video", src: "/videos/v3.mp4", alt: "Throwback", aspect: "portrait" },
  { type: "video", src: "/videos/v4.mp4", alt: "Throwback", aspect: "portrait" },
  { type: "video", src: "/videos/v5.mp4", alt: "Throwback", aspect: "landscape" },
  { type: "video", src: "/videos/v6.mp4", alt: "Throwback", aspect: "portrait" },
  { type: "video", src: "/videos/v7.mp4", alt: "Throwback", aspect: "portrait" },
  { type: "video", src: "/videos/v8.mp4", alt: "Throwback", aspect: "landscape" },
  { type: "video", src: "/videos/v9.mp4", alt: "Throwback", aspect: "portrait" },
  { type: "video", src: "/videos/v10.mp4", alt: "Throwback", aspect: "portrait" },
  { type: "video", src: "/videos/v11.mp4", alt: "Throwback", aspect: "landscape" },
];

const getRandomPosition = () => {
  const x = Math.floor(Math.random() * window.innerWidth * 0.8);
  const y = Math.floor(Math.random() * window.innerHeight * 0.8);
  return { x, y };
};

const GalleryPage = () => {
  const [positions, setPositions] = useState<{ x: number; y: number }[]>([]);

  useEffect(() => {
    const newPositions = media.map(() => getRandomPosition());
    setPositions(newPositions);
  }, []);

  return (
    <div className="relative min-h-screen w-full text-foreground overflow-hidden">
      <DraggableCardContainer className="absolute inset-0">
        {media.map((item, index) => {
          const isPortrait = item.aspect === "portrait";
          const { x, y } = positions[index] || { x: 100, y: 100 };

          const sizeClass = isPortrait
            ? "w-52 h-96"   // Portrait: tall
            : "w-[570px] h-[180px]";  // Landscape: wide

          return (
            <div
              key={index}
              style={{ left: `${x}px`, top: `${y}px` }}
              className="absolute"
            >
              <DraggableCardBody
                className={`rounded-xl border border-muted bg-white dark:bg-neutral-900 shadow-lg overflow-hidden ${sizeClass}`}
              >
                <div className="w-full h-full">
                  {item.type === "image" ? (
                    <img
                      src={item.src}
                      alt={item.alt}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <video
                      src={item.src}
                      controls
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
              </DraggableCardBody>
            </div>
          );
        })}
      </DraggableCardContainer>
    </div>
  );
};

export default GalleryPage;