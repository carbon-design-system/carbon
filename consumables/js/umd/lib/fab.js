(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'babel-runtime/core-js/weak-map', 'babel-runtime/core-js/object/create', 'babel-runtime/core-js/object/assign', 'babel-runtime/helpers/classCallCheck', 'babel-runtime/helpers/createClass', '../polyfills/event-matches', '../misc/on', '../polyfills/element-matches'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('babel-runtime/core-js/weak-map'), require('babel-runtime/core-js/object/create'), require('babel-runtime/core-js/object/assign'), require('babel-runtime/helpers/classCallCheck'), require('babel-runtime/helpers/createClass'), require('../polyfills/event-matches'), require('../misc/on'), require('../polyfills/element-matches'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.weakMap, global.create, global.assign, global.classCallCheck, global.createClass, global.eventMatches, global.on, global.elementMatches);
    global.fab = mod.exports;
  }
})(this, function (exports, _weakMap, _create, _assign, _classCallCheck2, _createClass2, _eventMatches, _on) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _weakMap2 = _interopRequireDefault(_weakMap);

  var _create2 = _interopRequireDefault(_create);

  var _assign2 = _interopRequireDefault(_assign);

  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

  var _createClass3 = _interopRequireDefault(_createClass2);

  var _eventMatches2 = _interopRequireDefault(_eventMatches);

  var _on2 = _interopRequireDefault(_on);

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
     * If the given element indicates that it's an floating action button, instantiates it.
     * Otherwise, instantiates floating action buttons by clicking on floating action buttons in the given node.
     * @param {Node} target The DOM node to instantiate floating action buttons in. Should be a document or an element.
     * @param {Object} [options] The component options.
     * @param {string} [options.selectorItem] The CSS selector to find floating action buttons.
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

        var target = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document;
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        var effectiveOptions = (0, _assign2.default)((0, _create2.default)(this.options), options);
        if (target.nodeType !== Node.ELEMENT_NODE && target.nodeType !== Node.DOCUMENT_NODE) {
          throw new Error('DOM document or DOM element should be given to search for and initialize this widget.');
        }
        if (target.nodeType === Node.ELEMENT_NODE && target.matches(effectiveOptions.selectorInit)) {
          this.create(target);
        } else {
          return (0, _on2.default)(target, 'click', function (event) {
            var element = (0, _eventMatches2.default)(event, effectiveOptions.selectorInit);
            if (element && !_this2.components.has(element)) {
              _this2.create(element).toggle(event);
            }
          });
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

  FabButton.components = new _weakMap2.default();
  FabButton.options = {
    selectorInit: '[data-fab]'
  };
  exports.default = FabButton;
});