import 'react-native-url-polyfill/auto'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient, type SupabaseClient } from '@supabase/supabase-js'
import Constants from 'expo-constants'
import { Alert } from 'react-native'

type PublicEnvKey = 'EXPO_PUBLIC_SUPABASE_URL' | 'EXPO_PUBLIC_SUPABASE_ANON_KEY'
type ExtraRecord = Partial<Record<PublicEnvKey, unknown>>

const extraRaw: ExtraRecord = (Constants?.expoConfig?.extra ??
  {}) as ExtraRecord

function pickString(key: PublicEnvKey): string | undefined {
  const fromExtra = extraRaw[key]
  if (typeof fromExtra === 'string') {
    return fromExtra
  }
  const fromEnv = (process.env as Record<string, string | undefined>)[key]
  if (typeof fromEnv === 'string') {
    return fromEnv
  }
  return undefined
}

function requireEnv(key: PublicEnvKey): string {
  const v = pickString(key)
  if (typeof v === 'string' && v.length > 0) {
    return v
  }
  throw new Error(
    `Missing ${key}. Define it in .env and expose via app.config.ts -> extra.`,
  )
}

Alert.alert(requireEnv('EXPO_PUBLIC_SUPABASE_URL'))
Alert.alert(requireEnv('EXPO_PUBLIC_SUPABASE_ANON_KEY'))

export const SUPABASE_URL: string = requireEnv('EXPO_PUBLIC_SUPABASE_URL')
export const SUPABASE_ANON_KEY: string = requireEnv(
  'EXPO_PUBLIC_SUPABASE_ANON_KEY',
)

export const supabase: SupabaseClient = createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY,
  {
    auth: {
      storage: AsyncStorage,
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false,
    },
  },
)
