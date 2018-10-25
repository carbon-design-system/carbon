import 'core-js/modules/es6.array.find';

import React from 'react';
import ReactDOM from 'react-dom';
import RootPage from './RootPage';

/**
 * Waits for BrowserSync JS code to be loaded, and calls the given callback after.
 * @param {Function} callback The callback.
 * @private
 */
const pollForBrowserSync = callback => {
  const bsScriptTag = Array.prototype.find.call(document.querySelectorAll('script'), elem =>
    /browser-sync-client/i.test(elem.src)
  );
  // eslint-disable-next-line no-underscore-dangle
  if (!bsScriptTag || window.___browserSync___) {
    callback();
  } else {
    bsScriptTag.addEventListener('load', callback);
  }
};

pollForBrowserSync(() => {
  const renderRoot = document.querySelector('[data-renderroot]');
  if (renderRoot) {
    const props = {
      componentItems: window.componentItems,
      docItems: window.docItems,
      portSassBuild: window.portSassBuild,
      routeWithQueryArgs: window.routeWithQueryArgs,
      useStaticFullRenderPage: window.useStaticFullRenderPage,
    };
    ReactDOM.render(<RootPage {...props} />, renderRoot);
  }
});
