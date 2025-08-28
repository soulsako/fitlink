import { MaterialIcons } from '@expo/vector-icons';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Alert, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Button, TextInput, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedBackground } from '@/components/ThemeBackground';
import BackButton from '@/components/ui/BackButton';
import ThemedText from '@/components/ui/ThemedText';
import { useAuth } from '@/providers/AuthProvider';
import { type SignInFormData, signInSchema } from '@/schemas/authSchemas';
import type { ExtendedTheme } from '@/styles/themes-styles';
import type { AuthStackScreenProps } from '@/types/navigation';
import { buildInputTheme } from '@/utils/paperInputTheme';

type Props = AuthStackScreenProps<'SignIn'>;

export default function SignInScreen({ navigation }: Props) {
  const theme = useTheme<ExtendedTheme>();
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
      <ThemedBackground
        lightImage={require('../../../assets/images/backgrounds/signin-light.png')}
        darkImage={require('../../../assets/images/backgrounds/signin-dark.png')}
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
                { color: theme.colors.onBackground },
              ]}
            >
              Sign in to your
            </ThemedText>
            <ThemedText
              variant="body"
              size="small"
              style={[
                styles.subHeadingText,
                { color: theme.colors.onBackground },
              ]}
            >
              Local Mind account
            </ThemedText>
          </View>

          <View style={styles.bottomContent}>
            <View style={styles.formContainer}>
              {/* Email */}
              <Controller
                control={control}
                name="email"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    mode="outlined"
                    label="Email"
                    value={value}
                    textContentType="emailAddress"
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
                    textColor={theme.colors.inputText}
                    placeholderTextColor={theme.colors.inputPlaceholder}
                  />
                )}
              />
              {errors.email && (
                <ThemedText
                  style={[styles.errorText, { color: theme.colors.inputError }]}
                >
                  {errors.email.message}
                </ThemedText>
              )}

              {/* Password */}
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
                    textColor={theme.colors.inputText}
                    placeholderTextColor={theme.colors.inputPlaceholder}
                  />
                )}
              />
              {errors.password && (
                <ThemedText
                  style={[styles.errorText, { color: theme.colors.inputError }]}
                >
                  {errors.password.message}
                </ThemedText>
              )}

              {/* Forgot password */}
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

              {/* Sign in button */}
              <Button
                mode="contained"
                onPress={handleSubmit(onSignIn)}
                loading={loading}
                disabled={loading || googleLoading}
                style={[
                  styles.signInButton,
                  { backgroundColor: theme.colors.tertiary },
                ]}
                labelStyle={[
                  styles.signInButtonLabel,
                  { color: theme.colors.onTertiary },
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
                    { backgroundColor: theme.colors.outline },
                  ]}
                />
                <ThemedText
                  style={[
                    styles.dividerText,
                    { color: theme.colors.onSurfaceVariant },
                  ]}
                >
                  or
                </ThemedText>
                <View
                  style={[
                    styles.dividerLine,
                    { backgroundColor: theme.colors.outline },
                  ]}
                />
              </View>

              {/* Google Button */}
              <Button
                mode="contained"
                onPress={onGoogleSignIn}
                loading={googleLoading}
                disabled={loading || googleLoading}
                icon={() => (
                  <MaterialIcons
                    name="login"
                    size={20}
                    color={theme.colors.socialGoogleIcon}
                  />
                )}
                style={[
                  styles.googleButton,
                  { backgroundColor: theme.colors.socialGoogleBg },
                ]}
                labelStyle={[
                  styles.googleButtonLabel,
                  { color: theme.colors.socialGoogleText },
                ]}
                contentStyle={styles.buttonContent}
              >
                Continue with Google
              </Button>
            </View>

            {/* Footer */}
            <View style={styles.footer}>
              <ThemedText
                variant="body"
                size="medium"
                style={[
                  styles.footerText,
                  { color: theme.colors.onBackground },
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
      </ThemedBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  safeArea: { flex: 1, justifyContent: 'center', alignItems: 'center' },
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
  },
  dividerText: {
    marginHorizontal: 16,
    fontSize: 14,
  },
  googleButton: {
    marginVertical: 8,
    borderRadius: 8,
    height: 48,
  },
  googleButtonLabel: {
    fontSize: 14,
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
