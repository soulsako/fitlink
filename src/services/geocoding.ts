const NOMINATIM_BASE_URL =
  process.env.EXPO_PUBLIC_NOMINATIM_BASE_URL ||
  'https://nominatim.openstreetmap.org';

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
  display_name: string;
  address: {
    house_number?: string;
    road?: string;
    suburb?: string;
    town?: string;
    city?: string;
    village?: string;
    postcode?: string;
    county?: string;
    state?: string;
    country?: string;
  };
  lat: string;
  lon: string;
}

class GeocodingService {
  /**
   * Reverse geocode coordinates to get address (UK only)
   */
  async reverseGeocode(coordinates: Coordinates): Promise<AddressData | null> {
    try {
      const response = await fetch(
        `${NOMINATIM_BASE_URL}/reverse?format=json&lat=${coordinates.latitude}&lon=${coordinates.longitude}&addressdetails=1&countrycodes=gb`,
      );

      if (!response.ok) {
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

  /**
   * Search for addresses by query (UK only)
   */
  async searchAddresses(query: string): Promise<SearchResult[]> {
    if (query.length < 3) {
      return [];
    }

    try {
      const response = await fetch(
        `${NOMINATIM_BASE_URL}/search?format=json&q=${encodeURIComponent(
          query,
        )}&addressdetails=1&countrycodes=gb&limit=10`,
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const results = await response.json();
      return Array.isArray(results) ? results : [];
    } catch (error) {
      console.error('Address search error:', error);
      throw new Error('Failed to search addresses');
    }
  }

  /**
   * Parse address data from Nominatim result
   */
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
   * Convert SearchResult to AddressData
   */
  searchResultToAddressData(result: SearchResult): AddressData {
    return this.parseAddressFromResult(result);
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
      const results = await this.searchAddresses(address);
      if (results.length > 0) {
        const first = results[0];
        return {
          latitude: parseFloat(first.lat),
          longitude: parseFloat(first.lon),
        };
      }
      return null;
    } catch (error) {
      console.error('Error getting coordinates from address:', error);
      return null;
    }
  }
}

export const geocodingService = new GeocodingService();
