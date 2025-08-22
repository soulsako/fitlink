import type React from 'react';
import { StyleSheet } from 'react-native';
import { Button, useTheme } from 'react-native-paper';

interface PrimaryButtonProps {
  title: string;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
  style?: any;
  mode?: 'contained' | 'outlined' | 'text';
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  title,
  onPress,
  loading = false,
  disabled = false,
  style,
  mode = 'contained',
}) => {
  const theme = useTheme();

  return (
    <Button
      mode={mode}
      onPress={onPress}
      loading={loading}
      disabled={disabled}
      style={[styles.button, style]}
      contentStyle={styles.buttonContent}
      labelStyle={styles.buttonLabel}
      buttonColor={mode === 'contained' ? theme.colors.primary : undefined}
    >
      {title}
    </Button>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    marginVertical: 6,
  },
  buttonContent: {
    paddingVertical: 6,
    minHeight: 48,
  },
  buttonLabel: {
    fontSize: 16,
    fontWeight: '500',
  },
});

export default PrimaryButton;
