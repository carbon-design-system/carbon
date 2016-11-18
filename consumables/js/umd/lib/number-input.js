(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'babel-runtime/core-js/weak-map', 'babel-runtime/helpers/toConsumableArray', 'babel-runtime/core-js/object/create', 'babel-runtime/core-js/object/assign', 'babel-runtime/helpers/classCallCheck', 'babel-runtime/helpers/createClass', '../polyfills/array-from', '../polyfills/custom-event', '../polyfills/element-matches'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('babel-runtime/core-js/weak-map'), require('babel-runtime/helpers/toConsumableArray'), require('babel-runtime/core-js/object/create'), require('babel-runtime/core-js/object/assign'), require('babel-runtime/helpers/classCallCheck'), require('babel-runtime/helpers/createClass'), require('../polyfills/array-from'), require('../polyfills/custom-event'), require('../polyfills/element-matches'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.weakMap, global.toConsumableArray, global.create, global.assign, global.classCallCheck, global.createClass, global.arrayFrom, global.customEvent, global.elementMatches);
    global.numberInput = mod.exports;
  }
})(this, function (exports, _weakMap, _toConsumableArray2, _create, _assign, _classCallCheck2, _createClass2) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _weakMap2 = _interopRequireDefault(_weakMap);

  var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

  var _create2 = _interopRequireDefault(_create);

  var _assign2 = _interopRequireDefault(_assign);

  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

  var _createClass3 = _interopRequireDefault(_createClass2);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var NumberInput = function () {
    /**
     * Number input UI.
     * @implements Component
     * @param {HTMLElement} element The element working as a number input UI.
     */
    function NumberInput(element) {
      var _this = this;

      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      (0, _classCallCheck3.default)(this, NumberInput);

      if (!element || element.nodeType !== Node.ELEMENT_NODE) {
        throw new TypeError('DOM element should be given to initialize this widget.');
      }

      this.options = options;
      this.options.ie = this.options.ie || 'ActiveXObject' in window;

      this.element = element;
      this.constructor.components.set(this.element, this);
      // Broken DOM tree is seen with up/down arrows <svg> in IE, which breaks event delegation.
      // Also <svg> does not seems to have `Element.classList`.
      this.element.querySelector('.bx--number__arrow--up').addEventListener('click', function (event) {
        return _this.handleClick(event);
      });
      this.element.querySelector('.bx--number__arrow--down').addEventListener('click', function (event) {
        return _this.handleClick(event);
      });
    }

    /**
     * Instantiates number input UI of the given element.
     * @param {HTMLElement} element The element.
     */


    (0, _createClass3.default)(NumberInput, [{
      key: 'handleClick',
      value: function handleClick(event) {
        var state = event.currentTarget.classList;
        var numberInput = this.element.querySelector('.bx--number__input');

        if (state.contains('bx--number__arrow--icon-up')) {
          if (this.options.ie) {
            ++numberInput.value;
          } else {
            numberInput.stepUp();
          }
        } else if (state.contains('bx--number__arrow--icon-down')) {
          if (this.options.ie) {
            if (numberInput.value > 0) {
              --numberInput.value;
            }
          } else {
            numberInput.stepDown();
          }
        } else {
          return;
        }

        // Programmatic change in value (including `stepUp()`/`stepDown()`) won't fire change event
        numberInput.dispatchEvent(new CustomEvent('change', {
          bubbles: true,
          cancelable: false
        }));
      }
    }, {
      key: 'release',
      value: function release() {
        this.constructor.components.delete(this.element);
      }
    }], [{
      key: 'create',
      value: function create(element) {
        return this.components.get(element) || new this(element);
      }
    }, {
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
          [].concat((0, _toConsumableArray3.default)(target.querySelectorAll(effectiveOptions.selectorInit))).forEach(function (element) {
            return _this2.create(element);
          });
        }
      }
    }]);
    return NumberInput;
  }();

  NumberInput.components = new _weakMap2.default();
  NumberInput.options = {
    selectorInit: '[data-numberinput]'
  };
  exports.default = NumberInput;
});