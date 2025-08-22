import type React from 'react';
import { Text as RNText, type TextProps as RNTextProps } from 'react-native';
import { useTheme } from '../../providers/ThemeProvider';

interface ThemedTextProps extends RNTextProps {
  variant?: 'display' | 'headline' | 'title' | 'body' | 'label';
  size?: 'small' | 'medium' | 'large';
  color?:
    | 'primary'
    | 'secondary'
    | 'tertiary'
    | 'onSurface'
    | 'onSurfaceVariant'
    | 'government'
    | 'nhs'
    | 'council';
  weight?: 'regular' | 'medium' | 'semiBold' | 'bold';
}

const ThemedText: React.FC<ThemedTextProps> = ({
  children,
  variant = 'body',
  size = 'medium',
  color = 'onSurface',
  weight = 'regular',
  style,
  ...props
}) => {
  const { theme } = useTheme();

  const getVariantStyle = () => {
    const key = `${variant}${
      size.charAt(0).toUpperCase() + size.slice(1)
    }` as keyof typeof theme.fonts;
    return theme.fonts[key] || theme.fonts.bodyMedium;
  };

  const getColorValue = () => {
    switch (color) {
      case 'primary':
        return theme.colors.primary;
      case 'secondary':
        return theme.colors.secondary;
      case 'tertiary':
        return theme.colors.tertiary;
      case 'government':
        return theme.colors.government;
      case 'nhs':
        return theme.colors.nhs;
      case 'council':
        return theme.colors.council;
      case 'onSurface':
        return theme.colors.onSurface;
      case 'onSurfaceVariant':
        return theme.colors.onSurfaceVariant;
      default:
        return theme.colors.onSurface;
    }
  };

  const getFontFamily = () => {
    switch (weight) {
      case 'medium':
        return 'Inter_500Medium';
      case 'semiBold':
        return 'Inter_600SemiBold';
      case 'bold':
        return 'Inter_700Bold';
      default:
        return 'Inter_400Regular';
    }
  };

  const variantStyle = getVariantStyle();
  const textColor = getColorValue();
  const fontFamily = getFontFamily();

  return (
    <RNText
      style={[
        {
          color: textColor,
          fontFamily,
          // Safely extract fontSize and lineHeight if they exist
          ...(variantStyle &&
            'fontSize' in variantStyle && { fontSize: variantStyle.fontSize }),
          ...(variantStyle &&
            'lineHeight' in variantStyle && {
              lineHeight: variantStyle.lineHeight,
            }),
          // Include any other properties from variantStyle except fontFamily (since we override it)
          ...(variantStyle &&
            Object.fromEntries(
              Object.entries(variantStyle).filter(
                ([key]) =>
                  key !== 'fontFamily' &&
                  key !== 'fontSize' &&
                  key !== 'lineHeight',
              ),
            )),
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
