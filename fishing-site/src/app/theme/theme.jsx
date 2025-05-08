import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#EAEAEA',
    },
    secondary: {
      main: '#055C32',
    },
    sidebar: {
      main: '#055C32', // custom color
    },
  },
  typography: {
    fontFamily: "'Roboto', mono", // Default font for all text
    h1: { fontFamily: "'Lobster Two', cursive" }, // Optional: header-specific
    h2: { fontFamily: "'Lobster Two', cursive" },
    h3: { fontFamily: "'Lobster Two', cursive" },
  },
  components: {
    MuiButton: {
      defaultProps: {
        variant: 'contained',
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          borderRadius: '12px',
          textTransform: 'none',
          fontWeight: 600,
          paddingInline: '20px',
          paddingBlock: '8px',
          fontFamily: "'Roboto', mono",
        },
        containedPrimary: {
          backgroundColor: '#055C32',
          color: '#fff',
          '&:hover': {
            backgroundColor: '#044b29',
          },
        },
        containedSecondary: {
          backgroundColor: '#EAEAEA',
          color: '#055C32',
          '&:hover': {
            backgroundColor: '#dadada',
          },
        },
      },
    },
  },
});

export default theme;
