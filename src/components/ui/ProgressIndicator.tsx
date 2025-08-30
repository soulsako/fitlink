import { theme } from '@/styles/theme';
import type React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';

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
  const { width } = Dimensions.get('window');
  const progressWidth = (currentStep / totalSteps) * (width - 32);

  return (
    <View style={[styles.container, style]}>
      <View
        style={[styles.progressBar, { backgroundColor: theme.colors.gray200 }]}
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

export default ProgressIndicator;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
  },
  progressBar: {
    height: 4,
    borderRadius: theme.borderRadius.sm,
    overflow: 'hidden',
  },
  progress: {
    height: '100%',
    borderRadius: theme.borderRadius.sm,
  },
});
