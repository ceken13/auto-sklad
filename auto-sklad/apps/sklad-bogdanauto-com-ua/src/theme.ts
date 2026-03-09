import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#0052cc',
    },
    secondary: {
      main: '#edf2ff',
    },
  },
  typography: {
    fontFamily: 'Inter, sans-serif',

    body2: { fontSize: 18 },
  },
});
