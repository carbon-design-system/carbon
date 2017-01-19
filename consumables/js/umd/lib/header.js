(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'babel-runtime/core-js/weak-map', 'babel-runtime/helpers/toConsumableArray', 'babel-runtime/core-js/object/get-prototype-of', 'babel-runtime/helpers/classCallCheck', 'babel-runtime/helpers/createClass', 'babel-runtime/helpers/possibleConstructorReturn', 'babel-runtime/helpers/inherits', '../misc/mixin', '../mixins/create-component', '../mixins/init-component-by-launcher', '../mixins/evented-state', '../polyfills/toggle-class', '../polyfills/event-matches', '../polyfills/array-from', '../polyfills/element-matches', '../polyfills/object-assign', '../polyfills/custom-event'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('babel-runtime/core-js/weak-map'), require('babel-runtime/helpers/toConsumableArray'), require('babel-runtime/core-js/object/get-prototype-of'), require('babel-runtime/helpers/classCallCheck'), require('babel-runtime/helpers/createClass'), require('babel-runtime/helpers/possibleConstructorReturn'), require('babel-runtime/helpers/inherits'), require('../misc/mixin'), require('../mixins/create-component'), require('../mixins/init-component-by-launcher'), require('../mixins/evented-state'), require('../polyfills/toggle-class'), require('../polyfills/event-matches'), require('../polyfills/array-from'), require('../polyfills/element-matches'), require('../polyfills/object-assign'), require('../polyfills/custom-event'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.weakMap, global.toConsumableArray, global.getPrototypeOf, global.classCallCheck, global.createClass, global.possibleConstructorReturn, global.inherits, global.mixin, global.createComponent, global.initComponentByLauncher, global.eventedState, global.toggleClass, global.eventMatches, global.arrayFrom, global.elementMatches, global.objectAssign, global.customEvent);
    global.header = mod.exports;
  }
})(this, function (exports, _weakMap, _toConsumableArray2, _getPrototypeOf, _classCallCheck2, _createClass2, _possibleConstructorReturn2, _inherits2, _mixin2, _createComponent, _initComponentByLauncher, _eventedState, _toggleClass, _eventMatches) {
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

  var _initComponentByLauncher2 = _interopRequireDefault(_initComponentByLauncher);

  var _eventedState2 = _interopRequireDefault(_eventedState);

  var _toggleClass2 = _interopRequireDefault(_toggleClass);

  var _eventMatches2 = _interopRequireDefault(_eventMatches);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var HeaderNav = function (_mixin) {
    (0, _inherits3.default)(HeaderNav, _mixin);

    /**
     * Header with taxonomy menu.
     * @deprecated
     * @extends CreateComponent
     * @extends InitComponentByLauncher
     * @extends EventedState
     * @param {HTMLElement} element The element working as a taxonomy menu.
     * @param {Object} [options] The component options.
     * @param {string} [options.selectorTriggerLabel] The CSS selector to find the label for the selected menu item.
     * @param {string} [options.selectorMenu] The CSS selector to find the container of the menu items.
     * @param {string} [options.selectorItem] The CSS selector to find the menu items.
     * @param {string} [options.selectorItemLink] The CSS selector to find the link in the menu items.
     * @param {string} [options.selectorLabel] The CSS selector to find the label of the menu items.
     * @param {string} [options.classActive] The CSS class for the visible state.
     * @param {string} [options.eventBeforeShown]
     *   The name of the custom event fired before this taxonomy menu is shown.
     *   Cancellation of this event stops showing the taxonomy menu.
     * @param {string} [options.eventAfterShown] The name of the custom event fired after this taxonomy menu is shown.
     * @param {string} [options.eventBeforeHidden]
     *   The name of the custom event fired before this taxonomy menu is hidden.
     *   Cancellation of this event stops hiding the taxonomy menu.
     * @param {string} [options.eventAfterHidden] The name of the custom event fired after this taxonomy menu is hidden.
     * @param {string} [options.eventBeforeSelected]
     *   The name of the custom event fired before a menu item is selected.
     *   Cancellation of this event stops the selection.
     * @param {string} [options.eventAfterSelected] The name of the custom event fired after a menu item is selected.
     */
    function HeaderNav(element, options) {
      (0, _classCallCheck3.default)(this, HeaderNav);

      var _this = (0, _possibleConstructorReturn3.default)(this, (HeaderNav.__proto__ || (0, _getPrototypeOf2.default)(HeaderNav)).call(this, element, options));

      _this.menuNode = _this.element.querySelector(_this.options.selectorMenu);

      _this.element.addEventListener('keydown', function (event) {
        _this.toggleNav(event);
      });

      [].concat((0, _toConsumableArray3.default)(_this.element.querySelectorAll(_this.options.selectorItemLink))).forEach(function (item) {
        item.addEventListener('click', function (e) {
          _this.select(e);
        });
      });
      return _this;
    }

    /**
     * A method called when this widget is created upon clicking on launcher button.
     * @param {Event} event The event triggering the creation.
     */


    (0, _createClass3.default)(HeaderNav, [{
      key: 'createdByLauncher',
      value: function createdByLauncher(event) {
        this.toggleNav(event);
      }
    }, {
      key: 'shouldStateBeChanged',
      value: function shouldStateBeChanged(state) {
        return state !== (this.element.classList.contains(this.options.classActive) ? 'shown' : 'hidden');
      }
    }, {
      key: '_changeState',
      value: function _changeState(state, detail, callback) {
        (0, _toggleClass2.default)(this.element, this.options.classActive, state === 'shown');
        callback();
      }
    }, {
      key: 'toggleNav',
      value: function toggleNav(event) {
        var _this2 = this;

        var isActive = this.element.classList.contains(this.options.classActive);
        var add = void 0;
        if (event.type === 'click' || event.type === 'keydown' && event.which === 40) {
          // Toggle button or ESC key on nav
          add = !isActive;
        } else if (event.type === 'keydown' && event.which === 27) {
          // Down arrow on launch button
          add = false;
        } else {
          return;
        }

        var launchingElement = (0, _eventMatches2.default)(event, '[data-nav-target]') || event.currentTarget;
        if (launchingElement.tagName === 'A') {
          event.preventDefault();
        }

        if (add) {
          this.triggerNode = launchingElement;
          this.triggerLabelNode = this.triggerNode.querySelector(this.options.selectorTriggerLabel);
        }

        this.changeState(add ? 'shown' : 'hidden', { launchingElement: launchingElement }, function (error) {
          if (!error) {
            (_this2.element.classList.contains(_this2.options.classActive) ? _this2.menuNode : _this2.triggerNode).focus();
          }
        });
      }
    }, {
      key: 'select',
      value: function select(event) {
        var activatedElement = event.currentTarget;
        var eventStart = new CustomEvent(this.options.eventBeforeSelected, {
          bubbles: true,
          cancelable: true,
          detail: {
            initiatingEvent: event,
            itemElement: activatedElement
          }
        });

        if (this.element.dispatchEvent(eventStart)) {
          [].concat((0, _toConsumableArray3.default)(this.element.querySelectorAll(this.options.selectorItem))).forEach(function (element) {
            if (element.contains(activatedElement)) {
              element.classList.add('selected');
            } else if (element.classList.contains('selected')) {
              element.classList.remove('selected');
            }
          });
          activatedElement.classList.add('selected');
          if (this.triggerLabelNode) {
            this.triggerLabelNode.textContent = activatedElement.querySelector(this.options.selectorLabel).textContent;
          }
          this.element.dispatchEvent(new CustomEvent(this.options.eventAfterSelected, {
            bubbles: true,
            cancelable: true,
            detail: { itemElement: activatedElement }
          }));
        }
      }
    }], [{
      key: 'hook',
      value: function hook() {
        console.warn('HeaderNav.hook() is deprecated. Use HeaderNav.init() instead.'); // eslint-disable-line no-console
      }
    }]);
    return HeaderNav;
  }((0, _mixin3.default)(_createComponent2.default, _initComponentByLauncher2.default, _eventedState2.default));

  HeaderNav.components = new _weakMap2.default();
  HeaderNav.options = {
    selectorInit: '[data-nav]',
    attribInitTarget: 'data-nav-target',
    selectorTriggerLabel: '.current-taxonomy',
    classActive: 'taxonomy-nav--active',
    selectorMenu: '.taxonomy-menu',
    selectorItem: '.taxonomy-item',
    selectorItemLink: '.taxonomy-item--taxonomy-menu',
    selectorLabel: '.taxonomy-item__label',
    eventBeforeShown: 'header-beingshown',
    eventAfterShown: 'header-shown',
    eventBeforeHidden: 'header-beinghidden',
    eventAfterHidden: 'header-hidden',
    eventBeforeSelected: 'header-beingselected',
    eventAfterSelected: 'header-selected',
    initEventNames: ['click', 'keydown']
  };
  exports.default = HeaderNav;
});