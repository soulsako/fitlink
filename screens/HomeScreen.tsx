import { View, Text, Pressable, Alert } from 'react-native'

import { supabase } from '../lib/supabase'
import { useAuth } from '../providers/AuthProvider'

export default function HomeScreen() {
  const { user, signOut } = useAuth()

  const testQuery = async () => {
    const { data, error } = await supabase
      .from('profiles')
      .select('id')
      .limit(1)
    if (error) {
      Alert.alert('Supabase test failed', error.message)
    } else {
      Alert.alert(
        'Supabase test OK',
        `profiles rows visible: ${data?.length ?? 0}`,
      )
    }
  }

  return (
    <View className="flex-1 items-center justify-center px-4">
      <Text className="text-lg mb-6">Hello {user?.email}</Text>

      <Pressable
        className="w-full bg-indigo-600 rounded-lg py-3 items-center mb-3"
        onPress={testQuery}
      >
        <Text className="text-white font-semibold">Test Supabase</Text>
      </Pressable>

      <Pressable
        className="w-full bg-gray-800 rounded-lg py-3 items-center"
        onPress={signOut}
      >
        <Text className="text-white font-semibold">Sign Out</Text>
      </Pressable>
    </View>
  )
}
