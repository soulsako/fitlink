// import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';
import * as WebBrowser from 'expo-web-browser';
// import { useEffect } from 'react';
import LoadingScreen from '@/components/loading-screen';
import { useFonts } from '@/hooks/use-fonts';
import RootNavigation from '@/navigation/root-navigation';
import { AuthProvider } from '@/providers/auth-provider';
import { LogBox } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

LogBox.ignoreLogs([
  'RemoteTextInput', // filters out sessionID logs
  'TextInputUI',
]);

WebBrowser.maybeCompleteAuthSession(); // <-- only here

function AppContent() {
  const fontsLoaded = useFonts();

  if (!fontsLoaded) {
    return <LoadingScreen />;
  }

  return (
    <AuthProvider>
      <StatusBar style="light" />
      <RootNavigation />
    </AuthProvider>
  );
}

export default function App() {
  // useEffect(() => {
  //   const clearStorage = async () => {
  //     try {
  //       await AsyncStorage.clear();
  //       console.log('✅ AsyncStorage cleared completely');
  //     } catch (error) {
  //       console.error('❌ Failed to clear AsyncStorage', error);
  //     }
  //   };

  //   clearStorage();
  // }, []);
  return (
    <SafeAreaProvider>
      <AppContent />
    </SafeAreaProvider>
  );
}
