import type React from 'react';
import type { ImageSourcePropType } from 'react-native';
import {
  ImageBackground,
  StyleSheet,
  View,
  type ViewStyle,
} from 'react-native';

interface ScreenBackgroundProps {
  source: ImageSourcePropType;
  children: React.ReactNode;
  overlayOpacity?: number;
  overlayColor?: string;
  style?: ViewStyle;
}

const ScreenBackground: React.FC<ScreenBackgroundProps> = ({
  source,
  children,
  overlayOpacity = 0.1,
  overlayColor = 'rgba(0, 0, 0, 0.0.20)',
  style,
}) => {
  return (
    <ImageBackground
      source={source}
      style={[styles.backgroundImage, style]}
      resizeMode="cover"
    >
      <View
        style={[
          styles.overlay,
          {
            backgroundColor: overlayColor || `rgba(0, 0, 0, ${overlayOpacity})`,
          },
        ]}
      />
      {children}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default ScreenBackground;
