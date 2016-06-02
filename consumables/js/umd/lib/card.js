(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'babel-runtime/core-js/weak-map', 'babel-runtime/core-js/math/sign', 'babel-runtime/helpers/toConsumableArray', 'babel-runtime/core-js/object/assign', 'babel-runtime/helpers/classCallCheck', 'babel-runtime/helpers/createClass', '../polyfills/event-matches', '../polyfills/array-from', '../polyfills/object-assign', '../polyfills/math-sign'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('babel-runtime/core-js/weak-map'), require('babel-runtime/core-js/math/sign'), require('babel-runtime/helpers/toConsumableArray'), require('babel-runtime/core-js/object/assign'), require('babel-runtime/helpers/classCallCheck'), require('babel-runtime/helpers/createClass'), require('../polyfills/event-matches'), require('../polyfills/array-from'), require('../polyfills/object-assign'), require('../polyfills/math-sign'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.weakMap, global.sign, global.toConsumableArray, global.assign, global.classCallCheck, global.createClass, global.eventMatches, global.arrayFrom, global.objectAssign, global.mathSign);
    global.card = mod.exports;
  }
})(this, function (exports, _weakMap, _sign, _toConsumableArray2, _assign, _classCallCheck2, _createClass2, _eventMatches) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _weakMap2 = _interopRequireDefault(_weakMap);

  var _sign2 = _interopRequireDefault(_sign);

  var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

  var _assign2 = _interopRequireDefault(_assign);

  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

  var _createClass3 = _interopRequireDefault(_createClass2);

  var _eventMatches2 = _interopRequireDefault(_eventMatches);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var Card = function () {
    /**
     * The container for cards.
     * @implements Component
     * @param {HTMLElement} element The element working as a container.
     * @param {Object} [options] The component options.
     * @param {string} [options.selectorCard] The CSS selector to find cards.
     */

    function Card(element) {
      var _this = this;

      var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
      (0, _classCallCheck3.default)(this, Card);

      if (!element || element.nodeType !== Node.ELEMENT_NODE) {
        throw new TypeError('DOM element should be given to initialize this widget.');
      }
      this.element = element;
      this.options = (0, _assign2.default)({
        selectorCard: '.bx--card'
      }, options);
      this.constructor.components.set(this.element, this);
      this.element.addEventListener('keydown', function (event) {
        return _this.cardKeyPress(event);
      });
    }

    /**
     * Instantiates card container of the given element.
     * @param {HTMLElement} element The element working as a container.
     * @param {Object} [options] The component options.
     * @param {string} [options.selectorCard] The CSS selector to find cards.
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
    }, {
      key: 'release',
      value: function release() {
        this.constructor.components.delete(this.element);
      }
    }], [{
      key: 'create',
      value: function create(element, options) {
        return this.components.get(element) || new this(element, options);
      }
    }, {
      key: 'init',
      value: function init() {
        var _this2 = this;

        var target = arguments.length <= 0 || arguments[0] === undefined ? document : arguments[0];
        var options = arguments[1];

        if (target.nodeType !== Node.ELEMENT_NODE && target.nodeType !== Node.DOCUMENT_NODE) {
          throw new Error('DOM document or DOM element should be given to search for and initialize this widget.');
        }
        if (target.nodeType === Node.ELEMENT_NODE && target.dataset.cardList !== undefined) {
          this.create(target, options);
        } else {
          [].concat((0, _toConsumableArray3.default)(target.querySelectorAll('[data-card-list]'))).forEach(function (element) {
            return _this2.create(element, options);
          });
        }
      }
    }]);
    return Card;
  }();

  exports.default = Card;


  /**
   * The component options.
   * @member {Object} Card#options
   * @property {string} [selectorCard] The CSS selector to find cards.
   */

  /**
   * The map associating DOM element and card list instance.
   * @type {WeakMap}
   */
  Card.components = new _weakMap2.default();
});