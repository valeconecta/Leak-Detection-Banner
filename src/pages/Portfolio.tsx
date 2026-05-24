import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { motion, AnimatePresence } from 'motion/react';
import { serviceData } from '../data/services';
import CTASection from '../components/CTASection';
import { ChevronLeft, ChevronRight, X, Eye } from 'lucide-react';

export default function Portfolio() {
  const { t } = useLanguage();
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [direction, setDirection] = useState(0);

  // Generate projects from service galleries
  const projects = Object.entries(serviceData).flatMap(([id, service]) => {
    const category = service.title.split(' in ')[0] || service.title;
    return (service.gallery || []).map((image, idx) => ({
      title: `${category} Project`,
      location: 'Central Florida',
      image,
      type: category
    }));
  });

  useEffect(() => {
    if (lightboxIndex !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [lightboxIndex]);

  const handlePrev = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setDirection(-1);
    setLightboxIndex((prev) => (prev === null || prev === 0 ? projects.length - 1 : prev - 1));
  };

  const handleNext = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setDirection(1);
    setLightboxIndex((prev) => (prev === null || prev === projects.length - 1 ? 0 : prev + 1));
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'Escape') setLightboxIndex(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex]);

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? '100%' : '-100%',
      opacity: 0,
      scale: 0.95
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: 'spring', stiffness: 300, damping: 30 },
        opacity: { duration: 0.35 }
      }
    },
    exit: (dir: number) => ({
      x: dir < 0 ? '100%' : '-100%',
      opacity: 0,
      scale: 0.95,
      transition: {
        x: { type: 'spring', stiffness: 300, damping: 30 },
        opacity: { duration: 0.3 }
      }
    })
  };

  return (
    <div className="pt-20">
      <section className="relative min-h-[50vh] flex items-center py-24 text-white overflow-hidden">
        {/* Background Image & Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=2000" 
            className="w-full h-full object-cover"
            alt="Portfolio"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-brand-dark/70 backdrop-blur-[2px]"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-bold mb-6"
          >
            {t('portfolio_hero_title')}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto leading-relaxed"
          >
            {t('portfolio_hero_subtitle')}
          </motion.p>
        </div>

        {/* Wave Effect */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] transform translate-y-[1px]">
          <svg className="relative block w-[calc(100%+1.3px)] h-[80px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C58.47,105.34,121.53,108.55,172,95.83,222.5,83.1,263.4,67.23,321.39,56.44Z" className="fill-white"></path>
          </svg>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                onClick={() => {
                  setDirection(1);
                  setLightboxIndex(idx);
                }}
                className="group relative overflow-hidden rounded-3xl shadow-xl aspect-[4/3] cursor-pointer"
              >
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                
                {/* Visual overlay on hover with View icon */}
                <div className="absolute inset-0 bg-brand-dark/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="p-4 bg-white/20 backdrop-blur-md rounded-full text-white transform scale-90 group-hover:scale-100 transition-all duration-300">
                    <Eye size={24} />
                  </div>
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/95 via-brand-dark/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-8">
                  <span className="text-brand-light font-bold text-sm uppercase tracking-widest mb-2">{project.type}</span>
                  <h3 className="text-2xl font-bold text-white">{project.title}</h3>
                  <p className="text-slate-300 text-sm">{project.location}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Fullscreen Lightbox Modal Carousel */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex flex-col justify-between bg-black/95 p-4 sm:p-6 backdrop-blur-xl"
            role="dialog"
            aria-modal="true"
            onClick={() => setLightboxIndex(null)}
          >
            {/* Header info */}
            <div className="flex justify-between items-center text-white z-10 w-full max-w-7xl mx-auto pt-2" onClick={(e) => e.stopPropagation()}>
              <div>
                <span className="text-xs font-bold text-brand-light uppercase tracking-widest block">
                  {projects[lightboxIndex].type}
                </span>
                <h3 className="text-lg sm:text-xl font-bold tracking-tight text-slate-100">
                  {projects[lightboxIndex].title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-400">
                  Image {lightboxIndex + 1} of {projects.length}
                </p>
              </div>

              <button
                onClick={() => setLightboxIndex(null)}
                className="p-2.5 bg-white/10 hover:bg-red-500 hover:text-white text-white rounded-full transition-all active:scale-90"
                aria-label="Close Lightbox"
              >
                <X size={20} />
              </button>
            </div>

            {/* Central Animated View */}
            <div className="relative flex-grow flex items-center justify-center max-w-7xl mx-auto w-full my-4 overflow-hidden" onClick={(e) => e.stopPropagation()}>
              <AnimatePresence initial={false} custom={direction} mode="popLayout">
                <motion.img
                  key={lightboxIndex}
                  src={projects[lightboxIndex].image}
                  alt={projects[lightboxIndex].title}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="max-h-[75vh] max-w-full rounded-xl object-contain shadow-2xl"
                  referrerPolicy="no-referrer"
                />
              </AnimatePresence>

              {/* Arrow navigation buttons */}
              <button
                onClick={(e) => handlePrev(e)}
                className="absolute left-2 sm:left-4 p-4 bg-white/10 hover:bg-brand-light text-white rounded-full transition-all active:scale-90 shadow-lg"
                aria-label="Previous Image"
              >
                <ChevronLeft size={32} />
              </button>
              <button
                onClick={(e) => handleNext(e)}
                className="absolute right-2 sm:right-4 p-4 bg-white/10 hover:bg-brand-light text-white rounded-full transition-all active:scale-90 shadow-lg"
                aria-label="Next Image"
              >
                <ChevronRight size={32} />
              </button>
            </div>

            {/* Bottom simple indicator index dots inside lightbox */}
            <div className="w-full max-w-5xl mx-auto pb-4 overflow-hidden" onClick={(e) => e.stopPropagation()}>
              <div className="flex gap-2 justify-center items-center overflow-x-auto py-1 scrollbar-none scroll-smooth">
                {projects.map((proj, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setDirection(idx > (lightboxIndex ?? 0) ? 1 : -1);
                      setLightboxIndex(idx);
                    }}
                    className={`relative flex-none aspect-[4/3] h-10 sm:h-12 rounded-lg overflow-hidden transition-all duration-200 border ${
                      lightboxIndex === idx
                        ? 'border-brand-light scale-105 ring-2 ring-brand-light/30 opacity-100'
                        : 'border-slate-800 opacity-40 hover:opacity-100'
                    }`}
                  >
                    <img 
                      src={proj.image} 
                      alt={`Thumbnail ${idx + 1}`} 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <CTASection />
    </div>
  );
}
