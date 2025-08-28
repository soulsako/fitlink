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

import BackButton from '@/components/ui/BackButton';
import ThemedText from '@/components/ui/ThemedText';
import {
  colors as appColors,
  fontSizes,
  fonts,
  lineHeights,
} from '@/styles/themes-styles';
import { buildInputTheme } from '@/utils/paperInputTheme';
import { useAuth } from '../../providers/AuthProvider';
import {
  type ResetPasswordFormData,
  resetPasswordSchema,
} from '../../schemas/authSchemas';
import type { AuthStackScreenProps } from '../../types/navigation';

type Props = AuthStackScreenProps<'ResetPassword'>;

export default function ResetPasswordScreen({ navigation }: Props) {
  const theme = useTheme();
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

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../../assets/images/backgrounds/resetpassword.png')}
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
              <ThemedText style={styles.headingText}>
                Set New Password
              </ThemedText>
              <ThemedText style={styles.subHeadingText}>
                Enter your new password below
              </ThemedText>
            </View>

            <View style={styles.bottomContent}>
              <View style={styles.formContainer}>
                <Controller
                  control={control}
                  name="password"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      mode="outlined"
                      label="New Password"
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
                      theme={buildInputTheme(theme, { roundness: 8 })}
                      textColor={theme.colors.onSurface}
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
                      label="Confirm New Password"
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
                      theme={buildInputTheme(theme, { roundness: 8 })}
                      textColor={theme.colors.onSurface}
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
                  onPress={handleSubmit(onResetPassword)}
                  loading={loading}
                  disabled={loading}
                  style={[
                    styles.resetButton,
                    { backgroundColor: theme.colors.tertiary },
                  ]}
                  labelStyle={styles.resetButtonLabel}
                  contentStyle={styles.buttonContent}
                >
                  Reset Password
                </Button>
              </View>

              <View style={styles.footer}>
                <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
                  <ThemedText style={styles.backButtonText}>
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
    fontSize: fontSizes['5xl'],
    lineHeight: lineHeights['5xl'],
    fontFamily: fonts.bold,
    textAlign: 'center',
    marginBottom: 15,
    color: appColors.light.onSurface,
  },
  subHeadingText: {
    fontSize: fontSizes.base,
    lineHeight: lineHeights.base,
    fontFamily: fonts.regular,
    textAlign: 'center',
    color: appColors.light.onSurface,
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
    fontSize: fontSizes.xs,
    color: appColors.light.error,
    marginTop: 4,
    marginLeft: 12,
    fontFamily: fonts.regular,
  },
  resetButton: {
    marginVertical: 8,
    borderRadius: 8,
    height: 48,
  },
  resetButtonLabel: {
    fontSize: fontSizes.sm,
    fontWeight: 'bold',
    color: appColors.light.onTertiary,
    fontFamily: fonts.bold,
  },
  buttonContent: {
    height: 48,
    paddingVertical: 0,
  },
  footer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButtonText: {
    fontSize: fontSizes.sm,
    textDecorationLine: 'underline',
    color: appColors.light.onPrimary,
    fontFamily: fonts.medium,
  },
});
