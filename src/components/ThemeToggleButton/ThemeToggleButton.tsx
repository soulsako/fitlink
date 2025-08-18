import React from 'react'
import { Pressable, Text, View } from 'react-native'
import { useTheme } from '../../theme/ThemeContext'
import { makeStyles } from './styles'

export default function ThemeToggleButton() {
  const { scheme, toggleScheme, theme } = useTheme()
  const styles = makeStyles(theme)

  return (
    <View style={styles.wrapper}>
      <Pressable style={styles.button} onPress={toggleScheme}>
        <Text style={styles.buttonText}>
          Toggle theme ({scheme}) {scheme === 'dark' ? '🌙' : '🌞'}
        </Text>
      </Pressable>
    </View>
  )
}
