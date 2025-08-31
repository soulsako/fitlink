import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

// Auth Stack - Updated for LocalMind onboarding flow
export type AuthStackParamList = {
  Welcome: undefined;
  SignIn: undefined;
  SignUp: undefined;
  ForgotPassword: undefined;
  ResetPassword: { token?: string };
};

// Onboarding Stack - Separate stack for post-auth onboarding
export type OnboardingStackParamList = {
  LocationPermission: undefined;
  AddressConfirmation: {
    coordinates?: { latitude: number; longitude: number };
  };
};

// Main Tab Stack - Updated for LocalMind features
export type MainTabParamList = {
  Services: undefined;
  Messages: undefined;
  Profile: undefined;
};

// Root Stack - Updated to include onboarding flow
export type RootStackParamList = {
  Auth: undefined;
  LocationOnboarding: undefined;
  Services: undefined;
};

// Screen Props
export type AuthStackScreenProps<T extends keyof AuthStackParamList> =
  NativeStackScreenProps<AuthStackParamList, T>;

export type OnboardingStackScreenProps<
  T extends keyof OnboardingStackParamList,
> = NativeStackScreenProps<OnboardingStackParamList, T>;

export type MainTabScreenProps<T extends keyof MainTabParamList> =
  BottomTabScreenProps<MainTabParamList, T>;

export type RootStackScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
