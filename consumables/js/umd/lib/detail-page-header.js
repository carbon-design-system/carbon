(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'babel-runtime/core-js/weak-map', 'babel-runtime/helpers/toConsumableArray', 'babel-runtime/core-js/object/create', 'babel-runtime/core-js/object/assign', 'babel-runtime/helpers/classCallCheck', 'babel-runtime/helpers/createClass', 'lodash.debounce'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('babel-runtime/core-js/weak-map'), require('babel-runtime/helpers/toConsumableArray'), require('babel-runtime/core-js/object/create'), require('babel-runtime/core-js/object/assign'), require('babel-runtime/helpers/classCallCheck'), require('babel-runtime/helpers/createClass'), require('lodash.debounce'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.weakMap, global.toConsumableArray, global.create, global.assign, global.classCallCheck, global.createClass, global.lodash);
    global.detailPageHeader = mod.exports;
  }
})(this, function (exports, _weakMap, _toConsumableArray2, _create, _assign, _classCallCheck2, _createClass2, _lodash) {
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

  var _lodash2 = _interopRequireDefault(_lodash);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var DetailPageHeader = function () {

    /**
     * The Detail Page Header.
     * @implements Component
     * @param {HTMLElement} element The element working as a page header.
     * @param {Object} [options] The component options.
     */
    function DetailPageHeader(element) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      (0, _classCallCheck3.default)(this, DetailPageHeader);

      if (!element || element.nodeType !== Node.ELEMENT_NODE) {
        throw new TypeError('DOM element should be given to initialize this widget.');
      }

      this.element = element;

      this.options = (0, _assign2.default)(this.constructor.options, options);

      this.constructor.components.set(this.element, this);

      // Debounce scroll event calls to handleScroll
      var debouncedScroll = (0, _lodash2.default)(this.handleScroll.bind(this), 50);

      this.element.ownerDocument.defaultView.addEventListener('scroll', debouncedScroll);
    }

    /**
     * Instantiates detail page header of the given element.
     * @param {HTMLElement} element The element.
     * @param {Object} [options] The component options.
     */


    (0, _createClass3.default)(DetailPageHeader, [{
      key: 'handleScroll',
      value: function handleScroll() {
        if (this.element.ownerDocument.defaultView.scrollY > 101) {
          this.element.classList.add(this.options.slideUp);
        } else {
          this.element.classList.remove(this.options.slideUp);
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
        var _this = this;

        var target = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document;
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        var effectiveOptions = (0, _assign2.default)((0, _create2.default)(this.options), options);
        if (target.nodeType !== Node.ELEMENT_NODE && target.nodeType !== Node.DOCUMENT_NODE) {
          throw new Error('DOM document or DOM element should be given to search for and initialize this widget.');
        }
        if (target.nodeType === Node.ELEMENT_NODE && target.matches(effectiveOptions.selectorInit)) {
          this.create(target, effectiveOptions);
        } else {
          [].concat((0, _toConsumableArray3.default)(target.querySelectorAll(effectiveOptions.selectorInit))).forEach(function (element) {
            return _this.create(element, effectiveOptions);
          });
        }
      }
    }]);
    return DetailPageHeader;
  }();

  exports.default = DetailPageHeader;


  /**
   * The map associating DOM element and detail page header instance.
   * @type {WeakMap}
   */
  DetailPageHeader.components = new _weakMap2.default();

  /**
   * The component options.
   * If `options` is specified in the constructor, {@linkcode DetailPageHeader.create .create()}, or {@linkcode DetailPageHeader.init .init()},
   * properties in this object are overriden for the instance being create and how {@linkcode DetailPageHeader.init .init()} works.
   * @property {string} selectorInit The CSS selector to find detail page headers.
   */
  DetailPageHeader.options = {
    slideUp: 'bx--detail-page-header--with-tabs--animated-slide-up',
    selectorInit: '[data-detail-page-header]'
  };
});