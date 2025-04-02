import { createTheme, responsiveFontSizes } from '@mui/material/styles';

// Create a light theme
const lightTheme = {
  palette: {
    mode: 'light',
    primary: {
      main: '#5569ff',
      light: '#8c9eff',
      dark: '#303f9f',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#ff6b9b',
      light: '#ff9bc1',
      dark: '#c73378',
      contrastText: '#ffffff',
    },
    background: {
      default: '#f8f9fa',
      paper: '#ffffff',
      card: '#ffffff',
      subtle: '#f0f2f5',
    },
    text: {
      primary: '#2a3033',
      secondary: '#626c76',
      disabled: '#959da5',
    },
    divider: 'rgba(0, 0, 0, 0.08)',
  },
};

// Create a dark theme with improved contrast
const darkTheme = {
  palette: {
    mode: 'dark',
    primary: {
      main: '#82a5ff', // Brighter and more visible blue
      light: '#adc4ff',
      dark: '#3d4db2',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#ff85ab',
      light: '#ffb7cf',
      dark: '#c4366d',
      contrastText: '#ffffff',
    },
    background: {
      default: '#121212',
      paper: '#1e1e1e',
      card: '#252525',
      subtle: '#2d2d2d',
    },
    text: {
      primary: '#ffffff', // Increased contrast for better readability
      secondary: '#c5cdd7', // Brighter secondary text for better visibility
      disabled: '#8b97a5', // Brighter disabled text
    },
    divider: 'rgba(255, 255, 255, 0.12)', // Slightly more visible dividers
    action: {
      active: '#ffffff', // Ensure active elements are clearly visible
      hover: 'rgba(255, 255, 255, 0.1)',
      selected: 'rgba(130, 165, 255, 0.16)', // Match with primary.main
      disabled: 'rgba(255, 255, 255, 0.3)',
      disabledBackground: 'rgba(255, 255, 255, 0.12)',
    },
  },
};

