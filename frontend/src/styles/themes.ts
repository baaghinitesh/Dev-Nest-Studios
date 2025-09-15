// Base theme structure
interface BaseTheme {
  fonts: {
    primary: string;
    secondary: string;
    mono: string;
    sizes: Record<string, string>;
    weights: Record<string, number>;
    lineHeights: Record<string, number>;
  };
  spacing: Record<string, string>;
  borderRadius: Record<string, string>;
  shadows: Record<string, string>;
  breakpoints: Record<string, string>;
  zIndex: Record<string, string | number>;
  transitions: {
    fast: string;
    normal: string;
    slow: string;
    colors: string;
    transform: string;
    opacity: string;
    shadow: string;
    all: string;
  };
  maxWidth: string;
  layout: Record<string, string>;
  components: Record<string, any>;
}

// Colors interface for better type safety
interface ThemeColors {
  primary: {
    light: string;
    main: string;
    dark: string;
    darker: string;
  };
  secondary: {
    light: string;
    main: string;
    dark: string;
  };
  success: {
    light: string;
    main: string;
    dark: string;
  };
  warning: {
    light: string;
    main: string;
    dark: string;
  };
  error: {
    light: string;
    main: string;
    dark: string;
  };
  info: {
    light: string;
    main: string;
    dark: string;
  };
  text: {
    primary: string;
    secondary: string;
    muted: string;
    disabled: string;
    inverse: string;
  };
  background: {
    primary: string;
    secondary: string;
    tertiary: string;
    dark: string;
    overlay: string;
    light: string;
    paper: string;
  };
  border: {
    light: string;
    main: string;
    dark: string;
    primary: string;
  };
  accent: string;
  accentHover: string;
  gradients: {
    primary: string;
    secondary: string;
    success: string;
    dark: string;
    hero: string;
  };
}

