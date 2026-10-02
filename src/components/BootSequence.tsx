import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { storyData } from '../data/storyData';
import { Terminal, ArrowRight, FastForward } from 'lucide-react';

interface BootSequenceProps {
  onComplete: () => void;
}

export const BootSequence: React.FC<BootSequenceProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [progress, setProgress] = useState<number>(0);
  const [isSystemReady, setIsSystemReady] = useState<boolean>(false);
  const [showWelcome, setShowWelcome] = useState<boolean>(false);

  const { boot } = storyData;

  // Step-by-step terminal loading
  useEffect(() => {
    // Initial delay before steps start
    const stepInterval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < boot.steps.length) {
          return prev + 1;
        } else {
          clearInterval(stepInterval);
          return prev;
        }
      });
    }, 420);

    return () => clearInterval(stepInterval);
  }, [boot.steps.length]);

  // When all steps are loaded, trigger progress bar and ready state
  useEffect(() => {
    if (currentStep >= boot.steps.length) {
      const progressTimer = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(progressTimer);
            setIsSystemReady(true);
            setTimeout(() => setShowWelcome(true), 350);
            return 100;
          }
          return prev + 5;
        });
      }, 40);

      return () => clearInterval(progressTimer);
    }
  }, [currentStep, boot.steps.length]);

  // Keyboard shortcut listener to skip
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || (showWelcome && e.key === 'Enter')) {
        onComplete();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onComplete, showWelcome]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.02 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="fixed inset-0 z-50 bg-[#0F0E0C] text-[#FFD84D] font-mono flex flex-col justify-between p-6 sm:p-12 overflow-hidden selection:bg-[#FFD84D] selection:text-[#0F0E0C]"
    >
      {/* Background CRT scanlines */}
      <div className="absolute inset-0 crt-scanlines pointer-events-none" />

      {/* Top Bar */}
      <div className="relative z-10 flex items-center justify-between text-xs text-[#FFD84D]/60 tracking-wider">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-[#FFD84D]" />
          <span>PORT: 8080 // SESSION_ID: NIMU_LOVE_V1.0</span>
        </div>
        <button
          onClick={onComplete}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded border border-[#FFD84D]/30 bg-[#FFD84D]/10 hover:bg-[#FFD84D]/20 text-[#FFD84D] transition-colors cursor-pointer text-xs"
          title="Press Esc to skip"
        >
          <FastForward className="w-3.5 h-3.5" />
          <span>Skip [ESC]</span>
        </button>
      </div>

      {/* Terminal Main Window */}
      <div className="relative z-10 max-w-2xl w-full mx-auto my-auto space-y-4">
        {/* Header */}
        <div className="border-b border-[#FFD84D]/20 pb-3">
          <div className="text-xl sm:text-2xl font-bold tracking-tight text-[#FFD84D] flex items-center gap-2">
            <span>{boot.title}</span>
            <span className="w-2.5 h-5 bg-[#FFD84D] animate-pulse" />
          </div>
          <p className="text-xs sm:text-sm text-[#FFD84D]/70 mt-1">
            {boot.subtitle}
          </p>
        </div>

        {/* Steps List */}
        <div className="space-y-1.5 min-h-[160px] text-xs sm:text-sm">
          {boot.steps.map((step, idx) => (
            <AnimatePresence key={idx}>
              {idx < currentStep && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center justify-between font-mono"
                >
                  <span className="text-[#FFF9E8]/90">{step.split('OK')[0]}</span>
                  <span className="text-[#FFD84D] font-bold px-1.5 py-0.5 rounded bg-[#FFD84D]/10 text-xs">
                    OK
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          ))}
        </div>

        {/* Progress Bar */}
        {currentStep >= boot.steps.length && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-2 pt-2"
          >
            <div className="flex justify-between text-xs text-[#FFD84D]/80">
              <span>{isSystemReady ? boot.systemReady : "compiling memories..."}</span>
              <span>{progress}%</span>
            </div>
            <div className="w-full h-2 bg-[#27231D] rounded-full overflow-hidden border border-[#FFD84D]/30">
              <motion.div
                className="h-full bg-gradient-to-r from-[#FFD84D] to-[#FFF1A8]"
                style={{ width: `${progress}%` }}
              />
            </div>
          </motion.div>
        )}

        {/* Welcome & Enter CTA */}
        {showWelcome && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="pt-6 space-y-4"
          >
            <div className="text-lg sm:text-xl font-semibold text-[#FFFDF5]">
              {boot.welcome}
            </div>

            <button
              onClick={onComplete}
              autoFocus
              className="group relative inline-flex items-center gap-3 px-7 py-3.5 rounded-lg bg-[#FFD84D] text-[#161412] font-semibold text-sm sm:text-base shadow-yellow-glow hover:bg-[#FFF1A8] hover:shadow-yellow-bright transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
            >
              <span>{boot.enterButton}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        )}
      </div>

      {/* Footer Info */}
      <div className="relative z-10 text-center text-[11px] text-[#FFD84D]/40">
        crafted with 💛 for Boyfriend&apos;s Day
      </div>
    </motion.div>
  );
};
