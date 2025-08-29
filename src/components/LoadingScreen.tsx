import { theme } from '@/styles/theme';
import type React from 'react';
import { StyleSheet, View } from 'react-native';
import { ActivityIndicator, Text } from 'react-native-paper';

const LoadingScreen: React.FC = () => {
  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <ActivityIndicator
        size="large"
        color={theme.colors.primary}
        style={styles.spinner}
      />
      <Text
        style={[
          styles.loadingText,
          {
            color: theme.colors.textSecondary,
            fontFamily: theme.fonts.medium,
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
    paddingHorizontal: theme.spacing.lg,
  },
  spinner: {
    marginBottom: theme.spacing.lg,
  },
  loadingText: {
    textAlign: 'center',
    fontSize: theme.fontSizes.base,
    lineHeight: theme.lineHeights.base,
  },
});

export default LoadingScreen;
