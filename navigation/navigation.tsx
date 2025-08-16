import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { useAuth } from '../providers/AuthProvider';
import HomeScreen from '../screens/HomeScreen';
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';

const Stack = createNativeStackNavigator();

export default function RootNav() {
  const { session } = useAuth();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {session === null ? (
          <>
            <Stack.Screen
              name="SignIn"
              component={SignInScreen}
              options={{ title: 'Sign In' }}
            />
            <Stack.Screen
              name="SignUp"
              component={SignUpScreen}
              options={{ title: 'Sign Up' }}
            />
          </>
        ) : (
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ title: 'Home' }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
