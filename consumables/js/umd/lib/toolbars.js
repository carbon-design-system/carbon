(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'babel-runtime/core-js/weak-map', 'babel-runtime/core-js/object/get-prototype-of', 'babel-runtime/helpers/classCallCheck', 'babel-runtime/helpers/createClass', 'babel-runtime/helpers/possibleConstructorReturn', 'babel-runtime/helpers/inherits', '../misc/mixin', '../mixins/create-component', '../mixins/init-component-by-search', '../polyfills/array-from', '../polyfills/element-matches', '../polyfills/object-assign'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('babel-runtime/core-js/weak-map'), require('babel-runtime/core-js/object/get-prototype-of'), require('babel-runtime/helpers/classCallCheck'), require('babel-runtime/helpers/createClass'), require('babel-runtime/helpers/possibleConstructorReturn'), require('babel-runtime/helpers/inherits'), require('../misc/mixin'), require('../mixins/create-component'), require('../mixins/init-component-by-search'), require('../polyfills/array-from'), require('../polyfills/element-matches'), require('../polyfills/object-assign'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.weakMap, global.getPrototypeOf, global.classCallCheck, global.createClass, global.possibleConstructorReturn, global.inherits, global.mixin, global.createComponent, global.initComponentBySearch, global.arrayFrom, global.elementMatches, global.objectAssign);
    global.toolbars = mod.exports;
  }
})(this, function (exports, _weakMap, _getPrototypeOf, _classCallCheck2, _createClass2, _possibleConstructorReturn2, _inherits2, _mixin2, _createComponent, _initComponentBySearch) {
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

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var Toolbars = function (_mixin) {
    (0, _inherits3.default)(Toolbars, _mixin);

    /**
     * Search button in tool bar.
     * @extends CreateComponent
     * @extends InitComponentBySearch
     * @param {HTMLElement} element The element working as an search button.
     */
    function Toolbars(element) {
      (0, _classCallCheck3.default)(this, Toolbars);

      var _this = (0, _possibleConstructorReturn3.default)(this, (Toolbars.__proto__ || (0, _getPrototypeOf2.default)(Toolbars)).call(this, element));

      _this.searchFieldNode = _this.element.ownerDocument.querySelector(_this.element.dataset.listIconsSearchActionTarget);
      _this.element.addEventListener('click', function (event) {
        _this.handleActionClick(event);
      });
      return _this;
    }

    /**
     * Show/hide search box.
     * @param {Event} event The event triggering this method.
     */


    (0, _createClass3.default)(Toolbars, [{
      key: 'handleActionClick',
      value: function handleActionClick(event) {
        var searchActionNode = event.currentTarget;

        if (searchActionNode.tagName === 'A') {
          event.preventDefault();
        }

        this.element.classList.toggle('show-search');
        if (this.searchFieldNode) {
          this.searchFieldNode.classList.toggle('show-search');
          this.searchFieldNode.value = '';
        }
      }
    }]);
    return Toolbars;
  }((0, _mixin3.default)(_createComponent2.default, _initComponentBySearch2.default));

  Toolbars.components = new _weakMap2.default();
  Toolbars.options = {
    selectorInit: '[data-list-icons-search-action-target]'
  };
  exports.default = Toolbars;
});