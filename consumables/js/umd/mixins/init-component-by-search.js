(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'babel-runtime/helpers/toConsumableArray', 'babel-runtime/core-js/object/create', 'babel-runtime/core-js/object/assign', 'babel-runtime/core-js/object/get-prototype-of', 'babel-runtime/helpers/classCallCheck', 'babel-runtime/helpers/createClass', 'babel-runtime/helpers/possibleConstructorReturn', 'babel-runtime/helpers/inherits'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('babel-runtime/helpers/toConsumableArray'), require('babel-runtime/core-js/object/create'), require('babel-runtime/core-js/object/assign'), require('babel-runtime/core-js/object/get-prototype-of'), require('babel-runtime/helpers/classCallCheck'), require('babel-runtime/helpers/createClass'), require('babel-runtime/helpers/possibleConstructorReturn'), require('babel-runtime/helpers/inherits'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.toConsumableArray, global.create, global.assign, global.getPrototypeOf, global.classCallCheck, global.createClass, global.possibleConstructorReturn, global.inherits);
    global.initComponentBySearch = mod.exports;
  }
})(this, function (exports, _toConsumableArray2, _create, _assign, _getPrototypeOf, _classCallCheck2, _createClass2, _possibleConstructorReturn2, _inherits2) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  exports.default = function (ToMix) {
    /**
     * Mix-in class to instantiate components by searching for their root elements.
     * @class InitComponentBySearch
     */
    var InitComponentBySearch = function (_ToMix) {
      (0, _inherits3.default)(InitComponentBySearch, _ToMix);

      function InitComponentBySearch() {
        (0, _classCallCheck3.default)(this, InitComponentBySearch);
        return (0, _possibleConstructorReturn3.default)(this, (InitComponentBySearch.__proto__ || (0, _getPrototypeOf2.default)(InitComponentBySearch)).apply(this, arguments));
      }

      (0, _createClass3.default)(InitComponentBySearch, null, [{
        key: 'init',

        /**
         * Instantiates component in the given node.
         * If the given element indicates that it's an component of this class, instantiates it.
         * Otherwise, instantiates components by searching for components in the given node.
         * @param {Node} target The DOM node to instantiate components in. Should be a document or an element.
         * @param {Object} [options] The component options.
         * @param {boolean} [options.selectorInit] The CSS selector to find components.
         */
        value: function init() {
          var _this2 = this;

          var target = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document;
          var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

          var effectiveOptions = (0, _assign2.default)((0, _create2.default)(this.options), options);
          if (target.nodeType !== Node.ELEMENT_NODE && target.nodeType !== Node.DOCUMENT_NODE) {
            throw new Error('DOM document or DOM element should be given to search for and initialize this widget.');
          }
          if (target.nodeType === Node.ELEMENT_NODE && target.matches(effectiveOptions.selectorInit)) {
            this.create(target, options);
          } else {
            [].concat((0, _toConsumableArray3.default)(target.querySelectorAll(effectiveOptions.selectorInit))).forEach(function (element) {
              return _this2.create(element, options);
            });
          }
        }
      }]);
      return InitComponentBySearch;
    }(ToMix);

    return InitComponentBySearch;
  };

  var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

  var _create2 = _interopRequireDefault(_create);

  var _assign2 = _interopRequireDefault(_assign);

  var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

  var _createClass3 = _interopRequireDefault(_createClass2);

  var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

  var _inherits3 = _interopRequireDefault(_inherits2);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }
});