// src/screens/onboarding/WelcomeScreen.tsx
import type React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import PrimaryButton from '../../components/ui/PrimaryButton';
import SocialButton from '../../components/ui/SocialButton';
import ThemedText from '../../components/ui/ThemedText';
import ThemeToggle from '../../components/ui/ThemeToggle';
import { useAuth } from '../../providers/AuthProvider';
import { useTheme } from '../../providers/ThemeProvider';
import type { AuthStackScreenProps } from '../../types/navigation';

const { height } = Dimensions.get('window');

type WelcomeScreenProps = AuthStackScreenProps<'Welcome'>;

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ navigation }) => {
  const { theme } = useTheme();
  const { signInWithGoogle } = useAuth();

  const handleGoogleSignIn = async () => {
    const error = await signInWithGoogle();
    if (error) {
      console.error('Google sign in error:', error);
    }
  };

  const handleAppleSignIn = () => {
    // TODO: Implement Apple Sign In
    console.log('Apple Sign In not implemented yet');
  };

  const handleEmailSignIn = () => {
    navigation.navigate('SignIn');
  };

  const handleSignUp = () => {
    navigation.navigate('SignUp');
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      {/* Header with theme toggle */}
      <View style={styles.header}>
        <ThemeToggle />
      </View>

      {/* Brand Section */}
      <View style={styles.brandContainer}>
        <View
          style={[
            styles.logoContainer,
            { backgroundColor: theme.colors.primary },
          ]}
        >
          <ThemedText
            variant="display"
            size="medium"
            weight="bold"
            style={[styles.logoText, { color: theme.colors.onPrimary }]}
          >
            LocalMind
          </ThemedText>
        </View>
      </View>

      {/* Content */}
      <View style={styles.content}>
        <View style={styles.textContainer}>
          <ThemedText
            variant="display"
            size="small"
            weight="bold"
            style={styles.title}
          >
            Your local government services, simplified
          </ThemedText>

          <ThemedText
            variant="body"
            size="large"
            color="onSurfaceVariant"
            style={styles.subtitle}
          >
            Get instant answers about council services, NHS appointments,
            benefits, and more — all based on your exact location.
          </ThemedText>
        </View>

        <View style={styles.buttonContainer}>
          <SocialButton
            provider="google"
            onPress={handleGoogleSignIn}
            style={styles.socialButton}
          />

          <SocialButton
            provider="apple"
            onPress={handleAppleSignIn}
            style={styles.socialButton}
          />

          <SocialButton
            provider="email"
            onPress={handleEmailSignIn}
            style={styles.socialButton}
          />

          <View style={styles.signUpSection}>
            <ThemedText variant="body" size="medium" color="onSurfaceVariant">
              Don't have an account?{' '}
            </ThemedText>
            <PrimaryButton
              title="Sign up"
              onPress={handleSignUp}
              mode="text"
              style={styles.signUpButton}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  brandContainer: {
    height: height * 0.3,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  logoContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
  },
  logoText: {
    letterSpacing: -1,
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingBottom: 32,
  },
  textContainer: {
    marginTop: 32,
    alignItems: 'center',
  },
  title: {
    textAlign: 'center',
    marginBottom: 16,
    letterSpacing: -0.5,
  },
  subtitle: {
    textAlign: 'center',
    lineHeight: 24,
    letterSpacing: 0.2,
  },
  buttonContainer: {
    marginTop: 32,
  },
  socialButton: {
    marginBottom: 12,
  },
  signUpSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
  },
  signUpButton: {
    marginLeft: -8,
  },
});

export default WelcomeScreen;
