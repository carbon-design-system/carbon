import './polyfills/index';
import './polyfills/devenv';

import './js/components/boot-nav';
import './js/prism';

import * as components from './components';
import lazyInitHandles, { setComponents } from '../src/globals/js/boot';

export * from '../src/bundle';

setComponents(components);

if (typeof module !== 'undefined' && module.hot) {
  const { forEach } = Array.prototype;

  module.hot.dispose(() => {
    // Releases handles for event handlers to lazily instantiate components that have been replaced with new ones by HMR
    for (let h = lazyInitHandles.pop(); h; h = lazyInitHandles.pop()) {
      h.release();
    }
    // Releases component instances of (old) component classes that have been replaced with new ones by HMR
    Object.keys(components)
      .map(key => components[key])
      .filter(component => typeof component.init === 'function')
      .forEach(Clz => {
        forEach.call(
          document.body.querySelectorAll(Clz.options.selectorInit),
          element => {
            const instance = Clz.components.get(element);
            if (instance) {
              instance.release();
            }
          }
        );
      });
  });

  module.hot.accept();
}
