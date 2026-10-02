import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { storyData } from '../data/storyData';
import { X, Code, Heart } from 'lucide-react';

interface DeveloperEasterEggsProps {
  isTerminalOpen: boolean;
  onCloseTerminal: () => void;
  showHeartSecretToast: boolean;
  onCloseHeartToast: () => void;
}

export const DeveloperEasterEggs: React.FC<DeveloperEasterEggsProps> = ({
  isTerminalOpen,
  onCloseTerminal,
  showHeartSecretToast,
  onCloseHeartToast,
}) => {
  const { easterEggs } = storyData;
  const [localTerminalOpen, setLocalTerminalOpen] = useState<boolean>(false);

  // 1. Console Easter Egg on mount
  useEffect(() => {
    // Style console logs with yellow CSS
    const headerStyle =
      'color: #161412; background: #FFD84D; font-size: 16px; font-weight: bold; padding: 6px 12px; border-radius: 4px;';
    const bodyStyle =
      'color: #E6B800; font-size: 13px; font-family: monospace; line-height: 1.6;';
    const varStyle =
      'color: #D4AF37; font-size: 14px; font-weight: bold; font-family: monospace; background: #27231D; padding: 4px 8px; border-radius: 4px;';

    console.log('%c💛 Hey Nimu.', headerStyle);
    console.log(
      `%c\nIf you're reading this...\n\nYes.\n\nI knew you'd open the console.\n\nI made this specifically for you. :)\n`,
      bodyStyle
    );
    console.log(`%cconst question = "Will you be my boyfriend?";`, varStyle);

    // Attach to window object for curious devs
    (window as unknown as { question: string }).question = "Will you be my boyfriend? 💛";
    (window as unknown as { nimu: string }).nimu = "The best boyfriend in the universe.";
  }, []);

  // 2. Secret keyboard listener ('sudo', 'nimu', or '~')
  useEffect(() => {
    let keyBuffer = '';
    const handleKeyDown = (e: KeyboardEvent) => {
      // Allow shortcut '~' or '`'
      if (e.key === '`' || e.key === '~') {
        e.preventDefault();
        setLocalTerminalOpen((prev) => !prev);
        return;
      }

      // Buffer character typing for "sudo" or "nimu"
      if (e.key.length === 1) {
        keyBuffer = (keyBuffer + e.key.toLowerCase()).slice(-10);
        if (keyBuffer.includes('sudo') || keyBuffer.includes('nimu')) {
          setLocalTerminalOpen(true);
          keyBuffer = '';
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const isModalActive = isTerminalOpen || localTerminalOpen;

  const handleClose = () => {
    setLocalTerminalOpen(false);
    onCloseTerminal();
  };

  return (
    <>
      {/* Secret Keyboard Terminal Modal */}
      <AnimatePresence>
        {isModalActive && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="w-full max-w-lg bg-[#0F0E0C] border border-[#FFD84D]/50 rounded-2xl shadow-yellow-bright overflow-hidden text-yellow-primary font-mono text-xs sm:text-sm selection:bg-[#FFD84D] selection:text-[#0F0E0C]"
            >
              {/* Terminal Titlebar */}
              <div className="bg-[#1A1815] px-4 py-3 border-b border-[#FFD84D]/30 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                  <span className="text-[#FFF9E8]/70 text-[11px] ml-2 font-mono">
                    bash — sudo access --nimu
                  </span>
                </div>
                <button
                  onClick={handleClose}
                  className="text-[#FFD84D]/60 hover:text-[#FFD84D] p-1 rounded hover:bg-white/5"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Terminal Body */}
              <div className="p-6 space-y-4">
                <div className="text-yellow-soft">
                  <span className="text-green-400">user@girlfriend-machine</span>:
                  <span className="text-blue-400">~</span>$ {easterEggs.keyboard.command}
                </div>

                <div className="space-y-1">
                  <p className="text-green-400 font-bold tracking-wider">
                    {easterEggs.keyboard.status}
                  </p>
                  <p className="text-yellow-soft/80">
                    &gt; {easterEggs.keyboard.welcome}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-yellow-primary/10 border border-yellow-primary/30 text-[#FFFDF5] space-y-2">
                  <p className="font-semibold text-yellow-primary">
                    You found the secret.
                  </p>
                  <p className="leading-relaxed">
                    Of course you did.
                  </p>
                  <p className="text-yellow-soft font-bold">
                    You&apos;re a programmer. 🙄💛
                  </p>
                </div>

                <div className="text-[11px] text-yellow-soft/50 pt-2 flex justify-between items-center">
                  <span>Press ESC or close button to exit</span>
                  <span className="flex items-center gap-1 text-yellow-primary">
                    <Code className="w-3 h-3" /> git commit -m &quot;she loves me&quot;
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Secret Heart Click Toast */}
      <AnimatePresence>
        {showHeartSecretToast && (
          <motion.div
            initial={{ opacity: 0, y: -40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -30, scale: 0.9 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-md bg-[#161412] text-yellow-primary border-2 border-yellow-primary/80 rounded-2xl p-4 shadow-yellow-bright flex items-center justify-between gap-3 font-mono"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-yellow-primary/20 border border-yellow-primary flex items-center justify-center flex-shrink-0 animate-bounce">
                <Heart className="w-5 h-5 fill-yellow-primary text-yellow-primary" />
              </div>
              <div className="text-xs sm:text-sm text-cream-50">
                <p className="font-bold text-yellow-primary mb-0.5">DEBUGGER CAUGHT:</p>
                <p className="whitespace-pre-line leading-relaxed">
                  {easterEggs.heart.message}
                </p>
              </div>
            </div>
            <button
              onClick={onCloseHeartToast}
              className="p-1 text-cream-200/60 hover:text-yellow-primary transition-colors flex-shrink-0"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
