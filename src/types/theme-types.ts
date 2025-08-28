import type { MD3Theme } from 'react-native-paper';

// Custom color extensions
export interface ExtendedColors {
  // Inputs
  inputText: string;
  inputPlaceholder: string;
  inputOutline: string;
  inputFocusOutline: string;
  inputBackground: string;
  inputError: string;

  // Social buttons
  socialGoogleBg: string;
  socialGoogleText: string;
  socialGoogleBorder: string;
  socialGoogleIcon: string;

  socialAppleBg: string;
  socialAppleText: string;
  socialAppleBorder: string;
  socialAppleIcon: string;

  socialFacebookBg: string;
  socialFacebookText: string;
  socialFacebookBorder: string;
  socialFacebookIcon: string;
}

// Extended theme type
export interface ExtendedTheme extends MD3Theme {
  colors: MD3Theme['colors'] & ExtendedColors;
}
