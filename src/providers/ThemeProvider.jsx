'use client';

import { useEffect, useState, createContext, useContext } from 'react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';

const ThemeContext = createContext(null);

export const ThemeProvider = ({ children, ...props }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <NextThemesProvider {...props} attribute="class" defaultTheme="light" storageKey="kindora-theme">
      {children}
    </NextThemesProvider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider');
  return context;
};
