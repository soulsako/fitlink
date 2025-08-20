import HomeScreen from './screens/HomeScreen/HomeScreen'
import { ThemeProvider } from './theme/ThemeContext'

export default function App() {
  return (
    <ThemeProvider>
      <HomeScreen />
    </ThemeProvider>
  )
}
