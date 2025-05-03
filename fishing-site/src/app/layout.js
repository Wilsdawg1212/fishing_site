'use client';

import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from './theme/theme';
import Head from 'next/head';
import Header from './components/Header';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=Lobster+Two:ital,wght@0,400;0,700;1,400;1,700&family=Montserrat:ital,wght@0,100..900;1,100..900&family=Roboto+Mono:wght@100..700&family=Saira:wght@700&display=swap" rel="stylesheet" />
      </Head>
      <body>
        <ThemeProvider theme={theme}>
          <Header />
          <CssBaseline />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
