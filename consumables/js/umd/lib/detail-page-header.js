(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'babel-runtime/core-js/weak-map', 'babel-runtime/core-js/object/get-prototype-of', 'babel-runtime/helpers/classCallCheck', 'babel-runtime/helpers/createClass', 'babel-runtime/helpers/possibleConstructorReturn', 'babel-runtime/helpers/get', 'babel-runtime/helpers/inherits', 'lodash.debounce', '../misc/mixin', '../mixins/create-component', '../mixins/init-component-by-search', '../misc/on', '../polyfills/array-from', '../polyfills/element-matches', '../polyfills/object-assign'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('babel-runtime/core-js/weak-map'), require('babel-runtime/core-js/object/get-prototype-of'), require('babel-runtime/helpers/classCallCheck'), require('babel-runtime/helpers/createClass'), require('babel-runtime/helpers/possibleConstructorReturn'), require('babel-runtime/helpers/get'), require('babel-runtime/helpers/inherits'), require('lodash.debounce'), require('../misc/mixin'), require('../mixins/create-component'), require('../mixins/init-component-by-search'), require('../misc/on'), require('../polyfills/array-from'), require('../polyfills/element-matches'), require('../polyfills/object-assign'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.weakMap, global.getPrototypeOf, global.classCallCheck, global.createClass, global.possibleConstructorReturn, global.get, global.inherits, global.lodash, global.mixin, global.createComponent, global.initComponentBySearch, global.on, global.arrayFrom, global.elementMatches, global.objectAssign);
    global.detailPageHeader = mod.exports;
  }
})(this, function (exports, _weakMap, _getPrototypeOf, _classCallCheck2, _createClass2, _possibleConstructorReturn2, _get2, _inherits2, _lodash, _mixin2, _createComponent, _initComponentBySearch, _on) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _weakMap2 = _interopRequireDefault(_weakMap);

  var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

  var _createClass3 = _interopRequireDefault(_createClass2);

  var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

  var _get3 = _interopRequireDefault(_get2);

  var _inherits3 = _interopRequireDefault(_inherits2);

  var _lodash2 = _interopRequireDefault(_lodash);

  var _mixin3 = _interopRequireDefault(_mixin2);

  var _createComponent2 = _interopRequireDefault(_createComponent);

  var _initComponentBySearch2 = _interopRequireDefault(_initComponentBySearch);

  var _on2 = _interopRequireDefault(_on);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var DetailPageHeader = function (_mixin) {
    (0, _inherits3.default)(DetailPageHeader, _mixin);

    /**
     * The Detail Page Header.
     * @extends CreateComponent
     * @extends InitComponentBySearch
     * @param {HTMLElement} element The element working as a page header.
     * @param {Object} [options] The component options.
     */
    function DetailPageHeader(element, options) {
      (0, _classCallCheck3.default)(this, DetailPageHeader);

      var _this = (0, _possibleConstructorReturn3.default)(this, (DetailPageHeader.__proto__ || (0, _getPrototypeOf2.default)(DetailPageHeader)).call(this, element, options));

      // Debounce scroll event calls to handleScroll
      var debouncedScroll = (0, _lodash2.default)(_this.handleScroll.bind(_this), 50);

      _this.hScroll = (0, _on2.default)(_this.element.ownerDocument.defaultView, 'scroll', debouncedScroll);
      return _this;
    }

    /**
     * Adds class to header based on users position on the page
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
        this.hScroll.release();
        (0, _get3.default)(DetailPageHeader.prototype.__proto__ || (0, _getPrototypeOf2.default)(DetailPageHeader.prototype), 'release', this).call(this);
      }
    }]);
    return DetailPageHeader;
  }((0, _mixin3.default)(_createComponent2.default, _initComponentBySearch2.default));

  DetailPageHeader.components = new _weakMap2.default();
  DetailPageHeader.options = {
    slideUp: 'bx--detail-page-header--with-tabs--animated-slide-up',
    selectorInit: '[data-detail-page-header]'
  };
  exports.default = DetailPageHeader;
});