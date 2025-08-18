import { spacing, radius } from './tokens'

export type Palette = {
  primary: string
  secondary: string
  tertiary: string
  surface: string
  surfaceAlt: string
  text: string
  textMuted: string
  border: string
  buttonBg: string
}

export type Theme = {
  colors: Palette
  spacing: typeof spacing
  radius: typeof radius
}

const lightColors: Palette = {
  primary: '#0f172a',
  secondary: '#475569',
  tertiary: '#2563eb',
  surface: '#ffffff',
  surfaceAlt: '#f1f5f9',
  text: '#0f172a',
  textMuted: '#64748b',
  border: '#e5e7eb',
  buttonBg: '#e5e7eb',
}

const darkColors: Palette = {
  primary: '#f8fafc',
  secondary: '#cbd5e1',
  tertiary: '#93c5fd',
  surface: '#0b0b0b',
  surfaceAlt: '#111318',
  text: '#f8fafc',
  textMuted: '#94a3b8',
  border: '#374151',
  buttonBg: '#262b33',
}

export const lightTheme: Theme = { colors: lightColors, spacing, radius }
export const darkTheme: Theme = { colors: darkColors, spacing, radius }
