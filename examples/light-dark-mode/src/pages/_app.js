import '../scss/styles.scss';

import { ThemePreference } from '../ThemePreference';

function MyApp({ Component, pageProps }) {
  return (
    <ThemePreference>
      <Component {...pageProps} />
    </ThemePreference>
  );
}

export default MyApp;
