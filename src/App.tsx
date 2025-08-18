import React from 'react';
import { ThemeProvider } from './theme/ThemeContext';
import HomeScreen from './screens/HomeScreen/HomeScreen';

export default function App() {
  return (
    <ThemeProvider>
      <HomeScreen />
    </ThemeProvider>
  );
}
