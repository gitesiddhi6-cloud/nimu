import React from 'react';
import { motion } from 'framer-motion';
import { storyData } from '../data/storyData';
import { useCustomPhotos } from '../context/CustomPhotosContext';
import { Sparkles, ArrowDown, Code2, Heart, Star } from 'lucide-react';

interface HeroProps {
  onStartStory: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onStartStory }) => {
  const { hero } = storyData;
  const { getPhotoSrc } = useCustomPhotos();

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-[#161412]">
      {/* 1. Full-screen Cinematic Photo Background */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <img
          src={getPhotoSrc('main-us', hero.mainImage)}
          alt="Nimu and Me"
          className="w-full h-full object-cover object-[center_30%] sm:object-center transform scale-105 transition-transform duration-1000 ease-out"
        />

        {/* 2. Warm yellow & cream gradient overlay with vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#161412] via-[#161412]/50 to-[#27231D]/40 mix-blend-multiply" />
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#FFD84D]/10 to-[#161412]/80 pointer-events-none" />

        {/* 3. Subtle Film Grain */}
        <div className="absolute inset-0 grain-overlay opacity-60" />
      </div>

      {/* Floating subtle yellow doodles & particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
        <motion.div
          animate={{ y: [0, -15, 0], rotate: [0, 8, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/5 left-[10%] text-yellow-primary/70 opacity-60"
        >
          <Sparkles className="w-6 h-6 drop-shadow-yellow-sm" />
        </motion.div>

        <motion.div
          animate={{ y: [0, 12, 0], rotate: [0, -6, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute top-1/4 right-[12%] text-yellow-soft/80 opacity-70"
        >
          <Code2 className="w-5 h-5 drop-shadow-yellow-sm" />
        </motion.div>

        <motion.div
          animate={{ y: [0, -10, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-1/4 left-[15%] text-yellow-primary/60 opacity-60"
        >
          <Heart className="w-4 h-4 fill-yellow-primary/40 text-yellow-primary" />
        </motion.div>

        <motion.div
          animate={{ y: [0, 8, 0], rotate: [0, 15, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          className="absolute bottom-1/3 right-[18%] text-yellow-soft/70 opacity-60"
        >
          <Star className="w-4 h-4 fill-yellow-soft/40 text-yellow-soft" />
        </motion.div>
      </div>

      {/* Hero Content Overlay */}
      <div className="relative z-20 max-w-4xl mx-auto px-6 py-20 text-center flex flex-col items-center">
        {/* Subtle Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cream-50/15 backdrop-blur-md border border-yellow-primary/30 text-yellow-soft text-xs sm:text-sm font-mono tracking-wider mb-6 shadow-yellow-sm"
        >
          <span className="w-2 h-2 rounded-full bg-yellow-primary animate-ping" />
          <span>BOYFRIEND&apos;S DAY EDITION // FOR NIMU</span>
        </motion.div>

        {/* Main Title */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-[#FFFDF5] tracking-tight font-sans drop-shadow-lg"
        >
          {hero.title}
        </motion.h1>

        {/* Story Intro Copy */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="mt-6 sm:mt-8 space-y-2 text-base sm:text-xl text-cream-100/90 font-light max-w-xl mx-auto leading-relaxed"
        >
          <p className="text-yellow-soft font-normal text-lg sm:text-2xl">
            {hero.introLines[0]}
          </p>
          <div className="pt-2 space-y-1 font-mono text-xs sm:text-sm text-cream-200/80">
            <p className="opacity-80">// {hero.introLines[1]}</p>
            <p className="opacity-80">// {hero.introLines[2]}</p>
            <p className="text-yellow-primary font-medium opacity-100 pt-1">
              &gt; {hero.introLines[3]}
            </p>
          </div>
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="mt-10 sm:mt-12"
        >
          <button
            onClick={onStartStory}
            className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-yellow-primary via-yellow-soft to-yellow-primary text-charcoal-black font-bold text-base sm:text-lg shadow-yellow-glow hover:shadow-yellow-bright hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
          >
            <span>{hero.startButton}</span>
            <ArrowDown className="w-5 h-5 group-hover:translate-y-1 transition-transform text-charcoal-black" />
          </button>
        </motion.div>
      </div>

      {/* Gentle Bottom Gradient Transition */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#FFFDF5] to-transparent pointer-events-none z-20" />
    </section>
  );
};