// Theme variants
export const themes = {
  // Light Theme
  light: {
    id: 'light',
    name: 'Light Mode',
    colors: {
      primary: {
        light: '#667eea',
        main: '#4f46e5',
        dark: '#3730a3',
        darker: '#312e81',
      },
      secondary: {
        light: '#f59e0b',
        main: '#d97706',
        dark: '#b45309',
      },
      success: {
        light: '#f0fdf4',
        main: '#059669',
        dark: '#047857',
      },
      warning: {
        light: '#fef3c7',
        main: '#f59e0b',
        dark: '#d97706',
      },
      error: {
        light: '#fef2f2',
        main: '#ef4444',
        dark: '#dc2626',
      },
      info: {
        light: '#dbeafe',
        main: '#3b82f6',
        dark: '#2563eb',
      },
      text: {
        primary: '#1f2937',
        secondary: '#4b5563',
        muted: '#9ca3af',
        disabled: '#d1d5db',
        inverse: '#ffffff',
      },
      background: {
        primary: '#ffffff',
        secondary: '#f9fafb',
        tertiary: '#f3f4f6',
        dark: '#111827',
        overlay: 'rgba(0, 0, 0, 0.5)',
        light: '#f9fafb',
        paper: '#ffffff',
      },
      border: {
        light: '#e5e7eb',
        main: '#d1d5db',
        dark: '#9ca3af',
        primary: '#d1d5db',
      },
      accent: '#f97316',
      accentHover: '#ea580c',
      gradients: {
        primary: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        secondary: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        success: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
        dark: 'linear-gradient(135deg, #2d3748 0%, #1a202c 100%)',
        hero: 'linear-gradient(135deg, rgba(79, 70, 229, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)',
      },
    },
  },

  // Dark Theme
  dark: {
    id: 'dark',
    name: 'Dark Mode',
    colors: {
      primary: {
        light: '#818cf8',
        main: '#6366f1',
        dark: '#4f46e5',
        darker: '#4338ca',
      },
      secondary: {
        light: '#fbbf24',
        main: '#f59e0b',
        dark: '#d97706',
      },
      success: {
        light: '#34d399',
        main: '#10b981',
        dark: '#059669',
      },
      warning: {
        light: '#fbbf24',
        main: '#f59e0b',
        dark: '#d97706',
      },
      error: {
        light: '#f87171',
        main: '#ef4444',
        dark: '#dc2626',
      },
      info: {
        light: '#60a5fa',
        main: '#3b82f6',
        dark: '#2563eb',
      },
      text: {
        primary: '#f9fafb',
        secondary: '#d1d5db',
        muted: '#9ca3af',
        disabled: '#6b7280',
        inverse: '#1f2937',
      },
      background: {
        primary: '#111827',
        secondary: '#1f2937',
        tertiary: '#374151',
        dark: '#030712',
        overlay: 'rgba(0, 0, 0, 0.8)',
        light: '#1f2937',
        paper: '#1f2937',
      },
      border: {
        light: '#374151',
        main: '#4b5563',
        dark: '#6b7280',
        primary: '#374151',
      },
      accent: '#fb7185',
      accentHover: '#f43f5e',
      gradients: {
        primary: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        secondary: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        success: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
        dark: 'linear-gradient(135deg, #0f172a 0%, #020617 100%)',
        hero: 'linear-gradient(135deg, rgba(99, 102, 241, 0.2) 0%, rgba(139, 92, 246, 0.2) 100%)',
      },
    },
  },

  // Blue Theme
  blue: {
    id: 'blue',
    name: 'Ocean Blue',
    colors: {
      primary: {
        light: '#60a5fa',
        main: '#3b82f6',
        dark: '#2563eb',
        darker: '#1d4ed8',
      },
      secondary: {
        light: '#38bdf8',
        main: '#0ea5e9',
        dark: '#0284c7',
      },
      success: {
        light: '#4ade80',
        main: '#22c55e',
        dark: '#16a34a',
      },
      warning: {
        light: '#fbbf24',
        main: '#f59e0b',
        dark: '#d97706',
      },
      error: {
        light: '#f87171',
        main: '#ef4444',
        dark: '#dc2626',
      },
      info: {
        light: '#60a5fa',
        main: '#3b82f6',
        dark: '#2563eb',
      },
      text: {
        primary: '#0f172a',
        secondary: '#334155',
        muted: '#64748b',
        disabled: '#cbd5e1',
        inverse: '#ffffff',
      },
      background: {
        primary: '#ffffff',
        secondary: '#f8fafc',
        tertiary: '#f1f5f9',
        dark: '#0f172a',
        overlay: 'rgba(15, 23, 42, 0.5)',
        light: '#f8fafc',
        paper: '#ffffff',
      },
      border: {
        light: '#e2e8f0',
        main: '#cbd5e1',
        dark: '#94a3b8',
        primary: '#e2e8f0',
      },
      accent: '#0ea5e9',
      accentHover: '#0284c7',
      gradients: {
        primary: 'linear-gradient(135deg, #3b82f6 0%, #1e40af 100%)',
        secondary: 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)',
        success: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
        dark: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
        hero: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(14, 165, 233, 0.1) 100%)',
      },
    },
  },

  // Purple Theme
  purple: {
    id: 'purple',
    name: 'Royal Purple',
    colors: {
      primary: {
        light: '#c084fc',
        main: '#a855f7',
        dark: '#9333ea',
        darker: '#7c3aed',
      },
      secondary: {
        light: '#f472b6',
        main: '#ec4899',
        dark: '#db2777',
      },
      success: {
        light: '#4ade80',
        main: '#22c55e',
        dark: '#16a34a',
      },
      warning: {
        light: '#fbbf24',
        main: '#f59e0b',
        dark: '#d97706',
      },
      error: {
        light: '#f87171',
        main: '#ef4444',
        dark: '#dc2626',
      },
      info: {
        light: '#c084fc',
        main: '#a855f7',
        dark: '#9333ea',
      },
      text: {
        primary: '#1e1b4b',
        secondary: '#4c1d95',
        muted: '#7c3aed',
        disabled: '#c4b5fd',
        inverse: '#ffffff',
      },
      background: {
        primary: '#ffffff',
        secondary: '#faf5ff',
        tertiary: '#f3e8ff',
        dark: '#1e1b4b',
        overlay: 'rgba(30, 27, 75, 0.5)',
        light: '#faf5ff',
        paper: '#ffffff',
      },
      border: {
        light: '#e9d5ff',
        main: '#d8b4fe',
        dark: '#c084fc',
        primary: '#e9d5ff',
      },
      accent: '#ec4899',
      accentHover: '#db2777',
      gradients: {
        primary: 'linear-gradient(135deg, #a855f7 0%, #7c3aed 100%)',
        secondary: 'linear-gradient(135deg, #ec4899 0%, #db2777 100%)',
        success: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
        dark: 'linear-gradient(135deg, #4c1d95 0%, #1e1b4b 100%)',
        hero: 'linear-gradient(135deg, rgba(168, 85, 247, 0.1) 0%, rgba(236, 72, 153, 0.1) 100%)',
      },
    },
  },

  // Green Theme
  green: {
    id: 'green',
    name: 'Nature Green',
    colors: {
      primary: {
        light: '#4ade80',
        main: '#22c55e',
        dark: '#16a34a',
        darker: '#15803d',
      },
      secondary: {
        light: '#84cc16',
        main: '#65a30d',
        dark: '#4d7c0f',
      },
      success: {
        light: '#4ade80',
        main: '#22c55e',
        dark: '#16a34a',
      },
      warning: {
        light: '#fbbf24',
        main: '#f59e0b',
        dark: '#d97706',
      },
      error: {
        light: '#f87171',
        main: '#ef4444',
        dark: '#dc2626',
      },
      info: {
        light: '#4ade80',
        main: '#22c55e',
        dark: '#16a34a',
      },
      text: {
        primary: '#14532d',
        secondary: '#166534',
        muted: '#22c55e',
        disabled: '#bbf7d0',
        inverse: '#ffffff',
      },
      background: {
        primary: '#ffffff',
        secondary: '#f0fdf4',
        tertiary: '#dcfce7',
        dark: '#14532d',
        overlay: 'rgba(20, 83, 45, 0.5)',
        light: '#f0fdf4',
        paper: '#ffffff',
      },
      border: {
        light: '#dcfce7',
        main: '#bbf7d0',
        dark: '#86efac',
        primary: '#dcfce7',
      },
      accent: '#65a30d',
      accentHover: '#4d7c0f',
      gradients: {
        primary: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
        secondary: 'linear-gradient(135deg, #65a30d 0%, #4d7c0f 100%)',
        success: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
        dark: 'linear-gradient(135deg, #166534 0%, #14532d 100%)',
        hero: 'linear-gradient(135deg, rgba(34, 197, 94, 0.1) 0%, rgba(101, 163, 13, 0.1) 100%)',
      },
    },
  },
};

