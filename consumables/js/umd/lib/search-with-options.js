(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'babel-runtime/core-js/weak-map', 'babel-runtime/helpers/toConsumableArray', 'babel-runtime/core-js/object/assign', 'babel-runtime/helpers/classCallCheck', 'babel-runtime/helpers/createClass', '../polyfills/toggle-class', '../polyfills/array-from', '../polyfills/object-assign', '../polyfills/custom-event'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('babel-runtime/core-js/weak-map'), require('babel-runtime/helpers/toConsumableArray'), require('babel-runtime/core-js/object/assign'), require('babel-runtime/helpers/classCallCheck'), require('babel-runtime/helpers/createClass'), require('../polyfills/toggle-class'), require('../polyfills/array-from'), require('../polyfills/object-assign'), require('../polyfills/custom-event'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.weakMap, global.toConsumableArray, global.assign, global.classCallCheck, global.createClass, global.toggleClass, global.arrayFrom, global.objectAssign, global.customEvent);
    global.searchWithOptions = mod.exports;
  }
})(this, function (exports, _weakMap, _toConsumableArray2, _assign, _classCallCheck2, _createClass2, _toggleClass) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _weakMap2 = _interopRequireDefault(_weakMap);

  var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

  var _assign2 = _interopRequireDefault(_assign);

  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

  var _createClass3 = _interopRequireDefault(_createClass2);

  var _toggleClass2 = _interopRequireDefault(_toggleClass);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var SearchWithOptions = function () {
    /**
     * Search with Options.
     * @implements Component
     * @param {HTMLElement} element The element working as the search component.
     * @param {Object} [options] The component options
     * @param {string} [options.selectorToggleLayoutBtn] The data attribute selector for the button that toggles between the layouts.
     * @param {string} [options.selectorIconContainer] The data attribute selector for the icon layout container.
     * @param {string} [options.classHiddenContainer] The class selector for a hidden container.
     */

    function SearchWithOptions(element) {
      var _this = this;

      var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
      (0, _classCallCheck3.default)(this, SearchWithOptions);

      if (!element || element.nodeType !== Node.ELEMENT_NODE) {
        throw new TypeError('DOM element should be given to initialize this widget.');
      }

      this.element = element;

      this.options = (0, _assign2.default)({
        selectorToggleLayoutBtn: '[data-search-toggle-btn]',
        selectorIconContainer: '[data-search-toggle-layout]',
        classHiddenContainer: 'bx--search__toggle-layout__container--hidden'
      }, options);

      this.constructor.components.set(this.element, this);

      this.element.querySelector(this.options.selectorToggleLayoutBtn).addEventListener('click', function (evt) {
        return _this.toggleLayout(evt);
      });
    }

    /**
     * Instantiates a search component of the given element.
     * @param {HTMLElement} element The element working as the search component.
     * @param {Object} [options] The component options
     */


    (0, _createClass3.default)(SearchWithOptions, [{
      key: 'toggleLayout',
      value: function toggleLayout(evt) {
        var _this2 = this;

        var btn = evt.currentTarget;
        var iconContainers = [].concat((0, _toConsumableArray3.default)(btn.querySelectorAll(this.options.selectorIconContainer)));
        iconContainers.forEach(function (container) {
          var isHidden = container.classList.contains(_this2.options.classHiddenContainer);
          (0, _toggleClass2.default)(container, _this2.options.classHiddenContainer, !isHidden);
        });
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
        var _this3 = this;

        var target = arguments.length <= 0 || arguments[0] === undefined ? document : arguments[0];
        var options = arguments[1];

        if (target.nodeType !== Node.ELEMENT_NODE && target.nodeType !== Node.DOCUMENT_NODE) {
          throw new Error('DOM document or DOM element should be given to search for and initialize this widget.');
        }
        if (target.nodeType === Node.ELEMENT_NODE) {
          this.create(target, options);
        } else {
          [].concat((0, _toConsumableArray3.default)(target.querySelectorAll('[data-search-with-options]'))).forEach(function (element) {
            return _this3.create(element, options);
          });
        }
      }
    }]);
    return SearchWithOptions;
  }();

  exports.default = SearchWithOptions;


  SearchWithOptions.components = new _weakMap2.default();
});