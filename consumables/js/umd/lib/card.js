(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'babel-runtime/core-js/weak-map', 'babel-runtime/core-js/math/sign', 'babel-runtime/helpers/toConsumableArray', 'babel-runtime/core-js/object/get-prototype-of', 'babel-runtime/helpers/classCallCheck', 'babel-runtime/helpers/createClass', 'babel-runtime/helpers/possibleConstructorReturn', 'babel-runtime/helpers/inherits', '../misc/mixin', '../mixins/create-component', '../mixins/init-component-by-search', '../polyfills/event-matches', '../polyfills/array-from', '../polyfills/element-matches', '../polyfills/object-assign', '../polyfills/math-sign'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('babel-runtime/core-js/weak-map'), require('babel-runtime/core-js/math/sign'), require('babel-runtime/helpers/toConsumableArray'), require('babel-runtime/core-js/object/get-prototype-of'), require('babel-runtime/helpers/classCallCheck'), require('babel-runtime/helpers/createClass'), require('babel-runtime/helpers/possibleConstructorReturn'), require('babel-runtime/helpers/inherits'), require('../misc/mixin'), require('../mixins/create-component'), require('../mixins/init-component-by-search'), require('../polyfills/event-matches'), require('../polyfills/array-from'), require('../polyfills/element-matches'), require('../polyfills/object-assign'), require('../polyfills/math-sign'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.weakMap, global.sign, global.toConsumableArray, global.getPrototypeOf, global.classCallCheck, global.createClass, global.possibleConstructorReturn, global.inherits, global.mixin, global.createComponent, global.initComponentBySearch, global.eventMatches, global.arrayFrom, global.elementMatches, global.objectAssign, global.mathSign);
    global.card = mod.exports;
  }
})(this, function (exports, _weakMap, _sign, _toConsumableArray2, _getPrototypeOf, _classCallCheck2, _createClass2, _possibleConstructorReturn2, _inherits2, _mixin2, _createComponent, _initComponentBySearch, _eventMatches) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _weakMap2 = _interopRequireDefault(_weakMap);

  var _sign2 = _interopRequireDefault(_sign);

  var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

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

  var Card = function (_mixin) {
    (0, _inherits3.default)(Card, _mixin);

    /**
     * The container for cards.
     * @extends CreateComponent
     * @extends InitComponentBySearch
     * @param {HTMLElement} element The element working as a container.
     * @param {Object} [options] The component options.
     * @param {string} [options.selectorCard] The CSS selector to find cards.
     */
    function Card(element, options) {
      (0, _classCallCheck3.default)(this, Card);

      var _this = (0, _possibleConstructorReturn3.default)(this, (Card.__proto__ || (0, _getPrototypeOf2.default)(Card)).call(this, element, options));

      _this.element.addEventListener('keydown', function (event) {
        _this.cardKeyPress(event);
      });
      return _this;
    }

    /**
     * Goes back/forward among cards,
     * right arrow key for going forward, left arrow key for going backward.
     * @param {Event} event The event triggering this method.
     */


    (0, _createClass3.default)(Card, [{
      key: 'cardKeyPress',
      value: function cardKeyPress(event) {
        var direction = {
          Left: -1,
          Right: 1,
          ArrowLeft: -1,
          ArrowRight: 1
        }[event.key || event.keyIdentifier];
        var card = (0, _eventMatches2.default)(event, this.options.selectorCard);

        if (direction && card && card === document.activeElement) {
          var cards = [].concat((0, _toConsumableArray3.default)(this.element.querySelectorAll(this.options.selectorCard)));
          var nextIndex = Math.max(cards.indexOf(card) + direction, -1 /* For `card` not found in `cards` */);
          var nextIndexLooped = nextIndex >= 0 && nextIndex < cards.length ? nextIndex : nextIndex - (0, _sign2.default)(nextIndex) * cards.length;
          cards[nextIndexLooped].focus();
        }
      }
    }]);
    return Card;
  }((0, _mixin3.default)(_createComponent2.default, _initComponentBySearch2.default));

  Card.components = new _weakMap2.default();
  Card.options = {
    selectorInit: '[data-card-list]',
    selectorCard: '.bx--card'
  };
  exports.default = Card;
});