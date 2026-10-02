import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { storyData } from '../data/storyData';
import { useCustomPhotos } from '../context/CustomPhotosContext';
import { ImageWithFallback } from './ImageWithFallback';
import { Binary, CheckCircle2, RotateCcw, Heart } from 'lucide-react';

export const UsPhotoWall: React.FC = () => {
  const { usPhotos } = storyData;
  const { getPhotoSrc } = useCustomPhotos();
  const [isCompiled, setIsCompiled] = useState<boolean>(false);
  const [isCompiling, setIsCompiling] = useState<boolean>(false);
  const [compileProgress, setCompileProgress] = useState<number>(0);
  const [buildStep, setBuildStep] = useState<string>('');

  const handleCompile = () => {
    if (isCompiled) {
      // Toggle back to scattered
      setIsCompiled(false);
      return;
    }

    setIsCompiling(true);
    setCompileProgress(0);

    const steps = usPhotos.buildSteps;
    setBuildStep(steps[0]);

    const interval = setInterval(() => {
      setCompileProgress((prev) => {
        const next = prev + 10;
        if (next >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsCompiling(false);
            setIsCompiled(true);
          }, 400);
          return 100;
        }

        const stepIdx = Math.floor((next / 100) * steps.length);
        if (stepIdx < steps.length) {
          setBuildStep(steps[stepIdx]);
        }
        return next;
      });
    }, 70);
  };

  // Pre-calculated heart offsets for up to 8 photos for a symmetrical heart silhouette
  // Heart coordinates normalized
  const heartOffsets = [
    { x: -50, y: -40, rotate: -6 },  // Top left lobe
    { x: 50, y: -40, rotate: 6 },    // Top right lobe
    { x: -90, y: 15, rotate: -12 },  // Left side
    { x: 90, y: 15, rotate: 12 },    // Right side
    { x: 0, y: -10, rotate: 0 },     // Center inner heart
    { x: -45, y: 70, rotate: -8 },   // Bottom left taper
    { x: 45, y: 70, rotate: 8 },     // Bottom right taper
    { x: 0, y: 120, rotate: 0 },     // Bottom heart tip
  ];

  return (
    <section id="us" className="relative py-24 px-6 sm:px-12 max-w-6xl mx-auto overflow-hidden">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-yellow-soft/50 border border-yellow-primary/40 text-charcoal font-mono text-xs font-semibold tracking-wider"
        >
          <Heart className="w-3.5 h-3.5 text-yellow-deep fill-yellow-deep" />
          <span>MODULE // US_CORE</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-3xl sm:text-5xl font-extrabold text-charcoal tracking-tight font-sans"
        >
          {usPhotos.sectionTitle}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-base sm:text-lg text-charcoal-light font-normal max-w-xl mx-auto"
        >
          {usPhotos.sectionSubtitle}
        </motion.p>

        {/* Compile Us Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="pt-4"
        >
          <button
            onClick={handleCompile}
            disabled={isCompiling}
            className="group inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-charcoal text-yellow-primary font-bold text-sm sm:text-base border-2 border-yellow-primary shadow-yellow-glow hover:bg-charcoal-black hover:shadow-yellow-bright hover:scale-105 active:scale-95 transition-all cursor-pointer font-mono"
          >
            {isCompiled ? (
              <>
                <RotateCcw className="w-4 h-4 text-yellow-primary group-hover:-rotate-90 transition-transform" />
                <span>SCATTER US AGAIN</span>
              </>
            ) : (
              <>
                <Binary className="w-4 h-4 text-yellow-primary animate-pulse" />
                <span>{usPhotos.compileButton}</span>
              </>
            )}
          </button>
        </motion.div>
      </div>

      {/* Developer Progress Indicator during compilation */}
      <AnimatePresence>
        {isCompiling && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="max-w-md mx-auto my-6 p-4 rounded-xl bg-[#161412] text-yellow-primary font-mono text-xs border border-yellow-primary/40 shadow-yellow-glow space-y-2 z-30"
          >
            <div className="flex justify-between items-center text-cream-100">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-yellow-primary animate-ping" />
                {buildStep}
              </span>
              <span>{compileProgress}%</span>
            </div>
            <div className="w-full h-2 bg-[#27231D] rounded-full overflow-hidden border border-yellow-primary/30">
              <div
                className="h-full bg-gradient-to-r from-yellow-primary to-yellow-soft transition-all duration-150"
                style={{ width: `${compileProgress}%` }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Success Badge Banner when compiled */}
      <AnimatePresence>
        {isCompiled && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="max-w-sm mx-auto mb-8 p-3 rounded-xl bg-yellow-soft/40 border border-yellow-primary/50 text-charcoal font-mono text-xs flex items-center justify-center gap-2"
          >
            <CheckCircle2 className="w-4 h-4 text-yellow-deep" />
            <span className="font-bold">BUILD SUCCESSFUL:</span>
            <span>❤️ us assembled in heart sync</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Photo Wall: Natural Scatter vs Compiled Heart Grid */}
      <div
        className={`relative min-h-[500px] transition-all duration-1000 ${
          isCompiled
            ? 'flex flex-wrap justify-center items-center max-w-4xl mx-auto py-8 gap-4 sm:gap-6'
            : 'grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8'
        }`}
      >
        {usPhotos.photos.map((photo, index) => {
          const heartPos = heartOffsets[index % heartOffsets.length];

          return (
            <motion.div
              key={photo.id}
              layout
              transition={{
                type: "spring",
                stiffness: 80,
                damping: 18,
              }}
              className={`relative group ${
                isCompiled
                  ? 'w-36 sm:w-48 z-20'
                  : 'w-full'
              }`}
              style={
                isCompiled
                  ? {
                      transform: `rotate(${heartPos.rotate}deg)`,
                    }
                  : {}
              }
            >
              {/* Polaroid Frame */}
              <div className="polaroid-card border border-yellow-primary/30 group-hover:border-yellow-primary group-hover:shadow-polaroid-hover transition-all">
                <div className="overflow-hidden rounded">
                  <ImageWithFallback
                    src={getPhotoSrc(photo.id, photo.src)}
                    alt={photo.caption || "Us"}
                    fallbackTitle="Cute Us"
                    fallbackSubtitle={`memory 0${index + 1}`}
                    aspectClass="aspect-4/3"
                    className="w-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                {photo.caption && (
                  <p className="mt-2 text-xs font-handwriting text-charcoal/80 font-semibold text-center truncate group-hover:text-charcoal transition-colors">
                    {photo.caption}
                  </p>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};
