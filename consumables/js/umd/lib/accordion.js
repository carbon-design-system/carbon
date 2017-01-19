(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'babel-runtime/core-js/weak-map', 'babel-runtime/helpers/toConsumableArray', 'babel-runtime/core-js/object/get-prototype-of', 'babel-runtime/helpers/classCallCheck', 'babel-runtime/helpers/createClass', 'babel-runtime/helpers/possibleConstructorReturn', 'babel-runtime/helpers/inherits', '../misc/mixin', '../mixins/create-component', '../mixins/init-component-by-search', '../polyfills/array-from', '../polyfills/element-matches', '../polyfills/object-assign', '../polyfills/custom-event'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('babel-runtime/core-js/weak-map'), require('babel-runtime/helpers/toConsumableArray'), require('babel-runtime/core-js/object/get-prototype-of'), require('babel-runtime/helpers/classCallCheck'), require('babel-runtime/helpers/createClass'), require('babel-runtime/helpers/possibleConstructorReturn'), require('babel-runtime/helpers/inherits'), require('../misc/mixin'), require('../mixins/create-component'), require('../mixins/init-component-by-search'), require('../polyfills/array-from'), require('../polyfills/element-matches'), require('../polyfills/object-assign'), require('../polyfills/custom-event'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.weakMap, global.toConsumableArray, global.getPrototypeOf, global.classCallCheck, global.createClass, global.possibleConstructorReturn, global.inherits, global.mixin, global.createComponent, global.initComponentBySearch, global.arrayFrom, global.elementMatches, global.objectAssign, global.customEvent);
    global.accordion = mod.exports;
  }
})(this, function (exports, _weakMap, _toConsumableArray2, _getPrototypeOf, _classCallCheck2, _createClass2, _possibleConstructorReturn2, _inherits2, _mixin2, _createComponent, _initComponentBySearch) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _weakMap2 = _interopRequireDefault(_weakMap);

  var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

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

  var Accordion = function (_mixin) {
    (0, _inherits3.default)(Accordion, _mixin);

    /**
     * Accordion.
     * @extends CreateComponent
     * @extends InitComponentBySearch
     * @param {HTMLElement} element The element working as an accordion.
     */
    function Accordion(element, options) {
      (0, _classCallCheck3.default)(this, Accordion);

      var _this = (0, _possibleConstructorReturn3.default)(this, (Accordion.__proto__ || (0, _getPrototypeOf2.default)(Accordion)).call(this, element, options));

      [].concat((0, _toConsumableArray3.default)(_this.element.querySelectorAll(_this.options.accordionItem))).forEach(function (item) {
        item.addEventListener('click', function (event) {
          _this.handleClick(event);
        });
        item.addEventListener('keypress', function (event) {
          _this.handleKeypress(event);
        });
      });
      return _this;
    }

    /**
     * Handles toggling of active state of accordion
     * @param {Event} event The event triggering this method.
     */


    (0, _createClass3.default)(Accordion, [{
      key: 'handleClick',
      value: function handleClick(event) {
        event.currentTarget.classList.toggle('bx--accordion__item--active');
      }
    }, {
      key: 'handleKeypress',
      value: function handleKeypress(event) {
        if (event.keyCode === 13 || event.keyCode === 32) this.handleClick(event);
      }
    }]);
    return Accordion;
  }((0, _mixin3.default)(_createComponent2.default, _initComponentBySearch2.default));

  /**
   * The map associating DOM element and accordion UI instance.
   * @type {WeakMap}
   */
  Accordion.components = new _weakMap2.default();

  /**
   * The component options.
   * If `options` is specified in the constructor,
   * {@linkcode NumberInput.create .create()}, or {@linkcode NumberInput.init .init()},
   * properties in this object are overriden for the instance being create and how {@linkcode NumberInput.init .init()} works.
   * @property {string} selectorInit The CSS selector to find accordion UIs.
   */
  Accordion.options = {
    selectorInit: '[data-accordion]',
    accordionItem: '[data-accordion-item]'
  };

  exports.default = Accordion;
});