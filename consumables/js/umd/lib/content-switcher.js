(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'babel-runtime/core-js/weak-map', 'babel-runtime/helpers/toConsumableArray', 'babel-runtime/core-js/object/assign', 'babel-runtime/helpers/classCallCheck', 'babel-runtime/helpers/createClass', '../polyfills/event-matches', '../polyfills/toggle-class', '../polyfills/array-from', '../polyfills/object-assign'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('babel-runtime/core-js/weak-map'), require('babel-runtime/helpers/toConsumableArray'), require('babel-runtime/core-js/object/assign'), require('babel-runtime/helpers/classCallCheck'), require('babel-runtime/helpers/createClass'), require('../polyfills/event-matches'), require('../polyfills/toggle-class'), require('../polyfills/array-from'), require('../polyfills/object-assign'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.weakMap, global.toConsumableArray, global.assign, global.classCallCheck, global.createClass, global.eventMatches, global.toggleClass, global.arrayFrom, global.objectAssign);
    global.contentSwitcher = mod.exports;
  }
})(this, function (exports, _weakMap, _toConsumableArray2, _assign, _classCallCheck2, _createClass2, _eventMatches, _toggleClass) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _weakMap2 = _interopRequireDefault(_weakMap);

  var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

  var _assign2 = _interopRequireDefault(_assign);

  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

  var _createClass3 = _interopRequireDefault(_createClass2);

  var _eventMatches2 = _interopRequireDefault(_eventMatches);

  var _toggleClass2 = _interopRequireDefault(_toggleClass);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var ContentSwitcher = function () {
    /**
     * Set of content switcher buttons.
     * @implements Component
     * @param {HTMLElement} element The element working as a set of content switcher buttons.
     * @param {Object} [options] The component options.
     * @param {string} [options.selectorButton] The CSS selector to find switcher buttons.
     * @param {string} [options.selectorButtonSelected] The CSS selector to find the selected switcher button.
     * @param {string} [options.classActive] The CSS class for switcher button's selected state.
     * @param {string} [options.eventBeforeSelected]
     *   The name of the custom event fired before a switcher button is selected.
     *   Cancellation of this event stops selection of content switcher button.
     * @param {string} [options.eventAfterSelected] The name of the custom event fired after a switcher button is selected.
     */

    function ContentSwitcher(element) {
      var _this = this;

      var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
      (0, _classCallCheck3.default)(this, ContentSwitcher);

      if (!element || element.nodeType !== Node.ELEMENT_NODE) {
        throw new TypeError('DOM element should be given to initialize this widget.');
      }

      this.element = element;

      this.options = (0, _assign2.default)({
        selectorButton: 'input[type="radio"], a.bx--content-switcher__btn',
        selectorButtonSelected: 'input[type="radio"].bx--content-switcher--selected',
        classActive: 'bx--content-switcher--selected',
        eventBeforeSelected: 'content-switcher-beingselected',
        eventAfterSelected: 'content-switcher-selected'
      }, options);

      this.constructor.components.set(this.element, this);

      this.element.addEventListener('click', function (event) {
        return _this.handleClick(event);
      });

      [].concat((0, _toConsumableArray3.default)(element.querySelectorAll('input'))).forEach(function (input) {
        if (input.checked) _this._changeActive(input);
      });
    }

    /**
     * Instantiates a set of content switcher buttons of the given element.
     * @param {HTMLElement} element The element working as a set of content switcher buttons.
     * @param {Object} [options] The component options.
     * @param {string} [options.selectorButton] The CSS selector to find switcher buttons.
     * @param {string} [options.selectorButtonSelected] The CSS selector to find the selected switcher button.
     * @param {string} [options.classActive] The CSS class for switcher button's selected state.
     * @param {string} [options.eventBeforeSelected]
     *   The name of the custom event fired before a switcher button is selected.
     *   Cancellation of this event stops selection of content switcher button.
     * @param {string} [options.eventAfterSelected] The name of the custom event fired after a switcher button is selected.
     */


    (0, _createClass3.default)(ContentSwitcher, [{
      key: 'handleClick',
      value: function handleClick(event) {
        var button = (0, _eventMatches2.default)(event, this.options.selectorButton);

        if (button) {
          this.setActive(button);
        }
      }
    }, {
      key: '_changeActive',
      value: function _changeActive(item) {
        var _this2 = this;

        // `options.selectorLink` is not defined in this class itself, code here primary is for inherited classes
        var itemLink = item.querySelector(this.options.selectorLink);
        if (itemLink) {
          [].concat((0, _toConsumableArray3.default)(this.element.querySelectorAll(this.options.selectorLink))).forEach(function (link) {
            if (link !== itemLink) {
              link.setAttribute('aria-selected', 'false');
            }
          });
          itemLink.setAttribute('aria-selected', 'true');
        }

        var selectorButtons = [].concat((0, _toConsumableArray3.default)(this.element.querySelectorAll(this.options.selectorButton)));

        selectorButtons.forEach(function (button) {
          if (button !== item) {
            (0, _toggleClass2.default)(button, _this2.options.classActive, false);
            [].concat((0, _toConsumableArray3.default)(button.ownerDocument.querySelectorAll(button.dataset.target))).forEach(function (element) {
              return element.setAttribute('hidden', '');
            });
          }
        });

        (0, _toggleClass2.default)(item, this.options.classActive, true);
        [].concat((0, _toConsumableArray3.default)(item.ownerDocument.querySelectorAll(item.dataset.target))).forEach(function (element) {
          return element.removeAttribute('hidden');
        });
      }
    }, {
      key: 'setActive',
      value: function setActive(item, callback) {
        var eventStart = new CustomEvent(this.options.eventBeforeSelected, {
          bubbles: true,
          cancelable: true,
          detail: { item: item }
        });

        // https://connect.microsoft.com/IE/feedback/details/790389/event-defaultprevented-returns-false-after-preventdefault-was-called
        if (this.element.dispatchEvent(eventStart)) {
          this._changeActive(item);
          this.element.dispatchEvent(new CustomEvent(this.options.eventAfterSelected, {
            bubbles: true,
            cancelable: true,
            detail: { item: item }
          }));
          if (callback) {
            callback(null, item);
          }
        } else {
          var error = new Error('Switching active item has been canceled.');
          error.canceled = true;
          error.item = item;
          if (callback) {
            callback(error);
          }
        }
      }
    }, {
      key: 'release',
      value: function release() {
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
        var _this3 = this;

        var target = arguments.length <= 0 || arguments[0] === undefined ? document : arguments[0];
        var options = arguments[1];

        if (target.nodeType !== Node.ELEMENT_NODE && target.nodeType !== Node.DOCUMENT_NODE) {
          throw new Error('DOM document or DOM element should be given to search for and initialize this widget.');
        }
        if (target.nodeType === Node.ELEMENT_NODE && target.dataset.contentSwitcher !== undefined) {
          this.create(target, options);
        } else {
          [].concat((0, _toConsumableArray3.default)(document.querySelectorAll('[data-content-switcher]'))).forEach(function (element) {
            return _this3.create(element, options);
          });
        }
      }
    }]);
    return ContentSwitcher;
  }();

  exports.default = ContentSwitcher;


  /**
   * The component options.
   * @member {Object} ContentSwitcher#options
   * @property {string} [selectorButton] The CSS selector to find switcher buttons.
   * @property {string} [selectorButtonSelected] The CSS selector to find the selected switcher button.
   * @property {string} [classActive] The CSS class for switcher button's selected state.
   * @property {string} [eventBeforeSelected]
   *   The name of the custom event fired before a switcher button is selected.
   *   Cancellation of this event stops selection of content switcher button.
   * @property {string} [eventAfterSelected] The name of the custom event fired after a switcher button is selected.
   */

  /**
   * The map associating DOM element and content switcher set instance.
   * @type {WeakMap}
   */
  ContentSwitcher.components = new _weakMap2.default();
});