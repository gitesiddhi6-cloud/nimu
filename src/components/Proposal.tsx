import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { storyData } from '../data/storyData';
import { useCustomPhotos } from '../context/CustomPhotosContext';
import confetti from 'canvas-confetti';
import { Heart, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';

export const Proposal: React.FC = () => {
  const { proposal, success, finalScreen, hero } = storyData;
  const { getPhotoSrc } = useCustomPhotos();
  const [accepted, setAccepted] = useState<boolean>(false);
  const [showFinalScreen, setShowFinalScreen] = useState<boolean>(false);

  const triggerCelebration = () => {
    setAccepted(true);

    // 1. Sunflower & Gold Confetti Canon
    const colors = ['#FFD84D', '#FFF1A8', '#FFF9E8', '#E6B800', '#D4AF37'];

    const end = Date.now() + 3.5 * 1000;

    const frame = () => {
      confetti({
        particleCount: 4,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.7 },
        colors,
      });
      confetti({
        particleCount: 4,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.7 },
        colors,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();

    // Additional celebratory burst from center
    setTimeout(() => {
      confetti({
        particleCount: 100,
        spread: 100,
        origin: { y: 0.6 },
        colors,
      });
    }, 400);
  };

  return (
    <section
      id="question"
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#0F0E0C] text-[#FFFDF5] py-20 px-6 sm:px-12"
    >
      {/* Cinematic Full-screen Main Photo Background */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
        <img
          src={getPhotoSrc('main-us', hero.mainImage)}
          alt="Us Together"
          className="w-full h-full object-cover object-[center_30%] sm:object-center transform scale-105 filter brightness-75 contrast-105"
        />
        {/* Dark Warm Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F0E0C] via-[#0F0E0C]/75 to-[#161412]/85" />
        <div className="absolute inset-0 grain-overlay opacity-50" />
      </div>

      <div className="relative z-10 max-w-3xl w-full mx-auto text-center">
        <AnimatePresence mode="wait">
          {!accepted ? (
            /* 1. The Climax Proposal State */
            <motion.div
              key="proposal-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
              className="space-y-8 sm:space-y-12"
            >
              {/* Progressive Intro Lines */}
              <div className="space-y-4">
                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="text-2xl sm:text-3xl font-bold text-yellow-primary tracking-wide"
                >
                  {proposal.introLines[0]}
                </motion.p>

                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  viewport={{ once: true }}
                  className="text-base sm:text-xl text-cream-100 font-light"
                >
                  {proposal.introLines[1]}
                </motion.p>

                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 1.0 }}
                  viewport={{ once: true }}
                  className="text-base sm:text-xl text-cream-200/90 font-light italic"
                >
                  {proposal.introLines[2]}
                </motion.p>
              </div>

              {/* The Big Question */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.9, delay: 1.4 }}
                viewport={{ once: true }}
                className="py-6"
              >
                <h2 className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-[#FFFDF5] tracking-tight drop-shadow-yellow-glow font-sans leading-tight">
                  {proposal.question}
                </h2>
              </motion.div>

              {/* Two YES Buttons (No NO button) */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.8 }}
                viewport={{ once: true }}
                className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 pt-4"
              >
                <button
                  onClick={triggerCelebration}
                  className="w-full sm:w-auto group relative inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-yellow-primary via-yellow-soft to-yellow-primary text-charcoal-black font-extrabold text-base sm:text-lg shadow-yellow-glow hover:shadow-yellow-bright hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
                >
                  <Heart className="w-5 h-5 fill-charcoal-black text-charcoal-black group-hover:scale-125 transition-transform" />
                  <span>{proposal.buttons.yes1}</span>
                </button>

                <button
                  onClick={triggerCelebration}
                  className="w-full sm:w-auto group relative inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-[#27231D]/80 hover:bg-[#27231D] text-yellow-soft font-bold text-base sm:text-lg border-2 border-yellow-primary/60 shadow-yellow-sm hover:shadow-yellow-glow hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer backdrop-blur-md"
                >
                  <Sparkles className="w-5 h-5 text-yellow-primary group-hover:rotate-45 transition-transform" />
                  <span>{proposal.buttons.yes2}</span>
                </button>
              </motion.div>
            </motion.div>
          ) : !showFinalScreen ? (
            /* 2. Success Screen (He Said Yes!) */
            <motion.div
              key="success-screen"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.7 }}
              className="space-y-8"
            >
              {/* ASCII Build Box */}
              <div className="inline-block bg-[#0A0908]/90 border border-yellow-primary/40 rounded-2xl p-6 sm:p-8 shadow-yellow-bright">
                <pre className="font-mono text-yellow-primary text-[11px] sm:text-sm md:text-base leading-tight font-semibold text-center select-all">
                  {success.asciiBox}
                </pre>
              </div>

              {/* Headline */}
              <div className="space-y-4">
                <h3 className="text-3xl sm:text-5xl font-extrabold text-yellow-primary drop-shadow-yellow-glow">
                  {success.headline}
                </h3>
                <div className="text-base sm:text-xl text-cream-100 font-sans max-w-xl mx-auto space-y-2 leading-relaxed">
                  <p className="whitespace-pre-line font-medium">{success.congratulations}</p>
                  <p className="font-mono text-xs sm:text-sm text-yellow-soft/80 pt-2">
                    &gt; {success.version}
                  </p>
                  <p className="text-sm sm:text-base text-cream-200/90 italic pt-1 whitespace-pre-line">
                    {success.note}
                  </p>
                </div>
              </div>

              {/* Next step button to Final Screen */}
              <div className="pt-6">
                <button
                  onClick={() => setShowFinalScreen(true)}
                  className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-yellow-primary text-charcoal-black font-bold text-sm hover:bg-yellow-soft shadow-yellow-sm transition-all cursor-pointer font-mono"
                >
                  <span>SEE WHAT COMES NEXT</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ) : (
            /* 3. Section 15: Final Screen */
            <motion.div
              key="final-screen"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="max-w-2xl mx-auto space-y-10 py-10"
            >
              {/* Heading */}
              <h2 className="text-3xl sm:text-5xl font-extrabold text-[#FFFDF5] tracking-tight font-sans">
                {finalScreen.heading}
              </h2>

              {/* Next Memory: Loading... */}
              <div className="inline-flex flex-col items-center gap-2 p-6 rounded-2xl bg-[#161412]/80 border border-yellow-primary/30 backdrop-blur-xl">
                <span className="text-xs font-mono text-yellow-soft tracking-wider">
                  {finalScreen.nextMemoryLabel}
                </span>
                <span className="text-xl sm:text-2xl font-mono text-yellow-primary font-bold animate-pulse">
                  {finalScreen.loadingText}
                </span>
              </div>

              {/* Finale text */}
              <div className="pt-4">
                <p className="text-2xl sm:text-4xl font-extrabold text-yellow-primary drop-shadow-yellow-glow leading-snug">
                  {finalScreen.finale}
                </p>
              </div>

              <div className="pt-8 flex items-center justify-center gap-2 text-xs font-mono text-yellow-soft/50">
                <CheckCircle2 className="w-4 h-4 text-yellow-primary" />
                <span>official boyfriend status: confirmed 💛</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
