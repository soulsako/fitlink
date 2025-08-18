import React from 'react';
import { useTheme } from './ThemeContext';

export function withTheme<P extends object>(
  Component: React.ComponentType<P & ReturnType<typeof useTheme>>,
) {
  return function ThemedComponent(props: P) {
    const themeCtx = useTheme();
    return <Component {...props} {...themeCtx} />;
  };
}
