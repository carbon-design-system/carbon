(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'babel-runtime/core-js/weak-map', 'babel-runtime/core-js/math/sign', 'babel-runtime/helpers/toConsumableArray', 'babel-runtime/core-js/object/assign', 'babel-runtime/core-js/object/get-prototype-of', 'babel-runtime/helpers/classCallCheck', 'babel-runtime/helpers/createClass', 'babel-runtime/helpers/possibleConstructorReturn', 'babel-runtime/helpers/get', 'babel-runtime/helpers/inherits', '../polyfills/event-matches', './content-switcher', '../polyfills/array-from', '../polyfills/math-sign', '../polyfills/object-assign'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('babel-runtime/core-js/weak-map'), require('babel-runtime/core-js/math/sign'), require('babel-runtime/helpers/toConsumableArray'), require('babel-runtime/core-js/object/assign'), require('babel-runtime/core-js/object/get-prototype-of'), require('babel-runtime/helpers/classCallCheck'), require('babel-runtime/helpers/createClass'), require('babel-runtime/helpers/possibleConstructorReturn'), require('babel-runtime/helpers/get'), require('babel-runtime/helpers/inherits'), require('../polyfills/event-matches'), require('./content-switcher'), require('../polyfills/array-from'), require('../polyfills/math-sign'), require('../polyfills/object-assign'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.weakMap, global.sign, global.toConsumableArray, global.assign, global.getPrototypeOf, global.classCallCheck, global.createClass, global.possibleConstructorReturn, global.get, global.inherits, global.eventMatches, global.contentSwitcher, global.arrayFrom, global.mathSign, global.objectAssign);
    global.tabs = mod.exports;
  }
})(this, function (exports, _weakMap, _sign, _toConsumableArray2, _assign, _getPrototypeOf, _classCallCheck2, _createClass2, _possibleConstructorReturn2, _get2, _inherits2, _eventMatches, _contentSwitcher) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _weakMap2 = _interopRequireDefault(_weakMap);

  var _sign2 = _interopRequireDefault(_sign);

  var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

  var _assign2 = _interopRequireDefault(_assign);

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

    function Tab(element) {
      var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
      (0, _classCallCheck3.default)(this, Tab);

      var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Tab).call(this, element, (0, _assign2.default)({
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
      }, options)));

      _this.element.addEventListener('keydown', function (event) {
        return _this.handleKeyDown(event);
      });

      var selected = _this.element.querySelector(_this.options.selectorButtonSelected);
      if (selected) {
        _this.updateTriggerText(selected);
      }
      return _this;
    }

    (0, _createClass3.default)(Tab, [{
      key: '_changeActive',
      value: function _changeActive(item) {
        (0, _get3.default)((0, _getPrototypeOf2.default)(Tab.prototype), '_changeActive', this).call(this, item);
        this.updateTriggerText(item);
      }
    }, {
      key: 'handleClick',
      value: function handleClick(event) {
        (0, _get3.default)((0, _getPrototypeOf2.default)(Tab.prototype), 'handleClick', this).call(this, event);
        var button = (0, _eventMatches2.default)(event, this.options.selectorButton);
        var trigger = (0, _eventMatches2.default)(event, this.options.selectorTrigger);
        if (button) {
          (0, _get3.default)((0, _getPrototypeOf2.default)(Tab.prototype), 'handleClick', this).call(this, event);
          this.updateMenuState();
        }
        if (trigger) {
          this.updateMenuState();
        }
      }
    }, {
      key: 'handleKeyDown',
      value: function handleKeyDown(event) {
        var _this2 = this;

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
              var link = item.querySelector(_this2.options.selectorLink);
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
    }], [{
      key: 'init',
      value: function init() {
        var _this3 = this;

        var target = arguments.length <= 0 || arguments[0] === undefined ? document : arguments[0];
        var options = arguments[1];

        if (target.nodeType !== Node.ELEMENT_NODE && target.nodeType !== Node.DOCUMENT_NODE) {
          throw new Error('DOM document or DOM element should be given to search for and initialize this widget.');
        }
        if (target.nodeType === Node.ELEMENT_NODE && target.dataset.tabs !== undefined) {
          this.create(target, options);
        } else {
          [].concat((0, _toConsumableArray3.default)(target.querySelectorAll('[data-tabs]'))).forEach(function (element) {
            return _this3.create(element, options);
          });
        }
      }
    }]);
    return Tab;
  }(_contentSwitcher2.default);

  exports.default = Tab;


  Tab.components = new _weakMap2.default();
});