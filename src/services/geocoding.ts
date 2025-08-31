export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface AddressData {
  street: string;
  suburb: string;
  postcode: string;
  state: string;
  country: string;
  formattedAddress: string;
}

export interface SearchResult {
  display_name: {
    address: string;
    url: string;
    id: string;
  };
  address: {
    line: {
      address: string;
      url: string;
      id: string;
    };
  };
  lat: string;
  lon: string;
}

const NOMINATIM_BASE_URL =
  process.env.EXPO_PUBLIC_NOMINATIM_BASE_URL ||
  'https://nominatim.openstreetmap.org';

class GeocodingService {
  /**
   * Reverse geocode coordinates using Nominatim
   */
  async reverseGeocode(coordinates: Coordinates): Promise<AddressData | null> {
    try {
      const response = await fetch(
        `${NOMINATIM_BASE_URL}/reverse?format=json&lat=${coordinates.latitude}&lon=${coordinates.longitude}&addressdetails=1&countrycodes=gb`,
      );

      if (!response.ok) {
        console.log('Reverse geocode response:', response);
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      if (!result || !result.address) {
        return null;
      }

      return this.parseAddressFromResult(result);
    } catch (error) {
      console.error('Reverse geocoding error:', error);
      throw new Error('Failed to fetch address from coordinates');
    }
  }

  private parseAddressFromResult(result: any): AddressData {
    const addr = result.address || {};

    const street = `${addr.house_number || ''} ${addr.road || ''}`.trim();
    const suburb = addr.town || addr.city || addr.village || addr.suburb || '';
    const state = addr.county || addr.state || '';
    const postcode = addr.postcode || '';

    return {
      street,
      suburb,
      postcode,
      state,
      country: 'United Kingdom',
      formattedAddress: result.display_name || '',
    };
  }

  /**
   * Search for addresses using getaddress.io autocomplete
   */
  async searchAddresses(query: string): Promise<SearchResult[]> {
    if (query.length < 3) return [];

    try {
      const response = await fetch(
        `${process.env.EXPO_PUBLIC_GETADDRESS_BASE_URL}/autocomplete/${encodeURIComponent(
          query,
        )}?api-key=${process.env.EXPO_PUBLIC_GETADDRESS_API_KEY}`,
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      // result.suggestions is already an array of objects with address/url/id
      return (result.suggestions || []).map((suggestion: any) => ({
        display_name: {
          address: suggestion.address,
          url: suggestion.url,
          id: suggestion.id,
        },
        address: {
          line: {
            address: suggestion.address,
            url: suggestion.url,
            id: suggestion.id,
          },
        },
        lat: '',
        lon: '',
      }));
    } catch (error) {
      console.error('Address search error:', error);
      throw new Error('Failed to search addresses');
    }
  }

  /**
   * Convert SearchResult to AddressData
   */
  searchResultToAddressData(result: SearchResult): AddressData {
    return this.parseAddressFromString(result.display_name.address);
  }

  /**
   * Parse simple string into AddressData
   */
  private parseAddressFromString(address: string): AddressData {
    const parts = address.split(',').map((part) => part.trim());

    const street = parts[0] || '';
    const suburb = parts[1] || '';
    const state = parts.length >= 4 ? parts[2] : '';
    const postcode = parts.length >= 4 ? parts[3] : parts[2] || '';

    return {
      street,
      suburb,
      postcode,
      state,
      country: 'United Kingdom',
      formattedAddress: address,
    };
  }

  /**
   * Validate UK postcode format
   */
  validateUKPostcode(postcode: string): boolean {
    const ukPostcodeRegex = /^[A-Z]{1,2}\d[A-Z\d]?\s?\d[A-Z]{2}$/i;
    return ukPostcodeRegex.test(postcode.trim());
  }

  /**
   * Format UK postcode
   */
  formatUKPostcode(postcode: string): string {
    const cleaned = postcode.replace(/\s/g, '').toUpperCase();
    if (cleaned.length >= 5) {
      return `${cleaned.slice(0, -3)} ${cleaned.slice(-3)}`;
    }
    return cleaned;
  }

  /**
   * Get coordinates from address string
   */
  async getCoordinatesFromAddress(
    address: string,
  ): Promise<Coordinates | null> {
    try {
      const response = await fetch(
        `${process.env.EXPO_PUBLIC_GETADDRESS_BASE_URL}/find/${encodeURIComponent(
          address,
        )}?api-key=${process.env.EXPO_PUBLIC_GETADDRESS_API_KEY}`,
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      if (!result || !result.latitude || !result.longitude) {
        return null;
      }

      return {
        latitude: parseFloat(result.latitude),
        longitude: parseFloat(result.longitude),
      };
    } catch (error) {
      console.error('Error getting coordinates from address:', error);
      return null;
    }
  }
}

export const geocodingService = new GeocodingService();
