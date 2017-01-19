(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'babel-runtime/core-js/weak-map', 'babel-runtime/core-js/object/get-prototype-of', 'babel-runtime/helpers/classCallCheck', 'babel-runtime/helpers/createClass', 'babel-runtime/helpers/possibleConstructorReturn', 'babel-runtime/helpers/inherits', '../misc/mixin', '../mixins/create-component', '../mixins/init-component-by-search', '../polyfills/array-from', '../polyfills/custom-event', '../polyfills/element-matches', '../polyfills/object-assign'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('babel-runtime/core-js/weak-map'), require('babel-runtime/core-js/object/get-prototype-of'), require('babel-runtime/helpers/classCallCheck'), require('babel-runtime/helpers/createClass'), require('babel-runtime/helpers/possibleConstructorReturn'), require('babel-runtime/helpers/inherits'), require('../misc/mixin'), require('../mixins/create-component'), require('../mixins/init-component-by-search'), require('../polyfills/array-from'), require('../polyfills/custom-event'), require('../polyfills/element-matches'), require('../polyfills/object-assign'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.weakMap, global.getPrototypeOf, global.classCallCheck, global.createClass, global.possibleConstructorReturn, global.inherits, global.mixin, global.createComponent, global.initComponentBySearch, global.arrayFrom, global.customEvent, global.elementMatches, global.objectAssign);
    global.numberInput = mod.exports;
  }
})(this, function (exports, _weakMap, _getPrototypeOf, _classCallCheck2, _createClass2, _possibleConstructorReturn2, _inherits2, _mixin2, _createComponent, _initComponentBySearch) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _weakMap2 = _interopRequireDefault(_weakMap);

  var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

  var _createClass3 = _interopRequireDefault(_createClass2);

  var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

  var _inherits3 = _interopRequireDefault(_inherits2);

  var _mixin3 = _interopRequireDefault(_mixin2);

  var _createComponent2 = _interopRequireDefault(_createComponent);

  var _initComponentBySearch2 = _interopRequireDefault(_initComponentBySearch);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var NumberInput = function (_mixin) {
    (0, _inherits3.default)(NumberInput, _mixin);

    /**
     * Number input UI.
     * @extends CreateComponent
     * @extends InitComponentBySearch
     * @param {HTMLElement} element The element working as a number input UI.
     */
    function NumberInput(element, options) {
      (0, _classCallCheck3.default)(this, NumberInput);

      var _this = (0, _possibleConstructorReturn3.default)(this, (NumberInput.__proto__ || (0, _getPrototypeOf2.default)(NumberInput)).call(this, element, options));

      _this.options.ie = _this.options.ie || 'ActiveXObject' in window;
      // Broken DOM tree is seen with up/down arrows <svg> in IE, which breaks event delegation.
      // Also <svg> does not seems to have `Element.classList`.
      _this.element.querySelector('.bx--number__arrow--up').addEventListener('click', function (event) {
        _this.handleClick(event);
      });
      _this.element.querySelector('.bx--number__arrow--down').addEventListener('click', function (event) {
        _this.handleClick(event);
      });
      return _this;
    }

    /**
     * Increase/decrease number by clicking on up/down icons.
     * @param {Event} event The event triggering this method.
     */


    (0, _createClass3.default)(NumberInput, [{
      key: 'handleClick',
      value: function handleClick(event) {
        var state = event.currentTarget.classList;
        var numberInput = this.element.querySelector('.bx--number__input');

        if (state.contains('bx--number__arrow--up')) {
          if (this.options.ie) {
            ++numberInput.value;
          } else {
            numberInput.stepUp();
          }
        } else if (state.contains('bx--number__arrow--down')) {
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
    }]);
    return NumberInput;
  }((0, _mixin3.default)(_createComponent2.default, _initComponentBySearch2.default));

  NumberInput.components = new _weakMap2.default();
  NumberInput.options = {
    selectorInit: '[data-numberinput]'
  };
  exports.default = NumberInput;
});