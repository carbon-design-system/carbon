(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'babel-runtime/core-js/weak-map', 'babel-runtime/helpers/typeof', 'babel-runtime/helpers/toConsumableArray', 'babel-runtime/core-js/object/assign', 'babel-runtime/helpers/classCallCheck', 'babel-runtime/helpers/createClass', '../polyfills/event-matches', '../polyfills/array-from', '../polyfills/object-assign', '../polyfills/custom-event'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('babel-runtime/core-js/weak-map'), require('babel-runtime/helpers/typeof'), require('babel-runtime/helpers/toConsumableArray'), require('babel-runtime/core-js/object/assign'), require('babel-runtime/helpers/classCallCheck'), require('babel-runtime/helpers/createClass'), require('../polyfills/event-matches'), require('../polyfills/array-from'), require('../polyfills/object-assign'), require('../polyfills/custom-event'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.weakMap, global._typeof, global.toConsumableArray, global.assign, global.classCallCheck, global.createClass, global.eventMatches, global.arrayFrom, global.objectAssign, global.customEvent);
    global.header = mod.exports;
  }
})(this, function (exports, _weakMap, _typeof2, _toConsumableArray2, _assign, _classCallCheck2, _createClass2, _eventMatches) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _weakMap2 = _interopRequireDefault(_weakMap);

  var _typeof3 = _interopRequireDefault(_typeof2);

  var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

  var _assign2 = _interopRequireDefault(_assign);

  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

  var _createClass3 = _interopRequireDefault(_createClass2);

  var _eventMatches2 = _interopRequireDefault(_eventMatches);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var HeaderNav = function () {
    /**
     * Header with taxonomy menu.
     * @implements Component
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

    function HeaderNav(element) {
      var _this = this;

      var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
      (0, _classCallCheck3.default)(this, HeaderNav);

      if (!element || element.nodeType !== Node.ELEMENT_NODE) {
        throw new TypeError('DOM element should be given to initialize this widget.');
      }

      this.element = element;

      this.options = (0, _assign2.default)({
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
        eventAfterSelected: 'header-selected'
      }, options);

      this.constructor.components.set(this.element, this);

      this.menuNode = this.element.querySelector(this.options.selectorMenu);

      this.element.addEventListener('keydown', function (event) {
        return _this.toggleNav(event);
      });

      [].concat((0, _toConsumableArray3.default)(this.element.querySelectorAll(this.options.selectorItemLink))).forEach(function (item) {
        item.addEventListener('click', function (e) {
          return _this.select(e);
        });
      });
    }

    /**
     * Instantiates taxonomy menus in the given element.
     * If the given element indicates that it's an taxonomy menu (having `data-nav` attribute), instantiates it.
     * Otherwise, instantiates taxonomy menus by clicking on launcher buttons
     * (buttons with `data-nav-target` attribute) of taxonomy menus in the given node.
     * @implements Component
     * @param {Node} target The DOM node to instantiate taxonomy menus in. Should be a document or an element.
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
     * @returns {Handle} The handle to remove the event listener to handle clicking.
     */


    (0, _createClass3.default)(HeaderNav, [{
      key: 'toggleNav',
      value: function toggleNav(event) {
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

        var eventStart = new CustomEvent(this.options[add ? 'eventBeforeShown' : 'eventBeforeHidden'], {
          bubbles: true,
          cancelable: true,
          detail: { launchingElement: launchingElement }
        });
        var defaultNotPrevented = this.element.dispatchEvent(eventStart);

        if (add) {
          this.triggerNode = launchingElement;
          this.triggerLabelNode = this.triggerNode.querySelector(this.options.selectorTriggerLabel);
        }

        if (defaultNotPrevented) {
          this.element.classList[add ? 'add' : 'remove'](this.options.classActive);
          (this.element.classList.contains(this.options.classActive) ? this.menuNode : this.triggerNode).focus();
          this.element.dispatchEvent(new CustomEvent(this.options[add ? 'eventAfterShown' : 'eventAfterHidden'], {
            bubbles: true,
            cancelable: true,
            detail: { launchingElement: launchingElement }
          }));
        }
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
    }, {
      key: 'release',
      value: function release() {
        this.constructor.components.delete(this.element);
      }
    }], [{
      key: 'init',
      value: function init() {
        var _this2 = this;

        var target = arguments.length <= 0 || arguments[0] === undefined ? document : arguments[0];
        var options = arguments[1];

        if (target.nodeType !== Node.ELEMENT_NODE && target.nodeType !== Node.DOCUMENT_NODE) {
          throw new Error('DOM document or DOM element should be given to search for and initialize this widget.');
        }
        if (target.nodeType === Node.ELEMENT_NODE && target.dataset.nav !== undefined) {
          this.create(target, options);
        } else {
          var _ret = function () {
            var handler = function handler(event) {
              var element = (0, _eventMatches2.default)(event, '[data-nav-target]');

              if (element) {
                var headerElements = [].concat((0, _toConsumableArray3.default)(element.ownerDocument.querySelectorAll(element.dataset.navTarget)));
                if (headerElements.length > 1) {
                  throw new Error('Target header must be unique.');
                }

                if (headerElements.length === 1) {
                  if (element.tagName === 'A') {
                    event.preventDefault();
                  }
                  _this2.create(headerElements[0], options).toggleNav(event);
                }
              }
            };

            target.addEventListener('click', handler);
            target.addEventListener('keydown', handler);

            return {
              v: {
                release: function release() {
                  target.removeEventListener('keydown', handler);
                  target.removeEventListener('click', handler);
                }
              }
            };
          }();

          if ((typeof _ret === 'undefined' ? 'undefined' : (0, _typeof3.default)(_ret)) === "object") return _ret.v;
        }
      }
    }, {
      key: 'create',
      value: function create(element, options) {
        return this.components.get(element) || new this(element, options);
      }
    }, {
      key: 'hook',
      value: function hook() {
        console.warn('HeaderNav.hook() is deprecated. Use HeaderNav.init() instead.'); // eslint-disable-line no-console
      }
    }]);
    return HeaderNav;
  }();

  exports.default = HeaderNav;


  /**
   * The component options.
   * @member {Object} HeaderNav#options
   * @property {string} [selectorTriggerLabel] The CSS selector to find the label for the selected menu item.
   * @property {string} [selectorMenu] The CSS selector to find the container of the menu items.
   * @property {string} [selectorItem] The CSS selector to find the menu items.
   * @property {string} [selectorItemLink] The CSS selector to find the link in the menu items.
   * @property {string} [selectorLabel] The CSS selector to find the label of the menu items.
   * @property {string} [classActive] The CSS class for the visible state.
   * @property {string} [eventBeforeShown]
   *   The name of the custom event fired before this taxonomy menu is shown.
   *   Cancellation of this event stops showing the taxonomy menu.
   * @property {string} [eventAfterShown] The name of the custom event fired after this taxonomy menu is shown.
   * @property {string} [eventBeforeHidden]
   *   The name of the custom event fired before this taxonomy menu is hidden.
   *   Cancellation of this event stops hiding the taxonomy menu.
   * @property {string} [eventAfterHidden] The name of the custom event fired after this taxonomy menu is hidden.
   * @property {string} [eventBeforeSelected]
   *   The name of the custom event fired before a menu item is selected.
   *   Cancellation of this event stops the selection.
   * @property {string} [eventAfterSelected] The name of the custom event fired after a menu item is selected.
   */

  /**
   * The map associating DOM element and taxonomy menu instance.
   * @type {WeakMap}
   */
  HeaderNav.components = new _weakMap2.default();
});