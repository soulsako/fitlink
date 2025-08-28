import { MD3DarkTheme, MD3LightTheme } from 'react-native-paper';

// --------------------------------------------------
// Fonts
// --------------------------------------------------
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

// --------------------------------------------------
// Extended Colors
// --------------------------------------------------
export interface ExtendedColors {
  // Inputs
  inputText: string;
  inputPlaceholder: string;
  inputOutline: string;
  inputFocusOutline: string;
  inputBackground: string;
  inputError: string;

  // Social buttons
  socialGoogleBg: string;
  socialGoogleText: string;
  socialGoogleBorder: string;
  socialGoogleIcon: string;

  socialAppleBg: string;
  socialAppleText: string;
  socialAppleBorder: string;
  socialAppleIcon: string;

  socialFacebookBg: string;
  socialFacebookText: string;
  socialFacebookBorder: string;
  socialFacebookIcon: string;
}

// --------------------------------------------------
// Extended Theme Type
// --------------------------------------------------
export interface ExtendedTheme {
  dark: boolean;
  roundness: number;
  colors: typeof MD3LightTheme.colors & ExtendedColors;
  fonts: typeof MD3LightTheme.fonts;
  elevation: {
    level0: number;
    level1: number;
    level2: number;
    level3: number;
    level4: number;
    level5: number;
  };
}

// --------------------------------------------------
// Colors (light & dark)
// --------------------------------------------------
export const colors: {
  light: ExtendedColors & typeof MD3LightTheme.colors;
  dark: ExtendedColors & typeof MD3DarkTheme.colors;
} = {
  light: {
    ...MD3LightTheme.colors,
    // primary, secondary, error, background...
    // + inputs
    inputText: '#111827',
    inputPlaceholder: '#6B7280',
    inputOutline: '#D1D5DB',
    inputFocusOutline: '#1D4ED8',
    inputBackground: '#FFFFFF',
    inputError: '#DC2626',
    // + socials
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
    ...MD3DarkTheme.colors,
    // primary, secondary, error, background...
    // + inputs
    inputText: '#F9FAFB',
    inputPlaceholder: '#9CA3AF',
    inputOutline: '#4B5563',
    inputFocusOutline: '#60A5FA',
    inputBackground: '#1F2937',
    inputError: '#F87171',
    // + socials
    socialGoogleBg: '#FFFFFF',
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

// --------------------------------------------------
// Themes
// --------------------------------------------------
export const lightTheme: ExtendedTheme = {
  ...MD3LightTheme,
  colors: colors.light,
  fonts: MD3LightTheme.fonts,
  elevation: {
    level0: 0,
    level1: 1,
    level2: 2,
    level3: 3,
    level4: 4,
    level5: 5,
  },
};

export const darkTheme: ExtendedTheme = {
  ...MD3DarkTheme,
  colors: colors.dark,
  fonts: MD3LightTheme.fonts,
  elevation: {
    level0: 0,
    level1: 1,
    level2: 2,
    level3: 3,
    level4: 4,
    level5: 5,
  },
};

export type Theme = typeof lightTheme;
