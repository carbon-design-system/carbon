import '../scss/styles.scss';

import { ThemePreference } from '../components/ThemePreference';

function MyApp({ Component, pageProps }) {
  return (
    <ThemePreference>
      <Component {...pageProps} />
    </ThemePreference>
  );
}

export default MyApp;
