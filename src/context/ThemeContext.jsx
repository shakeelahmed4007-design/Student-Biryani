import { createContext, useContext, useEffect, useState } from 'react';

export const THEMES = [
  {
    id: 'saffron',
    name: 'Royal Saffron',
    subtitle: 'Golden Dum Special',
    description: 'Classic Student Biryani golden dum vibes',
    swatch: ['#F59E0B', '#0F172A'],
    badge: 'Classic',
    primaryColor: '#0F172A',
    accentColor: '#F59E0B',
  },
  {
    id: 'chili',
    name: 'Karahi Red',
    subtitle: 'Fiery Chili Spice',
    description: 'Fiery crimson & bold spicy food aesthetic',
    swatch: ['#EF4444', '#991B1B'],
    badge: 'Spicy 🔥',
    primaryColor: '#991B1B',
    accentColor: '#EF4444',
  },
  {
    id: 'emerald',
    name: 'Peshawari Mint',
    subtitle: 'Fresh Mint & Herb',
    description: 'Fresh herbal green & cooling aromas',
    swatch: ['#10B981', '#064E3B'],
    badge: 'Fresh 🌿',
    primaryColor: '#064E3B',
    accentColor: '#10B981',
  },
  {
    id: 'royal',
    name: 'Degi Shahi',
    subtitle: 'Royal Feast Violet',
    description: 'Luxurious royal feast in purple & warm gold',
    swatch: ['#8B5CF6', '#4C1D95'],
    badge: 'Royal 👑',
    primaryColor: '#4C1D95',
    accentColor: '#8B5CF6',
  },
  {
    id: 'midnight',
    name: 'Midnight Gourmet',
    subtitle: 'Dark Mode Luxury',
    description: 'Sleek luxury dark mode for late-night cravings',
    swatch: ['#0B0F19', '#F59E0B'],
    badge: 'Dark 🌙',
    primaryColor: '#F59E0B',
    accentColor: '#FBBF24',
  },
];

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    try {
      const saved = localStorage.getItem('sb-theme');
      return THEMES.some(t => t.id === saved) ? saved : 'saffron';
    } catch {
      return 'saffron';
    }
  });

  const [themeModalOpen, setThemeModalOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('sb-theme', theme);
    } catch {
      // storage unavailable
    }
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const activeTheme = THEMES.find(t => t.id === theme) || THEMES[0];

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
        activeTheme,
        themes: THEMES,
        themeModalOpen,
        openThemeModal: () => setThemeModalOpen(true),
        closeThemeModal: () => setThemeModalOpen(false),
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return ctx;
};
