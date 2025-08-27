import { MD3DarkTheme, MD3LightTheme } from 'react-native-paper'

// Font configuration
export const fonts = {
  regular: 'Inter_400Regular',
  medium: 'Inter_500Medium',
  semiBold: 'Inter_600SemiBold',
  bold: 'Inter_700Bold',
}

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
}

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
}

// LocalMind brand colors
export const colors = {
  light: {
    // LocalMind brand colors
    primary: '#2196F3', // Government blue
    primaryContainer: '#E3F2FD',
    primaryFixed: '#1976D2',
    primaryFixedDim: '#1565C0',
    onPrimary: '#FFFFFF',
    onPrimaryContainer: '#0D47A1',
    onPrimaryFixed: '#FFFFFF',
    onPrimaryFixedVariant: '#E3F2FD',

    secondary: '#4CAF50', // Success green
    secondaryContainer: '#E8F5E8',
    secondaryFixed: '#388E3C',
    secondaryFixedDim: '#2E7D32',
    onSecondary: '#FFFFFF',
    onSecondaryContainer: '#1B5E20',
    onSecondaryFixed: '#FFFFFF',
    onSecondaryFixedVariant: '#E8F5E8',

    tertiary: '#CC5500',
    tertiaryContainer: '#FFF3E0',
    tertiaryFixed: '#F57C00',
    tertiaryFixedDim: '#EF6C00',
    onTertiary: '#FFFFFF',
    onTertiaryContainer: '#E65100',
    onTertiaryFixed: '#FFFFFF',
    onTertiaryFixedVariant: '#FFF3E0',

    error: '#B71C1C', // Error red
    errorContainer: '#FFEBEE',
    onError: '#FFFFFF',
    onErrorContainer: '#B71C1C',

    // Background colors
    background: '#FAFAFA',
    onBackground: '#212121',
    surface: '#FFFFFF',
    onSurface: '#212121',
    surfaceVariant: '#F5F5F5',
    onSurfaceVariant: '#616161',
    surfaceDim: '#EEEEEE',
    surfaceBright: '#FFFFFF',
    surfaceContainerLowest: '#FFFFFF',
    surfaceContainerLow: '#F8F8F8',
    surfaceContainer: '#F5F5F5',
    surfaceContainerHigh: '#F0F0F0',
    surfaceContainerHighest: '#E8E8E8',

    // Additional colors
    outline: '#E0E0E0',
    outlineVariant: '#F5F5F5',
    shadow: 'transparent',
    scrim: '#000000',
    inverseSurface: '#2E2E2E',
    inverseOnSurface: '#F5F5F5',
    inversePrimary: '#64B5F6',

    // Custom LocalMind colors
    government: '#2196F3',
    nhs: '#005EB8', // NHS brand blue
    council: '#6A1B9A', // Council purple
    emergency: '#D32F2F', // Emergency red
    success: '#4CAF50',
    warning: '#FF9800',
    info: '#2196F3',
  },
  dark: {
    // LocalMind dark theme colors
    primary: '#64B5F6',
    primaryContainer: '#1565C0',
    primaryFixed: '#64B5F6',
    primaryFixedDim: '#42A5F5',
    onPrimary: '#000000',
    onPrimaryContainer: '#E3F2FD',
    onPrimaryFixed: '#000000',
    onPrimaryFixedVariant: '#1565C0',

    secondary: '#81C784',
    secondaryContainer: '#2E7D32',
    secondaryFixed: '#81C784',
    secondaryFixedDim: '#66BB6A',
    onSecondary: '#000000',
    onSecondaryContainer: '#E8F5E8',
    onSecondaryFixed: '#000000',
    onSecondaryFixedVariant: '#2E7D32',

    tertiary: '#FFB74D',
    tertiaryContainer: '#F57C00',
    tertiaryFixed: '#FFB74D',
    tertiaryFixedDim: '#FFA726',
    onTertiary: '#000000',
    onTertiaryContainer: '#FFF3E0',
    onTertiaryFixed: '#000000',
    onTertiaryFixedVariant: '#F57C00',

    error: '#EF5350',
    errorContainer: '#C62828',
    onError: '#000000',
    onErrorContainer: '#FFEBEE',

    // Background colors
    background: '#121212',
    onBackground: '#FFFFFF',
    surface: '#1E1E1E',
    onSurface: '#FFFFFF',
    surfaceVariant: '#2E2E2E',
    onSurfaceVariant: '#BDBDBD',
    surfaceDim: '#1A1A1A',
    surfaceBright: '#2E2E2E',
    surfaceContainerLowest: '#0F0F0F',
    surfaceContainerLow: '#1A1A1A',
    surfaceContainer: '#1E1E1E',
    surfaceContainerHigh: '#242424',
    surfaceContainerHighest: '#2E2E2E',

    // Additional colors
    outline: '#424242',
    outlineVariant: '#2E2E2E',
    shadow: 'transparent',
    scrim: '#000000',
    inverseSurface: '#E0E0E0',
    inverseOnSurface: '#1E1E1E',
    inversePrimary: '#1976D2',

    // Custom LocalMind colors
    government: '#64B5F6',
    nhs: '#42A5F5', // NHS brand blue (lighter for dark mode)
    council: '#BA68C8', // Council purple (lighter)
    emergency: '#EF5350', // Emergency red (lighter)
    success: '#81C784',
    warning: '#FFB74D',
    info: '#64B5F6',
  },
}

// Create the theme objects with fonts
export const lightTheme = {
  ...MD3LightTheme,
  fonts: {
    ...MD3LightTheme.fonts,
    default: {
      fontFamily: fonts.regular,
    },
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
  colors: { ...colors.light, shadow: 'transparent' },
  elevation: {
    level0: 0,
    level1: 0,
    level2: 0,
    level3: 0,
    level4: 0,
    level5: 0,
  },
}

export const darkTheme = {
  ...MD3DarkTheme,
  fonts: lightTheme.fonts,
  colors: { ...colors.dark, shadow: 'transparent' },
  elevation: {
    level0: 0,
    level1: 0,
    level2: 0,
    level3: 0,
    level4: 0,
    level5: 0,
  },
}

export type Theme = typeof lightTheme
