export * from '../consumables/js/es2015';
import ThemeSwitcher from './js/theme-switcher';

const init = () => {
  ThemeSwitcher.init();
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  // DOMContentLoaded has been fired already
  setTimeout(init, 0);
}
