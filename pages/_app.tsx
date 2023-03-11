import { useEffect } from 'react';
import {
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider
} from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { getCookie } from 'cookies-next';
import { NextPageContext } from 'next';
import type { AppProps } from 'next/app';
import NextNProgress from 'nextjs-progressbar';

import { AuthProvider } from '@/context/AuthProvider';
import { useColorScheme } from '@/hooks/useColorScheme';

import '@/styles/globals.css';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false
    }
  }
});

const App = (props: AppProps) => {
  const { Component, pageProps, theme } = props as AppProps & {
    theme: ColorScheme;
  };

  const { colorScheme, toggleColorScheme } = useColorScheme(theme);

  useEffect(() => {
    document.documentElement.style.opacity = '1';
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ColorSchemeProvider
        colorScheme={colorScheme}
        toggleColorScheme={toggleColorScheme}
      >
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          theme={{
            fontFamily: `'Rubik', sans-serif`,
            colorScheme
          }}
        >
          <Notifications zIndex={2000} />
          <NextNProgress />
          <AuthProvider>
            <Component {...pageProps} />
          </AuthProvider>
        </MantineProvider>
      </ColorSchemeProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
};

App.getInitialProps = ({ ctx }: { ctx: NextPageContext }) => {
  return {
    theme: getCookie('theme', ctx) ?? 'light'
  };
};

export default App;
