import { useTheme } from '@/providers/ThemeProvider';
import { StyleSheet, View } from 'react-native';
import { IconButton } from 'react-native-paper';

/**
 * A reusable theme toggle button.
 * Place it anywhere in your UI (e.g., top-right in a header).
 */
export function ThemeToggleButton() {
  const { isDark, toggleScheme } = useTheme();

  return (
    <View style={styles.container}>
      <IconButton
        icon={isDark ? 'weather-sunny' : 'weather-night'}
        size={35}
        onPress={toggleScheme}
        accessibilityLabel="Toggle theme"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 50,
    right: 25,
    zIndex: 100,
  },
});
