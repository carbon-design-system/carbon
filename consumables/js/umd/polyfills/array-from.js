(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["babel-runtime/core-js/array/from"], factory);
  } else if (typeof exports !== "undefined") {
    factory(require("babel-runtime/core-js/array/from"));
  } else {
    var mod = {
      exports: {}
    };
    factory(global.from);
    global.arrayFrom = mod.exports;
  }
})(this, function (_from) {
  "use strict";

  var _from2 = _interopRequireDefault(_from);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  Array.from = _from2.default || function fromArray(a) {
    return Array.prototype.slice.call(a);
  };
});