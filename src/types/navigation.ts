import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs'
import type { NativeStackScreenProps } from '@react-navigation/native-stack'

// Auth Stack
export type AuthStackParamList = {
  SignIn: undefined
  SignUp: undefined
  ForgotPassword: undefined
  ResetPassword: { token?: string }
}

// Main Tab Stack
export type MainTabParamList = {
  Home: undefined
  Explore: undefined
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
