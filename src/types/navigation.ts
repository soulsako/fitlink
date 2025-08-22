// src/types/navigation.ts
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs'
import type { NativeStackScreenProps } from '@react-navigation/native-stack'

// Auth Stack - Updated for LocalMind onboarding flow
export type AuthStackParamList = {
  Welcome: undefined
  SignIn: undefined
  SignUp: undefined
  ForgotPassword: undefined
  ResetPassword: { token?: string }
  LocationPermission: undefined
  AddressConfirmation: { coordinates?: { latitude: number; longitude: number } }
  PhoneVerification: undefined
  CodeVerification: { phoneNumber: string }
}

// Main Tab Stack - Updated for LocalMind features
export type MainTabParamList = {
  Home: undefined
  Services: undefined
  Messages: undefined
  Profile: undefined
}

// Root Stack
export type RootStackParamList = {
  Auth: undefined
  Main: undefined
}

// Screen Props
export type AuthStackScreenProps<T extends keyof AuthStackParamList> =
  NativeStackScreenProps<AuthStackParamList, T>

export type MainTabScreenProps<T extends keyof MainTabParamList> =
  BottomTabScreenProps<MainTabParamList, T>

export type RootStackScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
