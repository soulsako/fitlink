import { theme } from '@/styles/theme';
import { AntDesign, FontAwesome, MaterialIcons } from '@expo/vector-icons';
import type React from 'react';
import {
  StyleSheet,
  type TextStyle,
  TouchableOpacity,
  type ViewStyle,
} from 'react-native';
import { Text } from 'react-native-paper';

type Provider = 'google' | 'apple' | 'facebook' | 'email';

interface SocialButtonProps {
  provider: Provider;
  onPress: () => void;
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  iconColor?: string;
  backgroundColor?: string;
}

const SocialButton: React.FC<SocialButtonProps> = ({
  provider,
  onPress,
  disabled = false,
  style,
  textStyle,
  backgroundColor,
  iconColor,
}) => {
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
      backgroundColor: backgroundColor ?? theme.colors.primary,
      textColor: theme.colors.white,
      borderColor: theme.colors.socialGoogleBorder,
      renderIcon: () => (
        <AntDesign
          name="google"
          size={20}
          color={iconColor ?? theme.colors.white}
        />
      ),
    },
    apple: {
      text: 'Continue with Apple',
      backgroundColor: theme.colors.socialApple,
      textColor: theme.colors.socialAppleText,
      borderColor: theme.colors.socialAppleBorder,
      renderIcon: () => (
        <FontAwesome
          name="apple"
          size={22}
          color={iconColor ?? theme.colors.socialAppleText}
        />
      ),
    },
    facebook: {
      text: 'Continue with Facebook',
      backgroundColor: theme.colors.socialFacebook,
      textColor: theme.colors.socialFacebookText,
      borderColor: theme.colors.socialFacebookBorder,
      renderIcon: () => (
        <FontAwesome
          name="facebook"
          size={20}
          color={iconColor ?? theme.colors.socialFacebookText}
        />
      ),
    },
    email: {
      text: 'Continue with Email',
      backgroundColor: theme.colors.socialGoogle,
      textColor: theme.colors.black,
      borderColor: theme.colors.gray300,
      renderIcon: () => (
        <MaterialIcons
          name="email"
          size={20}
          color={iconColor ?? theme.colors.black}
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
      {/* Invisible icons keep spacing consistent across RN versions */}
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
    gap: theme.spacing.sm,
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    borderWidth: 1,
    marginVertical: theme.spacing.sm,
    minHeight: 48,
  },
  text: {
    fontSize: theme.fontSizes.base,
    fontWeight: '500',
    fontFamily: theme.fonts.medium,
  },
});

export default SocialButton;
