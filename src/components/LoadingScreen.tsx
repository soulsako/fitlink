import type { ExtendedTheme } from '@/styles/themes-styles'; // 👈 import your extended theme type
import type React from 'react';
import { StyleSheet, View } from 'react-native';
import { ActivityIndicator, Text, useTheme } from 'react-native-paper';

const LoadingScreen: React.FC = () => {
  const theme = useTheme<ExtendedTheme>(); // ✅ no destructure

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <ActivityIndicator size="large" color={theme.colors.primary} />
      <Text
        style={[
          styles.loadingText,
          {
            color: theme.colors.onBackground,
            fontFamily: 'System', // Use system font while Inter loads
          },
        ]}
      >
        Loading LocalMind...
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
    textAlign: 'center',
    fontSize: 16,
  },
});

export default LoadingScreen;
