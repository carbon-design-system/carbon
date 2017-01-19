(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'babel-runtime/core-js/object/create', 'babel-runtime/core-js/object/assign', 'babel-runtime/core-js/weak-map', 'babel-runtime/core-js/math/sign', 'babel-runtime/helpers/toConsumableArray', 'babel-runtime/core-js/object/get-prototype-of', 'babel-runtime/helpers/classCallCheck', 'babel-runtime/helpers/createClass', 'babel-runtime/helpers/possibleConstructorReturn', 'babel-runtime/helpers/get', 'babel-runtime/helpers/inherits', '../polyfills/event-matches', './content-switcher', '../polyfills/array-from', '../polyfills/element-matches', '../polyfills/math-sign', '../polyfills/object-assign'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('babel-runtime/core-js/object/create'), require('babel-runtime/core-js/object/assign'), require('babel-runtime/core-js/weak-map'), require('babel-runtime/core-js/math/sign'), require('babel-runtime/helpers/toConsumableArray'), require('babel-runtime/core-js/object/get-prototype-of'), require('babel-runtime/helpers/classCallCheck'), require('babel-runtime/helpers/createClass'), require('babel-runtime/helpers/possibleConstructorReturn'), require('babel-runtime/helpers/get'), require('babel-runtime/helpers/inherits'), require('../polyfills/event-matches'), require('./content-switcher'), require('../polyfills/array-from'), require('../polyfills/element-matches'), require('../polyfills/math-sign'), require('../polyfills/object-assign'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.create, global.assign, global.weakMap, global.sign, global.toConsumableArray, global.getPrototypeOf, global.classCallCheck, global.createClass, global.possibleConstructorReturn, global.get, global.inherits, global.eventMatches, global.contentSwitcher, global.arrayFrom, global.elementMatches, global.mathSign, global.objectAssign);
    global.tabs = mod.exports;
  }
})(this, function (exports, _create, _assign, _weakMap, _sign, _toConsumableArray2, _getPrototypeOf, _classCallCheck2, _createClass2, _possibleConstructorReturn2, _get2, _inherits2, _eventMatches, _contentSwitcher) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _create2 = _interopRequireDefault(_create);

  var _assign2 = _interopRequireDefault(_assign);

  var _weakMap2 = _interopRequireDefault(_weakMap);

  var _sign2 = _interopRequireDefault(_sign);

  var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

  var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

  var _createClass3 = _interopRequireDefault(_createClass2);

  var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

  var _get3 = _interopRequireDefault(_get2);

  var _inherits3 = _interopRequireDefault(_inherits2);

  var _eventMatches2 = _interopRequireDefault(_eventMatches);

  var _contentSwitcher2 = _interopRequireDefault(_contentSwitcher);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var Tab = function (_ContentSwitcher) {
    (0, _inherits3.default)(Tab, _ContentSwitcher);

    /**
     * Container of tabs.
     * @extends ContentSwitcher
     * @param {HTMLElement} element The element working as a container of tabs.
     * @param {Object} [options] The component options.
     * @param {string} [options.selectorMenu] The CSS selector to find the drop down menu used in narrow mode.
     * @param {string} [options.selectorTrigger] The CSS selector to find the button to open the drop down menu used in narrow mode.
     * @param {string} [options.selectorTriggerText]
     *   The CSS selector to find the element used in narrow mode showing the selected tab item.
     * @param {string} [options.selectorButton] The CSS selector to find tab containers.
     * @param {string} [options.selectorButtonSelected] The CSS selector to find the selected tab.
     * @param {string} [options.selectorLink] The CSS selector to find the links in tabs.
     * @param {string} [options.classActive] The CSS class for tab's selected state.
     * @param {string} [options.classHidden] The CSS class for the drop down menu's hidden state used in narrow mode.
     * @param {string} [options.eventBeforeSelected]
     *   The name of the custom event fired before a tab is selected.
     *   Cancellation of this event stops selection of tab.
     * @param {string} [options.eventAfterSelected] The name of the custom event fired after a tab is selected.
     */
    function Tab(element, options) {
      (0, _classCallCheck3.default)(this, Tab);

      var _this = (0, _possibleConstructorReturn3.default)(this, (Tab.__proto__ || (0, _getPrototypeOf2.default)(Tab)).call(this, element, options));

      _this.element.addEventListener('keydown', function (event) {
        _this.handleKeyDown(event);
      });

      var selected = _this.element.querySelector(_this.options.selectorButtonSelected);
      if (selected) {
        _this.updateTriggerText(selected);
      }
      return _this;
    }

    /**
     * Internal method of {@linkcode Tab#setActive .setActive()}, to select a tab item.
     * @private
     * @param {Object} detail The detail of the event trigging this action.
     * @param {HTMLElement} detail.item The tab item to be selected.
     * @param {Function} callback Callback called when change in state completes.
     */


    (0, _createClass3.default)(Tab, [{
      key: '_changeState',
      value: function _changeState(detail, callback) {
        var _this2 = this;

        (0, _get3.default)(Tab.prototype.__proto__ || (0, _getPrototypeOf2.default)(Tab.prototype), '_changeState', this).call(this, detail, function (error) {
          for (var _len = arguments.length, data = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            data[_key - 1] = arguments[_key];
          }

          if (!error) {
            _this2.updateTriggerText(detail.item);
          }
          callback.apply(undefined, [error].concat(data));
        });
      }
    }, {
      key: 'handleClick',
      value: function handleClick(event) {
        (0, _get3.default)(Tab.prototype.__proto__ || (0, _getPrototypeOf2.default)(Tab.prototype), 'handleClick', this).call(this, event);
        var button = (0, _eventMatches2.default)(event, this.options.selectorButton);
        var trigger = (0, _eventMatches2.default)(event, this.options.selectorTrigger);
        if (button) {
          (0, _get3.default)(Tab.prototype.__proto__ || (0, _getPrototypeOf2.default)(Tab.prototype), 'handleClick', this).call(this, event);
          this.updateMenuState();
        }
        if (trigger) {
          this.updateMenuState();
        }
      }
    }, {
      key: 'handleKeyDown',
      value: function handleKeyDown(event) {
        var _this3 = this;

        var triggerNode = this.element.querySelector(this.options.selectorTrigger);
        if (triggerNode && triggerNode.offsetParent) {
          return;
        }

        var direction = {
          Left: -1,
          Right: 1,
          ArrowLeft: -1,
          ArrowRight: 1
        }[event.key || event.keyIdentifier];

        if (direction) {
          var buttons = [].concat((0, _toConsumableArray3.default)(this.element.querySelectorAll(this.options.selectorButton)));
          var button = this.element.querySelector(this.options.selectorButtonSelected);
          var nextIndex = Math.max(buttons.indexOf(button) + direction, -1 /* For `button` not found in `buttons` */);
          var nextIndexLooped = nextIndex >= 0 && nextIndex < buttons.length ? nextIndex : nextIndex - (0, _sign2.default)(nextIndex) * buttons.length;
          this.setActive(buttons[nextIndexLooped], function (error, item) {
            if (item) {
              var link = item.querySelector(_this3.options.selectorLink);
              if (link) {
                link.focus();
              }
            }
          });
          event.preventDefault();
        }
      }
    }, {
      key: 'updateMenuState',
      value: function updateMenuState() {
        this.element.querySelector(this.options.selectorMenu).classList.toggle(this.options.classHidden);
      }
    }, {
      key: 'updateTriggerText',
      value: function updateTriggerText(target) {
        this.element.querySelector(this.options.selectorTriggerText).textContent = target.textContent;
      }
    }]);
    return Tab;
  }(_contentSwitcher2.default);

  Tab.components = new _weakMap2.default();
  Tab.options = (0, _assign2.default)((0, _create2.default)(_contentSwitcher2.default.options), {
    selectorInit: '[data-tabs]',
    selectorMenu: '.bx--tabs__nav',
    selectorTrigger: '.bx--tabs__trigger',
    selectorTriggerText: '.bx--tabs__trigger-text',
    selectorButton: '.bx--tabs__nav-item',
    selectorButtonSelected: '.bx--tabs__nav-item.bx--tabs--selected',
    selectorLink: '.bx--tabs__nav-link',
    classActive: 'bx--tabs--selected',
    classHidden: 'bx--tabs--hidden',
    eventBeforeSelected: 'tab-beingselected',
    eventAfterSelected: 'tab-selected'
  });
  exports.default = Tab;
});