import { StatusBar } from 'expo-status-bar';
import { PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import LoadingScreen from './components/LoadingScreen';
import { useFonts } from './hooks/useFonts';
import RootNavigation from './navigation/RootNavigation';
import { AuthProvider } from './providers/AuthProvider';
import { ThemeProvider, useTheme } from './providers/ThemeProvider';

function AppContent() {
  const { theme } = useTheme();
  const fontsLoaded = useFonts();

  if (!fontsLoaded) {
    return <LoadingScreen />;
  }

  return (
    <PaperProvider theme={theme}>
      <AuthProvider>
        <StatusBar style={theme.dark ? 'light' : 'dark'} />
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
