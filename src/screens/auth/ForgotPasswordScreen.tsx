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
  type ForgotPasswordFormData,
  forgotPasswordSchema,
} from '../../schemas/authSchemas';
import type { AuthStackScreenProps } from '../../types/navigation';

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

  if (emailSent) {
    return (
      <ScrollView
        style={[styles.container, { backgroundColor: theme.colors.background }]}
        contentContainerStyle={styles.contentContainer}
      >
        <Card style={styles.card}>
          <Card.Content>
            <View style={styles.successContainer}>
              <Title style={[styles.title, { color: theme.colors.primary }]}>
                Check Your Email
              </Title>
              <Paragraph
                style={[
                  styles.subtitle,
                  { color: theme.colors.onSurfaceVariant },
                ]}
              >
                We've sent a password reset link to your email address. Please
                check your email and follow the instructions to reset your
                password.
              </Paragraph>

              <Button
                mode="outlined"
                onPress={onResendEmail}
                loading={loading}
                style={styles.resendButton}
              >
                Resend Email
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

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      contentContainerStyle={styles.contentContainer}
    >
      <Card style={styles.card}>
        <Card.Content>
          <Title style={[styles.title, { color: theme.colors.primary }]}>
            Reset Password
          </Title>
          <Paragraph
            style={[styles.subtitle, { color: theme.colors.onSurfaceVariant }]}
          >
            Enter your email address and we'll send you a link to reset your
            password.
          </Paragraph>

          <View style={styles.form}>
            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
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
                />
              )}
            />
            {errors.email && (
              <Paragraph
                style={[styles.errorText, { color: theme.colors.error }]}
              >
                {errors.email.message}
              </Paragraph>
            )}

            <Button
              mode="contained"
              onPress={handleSubmit(onSendResetEmail)}
              loading={loading}
              disabled={loading}
              style={styles.resetButton}
            >
              Send Reset Link
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
    lineHeight: 24,
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
  successContainer: {
    alignItems: 'center',
    gap: 16,
  },
  resendButton: {
    marginTop: 16,
    paddingVertical: 8,
  },
});
