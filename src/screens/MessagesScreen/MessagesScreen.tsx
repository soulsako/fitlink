import type React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { MainTabScreenProps } from '../../types/navigation';

type MessagesScreenProps = MainTabScreenProps<'Messages'>;

const MessagesScreen: React.FC<MessagesScreenProps> = ({ navigation }) => {
  const theme = useTheme();

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <View style={styles.content}>
        <Text style={[styles.title, { color: theme.colors.onBackground }]}>
          AI Assistant
        </Text>
        <Text
          style={[styles.subtitle, { color: theme.colors.onSurfaceVariant }]}
        >
          Chat with LocalMind AI for personalized government service help
        </Text>

        <View style={styles.placeholder}>
          <Text
            style={[
              styles.placeholderText,
              { color: theme.colors.onSurfaceVariant },
            ]}
          >
            AI Chat interface will be implemented here
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 32,
  },
  placeholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    fontSize: 16,
    textAlign: 'center',
  },
});

export default MessagesScreen;
