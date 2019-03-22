// Polyfill for dev env UI based on `carbon-components-react`
import 'core-js/modules/es6.string.includes';
import 'core-js/modules/es7.object.values';
import 'whatwg-fetch';
import PromisePolyfill from 'promise/lib/es6-extensions';
import rejectionTracking from 'promise/lib/rejection-tracking';

if (typeof Promise === 'undefined') {
  // Rejection tracking prevents a common issue where React gets into an
  // inconsistent state due to an error, but it gets swallowed by a Promise,
  // and the user has no idea what causes React's erratic future behavior.
  rejectionTracking.enable();
  window.Promise = PromisePolyfill;
}
