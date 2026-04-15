import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#002C5E',
    },
    secondary: {
      main: '#edf2ff',
    },
  },
  typography: {
    fontFamily: 'HyundaiSansTextRegular, sans-serif',
    h1: {
      fontFamily: 'HyundaiSansHeadMedium, sans-serif',
      fontSize: '38px',
      fontWeight: 300,
      lineHeight: '74px',
      color: '#555555',
      margin: '0.67em 0',
      // Адаптивно для мобільних
      '@media (max-width:600px)': {
        fontSize: '30px',
        lineHeight: '48px',
        textAlign: 'center',
      },
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
    MuiCheckbox: {
      styleOverrides: {
        root: {
          '& .MuiSvgIcon-root': {
            fontSize: 20,
          },

          '&:before': {
            content: '""',
            display: 'block',
            width: 18,
            height: 18,
            border: '1px solid #999',
            borderRadius: 0,
          },

          '&.Mui-checked:before': {
            backgroundColor: '#002C5E',
            borderColor: '#002C5E',
          },

          '& .MuiSvgIcon-root': {
            display: 'none',
          },
          '&.Mui-checked:after': {
            content: '""',
            position: 'absolute',
            top: 12,
            left: 15,
            width: 6,
            height: 10,
            border: 'solid white',
            borderWidth: '0 2px 2px 0',
            transform: 'rotate(45deg)',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          height: '60px',
          width: '295px',
          borderRadius: '0px',
          fontSize: '16px',
          fontWeight: 100,
          textTransform: 'none',
          fontFamily: 'HyundaiSansHeadMedium, sans-serif',
        },
      },
      variants: [
        {
          props: { variant: 'filter' },
          style: {
            border: '1px solid #E0E0E0',
            backgroundColor: '#FFFFFF',
            color: '#999999',
            textTransform: 'none',
            height: '60px',
            minWidth: '120px',
            borderRadius: '0px',
            fontSize: '14px',
            fontWeight: 100,
            width: '200px',
            fontFamily: 'HyundaiSansHeadMedium, sans-serif',
          },
        },
      ],
    },
  },
});
