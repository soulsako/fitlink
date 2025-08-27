// src/screens/onboarding/WelcomeScreen.tsx  (REPLACE ENTIRE FILE)
import { MaterialIcons } from '@expo/vector-icons';
import type React from 'react';
import {
  Dimensions,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import SocialButton from '../../components/ui/SocialButton';
import ThemedText from '../../components/ui/ThemedText';
import { useAuth } from '../../providers/AuthProvider';
import type { AuthStackScreenProps } from '../../types/navigation';

const { width, height } = Dimensions.get('window');

type AuthLoginScreenProps = AuthStackScreenProps<'Welcome'>;

const AuthLoginScreen: React.FC<AuthLoginScreenProps> = ({ navigation }) => {
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
      <ImageBackground
        source={require('../../../assets/images/backgrounds/wlecome.png')}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <View style={styles.overlay} />
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.centerContent}>
            <ThemedText
              variant="headline"
              size="large"
              style={styles.headingText}
              weight="bold"
            >
              Local Mind
            </ThemedText>
            <ThemedText
              variant="body"
              size="small"
              style={styles.subHeadingText}
            >
              Smart, secure sign-in to
            </ThemedText>
            <ThemedText
              variant="body"
              size="small"
              style={styles.subHeadingText}
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
                <MaterialIcons name="language" size={20} color="#FFFFFF" />
                <ThemedText
                  variant="body"
                  size="medium"
                  style={[styles.footerText, { color: '#FFFFFF' }]}
                >
                  EN (US)
                </ThemedText>
                <MaterialIcons
                  name="keyboard-arrow-down"
                  size={20}
                  color="#FFFFFF"
                />
              </TouchableOpacity>

              <TouchableOpacity onPress={handleInviteCodePress}>
                <ThemedText
                  variant="body"
                  size="medium"
                  style={[styles.inviteText, { color: '#FFFFFF' }]}
                >
                  Have an invite code?
                </ThemedText>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  backgroundImage: { flex: 1, width, height },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
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
