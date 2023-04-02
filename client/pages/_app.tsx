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

import { useColorScheme } from '@/hooks/useColorScheme';
import { AuthProvider } from '@/store/auth/AuthProvider';
import { TypeComponentAuthFields } from '@/types';

import '@/styles/globals.css';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false
    }
  }
});

type TypeApp = AppProps &
  TypeComponentAuthFields & {
    theme: ColorScheme;
  };

const App = (props: TypeApp) => {
  const { Component, pageProps, theme } = props;

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
          <AuthProvider Component={Component}>
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
