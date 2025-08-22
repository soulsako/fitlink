// src/components/ui/ProgressIndicator.tsx
import type React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { useTheme } from '../../providers/ThemeProvider';

interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
  style?: any;
}

const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  currentStep,
  totalSteps,
  style,
}) => {
  const { theme } = useTheme();
  const { width } = Dimensions.get('window');
  const progressWidth = (currentStep / totalSteps) * (width - 32);

  return (
    <View style={[styles.container, style]}>
      <View
        style={[
          styles.progressBar,
          { backgroundColor: theme.colors.surfaceVariant },
        ]}
      >
        <View
          style={[
            styles.progress,
            {
              width: progressWidth,
              backgroundColor: theme.colors.primary,
            },
          ]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  progressBar: {
    height: 4,
    borderRadius: 2,
    overflow: 'hidden',
  },
  progress: {
    height: '100%',
    borderRadius: 2,
  },
});

export default ProgressIndicator;
