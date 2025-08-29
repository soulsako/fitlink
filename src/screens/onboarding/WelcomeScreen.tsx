import ScreenBackground from '@/components/ScreenBackground';
import SocialButton from '@/components/ui/SocialButton';
import ThemedText from '@/components/ui/ThemedText';
import { useAuth } from '@/providers/AuthProvider';
import theme from '@/styles/theme';
import type { AuthStackScreenProps } from '@/types/navigation';
import { MaterialIcons } from '@expo/vector-icons';
import type React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type AuthLoginScreenProps = AuthStackScreenProps<'Welcome'>;

const WelcomeScreen: React.FC<AuthLoginScreenProps> = ({ navigation }) => {
  const { signInWithGoogle } = useAuth();

  const handleGoogleSignIn = async () => {
    await signInWithGoogle();
  };

  const handleAppleSignIn = () => {};
  const handleFacebookSignIn = () => {};
  const handleEmailSignIn = () => navigation.navigate('SignIn');

  const handleLanguagePress = () => {};
  const handleInviteCodePress = () => {};

  return (
    <View style={styles.container}>
      <ScreenBackground
        source={require('../../../assets/images/backgrounds/welcome-light.png')}
      >
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.centerContent}>
            <ThemedText
              variant="headline"
              size="large"
              style={[styles.headingText, { color: theme.colors.primary }]}
              weight="bold"
            >
              Local Mind
            </ThemedText>
            <ThemedText
              variant="body"
              size="small"
              style={[
                styles.subHeadingText,
                { color: theme.colors.textSecondary },
              ]}
            >
              Smart, secure sign-in to your
            </ThemedText>
            <ThemedText
              variant="body"
              size="small"
              style={[
                styles.subHeadingText,
                { color: theme.colors.textSecondary },
              ]}
            >
              community hub
            </ThemedText>
          </View>

          <View style={styles.bottomContent}>
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
                provider="facebook"
                onPress={handleFacebookSignIn}
                style={styles.socialButton}
              />
              <SocialButton
                provider="email"
                onPress={handleEmailSignIn}
                style={styles.socialButton}
              />
            </View>

            <View style={styles.footer}>
              <TouchableOpacity
                style={[
                  styles.footerButton,
                  { backgroundColor: theme.colors.white },
                ]}
                onPress={handleLanguagePress}
              >
                <MaterialIcons
                  name="language"
                  size={20}
                  color={theme.colors.textSecondary}
                />
                <ThemedText
                  variant="body"
                  size="medium"
                  style={[
                    styles.footerText,
                    { color: theme.colors.textSecondary },
                  ]}
                >
                  EN (US)
                </ThemedText>
                <MaterialIcons
                  name="keyboard-arrow-down"
                  size={20}
                  color={theme.colors.textSecondary}
                />
              </TouchableOpacity>

              <TouchableOpacity onPress={handleInviteCodePress}>
                <ThemedText
                  variant="body"
                  size="medium"
                  style={[styles.inviteText, { color: theme.colors.primary }]}
                >
                  Have an invite code?
                </ThemedText>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </ScreenBackground>
    </View>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  backgroundImage: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.md,
  },
  centerContent: {
    marginBottom: 50,
    alignItems: 'center',
  },
  headingText: {
    fontSize: theme.fontSizes['4xl'],
    textAlign: 'center',
    marginBottom: theme.spacing.md,
    letterSpacing: -0.5,
  },
  subHeadingText: {
    fontSize: theme.fontSizes.base,
    textAlign: 'center',
    lineHeight: theme.lineHeights.sm,
    marginBottom: theme.spacing.xs,
  },
  bottomContent: {
    width: '100%',
    maxWidth: 320,
    paddingHorizontal: theme.spacing.lg,
  },
  buttonContainer: {
    marginBottom: theme.spacing['3xl'],
    gap: theme.spacing.sm,
  },
  socialButton: {
    marginVertical: theme.spacing.xs,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: theme.spacing.md,
  },
  footerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.md,
    borderWidth: 1,
    borderColor: theme.colors.white,
  },
  footerText: {
    marginHorizontal: theme.spacing.xs,
    fontSize: theme.fontSizes.sm,
  },
  inviteText: {
    fontSize: theme.fontSizes.sm,
    textDecorationLine: 'underline',
    fontWeight: '500',
  },
});
