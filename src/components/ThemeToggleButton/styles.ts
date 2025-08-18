import { StyleSheet } from 'react-native'
import type { Theme } from '../../styles/themes'

export const makeStyles = (theme: Theme) =>
  StyleSheet.create({
    wrapper: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    button: {
      paddingHorizontal: theme.spacing.lg,
      paddingVertical: theme.spacing.md,
      borderRadius: theme.radius.md,
      backgroundColor: theme.colors.buttonBg,
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
    buttonText: {
      color: theme.colors.text,
      fontSize: 16,
      fontWeight: '600',
    },
  })
