export interface LocationCoordinates {
  latitude: number;
  longitude: number;
}

export interface PostcodeInfo {
  postcode: string;
  council: string;
  constituency: string;
  region: string;
}

export const reverseGeocode = async (
  coordinates: LocationCoordinates,
): Promise<PostcodeInfo | null> => {
  try {
    // Using postcodes.io API for UK postcode lookup
    const response = await fetch(
      `https://api.postcodes.io/postcodes?lon=${coordinates.longitude}&lat=${coordinates.latitude}`,
    );

    if (!response.ok) {
      throw new Error('Failed to reverse geocode');
    }

    const data = await response.json();

    if (data.result && data.result.length > 0) {
      const result = data.result[0];
      return {
        postcode: result.postcode,
        council: result.admin_district,
        constituency: result.parliamentary_constituency,
        region: result.region,
      };
    }

    return null;
  } catch (error) {
    console.error('Reverse geocoding error:', error);
    return null;
  }
};

export const validatePostcode = async (
  postcode: string,
): Promise<PostcodeInfo | null> => {
  try {
    const cleanPostcode = postcode.replace(/\s/g, '').toUpperCase();
    const response = await fetch(
      `https://api.postcodes.io/postcodes/${cleanPostcode}`,
    );

    if (!response.ok) {
      return null;
    }

    const data = await response.json();

    if (data.result) {
      return {
        postcode: data.result.postcode,
        council: data.result.admin_district,
        constituency: data.result.parliamentary_constituency,
        region: data.result.region,
      };
    }

    return null;
  } catch (error) {
    console.error('Postcode validation error:', error);
    return null;
  }
};
