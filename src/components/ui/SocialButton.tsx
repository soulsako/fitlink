import { AntDesign, FontAwesome, MaterialIcons } from '@expo/vector-icons';
import type React from 'react';
import {
  StyleSheet,
  type TextStyle,
  TouchableOpacity,
  type ViewStyle,
} from 'react-native';
import { Text, useTheme } from 'react-native-paper';

type Provider = 'google' | 'apple' | 'facebook' | 'email';

interface SocialButtonProps {
  provider: Provider;
  onPress: () => void;
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  iconColor?: string;
}

const SocialButton: React.FC<SocialButtonProps> = ({
  provider,
  onPress,
  disabled = false,
  style,
  textStyle,
  iconColor,
}) => {
  const theme = useTheme();

  const config: Record<
    Provider,
    {
      text: string;
      backgroundColor: string;
      textColor: string;
      borderColor: string;
      renderIcon: () => React.ReactNode;
    }
  > = {
    google: {
      text: 'Continue with Google',
      backgroundColor: theme.colors.socialGoogleBg,
      textColor: theme.colors.socialGoogleText,
      borderColor: theme.colors.socialGoogleBorder,
      renderIcon: () => (
        <AntDesign
          name="google"
          size={20}
          color={iconColor ?? theme.colors.socialGoogleIcon}
        />
      ),
    },
    apple: {
      text: 'Continue with Apple',
      backgroundColor: theme.colors.socialAppleBg,
      textColor: theme.colors.socialAppleText,
      borderColor: theme.colors.socialAppleBorder,
      renderIcon: () => (
        <FontAwesome
          name="apple"
          size={22}
          color={iconColor ?? theme.colors.socialAppleIcon}
        />
      ),
    },
    facebook: {
      text: 'Continue with Facebook',
      backgroundColor: theme.colors.socialFacebookBg,
      textColor: theme.colors.socialFacebookText,
      borderColor: theme.colors.socialFacebookBorder,
      renderIcon: () => (
        <FontAwesome
          name="facebook"
          size={20}
          color={iconColor ?? theme.colors.socialFacebookIcon}
        />
      ),
    },
    email: {
      text: 'Continue with Email',
      backgroundColor: theme.colors.surface,
      textColor: theme.colors.onSurface,
      borderColor: theme.colors.outline,
      renderIcon: () => (
        <MaterialIcons
          name="email"
          size={20}
          color={iconColor ?? theme.colors.onSurface}
        />
      ),
    },
  };

  const c = config[provider];

  return (
    <TouchableOpacity
      accessibilityRole="button"
      style={[
        styles.button,
        {
          backgroundColor: c.backgroundColor,
          borderColor: c.borderColor,
          opacity: disabled ? 0.5 : 1,
        },
        style,
      ]}
      onPress={onPress}
      disabled={disabled}
    >
      {/* invisible icon for layout consistency */}
      <MaterialIcons name="arrow-back" size={0} color="transparent" />
      {c.renderIcon()}
      <MaterialIcons name="arrow-back" size={0} color="transparent" />
      <Text style={[styles.text, { color: c.textColor }, textStyle]}>
        {c.text}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    marginVertical: 6,
    minHeight: 48,
  },
  text: {
    fontSize: 16,
    fontWeight: '500',
  },
});

export default SocialButton;
