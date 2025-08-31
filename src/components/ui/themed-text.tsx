import { theme } from '@/styles/theme';
import type React from 'react';
import { Text as RNText, type TextProps as RNTextProps } from 'react-native';

interface ThemedTextProps extends RNTextProps {
  variant?: 'display' | 'headline' | 'title' | 'body' | 'label';
  size?: 'small' | 'medium' | 'large';
  color?:
    | 'primary'
    | 'secondary'
    | 'accent'
    | 'textPrimary'
    | 'textSecondary'
    | 'textTertiary'
    | 'success'
    | 'warning'
    | 'error'
    | 'info';
  weight?: 'regular' | 'medium' | 'semiBold' | 'bold';
}

const ThemedText: React.FC<ThemedTextProps> = ({
  children,
  variant = 'body',
  size = 'medium',
  color = 'textPrimary',
  weight = 'regular',
  style,
  ...props
}) => {
  const getFontSize = (): number => {
    const sizeMap = {
      display: {
        small: theme.fontSizes.xl3, // Was '3xl'
        medium: theme.fontSizes.xl4, // Was '4xl'
        large: theme.fontSizes.xl5, // Was '5xl'
      },
      headline: {
        small: theme.fontSizes.xl2, // Was '2xl'
        medium: theme.fontSizes.xl3, // Was '3xl'
        large: theme.fontSizes.xl4, // Was '4xl'
      },
      title: {
        small: theme.fontSizes.lg,
        medium: theme.fontSizes.xl,
        large: theme.fontSizes.xl2, // Was '2xl'
      },
      body: {
        small: theme.fontSizes.sm,
        medium: theme.fontSizes.base,
        large: theme.fontSizes.lg,
      },
      label: {
        small: theme.fontSizes.xs,
        medium: theme.fontSizes.sm,
        large: theme.fontSizes.base,
      },
    };
    return sizeMap[variant][size];
  };

  const getLineHeight = (): number => {
    const lineHeightMap = {
      display: {
        small: theme.lineHeights.xl3, // Was '3xl'
        medium: theme.lineHeights.xl4, // Was '4xl'
        large: theme.lineHeights.xl5, // Was '5xl'
      },
      headline: {
        small: theme.lineHeights.xl2, // Was '2xl'
        medium: theme.lineHeights.xl3, // Was '3xl'
        large: theme.lineHeights.xl4, // Was '4xl'
      },
      title: {
        small: theme.lineHeights.lg,
        medium: theme.lineHeights.xl,
        large: theme.lineHeights.xl2, // Was '2xl'
      },
      body: {
        small: theme.lineHeights.sm,
        medium: theme.lineHeights.base,
        large: theme.lineHeights.lg,
      },
      label: {
        small: theme.lineHeights.xs,
        medium: theme.lineHeights.sm,
        large: theme.lineHeights.base,
      },
    };
    return lineHeightMap[variant][size];
  };

  const getColorValue = (): string => {
    switch (color) {
      case 'primary':
        return theme.colors.primary;
      case 'secondary':
        return theme.colors.secondary;
      case 'accent':
        return theme.colors.accent;
      case 'textPrimary':
        return theme.colors.textPrimary;
      case 'textSecondary':
        return theme.colors.textSecondary;
      case 'textTertiary':
        return theme.colors.textTertiary;
      case 'success':
        return theme.colors.success;
      case 'warning':
        return theme.colors.warning;
      case 'error':
        return theme.colors.error;
      case 'info':
        return theme.colors.info;
      default:
        return theme.colors.textPrimary;
    }
  };

  const getFontFamily = (): string => {
    switch (weight) {
      case 'medium':
        return theme.fonts.medium;
      case 'semiBold':
        return theme.fonts.semiBold;
      case 'bold':
        return theme.fonts.bold;
      default:
        return theme.fonts.regular;
    }
  };

  const fontSize = getFontSize();
  const lineHeight = getLineHeight();
  const textColor = getColorValue();
  const fontFamily = getFontFamily();

  return (
    <RNText
      style={[
        {
          color: textColor,
          fontFamily,
          fontSize,
          lineHeight,
        },
        style,
      ]}
      {...props}
    >
      {children}
    </RNText>
  );
};

export default ThemedText;
