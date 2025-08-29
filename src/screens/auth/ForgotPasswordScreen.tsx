import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  Alert,
  Dimensions,
  ImageBackground,
  Text as RNText,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');

import BackButton from '@/components/ui/BackButton';
import ThemedText from '@/components/ui/ThemedText';
import { useAuth } from '@/providers/AuthProvider';
import {
  type ForgotPasswordFormData,
  forgotPasswordSchema,
} from '@/schemas/authSchemas';
import { theme } from '@/styles/theme';
import type { AuthStackScreenProps } from '@/types/navigation';
import { buildInputTheme } from '@/utils/paperInputTheme';

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

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../../assets/images/backgrounds/forgotpassword-light.png')}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <View style={styles.overlay} />
        <SafeAreaView style={styles.safeArea}>
          <BackButton fallbackRoute="Welcome" />
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
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
                  ? `We've sent a password reset link to your email. Follow the instructions to reset your password.`
                  : `Enter your email and we'll send you a link to reset your password.`}
              </ThemedText>
            </View>

            <View style={styles.bottomContent}>
              <View style={styles.formContainer}>
                {!emailSent && (
                  <>
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
                            left={
                              <TextInput.Icon
                                icon="email"
                                color={theme.colors.iconSecondary}
                              />
                            }
                            style={styles.input}
                            theme={buildInputTheme(theme)}
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
                        backgroundColor: theme.colors.buttonOutline,
                      },
                    ]}
                    labelStyle={[
                      styles.resendButtonLabel,
                      { color: theme.colors.buttonOutlineText },
                    ]}
                  >
                    Resend Email
                  </Button>
                )}

                <Button
                  mode="text"
                  onPress={() => navigation.navigate('SignIn')}
                  style={styles.backButton}
                  labelStyle={[
                    styles.backButtonLabel,
                    { color: theme.colors.textSecondary },
                  ]}
                >
                  <RNText
                    style={[
                      styles.backInlineText,
                      { color: theme.colors.textSecondary },
                    ]}
                  >
                    Back to{' '}
                  </RNText>
                  <RNText
                    style={[
                      styles.backLinkText,
                      { color: theme.colors.primary },
                    ]}
                  >
                    Sign In
                  </RNText>
                </Button>
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      </ImageBackground>
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
    width,
    height,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  safeArea: {
    flex: 1,
    paddingHorizontal: theme.spacing.md,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerContent: {
    marginBottom: theme.spacing.lg,
    paddingHorizontal: theme.spacing['2xl'],
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
    marginBottom: theme.spacing.lg,
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
  buttonContent: {
    height: 48,
  },
  backButton: {
    marginTop: theme.spacing.md,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  backButtonLabel: {
    fontSize: theme.fontSizes.sm,
  },
  backInlineText: {
    fontSize: theme.fontSizes.sm,
  },
  backLinkText: {
    fontSize: theme.fontSizes.sm,
    textDecorationLine: 'underline',
    fontWeight: '500',
  },
});
