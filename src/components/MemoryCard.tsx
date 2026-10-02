import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { TimelineMemory } from '../data/storyData';
import { useCustomPhotos } from '../context/CustomPhotosContext';
import { ImageWithFallback } from './ImageWithFallback';
import { Calendar, Sparkles, Smile, Bath } from 'lucide-react';

interface MemoryCardProps {
  memory: TimelineMemory;
  index: number;
}

export const MemoryCard: React.FC<MemoryCardProps> = ({ memory, index }) => {
  const [showHidden, setShowHidden] = useState<boolean>(false);
  const [showBathtubEasterEgg, setShowBathtubEasterEgg] = useState<boolean>(false);
  const { getPhotoSrc } = useCustomPhotos();

  const isEven = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.65, delay: 0.1 }}
      className={`relative flex flex-col md:flex-row items-center gap-8 md:gap-12 w-full ${
        isEven ? 'md:flex-row' : 'md:flex-row-reverse'
      }`}
    >
      {/* 1. Photo Side (Polaroid Style with Washi Tape) */}
      <div className="w-full md:w-1/2 flex justify-center">
        <div className="relative group max-w-sm sm:max-w-md w-full">
          {/* Washi Tape Accent */}
          <div
            className={`washi-tape-sunflower top-[-10px] ${
              isEven ? 'left-6 rotate-[-3deg]' : 'right-6 rotate-[3deg]'
            } w-24`}
          />

          {/* Polaroid Body */}
          <div className="polaroid-card border border-yellow-primary/20 bg-white">
            <ImageWithFallback
              src={getPhotoSrc(memory.id, memory.image)}
              alt={memory.title}
              fallbackTitle={memory.title}
              fallbackSubtitle={memory.date}
              aspectClass="aspect-4/3"
              className="rounded w-full object-cover"
            />
            <div className="mt-3 flex items-center justify-between text-xs text-charcoal/70 font-mono">
              <span className="flex items-center gap-1 font-semibold text-yellow-deep">
                <Sparkles className="w-3.5 h-3.5" />
                MEM_0{index + 1}
              </span>
              <span className="text-charcoal/50">#unforgettable</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Text Story Side */}
      <div className="w-full md:w-1/2 space-y-4">
        {/* Date Tag */}
        {memory.date && (
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-yellow-soft/40 border border-yellow-primary/40 text-charcoal font-mono text-xs font-semibold">
            <Calendar className="w-3.5 h-3.5 text-yellow-deep" />
            <span>{memory.date}</span>
          </div>
        )}

        {/* Title */}
        <h3 className="text-2xl sm:text-3xl font-bold text-charcoal tracking-tight font-sans">
          {memory.title}
        </h3>

        {/* Story Text */}
        <div className="text-charcoal-light text-base sm:text-lg leading-relaxed space-y-3 font-normal">
          {memory.text.split('\n\n').map((paragraph, pIdx) => (
            <p key={pIdx}>{paragraph}</p>
          ))}
        </div>

        {/* Memory 03: Alibagh "YOU HAD TO BE THERE 😂" Interactive Button */}
        {memory.buttonText && (
          <div className="pt-2">
            <button
              onClick={() => setShowHidden(!showHidden)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-yellow-primary hover:bg-yellow-soft text-charcoal-black font-semibold text-xs sm:text-sm shadow-yellow-sm hover:shadow-yellow-glow transition-all transform hover:-translate-y-0.5 cursor-pointer"
            >
              <Smile className="w-4 h-4 text-charcoal-black" />
              <span>{memory.buttonText}</span>
            </button>

            <AnimatePresence>
              {showHidden && (
                <motion.div
                  initial={{ opacity: 0, height: 0, scale: 0.95 }}
                  animate={{ opacity: 1, height: 'auto', scale: 1 }}
                  exit={{ opacity: 0, height: 0, scale: 0.95 }}
                  transition={{ duration: 0.35 }}
                  className="mt-3 p-4 rounded-xl bg-yellow-pale border-2 border-dashed border-yellow-primary/50 text-charcoal text-sm font-sans relative overflow-hidden"
                >
                  <p className="font-medium italic leading-relaxed text-charcoal">
                    {memory.hiddenMessage}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        {/* Memory 08: Bathtub Easter Egg */}
        {memory.hasBathtubEasterEgg && (
          <div className="pt-2 flex items-center gap-3">
            <button
              onClick={() => setShowBathtubEasterEgg(true)}
              className="p-2 rounded-full bg-yellow-soft/30 hover:bg-yellow-primary/40 text-charcoal/60 hover:text-charcoal transition-transform hover:scale-115 cursor-pointer"
              title="What is this? 🛁"
            >
              <Bath className="w-5 h-5 text-yellow-deep" />
            </button>

            <AnimatePresence>
              {showBathtubEasterEgg && (
                <motion.span
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-xs font-mono font-medium text-yellow-deep bg-yellow-soft/50 px-3 py-1.5 rounded-lg border border-yellow-primary/40 animate-pulse"
                >
                  {memory.bathtubMessage}
                </motion.span>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>
    </motion.div>
  );
};
