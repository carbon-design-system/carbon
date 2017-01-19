(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'babel-runtime/core-js/weak-map', 'babel-runtime/core-js/object/assign', 'babel-runtime/helpers/toConsumableArray', 'babel-runtime/core-js/object/get-prototype-of', 'babel-runtime/helpers/classCallCheck', 'babel-runtime/helpers/createClass', 'babel-runtime/helpers/possibleConstructorReturn', 'babel-runtime/helpers/inherits', '../misc/mixin', '../mixins/create-component', '../mixins/init-component-by-search', '../mixins/evented-state', '../polyfills/event-matches', '../polyfills/toggle-class', '../polyfills/array-from', '../polyfills/custom-event', '../polyfills/element-matches', '../polyfills/object-assign'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('babel-runtime/core-js/weak-map'), require('babel-runtime/core-js/object/assign'), require('babel-runtime/helpers/toConsumableArray'), require('babel-runtime/core-js/object/get-prototype-of'), require('babel-runtime/helpers/classCallCheck'), require('babel-runtime/helpers/createClass'), require('babel-runtime/helpers/possibleConstructorReturn'), require('babel-runtime/helpers/inherits'), require('../misc/mixin'), require('../mixins/create-component'), require('../mixins/init-component-by-search'), require('../mixins/evented-state'), require('../polyfills/event-matches'), require('../polyfills/toggle-class'), require('../polyfills/array-from'), require('../polyfills/custom-event'), require('../polyfills/element-matches'), require('../polyfills/object-assign'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.weakMap, global.assign, global.toConsumableArray, global.getPrototypeOf, global.classCallCheck, global.createClass, global.possibleConstructorReturn, global.inherits, global.mixin, global.createComponent, global.initComponentBySearch, global.eventedState, global.eventMatches, global.toggleClass, global.arrayFrom, global.customEvent, global.elementMatches, global.objectAssign);
    global.contentSwitcher = mod.exports;
  }
})(this, function (exports, _weakMap, _assign, _toConsumableArray2, _getPrototypeOf, _classCallCheck2, _createClass2, _possibleConstructorReturn2, _inherits2, _mixin2, _createComponent, _initComponentBySearch, _eventedState, _eventMatches, _toggleClass) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _weakMap2 = _interopRequireDefault(_weakMap);

  var _assign2 = _interopRequireDefault(_assign);

  var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

  var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

  var _createClass3 = _interopRequireDefault(_createClass2);

  var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

  var _inherits3 = _interopRequireDefault(_inherits2);

  var _mixin3 = _interopRequireDefault(_mixin2);

  var _createComponent2 = _interopRequireDefault(_createComponent);

  var _initComponentBySearch2 = _interopRequireDefault(_initComponentBySearch);

  var _eventedState2 = _interopRequireDefault(_eventedState);

  var _eventMatches2 = _interopRequireDefault(_eventMatches);

  var _toggleClass2 = _interopRequireDefault(_toggleClass);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var ContentSwitcher = function (_mixin) {
    (0, _inherits3.default)(ContentSwitcher, _mixin);

    /**
     * Set of content switcher buttons.
     * @extends CreateComponent
     * @extends InitComponentBySearch
     * @extends EventedState
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
    function ContentSwitcher(element, options) {
      (0, _classCallCheck3.default)(this, ContentSwitcher);

      var _this = (0, _possibleConstructorReturn3.default)(this, (ContentSwitcher.__proto__ || (0, _getPrototypeOf2.default)(ContentSwitcher)).call(this, element, options));

      _this.element.addEventListener('click', function (event) {
        _this.handleClick(event);
      });

      [].concat((0, _toConsumableArray3.default)(element.querySelectorAll('input'))).forEach(function (input) {
        if (input.checked) _this._changeActive(input);
      });
      return _this;
    }

    /**
     * Handles click on content switcher button set.
     * If the click is on a content switcher button, activates it.
     * @param {Event} event The event triggering this method.
     */


    (0, _createClass3.default)(ContentSwitcher, [{
      key: 'handleClick',
      value: function handleClick(event) {
        var button = (0, _eventMatches2.default)(event, this.options.selectorButton);

        if (button) {
          this.changeState({
            group: 'selected',
            item: button,
            launchingEvent: event
          });
        }
      }
    }, {
      key: '_changeState',
      value: function _changeState(detail, callback) {
        var _this2 = this;

        var item = detail.item;
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

        callback();
      }
    }, {
      key: 'setActive',
      value: function setActive(item, callback) {
        this.changeState({
          group: 'selected',
          item: item
        }, function (error) {
          if (error) {
            callback((0, _assign2.default)(error, { item: item }));
          } else {
            callback(null, item);
          }
        });
      }
    }]);
    return ContentSwitcher;
  }((0, _mixin3.default)(_createComponent2.default, _initComponentBySearch2.default, _eventedState2.default));

  ContentSwitcher.components = new _weakMap2.default();
  ContentSwitcher.options = {
    selectorInit: '[data-content-switcher]',
    selectorButton: 'input[type="radio"], .bx--content-switcher__btn',
    selectorButtonSelected: 'input[type="radio"].bx--content-switcher--selected',
    classActive: 'bx--content-switcher--selected',
    eventBeforeSelected: 'content-switcher-beingselected',
    eventAfterSelected: 'content-switcher-selected'
  };
  exports.default = ContentSwitcher;
});