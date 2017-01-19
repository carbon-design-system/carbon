(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'babel-runtime/core-js/weak-map', 'babel-runtime/helpers/toConsumableArray', 'babel-runtime/core-js/object/get-prototype-of', 'babel-runtime/helpers/classCallCheck', 'babel-runtime/helpers/createClass', 'babel-runtime/helpers/possibleConstructorReturn', 'babel-runtime/helpers/inherits', '../misc/mixin', '../mixins/create-component', '../mixins/init-component-by-search', '../polyfills/toggle-class', '../polyfills/array-from', '../polyfills/element-matches', '../polyfills/object-assign', '../polyfills/custom-event'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('babel-runtime/core-js/weak-map'), require('babel-runtime/helpers/toConsumableArray'), require('babel-runtime/core-js/object/get-prototype-of'), require('babel-runtime/helpers/classCallCheck'), require('babel-runtime/helpers/createClass'), require('babel-runtime/helpers/possibleConstructorReturn'), require('babel-runtime/helpers/inherits'), require('../misc/mixin'), require('../mixins/create-component'), require('../mixins/init-component-by-search'), require('../polyfills/toggle-class'), require('../polyfills/array-from'), require('../polyfills/element-matches'), require('../polyfills/object-assign'), require('../polyfills/custom-event'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.weakMap, global.toConsumableArray, global.getPrototypeOf, global.classCallCheck, global.createClass, global.possibleConstructorReturn, global.inherits, global.mixin, global.createComponent, global.initComponentBySearch, global.toggleClass, global.arrayFrom, global.elementMatches, global.objectAssign, global.customEvent);
    global.searchWithOptions = mod.exports;
  }
})(this, function (exports, _weakMap, _toConsumableArray2, _getPrototypeOf, _classCallCheck2, _createClass2, _possibleConstructorReturn2, _inherits2, _mixin2, _createComponent, _initComponentBySearch, _toggleClass) {
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

  var _toggleClass2 = _interopRequireDefault(_toggleClass);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var SearchWithOptions = function (_mixin) {
    (0, _inherits3.default)(SearchWithOptions, _mixin);

    /**
     * Search with Options.
     * @extends CreateComponent
     * @extends InitComponentBySearch
     * @param {HTMLElement} element The element working as the search component.
     * @param {Object} [options] The component options
     * @param {string} [options.selectorToggleLayoutBtn]
     *   The data attribute selector for the button that toggles between the layouts.
     * @param {string} [options.selectorIconContainer] The data attribute selector for the icon layout container.
     * @param {string} [options.classHiddenContainer] The class selector for a hidden container.
     */
    function SearchWithOptions(element, options) {
      (0, _classCallCheck3.default)(this, SearchWithOptions);

      var _this = (0, _possibleConstructorReturn3.default)(this, (SearchWithOptions.__proto__ || (0, _getPrototypeOf2.default)(SearchWithOptions)).call(this, element, options));

      var toggleLayoutBtnNode = _this.element.querySelector(_this.options.selectorToggleLayoutBtn);
      toggleLayoutBtnNode.addEventListener('click', function (evt) {
        _this.toggleLayout(evt);
      });
      return _this;
    }

    /**
     * Toggles between the grid and list layout.
     * @param {Event} event The event triggering this method.
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
    }]);
    return SearchWithOptions;
  }((0, _mixin3.default)(_createComponent2.default, _initComponentBySearch2.default));

  SearchWithOptions.components = new _weakMap2.default();
  SearchWithOptions.options = {
    selectorInit: '[data-search-with-options]',
    selectorToggleLayoutBtn: '[data-search-toggle-btn]',
    selectorIconContainer: '[data-search-toggle-layout]',
    classHiddenContainer: 'bx--search__toggle-layout__container--hidden'
  };
  exports.default = SearchWithOptions;
});