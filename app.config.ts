// app.config.ts
import { ConfigContext, ExpoConfig } from '@expo/config'

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: 'fitlink',
  slug: 'fitlink',
  scheme: 'fitlink',
  version: '1.0.0',
  orientation: 'portrait',
  newArchEnabled: true,
  userInterfaceStyle: 'light',
  icon: './assets/icon.png',
  splash: {
    image: './assets/splash-icon.png',
    resizeMode: 'contain',
    backgroundColor: '#ffffff',
  },
  ios: {
    supportsTablet: true,
    bundleIdentifier: 'com.hamidmian.fitlink',
    infoPlist: {
      ITSAppUsesNonExemptEncryption: false, // ✅ standard/exempt only
    },
  },
  // app.config.ts (android block)
  android: {
    adaptiveIcon: {
      foregroundImage: './assets/adaptive-icon.png',
      backgroundColor: '#ffffff',
    },
    edgeToEdgeEnabled: true, // ✅ correct key for SDK 53
    package: 'com.hamidmian.fitlink',
  },
  web: {
    favicon: './assets/favicon.png',
  },
  extra: {
    eas: {
      projectId: 'd3864dca-2bae-4e0e-bf03-ef22a7fa90d0', // ✅ add this
    },
    EXPO_PUBLIC_SUPABASE_URL: 'https://eagknyqkytgjcxgevbre.supabase.co',
    EXPO_PUBLIC_SUPABASE_ANON_KEY:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVhZ2tueXFreXRnamN4Z2V2YnJlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTUzNjQ1MjAsImV4cCI6MjA3MDk0MDUyMH0.5-AjmZzroWh_yiPWC_ERmQbKkhuJkF98YH5Yf0R6s64',
  },
})
