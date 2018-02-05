import './polyfills/index';

import './js/components/boot-nav';
import './js/prism';

import * as components from '../src/globals/js/components';

export * from '../src/bundle';

if (typeof module !== 'undefined' && module.hot) {
  const forEach = Array.prototype.forEach;

  module.hot.dispose(() => {
    // Releases component instances of (old) component classes that have been replaced with new ones by HMR
    Object.keys(components)
      .map(key => components[key])
      .filter(component => typeof component.init === 'function')
      .forEach(Clz => {
        forEach.call(document.body.querySelectorAll(Clz.options.selectorInit), element => {
          const instance = Clz.components.get(element);
          if (instance) {
            instance.release();
          }
        });
      });
  });

  module.hot.accept();
}
