import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
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
      gradients: {
        primary: string;
        secondary: string;
        success: string;
        dark: string;
        hero: string;
      };
    };
    fonts: {
      primary: string;
      secondary: string;
      mono: string;
      sizes: {
        xs: string;
        sm: string;
        base: string;
        body: string;
        lg: string;
        xl: string;
        '2xl': string;
        '3xl': string;
        '4xl': string;
        '5xl': string;
        '6xl': string;
        h1: string;
        h2: string;
        h3: string;
        h4: string;
        h5: string;
        h6: string;
      };
      weights: {
        light: number;
        normal: number;
        medium: number;
        semibold: number;
        bold: number;
        extrabold: number;
      };
      lineHeights: {
        tight: number;
        normal: number;
        relaxed: number;
        loose: number;
      };
    };
    spacing: {
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
      xxl: string;
      '2xl': string;
      '3xl': string;
      '4xl': string;
      '5xl': string;
      '6xl': string;
    };
    borderRadius: {
      none: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
      '2xl': string;
      full: string;
    };
    shadows: {
      none: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
      '2xl': string;
      inner: string;
    };
    transitions: {
      fast: string;
      normal: string;
      slow: string;
      all: string;
    };
    breakpoints: {
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
      '2xl': string;
    };
    zIndex: {
      hide: number;
      base: number;
      dropdown: number;
      sticky: number;
      fixed: number;
      overlay: number;
      modal: number;
      popover: number;
      tooltip: number;
      toast: number;
    };
    maxWidth: string;
    layout: {
      container: {
        sm: string;
        md: string;
        lg: string;
        xl: string;
        '2xl': string;
      };
      navbar: {
        height: string;
        zIndex: number;
      };
      sidebar: {
        width: string;
        zIndex: number;
      };
      footer: {
        height: string;
        minHeight: string;
      };
    };
  }
}