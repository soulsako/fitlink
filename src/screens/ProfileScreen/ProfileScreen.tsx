import { Alert, StyleSheet, View } from 'react-native';
import { Button, Card, Paragraph, Title, useTheme } from 'react-native-paper';

import { useAuth } from '../../providers/AuthProvider';

export default function ProfileScreen() {
  const theme = useTheme();
  const { userProfile, signOut } = useAuth();

  const handleSignOut = () => {
    Alert.alert('Sign Out', 'Are you sure you want to sign out?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Sign Out',
        style: 'destructive',
        onPress: signOut,
      },
    ]);
  };

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <Card style={styles.card}>
        <Card.Content>
          <Title style={[styles.title, { color: theme.colors.primary }]}>
            Profile
          </Title>

          {userProfile ? (
            <View style={styles.profileInfo}>
              <Paragraph
                style={[styles.label, { color: theme.colors.onSurfaceVariant }]}
              >
                Name
              </Paragraph>
              <Paragraph
                style={[styles.value, { color: theme.colors.onSurface }]}
              >
                {userProfile.full_name}
              </Paragraph>

              <Paragraph
                style={[styles.label, { color: theme.colors.onSurfaceVariant }]}
              >
                Email
              </Paragraph>
              <Paragraph
                style={[styles.value, { color: theme.colors.onSurface }]}
              >
                {userProfile.email}
              </Paragraph>

              <Paragraph
                style={[styles.label, { color: theme.colors.onSurfaceVariant }]}
              >
                Account Type
              </Paragraph>
              <Paragraph
                style={[styles.value, { color: theme.colors.onSurface }]}
              >
                {userProfile.user_type === 'trainer'
                  ? 'Personal Trainer'
                  : 'Customer'}
              </Paragraph>
            </View>
          ) : (
            <Paragraph
              style={[
                styles.subtitle,
                { color: theme.colors.onSurfaceVariant },
              ]}
            >
              Loading profile information...
            </Paragraph>
          )}

          <Button
            mode="outlined"
            onPress={handleSignOut}
            style={styles.signOutButton}
          >
            Sign Out
          </Button>
        </Card.Content>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  card: {
    elevation: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
  profileInfo: {
    gap: 8,
    marginBottom: 32,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
  },
  value: {
    fontSize: 16,
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 32,
  },
  signOutButton: {
    marginTop: 16,
    paddingVertical: 8,
  },
});
