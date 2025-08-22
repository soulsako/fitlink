// src/components/ui/ThemeToggle.tsx

import { MaterialIcons } from '@expo/vector-icons';
import type React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '../../providers/ThemeProvider';

interface ThemeToggleProps {
  style?: any;
  size?: number;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ style, size = 24 }) => {
  const { isDark, toggleScheme, theme } = useTheme();

  return (
    <TouchableOpacity
      style={[styles.container, style]}
      onPress={toggleScheme}
      accessibilityLabel={`Switch to ${isDark ? 'light' : 'dark'} theme`}
      accessibilityRole="button"
    >
      <MaterialIcons
        name={isDark ? 'light-mode' : 'dark-mode'}
        size={size}
        color={theme.colors.onSurface}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 8,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ThemeToggle;
