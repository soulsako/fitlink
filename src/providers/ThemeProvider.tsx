import AsyncStorage from '@react-native-async-storage/async-storage';
import type React from 'react';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { Alert, Appearance } from 'react-native';
import { darkTheme, lightTheme, type Theme } from '../styles/themes';

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
  const system = Appearance.getColorScheme();
  const initial: Scheme = system === 'dark' ? 'dark' : 'light';

  Alert.alert('initial', initial);

  const [scheme, setSchemeState] = useState<Scheme>(initial);

  useEffect(() => {
    (async () => {
      try {
        const saved = await AsyncStorage.getItem(STORAGE_KEY);
        if (saved === 'light' || saved === 'dark') {
          setSchemeState(saved);
        }
      } catch (error) {
        console.warn('Failed to load theme preference:', error);
      }
    })();
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

  const value: ThemeContextValue = useMemo(
    () => ({
      scheme,
      isDark: scheme === 'dark',
      theme,
      setScheme,
      toggleScheme,
    }),
    [scheme, theme, setScheme, toggleScheme],
  );

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
