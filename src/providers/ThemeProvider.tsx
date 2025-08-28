import AsyncStorage from '@react-native-async-storage/async-storage';
import type React from 'react';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { darkTheme, lightTheme, type Theme } from '../styles/themes-styles';

export type Scheme = 'light' | 'dark';

type ThemeContextValue = {
  scheme: Scheme;
  isDark: boolean;
  theme: Theme;
  setScheme: (s: Scheme) => void;
  toggleScheme: () => void;
};

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);
const STORAGE_KEY = 'ui:scheme';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [scheme, setSchemeState] = useState<Scheme | null>(null);

  // Load saved theme preference
  useEffect(() => {
    const init = async () => {
      try {
        const saved = await AsyncStorage.getItem(STORAGE_KEY);
        if (saved === 'light' || saved === 'dark') {
          setSchemeState(saved);
        } else {
          // fallback default if nothing stored
          setSchemeState('light');
        }
      } catch (error) {
        console.warn('Failed to load theme preference:', error);
        setSchemeState('light');
      }
    };

    init();
  }, []);

  const setScheme = useMemo(
    () => (s: Scheme) => {
      setSchemeState(s);
      AsyncStorage.setItem(STORAGE_KEY, s).catch((error) => {
        console.warn('Failed to save theme preference:', error);
      });
    },
    [],
  );

  const toggleScheme = useMemo(
    () => () => setScheme(scheme === 'dark' ? 'light' : 'dark'),
    [scheme, setScheme],
  );

  const theme = useMemo(
    () => (scheme === 'dark' ? darkTheme : lightTheme),
    [scheme],
  );

  if (!scheme) {
    // render nothing (or a splash/loading) until theme is resolved
    return null;
  }

  const value: ThemeContextValue = {
    scheme,
    isDark: scheme === 'dark',
    theme,
    setScheme,
    toggleScheme,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return ctx;
}
