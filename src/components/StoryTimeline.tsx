import React from 'react';
import { motion } from 'framer-motion';
import { storyData } from '../data/storyData';
import { MemoryCard } from './MemoryCard';
import { Sparkles, Heart } from 'lucide-react';

export const StoryTimeline: React.FC = () => {
  const { timeline } = storyData;

  return (
    <section id="story" className="relative py-20 px-6 sm:px-12 max-w-6xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-24 space-y-4">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-yellow-soft/50 border border-yellow-primary/40 text-charcoal font-mono text-xs font-semibold tracking-wider"
        >
          <Sparkles className="w-3.5 h-3.5 text-yellow-deep" />
          <span>CHRONOLOGICAL COMMITS // OUR JOURNEY</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-3xl sm:text-5xl font-extrabold text-charcoal tracking-tight font-sans"
        >
          {timeline.sectionTitle}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-base sm:text-lg text-charcoal-light font-normal max-w-xl mx-auto"
        >
          {timeline.sectionSubtitle}
        </motion.p>
      </div>

      {/* Vertical Timeline Container */}
      <div className="relative">
        {/* Central Yellow Timeline Line (Desktop) */}
        <div className="hidden md:block absolute left-1/2 top-4 bottom-8 -translate-x-1/2 w-0.5 bg-gradient-to-b from-yellow-primary via-yellow-soft to-yellow-primary shadow-yellow-sm pointer-events-none" />

        {/* Timeline Items */}
        <div className="space-y-16 sm:space-y-24">
          {timeline.memories.map((memory, index) => (
            <div key={memory.id} className="relative">
              {/* Central Glowing Node on Desktop */}
              <div className="hidden md:flex absolute left-1/2 top-10 -translate-x-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-yellow-primary border-4 border-[#FFFDF5] shadow-yellow-glow items-center justify-center text-charcoal-black font-bold text-xs">
                <Heart className="w-3.5 h-3.5 fill-charcoal-black" />
              </div>

              {/* Memory Card */}
              <MemoryCard memory={memory} index={index} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
