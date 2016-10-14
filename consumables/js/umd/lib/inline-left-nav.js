(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'babel-runtime/core-js/weak-map', 'babel-runtime/core-js/object/create', 'babel-runtime/helpers/toConsumableArray', 'babel-runtime/core-js/object/assign', 'babel-runtime/helpers/classCallCheck', 'babel-runtime/helpers/createClass', '../polyfills/toggle-class', '../polyfills/event-matches', '../polyfills/array-from', '../polyfills/object-assign', '../polyfills/custom-event'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('babel-runtime/core-js/weak-map'), require('babel-runtime/core-js/object/create'), require('babel-runtime/helpers/toConsumableArray'), require('babel-runtime/core-js/object/assign'), require('babel-runtime/helpers/classCallCheck'), require('babel-runtime/helpers/createClass'), require('../polyfills/toggle-class'), require('../polyfills/event-matches'), require('../polyfills/array-from'), require('../polyfills/object-assign'), require('../polyfills/custom-event'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.weakMap, global.create, global.toConsumableArray, global.assign, global.classCallCheck, global.createClass, global.toggleClass, global.eventMatches, global.arrayFrom, global.objectAssign, global.customEvent);
    global.inlineLeftNav = mod.exports;
  }
})(this, function (exports, _weakMap, _create, _toConsumableArray2, _assign, _classCallCheck2, _createClass2, _toggleClass, _eventMatches) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _weakMap2 = _interopRequireDefault(_weakMap);

  var _create2 = _interopRequireDefault(_create);

  var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

  var _assign2 = _interopRequireDefault(_assign);

  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

  var _createClass3 = _interopRequireDefault(_createClass2);

  var _toggleClass2 = _interopRequireDefault(_toggleClass);

  var _eventMatches2 = _interopRequireDefault(_eventMatches);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var InlineLeftNav = function () {
    /**
     * Spinner indicating loading state.
     * @implements Component
     * @param {HTMLElement} element The element working as a spinner.
     * @param {Object} options The component options.
     */
    function InlineLeftNav(element) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      (0, _classCallCheck3.default)(this, InlineLeftNav);

      if (!element || element.nodeType !== Node.ELEMENT_NODE) {
        throw new TypeError('DOM element should be given to initialize this widget.');
      }

      this.options = (0, _assign2.default)(this.constructor.options, options);

      this.element = element;

      this.constructor.components.set(this.element, this);
      this.hookListItemsEvents();
    }

    /**
     * Instantiates spinner of the given element.
     * @param {HTMLElement} element The element.
     */


    (0, _createClass3.default)(InlineLeftNav, [{
      key: 'hookListItemsEvents',
      value: function hookListItemsEvents() {
        var _this = this;

        var leftNavList = this.element.querySelector(this.options.selectorLeftNavList);
        leftNavList.addEventListener('click', function (evt) {
          var leftNavItem = (0, _eventMatches2.default)(evt, _this.options.selectorLeftNavListItem);
          if (leftNavItem) {
            var childItem = (0, _eventMatches2.default)(evt, _this.options.selectorLeftNavNestedListItem);
            var hasChildren = leftNavItem.classList.contains('left-nav-list__item--has-children');
            if (childItem) {
              _this.addActiveListItem(childItem);
            } else if (hasChildren) {
              _this.handleNestedListClick(leftNavItem, evt);
            } else {
              _this.addActiveListItem(leftNavItem);
            }
          }
        });
        [].concat((0, _toConsumableArray3.default)(this.element.querySelectorAll(this.options.selectorLeftNavListItem))).forEach(function (item) {
          item.addEventListener('keydown', function (evt) {
            var leftNavItemWithChildren = (0, _eventMatches2.default)(evt, _this.options.selectorLeftNavListItemHasChildren);
            if (leftNavItemWithChildren && evt.which === 13) {
              _this.handleNestedListClick(leftNavItemWithChildren);
            }
          });
        });
      }
    }, {
      key: 'addActiveListItem',
      value: function addActiveListItem(item) {
        var _this2 = this;

        [].concat((0, _toConsumableArray3.default)(this.element.querySelectorAll(this.options.selectorLeftNavListItem))).forEach(function (currentItem) {
          if (!(item === currentItem)) {
            currentItem.classList.remove(_this2.options.classActiveLeftNavListItem);
          }
        });
        [].concat((0, _toConsumableArray3.default)(this.element.querySelectorAll(this.options.selectorLeftNavNestedListItem))).forEach(function (currentItem) {
          if (!(item === currentItem)) {
            currentItem.classList.remove(_this2.options.classActiveLeftNavListItem);
          }
        });
        item.classList.add(this.options.classActiveLeftNavListItem);
      }
    }, {
      key: 'handleNestedListClick',
      value: function handleNestedListClick(listItem, evt) {
        var _this3 = this;

        var isOpen = listItem.classList.contains(this.options.classExpandedLeftNavListItem);
        if (!('leftNavItemLink' in evt.target.dataset)) {
          (0, _toggleClass2.default)(listItem, this.options.classExpandedLeftNavListItem, !isOpen);
        }
        var list = listItem.querySelector(this.options.selectorLeftNavNestedList);
        var listItems = [].concat((0, _toConsumableArray3.default)(list.querySelectorAll(this.options.selectorLeftNavNestedListItem)));
        listItems.forEach(function (item) {
          if (isOpen) {
            item.querySelector(_this3.options.selectorLeftNavListItemLink).tabIndex = -1;
          } else {
            item.querySelector(_this3.options.selectorLeftNavListItemLink).tabIndex = 0;
          }
        });
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
        var _this4 = this;

        var target = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document;
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        var effectiveOptions = (0, _assign2.default)((0, _create2.default)(this.options), options);
        if (target.nodeType !== Node.ELEMENT_NODE && target.nodeType !== Node.DOCUMENT_NODE) {
          throw new Error('DOM document or DOM element should be given to search for and initialize this widget.');
        }
        if (target.nodeType === Node.ELEMENT_NODE) {
          this.create(target, effectiveOptions);
        } else {
          [].concat((0, _toConsumableArray3.default)(target.querySelectorAll(effectiveOptions.selectorInit))).forEach(function (element) {
            return _this4.create(element, effectiveOptions);
          });
        }
      }
    }]);
    return InlineLeftNav;
  }();

  exports.default = InlineLeftNav;


  /**
   * The map associating DOM element and spinner instance.
   * @type {WeakMap}
   */
  InlineLeftNav.components = new _weakMap2.default();

  /**
   * The component options.
   * If `options` is specified in the constructor, {@linkcode InlineLeftNav.create .create()}, or {@linkcode InlineLeftNav.init .init()},
   * properties in this object are overriden for the instance being create and how {@linkcode InlineLeftNav.init .init()} works.
   * @property {string} selectorInit The CSS selector to find inline left navs.
   */
  InlineLeftNav.options = {
    selectorInit: '[data-inline-left-nav]',
    // Data Attribute selectors
    selectorLeftNavList: '[data-inline-left-nav-list]',
    selectorLeftNavNestedList: '[data-inline-left-nav-nested-list]',
    selectorLeftNavListItem: '[data-inline-left-nav-item]',
    selectorLeftNavListItemLink: '[data-inline-left-nav-item-link]',
    selectorLeftNavNestedListItem: '[data-inline-left-nav-nested-item]',
    // CSS Class Selectors
    classActiveLeftNavListItem: 'left-nav-list__item--active',
    classExpandedLeftNavListItem: 'left-nav-list__item--expanded'
  };
});