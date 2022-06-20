import React from 'react';
import ThemeProvider from 'next-themes'
import '../styles/globals.scss';
import { Layout } from '../components';

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider enableSystem={true} attribute="class">
    <Layout>
      <Component {...pageProps} />
    </Layout>
    </ThemeProvider>
  );
}

export default MyApp;
