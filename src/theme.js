import { createTheme, responsiveFontSizes } from '@mui/material/styles';

// Create a theme instance with accessibility and responsiveness in mind
let theme = createTheme({
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
    success: {
      main: '#4caf50',
      light: '#80e27e',
      dark: '#087f23',
    },
    info: {
      main: '#2196f3',
      light: '#64b6f7',
      dark: '#0069c0',
    },
    warning: {
      main: '#ff9800',
      light: '#ffc947',
      dark: '#c66900',
    },
    error: {
      main: '#f44336',
      light: '#ff7961',
      dark: '#ba000d',
    },
  },
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
            background: '#f1f1f1',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: 'rgba(0,0,0,.2)',
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
        containedPrimary: {
          background: 'linear-gradient(90deg, #5569ff 0%, #7b86ff 100%)',
        },
        containedSecondary: {
          background: 'linear-gradient(90deg, #ff6b9b 0%, #ff9bc1 100%)',
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
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: '0 1px 8px 0 rgba(0,0,0,0.05)',
          backdropFilter: 'blur(8px)',
        },
      },
    },
    MuiGrid: {
      styleOverrides: {
        container: {
          marginTop: 16,
          marginBottom: 16,
        },
        item: {
          paddingTop: 8,
          paddingBottom: 8,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 8,
            '& fieldset': {
              borderColor: 'rgba(0, 0, 0, 0.12)',
            },
            '&:hover fieldset': {
              borderColor: 'rgba(0, 0, 0, 0.24)',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#5569ff',
            },
          },
        },
      },
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
    MuiSwitch: {
      styleOverrides: {
        root: {
          width: 42,
          height: 26,
          padding: 0,
          '& .MuiSwitch-switchBase': {
            padding: 0,
            margin: 2,
            transitionDuration: '300ms',
            '&.Mui-checked': {
              transform: 'translateX(16px)',
              color: '#fff',
              '& + .MuiSwitch-track': {
                backgroundColor: '#5569ff',
                opacity: 1,
                border: 0,
              },
            },
          },
          '& .MuiSwitch-thumb': {
            boxSizing: 'border-box',
            width: 22,
            height: 22,
          },
          '& .MuiSwitch-track': {
            borderRadius: 26 / 2,
            backgroundColor: '#E9E9EA',
            opacity: 1,
          },
        },
      },
    },
  },
});

// Add responsive breakpoints
theme.breakpoints.values = {
  xs: 0,
  sm: 600,
  md: 960,
  lg: 1280,
  xl: 1920,
};

// Apply responsive font sizes
theme = responsiveFontSizes(theme, {
  breakpoints: ['xs', 'sm', 'md', 'lg', 'xl'],
  factor: 1.2, // Lower factor for more gradual scaling
});

export default theme;
