import ServicesScreen from '@/screens/services-screen/services-screen';
import { theme } from '@/styles/theme';
import { MaterialIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoadingScreen from '../components/loading-screen';
import { useAuth } from '../providers/auth-provider';
import ForgotPasswordScreen from '../screens/auth/forgot-password';
import ResetPasswordScreen from '../screens/auth/reset-password';
import SignInScreen from '../screens/auth/signin';
import SignUpScreen from '../screens/auth/signup';
import MessagesScreen from '../screens/message/message';
import AddressConfirmationScreen from '../screens/onboarding/address-confirmation';
import LocationPermissionScreen from '../screens/onboarding/location-permission';
import WelcomeScreen from '../screens/onboarding/welcome';
import type {
  AuthStackParamList,
  MainTabParamList,
  RootStackParamList,
} from '../types/navigation';

const AuthStack = createNativeStackNavigator<AuthStackParamList>();
const MainTab = createBottomTabNavigator<MainTabParamList>();
const RootStack = createNativeStackNavigator<RootStackParamList>();
const OnboardingStack = createNativeStackNavigator<{
  LocationPermission: undefined;
  AddressConfirmation: {
    coordinates?: { latitude: number; longitude: number };
  };
}>();

function AuthNavigator() {
  return (
    <AuthStack.Navigator
      screenOptions={{ headerShown: false }}
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
    </AuthStack.Navigator>
  );
}

function OnboardingNavigator() {
  return (
    <OnboardingStack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="LocationPermission"
    >
      <OnboardingStack.Screen
        name="LocationPermission"
        component={LocationPermissionScreen}
      />
      <OnboardingStack.Screen
        name="AddressConfirmation"
        component={AddressConfirmationScreen}
      />
    </OnboardingStack.Navigator>
  );
}

function MainNavigator() {
  return (
    <MainTab.Navigator
      initialRouteName="Services"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName: keyof typeof MaterialIcons.glyphMap;
          switch (route.name) {
            case 'Services':
              iconName = 'location-city';
              break;
            case 'Messages':
              iconName = 'chat';
              break;
            default:
              iconName = 'help';
          }
          return <MaterialIcons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: theme.colors.navActive,
        tabBarInactiveTintColor: theme.colors.navInactive,
        tabBarStyle: {
          backgroundColor: theme.colors.navBackground,
          borderTopColor: theme.colors.navBorder,
          borderTopWidth: 1,
          paddingBottom: theme.spacing.sm,
          paddingTop: theme.spacing.sm,
          height: 70,
          elevation: theme.elevation.level2,
          shadowColor: theme.colors.cardShadow,
          shadowOffset: {
            width: 0,
            height: -2,
          },
          shadowOpacity: 0.1,
          shadowRadius: 3,
        },
        tabBarLabelStyle: {
          fontSize: theme.fontSizes.xs,
          fontFamily: theme.fonts.medium,
          marginTop: theme.spacing.xs,
        },
        headerStyle: {
          backgroundColor: theme.colors.navBackground,
          borderBottomColor: theme.colors.navBorder,
          borderBottomWidth: 1,
          elevation: theme.elevation.level1,
          shadowColor: theme.colors.cardShadow,
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.05,
          shadowRadius: 2,
        },
        headerTitleStyle: {
          color: theme.colors.textPrimary,
          fontFamily: theme.fonts.semiBold,
          fontSize: theme.fontSizes.lg,
        },
        headerTintColor: theme.colors.textPrimary,
      })}
    >
      <MainTab.Screen
        name="Services"
        component={ServicesScreen}
        options={{
          title: 'Services',
          headerTitle: 'Local Services',
        }}
      />
      <MainTab.Screen
        name="Messages"
        component={MessagesScreen}
        options={{
          title: 'Messages',
          headerTitle: 'Messages',
        }}
      />
    </MainTab.Navigator>
  );
}

export default function RootNavigation() {
  const { session, userProfile, loading } = useAuth();

  // Show loading screen while auth state is being determined
  if (loading) {
    return <LoadingScreen />;
  }

  // Determine if user needs location onboarding
  const needsLocationOnboarding =
    session && userProfile && !userProfile.location;

  return (
    <NavigationContainer
      theme={{
        dark: false,
        colors: {
          primary: theme.colors.primary,
          background: theme.colors.background,
          card: theme.colors.cardBackground,
          text: theme.colors.textPrimary,
          border: theme.colors.divider,
          notification: theme.colors.accent,
        },
        fonts: {
          regular: {
            fontFamily: theme.fonts.regular,
            fontWeight: '400',
          },
          medium: {
            fontFamily: theme.fonts.medium,
            fontWeight: '500',
          },
          bold: {
            fontFamily: theme.fonts.bold,
            fontWeight: '700',
          },
          heavy: {
            fontFamily: theme.fonts.bold,
            fontWeight: '800',
          },
        },
      }}
    >
      <RootStack.Navigator
        key={
          session
            ? needsLocationOnboarding
              ? 'location-onboarding'
              : 'main'
            : 'auth'
        }
        screenOptions={{ headerShown: false }}
      >
        {!session ? (
          // User not authenticated - show auth flow
          <RootStack.Screen name="Auth" component={AuthNavigator} />
        ) : needsLocationOnboarding ? (
          // User authenticated but needs location setup
          <RootStack.Screen
            name="LocationOnboarding"
            component={OnboardingNavigator}
          />
        ) : (
          // User authenticated and has location - show main app
          <RootStack.Screen name="Main" component={MainNavigator} />
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
