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

import ScreenBackground from '@/components/screen-background';
import BackButton from '@/components/ui/back-button';
import SocialButton from '@/components/ui/social-button';
import ThemedText from '@/components/ui/themed-text';
import { useAuth } from '@/providers/auth-provider';
import { type SignUpFormData, signUpSchema } from '@/schemas/auth-schemas';
import { theme } from '@/styles/theme';
import type { AuthStackScreenProps } from '@/types/navigation';

type Props = AuthStackScreenProps<'SignUp'>;

export default function SignUpScreen({ navigation }: Props) {
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
      onBackground: theme.colors.inputText,
      background: theme.colors.inputBackground,
    },
  };

  return (
    <View style={styles.container}>
      <ScreenBackground
        source={require('../../../assets/images/backgrounds/welcome-light.png')}
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
              Join Local Mind
            </ThemedText>
            <ThemedText
              variant="body"
              size="small"
              style={[
                styles.subHeadingText,
                { color: theme.colors.textSecondary },
              ]}
            >
              Create your account to get started
            </ThemedText>
          </View>

          <View style={styles.bottomContent}>
            <View style={styles.formContainer}>
              {/* Full Name Input */}
              <Controller
                control={control}
                name="fullName"
                render={({ field: { onChange, onBlur, value } }) => (
                  <View style={styles.inputContainer}>
                    <TextInput
                      mode="outlined"
                      label="Full Name"
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      error={!!errors.fullName}
                      autoCapitalize="words"
                      autoComplete="name"
                      returnKeyType="done"
                      multiline={false}
                      onSubmitEditing={() => Keyboard.dismiss()}
                      left={
                        <TextInput.Icon
                          icon="account"
                          color={theme.colors.iconSecondary}
                        />
                      }
                      style={styles.input}
                      theme={inputTheme}
                      textColor={theme.colors.inputText}
                      placeholderTextColor={theme.colors.inputPlaceholder}
                      outlineStyle={[
                        styles.inputOutline,
                        errors.fullName && {
                          borderColor: theme.colors.inputBorderError,
                        },
                      ]}
                      contentStyle={{
                        fontFamily: theme.fonts.regular,
                        fontSize: theme.fontSizes.base,
                        paddingHorizontal: theme.spacing.sm,
                      }}
                    />
                    {errors.fullName && (
                      <ThemedText
                        style={[
                          styles.errorText,
                          { color: theme.colors.error },
                        ]}
                      >
                        {errors.fullName.message}
                      </ThemedText>
                    )}
                  </View>
                )}
              />

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
                      onChangeText={onChange}
                      onBlur={onBlur}
                      error={!!errors.email}
                      keyboardType="email-address"
                      autoCapitalize="none"
                      autoComplete="email"
                      returnKeyType="done"
                      multiline={false}
                      onSubmitEditing={() => Keyboard.dismiss()}
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
                      contentStyle={{
                        fontFamily: theme.fonts.regular,
                        fontSize: theme.fontSizes.base,
                        paddingHorizontal: theme.spacing.sm,
                      }}
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
                      autoComplete="new-password"
                      returnKeyType="done"
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
                      contentStyle={{
                        fontFamily: theme.fonts.regular,
                        fontSize: theme.fontSizes.base,
                        paddingHorizontal: theme.spacing.sm,
                      }}
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

              {/* Confirm Password Input */}
              <Controller
                control={control}
                name="confirmPassword"
                render={({ field: { onChange, onBlur, value } }) => (
                  <View style={styles.inputContainer}>
                    <TextInput
                      mode="outlined"
                      label="Confirm Password"
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      returnKeyType="done"
                      multiline={false}
                      onSubmitEditing={() => Keyboard.dismiss()}
                      error={!!errors.confirmPassword}
                      secureTextEntry={!showConfirmPassword}
                      autoComplete="new-password"
                      left={
                        <TextInput.Icon
                          icon="lock-check"
                          color={theme.colors.iconSecondary}
                        />
                      }
                      right={
                        <TextInput.Icon
                          icon={showConfirmPassword ? 'eye-off' : 'eye'}
                          onPress={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                        />
                      }
                      style={styles.input}
                      theme={inputTheme}
                      textColor={theme.colors.inputText}
                      placeholderTextColor={theme.colors.inputPlaceholder}
                      outlineStyle={[
                        styles.inputOutline,
                        errors.confirmPassword && {
                          borderColor: theme.colors.inputBorderError,
                        },
                      ]}
                      contentStyle={{
                        fontFamily: theme.fonts.regular,
                        fontSize: theme.fontSizes.base,
                        paddingHorizontal: theme.spacing.sm,
                      }}
                    />
                    {errors.confirmPassword && (
                      <ThemedText
                        style={[
                          styles.errorText,
                          { color: theme.colors.error },
                        ]}
                      >
                        {errors.confirmPassword.message}
                      </ThemedText>
                    )}
                  </View>
                )}
              />

              {/* Sign Up Button */}
              <Button
                mode="contained"
                onPress={handleSubmit(onSignUp)}
                loading={loading}
                disabled={loading || googleLoading}
                style={[
                  styles.signUpButton,
                  { backgroundColor: theme.colors.buttonPrimary },
                ]}
                labelStyle={[
                  styles.signUpButtonLabel,
                  { color: theme.colors.buttonPrimaryText },
                ]}
                contentStyle={styles.buttonContent}
              >
                Create Account
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

              {/* Google Sign Up Button */}
              <SocialButton
                provider="google"
                onPress={onGoogleSignUp}
                disabled={loading || googleLoading}
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
                Already have an account?{' '}
              </ThemedText>
              <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
                <ThemedText
                  variant="body"
                  size="medium"
                  style={[styles.signInText, { color: theme.colors.primary }]}
                >
                  Sign In
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
    fontSize: theme.fontSizes.xl4,
    textAlign: 'center',
    marginBottom: theme.spacing.md,
    letterSpacing: -0.5,
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
    marginBottom: theme.spacing.xl2,
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
  signUpButton: {
    marginBottom: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    height: 48,
  },
  signUpButtonLabel: {
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
  socialButton: {
    marginVertical: theme.spacing.xs,
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
  signInText: {
    fontSize: theme.fontSizes.sm,
    textDecorationLine: 'underline',
    fontWeight: '500',
  },
});
