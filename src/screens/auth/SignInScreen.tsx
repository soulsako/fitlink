import ScreenBackground from '@/components/ScreenBackground';
import BackButton from '@/components/ui/BackButton';
import SocialButton from '@/components/ui/SocialButton';
import ThemedText from '@/components/ui/ThemedText';
import { useAuth } from '@/providers/AuthProvider';
import { type SignInFormData, signInSchema } from '@/schemas/authSchemas';
import { theme } from '@/styles/theme';
import type { AuthStackScreenProps } from '@/types/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  Alert,
  Keyboard,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

type Props = AuthStackScreenProps<'SignIn'>;

export default function SignInScreen({ navigation }: Props) {
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

  // Custom input theme for React Native Paper
  const inputTheme = {
    colors: {
      primary: theme.colors.inputBorderFocus,
      outline: theme.colors.inputBorder,
      outlineVariant: theme.colors.inputBorder,
      onSurfaceVariant: theme.colors.inputPlaceholder,
      onSurface: theme.colors.inputText,
      surface: theme.colors.inputBackground,
      surfaceVariant: theme.colors.inputBackground,
      error: theme.colors.inputBorderError,
    },
  };

  return (
    <View style={styles.container}>
      <ScreenBackground
        source={require('../../../assets/images/backgrounds/welcome-light.png')}
        style={styles.backgroundImage}
      >
        <SafeAreaView style={styles.safeArea}>
          <BackButton fallbackRoute="Welcome" />

          <View style={styles.centerContent}>
            <ThemedText
              variant="headline"
              size="large"
              style={[styles.headingText, { color: theme.colors.primary }]}
              weight="bold"
            >
              Welcome Back
            </ThemedText>
            <ThemedText
              variant="body"
              size="small"
              style={[
                styles.subHeadingText,
                { color: theme.colors.textSecondary },
              ]}
            >
              Sign in to your
            </ThemedText>
            <ThemedText
              variant="body"
              size="small"
              style={[
                styles.subHeadingText,
                { color: theme.colors.textSecondary },
              ]}
            >
              Local Mind account
            </ThemedText>
          </View>

          <View style={styles.bottomContent}>
            <View style={styles.formContainer}>
              {/* Email Input */}
              <Controller
                control={control}
                name="email"
                render={({ field: { onChange, onBlur, value } }) => (
                  <View style={styles.inputContainer}>
                    <TextInput
                      mode="outlined"
                      label="Email"
                      value={value}
                      textContentType="emailAddress"
                      onChangeText={onChange}
                      onBlur={onBlur}
                      error={!!errors.email}
                      keyboardType="email-address"
                      autoCapitalize="none"
                      autoComplete="email"
                      left={
                        <TextInput.Icon
                          icon="email"
                          color={theme.colors.iconSecondary}
                        />
                      }
                      style={styles.input}
                      theme={inputTheme}
                      textColor={theme.colors.inputText}
                      placeholderTextColor={theme.colors.inputPlaceholder}
                      outlineStyle={[
                        styles.inputOutline,
                        errors.email && {
                          borderColor: theme.colors.inputBorderError,
                        },
                      ]}
                      returnKeyType="done"
                      submitBehavior="blurAndSubmit"
                      multiline={false}
                      onSubmitEditing={() => Keyboard.dismiss()}
                    />
                    {errors.email && (
                      <ThemedText
                        style={[
                          styles.errorText,
                          { color: theme.colors.error },
                        ]}
                      >
                        {errors.email.message}
                      </ThemedText>
                    )}
                  </View>
                )}
              />

              {/* Password Input */}
              <Controller
                control={control}
                name="password"
                render={({ field: { onChange, onBlur, value } }) => (
                  <View style={styles.inputContainer}>
                    <TextInput
                      mode="outlined"
                      label="Password"
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      error={!!errors.password}
                      secureTextEntry={!showPassword}
                      autoComplete="password"
                      returnKeyType="done"
                      submitBehavior="blurAndSubmit"
                      multiline={false}
                      onSubmitEditing={() => Keyboard.dismiss()}
                      left={
                        <TextInput.Icon
                          icon="lock"
                          color={theme.colors.iconSecondary}
                        />
                      }
                      right={
                        <TextInput.Icon
                          icon={showPassword ? 'eye-off' : 'eye'}
                          color={theme.colors.iconSecondary}
                          onPress={() => setShowPassword(!showPassword)}
                        />
                      }
                      style={styles.input}
                      theme={inputTheme}
                      textColor={theme.colors.inputText}
                      placeholderTextColor={theme.colors.inputPlaceholder}
                      outlineStyle={[
                        styles.inputOutline,
                        errors.password && {
                          borderColor: theme.colors.inputBorderError,
                        },
                      ]}
                    />
                    {errors.password && (
                      <ThemedText
                        style={[
                          styles.errorText,
                          { color: theme.colors.error },
                        ]}
                      >
                        {errors.password.message}
                      </ThemedText>
                    )}
                  </View>
                )}
              />

              {/* Forgot Password */}
              <TouchableOpacity
                onPress={() => navigation.navigate('ForgotPassword')}
                style={styles.forgotPasswordButton}
              >
                <ThemedText
                  variant="body"
                  size="medium"
                  style={[
                    styles.forgotPasswordText,
                    { color: theme.colors.primary },
                  ]}
                >
                  Forgot Password?
                </ThemedText>
              </TouchableOpacity>

              {/* Sign In Button */}
              <Button
                mode="contained"
                onPress={handleSubmit(onSignIn)}
                loading={loading}
                disabled={loading || googleLoading}
                style={[
                  styles.signInButton,
                  { backgroundColor: theme.colors.buttonPrimary },
                ]}
                labelStyle={[
                  styles.signInButtonLabel,
                  { color: theme.colors.buttonPrimaryText },
                ]}
                contentStyle={styles.buttonContent}
              >
                Sign In
              </Button>

              {/* Divider */}
              <View style={styles.dividerContainer}>
                <View
                  style={[
                    styles.dividerLine,
                    { backgroundColor: theme.colors.divider },
                  ]}
                />
                <ThemedText
                  style={[
                    styles.dividerText,
                    { color: theme.colors.textTertiary },
                  ]}
                >
                  or
                </ThemedText>
                <View
                  style={[
                    styles.dividerLine,
                    { backgroundColor: theme.colors.divider },
                  ]}
                />
              </View>

              {/* Google Sign In Button */}
              <SocialButton
                provider="google"
                onPress={onGoogleSignIn}
                style={styles.socialButton}
                backgroundColor={theme.colors.black}
              />
            </View>

            {/* Footer */}
            <View style={styles.footer}>
              <ThemedText
                variant="body"
                size="medium"
                style={[
                  styles.footerText,
                  { color: theme.colors.textSecondary },
                ]}
              >
                Don&apos;t have an account?{' '}
              </ThemedText>
              <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                <ThemedText
                  variant="body"
                  size="medium"
                  style={[styles.signUpText, { color: theme.colors.primary }]}
                >
                  Sign Up
                </ThemedText>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </ScreenBackground>
    </View>
  );
}

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
    marginBottom: theme.spacing.lg,
    alignItems: 'center',
  },
  headingText: {
    fontSize: theme.fontSizes['4xl'],
    textAlign: 'center',
    marginBottom: theme.spacing.md,
    letterSpacing: -0.5,
  },
  socialButton: {
    marginVertical: theme.spacing.xs,
  },
  subHeadingText: {
    fontSize: theme.fontSizes.base,
    textAlign: 'center',
    lineHeight: theme.lineHeights.base,
    marginBottom: theme.spacing.xs,
  },
  bottomContent: {
    width: '100%',
    maxWidth: 400,
    paddingHorizontal: theme.spacing.xl,
  },
  formContainer: {
    marginBottom: theme.spacing['2xl'],
  },
  inputContainer: {
    marginBottom: theme.spacing.md,
  },
  input: {
    backgroundColor: theme.colors.inputBackground,
  },
  inputOutline: {
    borderColor: theme.colors.inputBorder,
    borderWidth: 1,
    borderRadius: theme.borderRadius.md,
  },
  errorText: {
    fontSize: theme.fontSizes.xs,
    marginTop: theme.spacing.xs,
    marginLeft: theme.spacing.sm,
  },
  forgotPasswordButton: {
    alignSelf: 'flex-end',
    marginBottom: theme.spacing.lg,
  },
  forgotPasswordText: {
    fontSize: theme.fontSizes.sm,
    textDecorationLine: 'underline',
    fontWeight: '500',
  },
  signInButton: {
    marginBottom: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    height: 48,
  },
  signInButtonLabel: {
    fontSize: theme.fontSizes.sm,
    fontWeight: '600',
  },
  buttonContent: {
    height: 48,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: theme.spacing.lg,
  },
  dividerLine: {
    flex: 1,
    height: 1,
  },
  dividerText: {
    marginHorizontal: theme.spacing.lg,
    fontSize: theme.fontSizes.sm,
  },
  googleButton: {
    marginBottom: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    height: 48,
  },
  googleButtonLabel: {
    fontSize: theme.fontSizes.sm,
    fontWeight: '500',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: theme.spacing.md,
  },
  footerText: {
    fontSize: theme.fontSizes.sm,
  },
  signUpText: {
    fontSize: theme.fontSizes.sm,
    textDecorationLine: 'underline',
    fontWeight: '500',
  },
});
