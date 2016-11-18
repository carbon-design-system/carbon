(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports);
    global.checkbox = mod.exports;
  }
})(this, function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  function listener(event) {
    var element = event.target;
    if (element.tagName === 'INPUT' && element.type === 'checkbox' && element.hasAttribute('checked') !== element.checked) {
      if (element.checked) {
        element.setAttribute('checked', '');
      } else {
        element.removeAttribute('checked');
      }
    }
  }

  /**
   * Watches for change in checkbox in the given document and force changing `checked` attribute
   * so that DOM mutation observer in {@link https://www.npmjs.com/package/svgxuse svgxuse} is triggered.
   * @param {Document} [doc=document] The document object to watch for.
   * @returns {Handle} The handle to release the event listener.
   */
  function initCheckbox() {
    var doc = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document;

    doc.removeEventListener('change', listener); // In case this function has been called earlier
    doc.addEventListener('change', listener);
    return {
      release: function release() {
        doc.removeEventListener('change', listener);
        return null;
      }
    };
  }

  exports.default = initCheckbox;
});