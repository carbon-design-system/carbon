(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', './element-matches'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('./element-matches'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.elementMatches);
    global.eventMatches = mod.exports;
  }
})(this, function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = eventMatches;
  function eventMatches(event, selector) {
    // <svg> in IE does not have `Element#msMatchesSelector()` (that should be copied to `Element#matches()` by the polyfill).
    // Also a weird behavior is seen in IE where DOM tree seems broken when `event.target` is on <svg>.
    // Therefore this function simply returns `undefined` when `event.target` is on <svg>.
    if (typeof event.target.matches === 'function') {
      if (event.target.matches(selector)) {
        // If event target itself matches the given selector, return it
        return event.target;
      } else if (event.target.matches(selector + ' *')) {
        // If event target is a child node of a DOM element that matches the given selector,
        // find the DOM element by going up the DOM tree
        for (var traverse = event.target; traverse && traverse !== event.currentTarget; traverse = traverse.parentNode) {
          if (traverse.matches(selector)) {
            return traverse;
          }
        }
      }
    }
    return null;
  }
});