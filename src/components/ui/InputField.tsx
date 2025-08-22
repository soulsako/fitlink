// src/components/ui/InputField.tsx

import type { MaterialIcons } from '@expo/vector-icons';
import type React from 'react';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { HelperText, TextInput } from 'react-native-paper';
import { useTheme } from '../../providers/ThemeProvider';

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
  const { theme } = useTheme();
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
        style={[styles.input, { backgroundColor: theme.colors.surface }]}
        outlineColor={theme.colors.outline}
        activeOutlineColor={theme.colors.primary}
        textColor={theme.colors.onSurface}
        placeholderTextColor={theme.colors.onSurfaceVariant}
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
          fontFamily: 'Inter_400Regular',
          fontSize: 16,
        }}
      />
      {error && (
        <HelperText
          type="error"
          visible={!!error}
          style={{
            fontFamily: 'Inter_400Regular',
            color: theme.colors.error,
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
    marginVertical: 6,
  },
  input: {
    backgroundColor: 'transparent',
  },
});

export default InputField;
