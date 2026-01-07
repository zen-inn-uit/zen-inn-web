'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

type ThemeMode = 'light' | 'primary';

interface ThemeContextType {
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
  toggleMode: () => void;
  getBackgroundClass: () => string;
  getTextClass: () => string;
  getBorderClass: () => string;
  getCardClass: () => string;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<ThemeMode>('light');

  const toggleMode = () => {
    setMode(prev => prev === 'light' ? 'primary' : 'light');
  };

  const getBackgroundClass = () => {
    return mode === 'light' ? 'bg-white' : 'bg-[#FDFBF7]';
  };

  const getTextClass = () => {
    return mode === 'light' ? 'text-slate-900' : 'text-[#3d2e1f]';
  };

  const getBorderClass = () => {
    return mode === 'light' ? 'border-slate-200' : 'border-[#E5D5C3]';
  };

  const getCardClass = () => {
    return mode === 'light' ? 'bg-white border-slate-200' : 'bg-white border-[#E5D5C3]';
  };

  return (
    <ThemeContext.Provider value={{ 
      mode, 
      setMode, 
      toggleMode, 
      getBackgroundClass, 
      getTextClass, 
      getBorderClass,
      getCardClass 
    }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}
