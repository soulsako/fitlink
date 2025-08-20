import { StyleSheet, View } from 'react-native';
import { ActivityIndicator, Title, useTheme } from 'react-native-paper';

export default function LoadingScreen() {
  const theme = useTheme();

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <ActivityIndicator size="large" color={theme.colors.primary} />
      <Title style={[styles.title, { color: theme.colors.primary }]}>
        FitLink
      </Title>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});
