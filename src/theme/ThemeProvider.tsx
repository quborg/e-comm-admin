import React, { FC, useCallback, useContext, useState } from 'react';

import {
  createMuiTheme,
  PaletteType,
  Theme,
  ThemeProvider,
  useMediaQuery,
} from '@material-ui/core';
import KEYS from 'src/defs/keys';

import { initialThemeObject } from './styles/core';

type ThemePreferenceObject = { prefersDarkMode: boolean };

export type ThemeData = {
  theme: Theme;
  toggleTheme: () => void;
};

class LocalTheme {
  static setLocalTheme(isDark: boolean): void {
    if ('localStorage' in window) {
      const themePreferenceObject: ThemePreferenceObject = {
        prefersDarkMode: isDark === true,
      };
      localStorage.setItem(KEYS.prefersDarkMode, JSON.stringify(themePreferenceObject));
    }
  }

  static getLocalTheme(): PaletteType {
    if ('localStorage' in window) {
      const themePreferenceString = localStorage.getItem(KEYS.prefersDarkMode);
      if (themePreferenceString) {
        try {
          const themePreferenceParsed = JSON.parse(
            themePreferenceString
          ) as ThemePreferenceObject;
          return themePreferenceParsed.prefersDarkMode ? 'dark' : 'light';
        } catch {
          return 'light';
        }
      }
    }
    return 'light';
  }
}

function TypeMode(): PaletteType {
  const [prefersDarkMode] = useState(
    useMediaQuery('(prefers-color-scheme: dark)') || LocalTheme.getLocalTheme() === 'dark'
  );
  return prefersDarkMode ? 'dark' : 'light';
}

export function CreateTheme(): ThemeData {
  const type = TypeMode();
  const [theme, setTheme] = useState<Theme>(
    createMuiTheme({
      ...initialThemeObject(type),
    })
  );

  const toggleTheme = useCallback(() => {
    setTheme((currentTheme) => {
      const isNewThemeDark = currentTheme.palette.type !== 'dark';
      LocalTheme.setLocalTheme(isNewThemeDark);
      if (isNewThemeDark) return createMuiTheme(initialThemeObject('dark'));
      return createMuiTheme(initialThemeObject('dark'));
    });
  }, []);

  return { theme, toggleTheme };
}

export const ThemeContext = React.createContext<ThemeData>({
  theme: createMuiTheme(initialThemeObject()),
  toggleTheme: () => {},
});

export function useTheme(): ThemeData {
  return useContext(ThemeContext);
}

const CustomThemeProvider: FC = ({ children }) => {
  const theme = CreateTheme();
  return (
    <ThemeContext.Provider value={theme}>
      <ThemeProvider theme={theme.theme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
};

export default CustomThemeProvider;
