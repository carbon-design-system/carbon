import './polyfills/index';

import './js/components/boot-nav';
import './js/prism';

import * as components from '../src/globals/js/components';

export * from '../src/bundle';

if (typeof module !== 'undefined' && module.hot) {
  const forEach = Array.prototype.forEach;

  if (window.oldComponentClasses) {
    // Releases component instances of (old) component classes that have been replaced with new ones by HMR
    window.oldComponentClasses.forEach(Clz => {
      forEach.call(document.body.querySelectorAll(Clz.options.selectorInit), element => {
        const instance = Clz.components.get(element);
        if (instance) {
          instance.release();
        }
      });
    });
  }

  // Preserves component classe refs, that would be replaced replaced with new ones by HMR, to `window`
  window.oldComponentClasses = Object.keys(components)
    .map(key => components[key])
    .filter(component => typeof component.init === 'function');

  module.hot.accept();
}
