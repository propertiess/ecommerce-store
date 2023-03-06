import { useEffect } from 'react';
import { MantineProvider } from '@mantine/core';
import type { AppProps } from 'next/app';

import '@/styles/globals.css';

const App = ({ Component, pageProps }: AppProps) => {
  useEffect(() => {
    document.documentElement.style.opacity = '1';
  }, []);

  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <Component {...pageProps} />
    </MantineProvider>
  );
};

export default App;
