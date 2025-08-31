import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, TouchableOpacity } from 'react-native';

type Props = {
  fallbackRoute?: string; // optional, e.g. "Welcome"
  color?: string;
};

export default function BackButton({
  fallbackRoute,
  color = '#FFFFFF',
}: Props) {
  const navigation = useNavigation();

  const handlePress = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else if (fallbackRoute) {
      navigation.navigate(fallbackRoute as never);
    }
  };

  return (
    <TouchableOpacity style={styles.backButton} onPress={handlePress}>
      <MaterialIcons name="arrow-back" size={24} color={color} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  backButton: {
    position: 'absolute',
    top: 55,
    left: 25,
    zIndex: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 24,
    padding: 6,
  },
});
