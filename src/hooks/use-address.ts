import { useAuth } from '@/providers/auth-provider';
import type { AddressUpdateData } from '@/services/database';
import {
  type AddressData,
  type Coordinates,
  geocodingService,
  type SearchResult,
} from '@/services/geocoding';
import { supabase } from '@/supabase/supabase';
import { useCallback, useState } from 'react';
import { Alert } from 'react-native';

export interface ManualAddress {
  street: string;
  suburb: string;
  postcode: string;
  state: string;
  country: string;
}

export const useAddress = () => {
  const [loading, setLoading] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const [addressData, setAddressData] = useState<AddressData | null>(null);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [manualAddress, setManualAddress] = useState<ManualAddress>({
    street: '',
    suburb: '',
    postcode: '',
    state: '',
    country: 'United Kingdom',
  });
  const { updateProfile } = useAuth();

  /**
   * Reverse geocode coordinates to get address
   */
  const reverseGeocode = useCallback(async (coordinates: Coordinates) => {
    try {
      setLoading(true);
      const result = await geocodingService.reverseGeocode(coordinates);

      if (result) {
        setAddressData(result);
        setManualAddress({
          street: result.street,
          suburb: result.suburb,
          postcode: result.postcode,
          state: result.state,
          country: result.country,
        });
        return result;
      } else {
        console.log('No address found for coordinates');
        return null;
      }
    } catch {
      Alert.alert(
        'Unable to determine address',
        'Please search for your address manually.',
        [{ text: 'OK' }],
      );
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Search for addresses
   */
  const searchAddresses = useCallback(async (query: string) => {
    if (query.length < 3) {
      setSearchResults([]);
      return;
    }

    try {
      setSearchLoading(true);
      const results = await geocodingService.searchAddresses(query);
      console.log('Search results:', results);
      setSearchResults(results);
    } catch (error) {
      console.error('Address search error:', error);
      setSearchResults([]);
      Alert.alert(
        'Search Error',
        'Failed to search addresses. Please try again.',
        [{ text: 'OK' }],
      );
    } finally {
      setSearchLoading(false);
    }
  }, []);

  /**
   * Select a search result and update form
   */
  const selectSearchResult = useCallback((result: SearchResult) => {
    const selectedAddress = geocodingService.searchResultToAddressData(result);

    setAddressData(selectedAddress);
    setManualAddress({
      street: selectedAddress.street,
      suburb: selectedAddress.suburb,
      postcode: selectedAddress.postcode,
      state: selectedAddress.state,
      country: selectedAddress.country,
    });

    setSearchResults([]);
  }, []);

  /**
   * Update manual address field
   */
  const updateManualAddressField = useCallback(
    (field: keyof ManualAddress, value: string) => {
      setManualAddress((prev) => ({
        ...prev,
        [field]: value,
      }));
    },
    [],
  );

  /**
   * Validate address before confirming
   */
  const validateAddress = useCallback((): boolean => {
    if (!manualAddress.postcode || !manualAddress.suburb) {
      Alert.alert('Incomplete Address', 'Please fill in all required fields.');
      return false;
    }

    // Validate UK postcode format
    if (!geocodingService.validateUKPostcode(manualAddress.postcode)) {
      Alert.alert('Invalid Postcode', 'Please enter a valid UK postcode.');
      return false;
    }

    return true;
  }, [manualAddress]);

  const getFormattedAddress = useCallback((): AddressUpdateData => {
    const formattedPostcode = geocodingService.formatUKPostcode(
      manualAddress.postcode,
    );

    return {
      street: manualAddress.street.trim(),
      suburb: manualAddress.suburb.trim(),
      postcode: formattedPostcode,
      state: manualAddress.state.trim(),
      country: manualAddress.country.trim(),
    };
  }, [manualAddress]);

  /**
   * Save address to database
   */
  const saveAddress = useCallback(
    async (coordinates?: Coordinates): Promise<boolean> => {
      try {
        // Check authentication status
        const {
          data: { session },
          error: sessionError,
        } = await supabase.auth.getSession();

        if (sessionError) {
          console.error('Session error:', sessionError);
          throw new Error('Authentication error');
        }

        if (!session || !session.user) {
          console.error('No active session or user');
          throw new Error('Please sign in to save your address');
        }

        const user = session.user;

        if (!validateAddress()) {
          return false;
        }

        const addressToSave = {
          ...getFormattedAddress(),
          council_area: manualAddress.state,
          onboarding_completed: true,
          updated_at: new Date().toISOString(),
        };

        if (coordinates) {
          const { error } = await supabase.rpc('update_user_location', {
            user_id: user.id,
            lat: coordinates.latitude,
            lng: coordinates.longitude,
            user_postcode: addressToSave.postcode,
            user_council_area: addressToSave.state,
          });

          if (error) {
            throw error;
          }

          addressToSave.coordinates = coordinates;
        }

        await updateProfile(addressToSave);

        return true;
      } catch (error: any) {
        console.error('Error saving address:', error);

        // Handle specific authentication errors
        if (
          error.message?.includes('sign in') ||
          error.message?.includes('authenticated')
        ) {
          Alert.alert(
            'Authentication Required',
            'Please sign in to save your address.',
            [{ text: 'OK' }],
          );
        } else {
          Alert.alert(
            'Save Error',
            'An unexpected error occurred. Please try again.',
            [{ text: 'OK' }],
          );
        }
        return false;
      }
    },
    [validateAddress, getFormattedAddress, updateProfile, manualAddress.state],
  );

  /**
   * Clear all address data
   */
  const clearAddress = useCallback(() => {
    setAddressData(null);
    setSearchResults([]);
    setManualAddress({
      street: '',
      suburb: '',
      postcode: '',
      state: '',
      country: 'United Kingdom',
    });
  }, []);

  return {
    // State
    loading,
    searchLoading,
    addressData,
    searchResults,
    manualAddress,

    // Actions
    reverseGeocode,
    searchAddresses,
    selectSearchResult,
    updateManualAddressField,
    validateAddress,
    saveAddress,
    clearAddress,

    // Computed values
    isValid: manualAddress.postcode && manualAddress.suburb,
    formattedAddress: getFormattedAddress(),
  };
};
