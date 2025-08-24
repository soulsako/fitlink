// src/screens/onboarding/WelcomeScreen.tsx  (REPLACE ENTIRE FILE)
import { MaterialIcons } from '@expo/vector-icons';
import type React from 'react';
import {
  Dimensions,
  Image,
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
        source={require('../../../assets/images/backgrounds/login-background.png')}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <View style={styles.overlay} />
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.centerContent}>
            <Image
              source={require('../../../assets/brand/logo/transparent.png')}
              style={styles.logo}
              resizeMode="contain"
            />
            <ThemedText
              variant="headline"
              size="large"
              style={[styles.headingText, { color: '#FFFFFF' }]}
              weight="semiBold"
            >
              Your Local AI
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
  safeArea: { flex: 1, justifyContent: 'space-between', alignItems: 'center' },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  logo: { width: 120, height: 120, marginBottom: 24 },
  headingText: {
    fontSize: 28,
    lineHeight: 34,
    textAlign: 'center',
    textShadowColor: 'rgba(0,0,0,0.75)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
    marginBottom: 60,
  },
  bottomContent: { paddingHorizontal: 24, paddingBottom: 40 },
  buttonContainer: { marginBottom: 30 },
  socialButton: {
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
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
