import './polyfills/index';

import DemoSwitcher from './js/demo-switcher';

export * from '../src/index';

const init = () => {
  DemoSwitcher.init();
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  // DOMContentLoaded has been fired already
  setTimeout(init, 0);
}
