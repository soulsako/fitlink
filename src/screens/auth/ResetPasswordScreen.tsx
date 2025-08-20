import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Alert, ScrollView, StyleSheet, View } from 'react-native';
import {
  Button,
  Card,
  Paragraph,
  TextInput,
  Title,
  useTheme,
} from 'react-native-paper';

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
    <ScrollView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      contentContainerStyle={styles.contentContainer}
    >
      <Card style={styles.card}>
        <Card.Content>
          <Title style={[styles.title, { color: theme.colors.primary }]}>
            Set New Password
          </Title>
          <Paragraph
            style={[styles.subtitle, { color: theme.colors.onSurfaceVariant }]}
          >
            Enter your new password below
          </Paragraph>

          <View style={styles.form}>
            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
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
                />
              )}
            />
            {errors.password && (
              <Paragraph
                style={[styles.errorText, { color: theme.colors.error }]}
              >
                {errors.password.message}
              </Paragraph>
            )}

            <Controller
              control={control}
              name="confirmPassword"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
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
                />
              )}
            />
            {errors.confirmPassword && (
              <Paragraph
                style={[styles.errorText, { color: theme.colors.error }]}
              >
                {errors.confirmPassword.message}
              </Paragraph>
            )}

            <Button
              mode="contained"
              onPress={handleSubmit(onResetPassword)}
              loading={loading}
              disabled={loading}
              style={styles.resetButton}
            >
              Reset Password
            </Button>

            <Button
              mode="text"
              onPress={() => navigation.navigate('SignIn')}
              style={styles.backButton}
            >
              Back to Sign In
            </Button>
          </View>
        </Card.Content>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  card: {
    elevation: 4,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 32,
  },
  form: {
    gap: 16,
  },
  input: {
    backgroundColor: 'transparent',
  },
  errorText: {
    fontSize: 12,
    marginTop: -12,
    marginLeft: 12,
  },
  resetButton: {
    marginTop: 8,
    paddingVertical: 8,
  },
  backButton: {
    marginTop: 8,
  },
});
