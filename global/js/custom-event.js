const missingNativeCustomEvent = (() => {
  try {
    new CustomEvent('test-event'); // eslint-disable-line no-new
  } catch (error) {
    return true;
  }
})();
if (missingNativeCustomEvent) {
  window.CustomEvent = function CustomEvent(type, init = {}) {
    const e = document.createEvent('HTMLEvents');
    e.initEvent(type, init.bubbles, init.cancelable);
    if (init.detail) {
      e.detail = init.detail;
    }
    return e;
  };
}
