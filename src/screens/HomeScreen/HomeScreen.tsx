import { Text, View } from 'react-native';
import { useTheme } from '../../theme/ThemeContext';
import { makeStyles } from './styles';

export default function HomeScreen() {
  const { theme } = useTheme();
  const styles = makeStyles(theme);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home</Text>
    </View>
  );
}
