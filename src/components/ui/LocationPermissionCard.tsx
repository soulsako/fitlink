import { MaterialIcons } from '@expo/vector-icons';
import type React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';

interface LocationPermissionCardProps {
  title: string;
  description: string;
  onPress?: () => void;
}

const LocationPermissionCard: React.FC<LocationPermissionCardProps> = ({
  title,
  description,
  onPress,
}) => {
  const theme = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.surface }]}>
      <View style={styles.iconContainer}>
        <MaterialIcons
          name="location-on"
          size={48}
          color={theme.colors.primary}
        />
        <View style={styles.animatedCircle}>
          <MaterialIcons
            name="my-location"
            size={24}
            color={theme.colors.primary}
          />
        </View>
      </View>

      <Text style={[styles.title, { color: theme.colors.onSurface }]}>
        {title}
      </Text>

      <Text
        style={[styles.description, { color: theme.colors.onSurfaceVariant }]}
      >
        {description}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 24,
    borderRadius: 16,
    marginVertical: 16,
  },
  iconContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  animatedCircle: {
    position: 'absolute',
    top: 12,
    left: 12,
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  },
});

export default LocationPermissionCard;
