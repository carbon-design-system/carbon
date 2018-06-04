// Polyfill for dev env UI based on `carbon-components-react`
/* eslint-disable import/no-extraneous-dependencies, global-require */
import 'core-js/modules/es6.string.includes';
import 'core-js/modules/es7.object.values';
import 'whatwg-fetch';

if (typeof Promise === 'undefined') {
  // Rejection tracking prevents a common issue where React gets into an
  // inconsistent state due to an error, but it gets swallowed by a Promise,
  // and the user has no idea what causes React's erratic future behavior.
  require('promise/lib/rejection-tracking').enable();
  window.Promise = require('promise/lib/es6-extensions.js');
}
/* eslint-enable import/no-extraneous-dependencies, global-require */
