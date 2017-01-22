(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'babel-runtime/core-js/object/create', 'babel-runtime/core-js/object/assign', 'babel-runtime/core-js/object/get-prototype-of', 'babel-runtime/helpers/classCallCheck', 'babel-runtime/helpers/createClass', 'babel-runtime/helpers/possibleConstructorReturn', 'babel-runtime/helpers/inherits'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('babel-runtime/core-js/object/create'), require('babel-runtime/core-js/object/assign'), require('babel-runtime/core-js/object/get-prototype-of'), require('babel-runtime/helpers/classCallCheck'), require('babel-runtime/helpers/createClass'), require('babel-runtime/helpers/possibleConstructorReturn'), require('babel-runtime/helpers/inherits'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.create, global.assign, global.getPrototypeOf, global.classCallCheck, global.createClass, global.possibleConstructorReturn, global.inherits);
    global.createComponent = mod.exports;
  }
})(this, function (exports, _create, _assign, _getPrototypeOf, _classCallCheck2, _createClass2, _possibleConstructorReturn2, _inherits2) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  exports.default = function (ToMix) {
    var CreateComponent = function (_ToMix) {
      (0, _inherits3.default)(CreateComponent, _ToMix);

      /**
       * Mix-in class to manage lifecycle of component.
       * The constructor sets up this component's effective options,
       * and registers this component't instance associated to an element.
       * @implements Handle
       * @param {HTMLElement} element The element working as this component.
       * @param {Object} [options] The component options.
       */
      function CreateComponent(element) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        (0, _classCallCheck3.default)(this, CreateComponent);

        var _this = (0, _possibleConstructorReturn3.default)(this, (CreateComponent.__proto__ || (0, _getPrototypeOf2.default)(CreateComponent)).call(this, element, options));

        if (!element || element.nodeType !== Node.ELEMENT_NODE) {
          throw new TypeError('DOM element should be given to initialize this widget.');
        }

        _this.element = element;
        _this.options = (0, _assign2.default)((0, _create2.default)(_this.constructor.options), options);
        _this.constructor.components.set(_this.element, _this);
        return _this;
      }

      /**
       * Instantiates this component of the given element.
       * @param {HTMLElement} element The element.
       */


      (0, _createClass3.default)(CreateComponent, [{
        key: 'release',


        /**
         * Releases this component's instance from the associated element.
         */
        value: function release() {
          this.constructor.components.delete(this.element);
          return null;
        }
      }], [{
        key: 'create',
        value: function create(element, options) {
          return this.components.get(element) || new this(element, options);
        }
      }]);
      return CreateComponent;
    }(ToMix);

    return CreateComponent;
  };

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