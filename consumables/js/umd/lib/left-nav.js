(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'babel-runtime/core-js/weak-map', 'babel-runtime/helpers/typeof', 'babel-runtime/helpers/toConsumableArray', 'babel-runtime/core-js/object/get-prototype-of', 'babel-runtime/helpers/classCallCheck', 'babel-runtime/helpers/createClass', 'babel-runtime/helpers/possibleConstructorReturn', 'babel-runtime/helpers/get', 'babel-runtime/helpers/inherits', '../misc/mixin', '../mixins/create-component', '../mixins/init-component-by-search', '../polyfills/toggle-class', '../polyfills/event-matches', '../misc/on', '../polyfills/array-from', '../polyfills/element-matches', '../polyfills/object-assign', '../polyfills/custom-event'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('babel-runtime/core-js/weak-map'), require('babel-runtime/helpers/typeof'), require('babel-runtime/helpers/toConsumableArray'), require('babel-runtime/core-js/object/get-prototype-of'), require('babel-runtime/helpers/classCallCheck'), require('babel-runtime/helpers/createClass'), require('babel-runtime/helpers/possibleConstructorReturn'), require('babel-runtime/helpers/get'), require('babel-runtime/helpers/inherits'), require('../misc/mixin'), require('../mixins/create-component'), require('../mixins/init-component-by-search'), require('../polyfills/toggle-class'), require('../polyfills/event-matches'), require('../misc/on'), require('../polyfills/array-from'), require('../polyfills/element-matches'), require('../polyfills/object-assign'), require('../polyfills/custom-event'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.weakMap, global._typeof, global.toConsumableArray, global.getPrototypeOf, global.classCallCheck, global.createClass, global.possibleConstructorReturn, global.get, global.inherits, global.mixin, global.createComponent, global.initComponentBySearch, global.toggleClass, global.eventMatches, global.on, global.arrayFrom, global.elementMatches, global.objectAssign, global.customEvent);
    global.leftNav = mod.exports;
  }
})(this, function (exports, _weakMap, _typeof2, _toConsumableArray2, _getPrototypeOf, _classCallCheck2, _createClass2, _possibleConstructorReturn2, _get2, _inherits2, _mixin2, _createComponent, _initComponentBySearch, _toggleClass, _eventMatches, _on) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _weakMap2 = _interopRequireDefault(_weakMap);

  var _typeof3 = _interopRequireDefault(_typeof2);

  var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

  var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

  var _createClass3 = _interopRequireDefault(_createClass2);

  var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

  var _get3 = _interopRequireDefault(_get2);

  var _inherits3 = _interopRequireDefault(_inherits2);

  var _mixin3 = _interopRequireDefault(_mixin2);

  var _createComponent2 = _interopRequireDefault(_createComponent);

  var _initComponentBySearch2 = _interopRequireDefault(_initComponentBySearch);

  var _toggleClass2 = _interopRequireDefault(_toggleClass);

  var _eventMatches2 = _interopRequireDefault(_eventMatches);

  var _on2 = _interopRequireDefault(_on);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var LeftNav = function (_mixin) {
    (0, _inherits3.default)(LeftNav, _mixin);

    /**
     * Left Navigation.
     * @extends CreateComponent
     * @extends InitComponentBySearch
     * @param {HTMLElement} element The element working as a left navigation.
     * @param {Object} [options] The component options
     * @param {string} [options.selectorLeftNav] The data attribute selector for the nav element in the left nav container.
     * @param {string} [options.selectorLeftNavList] The data attribute selector for the main ul element in the left nav.
     * @param {string} [options.selectorLeftNavNestedList] The data attribute selector for the nested ul elements in the left nav.
     * @param {string} [options.selectorLeftNavToggle]
     *   The data attribute selector for the button that will show and hide the left navigation.
     * @param {string} [options.selectorLeftNavListItem] The data attribute selector for all list items in the left navigation.
     * @param {string} [options.selectorLeftNavNestedListItem]
     *   The data attribute selector for all nested list items in the left navigation.
     * @param {string} [options.selectorLeftNavArrowIcon] The data attribute selector for the arrow icons in the left nav.
     * @param {string} [options.selectorLeftNavFlyoutMenu] The data attribute selector for the flyout menus in the left nav.
     * @param {string} [options.selectorLeftNavFlyoutItem] The data attribute selector for the flyout menu items in the left nav.
     * @param {string} [options.selectorLeftNavSection]
     *   The data attribute selector for the three sections in the header of the left nav.
     * @param {string} [options.selectorLeftNavCurrentPage]
     *   The data attribute selector for the current section title in the left nav header.
     * @param {string} [options.classActiveLeftNav] The class name for when a left nav is active.
     * @param {string} [options.classActiveLeftNavListItem] The class name for when a left nav list item is active.
     * @param {string} [options.classExpandedLeftNavListItem] The class name for when a nested list is expanded.
     * @param {string} [options.classFlyoutDisplayed] The class name for when a flyout menu is displayed.
     * @param {string} [options.classActiveSection] The class name for an active section item in the left nav header.
     * @param {string} [options.classItemHasChildren] The class name for when a list item has children.
     */
    function LeftNav(element, options) {
      (0, _classCallCheck3.default)(this, LeftNav);

      var _this = (0, _possibleConstructorReturn3.default)(this, (LeftNav.__proto__ || (0, _getPrototypeOf2.default)(LeftNav)).call(this, element, options));

      _this.leftNavSectionActive = false;
      _this.hookOpenActions();
      _this.hookListSectionEvents();
      _this.hookListItemsEvents();
      _this.hDocumentClick = (0, _on2.default)(_this.element.ownerDocument, 'click', function (evt) {
        _this.handleDocumentClick(evt);
      });
      return _this;
    }

    /**
     * Closes the menu.
     */


    (0, _createClass3.default)(LeftNav, [{
      key: 'closeMenu',
      value: function closeMenu() {
        this.element.classList.remove(this.options.classActiveLeftNav);
        var toggleOpenNode = this.element.ownerDocument.querySelector(this.options.selectorLeftNavToggleOpen);
        toggleOpenNode.classList.remove(this.options.classActiveTrigger);
        this.element.querySelector(this.options.selectorLeftNav).parentNode.setAttribute('aria-expanded', 'false');
      }
    }, {
      key: 'toggleMenu',
      value: function toggleMenu() {
        var leftNavContainer = this.element.querySelector(this.options.selectorLeftNav).parentNode;
        this.element.classList.toggle(this.options.classActiveLeftNav);
        var toggleOpenNode = this.element.ownerDocument.querySelector(this.options.selectorLeftNavToggleOpen);
        toggleOpenNode.classList.toggle(this.options.classActiveTrigger);
        if (leftNavContainer.getAttribute('aria-expanded') === 'false') leftNavContainer.setAttribute('aria-expanded', 'true');else leftNavContainer.setAttribute('aria-expanded', 'false');
      }
    }, {
      key: 'animateNavSection',
      value: function animateNavSection(selectedNav) {
        var _this2 = this;

        var selectedNavValue = selectedNav.dataset.leftNavSection;
        var selectedNavLink = selectedNav.querySelector(this.options.selectorLeftNavSectionLink);
        var leftNav = this.element.querySelector(this.options.selectorLeftNav);
        var leftNavSections = this.element.querySelector(this.options.selectorLeftNavSections);

        selectedNav.classList.remove(this.options.classNavSection);
        selectedNav.classList.remove(this.options.classNavSection + '--' + selectedNavValue);
        selectedNav.classList.add(this.options.classNavSectionTransition);
        if (leftNavSections.children[0] === selectedNav) {
          selectedNav.classList.add(this.options.classNavSectionTransition + '--50'); // First child only move 50px
        } else {
          selectedNav.classList.add(this.options.classNavSectionTransition + '--100'); // Second move 100px
        }
        selectedNav.setAttribute('data-left-nav-section', selectedNavValue);
        /* Not sure what trick more performant*/
        setTimeout(function () {
          selectedNav.classList.add(_this2.options.classNavSectionTransition + '--0');
        }, 100); // Could probably use a promise here

        selectedNavLink.classList.remove(this.options.classNavSectionLink);
        selectedNavLink.classList.add(this.options.classNavHeaderTitle);
        selectedNavLink.setAttribute('data-left-nav-current-section-title', '');
        selectedNavLink.removeAttribute('data-left-nav-section-link');

        this.element.insertBefore(selectedNav, leftNav);
      }
    }, {
      key: 'animateNavList',
      value: function animateNavList(selectedNavTitle) {
        var _this3 = this;

        var currentLeftNavList = this.element.querySelector(this.options.selectorLeftNavList + ':not(.bx--left-nav__main-nav--hidden)');
        var newLeftNavList = this.element.querySelector('[data-left-nav-list=' + selectedNavTitle + ']');
        var currentLeftNavItems = [].concat((0, _toConsumableArray3.default)(currentLeftNavList.querySelectorAll(this.options.selectorLeftNavListItem))).reverse();
        var newLeftNavItems = [].concat((0, _toConsumableArray3.default)(newLeftNavList.querySelectorAll(this.options.selectorLeftNavListItem)));

        var fadeOutTime = 300;
        var counter = 0;
        var counterIteration = fadeOutTime / currentLeftNavItems.length; // Length of animation divided by number of items
        currentLeftNavItems.forEach(function (item) {
          item.setAttribute('tabIndex', '-1');
          setTimeout(function () {
            item.classList.add(_this3.options.classItemFade);
          }, counter);
          counter += counterIteration;
        });

        newLeftNavItems.forEach(function (item) {
          item.setAttribute('tabIndex', '0');
          item.classList.remove(_this3.options.classItemFade);
        });

        setTimeout(function () {
          currentLeftNavList.classList.add(_this3.options.classListHidden);
          currentLeftNavList.classList.add(_this3.options.classListTop);
          currentLeftNavList.setAttribute('aria-hidden', 'true');
          newLeftNavList.classList.remove(_this3.options.classListHidden);
          setTimeout(function () {
            newLeftNavList.classList.remove(_this3.options.classListTop);
          }, 100);
          newLeftNavList.setAttribute('aria-hidden', 'false');
        }, fadeOutTime + 100); // Wait for items to fade out.
      }
    }, {
      key: 'hookOpenActions',
      value: function hookOpenActions() {
        var _this4 = this;

        var openBtn = this.element.ownerDocument.querySelector(this.options.selectorLeftNavToggleOpen);
        var closeBtn = this.element.ownerDocument.querySelector(this.options.selectorLeftNavToggleClose);

        openBtn.addEventListener('click', function () {
          _this4.element.tabIndex = '0';
          _this4.toggleMenu();
        });

        openBtn.addEventListener('keydown', function (evt) {
          if (evt.which === 13) {
            _this4.element.tabIndex = '0';
            _this4.toggleMenu();
          }
        });

        if (closeBtn) {
          closeBtn.addEventListener('click', function () {
            _this4.element.tabIndex = '-1';
            _this4.closeMenu();
          });

          closeBtn.addEventListener('keydown', function (evt) {
            if (evt.which === 13) {
              _this4.element.tabIndex = '-1';
              _this4.closeMenu();
            }
          });
        }

        this.element.ownerDocument.addEventListener('keydown', function (evt) {
          if (evt.which === 27 && _this4.element.classList.contains(_this4.options.classActiveLeftNav)) {
            _this4.closeMenu();
          }
        });
      }
    }, {
      key: 'hookListSectionEvents',
      value: function hookListSectionEvents() {
        var _this5 = this;

        var leftNavSections = this.element.querySelector(this.options.selectorLeftNavSections);
        leftNavSections.addEventListener('click', function (evt) {
          _this5.handleSectionItemClick(evt, leftNavSections);
        });

        leftNavSections.addEventListener('keydown', function (evt) {
          if (evt.which === 13) {
            _this5.handleSectionItemClick(evt, leftNavSections);
            _this5.element.querySelector(_this5.options.selectorLeftNavCurrentSectionTitle).focus();
          }
        });
      }
    }, {
      key: 'hookListItemsEvents',
      value: function hookListItemsEvents() {
        var _this6 = this;

        var leftNavList = [].concat((0, _toConsumableArray3.default)(this.element.querySelectorAll(this.options.selectorLeftNavList)));
        leftNavList.forEach(function (list) {
          list.addEventListener('click', function (evt) {
            var leftNavItem = (0, _eventMatches2.default)(evt, _this6.options.selectorLeftNavListItem);
            if (leftNavItem) {
              var childItem = (0, _eventMatches2.default)(evt, _this6.options.selectorLeftNavNestedListItem);
              var hasChildren = (0, _eventMatches2.default)(evt, _this6.options.selectorLeftNavListItemHasChildren);
              var flyoutItem = (0, _eventMatches2.default)(evt, _this6.options.selectorLeftNavFlyoutItem);
              if (flyoutItem) {
                _this6.addActiveListItem(flyoutItem);
              } else if (childItem) {
                if (childItem.querySelector(_this6.options.selectorLeftNavFlyoutMenu)) {
                  var flyoutMenu = childItem.querySelector(_this6.options.selectorLeftNavFlyoutMenu);
                  flyoutMenu.classList.toggle(_this6.options.classFlyoutDisplayed);
                } else {
                  _this6.addActiveListItem(childItem);
                }
              } else if (hasChildren) {
                _this6.handleNestedListClick(leftNavItem);
              } else {
                _this6.addActiveListItem(leftNavItem);
              }
            }
          });
          list.addEventListener('keydown', function (evt) {
            if (evt.which === 13) {
              var leftNavItem = (0, _eventMatches2.default)(evt, _this6.options.selectorLeftNavListItem);
              if (leftNavItem) {
                var childItem = (0, _eventMatches2.default)(evt, _this6.options.selectorLeftNavNestedListItem);
                var hasChildren = (0, _eventMatches2.default)(evt, _this6.options.selectorLeftNavListItemHasChildren);
                var flyoutItem = (0, _eventMatches2.default)(evt, _this6.options.selectorLeftNavFlyoutItem);
                if (flyoutItem) {
                  _this6.addActiveListItem(flyoutItem);
                } else if (childItem) {
                  if (!childItem.querySelector(_this6.options.selectorLeftNavFlyoutMenu)) {
                    _this6.addActiveListItem(childItem);
                  } else {
                    childItem.querySelector(_this6.options.selectorLeftNavFlyoutMenu).setAttribute('aria-hidden', 'false');
                    childItem.querySelector(_this6.options.selectorLeftNavFlyoutMenu).style.top = childItem.offsetTop - _this6.element.querySelector(_this6.options.selectorLeftNav).scrollTop + 'px';
                    childItem.querySelector(_this6.options.selectorLeftNavFlyoutMenu).style.left = childItem.offsetLeft + Math.round(childItem.offsetWidth) + 'px';
                  }
                } else if (hasChildren) {
                  _this6.handleNestedListClick(leftNavItem);
                } else {
                  _this6.addActiveListItem(leftNavItem);
                }
              }
            }
          });
        });
        var flyouts = [].concat((0, _toConsumableArray3.default)(this.element.ownerDocument.querySelectorAll(this.options.selectorLeftNavListItemHasFlyout)));
        flyouts.forEach(function (flyout) {
          flyout.addEventListener('mouseenter', function () {
            flyout.querySelector(_this6.options.selectorLeftNavFlyoutMenu).setAttribute('aria-hidden', 'false');
            // eslint-disable-next-line no-param-reassign
            flyout.querySelector(_this6.options.selectorLeftNavFlyoutMenu).style.top = flyout.offsetTop - _this6.element.querySelector(_this6.options.selectorLeftNav).scrollTop + 'px';
            // eslint-disable-next-line no-param-reassign
            flyout.querySelector(_this6.options.selectorLeftNavFlyoutMenu).style.left = flyout.offsetLeft + Math.round(flyout.offsetWidth) + 'px';
            flyout.querySelector(_this6.options.selectorLeftNavFlyoutMenu).classList.toggle(_this6.options.classFlyoutDisplayed);
          });
          flyout.addEventListener('mouseleave', function () {
            flyout.querySelector(_this6.options.selectorLeftNavFlyoutMenu).setAttribute('aria-hidden', 'true');
            flyout.querySelector(_this6.options.selectorLeftNavFlyoutMenu).classList.remove(_this6.options.classFlyoutDisplayed);
          });
        });
      }
    }, {
      key: 'hideAllFlyoutMenus',
      value: function hideAllFlyoutMenus() {
        var _this7 = this;

        var flyoutMenus = [].concat((0, _toConsumableArray3.default)(this.element.querySelectorAll(this.options.selectorLeftNavFlyoutMenu)));
        flyoutMenus.forEach(function (menu) {
          menu.setAttribute('aria-hidden', 'true');
          menu.classList.remove(_this7.options.classFlyoutDisplayed);
        });
      }
    }, {
      key: 'addActiveListItem',
      value: function addActiveListItem(item) {
        var _this8 = this;

        [].concat((0, _toConsumableArray3.default)(this.element.querySelectorAll(this.options.selectorLeftNavAllListItems))).forEach(function (currentItem) {
          if (!(item === currentItem)) {
            if (!currentItem.contains(item)) {
              currentItem.classList.remove(_this8.options.classActiveLeftNavListItem);
            } else {
              currentItem.classList.add(_this8.options.classActiveLeftNavListItem);
            }
          }
        });
        [].concat((0, _toConsumableArray3.default)(this.element.querySelectorAll(this.options.selectorLeftNavNestedListItem))).forEach(function (currentItem) {
          if (!(item === currentItem)) {
            currentItem.classList.remove(_this8.options.classActiveLeftNavListItem);
          }
        });
        item.classList.add(this.options.classActiveLeftNavListItem);
        this.closeMenu();
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
          var leftnavFlyoutMenu = this.element.querySelector(this.options.selectorLeftNavFlyoutMenu);
          flyoutOpen = leftnavFlyoutMenu.classList.contains(this.options.classFlyoutDisplayed);
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
        var _this9 = this;

        var isOpen = listItem.classList.contains(this.options.classExpandedLeftNavListItem);
        this.hideAllFlyoutMenus();
        (0, _toggleClass2.default)(listItem, this.options.classExpandedLeftNavListItem, !isOpen);
        var listItems = [].concat((0, _toConsumableArray3.default)(listItem.querySelectorAll(this.options.selectorLeftNavNestedListItem)));
        listItems.forEach(function (item) {
          if (isOpen) {
            listItem.querySelector(_this9.options.selectorLeftNavNestedList).setAttribute('aria-hidden', 'true');
            // eslint-disable-next-line no-param-reassign
            item.querySelector(_this9.options.selectorLeftNavListItemLink).tabIndex = -1;
          } else {
            listItem.querySelector(_this9.options.selectorLeftNavNestedList).setAttribute('aria-hidden', 'false');
            // eslint-disable-next-line no-param-reassign
            item.querySelector(_this9.options.selectorLeftNavListItemLink).tabIndex = 0;
          }
        });
      }
    }, {
      key: 'handleSectionItemClick',
      value: function handleSectionItemClick(evt, leftNavSections) {
        var _this10 = this;

        // Sorry
        var leftNavSectionItem = (0, _eventMatches2.default)(evt, this.options.selectorLeftNavSection);
        if (leftNavSectionItem) {
          var _ret = function () {
            // currently selected
            var selectedLeftNavSectionItem = _this10.element.querySelector(_this10.options.selectorLeftNavCurrentSection);
            var selectedLeftNavSectionItemTitle = selectedLeftNavSectionItem.querySelector(_this10.options.selectorLeftNavCurrentSectionTitle);
            var selectedLeftNavSectionItemIcon = _this10.element.querySelector(_this10.options.selectorLeftNavCurrentSectionIcon);
            var selectedLeftNavSectionItemUse = selectedLeftNavSectionItemIcon.querySelector('use');
            var selectedLeftNavSectionValue = selectedLeftNavSectionItem.dataset.leftNavCurrentSection;

            // clicked on item
            var leftNavSectionItemLink = leftNavSectionItem.querySelector(_this10.options.selectorLeftNavSectionLink);
            var leftNavSectionItemIcon = leftNavSectionItem.querySelector(_this10.options.selectorLeftNavSectionIcon);
            var leftNavSectionItemIconUse = leftNavSectionItemIcon.querySelector('use');
            var leftNavSectionValue = leftNavSectionItem.dataset.leftNavSection;

            if (_this10.leftNavSectionActive) {
              return {
                v: void 0
              };
            }
            _this10.leftNavSectionActive = true;

            var newLeftNavSectionItem = document.createElement('li');
            newLeftNavSectionItem.setAttribute('data-left-nav-section', selectedLeftNavSectionValue);
            newLeftNavSectionItem.classList.add(_this10.options.classNavSection);
            newLeftNavSectionItem.classList.add(_this10.options.classNavSection + '--' + selectedLeftNavSectionValue);

            var newLeftNavSectionItemAnchor = document.createElement('a');
            newLeftNavSectionItemAnchor.setAttribute('href', 'javascript:void(0)'); // eslint-disable-line no-script-url
            newLeftNavSectionItemAnchor.setAttribute('tabindex', 0);
            newLeftNavSectionItemAnchor.classList.add(_this10.options.classNavSectionAnchor);

            var newLeftNavSectionItemIcon = selectedLeftNavSectionItemIcon.cloneNode(true);
            // IE11 doesn't support classList on SVG, must revert to className
            newLeftNavSectionItemIcon.setAttribute('class', 'bx--left-nav__section--taxonomy-icon');
            newLeftNavSectionItemIcon.removeAttribute('data-left-nav-current-section-icon');
            newLeftNavSectionItemIcon.setAttribute('data-left-nav-section-icon', selectedLeftNavSectionValue);

            var newLeftNavSectionItemLink = document.createElement('span');
            newLeftNavSectionItemLink.setAttribute('data-left-nav-section-link', '');
            newLeftNavSectionItemLink.classList.add(_this10.options.classNavSectionLink);
            newLeftNavSectionItemLink.textContent = selectedLeftNavSectionItemTitle.textContent;

            _this10.animateNavSection(leftNavSectionItem);
            _this10.animateNavList(leftNavSectionValue);

            newLeftNavSectionItemAnchor.appendChild(newLeftNavSectionItemIcon);
            newLeftNavSectionItemAnchor.appendChild(newLeftNavSectionItemLink);
            newLeftNavSectionItem.appendChild(newLeftNavSectionItemAnchor);
            leftNavSections.insertBefore(newLeftNavSectionItem, leftNavSections.firstChild);

            setTimeout(function () {
              selectedLeftNavSectionItemTitle.textContent = leftNavSectionItemLink.textContent;
              selectedLeftNavSectionItem.setAttribute('data-left-nav-current-section', leftNavSectionValue);
              selectedLeftNavSectionItemIcon.setAttribute('data-left-nav-current-section-icon', leftNavSectionValue);
              selectedLeftNavSectionItemUse.setAttribute('xlink:href', leftNavSectionItemIconUse.getAttribute('xlink:href'));

              leftNavSectionItem.parentNode.removeChild(leftNavSectionItem); // Cant use .remove() because of IE11
              _this10.leftNavSectionActive = false;
            }, 450); // Wait for nav items to animate
          }();

          if ((typeof _ret === 'undefined' ? 'undefined' : (0, _typeof3.default)(_ret)) === "object") return _ret.v;
        }
      }
    }, {
      key: 'release',
      value: function release() {
        if (this.hDocumentClick) {
          this.hDocumentClick = this.hDocumentClick.release();
        }
        (0, _get3.default)(LeftNav.prototype.__proto__ || (0, _getPrototypeOf2.default)(LeftNav.prototype), 'release', this).call(this);
      }
    }]);
    return LeftNav;
  }((0, _mixin3.default)(_createComponent2.default, _initComponentBySearch2.default));

  LeftNav.options = {
    selectorInit: '[data-left-nav-container]',
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
    selectorLeftNavSections: '[data-left-nav-sections]',
    selectorLeftNavSection: '[data-left-nav-section]',
    selectorLeftNavSectionLink: '[data-left-nav-section-link]',
    selectorLeftNavSectionIcon: '[data-left-nav-section-icon]',
    selectorLeftNavCurrentSection: '[data-left-nav-current-section]',
    selectorLeftNavCurrentSectionTitle: '[data-left-nav-current-section-title]',
    selectorLeftNavCurrentSectionIcon: '[data-left-nav-current-section-icon]',
    selectorLeftNavListItemHasChildren: '[data-left-nav-item-with-children]',
    selectorLeftNavListItemHasFlyout: '[data-left-nav-has-flyout]',
    selectorLeftNavAllListItems: '[data-left-nav-item], [data-left-nav-nested-item], [data-left-nav-flyout-item]',
    // CSS Class Selectors
    classActiveTrigger: 'bx--left-nav__trigger--active',
    classActiveLeftNav: 'bx--left-nav--active',
    classActiveLeftNavListItem: 'bx--active-list-item',
    classExpandedLeftNavListItem: 'bx--main-nav__parent-item--expanded',
    classFlyoutDisplayed: 'bx--nested-list__flyout-menu--displayed',
    classItemHasChildren: 'bx--main-nav__parent-item--has-children',
    classNavSection: 'bx--left-nav__section',
    classNavSectionTransition: 'bx--left-nav__section--transition',
    classNavSectionAnchor: 'bx--left-nav__section--anchor',
    classNavSectionLink: 'bx--left-nav__section--link',
    classNavHeaderTitle: 'bx--left-nav__header--title',
    classItemFade: 'bx--main-nav__parent-item--fade',
    classItemHidden: 'bx--main-nav__parent-item--hidden',
    classListHidden: 'bx--left-nav__main-nav--hidden',
    classListTop: 'bx--left-nav__main-nav--top'
  };
  LeftNav.components = new _weakMap2.default();
  exports.default = LeftNav;
});