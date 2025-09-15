export const theme = {
  // Colors
  colors: {
    // Primary brand colors
    primary: {
      light: '#667eea',
      main: '#4f46e5',
      dark: '#3730a3',
      darker: '#312e81',
    },
    
    // Secondary colors
    secondary: {
      light: '#f59e0b',
      main: '#d97706',
      dark: '#b45309',
    },
    
    // Success colors
    success: {
      light: '#f0fdf4',
      main: '#059669',
      dark: '#047857',
    },
    
    // Warning colors
    warning: {
      light: '#f59e0b',
      main: '#d97706',
      dark: '#b45309',
    },
    
    // Error colors
    error: {
      light: '#fef2f2',
      main: '#ef4444',
      dark: '#dc2626',
    },
    
    // Info colors
    info: {
      light: '#60a5fa',
      main: '#3b82f6',
      dark: '#2563eb',
    },
    
    // Text colors
    text: {
      primary: '#1f2937',
      secondary: '#4b5563',
      muted: '#9ca3af',
      disabled: '#d1d5db',
      inverse: '#ffffff',
    },
    
    // Background colors
    background: {
      primary: '#ffffff',
      secondary: '#f9fafb',
      tertiary: '#f3f4f6',
      dark: '#111827',
      overlay: 'rgba(0, 0, 0, 0.5)',
      light: '#f9fafb',
      paper: '#ffffff',
    },
    
    // Border colors
    border: {
      light: '#e5e7eb',
      main: '#d1d5db',
      dark: '#9ca3af',
      primary: '#d1d5db',
    },
    
    // Accent colors
    accent: '#f97316',
    accentHover: '#ea580c',
    
    // Gradient backgrounds
    gradients: {
      primary: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      secondary: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      success: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      dark: 'linear-gradient(135deg, #2d3748 0%, #1a202c 100%)',
      hero: 'linear-gradient(135deg, rgba(79, 70, 229, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)',
    },
  },
  
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
    full: '9999px',
  },
  
  // Shadows
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
    none: 'none',
    
    // Colored shadows
    primary: '0 10px 25px -5px rgba(79, 70, 229, 0.3)',
    success: '0 10px 25px -5px rgba(5, 150, 105, 0.3)',
    warning: '0 10px 25px -5px rgba(217, 119, 6, 0.3)',
    error: '0 10px 25px -5px rgba(239, 68, 68, 0.3)',
  },
  
  // Breakpoints
  breakpoints: {
    xs: '320px',
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

export type Theme = typeof theme;