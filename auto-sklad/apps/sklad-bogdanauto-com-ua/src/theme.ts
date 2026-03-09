import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#006A5D',
    },
    secondary: {
      main: '#edf2ff',
    },
  },
  typography: {
    fontFamily: 'Inter, sans-serif',
    h1: {
      fontSize: '46px',
      fontWeight: 300,
      lineHeight: '74px',
      color: '#1C1D1F',
      margin: '0.67em 0',
    },
    h2: {},
    h3: {},
    h4: {},
    h5: {},
    h6: {},
    subtitle1: {},
    subtitle2: {},
    body1: { fontSize: '16px' },
    body2: {
      fontSize: '18px',
    },
    caption: {},
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: '#0f6b5a',
          height: '60px',
          width: '295px',
          borderRadius: '12px',
          fontSize: '16px',
          fontWeight: 500,
          textTransform: 'none',
          '&:hover': {
            backgroundColor: '#0d5d4f',
          },
        },
      },
    },
  },
});
