import { StyleSheet, View } from 'react-native';
import { Paragraph, Title, useTheme } from 'react-native-paper';

export default function ExploreScreen() {
  const theme = useTheme();

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <Title style={[styles.title, { color: theme.colors.primary }]}>
        Explore
      </Title>
      <Paragraph
        style={[styles.subtitle, { color: theme.colors.onSurfaceVariant }]}
      >
        Discover trainers and fitness classes near you
      </Paragraph>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
  },
});
