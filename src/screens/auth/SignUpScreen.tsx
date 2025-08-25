import { MaterialIcons } from '@expo/vector-icons';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  Alert,
  Dimensions,
  ImageBackground,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { Button, TextInput, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');

import ThemedText from '@/components/ui/ThemedText';
import { useAuth } from '../../providers/AuthProvider';
import { type SignUpFormData, signUpSchema } from '../../schemas/authSchemas';
import type { AuthStackScreenProps } from '../../types/navigation';

type Props = AuthStackScreenProps<'SignUp'>;

export default function SignUpScreen({ navigation }: Props) {
  const theme = useTheme();
  const { signUp, signInWithGoogle } = useAuth();
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
      fullName: '',
    },
  });

  const onSignUp = async (data: SignUpFormData) => {
    setLoading(true);
    try {
      const error = await signUp(data);
      if (error) {
        Alert.alert('Sign Up Failed', error.message);
      } else {
        Alert.alert(
          'Check Your Email',
          'We sent you a confirmation link. Please check your email and click the link to verify your account.',
          [
            {
              text: 'OK',
              onPress: () => navigation.navigate('SignIn'),
            },
          ],
        );
      }
    } catch {
      Alert.alert('Error', 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const onGoogleSignUp = async () => {
    setGoogleLoading(true);
    try {
      const error = await signInWithGoogle();
      if (error) {
        Alert.alert('Google Sign Up Failed', error.message);
      }
    } catch {
      Alert.alert('Error', 'Failed to sign up with Google');
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../../assets/images/backgrounds/signup-background.png')}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <View style={styles.overlay} />
        <SafeAreaView style={styles.safeArea}>
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.centerContent}>
              <ThemedText
                variant="headline"
                size="large"
                style={styles.headingText}
                weight="bold"
              >
                Join Local Mind
              </ThemedText>
              <ThemedText
                variant="body"
                size="small"
                style={styles.subHeadingText}
              >
                Create your account to
              </ThemedText>
              <ThemedText
                variant="body"
                size="small"
                style={styles.subHeadingText}
              >
                get started
              </ThemedText>
            </View>

            <View style={styles.bottomContent}>
              <View style={styles.formContainer}>
                <Controller
                  control={control}
                  name="fullName"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      mode="outlined"
                      label="Full Name"
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      error={!!errors.fullName}
                      autoCapitalize="words"
                      autoComplete="name"
                      left={<TextInput.Icon icon="account" />}
                      style={styles.input}
                      theme={{
                        colors: {
                          onSurface: '#000000',
                          onSurfaceVariant: '#000000',
                          outline: '#000000',
                          primary: '#000000',
                          background: 'transparent',
                          onSurfaceDisabled: '#000000',
                          secondary: '#000000',
                          onSecondary: '#000000',
                          surfaceVariant: 'transparent',
                        },
                        roundness: 8,
                      }}
                      textColor="#000000"
                      placeholderTextColor="rgba(0, 0, 0, 0.7)"
                    />
                  )}
                />
                {errors.fullName && (
                  <ThemedText style={styles.errorText}>
                    {errors.fullName.message}
                  </ThemedText>
                )}

                <Controller
                  control={control}
                  name="email"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      mode="outlined"
                      label="Email"
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      error={!!errors.email}
                      keyboardType="email-address"
                      autoCapitalize="none"
                      autoComplete="email"
                      left={<TextInput.Icon icon="email" />}
                      style={styles.input}
                      theme={{
                        colors: {
                          onSurface: '#000000',
                          onSurfaceVariant: '#000000',
                          outline: '#000000',
                          primary: '#000000',
                          background: 'transparent',
                          onSurfaceDisabled: '#000000',
                          secondary: '#000000',
                          onSecondary: '#000000',
                          surfaceVariant: 'transparent',
                        },
                        roundness: 8,
                      }}
                      textColor="#000000"
                      placeholderTextColor="rgba(0, 0, 0, 0.7)"
                    />
                  )}
                />
                {errors.email && (
                  <ThemedText style={styles.errorText}>
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
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      error={!!errors.password}
                      secureTextEntry={!showPassword}
                      autoComplete="new-password"
                      left={<TextInput.Icon icon="lock" />}
                      right={
                        <TextInput.Icon
                          icon={showPassword ? 'eye-off' : 'eye'}
                          onPress={() => setShowPassword(!showPassword)}
                        />
                      }
                      style={styles.input}
                      theme={{
                        colors: {
                          onSurface: '#000000',
                          onSurfaceVariant: '#000000',
                          outline: '#000000',
                          primary: '#000000',
                          background: 'transparent',
                          onSurfaceDisabled: '#000000',
                          secondary: '#000000',
                          onSecondary: '#000000',
                          surfaceVariant: 'transparent',
                        },
                        roundness: 8,
                      }}
                      textColor="#000000"
                      placeholderTextColor="rgba(0, 0, 0, 0.7)"
                    />
                  )}
                />
                {errors.password && (
                  <ThemedText style={styles.errorText}>
                    {errors.password.message}
                  </ThemedText>
                )}

                <Controller
                  control={control}
                  name="confirmPassword"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      mode="outlined"
                      label="Confirm Password"
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      error={!!errors.confirmPassword}
                      secureTextEntry={!showConfirmPassword}
                      autoComplete="new-password"
                      left={<TextInput.Icon icon="lock-check" />}
                      right={
                        <TextInput.Icon
                          icon={showConfirmPassword ? 'eye-off' : 'eye'}
                          onPress={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                        />
                      }
                      style={styles.input}
                      theme={{
                        colors: {
                          onSurface: '#000000',
                          onSurfaceVariant: '#000000',
                          outline: '#000000',
                          primary: '#000000',
                          background: 'transparent',
                          onSurfaceDisabled: '#000000',
                          secondary: '#000000',
                          onSecondary: '#000000',
                          surfaceVariant: 'transparent',
                        },
                        roundness: 8,
                      }}
                      textColor="#000000"
                      placeholderTextColor="rgba(0, 0, 0, 0.7)"
                    />
                  )}
                />
                {errors.confirmPassword && (
                  <ThemedText style={styles.errorText}>
                    {errors.confirmPassword.message}
                  </ThemedText>
                )}

                <Button
                  mode="contained"
                  onPress={handleSubmit(onSignUp)}
                  loading={loading}
                  disabled={loading || googleLoading}
                  style={[
                    styles.signUpButton,
                    { backgroundColor: theme.colors.tertiary },
                  ]}
                  labelStyle={styles.signUpButtonLabel}
                  contentStyle={styles.buttonContent}
                >
                  Create Account
                </Button>

                <View style={styles.dividerContainer}>
                  <View style={styles.dividerLine} />
                  <ThemedText style={styles.dividerText}>or</ThemedText>
                  <View style={styles.dividerLine} />
                </View>

                <Button
                  mode="contained"
                  onPress={onGoogleSignUp}
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
                  Already have an account?{' '}
                </ThemedText>
                <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
                  <ThemedText
                    variant="body"
                    size="medium"
                    style={[styles.signInText, { color: '#FFFFFF' }]}
                  >
                    Sign In
                  </ThemedText>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
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
  safeArea: { flex: 1 },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
    color: '#FF6B6B',
    marginTop: 4,
    marginLeft: 12,
  },
  signUpButton: {
    marginVertical: 8,
    borderRadius: 8,
    height: 48,
  },
  signUpButtonLabel: {
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
  signInText: {
    fontSize: 14,
    textDecorationLine: 'underline',
  },
});
