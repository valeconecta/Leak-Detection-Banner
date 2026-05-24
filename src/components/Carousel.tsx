import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Play, Pause, Maximize2, X, ZoomIn, Eye } from 'lucide-react';

interface CarouselProps {
  images: string[];
  title: string;
  autoPlay?: boolean;
}

export default function Carousel({ images, title, autoPlay = false }: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right
  const thumbnailContainerRef = useRef<HTMLDivElement>(null);

  // AutoPlay interval
  useEffect(() => {
    if (!isPlaying || images.length <= 1) return;
    const timer = setInterval(() => {
      handleNext();
    }, 5000);
    return () => clearInterval(timer);
  }, [isPlaying, currentIndex, images.length]);

  // Ensure selected thumbnail is visible in scroll container
  useEffect(() => {
    if (thumbnailContainerRef.current) {
      const activeElement = thumbnailContainerRef.current.children[currentIndex] as HTMLElement;
      if (activeElement) {
        const container = thumbnailContainerRef.current;
        const extraGap = 16; // spacing
        const leftBound = activeElement.offsetLeft - extraGap;
        const rightBound = activeElement.offsetLeft + activeElement.clientWidth + extraGap - container.clientWidth;

        if (container.scrollLeft > leftBound) {
          container.scrollTo({ left: leftBound, behavior: 'smooth' });
        } else if (container.scrollLeft < rightBound) {
          container.scrollTo({ left: rightBound, behavior: 'smooth' });
        }
      }
    }
  }, [currentIndex]);

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  const handleSelect = (idx: number) => {
    setDirection(idx > currentIndex ? 1 : -1);
    setCurrentIndex(idx);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'Escape') setIsLightboxOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex]);

  if (!images || images.length === 0) return null;

  const currentImage = images[currentIndex];

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? '100%' : '-100%',
      opacity: 0,
      scale: 0.98,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: 'spring', stiffness: 300, damping: 30 },
        opacity: { duration: 0.35 },
        scale: { duration: 0.4 },
      },
    },
    exit: (dir: number) => ({
      x: dir < 0 ? '100%' : '-100%',
      opacity: 0,
      scale: 0.98,
      transition: {
        x: { type: 'spring', stiffness: 300, damping: 30 },
        opacity: { duration: 0.3 },
        scale: { duration: 0.35 },
      },
    }),
  };

  return (
    <div className="space-y-6">
      {/* Main Image View */}
      <div className="relative aspect-[3/2] w-full rounded-2xl overflow-hidden bg-slate-950 shadow-2xl group">
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.img
            key={currentIndex}
            src={currentImage}
            alt={`${title} - image ${currentIndex + 1}`}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute inset-0 w-full h-full object-cover cursor-zoom-in"
            onClick={() => setIsLightboxOpen(true)}
            referrerPolicy="no-referrer"
          />
        </AnimatePresence>

        {/* Floating gradient overlays */}
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
        <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

        {/* Play/Pause, Maximize, and Info icons */}
        <div className="absolute top-4 right-4 flex items-center space-x-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {images.length > 1 && (
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-2.5 bg-black/50 hover:bg-brand-light text-white rounded-full backdrop-blur-md transition-all active:scale-90"
              title={isPlaying ? 'Pause Autoplay' : 'Start Autoplay'}
            >
              {isPlaying ? <Pause size={18} /> : <Play size={18} />}
            </button>
          )}
          <button
            onClick={() => setIsLightboxOpen(true)}
            className="p-2.5 bg-black/50 hover:bg-brand-light text-white rounded-full backdrop-blur-md transition-all active:scale-90"
            title="View Fullscreen"
          >
            <Maximize2 size={18} />
          </button>
        </div>

        {/* Arrow Navigation */}
        {images.length > 1 && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handlePrev();
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/90 hover:bg-white text-slate-800 rounded-full shadow-lg backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all pointer-events-auto hover:text-brand-light active:scale-90 hover:scale-105"
              aria-label="Previous image"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/90 hover:bg-white text-slate-800 rounded-full shadow-lg backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all pointer-events-auto hover:text-brand-light active:scale-90 hover:scale-105"
              aria-label="Next image"
            >
              <ChevronRight size={24} />
            </button>
          </>
        )}

        {/* Mobile Swipe Indicators and Counter */}
        <div className="absolute bottom-4 left-6 text-white text-sm font-semibold tracking-wide bg-black/40 px-3 py-1.5 rounded-full backdrop-blur-md flex items-center gap-2">
          <Eye size={14} className="text-brand-light" />
          <span>
            {currentIndex + 1} / {images.length}
          </span>
        </div>
      </div>

      {/* Thumbnails Row */}
      {images.length > 1 && (
        <div className="relative">
          {/* Scroll Area */}
          <div
            ref={thumbnailContainerRef}
            className="flex gap-3 overflow-x-auto py-2 px-1 scrollbar-none scroll-smooth hide-scrollbar"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => handleSelect(idx)}
                className={`relative flex-none aspect-[4/3] w-20 sm:w-24 rounded-xl overflow-hidden transition-all duration-300 border-2 select-none active:scale-95 ${
                  currentIndex === idx
                    ? 'border-brand-light scale-102 ring-4 ring-brand-light/20 shadow-md'
                    : 'border-slate-200 opacity-60 hover:opacity-100 hover:scale-[1.01] hover:border-slate-300'
                }`}
              >
                <img
                  src={img}
                  alt={`Thumbnail ${idx + 1}`}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </button>
            ))}
          </div>

          {/* Left/Right fading edges indicator for scrollable container */}
          <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-white to-transparent pointer-events-none opacity-50 md:hidden" />
          <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white to-transparent pointer-events-none opacity-50 md:hidden" />
        </div>
      )}

      {/* Fullscreen Lightbox Modal */}
      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex flex-col justify-between bg-black/95 p-4 sm:p-6 backdrop-blur-xl"
            role="dialog"
            aria-modal="true"
          >
            {/* Header portion */}
            <div className="flex justify-between items-center text-white z-10 w-full max-w-7xl mx-auto pt-2">
              <div>
                <h3 className="text-lg sm:text-xl font-bold tracking-tight text-slate-100">
                  {title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-400">
                  Image {currentIndex + 1} of {images.length}
                </p>
              </div>

              <div className="flex items-center space-x-2">
                {images.length > 1 && (
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="p-2.5 bg-white/10 hover:bg-brand-light text-white rounded-full transition-all active:scale-90"
                    title={isPlaying ? 'Pause' : 'Play'}
                  >
                    {isPlaying ? <Pause size={18} /> : <Play size={18} />}
                  </button>
                )}
                <button
                  onClick={() => setIsLightboxOpen(false)}
                  className="p-2.5 bg-white/10 hover:bg-red-500 hover:text-white text-white rounded-full transition-all active:scale-90"
                  aria-label="Close Lightbox"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Central Slide portion */}
            <div className="relative flex-grow flex items-center justify-center max-w-7xl mx-auto w-full my-4 overflow-hidden">
              <AnimatePresence initial={false} custom={direction} mode="popLayout">
                <motion.img
                  key={currentIndex}
                  src={currentImage}
                  alt={`${title} full screen view`}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="max-h-[75vh] max-w-full rounded-xl object-contain shadow-2xl"
                  referrerPolicy="no-referrer"
                />
              </AnimatePresence>

              {/* Lightbox arrows */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={handlePrev}
                    className="absolute left-2 sm:left-4 p-4 bg-white/10 hover:bg-brand-light text-white rounded-full transition-all active:scale-90"
                    aria-label="Previous Image"
                  >
                    <ChevronLeft size={32} />
                  </button>
                  <button
                    onClick={handleNext}
                    className="absolute right-2 sm:right-4 p-4 bg-white/10 hover:bg-brand-light text-white rounded-full transition-all active:scale-90"
                    aria-label="Next Image"
                  >
                    <ChevronRight size={32} />
                  </button>
                </>
              )}
            </div>

            {/* Bottom thumbnail/indicator strip inside lightbox */}
            {images.length > 1 && (
              <div className="w-full max-w-5xl mx-auto pb-4 overflow-hidden">
                <div className="flex gap-2 justify-center overflow-x-auto py-1 scrollbar-none scroll-smooth">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSelect(idx)}
                      className={`relative flex-none aspect-[4/3] w-14 sm:w-16 rounded-lg overflow-hidden transition-all duration-200 border ${
                        currentIndex === idx
                          ? 'border-brand-light scale-105 ring-2 ring-brand-light/30'
                          : 'border-slate-800 opacity-40 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={img}
                        alt={`Lightbox Thumbnail ${idx + 1}`}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
