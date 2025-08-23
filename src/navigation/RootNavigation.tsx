// src/navigation/RootNavigation.tsx
import { MaterialIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoadingScreen from '../components/LoadingScreen';
import { useAuth } from '../providers/AuthProvider';
import { useTheme } from '../providers/ThemeProvider';
import ForgotPasswordScreen from '../screens/auth/ForgotPasswordScreen';
import ResetPasswordScreen from '../screens/auth/ResetPasswordScreen';
import SignInScreen from '../screens/auth/SignInScreen';
import SignUpScreen from '../screens/auth/SignUpScreen';
// Main Screens
import MessagesScreen from '../screens/MessagesScreen/MessagesScreen';
import AddressConfirmationScreen from '../screens/onboarding/AddressConfirmationScreen';
// Auth Screens
import WelcomeScreen from '../screens/onboarding/WelcomeScreen';

import type {
  AuthStackParamList,
  MainTabParamList,
  RootStackParamList,
} from '../types/navigation';

const AuthStack = createNativeStackNavigator<AuthStackParamList>();
const MainTab = createBottomTabNavigator<MainTabParamList>();
const RootStack = createNativeStackNavigator<RootStackParamList>();

function AuthNavigator() {
  return (
    <AuthStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Welcome"
    >
      <AuthStack.Screen name="Welcome" component={WelcomeScreen} />
      <AuthStack.Screen name="SignIn" component={SignInScreen} />
      <AuthStack.Screen name="SignUp" component={SignUpScreen} />
      <AuthStack.Screen
        name="ForgotPassword"
        component={ForgotPasswordScreen}
      />
      <AuthStack.Screen name="ResetPassword" component={ResetPasswordScreen} />
      {/* <AuthStack.Screen
        name="LocationPermission"
        component={LocationPermissionScreen}
      /> */}
      <AuthStack.Screen
        name="AddressConfirmation"
        component={AddressConfirmationScreen}
      />
      {/* <AuthStack.Screen
        name="PhoneVerification"
        component={PhoneVerificationScreen}
      /> */}
      {/* <AuthStack.Screen
        name="CodeVerification"
        component={CodeVerificationScreen}
      /> */}
    </AuthStack.Navigator>
  );
}

function MainNavigator() {
  const { theme } = useTheme();

  return (
    <MainTab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof MaterialIcons.glyphMap;

          switch (route.name) {
            case 'Home':
              iconName = 'home';
              break;
            case 'Services':
              iconName = 'location-city';
              break;
            case 'Messages':
              iconName = 'chat';
              break;
            case 'Profile':
              iconName = 'person';
              break;
            default:
              iconName = 'help';
          }

          return <MaterialIcons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.onSurfaceVariant,
        tabBarStyle: {
          backgroundColor: theme.colors.surface,
          borderTopColor: theme.colors.outline,
          paddingBottom: 6,
          paddingTop: 6,
          height: 60,
        },
        headerStyle: {
          backgroundColor: theme.colors.surface,
        },
        headerTitleStyle: {
          color: theme.colors.onSurface,
          fontFamily: 'Inter_600SemiBold',
        },
      })}
    >
      {/* <MainTab.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: 'Home' }}
      /> */}
      <MainTab.Screen
        name="Welcome"
        component={WelcomeScreen}
        options={{ title: 'Services' }}
      />
      <MainTab.Screen
        name="Messages"
        component={MessagesScreen}
        options={{ title: 'Messages' }}
      />
      {/* <MainTab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ title: 'Profile' }}
      /> */}
    </MainTab.Navigator>
  );
}

export default function RootNavigation() {
  const { session, loading } = useAuth();

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <NavigationContainer>
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        {!session ? (
          <RootStack.Screen name="Main" component={MainNavigator} />
        ) : (
          <RootStack.Screen name="Auth" component={AuthNavigator} />
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
