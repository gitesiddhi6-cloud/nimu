import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { storyData } from '../data/storyData';
import { useCustomPhotos } from '../context/CustomPhotosContext';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Music,
  Disc3,
  X,
  ChevronUp,
} from 'lucide-react';

interface MusicPlayerProps {
  hasEntered: boolean;
}

export const MusicPlayer: React.FC<MusicPlayerProps> = ({ hasEntered }) => {
  const { music } = storyData;
  const { getSongData, setIsManagerOpen, setManagerTab } = useCustomPhotos();
  const currentSong = getSongData();

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [volume, setVolume] = useState<number>(0.75);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [showPrompt, setShowPrompt] = useState<boolean>(false);
  const [isExpandedOnMobile, setIsExpandedOnMobile] = useState<boolean>(false);
  const [isMinimized, setIsMinimized] = useState<boolean>(false);
  const [hasAudioError, setHasAudioError] = useState<boolean>(false);

  // Reload audio if custom song source changes
  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.load();
      if (isPlaying) {
        audio.play().catch(() => {});
      }
    }
  }, [currentSong.src]);

  // Show the music prompt toast 1.5s after user completes boot sequence and enters
  useEffect(() => {
    if (hasEntered && !isPlaying) {
      const timer = setTimeout(() => {
        setShowPrompt(true);
      }, 1600);
      return () => clearTimeout(timer);
    }
  }, [hasEntered, isPlaying]);

  // Audio element event bindings
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleLoadedMetadata = () => {
      setDuration(audio.duration || 0);
      setHasAudioError(false);
    };

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime || 0);
    };

    const handleEnded = () => {
      // Loop smoothly
      audio.currentTime = 0;
      audio.play().catch(() => setIsPlaying(false));
    };

    const handleError = () => {
      console.warn("Audio file could not be played. Gracefully handling player state.");
      setHasAudioError(true);
    };

    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('error', handleError);

    return () => {
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('error', handleError);
    };
  }, []);

  // Handle play/pause
  const togglePlay = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      try {
        await audio.play();
        setIsPlaying(true);
        setShowPrompt(false);
      } catch (err) {
        console.warn("Audio play prevented or file missing:", err);
      }
    }
  };

  const startPlayingFromPrompt = async () => {
    setShowPrompt(false);
    const audio = audioRef.current;
    if (!audio) return;
    try {
      await audio.play();
      setIsPlaying(true);
    } catch (err) {
      console.warn("Audio autoplay blocked:", err);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (!audio) return;
    const newTime = parseFloat(e.target.value);
    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVol = parseFloat(e.target.value);
    setVolume(newVol);
    if (audioRef.current) {
      audioRef.current.volume = newVol;
      setIsMuted(newVol === 0);
    }
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isMuted) {
      audio.volume = volume || 0.75;
      setIsMuted(false);
    } else {
      audio.volume = 0;
      setIsMuted(true);
    }
  };

  const formatTime = (secs: number) => {
    if (isNaN(secs) || secs === 0) return '0:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <>
      {/* Hidden audio element with preload */}
      <audio
        ref={audioRef}
        src={currentSong.src}
        preload="metadata"
        loop
      />

      {/* 1. Elegant Prompt Banner ("I picked a song for you. 🎵") */}
      <AnimatePresence>
        {showPrompt && !isPlaying && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.9 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 w-[90%] max-w-sm bg-[#161412]/95 backdrop-blur-xl border border-yellow-primary/40 rounded-2xl p-4 shadow-yellow-bright flex items-center justify-between gap-4 text-cream-50"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-yellow-primary/20 border border-yellow-primary/40 flex items-center justify-center text-yellow-primary animate-pulse">
                <Music className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-mono text-yellow-soft">SOUNDTRACK</p>
                <p className="text-sm font-semibold text-[#FFFDF5]">
                  {music.promptText}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={startPlayingFromPrompt}
                className="px-3.5 py-2 rounded-xl bg-yellow-primary text-charcoal-black text-xs font-bold hover:bg-yellow-soft transition-colors shadow-yellow-sm cursor-pointer whitespace-nowrap"
              >
                {music.promptButton}
              </button>
              <button
                onClick={() => setShowPrompt(false)}
                className="p-1 rounded-full text-cream-200/60 hover:text-cream-50 hover:bg-white/10 transition-colors"
                title="Dismiss"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. Persistent Floating Music Player */}
      <div className="fixed bottom-5 right-5 z-40 pointer-events-auto">
        {/* Mobile View: Circular Button or Expanded Sheet */}
        <div className="sm:hidden">
          {!isExpandedOnMobile ? (
            <motion.button
              whileTap={{ scale: 0.92 }}
              onClick={() => setIsExpandedOnMobile(true)}
              className="w-13 h-13 rounded-full bg-[#161412]/90 backdrop-blur-xl border-2 border-yellow-primary text-yellow-primary shadow-yellow-glow flex items-center justify-center relative cursor-pointer"
              title="Music Player"
            >
              {isPlaying ? (
                <Disc3 className="w-6 h-6 animate-spin text-yellow-primary [animation-duration:4s]" />
              ) : (
                <Music className="w-5 h-5 text-yellow-soft" />
              )}
              {isPlaying && (
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-primary rounded-full animate-ping" />
              )}
            </motion.button>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 10 }}
              className="w-80 bg-[#161412]/95 backdrop-blur-2xl border border-yellow-primary/30 rounded-2xl p-4 shadow-yellow-bright text-cream-50"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-mono text-yellow-soft tracking-wider">
                  PLAYING FOR NIMU 💛
                </span>
                <button
                  onClick={() => setIsExpandedOnMobile(false)}
                  className="p-1 text-cream-200/60 hover:text-cream-50"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="flex items-center gap-3">
                <img
                  src={currentSong.cover}
                  alt={currentSong.title}
                  className={`w-12 h-12 rounded-xl object-cover border border-yellow-primary/30 ${
                    isPlaying ? 'animate-spin [animation-duration:8s]' : ''
                  }`}
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold truncate text-[#FFFDF5]">{currentSong.title}</p>
                  <p className="text-xs text-yellow-soft/80 truncate">{currentSong.artist}</p>
                </div>
                <button
                  onClick={togglePlay}
                  className="w-10 h-10 rounded-full bg-yellow-primary text-charcoal-black flex items-center justify-center hover:bg-yellow-soft transition-colors cursor-pointer"
                >
                  {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-0.5" />}
                </button>
              </div>

              {/* Progress */}
              <div className="mt-3">
                <input
                  type="range"
                  min={0}
                  max={duration || 100}
                  value={currentTime}
                  onChange={handleSeek}
                  className="w-full h-1.5 bg-[#27231D] accent-[#FFD84D] rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[10px] font-mono text-cream-200/60 mt-1">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Desktop View: Sleek floating glass dock */}
        <div className="hidden sm:block">
          {isMinimized ? (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMinimized(false)}
              className="flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-[#161412]/90 backdrop-blur-xl border border-yellow-primary/40 text-yellow-primary shadow-yellow-glow hover:bg-[#161412] transition-colors cursor-pointer"
            >
              <Disc3 className={`w-5 h-5 ${isPlaying ? 'animate-spin text-yellow-primary [animation-duration:4s]' : 'text-yellow-soft'}`} />
              <span className="text-xs font-mono font-medium text-yellow-soft">
                {isPlaying ? "playing our song..." : "our song"}
              </span>
              <ChevronUp className="w-3.5 h-3.5 text-yellow-soft/70" />
            </motion.button>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-88 bg-[#161412]/92 backdrop-blur-2xl border border-yellow-primary/30 rounded-2xl p-3.5 shadow-yellow-bright text-cream-50"
            >
              {/* Header inside player */}
              <div className="flex items-center justify-between text-[11px] font-mono text-yellow-soft/70 pb-2 mb-2 border-b border-white/5">
                <button
                  onClick={() => {
                    setManagerTab('song');
                    setIsManagerOpen(true);
                  }}
                  className="flex items-center gap-1.5 hover:text-yellow-primary transition-colors cursor-pointer group"
                  title="Click to customize song"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-yellow-primary animate-pulse" />
                  <span className="group-hover:underline">CUSTOMIZE SONG 🎵</span>
                </button>
                <button
                  onClick={() => setIsMinimized(true)}
                  className="text-cream-200/50 hover:text-cream-50 text-[10px] px-1 py-0.5 rounded hover:bg-white/5 cursor-pointer"
                  title="Minimize"
                >
                  minimize
                </button>
              </div>

              {/* Player Body */}
              <div className="flex items-center gap-3">
                <div className="relative w-12 h-12 flex-shrink-0">
                  <img
                    src={currentSong.cover}
                    alt={currentSong.title}
                    className={`w-12 h-12 rounded-xl object-cover border border-yellow-primary/30 ${
                      isPlaying ? 'animate-spin [animation-duration:8s]' : ''
                    }`}
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                  {isPlaying && (
                    <div className="absolute inset-0 rounded-xl ring-2 ring-yellow-primary/40 pointer-events-none" />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold truncate text-[#FFFDF5] tracking-wide">
                    {currentSong.title}
                  </p>
                  <p className="text-xs text-yellow-soft/80 truncate font-mono">
                    {currentSong.artist}
                  </p>

                  {/* Scrubber */}
                  <div className="mt-1.5">
                    <input
                      type="range"
                      min={0}
                      max={duration || 100}
                      value={currentTime}
                      onChange={handleSeek}
                      className="w-full h-1 bg-[#27231D] accent-[#FFD84D] rounded-full cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] font-mono text-cream-200/60 mt-0.5">
                      <span>{formatTime(currentTime)}</span>
                      <span>{formatTime(duration)}</span>
                    </div>
                  </div>
                </div>

                {/* Controls */}
                <div className="flex flex-col items-center gap-1.5 flex-shrink-0">
                  <button
                    onClick={togglePlay}
                    className="w-10 h-10 rounded-full bg-yellow-primary text-charcoal-black flex items-center justify-center hover:bg-yellow-soft transition-all transform hover:scale-105 active:scale-95 shadow-yellow-sm cursor-pointer"
                    title={isPlaying ? "Pause" : "Play"}
                  >
                    {isPlaying ? (
                      <Pause className="w-5 h-5 fill-current" />
                    ) : (
                      <Play className="w-5 h-5 fill-current ml-0.5" />
                    )}
                  </button>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={toggleMute}
                      className="p-1 text-cream-200/60 hover:text-yellow-soft transition-colors"
                      title={isMuted ? "Unmute" : "Mute"}
                    >
                      {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                    </button>
                    <input
                      type="range"
                      min={0}
                      max={1}
                      step={0.05}
                      value={isMuted ? 0 : volume}
                      onChange={handleVolumeChange}
                      className="w-12 h-1 bg-[#27231D] accent-[#FFD84D] rounded cursor-pointer"
                    />
                  </div>
                </div>
              </div>

              {hasAudioError && (
                <p className="text-[10px] text-yellow-soft/50 font-mono mt-1 text-center">
                  Audio file ready in /audio/our-song.mp3
                </p>
              )}
            </motion.div>
          )}
        </div>
      </div>
    </>
  );
};
