import type React from 'react';
import {
  Dimensions,
  ImageBackground,
  type StyleProp,
  StyleSheet,
  View,
  type ViewStyle,
} from 'react-native';
import { useTheme } from '../providers/ThemeProvider';

const { width, height } = Dimensions.get('window');

type Props = {
  children: React.ReactNode;
  lightImage: any; // require('path/to/image.png')
  darkImage: any; // require('path/to/image.png')
  style?: StyleProp<ViewStyle>;
};

export function ThemedBackground({
  children,
  lightImage,
  darkImage,
  style,
}: Props) {
  const { isDark } = useTheme();

  const source = isDark ? darkImage : lightImage;
  const overlayColor = isDark ? 'rgba(0,0,0,0.5)' : 'rgba(0,0,0,0.3)';

  return (
    <ImageBackground
      resizeMode="cover"
      source={source}
      style={[styles.container, style]}
    >
      <View style={[styles.overlay, { backgroundColor: overlayColor }]} />
      {children}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width,
    height,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject, // full cover
  },
});
