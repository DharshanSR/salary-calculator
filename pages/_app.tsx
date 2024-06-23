import { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import Head from 'next/head';

const MyApp = ({ Component, pageProps }: AppProps) => (
  <Provider store={store}>
    <Head>
      <title>Salary Calculator</title>
    </Head>
    <Component {...pageProps} />
  </Provider>
);

export default MyApp;
