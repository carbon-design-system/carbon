import './polyfills/index';

import DemoSwitcher from './js/demo-switcher';

import eventMatches from '../src/globals/js/misc/event-matches';

export * from '../src/index';

function switchTo(name) {
  const selectedLeftNavItem = document.querySelector(`[data-demo-name=${name}].left-nav-list__item`);
  [...document.querySelectorAll('[data-demo-name].left-nav-list__item')].forEach(item => {
    item.classList.toggle('left-nav-list__item--active', item.dataset.demoName === name);
  });
  [...document.querySelectorAll('[data-interior-left-nav-with-children]')].forEach(item => {
    if (item.contains(selectedLeftNavItem)) {
      item.classList.add('left-nav-list__item--expanded');
    }
  });
  [...document.querySelectorAll('[data-demo-name].demo--container__panel')].forEach(panel => {
    if (panel.dataset.demoName === name) {
      panel.removeAttribute('hidden');
    } else {
      panel.setAttribute('hidden', '');
    }
  });
}

const init = () => {
  DemoSwitcher.init();

  document.body.addEventListener('left-nav-toggled', evt => {
    document.body.classList.toggle('demo--collapsed', evt.detail.collapsed);
  });

  document.body.addEventListener('click', evt => {
    const link = eventMatches(evt, '.left-nav-list__item-link');
    if (link) {
      evt.preventDefault();
    }
    const leafLink = eventMatches(evt, '[data-interior-left-nav-leaf-item-link]');
    if (leafLink) {
      const name = leafLink.textContent;
      window.history.pushState({ name }, name, `/demo/${name}`);
      switchTo(name);
    }
  });

  window.addEventListener('popstate', evt => {
    switchTo(evt.state.name);
  });
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  // DOMContentLoaded has been fired already
  setTimeout(init, 0);
}
