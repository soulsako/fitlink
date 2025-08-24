import { MaterialIcons } from '@expo/vector-icons';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Alert, ScrollView, StyleSheet, View } from 'react-native';
import {
  Button,
  Card,
  Divider,
  Text,
  TextInput,
  useTheme,
} from 'react-native-paper';

import { useAuth } from '../../providers/AuthProvider';
import { type SignUpFormData, signUpSchema } from '../../schemas/authSchemas';
import type { AuthStackScreenProps } from '../../types/navigation';

type Props = AuthStackScreenProps<'SignUp'>;

export default function SignUpScreen({ navigation }: Props) {
  const theme = useTheme();
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

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      <Card style={styles.card}>
        <Card.Content>
          <Text
            variant="titleLarge"
            style={[styles.title, { color: theme.colors.primary }]}
          >
            Join Local Mind
          </Text>
          <Text
            style={[styles.subtitle, { color: theme.colors.onSurfaceVariant }]}
          >
            Create your account to get started
          </Text>

          <View style={styles.form}>
            <Controller
              control={control}
              name="fullName"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  label="Full Name"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  error={!!errors.fullName}
                  autoCapitalize="words"
                  autoComplete="name"
                  left={<TextInput.Icon icon="account" />}
                  style={styles.input}
                />
              )}
            />
            {errors.fullName && (
              <Text style={[styles.errorText, { color: theme.colors.error }]}>
                {errors.fullName.message}
              </Text>
            )}

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
              <Text style={[styles.errorText, { color: theme.colors.error }]}>
                {errors.email.message}
              </Text>
            )}

            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  label="Password"
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
              <Text style={[styles.errorText, { color: theme.colors.error }]}>
                {errors.password.message}
              </Text>
            )}

            <Controller
              control={control}
              name="confirmPassword"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  label="Confirm Password"
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
              <Text style={[styles.errorText, { color: theme.colors.error }]}>
                {errors.confirmPassword.message}
              </Text>
            )}
            <Button
              mode="contained"
              onPress={handleSubmit(onSignUp)}
              loading={loading}
              disabled={loading || googleLoading}
              style={styles.signUpButton}
            >
              Create Account
            </Button>

            <Divider style={styles.divider} />

            <Button
              mode="outlined"
              onPress={onGoogleSignUp}
              loading={googleLoading}
              disabled={loading || googleLoading}
              icon={() => (
                <MaterialIcons
                  name="map"
                  size={20}
                  color={theme.colors.primary}
                />
              )}
              style={styles.googleButton}
            >
              Continue with Google
            </Button>

            <View style={styles.signInContainer}>
              <Text style={{ color: theme.colors.onSurfaceVariant }}>
                Already have an account?{' '}
              </Text>
              <Button
                mode="text"
                onPress={() => navigation.navigate('SignIn')}
                compact
              >
                Sign In
              </Button>
            </View>
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
  userTypeContainer: {
    marginVertical: 8,
  },
  userTypeLabel: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
  signUpButton: {
    marginTop: 8,
    paddingVertical: 8,
  },
  divider: {
    marginVertical: 16,
  },
  googleButton: {
    paddingVertical: 8,
  },
  signInContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
});
