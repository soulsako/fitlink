import type React from 'react'

import { useColorScheme } from 'nativewind'
import { View, Text, Pressable, Alert } from 'react-native'

import { supabase } from './lib/supabase'
import { AuthProvider, useAuth } from './providers/AuthProvider'

function Home(): React.ReactElement {
  const { user, signOut } = useAuth()
  const { colorScheme, setColorScheme } = useColorScheme()

  const toggleTheme = (): void => {
    if (colorScheme === 'dark') {
      setColorScheme('light')
    } else {
      setColorScheme('dark')
    }
  }

  const toMessage = (err: unknown): string => {
    if (typeof err === 'string') {
      return err
    }
    if (err instanceof Error) {
      return err.message
    }
    if (err && typeof err === 'object') {
      try {
        return JSON.stringify(err, null, 2)
      } catch {
        return String(err)
      }
    }
    return String(err)
  }

  const testQuery = async (): Promise<void> => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('id')
        .limit(1)
      if (error) {
        throw error
      }
      Alert.alert(
        'Supabase test OK',
        `profiles rows visible: ${data?.length ?? 0}`,
      )
    } catch (err: unknown) {
      Alert.alert('Supabase test failed', toMessage(err))
    }
  }

  return (
    <View className="flex-1 items-center justify-center px-4 bg-white dark:bg-black">
      <Text className="text-lg mb-6 text-black dark:text-white">
        Hello {user?.email}
      </Text>

      <Pressable
        className="w-full bg-indigo-600 rounded-lg py-3 items-center mb-3"
        onPress={testQuery}
      >
        <Text className="text-white font-semibold">Test Supabase</Text>
      </Pressable>

      <Pressable
        className="w-full bg-gray-800 rounded-lg py-3 items-center mb-3"
        onPress={signOut}
      >
        <Text className="text-white font-semibold">Sign Out</Text>
      </Pressable>

      <Pressable
        className="w-full bg-zinc-200 dark:bg-zinc-700 rounded-lg py-3 items-center"
        onPress={toggleTheme}
      >
        <Text className="text-black dark:text-white font-semibold">
          Toggle Theme (Current: {colorScheme})
        </Text>
      </Pressable>
    </View>
  )
}

export default function App(): React.ReactElement {
  return (
    <AuthProvider>
      <Home />
    </AuthProvider>
  )
}
