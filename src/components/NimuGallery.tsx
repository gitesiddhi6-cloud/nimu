import React from 'react';
import { motion } from 'framer-motion';
import { storyData } from '../data/storyData';
import { useCustomPhotos } from '../context/CustomPhotosContext';
import { ImageWithFallback } from './ImageWithFallback';
import { Heart, Sparkles } from 'lucide-react';

export const NimuGallery: React.FC = () => {
  const { nimuPhotos } = storyData;
  const { getPhotoSrc } = useCustomPhotos();

  return (
    <section id="nimu" className="relative py-20 px-6 sm:px-12 max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-yellow-soft/50 border border-yellow-primary/40 text-charcoal font-mono text-xs font-semibold tracking-wider"
        >
          <Heart className="w-3.5 h-3.5 text-yellow-deep fill-yellow-deep" />
          <span>SOLO REPO // HIM ONLY</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-3xl sm:text-5xl font-extrabold text-charcoal tracking-tight font-sans"
        >
          {nimuPhotos.sectionTitle}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-base sm:text-lg text-charcoal-light font-normal max-w-xl mx-auto"
        >
          {nimuPhotos.sectionSubtitle}
        </motion.p>
      </div>

      {/* Masonry / Scrapbook Grid of Him */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
        {nimuPhotos.photos.map((photo, index) => {
          const rotationClass =
            index % 3 === 0
              ? 'hover:rotate-0 -rotate-2'
              : index % 3 === 1
              ? 'hover:rotate-0 rotate-2'
              : 'hover:rotate-0 -rotate-1';

          return (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="flex justify-center"
            >
              <div
                className={`relative group w-full max-w-sm transition-all duration-300 transform ${rotationClass}`}
              >
                {/* Washi Tape */}
                <div
                  className={`washi-tape-yellow top-[-10px] left-1/2 -translate-x-1/2 w-20 z-20 ${
                    index % 2 === 0 ? '-rotate-3' : 'rotate-2'
                  }`}
                />

                {/* Polaroid Frame */}
                <div className="polaroid-card border border-yellow-primary/30 group-hover:border-yellow-primary group-hover:shadow-polaroid-hover transition-all">
                  <div className="overflow-hidden rounded">
                    <ImageWithFallback
                      src={getPhotoSrc(photo.id, photo.src)}
                      alt={photo.caption || "Nimu"}
                      fallbackTitle="Handsome Nimu"
                      fallbackSubtitle={`photo 0${index + 1}`}
                      aspectClass={photo.aspectRatio === 'square' ? 'aspect-square' : 'aspect-3/4'}
                      className="w-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  {/* Caption (appears on hover / clear on mobile) */}
                  <div className="mt-3 min-h-[30px] flex items-center justify-between">
                    {photo.caption ? (
                      <p className="text-sm font-handwriting text-charcoal font-semibold tracking-wide text-center w-full group-hover:text-yellow-deep transition-colors text-base sm:text-lg">
                        “{photo.caption}”
                      </p>
                    ) : (
                      <div className="flex items-center justify-center w-full text-xs font-mono text-charcoal/40">
                        <Sparkles className="w-3.5 h-3.5 text-yellow-primary mr-1" />
                        <span>pure cuteness</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};
