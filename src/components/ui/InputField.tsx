// src/components/ui/InputField.tsx

import { theme } from '@/styles/theme';
import type { MaterialIcons } from '@expo/vector-icons';
import type React from 'react';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { HelperText, TextInput } from 'react-native-paper';

interface InputFieldProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  error?: string;
  secureTextEntry?: boolean;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  leftIcon?: keyof typeof MaterialIcons.glyphMap;
  rightIcon?: keyof typeof MaterialIcons.glyphMap;
  onRightIconPress?: () => void;
  multiline?: boolean;
  numberOfLines?: number;
  maxLength?: number;
  editable?: boolean;
  style?: any;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  value,
  onChangeText,
  placeholder,
  error,
  secureTextEntry = false,
  keyboardType = 'default',
  autoCapitalize = 'sentences',
  leftIcon,
  rightIcon,
  onRightIconPress,
  multiline = false,
  numberOfLines = 1,
  maxLength,
  editable = true,
  style,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleRightIconPress = () => {
    if (secureTextEntry) {
      setShowPassword(!showPassword);
    } else if (onRightIconPress) {
      onRightIconPress();
    }
  };

  const getRightIcon = () => {
    if (secureTextEntry) {
      return showPassword ? 'visibility-off' : 'visibility';
    }
    return rightIcon;
  };

  // Custom input theme for React Native Paper
  const inputTheme = {
    colors: {
      primary: theme.colors.inputBorderFocus,
      outline: theme.colors.inputBorder,
      outlineVariant: theme.colors.inputBorder,
      onSurfaceVariant: theme.colors.inputPlaceholder,
      onSurface: theme.colors.inputText,
      surface: theme.colors.inputBackground,
      surfaceVariant: theme.colors.inputBackground,
      error: theme.colors.inputBorderError,
    },
  };

  return (
    <View style={[styles.container, style]}>
      <TextInput
        label={label}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry && !showPassword}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        error={!!error}
        multiline={multiline}
        numberOfLines={numberOfLines}
        maxLength={maxLength}
        editable={editable}
        mode="outlined"
        style={[
          styles.input,
          { backgroundColor: theme.colors.inputBackground },
        ]}
        theme={inputTheme}
        textColor={theme.colors.inputText}
        placeholderTextColor={theme.colors.inputPlaceholder}
        outlineStyle={[
          styles.inputOutline,
          error && { borderColor: theme.colors.inputBorderError },
        ]}
        left={
          leftIcon ? <TextInput.Icon icon={leftIcon} size={20} /> : undefined
        }
        right={
          getRightIcon() ? (
            <TextInput.Icon
              icon={getRightIcon()!}
              onPress={handleRightIconPress}
              size={20}
            />
          ) : undefined
        }
        contentStyle={{
          fontFamily: theme.fonts.regular,
          fontSize: theme.fontSizes.base,
          paddingHorizontal: theme.spacing.sm,
        }}
      />
      {error && (
        <HelperText
          type="error"
          visible={!!error}
          style={{
            fontFamily: theme.fonts.regular,
            fontSize: theme.fontSizes.xs,
            color: theme.colors.error,
            marginLeft: theme.spacing.sm,
            marginTop: theme.spacing.xs,
          }}
        >
          {error}
        </HelperText>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: theme.spacing.sm,
  },
  input: {
    backgroundColor: 'transparent',
  },
  inputOutline: {
    borderColor: theme.colors.inputBorder,
    borderWidth: 1,
    borderRadius: theme.borderRadius.md,
  },
});

export default InputField;
