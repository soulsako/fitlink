import { MaterialIcons } from '@expo/vector-icons';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  Alert,
  Dimensions,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { Button, TextInput, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');

import BackButton from '@/components/ui/BackButton';
import ThemedText from '@/components/ui/ThemedText';
import { useAuth } from '@/providers/AuthProvider';
import { type SignInFormData, signInSchema } from '@/schemas/authSchemas';
import type { AuthStackScreenProps } from '@/types/navigation';
import { buildInputTheme } from '@/utils/paperInputTheme';

type Props = AuthStackScreenProps<'SignIn'>;

export default function SignInScreen({ navigation }: Props) {
  const theme = useTheme();
  const { signIn, signInWithGoogle } = useAuth();
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSignIn = async (data: SignInFormData) => {
    setLoading(true);
    try {
      const error = await signIn(data.email, data.password);
      if (error) {
        Alert.alert('Sign In Failed', error.message);
      }
    } catch {
      Alert.alert('Error', 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const onGoogleSignIn = async () => {
    setGoogleLoading(true);
    try {
      const error = await signInWithGoogle();
      if (error) {
        Alert.alert('Google Sign In Failed', error.message);
      }
    } catch {
      Alert.alert('Error', 'Failed to sign in with Google');
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../../assets/images/backgrounds/signin.png')}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <View style={styles.overlay} />
        <SafeAreaView style={styles.safeArea}>
          <BackButton fallbackRoute="Welcome" />
          <View style={styles.centerContent}>
            <ThemedText
              variant="headline"
              size="large"
              style={styles.headingText}
              weight="bold"
            >
              Welcome Back
            </ThemedText>
            <ThemedText
              variant="body"
              size="small"
              style={styles.subHeadingText}
            >
              Sign in to your
            </ThemedText>
            <ThemedText
              variant="body"
              size="small"
              style={styles.subHeadingText}
            >
              Local Mind account
            </ThemedText>
          </View>

          <View style={styles.bottomContent}>
            <View style={styles.formContainer}>
              <Controller
                control={control}
                name="email"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    mode="outlined"
                    label="Email"
                    value={value}
                    textContentType="emailAddress"
                    secureTextEntry
                    onChangeText={onChange}
                    onBlur={onBlur}
                    contentStyle={{ paddingTop: 12 }}
                    error={!!errors.email}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoComplete="email"
                    left={<TextInput.Icon icon="email" />}
                    style={styles.input}
                    theme={buildInputTheme(theme, { roundness: 8 })}
                    textColor="#000000"
                    placeholderTextColor="rgba(0, 0, 0, 0.7)"
                  />
                )}
              />
              {errors.email && (
                <ThemedText
                  style={[styles.errorText, { color: theme.colors.error }]}
                >
                  {errors.email.message}
                </ThemedText>
              )}

              <Controller
                control={control}
                name="password"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    mode="outlined"
                    label="Password"
                    contentStyle={{ paddingTop: 12 }}
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    dense
                    error={!!errors.password}
                    secureTextEntry={!showPassword}
                    autoComplete="password"
                    left={<TextInput.Icon icon="lock" />}
                    right={
                      <TextInput.Icon
                        icon={showPassword ? 'eye-off' : 'eye'}
                        onPress={() => setShowPassword(!showPassword)}
                      />
                    }
                    style={styles.input}
                    theme={buildInputTheme(theme, { roundness: 8 })}
                    textColor={theme.colors.onPrimary}
                    placeholderTextColor="rgba(0, 0, 0, 0.7)"
                  />
                )}
              />
              {errors.password && (
                <ThemedText
                  style={[styles.errorText, { color: theme.colors.error }]}
                >
                  {errors.password.message}
                </ThemedText>
              )}

              <TouchableOpacity
                onPress={() => navigation.navigate('ForgotPassword')}
                style={styles.forgotPasswordButton}
              >
                <ThemedText
                  variant="body"
                  size="medium"
                  style={styles.forgotPasswordText}
                >
                  Forgot Password?
                </ThemedText>
              </TouchableOpacity>

              <Button
                mode="contained"
                onPress={handleSubmit(onSignIn)}
                loading={loading}
                disabled={loading || googleLoading}
                style={[
                  styles.signInButton,
                  { backgroundColor: theme.colors.tertiary },
                ]}
                labelStyle={styles.signInButtonLabel}
                contentStyle={styles.buttonContent}
              >
                Sign In
              </Button>

              <View style={styles.dividerContainer}>
                <View style={styles.dividerLine} />
                <ThemedText style={styles.dividerText}>or</ThemedText>
                <View style={styles.dividerLine} />
              </View>

              <Button
                mode="contained"
                onPress={onGoogleSignIn}
                loading={googleLoading}
                disabled={loading || googleLoading}
                icon={() => (
                  <MaterialIcons name="login" size={20} color="#000000" />
                )}
                style={styles.googleButton}
                labelStyle={styles.googleButtonLabel}
                contentStyle={styles.buttonContent}
              >
                Continue with Google
              </Button>
            </View>

            <View style={styles.footer}>
              <ThemedText
                variant="body"
                size="medium"
                style={[styles.footerText, { color: '#FFFFFF' }]}
              >
                Don't have an account?{' '}
              </ThemedText>
              <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                <ThemedText
                  variant="body"
                  size="medium"
                  style={[styles.signUpText, { color: '#FFFFFF' }]}
                >
                  Sign Up
                </ThemedText>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  backgroundImage: { flex: 1, width, height },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  safeArea: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  backButton: {
    position: 'absolute',
    top: 55,
    left: 25,
    zIndex: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 24,
    padding: 6,
  },
  centerContent: {
    marginBottom: 25,
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
    paddingHorizontal: 60,
    width: '100%',
  },
  formContainer: {
    marginBottom: 40,
  },
  input: {
    backgroundColor: 'transparent',
    marginVertical: 8,
    paddingTop: 8,
  },
  errorText: {
    fontSize: 12,
    marginTop: 4,
    marginLeft: 12,
  },
  forgotPasswordButton: {
    alignSelf: 'flex-end',
    marginTop: 8,
    marginBottom: 16,
  },
  forgotPasswordText: {
    color: '#000000',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
  signInButton: {
    marginVertical: 8,
    borderRadius: 8,
    height: 48,
  },
  signInButtonLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  buttonContent: {
    height: 48,
    paddingVertical: 0,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 16,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#000000',
  },
  dividerText: {
    marginHorizontal: 16,
    color: '#000000',
    fontSize: 14,
  },

  googleButton: {
    marginVertical: 8,
    backgroundColor: '#000000',
    borderRadius: 8,
    height: 48,
  },
  googleButtonLabel: {
    fontSize: 14,
    color: '#FFFFFF',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
  },
  signUpText: {
    fontSize: 14,
    textDecorationLine: 'underline',
  },
});
