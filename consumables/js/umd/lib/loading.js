(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'babel-runtime/core-js/weak-map', 'babel-runtime/helpers/toConsumableArray', 'babel-runtime/helpers/classCallCheck', 'babel-runtime/helpers/createClass', '../polyfills/toggle-class'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('babel-runtime/core-js/weak-map'), require('babel-runtime/helpers/toConsumableArray'), require('babel-runtime/helpers/classCallCheck'), require('babel-runtime/helpers/createClass'), require('../polyfills/toggle-class'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.weakMap, global.toConsumableArray, global.classCallCheck, global.createClass, global.toggleClass);
    global.loading = mod.exports;
  }
})(this, function (exports, _weakMap, _toConsumableArray2, _classCallCheck2, _createClass2, _toggleClass) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _weakMap2 = _interopRequireDefault(_weakMap);

  var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

  var _createClass3 = _interopRequireDefault(_createClass2);

  var _toggleClass2 = _interopRequireDefault(_toggleClass);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var Loading = function () {
    /**
     * Spinner indicating loading state.
     * @implements Component
     * @param {HTMLElement} element The element working as a spinner.
     * @param {Object} options The component options.
     * @param {boolean} options.active `true` if this spinner should roll.
     */

    function Loading(element) {
      var options = arguments.length <= 1 || arguments[1] === undefined ? { active: true } : arguments[1];
      (0, _classCallCheck3.default)(this, Loading);

      if (!element || element.nodeType !== Node.ELEMENT_NODE) {
        throw new TypeError('DOM element should be given to initialize this widget.');
      }

      this.element = element;
      this.active = 'active' in options ? options.active : true;
      this.ie = false;

      // Check if browser is Internet Explorer
      if (options.ie || window.ActiveXObject || 'ActiveXObject' in window) {
        this.ie = true;
        this.element.classList.add('bx--loading--ie');
      }

      this.constructor.components.set(this.element, this);

      // Initialize spinner
      this.set(this.active);
    }

    /**
     * Instantiates spinner of the given element.
     * @param {HTMLElement} element The element.
     */


    (0, _createClass3.default)(Loading, [{
      key: 'set',
      value: function set(active) {
        if (typeof active !== 'boolean') {
          throw new TypeError('set expects a boolean.');
        }

        this.active = active;

        if (this.ie) {
          (0, _toggleClass2.default)(this.element, 'bx--loading--stop--ie', !this.active);
        }
        (0, _toggleClass2.default)(this.element, 'bx--loading--stop', !this.active);

        return this;
      }
    }, {
      key: 'toggle',
      value: function toggle() {
        return this.set(!this.active);
      }
    }, {
      key: 'isActive',
      value: function isActive() {
        return this.active;
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
        var _this = this;

        var target = arguments.length <= 0 || arguments[0] === undefined ? document : arguments[0];
        var options = arguments[1];

        if (target.nodeType !== Node.ELEMENT_NODE && target.nodeType !== Node.DOCUMENT_NODE) {
          throw new Error('DOM document or DOM element should be given to search for and initialize this widget.');
        }
        if (target.nodeType === Node.ELEMENT_NODE && target.dataset.loading !== undefined) {
          this.create(target, options);
        } else {
          [].concat((0, _toConsumableArray3.default)(target.querySelectorAll('[data-loading]'))).forEach(function (element) {
            return _this.create(element, options);
          });
        }
      }
    }]);
    return Loading;
  }();

  exports.default = Loading;


  /**
   * The map associating DOM element and spinner instance.
   * @type {WeakMap}
   */
  Loading.components = new _weakMap2.default();
});