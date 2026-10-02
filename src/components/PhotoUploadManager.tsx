import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCustomPhotos } from '../context/CustomPhotosContext';
import { storyData } from '../data/storyData';
import {
  X,
  Upload,
  CheckCircle2,
  Trash2,
  Camera,
  FolderOpen,
  Music,
  Disc3,
  Sparkles,
} from 'lucide-react';

export const PhotoUploadManager: React.FC = () => {
  const {
    isManagerOpen,
    setIsManagerOpen,
    managerTab,
    setManagerTab,
    customPhotos,
    uploadPhoto,
    resetPhotos,
    getPhotoSrc,
    customAudio,
    uploadAudio,
    updateAudioMetadata,
    resetAudio,
    getSongData,
  } = useCustomPhotos();

  const [uploadingKey, setUploadingKey] = useState<string | null>(null);
  const [songTitleInput, setSongTitleInput] = useState<string>('');
  const [songArtistInput, setSongArtistInput] = useState<string>('');
  const [isSavingMetadata, setIsSavingMetadata] = useState<boolean>(false);

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const audioInputRef = useRef<HTMLInputElement | null>(null);
  const [selectedKeyForInput, setSelectedKeyForInput] = useState<string>('');

  const currentSong = getSongData();

  useEffect(() => {
    setSongTitleInput(currentSong.title);
    setSongArtistInput(currentSong.artist);
  }, [currentSong.title, currentSong.artist]);

  const handleSelectFile = (key: string) => {
    setSelectedKeyForInput(key);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
      fileInputRef.current.click();
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !selectedKeyForInput) return;

    setUploadingKey(selectedKeyForInput);
    try {
      await uploadPhoto(selectedKeyForInput, file);
    } catch (err) {
      console.error('Failed to upload photo:', err);
    } finally {
      setUploadingKey(null);
    }
  };

  const handleAudioChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingKey('audio-track');
    try {
      await uploadAudio(file, songTitleInput, songArtistInput);
    } catch (err) {
      console.error('Failed to upload audio:', err);
    } finally {
      setUploadingKey(null);
    }
  };

  const handleSaveMetadata = async () => {
    setIsSavingMetadata(true);
    try {
      await updateAudioMetadata(songTitleInput, songArtistInput);
    } catch (err) {
      console.error('Failed to update metadata:', err);
    } finally {
      setTimeout(() => setIsSavingMetadata(false), 300);
    }
  };

  return (
    <>
      {/* Hidden file inputs */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
      <input
        ref={audioInputRef}
        type="file"
        accept="audio/*"
        onChange={handleAudioChange}
        className="hidden"
      />

      {/* Floating Quick Action Button */}
      <div className="fixed bottom-24 sm:bottom-6 left-5 z-40 flex items-center gap-2">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            setManagerTab('main');
            setIsManagerOpen(true);
          }}
          className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#161412]/90 backdrop-blur-xl border border-yellow-primary/50 text-yellow-primary shadow-yellow-bright hover:bg-[#161412] hover:border-yellow-primary transition-all text-xs font-mono font-bold cursor-pointer"
        >
          <Camera className="w-4 h-4 text-yellow-primary" />
          <span>My Photos</span>
          {Object.keys(customPhotos).length > 0 && (
            <span className="w-5 h-5 rounded-full bg-yellow-primary text-charcoal-black font-bold text-[10px] flex items-center justify-center">
              {Object.keys(customPhotos).length}
            </span>
          )}
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            setManagerTab('song');
            setIsManagerOpen(true);
          }}
          className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-full bg-[#161412]/90 backdrop-blur-xl border border-yellow-primary/50 text-yellow-primary shadow-yellow-bright hover:bg-[#161412] hover:border-yellow-primary transition-all text-xs font-mono font-bold cursor-pointer"
          title="Customize Song"
        >
          <Music className="w-4 h-4 text-yellow-primary" />
          <span>Song 🎵</span>
          {customAudio && (
            <span className="w-2 h-2 rounded-full bg-yellow-primary animate-ping" />
          )}
        </motion.button>
      </div>

      {/* Photo & Song Manager Modal */}
      <AnimatePresence>
        {isManagerOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="w-full max-w-3xl bg-[#161412] border border-yellow-primary/40 rounded-3xl shadow-yellow-bright overflow-hidden text-cream-50 flex flex-col max-h-[90vh]"
            >
              {/* Header */}
              <div className="p-5 sm:p-6 border-b border-yellow-primary/20 flex items-center justify-between">
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-yellow-primary font-sans flex items-center gap-2">
                    <Sparkles className="w-6 h-6" />
                    <span>Personalize Photos &amp; Song 💛</span>
                  </h3>
                  <p className="text-xs text-cream-200/70 mt-1">
                    Upload your real pictures and favorite audio track directly into the website.
                  </p>
                </div>
                <button
                  onClick={() => setIsManagerOpen(false)}
                  className="p-2 text-cream-200/60 hover:text-cream-50 rounded-full hover:bg-white/10"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Tabs */}
              <div className="flex border-b border-yellow-primary/20 px-6 gap-2 bg-[#1A1815] overflow-x-auto text-xs font-mono">
                <button
                  onClick={() => setManagerTab('song')}
                  className={`py-3 px-3 border-b-2 font-medium transition-colors whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                    managerTab === 'song'
                      ? 'border-yellow-primary text-yellow-primary font-bold'
                      : 'border-transparent text-cream-200/60 hover:text-cream-100'
                  }`}
                >
                  <Music className="w-3.5 h-3.5" />
                  <span>Customize Song</span>
                </button>
                <button
                  onClick={() => setManagerTab('main')}
                  className={`py-3 px-3 border-b-2 font-medium transition-colors whitespace-nowrap cursor-pointer ${
                    managerTab === 'main'
                      ? 'border-yellow-primary text-yellow-primary font-bold'
                      : 'border-transparent text-cream-200/60 hover:text-cream-100'
                  }`}
                >
                  Main Couple Photo
                </button>
                <button
                  onClick={() => setManagerTab('memories')}
                  className={`py-3 px-3 border-b-2 font-medium transition-colors whitespace-nowrap cursor-pointer ${
                    managerTab === 'memories'
                      ? 'border-yellow-primary text-yellow-primary font-bold'
                      : 'border-transparent text-cream-200/60 hover:text-cream-100'
                  }`}
                >
                  Our 8 Memories
                </button>
                <button
                  onClick={() => setManagerTab('nimu')}
                  className={`py-3 px-3 border-b-2 font-medium transition-colors whitespace-nowrap cursor-pointer ${
                    managerTab === 'nimu'
                      ? 'border-yellow-primary text-yellow-primary font-bold'
                      : 'border-transparent text-cream-200/60 hover:text-cream-100'
                  }`}
                >
                  Just Nimu (6)
                </button>
                <button
                  onClick={() => setManagerTab('us')}
                  className={`py-3 px-3 border-b-2 font-medium transition-colors whitespace-nowrap cursor-pointer ${
                    managerTab === 'us'
                      ? 'border-yellow-primary text-yellow-primary font-bold'
                      : 'border-transparent text-cream-200/60 hover:text-cream-100'
                  }`}
                >
                  Us Photos (8)
                </button>
              </div>

              {/* Tab Content List */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {/* 1. Song Customizer Tab */}
                {managerTab === 'song' && (
                  <div className="space-y-6">
                    <div className="p-5 rounded-2xl bg-[#1F1C18] border border-yellow-primary/30 space-y-4">
                      <div className="flex flex-col sm:flex-row items-center gap-4">
                        <div className="relative w-24 h-24 rounded-2xl overflow-hidden border border-yellow-primary/40 bg-black flex-shrink-0">
                          <img
                            src={currentSong.cover}
                            alt="Song Cover"
                            className="w-full h-full object-cover"
                          />
                          <button
                            onClick={() => handleSelectFile('song-cover')}
                            className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 flex flex-col items-center justify-center text-[10px] text-yellow-primary transition-opacity cursor-pointer"
                          >
                            <Camera className="w-5 h-5 mb-1" />
                            <span>Change</span>
                          </button>
                        </div>

                        <div className="flex-1 text-center sm:text-left space-y-1">
                          <div className="flex items-center justify-center sm:justify-start gap-2">
                            <Disc3 className="w-4 h-4 text-yellow-primary animate-spin [animation-duration:6s]" />
                            <span className="text-xs font-mono text-yellow-soft">CURRENT SOUNDTRACK</span>
                          </div>
                          <p className="font-bold text-yellow-primary text-lg">{currentSong.title}</p>
                          <p className="text-xs text-cream-200/80 font-mono">{currentSong.artist}</p>
                          <p className="text-[11px] text-yellow-soft/60 pt-1">
                            {customAudio
                              ? `✨ Custom Audio Active (${customAudio.filename || 'Uploaded File'})`
                              : 'Default Romantic Melody Active'}
                          </p>
                        </div>

                        <button
                          onClick={() => {
                            if (audioInputRef.current) {
                              audioInputRef.current.value = '';
                              audioInputRef.current.click();
                            }
                          }}
                          disabled={uploadingKey === 'audio-track'}
                          className="px-5 py-3 rounded-xl bg-yellow-primary hover:bg-yellow-soft text-charcoal font-bold text-xs flex items-center gap-2 cursor-pointer shadow-yellow-sm"
                        >
                          <Upload className="w-4 h-4" />
                          <span>{customAudio ? 'Replace Audio File' : 'Upload MP3 / Audio'}</span>
                        </button>
                      </div>

                      {/* Song Title & Artist Inputs */}
                      <div className="pt-4 border-t border-yellow-primary/10 grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-mono text-yellow-soft mb-1">
                            Song Title
                          </label>
                          <input
                            type="text"
                            value={songTitleInput}
                            onChange={(e) => setSongTitleInput(e.target.value)}
                            placeholder="e.g. Our Song, Kesariya, Perfect"
                            className="w-full px-3.5 py-2.5 rounded-xl bg-[#141210] border border-yellow-primary/30 text-cream-50 text-xs focus:border-yellow-primary focus:outline-none font-sans"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-mono text-yellow-soft mb-1">
                            Artist / Note
                          </label>
                          <input
                            type="text"
                            value={songArtistInput}
                            onChange={(e) => setSongArtistInput(e.target.value)}
                            placeholder="e.g. Nimu × Me, Arijit Singh"
                            className="w-full px-3.5 py-2.5 rounded-xl bg-[#141210] border border-yellow-primary/30 text-cream-50 text-xs focus:border-yellow-primary focus:outline-none font-sans"
                          />
                        </div>
                      </div>

                      <div className="flex justify-between items-center pt-2">
                        <button
                          onClick={() => handleSelectFile('song-cover')}
                          className="text-xs text-yellow-soft/70 hover:text-yellow-primary flex items-center gap-1.5 cursor-pointer"
                        >
                          <Camera className="w-3.5 h-3.5" />
                          <span>Change Album Cover Photo</span>
                        </button>

                        <button
                          onClick={handleSaveMetadata}
                          className="px-4 py-2 rounded-lg bg-yellow-primary/20 hover:bg-yellow-primary hover:text-charcoal text-yellow-primary font-semibold text-xs transition-colors cursor-pointer"
                        >
                          {isSavingMetadata ? 'Saving...' : 'Update Song Info'}
                        </button>
                      </div>
                    </div>

                    {/* Helpful folder instructions */}
                    <div className="p-4 rounded-xl bg-[#181614] border border-white/5 space-y-2 text-xs text-cream-200/70">
                      <p className="font-semibold text-yellow-primary">Alternative file method:</p>
                      <p>
                        You can also drop your audio file directly on your computer into:
                      </p>
                      <code className="block p-2 rounded bg-black/40 text-yellow-soft font-mono text-[11px] select-all">
                        public/audio/our-song.mp3
                      </code>
                    </div>
                  </div>
                )}

                {/* 2. Main Photo Tab */}
                {managerTab === 'main' && (
                  <div className="space-y-4">
                    <div className="p-4 rounded-2xl bg-[#1F1C18] border border-yellow-primary/30 flex flex-col sm:flex-row items-center gap-4">
                      <div className="w-28 h-28 rounded-xl overflow-hidden border border-yellow-primary/40 relative flex-shrink-0 bg-black">
                        <img
                          src={getPhotoSrc('main-us', storyData.hero.mainImage)}
                          alt="Main Us"
                          className="w-full h-full object-cover"
                        />
                        {customPhotos['main-us'] && (
                          <div className="absolute top-1 right-1 bg-yellow-primary text-charcoal rounded-full p-0.5 shadow">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1 text-center sm:text-left space-y-1">
                        <p className="font-bold text-yellow-primary text-base">
                          Primary Couple Photo (Hero &amp; Proposal)
                        </p>
                        <p className="text-xs text-cream-200/70">
                          This is the full-screen cinematic picture that opens the site and appears at the final proposal.
                        </p>
                        <p className="text-[11px] font-mono text-yellow-soft/60">
                          {customPhotos['main-us'] ? '✨ Custom photo active' : 'Default sample photo'}
                        </p>
                      </div>
                      <button
                        onClick={() => handleSelectFile('main-us')}
                        disabled={uploadingKey === 'main-us'}
                        className="px-4 py-2.5 rounded-xl bg-yellow-primary hover:bg-yellow-soft text-charcoal font-bold text-xs flex items-center gap-2 cursor-pointer shadow-yellow-sm"
                      >
                        <Upload className="w-4 h-4" />
                        <span>{customPhotos['main-us'] ? 'Replace' : 'Upload My Photo'}</span>
                      </button>
                    </div>
                  </div>
                )}

                {/* 3. Memories Tab */}
                {managerTab === 'memories' && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {storyData.timeline.memories.map((mem) => {
                      const isCustom = !!customPhotos[mem.id];
                      return (
                        <div
                          key={mem.id}
                          className="p-3.5 rounded-2xl bg-[#1F1C18] border border-yellow-primary/20 flex items-center gap-3"
                        >
                          <div className="w-16 h-16 rounded-xl overflow-hidden border border-yellow-primary/30 relative flex-shrink-0 bg-black">
                            <img
                              src={getPhotoSrc(mem.id, mem.image)}
                              alt={mem.title}
                              className="w-full h-full object-cover"
                            />
                            {isCustom && (
                              <div className="absolute top-1 right-1 bg-yellow-primary text-charcoal rounded-full p-0.5">
                                <CheckCircle2 className="w-3 h-3" />
                              </div>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-mono text-yellow-soft truncate">{mem.date}</p>
                            <p className="text-sm font-semibold truncate text-[#FFFDF5]">{mem.title}</p>
                            <p className="text-[10px] text-cream-200/50">
                              {isCustom ? '✨ Custom photo' : 'Default sample'}
                            </p>
                          </div>
                          <button
                            onClick={() => handleSelectFile(mem.id)}
                            className="p-2 rounded-xl bg-yellow-primary/20 hover:bg-yellow-primary hover:text-charcoal text-yellow-primary transition-colors cursor-pointer"
                            title="Upload photo for this memory"
                          >
                            <Upload className="w-4 h-4" />
                          </button>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* 4. Just Nimu Tab */}
                {managerTab === 'nimu' && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {storyData.nimuPhotos.photos.map((photo, idx) => {
                      const isCustom = !!customPhotos[photo.id];
                      return (
                        <div
                          key={photo.id}
                          className="p-3.5 rounded-2xl bg-[#1F1C18] border border-yellow-primary/20 flex items-center gap-3"
                        >
                          <div className="w-16 h-16 rounded-xl overflow-hidden border border-yellow-primary/30 relative flex-shrink-0 bg-black">
                            <img
                              src={getPhotoSrc(photo.id, photo.src)}
                              alt={photo.caption || "Nimu"}
                              className="w-full h-full object-cover"
                            />
                            {isCustom && (
                              <div className="absolute top-1 right-1 bg-yellow-primary text-charcoal rounded-full p-0.5">
                                <CheckCircle2 className="w-3 h-3" />
                              </div>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-mono text-yellow-soft">Photo 0{idx + 1}</p>
                            <p className="text-sm font-semibold truncate text-[#FFFDF5]">
                              {photo.caption || "Solo picture"}
                            </p>
                          </div>
                          <button
                            onClick={() => handleSelectFile(photo.id)}
                            className="p-2 rounded-xl bg-yellow-primary/20 hover:bg-yellow-primary hover:text-charcoal text-yellow-primary transition-colors cursor-pointer"
                            title="Upload photo"
                          >
                            <Upload className="w-4 h-4" />
                          </button>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* 5. Us Photos Tab */}
                {managerTab === 'us' && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {storyData.usPhotos.photos.map((photo, idx) => {
                      const isCustom = !!customPhotos[photo.id];
                      return (
                        <div
                          key={photo.id}
                          className="p-3.5 rounded-2xl bg-[#1F1C18] border border-yellow-primary/20 flex items-center gap-3"
                        >
                          <div className="w-16 h-16 rounded-xl overflow-hidden border border-yellow-primary/30 relative flex-shrink-0 bg-black">
                            <img
                              src={getPhotoSrc(photo.id, photo.src)}
                              alt={photo.caption || "Us"}
                              className="w-full h-full object-cover"
                            />
                            {isCustom && (
                              <div className="absolute top-1 right-1 bg-yellow-primary text-charcoal rounded-full p-0.5">
                                <CheckCircle2 className="w-3 h-3" />
                              </div>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-mono text-yellow-soft">Us Photo 0{idx + 1}</p>
                            <p className="text-sm font-semibold truncate text-[#FFFDF5]">
                              {photo.caption || "Couple moment"}
                            </p>
                          </div>
                          <button
                            onClick={() => handleSelectFile(photo.id)}
                            className="p-2 rounded-xl bg-yellow-primary/20 hover:bg-yellow-primary hover:text-charcoal text-yellow-primary transition-colors cursor-pointer"
                            title="Upload photo"
                          >
                            <Upload className="w-4 h-4" />
                          </button>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Footer info & folder tip */}
              <div className="p-4 sm:p-5 border-t border-yellow-primary/20 bg-[#141210] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2 text-cream-200/70">
                  <FolderOpen className="w-4 h-4 text-yellow-primary flex-shrink-0" />
                  <span>
                    Photos &amp; song are stored locally in your browser!
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  {(Object.keys(customPhotos).length > 0 || customAudio) && (
                    <button
                      onClick={async () => {
                        await resetPhotos();
                        await resetAudio();
                      }}
                      className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-red-400 hover:text-red-300 hover:bg-red-400/10 rounded-lg transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Reset all to default</span>
                    </button>
                  )}
                  <button
                    onClick={() => setIsManagerOpen(false)}
                    className="px-5 py-2 rounded-xl bg-yellow-primary text-charcoal-black font-bold text-xs hover:bg-yellow-soft transition-colors cursor-pointer"
                  >
                    Done &amp; View Website
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
