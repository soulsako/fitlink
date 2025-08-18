import { StyleSheet } from 'react-native'
import type { Theme } from '../../styles/themes'

export const makeStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.surface,
      padding: theme.spacing.xl,
      alignItems: 'center',
      justifyContent: 'center',
    },
    title: {
      color: theme.colors.text,
      fontSize: 20,
      fontWeight: '700',
      marginBottom: theme.spacing.lg,
    },
  })
