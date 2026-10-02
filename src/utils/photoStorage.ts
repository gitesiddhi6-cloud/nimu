// IndexedDB storage to store full-resolution user photos and custom audio tracks locally
// Also saves photos permanently to disk via the Vite dev-server API (/api/save-photo)

/**
 * Saves the uploaded photo permanently to the public/images/ folder on disk.
 * Works only when running in the Vite dev server (not in production build).
 */
export const savePhotoToDisk = async (key: string, dataUrl: string): Promise<boolean> => {
  try {
    const res = await fetch('/api/save-photo', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ key, dataUrl }),
    })
    const json = await res.json() as { ok?: boolean; error?: string }
    if (!json.ok) {
      console.warn('[savePhotoToDisk] API returned error:', json.error)
      return false
    }
    return true
  } catch (err) {
    // Running in production or API not available — silently fall back to IndexedDB only
    console.warn('[savePhotoToDisk] Could not reach /api/save-photo, using IndexedDB only:', err)
    return false
  }
}

const DB_NAME = 'NimuLoveStoryDB';
const DB_VERSION = 2;
const PHOTO_STORE = 'custom_photos';
const AUDIO_STORE = 'custom_audio';

const openDB = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(PHOTO_STORE)) {
        db.createObjectStore(PHOTO_STORE);
      }
      if (!db.objectStoreNames.contains(AUDIO_STORE)) {
        db.createObjectStore(AUDIO_STORE);
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};

export const saveCustomPhoto = async (key: string, dataUrl: string): Promise<void> => {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(PHOTO_STORE, 'readwrite');
      const store = tx.objectStore(PHOTO_STORE);
      const req = store.put(dataUrl, key);
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  } catch (err) {
    console.error('Failed to save photo to IndexedDB:', err);
  }
};

export const getCustomPhoto = async (key: string): Promise<string | null> => {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(PHOTO_STORE, 'readonly');
      const store = tx.objectStore(PHOTO_STORE);
      const req = store.get(key);
      req.onsuccess = () => resolve(req.result || null);
      req.onerror = () => reject(req.error);
    });
  } catch (err) {
    console.error('Failed to get photo from IndexedDB:', err);
    return null;
  }
};

export const getAllCustomPhotos = async (): Promise<Record<string, string>> => {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(PHOTO_STORE, 'readonly');
      const store = tx.objectStore(PHOTO_STORE);
      const req = store.openCursor();
      const results: Record<string, string> = {};

      req.onsuccess = (e) => {
        const cursor = (e.target as IDBRequest<IDBCursorWithValue>).result;
        if (cursor) {
          results[cursor.key as string] = cursor.value;
          cursor.continue();
        } else {
          resolve(results);
        }
      };
      req.onerror = () => reject(req.error);
    });
  } catch (err) {
    console.error('Failed to load all photos from IndexedDB:', err);
    return {};
  }
};

export const clearAllCustomPhotos = async (): Promise<void> => {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(PHOTO_STORE, 'readwrite');
      const store = tx.objectStore(PHOTO_STORE);
      const req = store.clear();
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  } catch (err) {
    console.error('Failed to clear photos:', err);
  }
};

// Audio Track Customization
export interface CustomAudioData {
  src: string;
  title?: string;
  artist?: string;
  filename?: string;
}

export const saveCustomAudio = async (data: CustomAudioData): Promise<void> => {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(AUDIO_STORE, 'readwrite');
      const store = tx.objectStore(AUDIO_STORE);
      const req = store.put(data, 'current_song');
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  } catch (err) {
    console.error('Failed to save audio to IndexedDB:', err);
  }
};

export const getCustomAudio = async (): Promise<CustomAudioData | null> => {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(AUDIO_STORE, 'readonly');
      const store = tx.objectStore(AUDIO_STORE);
      const req = store.get('current_song');
      req.onsuccess = () => resolve(req.result || null);
      req.onerror = () => reject(req.error);
    });
  } catch (err) {
    console.error('Failed to get audio from IndexedDB:', err);
    return null;
  }
};

export const clearCustomAudio = async (): Promise<void> => {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(AUDIO_STORE, 'readwrite');
      const store = tx.objectStore(AUDIO_STORE);
      const req = store.delete('current_song');
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  } catch (err) {
    console.error('Failed to clear audio from IndexedDB:', err);
  }
};
