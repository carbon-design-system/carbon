(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'babel-runtime/core-js/weak-map', 'babel-runtime/helpers/toConsumableArray', 'babel-runtime/core-js/object/get-prototype-of', 'babel-runtime/helpers/classCallCheck', 'babel-runtime/helpers/createClass', 'babel-runtime/helpers/possibleConstructorReturn', 'babel-runtime/helpers/get', 'babel-runtime/helpers/inherits', '../misc/mixin', '../mixins/create-component', '../mixins/init-component-by-search', '../polyfills/event-matches', '../misc/on', '../polyfills/array-from', '../polyfills/element-matches', '../polyfills/object-assign', '../polyfills/custom-event'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('babel-runtime/core-js/weak-map'), require('babel-runtime/helpers/toConsumableArray'), require('babel-runtime/core-js/object/get-prototype-of'), require('babel-runtime/helpers/classCallCheck'), require('babel-runtime/helpers/createClass'), require('babel-runtime/helpers/possibleConstructorReturn'), require('babel-runtime/helpers/get'), require('babel-runtime/helpers/inherits'), require('../misc/mixin'), require('../mixins/create-component'), require('../mixins/init-component-by-search'), require('../polyfills/event-matches'), require('../misc/on'), require('../polyfills/array-from'), require('../polyfills/element-matches'), require('../polyfills/object-assign'), require('../polyfills/custom-event'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.weakMap, global.toConsumableArray, global.getPrototypeOf, global.classCallCheck, global.createClass, global.possibleConstructorReturn, global.get, global.inherits, global.mixin, global.createComponent, global.initComponentBySearch, global.eventMatches, global.on, global.arrayFrom, global.elementMatches, global.objectAssign, global.customEvent);
    global.leftNav = mod.exports;
  }
})(this, function (exports, _weakMap, _toConsumableArray2, _getPrototypeOf, _classCallCheck2, _createClass2, _possibleConstructorReturn2, _get2, _inherits2, _mixin2, _createComponent, _initComponentBySearch, _eventMatches, _on) {
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

  var _get3 = _interopRequireDefault(_get2);

  var _inherits3 = _interopRequireDefault(_inherits2);

  var _mixin3 = _interopRequireDefault(_mixin2);

  var _createComponent2 = _interopRequireDefault(_createComponent);

  var _initComponentBySearch2 = _interopRequireDefault(_initComponentBySearch);

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
     * @param {string} [options.selectorLeftNavToggle]
     *   The data attribute selector for the button that will show and hide the left navigation.
     * @param {string} [options.selectorLeftNavListItem] The data attribute selector for all list items in the left navigation.
     * @param {string} [options.selectorLeftNavCurrentPage]
     *   The data attribute selector for the current section title in the left nav header.
     * @param {string} [options.classActiveLeftNav] The class name for when a left nav is active.
     * @param {string} [options.classActiveLeftNavListItem] The class name for when a left nav list item is active.
     * @param {string} [options.classActiveSection] The class name for an active section item in the left nav header.
     */
    function LeftNav(element, options) {
      (0, _classCallCheck3.default)(this, LeftNav);

      var _this = (0, _possibleConstructorReturn3.default)(this, (LeftNav.__proto__ || (0, _getPrototypeOf2.default)(LeftNav)).call(this, element, options));

      _this.leftNavSectionActive = false;
      _this.hookOpenActions();
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
      key: 'hookOpenActions',
      value: function hookOpenActions() {
        var _this2 = this;

        var openBtn = this.element.ownerDocument.querySelector(this.options.selectorLeftNavToggleOpen);

        openBtn.addEventListener('click', function () {
          _this2.toggleMenu();
        });

        openBtn.addEventListener('keydown', function (evt) {
          if (evt.which === 13) {
            _this2.toggleMenu();
          }
        });

        this.element.ownerDocument.addEventListener('keydown', function (evt) {
          if (evt.which === 27 && _this2.element.classList.contains(_this2.options.classActiveLeftNav)) {
            _this2.closeMenu();
          }
        });
      }
    }, {
      key: 'hookListItemsEvents',
      value: function hookListItemsEvents() {
        var _this3 = this;

        var leftNavList = [].concat((0, _toConsumableArray3.default)(this.element.querySelectorAll(this.options.selectorLeftNavList)));
        leftNavList.forEach(function (list) {
          list.addEventListener('click', function (evt) {
            var leftNavItem = (0, _eventMatches2.default)(evt, _this3.options.selectorLeftNavListItem);
            if (leftNavItem) _this3.addActiveListItem(leftNavItem);
          });
          list.addEventListener('keydown', function (evt) {
            if (evt.which === 13) {
              var leftNavItem = (0, _eventMatches2.default)(evt, _this3.options.selectorLeftNavListItem);
              if (leftNavItem) _this3.addActiveListItem(leftNavItem);
            }
          });
        });
      }
    }, {
      key: 'addActiveListItem',
      value: function addActiveListItem(item) {
        var _this4 = this;

        [].concat((0, _toConsumableArray3.default)(this.element.querySelectorAll(this.options.selectorLeftNavListItem))).forEach(function (currentItem) {
          if (!(item === currentItem)) {
            if (!currentItem.contains(item)) {
              currentItem.classList.remove(_this4.options.classActiveLeftNavListItem);
            } else {
              currentItem.classList.add(_this4.options.classActiveLeftNavListItem);
            }
          }
        });

        item.classList.add(this.options.classActiveLeftNavListItem);
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

        if (isOfSelf && this.element.tagName === 'A') {
          evt.preventDefault();
        }
        if (shouldClose) {
          this.closeMenu();
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
    selectorLeftNavToggleOpen: '[data-left-nav-toggle="open"]',
    selectorLeftNavToggleClose: '[data-left-nav-toggle="close"]',
    selectorLeftNavListItem: '[data-left-nav-item]',
    selectorLeftNavListItemLink: '[data-left-nav-item-link]',
    // CSS Class Selectors
    classActiveTrigger: 'bx--left-nav__trigger--active',
    classActiveLeftNav: 'bx--left-nav--active',
    classActiveLeftNavListItem: 'bx--active-list-item',
    classItemFade: 'bx--main-nav__parent-item--fade',
    classItemHidden: 'bx--main-nav__parent-item--hidden',
    classListHidden: 'bx--left-nav__main-nav--hidden',
    classListTop: 'bx--left-nav__main-nav--top'
  };
  LeftNav.components = new _weakMap2.default();
  exports.default = LeftNav;
});