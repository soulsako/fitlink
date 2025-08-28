import { ThemedBackground } from '@/components/ThemeBackground';
import SocialButton from '@/components/ui/SocialButton';
import ThemedText from '@/components/ui/ThemedText';
import { ThemeToggleButton } from '@/components/ui/ThemeToggleButton';
import { useAuth } from '@/providers/AuthProvider';
import { useTheme } from '@/providers/ThemeProvider';
import type { AuthStackScreenProps } from '@/types/navigation';
import { MaterialIcons } from '@expo/vector-icons';
import type React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type AuthLoginScreenProps = AuthStackScreenProps<'Welcome'>;

const AuthLoginScreen: React.FC<AuthLoginScreenProps> = ({ navigation }) => {
  const { signInWithGoogle } = useAuth();
  const { theme } = useTheme();

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
      <ThemedBackground
        lightImage={require('../../../assets/images/backgrounds/welcome-light.png')}
        darkImage={require('../../../assets/images/backgrounds/welcome-dark.png')}
      >
        <SafeAreaView style={styles.safeArea}>
          <ThemeToggleButton />

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
                { color: theme.colors.onBackground },
              ]}
            >
              Smart, secure sign-in to
            </ThemedText>
            <ThemedText
              variant="body"
              size="small"
              style={[
                styles.subHeadingText,
                { color: theme.colors.onBackground },
              ]}
            >
              your community hub
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
                style={styles.footerButton}
                onPress={handleLanguagePress}
              >
                <MaterialIcons
                  name="language"
                  size={20}
                  color={theme.colors.onBackground}
                />
                <ThemedText
                  variant="body"
                  size="medium"
                  style={[
                    styles.footerText,
                    { color: theme.colors.onBackground },
                  ]}
                >
                  EN (US)
                </ThemedText>
                <MaterialIcons
                  name="keyboard-arrow-down"
                  size={20}
                  color={theme.colors.onBackground}
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
      </ThemedBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  safeArea: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  centerContent: {
    marginBottom: 50,
  },
  headingText: {
    fontSize: 36,
    textAlign: 'center',
    marginBottom: 15,
  },
  subHeadingText: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
  },
  bottomContent: {
    paddingHorizontal: 24,
  },
  buttonContainer: { marginBottom: 100 },
  socialButton: {
    marginVertical: 8,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  footerButton: { flexDirection: 'row', alignItems: 'center' },
  footerText: { marginHorizontal: 8, fontSize: 14 },
  inviteText: { fontSize: 14, textDecorationLine: 'underline' },
});

export default AuthLoginScreen;
