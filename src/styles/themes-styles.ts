import { MD3DarkTheme, MD3LightTheme } from 'react-native-paper';

// Font configuration
export const fonts = {
  regular: 'Inter_400Regular',
  medium: 'Inter_500Medium',
  semiBold: 'Inter_600SemiBold',
  bold: 'Inter_700Bold',
};

export const fontSizes = {
  xs: 12,
  sm: 14,
  base: 16,
  lg: 18,
  xl: 20,
  '2xl': 24,
  '3xl': 28,
  '4xl': 32,
  '5xl': 36,
};

export const lineHeights = {
  xs: 16,
  sm: 20,
  base: 24,
  lg: 28,
  xl: 32,
  '2xl': 36,
  '3xl': 40,
  '4xl': 44,
  '5xl': 48,
};

// 🎨 Modernized Colors + Inputs + Socials
export const colors = {
  light: {
    primary: '#1D4ED8',
    primaryContainer: '#DBEAFE',
    onPrimary: '#FFFFFF',
    onPrimaryContainer: '#1E3A8A',

    secondary: '#9333EA',
    secondaryContainer: '#F3E8FF',
    onSecondary: '#FFFFFF',
    onSecondaryContainer: '#581C87',

    tertiary: '#EA580C',
    tertiaryContainer: '#FFEDD5',
    onTertiary: '#FFFFFF',
    onTertiaryContainer: '#7C2D12',

    error: '#DC2626',
    errorContainer: '#FEE2E2',
    onError: '#FFFFFF',
    onErrorContainer: '#7F1D1D',

    background: '#F9FAFB',
    onBackground: '#111827',
    surface: '#FFFFFF',
    onSurface: '#111827',
    surfaceVariant: '#F3F4F6',
    onSurfaceVariant: '#374151',

    outline: '#E5E7EB',
    outlineVariant: '#D1D5DB',
    inverseSurface: '#111827',
    inverseOnSurface: '#F9FAFB',
    inversePrimary: '#93C5FD',

    success: '#16A34A',
    warning: '#D97706',
    info: '#0284C7',

    // Input-specific
    inputText: '#111827',
    inputPlaceholder: '#6B7280',
    inputOutline: '#D1D5DB',
    inputFocusOutline: '#1D4ED8',
    inputBackground: '#FFFFFF',
    inputError: '#DC2626',

    // Social brand colors
    socialGoogleBg: '#FFFFFF',
    socialGoogleText: '#000000',
    socialGoogleBorder: '#E5E7EB',
    socialGoogleIcon: '#000000',

    socialAppleBg: '#000000',
    socialAppleText: '#FFFFFF',
    socialAppleBorder: '#000000',
    socialAppleIcon: '#FFFFFF',

    socialFacebookBg: '#1877F2',
    socialFacebookText: '#FFFFFF',
    socialFacebookBorder: '#1877F2',
    socialFacebookIcon: '#FFFFFF',
  },

  dark: {
    primary: '#60A5FA',
    primaryContainer: '#1E3A8A',
    onPrimary: '#000000',
    onPrimaryContainer: '#DBEAFE',

    secondary: '#C084FC',
    secondaryContainer: '#581C87',
    onSecondary: '#000000',
    onSecondaryContainer: '#F3E8FF',

    tertiary: '#FB923C',
    tertiaryContainer: '#7C2D12',
    onTertiary: '#000000',
    onTertiaryContainer: '#FFEDD5',

    error: '#F87171',
    errorContainer: '#7F1D1D',
    onError: '#000000',
    onErrorContainer: '#FEE2E2',

    background: '#111827',
    onBackground: '#F9FAFB',
    surface: '#1F2937',
    onSurface: '#F9FAFB',
    surfaceVariant: '#374151',
    onSurfaceVariant: '#D1D5DB',

    outline: '#374151',
    outlineVariant: '#4B5563',
    inverseSurface: '#F9FAFB',
    inverseOnSurface: '#111827',
    inversePrimary: '#2563EB',

    success: '#4ADE80',
    warning: '#FACC15',
    info: '#38BDF8',

    // Input-specific
    inputText: '#F9FAFB',
    inputPlaceholder: '#9CA3AF',
    inputOutline: '#4B5563',
    inputFocusOutline: '#60A5FA',
    inputBackground: '#1F2937',
    inputError: '#F87171',

    // Social brand colors
    socialGoogleBg: '#FFFFFF', // Google stays white in dark mode
    socialGoogleText: '#000000',
    socialGoogleBorder: '#374151',
    socialGoogleIcon: '#000000',

    socialAppleBg: '#000000',
    socialAppleText: '#FFFFFF',
    socialAppleBorder: '#000000',
    socialAppleIcon: '#FFFFFF',

    socialFacebookBg: '#1877F2',
    socialFacebookText: '#FFFFFF',
    socialFacebookBorder: '#1877F2',
    socialFacebookIcon: '#FFFFFF',
  },
};

