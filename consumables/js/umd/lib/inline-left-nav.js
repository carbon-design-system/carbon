(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'babel-runtime/core-js/weak-map', 'babel-runtime/helpers/toConsumableArray', 'babel-runtime/core-js/object/get-prototype-of', 'babel-runtime/helpers/classCallCheck', 'babel-runtime/helpers/createClass', 'babel-runtime/helpers/possibleConstructorReturn', 'babel-runtime/helpers/inherits', '../misc/mixin', '../mixins/create-component', '../mixins/init-component-by-search', '../polyfills/toggle-class', '../polyfills/event-matches', '../polyfills/array-from', '../polyfills/element-matches', '../polyfills/object-assign', '../polyfills/custom-event'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('babel-runtime/core-js/weak-map'), require('babel-runtime/helpers/toConsumableArray'), require('babel-runtime/core-js/object/get-prototype-of'), require('babel-runtime/helpers/classCallCheck'), require('babel-runtime/helpers/createClass'), require('babel-runtime/helpers/possibleConstructorReturn'), require('babel-runtime/helpers/inherits'), require('../misc/mixin'), require('../mixins/create-component'), require('../mixins/init-component-by-search'), require('../polyfills/toggle-class'), require('../polyfills/event-matches'), require('../polyfills/array-from'), require('../polyfills/element-matches'), require('../polyfills/object-assign'), require('../polyfills/custom-event'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.weakMap, global.toConsumableArray, global.getPrototypeOf, global.classCallCheck, global.createClass, global.possibleConstructorReturn, global.inherits, global.mixin, global.createComponent, global.initComponentBySearch, global.toggleClass, global.eventMatches, global.arrayFrom, global.elementMatches, global.objectAssign, global.customEvent);
    global.inlineLeftNav = mod.exports;
  }
})(this, function (exports, _weakMap, _toConsumableArray2, _getPrototypeOf, _classCallCheck2, _createClass2, _possibleConstructorReturn2, _inherits2, _mixin2, _createComponent, _initComponentBySearch, _toggleClass, _eventMatches) {
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

  var _eventMatches2 = _interopRequireDefault(_eventMatches);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var InlineLeftNav = function (_mixin) {
    (0, _inherits3.default)(InlineLeftNav, _mixin);

    /**
     * Spinner indicating loading state.
     * @extends CreateComponent
     * @extends InitComponentBySearch
     * @param {HTMLElement} element The element working as a spinner.
     * @param {Object} options The component options.
     */
    function InlineLeftNav(element, options) {
      (0, _classCallCheck3.default)(this, InlineLeftNav);

      var _this = (0, _possibleConstructorReturn3.default)(this, (InlineLeftNav.__proto__ || (0, _getPrototypeOf2.default)(InlineLeftNav)).call(this, element, options));

      _this.constructor.components.set(_this.element, _this);
      _this.hookListItemsEvents();
      return _this;
    }

    (0, _createClass3.default)(InlineLeftNav, [{
      key: 'hookListItemsEvents',
      value: function hookListItemsEvents() {
        var _this2 = this;

        var leftNavList = this.element.querySelector(this.options.selectorLeftNavList);
        leftNavList.addEventListener('click', function (evt) {
          var leftNavItem = (0, _eventMatches2.default)(evt, _this2.options.selectorLeftNavListItem);
          if (leftNavItem) {
            var childItem = (0, _eventMatches2.default)(evt, _this2.options.selectorLeftNavNestedListItem);
            var hasChildren = leftNavItem.classList.contains('left-nav-list__item--has-children');
            if (childItem) {
              _this2.addActiveListItem(childItem);
            } else if (hasChildren) {
              _this2.handleNestedListClick(leftNavItem, evt);
            } else {
              _this2.addActiveListItem(leftNavItem);
            }
          }
        });
        [].concat((0, _toConsumableArray3.default)(this.element.querySelectorAll(this.options.selectorLeftNavListItem))).forEach(function (item) {
          item.addEventListener('keydown', function (evt) {
            var leftNavItemWithChildren = (0, _eventMatches2.default)(evt, _this2.options.selectorLeftNavListItemHasChildren);
            if (leftNavItemWithChildren && evt.which === 13) {
              _this2.handleNestedListClick(leftNavItemWithChildren, evt);
            }
          });
        });
      }
    }, {
      key: 'addActiveListItem',
      value: function addActiveListItem(item) {
        var _this3 = this;

        [].concat((0, _toConsumableArray3.default)(this.element.querySelectorAll(this.options.selectorLeftNavListItem))).forEach(function (currentItem) {
          if (!(item === currentItem)) {
            currentItem.classList.remove(_this3.options.classActiveLeftNavListItem);
          }
        });
        [].concat((0, _toConsumableArray3.default)(this.element.querySelectorAll(this.options.selectorLeftNavNestedListItem))).forEach(function (currentItem) {
          if (!(item === currentItem)) {
            currentItem.classList.remove(_this3.options.classActiveLeftNavListItem);
          }
        });
        item.classList.add(this.options.classActiveLeftNavListItem);
      }
    }, {
      key: 'handleNestedListClick',
      value: function handleNestedListClick(listItem, evt) {
        var _this4 = this;

        var isOpen = listItem.classList.contains(this.options.classExpandedLeftNavListItem);
        if (!('leftNavItemLink' in evt.target.dataset)) {
          (0, _toggleClass2.default)(listItem, this.options.classExpandedLeftNavListItem, !isOpen);
        }
        var list = listItem.querySelector(this.options.selectorLeftNavNestedList);
        var listItems = [].concat((0, _toConsumableArray3.default)(list.querySelectorAll(this.options.selectorLeftNavNestedListItem)));
        listItems.forEach(function (item) {
          if (isOpen) {
            // eslint-disable-next-line no-param-reassign
            item.querySelector(_this4.options.selectorLeftNavListItemLink).tabIndex = -1;
          } else {
            // eslint-disable-next-line no-param-reassign
            item.querySelector(_this4.options.selectorLeftNavListItemLink).tabIndex = 0;
          }
        });
      }
    }]);
    return InlineLeftNav;
  }((0, _mixin3.default)(_createComponent2.default, _initComponentBySearch2.default));

  InlineLeftNav.components = new _weakMap2.default();
  InlineLeftNav.options = {
    selectorInit: '[data-inline-left-nav]',
    // Data Attribute selectors
    selectorLeftNavList: '[data-inline-left-nav-list]',
    selectorLeftNavNestedList: '[data-inline-left-nav-nested-list]',
    selectorLeftNavListItem: '[data-inline-left-nav-item]',
    selectorLeftNavListItemLink: '[data-inline-left-nav-item-link]',
    selectorLeftNavNestedListItem: '[data-inline-left-nav-nested-item]',
    selectorLeftNavListItemHasChildren: '[data-inline-left-nav-with-children]',
    // CSS Class Selectors
    classActiveLeftNavListItem: 'left-nav-list__item--active',
    classExpandedLeftNavListItem: 'left-nav-list__item--expanded'
  };
  exports.default = InlineLeftNav;
});