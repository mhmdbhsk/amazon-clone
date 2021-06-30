import '../styles/global.css';
import type { AppProps } from 'next/app';
import { Provider, useDispatch } from 'react-redux';
import { store } from '@store';
import { Provider as AuthProvider } from 'next-auth/client';
import NextNprogress from 'nextjs-progressbar';
import { Fragment, ReactNode, useEffect } from 'react';
import { restoreBasket } from '@slice/basketSlice';

type AppWrapperProps = {
  children: ReactNode;
};

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider session={pageProps.session}>
      <Provider store={store}>
        <NextNprogress
          color="#29D"
          startPosition={0.3}
          stopDelayMs={200}
          height={3}
          showOnShallow={true}
        />
        <AppWrapper>
          <Component {...pageProps} />
        </AppWrapper>
      </Provider>
    </AuthProvider>
  );
}

const AppWrapper = ({ children }: AppWrapperProps) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(restoreBasket({}));
    console.log('Basket Restored');
  }, []);

  return <Fragment>{children}</Fragment>;
};

export default MyApp;