// Extended Theme Type
export interface ExtendedTheme {
  dark: boolean;
  roundness: number;
  fonts: typeof lightTheme.fonts;
  colors: typeof colors.light; // both light & dark share the same keys
  elevation: Record<string, number>;
}

// Theme objects
export const lightTheme: ExtendedTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    ...colors.light,
  },
  fonts: {
    ...MD3LightTheme.fonts,
    default: { fontFamily: fonts.regular },
    displayLarge: {
      fontFamily: fonts.bold,
      fontSize: fontSizes['5xl'],
      lineHeight: lineHeights['5xl'],
      fontWeight: '700' as const,
    },
    displayMedium: {
      fontFamily: fonts.bold,
      fontSize: fontSizes['4xl'],
      lineHeight: lineHeights['4xl'],
      fontWeight: '700' as const,
    },
    displaySmall: {
      fontFamily: fonts.bold,
      fontSize: fontSizes['3xl'],
      lineHeight: lineHeights['3xl'],
      fontWeight: '700' as const,
    },
    headlineLarge: {
      fontFamily: fonts.semiBold,
      fontSize: fontSizes['2xl'],
      lineHeight: lineHeights['2xl'],
      fontWeight: '600' as const,
    },
    headlineMedium: {
      fontFamily: fonts.semiBold,
      fontSize: fontSizes.xl,
      lineHeight: lineHeights.xl,
      fontWeight: '600' as const,
    },
    headlineSmall: {
      fontFamily: fonts.semiBold,
      fontSize: fontSizes.lg,
      lineHeight: lineHeights.lg,
      fontWeight: '600' as const,
    },
    titleLarge: {
      fontFamily: fonts.medium,
      fontSize: fontSizes.lg,
      lineHeight: lineHeights.lg,
      fontWeight: '500' as const,
    },
    titleMedium: {
      fontFamily: fonts.medium,
      fontSize: fontSizes.base,
      lineHeight: lineHeights.base,
      fontWeight: '500' as const,
    },
    titleSmall: {
      fontFamily: fonts.medium,
      fontSize: fontSizes.sm,
      lineHeight: lineHeights.sm,
      fontWeight: '500' as const,
    },
    bodyLarge: {
      fontFamily: fonts.regular,
      fontSize: fontSizes.base,
      lineHeight: lineHeights.base,
      fontWeight: '400' as const,
    },
    bodyMedium: {
      fontFamily: fonts.regular,
      fontSize: fontSizes.sm,
      lineHeight: lineHeights.sm,
      fontWeight: '400' as const,
    },
    bodySmall: {
      fontFamily: fonts.regular,
      fontSize: fontSizes.xs,
      lineHeight: lineHeights.xs,
      fontWeight: '400' as const,
    },
    labelLarge: {
      fontFamily: fonts.medium,
      fontSize: fontSizes.sm,
      lineHeight: lineHeights.sm,
      fontWeight: '500' as const,
    },
    labelMedium: {
      fontFamily: fonts.medium,
      fontSize: fontSizes.xs,
      lineHeight: lineHeights.xs,
      fontWeight: '500' as const,
    },
    labelSmall: {
      fontFamily: fonts.medium,
      fontSize: 10,
      lineHeight: 14,
      fontWeight: '500' as const,
    },
  },
  elevation: {
    level0: 0,
    level1: 0,
    level2: 0,
    level3: 0,
    level4: 0,
    level5: 0,
  },
};

export const darkTheme: ExtendedTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    ...colors.dark,
  },
  fonts: lightTheme.fonts,
  elevation: {
    level0: 0,
    level1: 0,
    level2: 0,
    level3: 0,
    level4: 0,
    level5: 0,
  },
};

export type Theme = typeof lightTheme;
