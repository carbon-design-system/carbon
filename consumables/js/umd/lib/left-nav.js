(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'babel-runtime/core-js/weak-map', 'babel-runtime/helpers/toConsumableArray', 'babel-runtime/core-js/object/assign', 'babel-runtime/helpers/classCallCheck', 'babel-runtime/helpers/createClass', '../polyfills/toggle-class', '../polyfills/event-matches', '../misc/on', '../polyfills/array-from', '../polyfills/object-assign', '../polyfills/custom-event'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('babel-runtime/core-js/weak-map'), require('babel-runtime/helpers/toConsumableArray'), require('babel-runtime/core-js/object/assign'), require('babel-runtime/helpers/classCallCheck'), require('babel-runtime/helpers/createClass'), require('../polyfills/toggle-class'), require('../polyfills/event-matches'), require('../misc/on'), require('../polyfills/array-from'), require('../polyfills/object-assign'), require('../polyfills/custom-event'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.weakMap, global.toConsumableArray, global.assign, global.classCallCheck, global.createClass, global.toggleClass, global.eventMatches, global.on, global.arrayFrom, global.objectAssign, global.customEvent);
    global.leftNav = mod.exports;
  }
})(this, function (exports, _weakMap, _toConsumableArray2, _assign, _classCallCheck2, _createClass2, _toggleClass, _eventMatches, _on) {
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

  var _eventMatches2 = _interopRequireDefault(_eventMatches);

  var _on2 = _interopRequireDefault(_on);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var LeftNav = function () {
    /**
     * Left Navigation.
     * @implements Component
     * @param {HTMLElement} element The element working as a left navigation.
     * @param {Object} [options] The component options
     * @param {string} [options.selectorLeftNav] The data attribute selector for the nav element in the left nav container.
     * @param {string} [options.selectorLeftNavList] The data attribute selector for the main ul element in the left nav.
     * @param {string} [options.selectorLeftNavNestedList] The data attribute selector for the nested ul elements in the left nav.
     * @param {string} [options.selectorLeftNavToggle] The data attribute selector for the button that will show and hide the left navigation.
     * @param {string} [options.selectorLeftNavListItem] The data attribute selector for all list items in the left navigation.
     * @param {string} [options.selectorLeftNavNestedListItem] The data attribute selector for all nested list items in the left navigation.
     * @param {string} [options.selectorLeftNavArrowIcon] The data attribute selector for the arrow icons in the left nav.
     * @param {string} [options.selectorLeftNavFlyoutMenu] The data attribute selector for the flyout menus in the left nav.
     * @param {string} [options.selectorLeftNavFlyoutItem] The data attribute selector for the flyout menu items in the left nav.
     * @param {string} [options.selectorLeftNavSection] The data attribute selector for the three sections in the header of the left nav.
     * @param {string} [options.selectorLeftNavCurrentPage] The data attribute selector for the current section title in the left nav header.
     * @param {string} [options.classActiveLeftNav] The class name for when a left nav is active.
     * @param {string} [options.classActiveLeftNavListItem] The class name for when a left nav list item is active.
     * @param {string} [options.classExpandedLeftNavListItem] The class name for when a nested list is expanded.
     * @param {string} [options.classFlyoutDisplayed] The class name for when a flyout menu is displayed.
     * @param {string} [options.classActiveSection] The class name for an active section item in the left nav header.
     * @param {string} [options.classItemHasChildren] The class name for when a list item has children.
     */

    function LeftNav(element) {
      var _this = this;

      var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
      (0, _classCallCheck3.default)(this, LeftNav);

      if (!element || element.nodeType !== Node.ELEMENT_NODE) {
        throw new TypeError('DOM element should be given to initialize this widget.');
      }

      this.element = element;

      this.options = (0, _assign2.default)({
        // Data Attribute selectors
        selectorLeftNav: '[data-left-nav]',
        selectorLeftNavList: '[data-left-nav-list]',
        selectorLeftNavNestedList: '[data-left-nav-nested-list]',
        selectorLeftNavToggleOpen: '[data-left-nav-toggle="open"]',
        selectorLeftNavToggleClose: '[data-left-nav-toggle="close"]',
        selectorLeftNavListItem: '[data-left-nav-item]',
        selectorLeftNavListItemLink: '[data-left-nav-item-link]',
        selectorLeftNavNestedListItem: '[data-left-nav-nested-item]',
        selectorLeftNavArrowIcon: '[data-left-nav-icon]',
        selectorLeftNavFlyoutMenu: '[data-left-nav-flyout]',
        selectorLeftNavFlyoutItem: '[data-left-nav-flyout-item]',
        selectorLeftNavSection: '[data-left-nav-section]',
        selectorLeftNavCurrentSection: '[data-left-nav-current-section]',
        selectorLeftNavListItemHasChildren: '[data-left-nav-item-with-children]',
        selectorLeftNavListItemHasFlyout: '[data-left-nav-has-flyout]',
        selectorLeftNavAllListItems: '[data-left-nav-item], [data-left-nav-nested-item], [data-left-nav-flyout-item]',
        // CSS Class Selectors
        classActiveLeftNav: 'bx--left-nav--active',
        classActiveLeftNavListItem: 'bx--left-nav-list__item--active',
        classActiveTrigger: 'bx--left-nav__trigger--active',
        classExpandedLeftNavListItem: 'bx--left-nav-list__item--expanded',
        classFlyoutDisplayed: 'bx--left-nav-list--flyout--displayed',
        classItemHasChildren: 'bx--left-nav-list__item--has-children'
      }, options);

      this.constructor.components.set(this.element, this);

      this.hookOpenActions();
      this.hookListItemsEvents();
      this.animateInNav();
      this.hDocumentClick = (0, _on2.default)(this.element.ownerDocument, 'click', function (evt) {
        return _this.handleDocumentClick(evt);
      });
    }

    /**
     * Instantiates a left navigation of the given element.
     * @param {HTMLElement} element The element working as the left navigation.
     * @param {Object} [options] The component options
     * @param {string} [options.selectorLeftNav] The data attribute selector for the nav element in the left nav container.
     * @param {string} [options.selectorLeftNavList] The data attribute selector for the main ul element in the left nav.
     * @param {string} [options.selectorLeftNavNestedList] The data attribute selector for the nested ul elements in the left nav.
     * @param {string} [options.selectorLeftNavToggle] The data attribute selector for the button that will show and hide the left navigation.
     * @param {string} [options.selectorLeftNavListItem] The data attribute selector for all list items in the left navigation.
     * @param {string} [options.selectorLeftNavNestedListItem] The data attribute selector for all nested list items in the left navigation.
     * @param {string} [options.selectorLeftNavArrowIcon] The data attribute selector for the arrow icons in the left nav.
     * @param {string} [options.selectorLeftNavFlyoutMenu] The data attribute selector for the flyout menus in the left nav.
     * @param {string} [options.selectorLeftNavFlyoutItem] The data attribute selector for the flyout menu items in the left nav.
     * @param {string} [options.selectorLeftNavSection] The data attribute selector for the three sections in the header of the left nav.
     * @param {string} [options.selectorLeftNavCurrentPage] The data attribute selector for the current section title in the left nav header.
     * @param {string} [options.classActiveLeftNav] The class name for when a left nav is active.
     * @param {string} [options.classActiveLeftNavListItem] The class name for when a left nav list item is active.
     * @param {string} [options.classExpandedLeftNavListItem] The class name for when a nested list is expanded.
     * @param {string} [options.classFlyoutDisplayed] The class name for when a flyout menu is displayed.
     * @param {string} [options.classActiveSection] The class name for an active section item in the left nav header.
     * @param {string} [options.classItemHasChildren] The class name for when a list item has children.
     */


    (0, _createClass3.default)(LeftNav, [{
      key: 'closeMenu',
      value: function closeMenu() {
        this.element.classList.remove(this.options.classActiveLeftNav);
        this.element.ownerDocument.querySelector(this.options.selectorLeftNavToggleOpen).classList.remove(this.options.classActiveTrigger);
      }
    }, {
      key: 'toggleMenu',
      value: function toggleMenu() {
        this.element.classList.toggle(this.options.classActiveLeftNav);
        this.element.ownerDocument.querySelector(this.options.selectorLeftNavToggleOpen).classList.toggle(this.options.classActiveTrigger);
      }
    }, {
      key: 'animateInNav',
      value: function animateInNav() {
        var _this2 = this;

        var counter = 0.1;
        [].concat((0, _toConsumableArray3.default)(this.element.querySelectorAll(this.options.selectorLeftNavListItem))).forEach(function (item) {
          item.classList.add('animate');
          item.style.animationDelay = counter + 's';
          counter += 0.05;
        });
        setTimeout(function () {
          [].concat((0, _toConsumableArray3.default)(_this2.element.querySelectorAll(_this2.options.selectorLeftNavListItem))).forEach(function (item) {
            item.classList.remove('animate');
          });
        }, 1000);
      }
    }, {
      key: 'hookOpenActions',
      value: function hookOpenActions() {
        var _this3 = this;

        var openBtn = this.element.ownerDocument.querySelector(this.options.selectorLeftNavToggleOpen);
        var closeBtn = this.element.ownerDocument.querySelector(this.options.selectorLeftNavToggleClose);

        openBtn.addEventListener('click', function () {
          _this3.element.tabIndex = '0';
          _this3.toggleMenu();
        });

        openBtn.addEventListener('keydown', function (evt) {
          if (evt.which === 13) {
            _this3.element.tabIndex = '0';
            _this3.toggleMenu();
          }
        });

        closeBtn.addEventListener('click', function () {
          _this3.element.tabIndex = '-1';
          _this3.closeMenu();
        });

        closeBtn.addEventListener('keydown', function (evt) {
          if (evt.which === 13) {
            _this3.element.tabIndex = '-1';
            _this3.closeMenu();
          }
        });

        this.element.ownerDocument.addEventListener('keydown', function (evt) {
          if (evt.which === 27 && _this3.element.classList.contains(_this3.options.classActiveLeftNav)) {
            _this3.closeMenu();
          }
        });
      }
    }, {
      key: 'hookListItemsEvents',
      value: function hookListItemsEvents() {
        var _this4 = this;

        var leftNavList = this.element.querySelector(this.options.selectorLeftNavList);
        leftNavList.addEventListener('click', function (evt) {
          var leftNavItem = (0, _eventMatches2.default)(evt, _this4.options.selectorLeftNavListItem);
          if (leftNavItem) {
            var childItem = (0, _eventMatches2.default)(evt, _this4.options.selectorLeftNavNestedListItem);
            var hasChildren = (0, _eventMatches2.default)(evt, _this4.options.selectorLeftNavListItemHasChildren);
            var flyoutItem = (0, _eventMatches2.default)(evt, _this4.options.selectorLeftNavFlyoutItem);
            if (flyoutItem) {
              _this4.addActiveListItem(flyoutItem);
            } else if (childItem) {
              if (childItem.querySelector(_this4.options.selectorLeftNavFlyoutMenu)) {
                var flyoutMenu = childItem.querySelector(_this4.options.selectorLeftNavFlyoutMenu);
                flyoutMenu.classList.toggle(_this4.options.classFlyoutDisplayed);
              } else {
                _this4.addActiveListItem(childItem);
              }
            } else if (hasChildren) {
              _this4.handleNestedListClick(leftNavItem);
            } else {
              _this4.addActiveListItem(leftNavItem);
            }
          }
        });
        leftNavList.addEventListener('keydown', function (evt) {
          if (evt.which === 13) {
            var leftNavItem = (0, _eventMatches2.default)(evt, _this4.options.selectorLeftNavListItem);
            if (leftNavItem) {
              var childItem = (0, _eventMatches2.default)(evt, _this4.options.selectorLeftNavNestedListItem);
              var hasChildren = (0, _eventMatches2.default)(evt, _this4.options.selectorLeftNavListItemHasChildren);
              var flyoutItem = (0, _eventMatches2.default)(evt, _this4.options.selectorLeftNavFlyoutItem);
              if (flyoutItem) {
                _this4.addActiveListItem(flyoutItem);
              } else if (childItem) {
                if (!childItem.querySelector(_this4.options.selectorLeftNavFlyoutMenu)) {
                  _this4.addActiveListItem(childItem);
                }
              } else if (hasChildren) {
                _this4.handleNestedListClick(leftNavItem);
              } else {
                _this4.addActiveListItem(leftNavItem);
              }
            }
          }
        });
        var flyouts = [].concat((0, _toConsumableArray3.default)(this.element.ownerDocument.querySelectorAll(this.options.selectorLeftNavListItemHasFlyout)));
        flyouts.forEach(function (flyout) {
          flyout.addEventListener('mouseenter', function () {
            flyout.querySelector(_this4.options.selectorLeftNavFlyoutMenu).style.top = flyout.offsetTop - _this4.element.querySelector(_this4.options.selectorLeftNav).scrollTop + 'px';
            flyout.querySelector(_this4.options.selectorLeftNavFlyoutMenu).style.left = flyout.offsetLeft + Math.round(flyout.offsetWidth) + 'px';
            flyout.querySelector(_this4.options.selectorLeftNavFlyoutMenu).classList.add(_this4.options.classFlyoutDisplayed);
          });
          flyout.addEventListener('mouseleave', function () {
            flyout.querySelector(_this4.options.selectorLeftNavFlyoutMenu).classList.remove(_this4.options.classFlyoutDisplayed);
          });
        });
      }
    }, {
      key: 'hideAllFlyoutMenus',
      value: function hideAllFlyoutMenus() {
        var _this5 = this;

        var flyoutMenus = [].concat((0, _toConsumableArray3.default)(this.element.querySelectorAll(this.options.selectorLeftNavFlyoutMenu)));
        flyoutMenus.forEach(function (menu) {
          menu.classList.remove(_this5.options.classFlyoutDisplayed);
        });
      }
    }, {
      key: 'addActiveListItem',
      value: function addActiveListItem(item) {
        var _this6 = this;

        [].concat((0, _toConsumableArray3.default)(this.element.querySelectorAll(this.options.selectorLeftNavAllListItems))).forEach(function (currentItem) {
          if (!(item === currentItem)) {
            if (!currentItem.contains(item)) {
              currentItem.classList.remove(_this6.options.classActiveLeftNavListItem);
            } else {
              currentItem.classList.add(_this6.options.classActiveLeftNavListItem);
            }
          }
        });
        [].concat((0, _toConsumableArray3.default)(this.element.querySelectorAll(this.options.selectorLeftNavNestedListItem))).forEach(function (currentItem) {
          if (!(item === currentItem)) {
            currentItem.classList.remove(_this6.options.classActiveLeftNavListItem);
          }
        });
        item.classList.add(this.options.classActiveLeftNavListItem);
        this.hideAllFlyoutMenus();
        this.closeMenu();
      }
    }, {
      key: 'handleDocumentClick',
      value: function handleDocumentClick(evt) {
        var clickTarget = evt.target;
        var isOfSelf = this.element.contains(clickTarget);
        var isToggleBtn = this.element.ownerDocument.querySelector(this.options.selectorLeftNavToggleOpen).contains(clickTarget);
        var isOpen = this.element.classList.contains(this.options.classActiveLeftNav);
        var isUnifiedHeader = this.element.ownerDocument.querySelector('[data-unified-header]').contains(clickTarget);
        var shouldClose = !isOfSelf && isOpen && !isToggleBtn && !isUnifiedHeader;
        var flyoutOpen = void 0;
        if (this.element.querySelector(this.options.selectorLeftNavFlyoutMenu)) {
          flyoutOpen = this.element.querySelector(this.options.selectorLeftNavFlyoutMenu).classList.contains(this.options.classFlyoutDisplayed);
        }
        if (isOfSelf && this.element.tagName === 'A') {
          evt.preventDefault();
        }
        if (shouldClose) {
          this.closeMenu();
        }
        if (this.element.querySelector(this.options.selectorLeftNavFlyoutMenu)) {
          if (flyoutOpen && !isOfSelf && isOpen) {
            this.element.querySelector(this.options.selectorLeftNavFlyoutMenu).classList.remove(this.options.classFlyoutDisplayed);
          }
        }
      }
    }, {
      key: 'handleNestedListClick',
      value: function handleNestedListClick(listItem) {
        var _this7 = this;

        var isOpen = listItem.classList.contains(this.options.classExpandedLeftNavListItem);
        this.hideAllFlyoutMenus();
        (0, _toggleClass2.default)(listItem, this.options.classExpandedLeftNavListItem, !isOpen);
        var listItems = [].concat((0, _toConsumableArray3.default)(listItem.querySelectorAll(this.options.selectorLeftNavNestedListItem)));
        listItems.forEach(function (item) {
          if (isOpen) {
            item.querySelector(_this7.options.selectorLeftNavListItemLink).tabIndex = -1;
          } else {
            item.querySelector(_this7.options.selectorLeftNavListItemLink).tabIndex = 0;
          }
        });
      }
    }, {
      key: 'release',
      value: function release() {
        if (this.hDocumentClick) {
          this.hDocumentClick = this.hDocumentClick.release();
        }
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
        var _this8 = this;

        var target = arguments.length <= 0 || arguments[0] === undefined ? document : arguments[0];
        var options = arguments[1];

        if (target.nodeType !== Node.ELEMENT_NODE && target.nodeType !== Node.DOCUMENT_NODE) {
          throw new Error('DOM document or DOM element should be given to search for and initialize this widget.');
        }
        if (target.nodeType === Node.ELEMENT_NODE) {
          this.create(target, options);
        } else {
          [].concat((0, _toConsumableArray3.default)(target.querySelectorAll('[data-left-nav-container]'))).forEach(function (element) {
            return _this8.create(element, options);
          });
        }
      }
    }]);
    return LeftNav;
  }();

  exports.default = LeftNav;


  /**
  * The component options.
   * @member {Object} LeftNav#options
   * @property {string} [options.selectorLeftNav] The data attribute selector for the nav element in the left nav container.
   * @property {string} [options.selectorLeftNavList] The data attribute selector for the main ul element in the left nav.
   * @property {string} [options.selectorLeftNavNestedList] The data attribute selector for the nested ul elements in the left nav.
   * @property {string} [options.selectorLeftNavToggle] The data attribute selector for the button that will show and hide the left navigation.
   * @property {string} [options.selectorLeftNavListItem] The data attribute selector for all list items in the left navigation.
   * @property {string} [options.selectorLeftNavNestedListItem] The data attribute selector for all nested list items in the left navigation.
   * @property {string} [options.selectorLeftNavArrowIcon] The data attribute selector for the arrow icons in the left nav.
   * @property {string} [options.selectorLeftNavFlyoutMenu] The data attribute selector for the flyout menus in the left nav.
   * @property {string} [options.selectorLeftNavFlyoutItem] The data attribute selector for the flyout menu items in the left nav.
   * @property {string} [options.selectorLeftNavSection] The data attribute selector for the three sections in the header of the left nav.
   * @property {string} [options.selectorLeftNavCurrentPage] The data attribute selector for the current section title in the left nav header.
   * @property {string} [options.classActiveLeftNav] The class name for when a left nav is active.
   * @property {string} [options.classActiveLeftNavListItem] The class name for when a left nav list item is active.
   * @property {string} [options.classExpandedLeftNavListItem] The class name for when a nested list is expanded.
   * @property {string} [options.classFlyoutDisplayed] The class name for when a flyout menu is displayed.
   * @property {string} [options.classActiveSection] The class name for an active section item in the left nav header.
   * @property {string} [options.classItemHasChildren] The class name for when a list item has children.
   */

  /**
   * The map associating DOM element and left navigation instance.
   * @type {WeakMap}
   */
  LeftNav.components = new _weakMap2.default();
});