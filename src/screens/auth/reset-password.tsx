import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  Alert,
  Dimensions,
  ImageBackground,
  Keyboard,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');

import BackButton from '@/components/ui/back-button';
import ThemedText from '@/components/ui/themed-text';
import { useAuth } from '@/providers/auth-provider';
import {
  type ResetPasswordFormData,
  resetPasswordSchema,
} from '@/schemas/auth-schemas';
import { theme } from '@/styles/theme';
import type { AuthStackScreenProps } from '@/types/navigation';
import { buildInputTheme } from '@/utils/paper-input-theme';

type Props = AuthStackScreenProps<'ResetPassword'>;

export default function ResetPasswordScreen({ navigation }: Props) {
  const { resetPassword } = useAuth();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  const onResetPassword = async (data: ResetPasswordFormData) => {
    setLoading(true);
    try {
      const error = await resetPassword(data.password);
      if (error) {
        Alert.alert('Reset Failed', error.message);
      } else {
        Alert.alert(
          'Password Reset Successfully',
          'Your password has been reset. You can now sign in with your new password.',
          [{ text: 'OK', onPress: () => navigation.navigate('SignIn') }],
        );
      }
    } catch {
      Alert.alert('Error', 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../../assets/images/backgrounds/welcome-light.png')}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <View style={styles.overlay} />
        <SafeAreaView style={styles.safeArea}>
          <BackButton />
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
                Set New Password
              </ThemedText>
              <ThemedText
                variant="body"
                size="small"
                style={[
                  styles.subHeadingText,
                  { color: theme.colors.textSecondary },
                ]}
              >
                Enter your new password below
              </ThemedText>
            </View>

            <View style={styles.bottomContent}>
              <View style={styles.formContainer}>
                {/* Password */}
                <Controller
                  control={control}
                  name="password"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <View style={styles.inputContainer}>
                      <TextInput
                        mode="outlined"
                        label="New Password"
                        value={value}
                        onChangeText={onChange}
                        onBlur={onBlur}
                        error={!!errors.password}
                        secureTextEntry={!showPassword}
                        returnKeyType="done"
                        submitBehavior="blurAndSubmit"
                        multiline={false}
                        onSubmitEditing={() => Keyboard.dismiss()}
                        autoComplete="new-password"
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
                        theme={buildInputTheme(theme)}
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

                {/* Confirm Password */}
                <Controller
                  control={control}
                  name="confirmPassword"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <View style={styles.inputContainer}>
                      <TextInput
                        mode="outlined"
                        label="Confirm New Password"
                        value={value}
                        onChangeText={onChange}
                        onBlur={onBlur}
                        error={!!errors.confirmPassword}
                        secureTextEntry={!showConfirmPassword}
                        autoComplete="new-password"
                        returnKeyType="done"
                        submitBehavior="blurAndSubmit"
                        multiline={false}
                        onSubmitEditing={() => Keyboard.dismiss()}
                        left={
                          <TextInput.Icon
                            icon="lock-check"
                            color={theme.colors.iconSecondary}
                          />
                        }
                        right={
                          <TextInput.Icon
                            icon={showConfirmPassword ? 'eye-off' : 'eye'}
                            color={theme.colors.iconSecondary}
                            onPress={() =>
                              setShowConfirmPassword(!showConfirmPassword)
                            }
                          />
                        }
                        style={styles.input}
                        theme={buildInputTheme(theme)}
                        textColor={theme.colors.inputText}
                        placeholderTextColor={theme.colors.inputPlaceholder}
                        outlineStyle={[
                          styles.inputOutline,
                          errors.confirmPassword && {
                            borderColor: theme.colors.inputBorderError,
                          },
                        ]}
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

                {/* Reset Button */}
                <Button
                  mode="contained"
                  onPress={handleSubmit(onResetPassword)}
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
                  Reset Password
                </Button>
              </View>

              {/* Footer */}
              <View style={styles.footer}>
                <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
                  <ThemedText
                    variant="body"
                    size="medium"
                    style={[
                      styles.backButtonText,
                      { color: theme.colors.primary },
                    ]}
                  >
                    Back to Sign In
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
    alignItems: 'center',
  },
  headingText: {
    fontSize: theme.fontSizes.xl4,
    lineHeight: theme.lineHeights.xl4,
    textAlign: 'center',
    marginBottom: theme.spacing.md,
    letterSpacing: -0.5,
  },
  subHeadingText: {
    fontSize: theme.fontSizes.base,
    lineHeight: theme.lineHeights.base,
    textAlign: 'center',
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
  resetButton: {
    marginTop: theme.spacing.md,
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
  footer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: theme.spacing.md,
  },
  backButtonText: {
    fontSize: theme.fontSizes.sm,
    textDecorationLine: 'underline',
    fontWeight: '500',
  },
});
