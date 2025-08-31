import type { Theme } from '@/styles/theme';

type ColorsOverride = Record<string, string>;

export const buildInputTheme = (
  theme: Theme,
  opts?: { roundness?: number; colors?: ColorsOverride },
) => ({
  roundness: opts?.roundness ?? theme.borderRadius.md,
  colors: {
    // Text colors
    onSurface: theme.colors.inputText,
    onSurfaceVariant: theme.colors.inputPlaceholder,

    // Surface colors
    surface: theme.colors.inputBackground,
    surfaceVariant: theme.colors.inputBackground,

    // Border colors
    outline: theme.colors.inputBorder,
    outlineVariant: theme.colors.inputBorder,

    // Focus and primary colors
    primary: theme.colors.inputBorderFocus,

    // Error colors
    error: theme.colors.inputBorderError,
    onError: theme.colors.error,

    // Disabled state
    onSurfaceDisabled: theme.colors.textTertiary,

    // Legacy support (for backward compatibility)
    text: theme.colors.inputText,
    placeholder: theme.colors.inputPlaceholder,
    background: theme.colors.inputBackground,

    // Override with any custom colors
    ...(opts?.colors ?? {}),
  },
});
