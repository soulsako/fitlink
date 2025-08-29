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
  const getFontSize = () => {
    const sizeMap = {
      display: {
        small: theme.fontSizes['3xl'],
        medium: theme.fontSizes['4xl'],
        large: theme.fontSizes['5xl'],
      },
      headline: {
        small: theme.fontSizes['2xl'],
        medium: theme.fontSizes['3xl'],
        large: theme.fontSizes['4xl'],
      },
      title: {
        small: theme.fontSizes.lg,
        medium: theme.fontSizes.xl,
        large: theme.fontSizes['2xl'],
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

  const getLineHeight = () => {
    const lineHeightMap = {
      display: {
        small: theme.lineHeights['3xl'],
        medium: theme.lineHeights['4xl'],
        large: theme.lineHeights['5xl'],
      },
      headline: {
        small: theme.lineHeights['2xl'],
        medium: theme.lineHeights['3xl'],
        large: theme.lineHeights['4xl'],
      },
      title: {
        small: theme.lineHeights.lg,
        medium: theme.lineHeights.xl,
        large: theme.lineHeights['2xl'],
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

  const getColorValue = () => {
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

  const getFontFamily = () => {
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
