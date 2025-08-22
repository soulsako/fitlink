import type { AuthError, Session, User } from '@supabase/supabase-js';
import * as WebBrowser from 'expo-web-browser';
import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { supabase } from '../lib/supabase';
import type { SignUpFormData } from '../schemas/authSchemas';

WebBrowser.maybeCompleteAuthSession();

type UserProfile = {
  id: string;
  email: string;
  full_name: string;
  avatar_url?: string;
  postcode?: string;
  council_area?: string;
  phone_number?: string;
  location?: {
    latitude: number;
    longitude: number;
  };
  onboarding_completed: boolean;
  created_at: string;
  updated_at: string;
};

// Create a custom error type for profile operations
type ProfileError = {
  message: string;
  code?: string;
};

type AuthContextType = {
  session: Session | null;
  user: User | null;
  userProfile: UserProfile | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<AuthError | null>;
  signUp: (data: SignUpFormData) => Promise<AuthError | null>;
  signInWithGoogle: () => Promise<AuthError | null>;
  signOut: () => Promise<void>;
  sendPasswordResetEmail: (email: string) => Promise<AuthError | null>;
  resetPassword: (password: string) => Promise<AuthError | null>;
  updateProfile: (
    updates: Partial<UserProfile>,
  ) => Promise<ProfileError | null>;
  completeOnboarding: (profileData: {
    postcode: string;
    council_area: string;
    phone_number: string;
    location?: { latitude: number; longitude: number };
  }) => Promise<ProfileError | null>;
  refreshSession: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch user profile
  const fetchUserProfile = useCallback(async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('Error fetching user profile:', error);
        return null;
      }

      return data as UserProfile;
    } catch (error) {
      console.error('Error fetching user profile:', error);
      return null;
    }
  }, []);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session?.user) {
        fetchUserProfile(session.user.id).then(setUserProfile);
      }
      setLoading(false);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      setSession(session);
      if (session?.user) {
        const profile = await fetchUserProfile(session.user.id);
        setUserProfile(profile);
      } else {
        setUserProfile(null);
      }
      setLoading(false);
    });

    return () => subscription?.unsubscribe();
  }, [fetchUserProfile]);

  const signIn = async (
    email: string,
    password: string,
  ): Promise<AuthError | null> => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return error;
  };

  const signUp = async (data: SignUpFormData): Promise<AuthError | null> => {
    const { error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: {
          full_name: data.fullName,
        },
      },
    });
    return error;
  };

  const signInWithGoogle = async (): Promise<AuthError | null> => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: 'localmind://auth-callback',
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          },
        },
      });

      if (error) {
        return error;
      }

      // Open the OAuth URL in the browser
      const result = await WebBrowser.openAuthSessionAsync(
        data.url,
        'localmind://auth-callback',
      );

      if (result.type === 'success' && result.url) {
        // Handle the callback URL
        const url = new URL(result.url);
        const fragment = url.hash.substring(1);
        const params = new URLSearchParams(fragment);

        const accessToken = params.get('access_token');
        const refreshToken = params.get('refresh_token');

        if (accessToken) {
          const { error: sessionError } = await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken || '',
          });

          if (sessionError) {
            return sessionError;
          }
          return null;
        }
      }

      return { message: 'Google sign in was cancelled or failed' } as AuthError;
    } catch (error) {
      console.error('Google sign in error:', error);
      return { message: 'Failed to sign in with Google' } as AuthError;
    }
  };

  const signOut = async (): Promise<void> => {
    await supabase.auth.signOut();
    setUserProfile(null);
  };

  const sendPasswordResetEmail = async (
    email: string,
  ): Promise<AuthError | null> => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: 'localmind://reset-password',
    });
    return error;
  };

  const resetPassword = async (password: string): Promise<AuthError | null> => {
    const { error } = await supabase.auth.updateUser({
      password: password,
    });
    return error;
  };

  const updateProfile = async (
    updates: Partial<UserProfile>,
  ): Promise<ProfileError | null> => {
    if (!session?.user) {
      return { message: 'No authenticated user' };
    }

    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          ...updates,
          updated_at: new Date().toISOString(),
        })
        .eq('id', session.user.id);

      if (error) {
        return {
          message: error.message,
          code: error.code,
        };
      }

      // Refresh the profile
      const updatedProfile = await fetchUserProfile(session.user.id);
      setUserProfile(updatedProfile);

      return null;
    } catch (error) {
      console.error('Error updating profile:', error);
      return { message: 'Failed to update profile' };
    }
  };

  const completeOnboarding = async (profileData: {
    postcode: string;
    council_area: string;
    phone_number: string;
    location?: { latitude: number; longitude: number };
  }): Promise<ProfileError | null> => {
    if (!session?.user) {
      return { message: 'No authenticated user' };
    }

    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          postcode: profileData.postcode,
          council_area: profileData.council_area,
          phone_number: profileData.phone_number,
          location: profileData.location
            ? `POINT(${profileData.location.longitude} ${profileData.location.latitude})`
            : null,
          onboarding_completed: true,
          updated_at: new Date().toISOString(),
        })
        .eq('id', session.user.id);

      if (error) {
        return {
          message: error.message,
          code: error.code,
        };
      }

      // Refresh the profile
      const updatedProfile = await fetchUserProfile(session.user.id);
      setUserProfile(updatedProfile);

      return null;
    } catch (error) {
      console.error('Error completing onboarding:', error);
      return { message: 'Failed to complete onboarding' };
    }
  };

  const refreshSession = async (): Promise<void> => {
    await supabase.auth.refreshSession();
  };

  return (
    <AuthContext.Provider
      value={{
        session,
        user: session?.user ?? null,
        userProfile,
        loading,
        signIn,
        signUp,
        signInWithGoogle,
        signOut,
        sendPasswordResetEmail,
        resetPassword,
        updateProfile,
        completeOnboarding,
        refreshSession,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
