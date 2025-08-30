import PrimaryButton from '@/components/ui/PrimaryButton';
import ProgressIndicator from '@/components/ui/ProgressIndicator';
import type { AuthStackScreenProps } from '@/types/navigation';
import * as Location from 'expo-location';
import type React from 'react';
import { useCallback, useEffect, useState } from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  Card,
  IconButton,
  Text,
  TextInput,
  useTheme,
} from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

type AddressConfirmationScreenProps =
  AuthStackScreenProps<'AddressConfirmation'>;

interface AddressData {
  street: string;
  suburb: string;
  postcode: string;
  state: string;
  formattedAddress: string;
}

const AddressConfirmationScreen: React.FC<AddressConfirmationScreenProps> = ({
  navigation,
  route,
}) => {
  const theme = useTheme();
  const coordinates = route.params?.coordinates;

  const [loading, setLoading] = useState(false);
  const [addressData, setAddressData] = useState<AddressData | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [manualAddress, setManualAddress] = useState({
    street: '',
    suburb: '',
    postcode: '',
    state: '',
  });

  const reverseGeocode = useCallback(async () => {
    if (!coordinates) {
      return;
    }

    try {
      setLoading(true);
      const [result] = await Location.reverseGeocodeAsync({
        latitude: coordinates.latitude,
        longitude: coordinates.longitude,
      });

      if (result) {
        const addressData: AddressData = {
          street: `${result.streetNumber || ''} ${result.street || ''}`.trim(),
          suburb: result.subregion || result.city || '',
          postcode: result.postalCode || '',
          state: result.region || '',
          formattedAddress: `${result.streetNumber || ''} ${
            result.street || ''
          }, ${result.subregion || result.city || ''} ${result.region || ''} ${
            result.postalCode || ''
          }`
            .replace(/\s+/g, ' ')
            .trim(),
        };
        setAddressData(addressData);

        // Pre-fill manual address form in case user wants to edit
        setManualAddress({
          street: addressData.street,
          suburb: addressData.suburb,
          postcode: addressData.postcode,
          state: addressData.state,
        });
      } else {
        setIsEditing(true);
      }
    } catch (error) {
      console.error('Reverse geocoding error:', error);
      Alert.alert(
        'Unable to determine address',
        'Please enter your address manually.',
        [{ text: 'OK', onPress: () => setIsEditing(true) }],
      );
    } finally {
      setLoading(false);
    }
  }, [coordinates]);

  useEffect(() => {
    if (coordinates) {
      reverseGeocode();
    } else {
      // If no coordinates, go straight to manual entry
      setIsEditing(true);
    }
  }, [coordinates, reverseGeocode]);

  const handleConfirmAddress = () => {
    const finalAddress = isEditing
      ? {
          street: manualAddress.street,
          suburb: manualAddress.suburb,
          postcode: manualAddress.postcode,
          state: manualAddress.state,
          formattedAddress:
            `${manualAddress.street}, ${manualAddress.suburb} ${manualAddress.state} ${manualAddress.postcode}`
              .replace(/\s+/g, ' ')
              .trim(),
        }
      : addressData;

    if (!finalAddress || !finalAddress.postcode || !finalAddress.suburb) {
      Alert.alert('Incomplete Address', 'Please fill in all required fields.');
      return;
    }

    // Navigate to next step with address data
    // TODO: Replace with the correct next screen in your auth flow
    // Based on your navigation stack, this might be a different screen
    // For now, I'll use a placeholder - you'll need to update this
    console.log('Address confirmed:', finalAddress);

    // Example of how to navigate once you know the correct route:
    // navigation.navigate('NextScreen', { address: finalAddress });
  };

  const renderAddressConfirmation = () => (
    <View style={styles.addressContainer}>
      <Card
        style={[
          styles.addressCard,
          { backgroundColor: theme.colors.surfaceVariant },
        ]}
      >
        <Card.Content style={styles.cardContent}>
          <View style={styles.addressHeader}>
            <Text
              style={[
                styles.addressTitle,
                { color: theme.colors.onSurfaceVariant },
              ]}
            >
              Detected Address
            </Text>
            <TouchableOpacity onPress={() => setIsEditing(true)}>
              <IconButton
                icon="pencil"
                size={20}
                iconColor={theme.colors.primary}
              />
            </TouchableOpacity>
          </View>

          <Text style={[styles.addressText, { color: theme.colors.onSurface }]}>
            {addressData?.formattedAddress}
          </Text>

          <View style={styles.addressDetails}>
            <Text
              style={[
                styles.detailText,
                { color: theme.colors.onSurfaceVariant },
              ]}
            >
              Postcode: {addressData?.postcode}
            </Text>
            <Text
              style={[
                styles.detailText,
                { color: theme.colors.onSurfaceVariant },
              ]}
            >
              State: {addressData?.state}
            </Text>
          </View>
        </Card.Content>
      </Card>
    </View>
  );

  const renderManualEntry = () => (
    <View style={styles.manualEntryContainer}>
      <Text
        style={[styles.manualEntryTitle, { color: theme.colors.onBackground }]}
      >
        Enter your address
      </Text>

      <View style={styles.inputContainer}>
        <TextInput
          label="Street Address"
          value={manualAddress.street}
          onChangeText={(text) =>
            setManualAddress({ ...manualAddress, street: text })
          }
          style={styles.input}
          mode="outlined"
          placeholder="e.g. 123 Main Street"
        />

        <TextInput
          label="Suburb/City"
          value={manualAddress.suburb}
          onChangeText={(text) =>
            setManualAddress({ ...manualAddress, suburb: text })
          }
          style={styles.input}
          mode="outlined"
          placeholder="e.g. Sydney"
        />

        <View style={styles.rowInputs}>
          <TextInput
            label="State"
            value={manualAddress.state}
            onChangeText={(text) =>
              setManualAddress({ ...manualAddress, state: text })
            }
            style={[styles.input, styles.stateInput]}
            mode="outlined"
            placeholder="NSW"
          />

          <TextInput
            label="Postcode"
            value={manualAddress.postcode}
            onChangeText={(text) =>
              setManualAddress({ ...manualAddress, postcode: text })
            }
            style={[styles.input, styles.postcodeInput]}
            mode="outlined"
            placeholder="2000"
            keyboardType="numeric"
            maxLength={4}
          />
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <ProgressIndicator currentStep={2} totalSteps={3} />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.headerContainer}>
          <Text style={[styles.title, { color: theme.colors.onBackground }]}>
            {isEditing ? 'Enter your address' : 'Confirm your address'}
          </Text>
          <Text
            style={[styles.subtitle, { color: theme.colors.onSurfaceVariant }]}
          >
            {isEditing
              ? 'Help us provide accurate local government information for your area.'
              : 'Is this address correct? We use this to show you relevant local information.'}
          </Text>
        </View>

        {loading ? (
          <View style={styles.loadingContainer}>
            <Text
              style={[
                styles.loadingText,
                { color: theme.colors.onSurfaceVariant },
              ]}
            >
              Finding your address...
            </Text>
          </View>
        ) : isEditing ? (
          renderManualEntry()
        ) : (
          addressData && renderAddressConfirmation()
        )}
      </ScrollView>

      <View style={styles.buttonContainer}>
        {!isEditing && addressData && (
          <PrimaryButton
            title="Use different address"
            onPress={() => setIsEditing(true)}
            mode="text"
            style={styles.secondaryButton}
          />
        )}

        <PrimaryButton
          title="Continue"
          onPress={handleConfirmAddress}
          disabled={
            loading ||
            (isEditing && (!manualAddress.suburb || !manualAddress.postcode))
          }
          style={styles.primaryButton}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  headerContainer: {
    marginTop: 32,
    marginBottom: 32,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    lineHeight: 32,
    textAlign: 'center',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 200,
  },
  loadingText: {
    fontSize: 16,
  },
  addressContainer: {
    marginBottom: 32,
  },
  addressCard: {
    elevation: 2,
  },
  cardContent: {
    padding: 20,
  },
  addressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  addressTitle: {
    fontSize: 14,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  addressText: {
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 16,
    lineHeight: 26,
  },
  addressDetails: {
    gap: 4,
  },
  detailText: {
    fontSize: 14,
    lineHeight: 20,
  },
  manualEntryContainer: {
    marginBottom: 32,
  },
  manualEntryTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 24,
    textAlign: 'center',
  },
  inputContainer: {
    gap: 16,
  },
  input: {
    backgroundColor: 'transparent',
  },
  rowInputs: {
    flexDirection: 'row',
    gap: 12,
  },
  stateInput: {
    flex: 1,
  },
  postcodeInput: {
    flex: 1,
  },
  buttonContainer: {
    paddingHorizontal: 24,
    paddingBottom: 32,
    gap: 16,
  },
  primaryButton: {
    marginTop: 8,
  },
  secondaryButton: {
    alignSelf: 'center',
  },
});

export default AddressConfirmationScreen;
