(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'babel-runtime/core-js/weak-map', 'babel-runtime/helpers/toConsumableArray', 'babel-runtime/helpers/classCallCheck', 'babel-runtime/helpers/createClass', '../polyfills/array-from'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('babel-runtime/core-js/weak-map'), require('babel-runtime/helpers/toConsumableArray'), require('babel-runtime/helpers/classCallCheck'), require('babel-runtime/helpers/createClass'), require('../polyfills/array-from'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.weakMap, global.toConsumableArray, global.classCallCheck, global.createClass, global.arrayFrom);
    global.numberInput = mod.exports;
  }
})(this, function (exports, _weakMap, _toConsumableArray2, _classCallCheck2, _createClass2) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _weakMap2 = _interopRequireDefault(_weakMap);

  var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

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

      var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
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
        }
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

        var target = arguments.length <= 0 || arguments[0] === undefined ? document : arguments[0];

        if (target.nodeType !== Node.ELEMENT_NODE && target.nodeType !== Node.DOCUMENT_NODE) {
          throw new Error('DOM document or DOM element should be given to search for and initialize this widget.');
        }
        if (target.nodeType === Node.ELEMENT_NODE && target.dataset.numberinput !== undefined) {
          this.create(target);
        } else {
          [].concat((0, _toConsumableArray3.default)(target.querySelectorAll('[data-numberinput]'))).forEach(function (element) {
            return _this2.create(element);
          });
        }
      }
    }]);
    return NumberInput;
  }();

  exports.default = NumberInput;


  /**
   * The map associating DOM element and number input UI instance.
   * @type {WeakMap}
   */
  NumberInput.components = new _weakMap2.default();
});