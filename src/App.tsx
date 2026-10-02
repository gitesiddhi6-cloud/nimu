import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { CustomPhotosProvider } from './context/CustomPhotosContext';
import { BootSequence } from './components/BootSequence';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { StoryTimeline } from './components/StoryTimeline';
import { NimuGallery } from './components/NimuGallery';
import { UsPhotoWall } from './components/UsPhotoWall';
import { LoveLetter } from './components/LoveLetter';
import { Proposal } from './components/Proposal';
import { MusicPlayer } from './components/MusicPlayer';
import { DeveloperEasterEggs } from './components/DeveloperEasterEggs';
import { PhotoUploadManager } from './components/PhotoUploadManager';

export const AppContent: React.FC = () => {
  const [hasEntered, setHasEntered] = useState<boolean>(() => {
    return sessionStorage.getItem('nimu_entered') === 'true';
  });

  const [isTerminalModalOpen, setIsTerminalModalOpen] = useState<boolean>(false);
  const [showHeartToast, setShowHeartToast] = useState<boolean>(false);

  const handleBootComplete = () => {
    sessionStorage.setItem('nimu_entered', 'true');
    setHasEntered(true);
  };

  const scrollToStory = () => {
    const el = document.getElementById('story');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-[#FFFDF5] text-[#27231D] font-sans selection:bg-yellow-primary selection:text-charcoal-black overflow-x-hidden">
      {/* 1. Developer Boot Sequence Screen (with skip option) */}
      <AnimatePresence>
        {!hasEntered && (
          <BootSequence onComplete={handleBootComplete} />
        )}
      </AnimatePresence>

      {/* Main Experience after boot sequence */}
      {hasEntered && (
        <>
          {/* Floating Navigation Pill */}
          <Navigation
            onHeartSecretTrigger={() => setShowHeartToast(true)}
            onOpenTerminalSecret={() => setIsTerminalModalOpen(true)}
          />

          {/* Main Website Sections */}
          <main className="relative z-10 w-full">
            {/* 1. Hero Section */}
            <Hero onStartStory={scrollToStory} />

            {/* 2. Story Section (Vertical Scroll Timeline with 8 Memories) */}
            <StoryTimeline />

            {/* 3. Nimu Photo Collection ("Just Nimu 💛") */}
            <NimuGallery />

            {/* 4. Us Photo Collection ("Us 🫶" + "COMPILE US 💛") */}
            <UsPhotoWall />

            {/* 5. Emotional Transition & Love Letter */}
            <LoveLetter />

            {/* 6. Climax Proposal & Final Screen */}
            <Proposal />
          </main>

          {/* Persistent Floating Music Player */}
          <MusicPlayer hasEntered={hasEntered} />

          {/* Floating Photo Upload Manager button & modal */}
          <PhotoUploadManager />

          {/* Developer Easter Eggs (Terminal modal, console logs, secret heart toast) */}
          <DeveloperEasterEggs
            isTerminalOpen={isTerminalModalOpen}
            onCloseTerminal={() => setIsTerminalModalOpen(false)}
            showHeartSecretToast={showHeartToast}
            onCloseHeartToast={() => setShowHeartToast(false)}
          />
        </>
      )}
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <CustomPhotosProvider>
      <AppContent />
    </CustomPhotosProvider>
  );
};

export default App;
