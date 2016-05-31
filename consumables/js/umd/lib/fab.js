(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'babel-runtime/core-js/weak-map', 'babel-runtime/helpers/typeof', 'babel-runtime/helpers/classCallCheck', 'babel-runtime/helpers/createClass', '../polyfills/event-matches'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('babel-runtime/core-js/weak-map'), require('babel-runtime/helpers/typeof'), require('babel-runtime/helpers/classCallCheck'), require('babel-runtime/helpers/createClass'), require('../polyfills/event-matches'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.weakMap, global._typeof, global.classCallCheck, global.createClass, global.eventMatches);
    global.fab = mod.exports;
  }
})(this, function (exports, _weakMap, _typeof2, _classCallCheck2, _createClass2, _eventMatches) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _weakMap2 = _interopRequireDefault(_weakMap);

  var _typeof3 = _interopRequireDefault(_typeof2);

  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

  var _createClass3 = _interopRequireDefault(_createClass2);

  var _eventMatches2 = _interopRequireDefault(_eventMatches);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var FabButton = function () {
    /**
     * Floating action button.
     * @implements Component
     * @param {HTMLElement} element The element working as a floting action button.
     */

    function FabButton(element) {
      var _this = this;

      (0, _classCallCheck3.default)(this, FabButton);

      if (!element || element.nodeType !== Node.ELEMENT_NODE) {
        throw new TypeError('DOM element should be given to initialize this widget.');
      }
      this.element = element;

      this.constructor.components.set(this.element, this);

      element.addEventListener('click', function (event) {
        return _this.toggle(event);
      });
    }

    /**
     * Instantiates floating action buttons in the given element.
     * If the given element indicates that it's an floating action button (having `data-fab` attribute), instantiates it.
     * Otherwise, instantiates floating action buttons by clicking on floating action buttons in the given node.
     * @param {Node} target The DOM node to instantiate floating action buttons in. Should be a document or an element.
     * @returns {Handle} The handle to remove the event listener to handle clicking.
     */


    (0, _createClass3.default)(FabButton, [{
      key: 'toggle',
      value: function toggle(event) {
        if (this.element.tagName === 'A') {
          event.preventDefault();
        }

        if (this.element.dataset.state === 'closed') {
          this.element.dataset.state = 'open';
        } else {
          this.element.dataset.state = 'closed';
        }
      }
    }, {
      key: 'release',
      value: function release() {
        this.constructor.components.delete(this.element);
      }
    }], [{
      key: 'init',
      value: function init() {
        var _this2 = this;

        var target = arguments.length <= 0 || arguments[0] === undefined ? document : arguments[0];

        if (target.nodeType !== Node.ELEMENT_NODE && target.nodeType !== Node.DOCUMENT_NODE) {
          throw new Error('DOM document or DOM element should be given to search for and initialize this widget.');
        }
        if (target.nodeType === Node.ELEMENT_NODE && target.dataset.fab !== undefined) {
          this.create(target);
        } else {
          var _ret = function () {
            var handler = function handler(event) {
              var element = (0, _eventMatches2.default)(event, '[data-fab]');
              if (element && !_this2.components.has(element)) {
                _this2.create(element).toggle(event);
              }
            };
            target.addEventListener('click', handler);
            return {
              v: {
                release: function release() {
                  return target.removeEventListener('click', handler);
                }
              }
            };
          }();

          if ((typeof _ret === 'undefined' ? 'undefined' : (0, _typeof3.default)(_ret)) === "object") return _ret.v;
        }
      }
    }, {
      key: 'create',
      value: function create(element) {
        return this.components.get(element) || new this(element);
      }
    }]);
    return FabButton;
  }();

  exports.default = FabButton;


  /**
   * The map associating DOM element and floating action button instance.
   * @type {WeakMap}
   */
  FabButton.components = new _weakMap2.default();
});