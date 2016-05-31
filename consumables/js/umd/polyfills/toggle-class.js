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
    global.toggleClass = mod.exports;
  }
})(this, function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = toggleClass;
  function toggleClass(element, name, add) {
    if (element.classList.contains(name) === !add) {
      element.classList[add ? 'add' : 'remove'](name);
    }
  }
});