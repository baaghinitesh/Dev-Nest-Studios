import React, { createContext, useContext, useState, useEffect } from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { completeThemes, ThemeMode, Theme } from '../styles/themes';

interface ThemeContextType {
  currentTheme: ThemeMode;
  theme: Theme;
  setTheme: (theme: ThemeMode) => void;
  availableThemes: { id: ThemeMode; name: string }[];
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState<ThemeMode>(() => {
    // Get saved theme from localStorage or default to light
    const saved = localStorage.getItem('devneststudios-theme');
    return (saved as ThemeMode) || 'light';
  });

  const setTheme = (theme: ThemeMode) => {
    setCurrentTheme(theme);
    localStorage.setItem('devneststudios-theme', theme);
  };

  const availableThemes = [
    { id: 'light' as ThemeMode, name: 'Light Mode' },
    { id: 'dark' as ThemeMode, name: 'Dark Mode' },
    { id: 'blue' as ThemeMode, name: 'Ocean Blue' },
    { id: 'purple' as ThemeMode, name: 'Royal Purple' },
    { id: 'green' as ThemeMode, name: 'Nature Green' },
  ];

  const theme = completeThemes[currentTheme];

  useEffect(() => {
    // Apply theme to document body for global styles
    document.body.style.backgroundColor = theme.colors.background.primary;
    document.body.style.color = theme.colors.text.primary;
    document.body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
  }, [theme]);

  return (
    <ThemeContext.Provider
      value={{
        currentTheme,
        theme,
        setTheme,
        availableThemes,
      }}
    >
      <StyledThemeProvider theme={theme}>
        {children}
      </StyledThemeProvider>
    </ThemeContext.Provider>
  );
};