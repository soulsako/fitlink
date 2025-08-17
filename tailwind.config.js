/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './App.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
    './screens/**/*.{js,jsx,ts,tsx}',
    './providers/**/*.{js,jsx,ts,tsx}',
    './lib/**/*.{js,jsx,ts,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eef2ff',
          100: '#e0e7ff',
          200: '#c7d2fe',
          300: '#a5b4fc',
          400: '#818cf8',
          500: '#6366f1',
          600: '#4f46e5', // primary
          700: '#4338ca',
          800: '#3730a3',
          900: '#312e81',
          DEFAULT: '#4f46e5',
        },
        success: '#10b981',
        warning: '#f59e0b',
        error: '#ef4444',
        surface: {
          50: '#ffffff',
          900: '#0b0b0c',
        },
        muted: '#6b7280',
      },
      spacing: {
        screen: '24', // p-screen => 24px
        card: '16', // p-card => 16px
        tight: '8', // p-tight => 8px
      },
      borderRadius: {
        button: '8',
        card: '12',
        pill: '9999',
      },
      fontSize: {
        title: ['24px', { lineHeight: '32px', fontWeight: '700' }],
        subtitle: ['18px', { lineHeight: '24px', fontWeight: '600' }],
        body: ['16px', { lineHeight: '22px' }],
        caption: ['12px', { lineHeight: '16px' }],
      },
      width: {
        container: '360',
      },
      height: {
        button: '48',
      },
    },
  },
  plugins: [],
};
