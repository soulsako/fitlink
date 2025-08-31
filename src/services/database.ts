import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';
import 'react-native-url-polyfill/auto';

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

export interface Profile {
  id: string;
  email?: string;
  full_name?: string;
  avatar_url?: string;
  postcode?: string;
  council_area?: string;
  phone_number?: string;
  location?: {
    lat: number;
    lng: number;
  };
  onboarding_completed: boolean;
  preferences: Record<string, any>;
  created_at: string;
  updated_at: string;
}

export interface AddressUpdateData {
  street: string;
  suburb: string;
  postcode: string;
  state: string;
  country: string;
  formattedAddress: string;
  coordinates?: {
    latitude: number;
    longitude: number;
  };
}

class DatabaseService {
  /**
   * Get the current user's profile
   */
  async getCurrentUserProfile(): Promise<Profile | null> {
    try {
      const {
        data: { session },
        error: sessionError,
      } = await supabase.auth.getSession();

      if (sessionError) {
        console.error('Session error:', sessionError);
        return null;
      }

      if (!session || !session.user) {
        console.error('No active session');
        return null;
      }

      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', session.user.id)
        .single();

      if (error) {
        console.error('Profile fetch error:', error);
        throw error;
      }

      return data;
    } catch (error) {
      console.error('Error fetching user profile:', error);
      return null;
    }
  }

  /**
   * Update user's address information
   */
  async updateUserAddress(addressData: AddressUpdateData): Promise<boolean> {
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

      const updateData: Partial<Profile> = {
        postcode: addressData.postcode,
        council_area: addressData.state, // Using state as council_area
        updated_at: new Date().toISOString(),
      };

      // If coordinates are provided, create PostGIS point
      if (addressData.coordinates) {
        const { data, error } = await supabase.rpc('update_user_location', {
          user_id: user.id,
          lat: addressData.coordinates.latitude,
          lng: addressData.coordinates.longitude,
          user_postcode: addressData.postcode,
          user_council_area: addressData.state,
        });

        if (error) {
          throw error;
        }
      } else {
        // Update without location
        const { error } = await supabase
          .from('profiles')
          .update(updateData)
          .eq('id', user.id);

        if (error) {
          throw error;
        }
      }

      return true;
    } catch (error) {
      console.error('Error updating user address:', error);
      return false;
    }
  }

  /**
   * Mark onboarding as completed
   */
  async completeOnboarding(): Promise<boolean> {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        throw new Error('No authenticated user');
      }

      const { error } = await supabase
        .from('profiles')
        .update({
          onboarding_completed: true,
          updated_at: new Date().toISOString(),
        })
        .eq('id', user.id);

      if (error) {
        throw error;
      }

      return true;
    } catch (error) {
      console.error('Error completing onboarding:', error);
      return false;
    }
  }

  /**
   * Get user's preferences
   */
  async getUserPreferences(): Promise<Record<string, any> | null> {
    try {
      const profile = await this.getCurrentUserProfile();
      return profile?.preferences || null;
    } catch (error) {
      console.error('Error fetching user preferences:', error);
      return null;
    }
  }

  /**
   * Update user preferences
   */
  async updateUserPreferences(
    preferences: Record<string, any>,
  ): Promise<boolean> {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        throw new Error('No authenticated user');
      }

      const { error } = await supabase
        .from('profiles')
        .update({
          preferences,
          updated_at: new Date().toISOString(),
        })
        .eq('id', user.id);

      if (error) {
        throw error;
      }

      return true;
    } catch (error) {
      console.error('Error updating user preferences:', error);
      return false;
    }
  }
}

export const databaseService = new DatabaseService();
