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
import { Button, TextInput, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');

import BackButton from '@/components/ui/BackButton';
import ThemedText from '@/components/ui/ThemedText';
import { useAuth } from '@/providers/AuthProvider';
import {
  type ForgotPasswordFormData,
  forgotPasswordSchema,
} from '@/schemas/authSchemas';
import type { AuthStackScreenProps } from '@/types/navigation';
import { buildInputTheme } from '@/utils/paperInputTheme';

type Props = AuthStackScreenProps<'ForgotPassword'>;

export default function ForgotPasswordScreen({ navigation }: Props) {
  const theme = useTheme();
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
        source={require('../../../assets/images/backgrounds/forgotpassword.png')}
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
                style={styles.headingText}
                weight="bold"
              >
                {emailSent ? 'Check Your Email' : 'Reset Password'}
              </ThemedText>

              <ThemedText
                variant="body"
                size="small"
                style={styles.subHeadingText}
              >
                {emailSent
                  ? 'We’ve sent a password reset link to your email. Follow the instructions to reset your password.'
                  : "Enter your email and we'll send you a link to reset your password."}
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
                          theme={buildInputTheme(theme, { roundness: 8 })}
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

                    <Button
                      mode="contained"
                      onPress={handleSubmit(onSendResetEmail)}
                      loading={loading}
                      disabled={loading}
                      style={[
                        styles.resetButton,
                        { backgroundColor: theme.colors.tertiary },
                      ]}
                      labelStyle={styles.resetButtonLabel}
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
                      { backgroundColor: theme.colors.tertiary },
                    ]}
                    labelStyle={styles.resendButtonLabel}
                  >
                    Resend Email
                  </Button>
                )}

                <Button
                  mode="text"
                  onPress={() => navigation.navigate('SignIn')}
                  style={styles.backButton}
                  labelStyle={styles.backButtonLabel}
                >
                  <RNText style={styles.backInlineText}>Back to </RNText>
                  <RNText style={styles.backLinkText}>Sign In</RNText>
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
    paddingHorizontal: 40,
  },
  headingText: {
    fontSize: 36,
    textAlign: 'center',
    marginBottom: 15,
    color: '#000000',
  },
  subHeadingText: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
    color: '#000000',
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
  resetButton: {
    marginVertical: 8,
    borderRadius: 8,
    height: 48,
  },
  resetButtonLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  resendButton: {
    marginTop: 16,
    borderRadius: 8,
    height: 48,
    borderWidth: 1,
  },
  resendButtonLabel: {
    fontSize: 14,
    color: '#000000',
  },
  buttonContent: {
    height: 48,
    paddingVertical: 0,
  },
  backButton: {
    marginTop: 8,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  backButtonLabel: {
    fontSize: 14,
  },
  backInlineText: {
    fontSize: 14,
    color: '#000000',
  },
  backLinkText: {
    fontSize: 14,
    textDecorationLine: 'underline',
    color: '#000000',
  },
});
