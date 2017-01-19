(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define([], factory);
  } else if (typeof exports !== "undefined") {
    factory();
  } else {
    var mod = {
      exports: {}
    };
    factory();
    global.customEvent = mod.exports;
  }
})(this, function () {
  'use strict';

  var missingNativeCustomEvent = function () {
    try {
      new CustomEvent('test-event'); // eslint-disable-line no-new
    } catch (error) {
      return true;
    }
    return false;
  }();
  if (missingNativeCustomEvent) {
    window.CustomEvent = function CustomEvent(type) {
      var init = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      var event = document.createEvent('HTMLEvents');
      event.initEvent(type, init.bubbles, init.cancelable);
      if (init.detail) {
        event.detail = init.detail;
      }
      return event;
    };
  }
});