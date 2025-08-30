import PrimaryButton from '@/components/ui/PrimaryButton';
import ProgressIndicator from '@/components/ui/ProgressIndicator';
import ThemedText from '@/components/ui/ThemedText';
import { useAuth } from '@/providers/AuthProvider';
import { theme } from '@/styles/theme';
import { MaterialIcons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import type React from 'react';
import { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { OnboardingStackScreenProps } from '../../types/navigation';

type LocationPermissionScreenProps =
  OnboardingStackScreenProps<'LocationPermission'>;

const LocationPermissionScreen: React.FC<LocationPermissionScreenProps> = ({
  navigation,
}) => {
  const { storeUserLocation } = useAuth();
  const [requesting, setRequesting] = useState(false);

  const requestLocationPermission = async () => {
    try {
      setRequesting(true);

      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status === 'granted') {
        const location = await Location.getCurrentPositionAsync({});

        // Store location in Supabase
        const coordinates = {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        };

        const error = await storeUserLocation(coordinates);

        if (error) {
          console.error('Failed to store location:', error);
          // Continue anyway - location storage is not critical for onboarding
          Alert.alert(
            'Location Stored Locally',
            "We couldn't sync your location to our servers, but we'll use it for this session.",
          );
        }

        // Navigate to next screen with coordinates
        navigation.navigate('AddressConfirmation', {
          coordinates,
        });
      } else {
        Alert.alert(
          'Location Access Required',
          'LocalMind needs location access to provide accurate local government information. You can enable this in Settings.',
          [
            { text: 'Cancel', style: 'cancel' },
            {
              text: 'Skip for now',
              onPress: () => navigation.navigate('AddressConfirmation', {}),
            },
          ],
        );
      }
    } catch (error) {
      console.error('Location permission error:', error);
      Alert.alert('Error', 'Unable to get location. Please try again.');
    } finally {
      setRequesting(false);
    }
  };

  const skipLocationAccess = () => {
    navigation.navigate('AddressConfirmation', {});
  };

  return (
    <SafeAreaView style={styles.container}>
      <ProgressIndicator currentStep={1} totalSteps={3} />
      <View style={styles.content}>
        <View style={styles.textContainer}>
          <ThemedText
            variant="headline"
            size="large"
            weight="bold"
            style={[styles.title, { color: theme.colors.textPrimary }]}
          >
            Turn On Location for Smarter Results
          </ThemedText>
          <ThemedText
            variant="body"
            size="medium"
            style={[styles.subtitle, { color: theme.colors.textSecondary }]}
          >
            By sharing your location, LocalMind's AI can give you the most
            accurate, local information and suggestions tailored to your area.
          </ThemedText>
        </View>

        <View style={styles.iconContainer}>
          <MaterialIcons
            name="location-on"
            size={150}
            color={theme.colors.primary}
          />
        </View>

        <View style={styles.buttonContainer}>
          <PrimaryButton
            title="Continue"
            onPress={requestLocationPermission}
            loading={requesting}
            style={styles.primaryButton}
          />

          <PrimaryButton
            title="Enter address manually"
            onPress={skipLocationAccess}
            mode="text"
            style={styles.skipButton}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LocationPermissionScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  content: {
    flex: 1,
    paddingHorizontal: theme.spacing.lg,
    justifyContent: 'space-around',
  },
  textContainer: {
    marginTop: theme.spacing.xl,
  },
  title: {
    fontSize: theme.fontSizes['3xl'],
    lineHeight: theme.lineHeights['3xl'],
    textAlign: 'center',
    marginBottom: theme.spacing.md,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: theme.fontSizes.base,
    lineHeight: theme.lineHeights.base,
    textAlign: 'center',
  },
  buttonContainer: {
    paddingBottom: theme.spacing.xl,
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButton: {
    marginBottom: theme.spacing.md,
    backgroundColor: theme.colors.primary,
  },
  skipButton: {
    alignSelf: 'center',
  },
});
