import LoadingScreen from '@/components/LoadingScreen';
import { useFonts } from '@/hooks/useFonts';
import RootNavigation from '@/navigation/RootNavigation';
import { AuthProvider } from '@/providers/AuthProvider';
import { StatusBar } from 'expo-status-bar';
import * as WebBrowser from 'expo-web-browser';
import { SafeAreaProvider } from 'react-native-safe-area-context';

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
  return (
    <SafeAreaProvider>
      <AppContent />
    </SafeAreaProvider>
  );
}
