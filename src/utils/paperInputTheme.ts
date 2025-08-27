// src/utils/paperInputTheme.ts
import type { MD3Theme } from 'react-native-paper';

type ColorsOverride = Record<string, string>;

export const buildInputTheme = (
  theme: MD3Theme,
  opts?: { roundness?: number; colors?: ColorsOverride },
) => ({
  roundness: opts?.roundness ?? 8,
  colors: {
    onSurface: theme.colors.onPrimary,
    onSurfaceVariant: theme.colors.onPrimary,
    outline: theme.colors.onPrimary,
    primary: theme.colors.primary,
    background: 'transparent',
    onSurfaceDisabled: theme.colors.onPrimary,
    secondary: theme.colors.onPrimary,
    onSecondary: theme.colors.onPrimary,
    surfaceVariant: 'transparent',
    ...(opts?.colors ?? {}),
  },
});
