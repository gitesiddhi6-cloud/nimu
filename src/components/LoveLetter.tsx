import React from 'react';
import { motion } from 'framer-motion';
import { storyData } from '../data/storyData';
import { useCustomPhotos } from '../context/CustomPhotosContext';
import { Sparkles, Heart } from 'lucide-react';

export const LoveLetter: React.FC = () => {
  const { emotionalTransition, loveLetter, hero } = storyData;
  const { getPhotoSrc } = useCustomPhotos();

  return (
    <section id="letter" className="relative py-28 px-6 sm:px-12 overflow-hidden bg-[#161412] text-cream-50">
      {/* 1. Subtle Couple Photo Background with dark cinematic treatment */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none opacity-25">
        <img
          src={getPhotoSrc('main-us', hero.mainImage)}
          alt="Atmosphere"
          className="w-full h-full object-cover object-center filter saturate-50 blur-[2px]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#161412] via-[#161412]/80 to-[#161412]" />
        <div className="absolute inset-0 grain-overlay opacity-40" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto space-y-16">
        {/* 2. Emotional Transition Header */}
        <div className="text-center space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-primary/10 border border-yellow-primary/30 text-yellow-soft font-mono text-xs"
          >
            <Sparkles className="w-3.5 h-3.5 text-yellow-primary" />
            <span>HEARTBEAT // TRANSITION</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-3xl sm:text-5xl font-extrabold text-[#FFFDF5] tracking-tight font-sans"
          >
            {emotionalTransition.line1}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg sm:text-xl text-yellow-soft/80 font-light italic"
          >
            {emotionalTransition.line2}
          </motion.p>
        </div>

        {/* 3. The Love Letter Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.3 }}
          className="relative p-8 sm:p-14 rounded-3xl bg-[#1E1B17]/90 backdrop-blur-2xl border border-yellow-primary/30 shadow-yellow-bright text-cream-50"
        >
          {/* Subtle gold bookmark ribbon */}
          <div className="absolute top-0 right-10 w-6 h-12 bg-yellow-primary rounded-b-md shadow-md flex items-end justify-center pb-1">
            <Heart className="w-3.5 h-3.5 fill-charcoal text-charcoal" />
          </div>

          {/* Letter Title */}
          <div className="text-center pb-8 border-b border-yellow-primary/20">
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-yellow-soft tracking-wide">
              {loveLetter.title}
            </h3>
          </div>

          {/* Letter Paragraphs */}
          <div className="pt-8 space-y-6 text-base sm:text-lg sm:leading-relaxed text-cream-100 font-serif">
            {loveLetter.paragraphs.map((p, idx) => {
              const isLast = idx === loveLetter.paragraphs.length - 1;
              const isSecondToLast = idx === loveLetter.paragraphs.length - 2;

              if (isLast) {
                return (
                  <p
                    key={idx}
                    className="text-xl sm:text-2xl font-bold text-yellow-primary tracking-wide pt-2"
                  >
                    {p}
                  </p>
                );
              }

              if (isSecondToLast) {
                return (
                  <p key={idx} className="font-semibold text-yellow-soft/95">
                    {p}
                  </p>
                );
              }

              return (
                <p key={idx} className="leading-relaxed opacity-90">
                  {p}
                </p>
              );
            })}
          </div>

          {/* Girlfriend Signature */}
          <div className="pt-10 mt-8 border-t border-yellow-primary/20 flex justify-between items-center text-xs font-mono text-yellow-soft/60">
            <span>WRITTEN FROM THE HEART</span>
            <span className="text-yellow-primary font-bold text-sm font-handwriting">
              Always yours 💛
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
