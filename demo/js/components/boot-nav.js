import 'core-js/modules/es6.array.find';

import React from 'react';
import ReactDOM from 'react-dom';
import RootPage from './RootPage';

(() => {
  const renderRoot = document.querySelector('[data-renderroot]');
  if (renderRoot) {
    const props = {
      componentItems: window.componentItems,
      docItems: window.docItems,
    };
    ReactDOM.render(<RootPage {...props} />, renderRoot);
  }
})();