// Common theme settings for both light and dark
const commonThemeSettings = {
  typography: {
    fontFamily: 'Roboto, sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
      lineHeight: 1.2,
      letterSpacing: '-0.01em',
      '@media (min-width:600px)': {
        fontSize: '3rem',
      },
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 700,
      lineHeight: 1.2,
      letterSpacing: '-0.01em',
      '@media (min-width:600px)': {
        fontSize: '2.5rem',
      },
    },
    h3: {
      fontSize: '1.5rem',
      fontWeight: 600,
      lineHeight: 1.3,
      '@media (min-width:600px)': {
        fontSize: '1.75rem',
      },
    },
    h4: {
      fontSize: '1.25rem',
      fontWeight: 600,
      lineHeight: 1.4,
      '@media (min-width:600px)': {
        fontSize: '1.4rem',
      },
    },
    h5: {
      fontSize: '1.1rem',
      fontWeight: 600,
      lineHeight: 1.5,
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 600,
      lineHeight: 1.5,
    },
    subtitle1: {
      fontSize: '1rem',
      fontWeight: 500,
      lineHeight: 1.5,
    },
    subtitle2: {
      fontSize: '0.875rem',
      fontWeight: 500,
      lineHeight: 1.57,
    },
    body1: {
      fontSize: '1rem',
      fontWeight: 400,
      lineHeight: 1.6,
    },
    body2: {
      fontSize: '0.875rem',
      fontWeight: 400,
      lineHeight: 1.57,
    },
    button: {
      fontSize: '0.875rem',
      fontWeight: 500,
      lineHeight: 1.57,
      textTransform: 'none',
    },
    caption: {
      fontSize: '0.75rem',
      fontWeight: 400,
      lineHeight: 1.5,
    },
    overline: {
      fontSize: '0.75rem',
      fontWeight: 600,
      lineHeight: 1.5,
      textTransform: 'uppercase',
      letterSpacing: '1px',
    },
  },
  shape: {
    borderRadius: 8,
  },
  shadows: [
    'none',
    '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    '0 1px 4px 0 rgba(0, 0, 0, 0.08)',
    '0 1px 8px 0 rgba(0, 0, 0, 0.08)',
    '0 2px 16px -1px rgba(0, 0, 0, 0.08)',
    '0 3px 5px -1px rgba(0, 0, 0, 0.08), 0 3px 4px -1px rgba(0, 0, 0, 0.04)',
    '0 3px 5px -1px rgba(0, 0, 0, 0.1), 0 5px 8px -1px rgba(0, 0, 0, 0.08)',
    '0 4px 5px -2px rgba(0, 0, 0, 0.1), 0 7px 10px -2px rgba(0, 0, 0, 0.06)',
    '0 5px 6px -3px rgba(0, 0, 0, 0.1), 0 9px 12px -3px rgba(0, 0, 0, 0.06)',
    '0 6px 6px -3px rgba(0, 0, 0, 0.1), 0 11px 12px -3px rgba(0, 0, 0, 0.06)',
    '0 6px 7px -4px rgba(0, 0, 0, 0.1), 0 11px 15px -4px rgba(0, 0, 0, 0.08)',
    '0 7px 8px -4px rgba(0, 0, 0, 0.1), 0 13px 19px -4px rgba(0, 0, 0, 0.08)',
    '0 8px 9px -5px rgba(0, 0, 0, 0.1), 0 15px 22px -5px rgba(0, 0, 0, 0.08)',
    '0 8px 10px -5px rgba(0, 0, 0, 0.1), 0 16px 24px -5px rgba(0, 0, 0, 0.08)',
    '0 8px 12px -6px rgba(0, 0, 0, 0.1), 0 18px 28px -6px rgba(0, 0, 0, 0.08)',
    '0 9px 12px -6px rgba(0, 0, 0, 0.1), 0 19px 29px -6px rgba(0, 0, 0, 0.08)',
    '0 10px 14px -6px rgba(0, 0, 0, 0.12), 0 22px 35px -6px rgba(0, 0, 0, 0.1)',
    '0 11px 15px -7px rgba(0, 0, 0, 0.12), 0 24px 38px -7px rgba(0, 0, 0, 0.1)',
    '0 12px 17px -8px rgba(0, 0, 0, 0.14), 0 24px 38px -8px rgba(0, 0, 0, 0.11)',
  ],
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          scrollbarWidth: 'thin',
          '&::-webkit-scrollbar': {
            width: '6px',
            height: '6px',
          },
          '&::-webkit-scrollbar-track': {
            background: 'var(--scrollbar-track, #f1f1f1)',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: 'var(--scrollbar-thumb, rgba(0,0,0,.2))',
            borderRadius: '20px',
          },
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          paddingTop: 24,
          paddingBottom: 24,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '8px 16px',
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 3px 6px 0 rgba(0,0,0,0.1)',
            transform: 'translateY(-1px)',
          },
          transition: 'all 0.2s ease-in-out',
        },
        contained: {
          '&:hover': {
            boxShadow: '0 4px 10px 0 rgba(0,0,0,0.12)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 2px 12px 0 rgba(0,0,0,0.05)',
          overflow: 'hidden',
          transition: 'transform 0.3s, box-shadow 0.3s',
          '&:hover': {
            boxShadow: '0 6px 16px 0 rgba(0,0,0,0.08)',
            transform: 'translateY(-2px)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
        elevation1: {
          boxShadow: '0 1px 4px 0 rgba(0,0,0,0.05)',
        },
        elevation2: {
          boxShadow: '0 2px 8px 0 rgba(0,0,0,0.08)',
        },
        elevation3: {
          boxShadow: '0 3px 12px 0 rgba(0,0,0,0.1)',
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        gutterBottom: {
          marginBottom: '1em',
        },
      },
    },
  },
};

// Function to get the theme based on mode
export const getAppTheme = (mode) => {
  const themeOptions = mode === 'dark' ? darkTheme : lightTheme;

  const theme = createTheme({
    ...themeOptions,
    ...commonThemeSettings,
  });

  return responsiveFontSizes(theme);
};

// Default theme with light mode
let theme = getAppTheme('light');

export default theme;
