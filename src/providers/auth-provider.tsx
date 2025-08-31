import AsyncStorage from '@react-native-async-storage/async-storage';
import type { AuthError, Session, User } from '@supabase/supabase-js';
import * as AuthSession from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';
import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { Platform } from 'react-native';
import type { SignUpFormData } from '../schemas/auth-schemas';
import { supabase } from '../supabase/supabase';

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

type LocationData = {
  latitude: number;
  longitude: number;
};

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
  refreshSession: () => Promise<void>;
  storeUserLocation: (location: LocationData) => Promise<ProfileError | null>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const redirectTo = AuthSession.makeRedirectUri({
    scheme: 'fitlink',
    path: 'auth-callback',
  });

  const signOut = useCallback(async (): Promise<void> => {
    try {
      // Ensure local session is cleared immediately so UI updates right away
      await supabase.auth.signOut({ scope: 'local' });
    } catch {
      // ignore
    }

    try {
      // Best-effort: revoke refresh token on the server
      await supabase.auth.signOut({ scope: 'global' });
    } catch {
      // ignore; local sign-out already handled
    }

    try {
      // Remove only Supabase auth keys to avoid nuking unrelated app data
      const keys = await AsyncStorage.getAllKeys();
      const sbKeys = keys.filter((k) => k.startsWith('sb-'));
      if (sbKeys.length) {
        await AsyncStorage.multiRemove(sbKeys);
      }
    } catch {
      // Fallback: clear everything if targeted removal fails
      try {
        await AsyncStorage.clear();
      } catch {
        // ignore
      }
    } finally {
      setSession(null);
      setUserProfile(null);
    }
  }, []);

  const fetchUserProfile = useCallback(async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        return null;
      }

      // Convert PostGIS geography to our location format
      let location = null;
      if (data.location) {
        // PostGIS returns geography as "POINT(longitude latitude)"
        const match = data.location.match(/POINT\(([^ ]+) ([^ ]+)\)/);
        if (match) {
          location = {
            longitude: parseFloat(match[1]),
            latitude: parseFloat(match[2]),
          };
        }
      }

      return {
        ...data,
        location,
      } as UserProfile;
    } catch {
      return null;
    }
  }, []);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session?.user) {
        fetchUserProfile(session.user.id).then(setUserProfile);
      }
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
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
      if (Platform.OS === 'web') {
        const { error } = await supabase.auth.signInWithOAuth({
          provider: 'google',
          options: {
            redirectTo: `${window.location.origin}/auth/callback`,
          },
        });
        if (error) {
          return error;
        }
        return null;
      } else {
        const { data, error } = await supabase.auth.signInWithOAuth({
          provider: 'google',
          options: {
            redirectTo,
            queryParams: {
              access_type: 'offline',
              prompt: 'consent',
            },
          },
        });

        if (error) {
          return error;
        }

        if (data?.url) {
          const result = await WebBrowser.openAuthSessionAsync(
            data.url,
            redirectTo,
          );

          if (result.type === 'success' && result.url) {
            const url = new URL(result.url);
            let accessToken: string | null = null;
            let refreshToken: string | null = null;

            if (url.hash) {
              const hashParams = new URLSearchParams(url.hash.substring(1));
              accessToken = hashParams.get('access_token');
              refreshToken = hashParams.get('refresh_token');
            }
            if (!accessToken) {
              accessToken = url.searchParams.get('access_token');
              refreshToken = url.searchParams.get('refresh_token');
            }

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

          await new Promise((r) => setTimeout(r, 1000));
          const { data: sessionData } = await supabase.auth.getSession();
          if (sessionData.session) {
            return null;
          }
        }

        return { message: 'Google sign in failed' } as AuthError;
      }
    } catch {
      return { message: 'Failed to sign in with Google' } as AuthError;
    }
  };

  const sendPasswordResetEmail = async (
    email: string,
  ): Promise<AuthError | null> => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: 'fitlink://reset-password',
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
      // Handle location conversion for PostGIS
      const updateData: any = {
        ...updates,
        updated_at: new Date().toISOString(),
      };

      // Convert location to PostGIS POINT format if provided
      if (updates.location) {
        updateData.location = `POINT(${updates.location.longitude} ${updates.location.latitude})`;
      }

      const { error } = await supabase
        .from('profiles')
        .update(updateData)
        .eq('id', session.user.id);

      if (error) {
        return {
          message: error.message,
          code: error.code,
        };
      }

      const updatedProfile = await fetchUserProfile(session.user.id);
      setUserProfile(updatedProfile);

      return null;
    } catch {
      return { message: 'Failed to update profile' };
    }
  };

  const storeUserLocation = async (
    location: LocationData,
  ): Promise<ProfileError | null> => {
    if (!session?.user) {
      return { message: 'No authenticated user' };
    }

    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          location: `POINT(${location.longitude} ${location.latitude})`,
          updated_at: new Date().toISOString(),
        })
        .eq('id', session.user.id);

      if (error) {
        return {
          message: error.message,
          code: error.code,
        };
      }

      const updatedProfile = await fetchUserProfile(session.user.id);
      setUserProfile(updatedProfile);

      return null;
    } catch {
      return { message: 'Failed to store location' };
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
        storeUserLocation,
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
