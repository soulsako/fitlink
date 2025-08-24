// App.tsx  (REPLACE ENTIRE FILE)

import { StatusBar } from 'expo-status-bar';
import * as WebBrowser from 'expo-web-browser';
import { PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import LoadingScreen from './components/LoadingScreen';
import { useFonts } from './hooks/useFonts';
import RootNavigation from './navigation/RootNavigation';
import { AuthProvider } from './providers/AuthProvider';
import { ThemeProvider, useTheme } from './providers/ThemeProvider';

WebBrowser.maybeCompleteAuthSession(); // <-- only here

function AppContent() {
  const { theme, isDark } = useTheme();
  const fontsLoaded = useFonts();

  if (!fontsLoaded) {
    return <LoadingScreen />;
  }

  return (
    <PaperProvider theme={theme}>
      <AuthProvider>
        <StatusBar style={isDark ? 'light' : 'dark'} />
        <RootNavigation />
      </AuthProvider>
    </PaperProvider>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
