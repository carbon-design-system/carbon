import './polyfills/index';

import ThemeSwitcher from './js/theme-switcher';
import DemoSwitcher from './js/demo-switcher';

export * from '../src/index';

const init = () => {
  ThemeSwitcher.init();
  DemoSwitcher.init();
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  // DOMContentLoaded has been fired already
  setTimeout(init, 0);
}