// Common theme properties
const commonTheme: BaseTheme = {
  // Typography
  fonts: {
    primary: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif",
    secondary: "'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif",
    mono: "'Fira Code', 'Monaco', 'Cascadia Code', 'Roboto Mono', Consolas, monospace",
    
    sizes: {
      xs: '0.75rem',    // 12px
      sm: '0.875rem',   // 14px
      base: '1rem',     // 16px
      body: '1rem',     // 16px
      lg: '1.125rem',   // 18px
      xl: '1.25rem',    // 20px
      '2xl': '1.5rem',  // 24px
      '3xl': '1.875rem', // 30px
      '4xl': '2.25rem', // 36px
      '5xl': '3rem',    // 48px
      '6xl': '3.75rem', // 60px
      
      // Semantic sizes
      h1: 'clamp(2.25rem, 5vw, 3.75rem)', // 36-60px
      h2: 'clamp(1.875rem, 4vw, 3rem)',   // 30-48px
      h3: 'clamp(1.5rem, 3vw, 2.25rem)',  // 24-36px
      h4: 'clamp(1.25rem, 2.5vw, 1.875rem)', // 20-30px
      h5: '1.125rem', // 18px
      h6: '1rem',     // 16px
    },
    
    weights: {
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extrabold: 800,
    },
    
    lineHeights: {
      tight: 1.2,
      normal: 1.5,
      relaxed: 1.6,
      loose: 1.8,
    },
  },

  // Spacing (based on 8px grid)
  spacing: {
    xs: '0.25rem',   // 4px
    sm: '0.5rem',    // 8px
    md: '1rem',      // 16px
    lg: '1.5rem',    // 24px
    xl: '2rem',      // 32px
    xxl: '2.5rem',   // 40px
    '2xl': '3rem',   // 48px
    '3xl': '4rem',   // 64px
    '4xl': '6rem',   // 96px
    '5xl': '8rem',   // 128px
    '6xl': '12rem',  // 192px
  },

  // Border radius
  borderRadius: {
    none: '0',
    sm: '0.25rem',   // 4px
    md: '0.5rem',    // 8px
    lg: '0.75rem',   // 12px
    xl: '1rem',      // 16px
    '2xl': '1.5rem', // 24px
    '3xl': '2rem',   // 32px
    full: '9999px',
  },

  // Box shadows
  shadows: {
    none: 'none',
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
    
    // Colored shadows
    primarySm: '0 1px 2px 0 rgba(79, 70, 229, 0.1)',
    primaryMd: '0 4px 6px -1px rgba(79, 70, 229, 0.2)',
    primaryLg: '0 10px 15px -3px rgba(79, 70, 229, 0.2)',
  },

  // Responsive breakpoints
  breakpoints: {
    xs: '475px',
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },

  // Z-index scale
  zIndex: {
    hide: -1,
    auto: 'auto',
    base: 0,
    docked: 10,
    dropdown: 1000,
    sticky: 1100,
    fixed: 1150,
    banner: 1200,
    overlay: 1300,
    modal: 1400,
    popover: 1500,
    skipLink: 1600,
    toast: 1700,
    tooltip: 1800,
  },

  // Transitions
  transitions: {
    fast: '150ms ease',
    normal: '250ms ease',
    slow: '350ms ease',
    
    // Specific transitions
    colors: 'color 150ms ease, background-color 150ms ease, border-color 150ms ease',
    transform: 'transform 250ms ease',
    opacity: 'opacity 200ms ease',
    shadow: 'box-shadow 250ms ease',
    all: 'all 250ms ease',
  },

  // Container max-width
  maxWidth: '1200px',
  
  // Layout properties
  layout: {
    containerMaxWidth: '1200px',
    sidebarWidth: '16rem',
    headerHeight: '4rem',
    footerHeight: '12rem',
  },
  
  // Component-specific theme values
  components: {
    button: {
      height: {
        sm: '2rem',      // 32px
        md: '2.5rem',    // 40px
        lg: '3rem',      // 48px
        xl: '3.5rem',    // 56px
      },
      padding: {
        sm: '0.5rem 1rem',
        md: '0.75rem 1.5rem',
        lg: '1rem 2rem',
        xl: '1.25rem 2.5rem',
      },
    },
    
    card: {
      padding: '1.5rem',
      borderRadius: '0.75rem',
      shadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    },
    
    input: {
      height: {
        sm: '2rem',
        md: '2.5rem',
        lg: '3rem',
      },
      padding: {
        sm: '0.5rem 0.75rem',
        md: '0.75rem 1rem',
        lg: '1rem 1.25rem',
      },
    },
    
    navbar: {
      height: '4rem', // 64px
      zIndex: 1100,
    },
    
    sidebar: {
      width: '16rem', // 256px
      zIndex: 1000,
    },
    
    footer: {
      height: 'auto',
      minHeight: '12rem', // 192px
    },
  },
};

// Create complete themes by merging colors with common theme
export const createTheme = (themeVariant: any) => ({
  ...commonTheme,
  ...themeVariant,
});

// Export all complete themes
export const completeThemes = {
  light: createTheme(themes.light),
  dark: createTheme(themes.dark),
  blue: createTheme(themes.blue),
  purple: createTheme(themes.purple),
  green: createTheme(themes.green),
};

// Default theme (light)
export const theme = completeThemes.light;

export type ThemeMode = keyof typeof completeThemes;
export type Theme = typeof theme & { colors: ThemeColors };