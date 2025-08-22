import { MaterialIcons } from '@expo/vector-icons';
import type React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Text, useTheme } from 'react-native-paper';

interface SocialButtonProps {
  provider: 'google' | 'apple' | 'facebook' | 'email';
  onPress: () => void;
  disabled?: boolean;
  style?: any;
}

const SocialButton: React.FC<SocialButtonProps> = ({
  provider,
  onPress,
  disabled = false,
  style,
}) => {
  const theme = useTheme();

  const getButtonConfig = () => {
    switch (provider) {
      case 'google':
        return {
          icon: 'google' as keyof typeof MaterialIcons.glyphMap,
          text: 'Continue with Google',
          backgroundColor: '#FFFFFF',
          textColor: '#1F1F1F',
          borderColor: '#E0E0E0',
        };
      case 'apple':
        return {
          icon: 'apple' as keyof typeof MaterialIcons.glyphMap,
          text: 'Continue with Apple',
          backgroundColor: '#000000',
          textColor: '#FFFFFF',
          borderColor: '#000000',
        };
      case 'facebook':
        return {
          icon: 'facebook' as keyof typeof MaterialIcons.glyphMap,
          text: 'Continue with Facebook',
          backgroundColor: '#1877F2',
          textColor: '#FFFFFF',
          borderColor: '#1877F2',
        };
      case 'email':
        return {
          icon: 'email' as keyof typeof MaterialIcons.glyphMap,
          text: 'Continue with email',
          backgroundColor: theme.colors.surface,
          textColor: theme.colors.onSurface,
          borderColor: theme.colors.outline,
        };
    }
  };

  const config = getButtonConfig();

  return (
    <TouchableOpacity
      style={[
        styles.button,
        {
          backgroundColor: config.backgroundColor,
          borderColor: config.borderColor,
          opacity: disabled ? 0.5 : 1,
        },
        style,
      ]}
      onPress={onPress}
      disabled={disabled}
    >
      <MaterialIcons
        name={config.icon}
        size={20}
        color={config.textColor}
        style={styles.icon}
      />
      <Text style={[styles.text, { color: config.textColor }]}>
        {config.text}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    marginVertical: 6,
    minHeight: 48,
  },
  icon: {
    marginRight: 12,
  },
  text: {
    fontSize: 16,
    fontWeight: '500',
  },
});

export default SocialButton;
