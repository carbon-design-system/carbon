import { GlobalTheme } from '@carbon/react';
import React, { createContext, useContext, useEffect, useState } from 'react';

const ThemePreferenceContext = createContext({
  theme: 'g10',
  setTheme: () => null,
});

function useThemePreference() {
  return useContext(ThemePreferenceContext);
}

function ThemePreference({ children }) {
  const [theme, setTheme] = useState('g10');
  const value = {
    theme,
    setTheme,
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-carbon-theme', theme);
  }, [theme]);

  return (
    <ThemePreferenceContext.Provider value={value}>
      <GlobalTheme theme={theme}>{children}</GlobalTheme>
    </ThemePreferenceContext.Provider>
  );
}

export { ThemePreference, useThemePreference };
