import type { ExtendedTheme } from '../types/theme-types';

type ColorsOverride = Record<string, string>;

export const buildInputTheme = (
  theme: ExtendedTheme,
  opts?: { roundness?: number; colors?: ColorsOverride },
) => ({
  roundness: opts?.roundness ?? 8,
  colors: {
    text: theme.colors.inputText,
    placeholder: theme.colors.inputPlaceholder,
    outline: theme.colors.inputOutline,
    primary: theme.colors.inputFocusOutline,
    background: theme.colors.inputBackground,
    error: theme.colors.inputError,
    onSurfaceDisabled: theme.colors.onSurfaceVariant,
    ...(opts?.colors ?? {}),
  },
});
