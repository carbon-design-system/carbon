(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["babel-runtime/core-js/math/sign"], factory);
  } else if (typeof exports !== "undefined") {
    factory(require("babel-runtime/core-js/math/sign"));
  } else {
    var mod = {
      exports: {}
    };
    factory(global.sign);
    global.mathSign = mod.exports;
  }
})(this, function (_sign) {
  "use strict";

  var _sign2 = _interopRequireDefault(_sign);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  Math.sign = _sign2.default || function sign(x) {
    var n = +x;
    return n === 0 ? n : n / Math.abs(n);
  };
});