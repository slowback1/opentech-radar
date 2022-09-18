import { AppProps } from 'next/app';
import Head from 'next/head';
import './styles.scss';
import Header from '../components/header/header';
import { ThemeProvider } from '@mui/material';
import theme from '../style/theme';

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>📡 Tech Radar</title>
      </Head>
      <ThemeProvider theme={theme}>
        <main className="tech-radar">
          <Header />
          <div className={'tech-radar__body'}>
            <Component {...pageProps} />
          </div>
        </main>
      </ThemeProvider>
    </>
  );
}

export default CustomApp;
