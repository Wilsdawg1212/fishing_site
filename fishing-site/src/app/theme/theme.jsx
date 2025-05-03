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
});

export default theme;
