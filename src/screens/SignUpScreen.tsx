import { useState } from 'react'

import { View, Text, TextInput, Pressable, Alert } from 'react-native'

import { useAuth } from '../providers/AuthProvider'

export default function SignUpScreen() {
  const { signUp } = useAuth()
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const onSubmit = async () => {
    const err = await signUp(email.trim(), password)
    if (err) {
      Alert.alert('Sign up failed', err.message)
    } else {
      Alert.alert(
        'Check your email',
        'Confirm your account to complete sign up.',
      )
    }
  }

  return (
    <View className="flex-1 justify-center px-4">
      <Text className="text-2xl font-semibold mb-4">Create account</Text>

      <TextInput
        className="border border-gray-300 rounded-lg p-3 mb-3 text-base"
        placeholder="Email"
        placeholderTextColor="#9ca3af"
        autoCapitalize="none"
        keyboardType="email-address"
        value={email}
        onChangeText={t => {
          setEmail(t)
        }}
      />

      <TextInput
        className="border border-gray-300 rounded-lg p-3 mb-4 text-base"
        placeholder="Password"
        placeholderTextColor="#9ca3af"
        secureTextEntry
        value={password}
        onChangeText={t => {
          setPassword(t)
        }}
      />

      <Pressable
        className="bg-emerald-600 rounded-lg py-3 items-center"
        onPress={onSubmit}
      >
        <Text className="text-white font-semibold">Sign Up</Text>
      </Pressable>
    </View>
  )
}
