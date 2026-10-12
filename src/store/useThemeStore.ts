import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Appearance } from 'react-native';

type ThemeMode = 'light' | 'dark' | 'system';

interface ThemeState {
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  // Helper to get the actual active theme regardless of 'system' setting
  getActiveTheme: () => 'light' | 'dark';
}

// Temporary dummy storage since the native async-storage package isn't installed yet
const dummyStorage = {
  getItem: () => null,
  setItem: () => {},
  removeItem: () => {},
};

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      theme: 'system',
      setTheme: (theme) => set({ theme }),
      getActiveTheme: () => {
        const currentTheme = get().theme;
        if (currentTheme === 'system') {
          return Appearance.getColorScheme() === 'dark' ? 'dark' : 'light';
        }
        return currentTheme;
      },
    }),
    {
      name: 'traxx-theme-storage',
      storage: createJSONStorage(() => dummyStorage), 
    }
  )
);
