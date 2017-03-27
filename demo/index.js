export * from '../consumables/js/es2015';
import ThemeSwitcher from './js/theme-switcher';
import DemoSwitcher from './js/demo-switcher';

const init = () => {
  ThemeSwitcher.init();
  DemoSwitcher.init();

  document.body.addEventListener('modal-shown', (event) => {
    if (event.target.id === 'inputs-modal') {
      setTimeout(() => {
        event.target.querySelector('input').focus();
      }, 0);
    } else if (event.target.id === 'transactional-modal') {
      setTimeout(() => {
        event.target.querySelector('.bx--btn').focus();
      }, 0);
    }
  });
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  // DOMContentLoaded has been fired already
  setTimeout(init, 0);
}
