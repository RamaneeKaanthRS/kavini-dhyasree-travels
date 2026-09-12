'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

interface Media {
  id: string;
  url: string;
  altText: string | null;
  isHero: boolean;
}

export default function ImageGallery({ images }: { images: Media[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  if (images.length === 0) return null;

  const activeImage = images[activeIndex];

  const handleNext = () => {
    setActiveIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  return (
    <div className="space-y-4">
      {/* Active Big Image */}
      <div 
        className="relative h-64 sm:h-[400px] w-full rounded-3xl overflow-hidden cursor-pointer group shadow-sm border border-primary/10"
        onClick={() => setLightboxOpen(true)}
      >
        <img
          src={activeImage.url}
          alt={activeImage.altText || 'Package image'}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors" />
        <span className="absolute bottom-4 right-4 bg-black/60 text-white text-xs px-3 py-1.5 rounded-lg backdrop-blur-md">
          View Gallery ({activeIndex + 1}/{images.length})
        </span>
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none">
          {images.map((img, idx) => (
            <button
              key={img.id}
              onClick={() => setActiveIndex(idx)}
              className={`relative h-20 w-28 rounded-2xl overflow-hidden shrink-0 border-2 cursor-pointer transition-all focus:outline-none ${
                activeIndex === idx ? 'border-primary scale-95' : 'border-primary/10 hover:border-primary/40'
              }`}
            >
              <img
                src={img.url}
                alt={img.altText || 'Thumbnail'}
                className="h-full w-full object-cover"
              />
            </button>
          ))}
        </div>
      )}

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-[100] bg-black/95 flex flex-col justify-between p-4 sm:p-8">
          <div className="flex justify-between items-center text-white">
            <span className="text-sm font-semibold">
              {activeImage.altText || 'Tour Gallery'}
            </span>
            <button 
              onClick={() => setLightboxOpen(false)}
              className="p-2 hover:bg-[#050505]/10 rounded-xl cursor-pointer transition-colors focus:outline-none"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="relative flex-grow flex items-center justify-center max-h-[80vh]">
            <button
              onClick={handlePrev}
              className="absolute left-2 sm:left-4 z-10 bg-[#050505]/15 hover:bg-[#050505]/25 text-white p-3 rounded-full cursor-pointer transition-colors focus:outline-none"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>

            <img
              src={activeImage.url}
              alt={activeImage.altText || 'Tour Image'}
              className="max-w-full max-h-full object-contain rounded-2xl select-none"
            />

            <button
              onClick={handleNext}
              className="absolute right-2 sm:right-4 z-10 bg-[#050505]/15 hover:bg-[#050505]/25 text-white p-3 rounded-full cursor-pointer transition-colors focus:outline-none"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>

          <div className="text-center text-white/60 text-xs pb-4">
            Image {activeIndex + 1} of {images.length}
          </div>
        </div>
      )}
    </div>
  );
}
