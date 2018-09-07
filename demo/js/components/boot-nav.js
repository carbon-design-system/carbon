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
  const bsScriptTag = document.getElementById('__bs_script__');
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
    };
    ReactDOM.render(<RootPage {...props} />, renderRoot);
  }
});
