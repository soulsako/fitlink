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
// Modern Color Palette
// --------------------------------------------------
export const colors = {
  // Primary Colors
  primary: '#6366F1', // Indigo
  primaryLight: '#818CF8',
  primaryDark: '#4F46E5',

  // Secondary Colors
  secondary: '#06B6D4', // Cyan
  secondaryLight: '#22D3EE',
  secondaryDark: '#0891B2',

  // Neutral Colors
  white: '#FFFFFF',
  black: '#000000',
  gray50: '#F9FAFB',
  gray100: '#F3F4F6',
  gray200: '#E5E7EB',
  gray300: '#D1D5DB',
  gray400: '#9CA3AF',
  gray500: '#6B7280',
  gray600: '#4B5563',
  gray700: '#374151',
  gray800: '#1F2937',
  gray900: '#111827',

  // Accent Colors
  accent: '#F59E0B', // Amber
  accentLight: '#FDE047',
  accentDark: '#D97706',

  // Status Colors
  success: '#10B981', // Emerald
  successLight: '#34D399',
  successDark: '#059669',

  warning: '#F59E0B', // Amber
  warningLight: '#FCD34D',
  warningDark: '#D97706',

  error: '#EF4444', // Red
  errorLight: '#F87171',
  errorDark: '#DC2626',

  info: '#3B82F6', // Blue
  infoLight: '#60A5FA',
  infoDark: '#2563EB',

  // Background Colors
  background: '#FFFFFF',
  backgroundSecondary: '#F9FAFB',
  backgroundTertiary: '#F3F4F6',

  // Surface Colors
  surface: '#FFFFFF',
  surfaceSecondary: '#F9FAFB',
  surfaceTertiary: '#F3F4F6',

  // Text Colors
  textPrimary: '#111827',
  textSecondary: '#6B7280',
  textTertiary: '#9CA3AF',
  textInverse: '#FFFFFF',

  // Input Colors
  inputBackground: '#FFFFFF',
  inputBorder: '#D1D5DB',
  inputBorderFocus: '#6366F1',
  inputBorderError: '#EF4444',
  inputText: '#111827',
  inputPlaceholder: '#9CA3AF',

  // Button Colors
  buttonPrimary: '#6366F1',
  buttonPrimaryHover: '#4F46E5',
  buttonPrimaryText: '#FFFFFF',

  buttonSecondary: '#F3F4F6',
  buttonSecondaryHover: '#E5E7EB',
  buttonSecondaryText: '#374151',

  buttonOutline: 'transparent',
  buttonOutlineBorder: '#D1D5DB',
  buttonOutlineHover: '#F9FAFB',
  buttonOutlineText: '#374151',

  buttonGhost: 'transparent',
  buttonGhostHover: '#F3F4F6',
  buttonGhostText: '#6366F1',

  // Card Colors
  cardBackground: '#FFFFFF',
  cardBorder: '#E5E7EB',
  cardShadow: 'rgba(0, 0, 0, 0.1)',

  // Navigation Colors
  navBackground: '#FFFFFF',
  navBorder: '#E5E7EB',
  navActive: '#6366F1',
  navInactive: '#6B7280',

  // Tab Colors
  tabBackground: '#F9FAFB',
  tabActive: '#6366F1',
  tabInactive: '#9CA3AF',
  tabIndicator: '#6366F1',

  // Modal Colors
  modalBackground: '#FFFFFF',
  modalOverlay: 'rgba(0, 0, 0, 0.5)',
  modalBorder: '#E5E7EB',

  // Divider Colors
  divider: '#E5E7EB',
  dividerLight: '#F3F4F6',

  // Icon Colors
  iconPrimary: '#6B7280',
  iconSecondary: '#9CA3AF',
  iconAccent: '#6366F1',

  // Social Button Colors
  socialGoogle: '#FFFFFF',
  socialGoogleText: '#1F2937',
  socialGoogleBorder: '#E5E7EB',

  socialApple: '#000000',
  socialAppleText: '#FFFFFF',
  socialAppleBorder: '#000000',

  socialFacebook: '#1877F2',
  socialFacebookText: '#FFFFFF',
  socialFacebookBorder: '#1877F2',

  // Loading & Skeleton Colors
  skeleton: '#E5E7EB',
  skeletonHighlight: '#F3F4F6',

  // Badge Colors
  badgePrimary: '#6366F1',
  badgeSecondary: '#06B6D4',
  badgeSuccess: '#10B981',
  badgeWarning: '#F59E0B',
  badgeError: '#EF4444',
  badgeNeutral: '#6B7280',
};

// --------------------------------------------------
// Spacing & Layout
// --------------------------------------------------
export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  '2xl': 48,
  '3xl': 64,
};

export const borderRadius = {
  none: 0,
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  '2xl': 20,
  '3xl': 24,
  full: 9999,
};

// --------------------------------------------------
// Theme Interface
// --------------------------------------------------
export interface Theme {
  colors: typeof colors;
  fonts: typeof fonts;
  fontSizes: typeof fontSizes;
  lineHeights: typeof lineHeights;
  spacing: typeof spacing;
  borderRadius: typeof borderRadius;
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
// Main Theme
// --------------------------------------------------
export const theme: Theme = {
  colors,
  fonts,
  fontSizes,
  lineHeights,
  spacing,
  borderRadius,
  elevation: {
    level0: 0,
    level1: 2,
    level2: 4,
    level3: 8,
    level4: 12,
    level5: 16,
  },
};

export default theme;
