import BackButton from '@/components/ui/back-button';
import InputField from '@/components/ui/input-field';
import PrimaryButton from '@/components/ui/primary-button';
import ProgressIndicator from '@/components/ui/progress-indicator';
import ThemedText from '@/components/ui/themed-text';
import { useAddress } from '@/hooks/use-address';
import { isAuthenticated } from '@/services/auth';
import { theme } from '@/styles/theme';
import type { OnboardingStackScreenProps } from '@/types/navigation';
import { MaterialIcons } from '@expo/vector-icons';
import type React from 'react';
import { useEffect, useState } from 'react';
import {
  Alert,
  FlatList,
  Keyboard,
  Modal,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { ActivityIndicator, Searchbar, Surface } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

type AddressConfirmationScreenProps =
  OnboardingStackScreenProps<'AddressConfirmation'>;

const AddressConfirmationScreen: React.FC<AddressConfirmationScreenProps> = ({
  route,
}) => {
  const coordinates = route.params?.coordinates;
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [saving, setSaving] = useState(false);

  const {
    loading,
    searchLoading,
    searchResults,
    manualAddress,
    reverseGeocode,
    searchAddresses,
    selectSearchResult,
    updateManualAddressField,
    saveAddress,
    isValid,
  } = useAddress();

  console.log('manualAddress', manualAddress);

  useEffect(() => {
    if (coordinates) {
      reverseGeocode(coordinates);
    }
  }, [coordinates, reverseGeocode]);

  const handleSearchQuery = (text: string): void => {
    setSearchQuery(text);
    searchAddresses(text);
  };

  const handleSelectSearchResult = (result: any): void => {
    selectSearchResult(result);
    setShowSearchModal(false);
    setSearchQuery('');
    Keyboard.dismiss();
  };

  const handleConfirmAddress = async (): Promise<void> => {
    try {
      setSaving(true);
      const isAuth = await isAuthenticated();

      if (!isAuth) {
        Alert.alert(
          'Sign In Required',
          'Please sign in to save your address and continue.',
          [
            { text: 'Cancel', style: 'cancel' },
            {
              text: 'Sign In',
              onPress: () => {
                console.log('Navigate to sign in');
              },
            },
          ],
        );
        return;
      }

      const success = await saveAddress(coordinates);
      if (success) {
        console.log('Address saved successfully');
      }
    } catch (error) {
      console.error('Error confirming address:', error);
    } finally {
      setSaving(false);
    }
  };

  const renderSearchModal = () => (
    <Modal
      visible={showSearchModal}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={() => setShowSearchModal(false)}
    >
      <SafeAreaView style={styles.modalContainer}>
        <View style={styles.modalHeader}>
          <TouchableOpacity
            onPress={() => setShowSearchModal(false)}
            style={styles.closeButton}
          >
            <MaterialIcons
              name="close"
              size={24}
              color={theme.colors.textPrimary}
            />
          </TouchableOpacity>
        </View>

        <Searchbar
          placeholder="Search for your address or postcode"
          onChangeText={handleSearchQuery}
          value={searchQuery}
          style={styles.searchBar}
          inputStyle={styles.searchInput}
          autoFocus
          icon={() => (
            <MaterialIcons
              name="search"
              size={20}
              color={theme.colors.textSecondary}
            />
          )}
          clearIcon={() =>
            searchQuery ? (
              <MaterialIcons
                name="close"
                size={20}
                color={theme.colors.textSecondary}
              />
            ) : null
          }
        />

        {searchLoading && (
          <View style={styles.searchLoadingContainer}>
            <ActivityIndicator size="small" color={theme.colors.primary} />
            <ThemedText
              variant="body"
              size="small"
              color="textSecondary"
              style={styles.searchLoadingText}
            >
              Searching...
            </ThemedText>
          </View>
        )}

        {searchQuery.length >= 3 &&
          searchResults.length === 0 &&
          !searchLoading && (
            <ThemedText
              variant="body"
              size="small"
              color="textSecondary"
              style={{ textAlign: 'center', marginTop: theme.spacing.md }}
            >
              No addresses found.
            </ThemedText>
          )}

        {searchResults.length > 0 && (
          <FlatList
            data={searchResults}
            keyExtractor={(item, index) => {
              const id =
                typeof item.display_name === 'object'
                  ? item.display_name.id
                  : `${index}`;
              return id || `${index}`;
            }}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.searchResultItem}
                onPress={() => handleSelectSearchResult(item)}
              >
                <View style={styles.searchResultContent}>
                  <MaterialIcons
                    name="location-on"
                    size={20}
                    color={theme.colors.textSecondary}
                  />
                  <View style={styles.searchResultText}>
                    <ThemedText
                      variant="body"
                      size="medium"
                      color="textPrimary"
                      style={styles.searchResultTitle}
                    >
                      {typeof item.display_name === 'object'
                        ? item.display_name.address
                        : String(item.display_name)}
                    </ThemedText>
                  </View>
                </View>
              </TouchableOpacity>
            )}
            style={styles.searchResultsList}
            showsVerticalScrollIndicator={false}
          />
        )}
      </SafeAreaView>
    </Modal>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ProgressIndicator currentStep={2} totalSteps={3} />
      <BackButton fallbackRoute="Welcome" />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.headerContainer}>
          <ThemedText
            variant="headline"
            size="medium"
            color="textPrimary"
            style={styles.title}
          >
            Confirm your address
          </ThemedText>
        </View>

        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={theme.colors.primary} />
            <ThemedText
              variant="body"
              size="medium"
              color="textSecondary"
              style={styles.loadingText}
            >
              Finding your address...
            </ThemedText>
          </View>
        ) : (
          <View style={styles.formContainer}>
            <TouchableOpacity style={styles.countryField}>
              <View style={styles.countryContent}>
                <View>
                  <ThemedText
                    variant="label"
                    size="small"
                    color="textSecondary"
                  >
                    Country / region
                  </ThemedText>
                  <ThemedText
                    variant="body"
                    size="medium"
                    color="textPrimary"
                    style={styles.countryText}
                  >
                    United Kingdom
                  </ThemedText>
                </View>
                <MaterialIcons
                  name="expand-more"
                  size={24}
                  color={theme.colors.textSecondary}
                />
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.searchButton}
              onPress={() => setShowSearchModal(true)}
            >
              <MaterialIcons
                name="search"
                size={20}
                color={theme.colors.primary}
              />
              <ThemedText
                variant="body"
                size="medium"
                color="primary"
                style={styles.searchButtonText}
              >
                Search for address
              </ThemedText>
            </TouchableOpacity>

            <InputField
              label="Street address"
              value={manualAddress.street}
              onChangeText={(text: string) =>
                updateManualAddressField('street', text)
              }
              placeholder="2 Mile Lane"
            />

            {/* <InputField
              label="Apt, suite, unit (if applicable)"
              value=""
              onChangeText={(_text: string) => {}}
              placeholder=""
            /> */}

            <InputField
              label="City / town"
              value={manualAddress.suburb}
              onChangeText={(text: string) =>
                updateManualAddressField('suburb', text)
              }
              placeholder="Menlo Park"
            />

            <InputField
              label="State"
              value={manualAddress.state}
              onChangeText={(text: string) =>
                updateManualAddressField('state', text)
              }
              placeholder="California"
            />

            <InputField
              label="Postcode"
              value={manualAddress.postcode}
              onChangeText={(text: string) =>
                updateManualAddressField('postcode', text)
              }
              placeholder="94025"
              keyboardType="default"
              maxLength={8}
            />

            {/* <View style={styles.locationToggle}>
              <View style={styles.locationToggleContent}>
                <ThemedText
                  variant="body"
                  size="medium"
                  color="textPrimary"
                  weight="medium"
                >
                  Show your specific location
                </ThemedText>
                <ThemedText
                  variant="body"
                  size="small"
                  color="textSecondary"
                  style={styles.locationDescription}
                >
                  Make it clear to guests where your place is located. We'll
                  show your exact location on the map.
                </ThemedText>
              </View>
              <View style={styles.toggleSwitch} />
            </View> */}

            {!coordinates && (
              <Surface style={styles.errorContainer} elevation={0}>
                <View style={styles.errorContent}>
                  <View style={styles.errorIcon}>
                    <MaterialIcons
                      name="warning"
                      size={20}
                      color={theme.colors.white}
                    />
                  </View>
                  <View style={styles.errorText}>
                    <ThemedText
                      variant="body"
                      size="medium"
                      color="textPrimary"
                      weight="medium"
                    >
                      We couldn't find your location
                    </ThemedText>
                    <ThemedText
                      variant="body"
                      size="small"
                      color="textSecondary"
                    >
                      Please enter your address instead.
                    </ThemedText>
                  </View>
                  <TouchableOpacity style={styles.errorClose}>
                    <MaterialIcons
                      name="close"
                      size={16}
                      color={theme.colors.textSecondary}
                    />
                  </TouchableOpacity>
                </View>
              </Surface>
            )}
          </View>
        )}
      </ScrollView>

      <View style={styles.buttonContainer}>
        <PrimaryButton
          title="Looks good"
          onPress={handleConfirmAddress}
          loading={saving}
          disabled={loading || saving || !isValid}
          style={styles.primaryButton}
        />
      </View>

      {renderSearchModal()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  content: {
    flex: 1,
    paddingHorizontal: theme.spacing.lg,
  },
  headerContainer: {
    marginTop: theme.spacing.xl,
    marginBottom: theme.spacing.lg,
  },
  title: {
    textAlign: 'left',
    fontFamily: theme.fonts.bold,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 200,
  },
  loadingText: {
    marginTop: theme.spacing.md,
  },
  formContainer: {
    gap: theme.spacing.md,
  },
  countryField: {
    borderWidth: 1,
    borderColor: theme.colors.gray300,
    borderRadius: theme.borderRadius.md,
    backgroundColor: theme.colors.gray50,
  },
  countryContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.spacing.md,
  },
  countryText: {
    marginTop: theme.spacing.xs,
    fontFamily: theme.fonts.medium,
  },
  searchButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: theme.spacing.md,
    gap: theme.spacing.sm,
    borderWidth: 1,
    borderColor: theme.colors.primary,
    borderRadius: theme.borderRadius.md,
    backgroundColor: theme.colors.white,
  },
  searchButtonText: {
    fontFamily: theme.fonts.medium,
  },
  locationToggle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingVertical: theme.spacing.md,
  },
  locationToggleContent: {
    flex: 1,
  },
  locationDescription: {
    marginTop: theme.spacing.xs,
  },
  toggleSwitch: {
    width: 50,
    height: 24,
    backgroundColor: theme.colors.gray300,
    borderRadius: 12,
    marginLeft: theme.spacing.md,
  },
  errorContainer: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.md,
    marginVertical: theme.spacing.sm,
  },
  errorContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: theme.spacing.md,
  },
  errorIcon: {
    width: 32,
    height: 32,
    backgroundColor: theme.colors.error,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing.md,
  },
  errorText: {
    flex: 1,
  },
  errorClose: {
    padding: theme.spacing.xs,
  },
  mapContainer: {
    height: 150,
    backgroundColor: theme.colors.gray100,
    borderRadius: theme.borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: theme.spacing.md,
  },
  mapPlaceholder: {
    textAlign: 'center',
  },
  buttonContainer: {
    paddingHorizontal: theme.spacing.lg,
    paddingBottom: theme.spacing.xl,
    backgroundColor: theme.colors.background,
  },
  primaryButton: {
    backgroundColor: theme.colors.buttonPrimary,
    borderRadius: theme.borderRadius.md,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.md,
  },
  closeButton: {
    padding: theme.spacing.sm,
  },
  searchBar: {
    marginHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.md,
    backgroundColor: theme.colors.gray50,
    borderRadius: theme.borderRadius.full,
    elevation: 0,
  },
  searchInput: {
    fontFamily: theme.fonts.regular,
    fontSize: theme.fontSizes.base,
  },
  searchLoadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: theme.spacing.md,
  },
  searchLoadingText: {
    marginLeft: theme.spacing.sm,
  },
  searchResultsList: {
    flex: 1,
    paddingHorizontal: theme.spacing.lg,
  },
  searchResultItem: {
    paddingVertical: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.gray200,
  },
  searchResultContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  searchResultText: {
    marginLeft: theme.spacing.md,
    flex: 1,
  },
  searchResultTitle: {
    fontFamily: theme.fonts.medium,
    marginBottom: theme.spacing.xs,
  },
});

export default AddressConfirmationScreen;
