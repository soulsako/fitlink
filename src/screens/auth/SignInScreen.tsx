import { MaterialIcons } from '@expo/vector-icons';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Alert, ScrollView, StyleSheet, View } from 'react-native';
import {
  Button,
  Card,
  Divider,
  Paragraph,
  TextInput,
  Title,
  useTheme,
} from 'react-native-paper';

import { useAuth } from '../../providers/AuthProvider';
import { type SignInFormData, signInSchema } from '../../schemas/authSchemas';
import type { AuthStackScreenProps } from '../../types/navigation';

type Props = AuthStackScreenProps<'SignIn'>;

export default function SignInScreen({ navigation }: Props) {
  const theme = useTheme();
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
    <ScrollView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      <Card style={styles.card}>
        <Card.Content>
          <Title style={[styles.title, { color: theme.colors.primary }]}>
            Welcome Back
          </Title>
          <Paragraph
            style={[styles.subtitle, { color: theme.colors.onSurfaceVariant }]}
          >
            Sign in to your FitLink account
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
                  autoComplete="password"
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

            <Button
              mode="text"
              onPress={() => navigation.navigate('ForgotPassword')}
              style={styles.forgotPassword}
            >
              Forgot Password?
            </Button>

            <Button
              mode="contained"
              onPress={handleSubmit(onSignIn)}
              loading={loading}
              disabled={loading || googleLoading}
              style={styles.signInButton}
            >
              Sign In
            </Button>

            <Divider style={styles.divider} />

            <Button
              mode="outlined"
              onPress={onGoogleSignIn}
              loading={googleLoading}
              disabled={loading || googleLoading}
              icon={() => (
                <MaterialIcons
                  name="login"
                  size={20}
                  color={theme.colors.primary}
                />
              )}
              style={styles.googleButton}
            >
              Continue with Google
            </Button>

            <View style={styles.signUpContainer}>
              <Paragraph style={{ color: theme.colors.onSurfaceVariant }}>
                Don't have an account?{' '}
              </Paragraph>
              <Button
                mode="text"
                onPress={() => navigation.navigate('SignUp')}
                compact
              >
                Sign Up
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
  forgotPassword: {
    alignSelf: 'flex-end',
    marginTop: -8,
  },
  signInButton: {
    marginTop: 8,
    paddingVertical: 8,
  },
  divider: {
    marginVertical: 16,
  },
  googleButton: {
    paddingVertical: 8,
  },
  signUpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
});
