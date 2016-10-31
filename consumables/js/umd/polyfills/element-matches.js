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
    global.elementMatches = mod.exports;
  }
})(this, function () {
  'use strict';

  var matchesFuncName = ['matches', 'webkitMatchesSelector', 'msMatchesSelector'].filter(function (name) {
    return typeof Element.prototype[name] === 'function';
  })[0];

  if (matchesFuncName !== 'matches') {
    Element.prototype.matches = Element.prototype[matchesFuncName];
  }
});