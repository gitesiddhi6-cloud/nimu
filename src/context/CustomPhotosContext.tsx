import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  getAllCustomPhotos,
  saveCustomPhoto,
  clearAllCustomPhotos,
  getCustomAudio,
  saveCustomAudio,
  clearCustomAudio,
  savePhotoToDisk,
} from '../utils/photoStorage';
import type { CustomAudioData } from '../utils/photoStorage';
import { storyData } from '../data/storyData';

// Map of photo key → its public URL path (used for cache-busted reload after disk save)
const KEY_TO_PUBLIC_PATH: Record<string, string> = {
  'main-us':   '/images/main-us.jpg',
  'song-cover':'/images/song-cover.jpg',
  'mem-01': '/images/memories/first-meeting.jpg',
  'mem-02': '/images/memories/first-hug.jpg',
  'mem-03': '/images/memories/alibagh.jpg',
  'mem-04': '/images/memories/hanuman-tikdi.jpg',
  'mem-05': '/images/memories/birthday.jpg',
  'mem-06': '/images/memories/symbiii.jpg',
  'mem-07': '/images/memories/first-gift.jpg',
  'mem-08': '/images/memories/at-your-place.jpg',
  'nimu-01': '/images/nimu/01.jpg',
  'nimu-02': '/images/nimu/02.jpg',
  'nimu-03': '/images/nimu/03.jpg',
  'nimu-04': '/images/nimu/04.jpg',
  'nimu-05': '/images/nimu/05.jpg',
  'nimu-06': '/images/nimu/06.jpg',
  'us-01': '/images/us/01.jpg',
  'us-02': '/images/us/02.jpg',
  'us-03': '/images/us/03.jpg',
  'us-04': '/images/us/04.jpg',
  'us-05': '/images/us/05.jpg',
  'us-06': '/images/us/06.jpg',
  'us-07': '/images/us/07.jpg',
  'us-08': '/images/us/08.jpg',
}

interface CustomPhotosContextType {
  customPhotos: Record<string, string>;
  uploadPhoto: (key: string, file: File) => Promise<void>;
  resetPhotos: () => Promise<void>;
  getPhotoSrc: (key: string, fallbackSrc: string) => string;
  // Audio Track customization
  customAudio: CustomAudioData | null;
  uploadAudio: (file: File, title?: string, artist?: string) => Promise<void>;
  updateAudioMetadata: (title: string, artist: string) => Promise<void>;
  resetAudio: () => Promise<void>;
  getSongData: () => { title: string; artist: string; src: string; cover: string };
  // Modal state
  isManagerOpen: boolean;
  setIsManagerOpen: (open: boolean) => void;
  managerTab: 'main' | 'memories' | 'nimu' | 'us' | 'song';
  setManagerTab: (tab: 'main' | 'memories' | 'nimu' | 'us' | 'song') => void;
}

const CustomPhotosContext = createContext<CustomPhotosContextType | undefined>(undefined);

export const CustomPhotosProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [customPhotos, setCustomPhotos] = useState<Record<string, string>>({});
  // Keys that were successfully saved to disk — their URL path is used instead of base64
  const [diskSavedKeys, setDiskSavedKeys] = useState<Record<string, number>>({});
  const [customAudio, setCustomAudio] = useState<CustomAudioData | null>(null);
  const [isManagerOpen, setIsManagerOpen] = useState<boolean>(false);
  const [managerTab, setManagerTab] = useState<'main' | 'memories' | 'nimu' | 'us' | 'song'>('main');

  useEffect(() => {
    // Load custom photos on mount
    getAllCustomPhotos().then((photos) => {
      setCustomPhotos(photos);
    });

    // Load custom audio track on mount
    getCustomAudio().then((audio) => {
      if (audio) setCustomAudio(audio);
    });
  }, []);

  const uploadPhoto = async (key: string, file: File) => {
    return new Promise<void>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = async () => {
        try {
          const dataUrl = reader.result as string;
          // Always save to IndexedDB as a reliable fallback
          await saveCustomPhoto(key, dataUrl);
          setCustomPhotos((prev) => ({ ...prev, [key]: dataUrl }));
          // Also try to permanently save to disk (replaces the actual file in public/images/)
          const savedToDisk = await savePhotoToDisk(key, dataUrl);
          if (savedToDisk) {
            // Record a cache-bust timestamp so the browser reloads the new file
            setDiskSavedKeys((prev) => ({ ...prev, [key]: Date.now() }));
          }
          resolve();
        } catch (err) {
          reject(err);
        }
      };
      reader.onerror = (err) => reject(err);
      reader.readAsDataURL(file);
    });
  };

  const resetPhotos = async () => {
    await clearAllCustomPhotos();
    setCustomPhotos({});
    setDiskSavedKeys({});
  };

  const getPhotoSrc = (key: string, fallbackSrc: string) => {
    // If this photo was saved to disk this session, use the real URL with a cache-bust
    if (diskSavedKeys[key] && KEY_TO_PUBLIC_PATH[key]) {
      return `${KEY_TO_PUBLIC_PATH[key]}?v=${diskSavedKeys[key]}`;
    }
    // Otherwise fall back to IndexedDB base64 or the original file
    return customPhotos[key] || fallbackSrc;
  };

  const uploadAudio = async (file: File, title?: string, artist?: string) => {
    return new Promise<void>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = async () => {
        try {
          const dataUrl = reader.result as string;
          const cleanName = file.name.replace(/\.[^/.]+$/, '');
          const audioData: CustomAudioData = {
            src: dataUrl,
            title: title || cleanName || 'Our Special Song',
            artist: artist || 'Nimu × Me',
            filename: file.name,
          };
          await saveCustomAudio(audioData);
          setCustomAudio(audioData);
          resolve();
        } catch (err) {
          reject(err);
        }
      };
      reader.onerror = (err) => reject(err);
      reader.readAsDataURL(file);
    });
  };

  const updateAudioMetadata = async (title: string, artist: string) => {
    if (!customAudio) {
      const updated: CustomAudioData = {
        src: storyData.music.src,
        title,
        artist,
      };
      await saveCustomAudio(updated);
      setCustomAudio(updated);
    } else {
      const updated: CustomAudioData = {
        ...customAudio,
        title,
        artist,
      };
      await saveCustomAudio(updated);
      setCustomAudio(updated);
    }
  };

  const resetAudio = async () => {
    await clearCustomAudio();
    setCustomAudio(null);
  };

  const getSongData = () => {
    return {
      title: customAudio?.title || storyData.music.title,
      artist: customAudio?.artist || storyData.music.artist,
      src: customAudio?.src || storyData.music.src,
      cover: customPhotos['song-cover'] || storyData.music.cover,
    };
  };

  return (
    <CustomPhotosContext.Provider
      value={{
        customPhotos,
        uploadPhoto,
        resetPhotos,
        getPhotoSrc,
        customAudio,
        uploadAudio,
        updateAudioMetadata,
        resetAudio,
        getSongData,
        isManagerOpen,
        setIsManagerOpen,
        managerTab,
        setManagerTab,
      }}
    >
      {children}
    </CustomPhotosContext.Provider>
  );
};

export const useCustomPhotos = () => {
  const context = useContext(CustomPhotosContext);
  if (!context) {
    throw new Error('useCustomPhotos must be used within a CustomPhotosProvider');
  }
  return context;
};
