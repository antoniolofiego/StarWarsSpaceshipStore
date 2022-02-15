import '../styles/globals.css';
import { Toaster } from 'react-hot-toast';
import { SWRConfig } from 'swr';
import axios from 'axios';
import CartProvider from '../context/cart';
import { ThemeProvider } from 'next-themes';

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider attribute='class'>
      <SWRConfig
        value={{
          fetcher: (url) => axios.get(url).then((res) => res.data),
        }}
      >
        <CartProvider>
          <Toaster position='bottom-left' />
          <Component {...pageProps} />
        </CartProvider>
      </SWRConfig>
    </ThemeProvider>
  );
}

export default MyApp;
