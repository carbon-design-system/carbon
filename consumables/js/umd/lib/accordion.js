(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'babel-runtime/core-js/weak-map', 'babel-runtime/core-js/object/get-prototype-of', 'babel-runtime/helpers/classCallCheck', 'babel-runtime/helpers/createClass', 'babel-runtime/helpers/possibleConstructorReturn', 'babel-runtime/helpers/inherits', '../misc/mixin', '../mixins/create-component', '../mixins/init-component-by-search', '../polyfills/event-matches', '../polyfills/array-from', '../polyfills/element-matches', '../polyfills/object-assign', '../polyfills/custom-event'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('babel-runtime/core-js/weak-map'), require('babel-runtime/core-js/object/get-prototype-of'), require('babel-runtime/helpers/classCallCheck'), require('babel-runtime/helpers/createClass'), require('babel-runtime/helpers/possibleConstructorReturn'), require('babel-runtime/helpers/inherits'), require('../misc/mixin'), require('../mixins/create-component'), require('../mixins/init-component-by-search'), require('../polyfills/event-matches'), require('../polyfills/array-from'), require('../polyfills/element-matches'), require('../polyfills/object-assign'), require('../polyfills/custom-event'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.weakMap, global.getPrototypeOf, global.classCallCheck, global.createClass, global.possibleConstructorReturn, global.inherits, global.mixin, global.createComponent, global.initComponentBySearch, global.eventMatches, global.arrayFrom, global.elementMatches, global.objectAssign, global.customEvent);
    global.accordion = mod.exports;
  }
})(this, function (exports, _weakMap, _getPrototypeOf, _classCallCheck2, _createClass2, _possibleConstructorReturn2, _inherits2, _mixin2, _createComponent, _initComponentBySearch, _eventMatches) {
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

  var _eventMatches2 = _interopRequireDefault(_eventMatches);

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

      _this.element.addEventListener('click', function (event) {
        var item = (0, _eventMatches2.default)(event, _this.options.accordionItem);
        if (item && !(0, _eventMatches2.default)(event, _this.options.accordionContent)) {
          item.classList.toggle(_this.options.classActive);
        }
      });

      _this.element.addEventListener('keypress', function (event) {
        var item = (0, _eventMatches2.default)(event, _this.options.accordionItem);
        if (item && !(0, _eventMatches2.default)(event, _this.options.accordionContent)) {
          _this.handleKeypress(event);
        }
      });
      return _this;
    }

    /**
     * Handles toggling of active state of accordion via keyboard
     * @param {Event} event The event triggering this method.
     */


    (0, _createClass3.default)(Accordion, [{
      key: 'handleKeypress',
      value: function handleKeypress(event) {
        if (event.keyCode === 13 || event.keyCode === 32) {
          event.target.classList.toggle(this.options.classActive);
        }
      }
    }]);
    return Accordion;
  }((0, _mixin3.default)(_createComponent2.default, _initComponentBySearch2.default));

  Accordion.options = {
    selectorInit: '[data-accordion]',
    accordionItem: '.bx--accordion__item',
    accordionContent: '.bx--accordion__content',
    classActive: 'bx--accordion__item--active'
  };
  Accordion.components = new _weakMap2.default();
  exports.default = Accordion;
});