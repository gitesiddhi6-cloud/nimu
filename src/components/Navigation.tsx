import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { storyData } from '../data/storyData';
import { useCustomPhotos } from '../context/CustomPhotosContext';
import { Heart, Menu, X, Terminal, Camera } from 'lucide-react';

interface NavigationProps {
  onHeartSecretTrigger: () => void;
  onOpenTerminalSecret: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  onHeartSecretTrigger,
  onOpenTerminalSecret,
}) => {
  const { navigation, names } = storyData;
  const { setIsManagerOpen } = useCustomPhotos();
  const [activeSection, setActiveSection] = useState<string>('story');
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [heartClicks, setHeartClicks] = useState<number>(0);
  const [scrolled, setScrolled] = useState<boolean>(false);

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setScrolled(scrollY > 150);

      const sectionIds = navigation.map((n) => n.targetId);
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [navigation]);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleHeartClick = () => {
    const newCount = heartClicks + 1;
    setHeartClicks(newCount);
    if (newCount >= 7) {
      onHeartSecretTrigger();
      setHeartClicks(0);
    }
  };

  return (
    <>
      <header
        className={`fixed top-4 left-1/2 -translate-x-1/2 z-40 w-[94%] max-w-4xl transition-all duration-300 ${
          scrolled
            ? 'bg-[#161412]/85 backdrop-blur-xl border border-yellow-primary/30 shadow-yellow-sm rounded-full py-2.5 px-4 sm:px-6'
            : 'bg-[#161412]/40 backdrop-blur-md border border-white/10 rounded-full py-2.5 px-4 sm:px-6'
        }`}
      >
        <div className="flex items-center justify-between">
          {/* Brand & Secret Heart Easter Egg */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleHeartClick}
              className="group p-1 text-yellow-primary hover:scale-125 transition-transform cursor-pointer relative"
              title="💛"
            >
              <Heart className="w-5 h-5 fill-yellow-primary text-yellow-deep" />
              {heartClicks > 0 && heartClicks < 7 && (
                <span className="absolute -top-1 -right-1 text-[9px] font-mono bg-yellow-primary text-charcoal font-bold rounded-full w-3.5 h-3.5 flex items-center justify-center animate-ping">
                  {heartClicks}
                </span>
              )}
            </button>
            <span className="font-mono text-xs sm:text-sm font-semibold tracking-wide text-cream-50">
              {names.nickname} <span className="text-yellow-primary">×</span> {names.girlfriend}
            </span>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 sm:gap-2">
            {navigation.map((item) => {
              const isActive = activeSection === item.targetId;
              return (
                <button
                  key={item.targetId}
                  onClick={() => scrollTo(item.targetId)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium tracking-wider transition-all cursor-pointer ${
                    isActive
                      ? 'bg-yellow-primary text-charcoal-black font-semibold shadow-yellow-sm'
                      : 'text-cream-100/70 hover:text-[#FFFDF5] hover:bg-white/5'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}

            {/* Photo Manager button */}
            <button
              onClick={() => setIsManagerOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-yellow-primary/15 text-yellow-primary border border-yellow-primary/40 hover:bg-yellow-primary hover:text-charcoal-black transition-all cursor-pointer ml-1"
              title="Add your pictures"
            >
              <Camera className="w-3.5 h-3.5" />
              <span>Photos</span>
            </button>

            {/* Secret terminal button */}
            <button
              onClick={onOpenTerminalSecret}
              className="p-1.5 rounded-full text-yellow-soft/50 hover:text-yellow-primary hover:bg-white/5 transition-colors cursor-pointer ml-1"
              title="Terminal access (~)"
            >
              <Terminal className="w-3.5 h-3.5" />
            </button>
          </nav>

          {/* Mobile Menu Toggle */}
          <div className="flex items-center gap-1 md:hidden">
            <button
              onClick={onOpenTerminalSecret}
              className="p-1.5 text-yellow-soft/70 hover:text-yellow-primary"
            >
              <Terminal className="w-4 h-4" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 text-cream-50 hover:text-yellow-primary transition-colors cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 left-4 right-4 z-40 bg-[#161412]/95 backdrop-blur-2xl border border-yellow-primary/30 rounded-2xl p-5 shadow-yellow-bright md:hidden text-cream-50"
          >
            <div className="flex flex-col gap-2">
              {navigation.map((item) => (
                <button
                  key={item.targetId}
                  onClick={() => scrollTo(item.targetId)}
                  className="w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium tracking-wide text-cream-100 hover:bg-yellow-primary/20 hover:text-yellow-primary transition-colors flex items-center justify-between"
                >
                  <span>{item.label}</span>
                  <span className="text-yellow-primary/40 font-mono text-xs"># {item.targetId}</span>
                </button>
              ))}

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsManagerOpen(true);
                }}
                className="w-full text-left px-4 py-2.5 rounded-xl text-sm font-semibold tracking-wide bg-yellow-primary/20 text-yellow-primary hover:bg-yellow-primary hover:text-charcoal-black transition-colors flex items-center gap-2 mt-1"
              >
                <Camera className="w-4 h-4" />
                <span>Add My Real Photos 📸</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
