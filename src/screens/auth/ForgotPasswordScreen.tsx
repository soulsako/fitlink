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

import ScreenBackground from '@/components/ScreenBackground';
import BackButton from '@/components/ui/BackButton';
import ThemedText from '@/components/ui/ThemedText';
import { useAuth } from '@/providers/AuthProvider';
import {
  type ForgotPasswordFormData,
  forgotPasswordSchema,
} from '@/schemas/authSchemas';
import { theme } from '@/styles/theme';
import type { AuthStackScreenProps } from '@/types/navigation';

type Props = AuthStackScreenProps<'ForgotPassword'>;

export default function ForgotPasswordScreen({ navigation }: Props) {
  const { sendPasswordResetEmail } = useAuth();
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSendResetEmail = async (data: ForgotPasswordFormData) => {
    setLoading(true);
    try {
      const error = await sendPasswordResetEmail(data.email);
      if (error) {
        Alert.alert('Error', error.message);
      } else {
        setEmailSent(true);
      }
    } catch {
      Alert.alert('Error', 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const onResendEmail = async () => {
    const email = getValues('email');
    if (email) {
      await onSendResetEmail({ email });
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
              {emailSent ? 'Check Your Email' : 'Reset Password'}
            </ThemedText>
            <ThemedText
              variant="body"
              size="small"
              style={[
                styles.subHeadingText,
                { color: theme.colors.textSecondary },
              ]}
            >
              {emailSent
                ? "We've sent a password reset link to your email. Follow the instructions to reset your password."
                : "Enter your email and we'll send you a link to reset your password."}
            </ThemedText>
          </View>

          <View style={styles.bottomContent}>
            <View style={styles.formContainer}>
              {!emailSent && (
                <>
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
                          submitBehavior="blurAndSubmit"
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

                  {/* Send Reset Link Button */}
                  <Button
                    mode="contained"
                    onPress={handleSubmit(onSendResetEmail)}
                    loading={loading}
                    disabled={loading}
                    style={[
                      styles.resetButton,
                      { backgroundColor: theme.colors.buttonPrimary },
                    ]}
                    labelStyle={[
                      styles.resetButtonLabel,
                      { color: theme.colors.buttonPrimaryText },
                    ]}
                    contentStyle={styles.buttonContent}
                  >
                    Send Reset Link
                  </Button>
                </>
              )}

              {emailSent && (
                <Button
                  mode="outlined"
                  onPress={onResendEmail}
                  loading={loading}
                  style={[
                    styles.resendButton,
                    {
                      borderColor: theme.colors.buttonOutlineBorder,
                      backgroundColor: theme.colors.primary,
                    },
                  ]}
                  labelStyle={[
                    styles.resendButtonLabel,
                    { color: theme.colors.white },
                  ]}
                >
                  Resend Email
                </Button>
              )}

              {/* Back to Sign In */}
              <TouchableOpacity
                onPress={() => navigation.navigate('SignIn')}
                style={styles.backButton}
              >
                <ThemedText
                  variant="body"
                  size="medium"
                  style={[
                    styles.backText,
                    { color: theme.colors.textSecondary },
                  ]}
                >
                  Back to{' '}
                  <ThemedText
                    variant="body"
                    size="medium"
                    style={[
                      styles.backLinkText,
                      { color: theme.colors.primary },
                    ]}
                  >
                    Sign In
                  </ThemedText>
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
    fontSize: theme.fontSizes['4xl'],
    textAlign: 'center',
    marginBottom: theme.spacing.md,
    letterSpacing: -0.5,
  },
  subHeadingText: {
    fontSize: theme.fontSizes.base,
    textAlign: 'center',
    lineHeight: theme.lineHeights.base,
    marginBottom: theme.spacing.xs,
    paddingHorizontal: theme.spacing.lg,
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
  resetButton: {
    marginBottom: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    height: 48,
  },
  resetButtonLabel: {
    fontSize: theme.fontSizes.sm,
    fontWeight: '600',
  },
  buttonContent: {
    height: 48,
  },
  resendButton: {
    marginBottom: theme.spacing.lg,
    borderRadius: theme.borderRadius.md,
    height: 48,
    borderWidth: 1,
  },
  resendButtonLabel: {
    fontSize: theme.fontSizes.sm,
    fontWeight: '500',
  },
  backButton: {
    marginTop: theme.spacing.md,
    alignItems: 'center',
  },
  backText: {
    fontSize: theme.fontSizes.sm,
  },
  backLinkText: {
    fontSize: theme.fontSizes.sm,
    textDecorationLine: 'underline',
    fontWeight: '500',
  },
});
