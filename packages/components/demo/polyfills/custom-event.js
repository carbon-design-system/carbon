// eslint-disable-next-line import/no-extraneous-dependencies
import CustomEventPolyfill from 'custom-event';

// eslint-disable-next-line consistent-return
const missingNativeCustomEvent = (() => {
  try {
    new CustomEvent('test-event'); // eslint-disable-line no-new
  } catch (error) {
    return true;
  }
})();
if (missingNativeCustomEvent) {
  window.CustomEvent = CustomEventPolyfill;
}
