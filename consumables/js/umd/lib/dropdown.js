(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'babel-runtime/core-js/weak-map', 'babel-runtime/helpers/toConsumableArray', 'babel-runtime/core-js/object/keys', 'babel-runtime/core-js/object/get-prototype-of', 'babel-runtime/helpers/classCallCheck', 'babel-runtime/helpers/createClass', 'babel-runtime/helpers/possibleConstructorReturn', 'babel-runtime/helpers/get', 'babel-runtime/helpers/inherits', '../misc/mixin', '../mixins/create-component', '../mixins/init-component-by-search', '../polyfills/event-matches', '../misc/on', '../polyfills/array-from', '../polyfills/element-matches', '../polyfills/object-assign', '../polyfills/custom-event'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('babel-runtime/core-js/weak-map'), require('babel-runtime/helpers/toConsumableArray'), require('babel-runtime/core-js/object/keys'), require('babel-runtime/core-js/object/get-prototype-of'), require('babel-runtime/helpers/classCallCheck'), require('babel-runtime/helpers/createClass'), require('babel-runtime/helpers/possibleConstructorReturn'), require('babel-runtime/helpers/get'), require('babel-runtime/helpers/inherits'), require('../misc/mixin'), require('../mixins/create-component'), require('../mixins/init-component-by-search'), require('../polyfills/event-matches'), require('../misc/on'), require('../polyfills/array-from'), require('../polyfills/element-matches'), require('../polyfills/object-assign'), require('../polyfills/custom-event'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.weakMap, global.toConsumableArray, global.keys, global.getPrototypeOf, global.classCallCheck, global.createClass, global.possibleConstructorReturn, global.get, global.inherits, global.mixin, global.createComponent, global.initComponentBySearch, global.eventMatches, global.on, global.arrayFrom, global.elementMatches, global.objectAssign, global.customEvent);
    global.dropdown = mod.exports;
  }
})(this, function (exports, _weakMap, _toConsumableArray2, _keys, _getPrototypeOf, _classCallCheck2, _createClass2, _possibleConstructorReturn2, _get2, _inherits2, _mixin2, _createComponent, _initComponentBySearch, _eventMatches, _on) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _weakMap2 = _interopRequireDefault(_weakMap);

  var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

  var _keys2 = _interopRequireDefault(_keys);

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

  var Dropdown = function (_mixin) {
    (0, _inherits3.default)(Dropdown, _mixin);

    /**
     * A selector with drop downs.
     * @extends CreateComponent
     * @extends InitComponentBySearch
     * @param {HTMLElement} element The element working as a selector.
     * @param {Object} [options] The component options.
     * @param {string} [options.selectorItem] The CSS selector to find clickable areas in dropdown items.
     * @param {string} [options.selectorItemSelected] The CSS selector to find the clickable area in the selected dropdown item.
     * @param {string} [options.classSelected] The CSS class for the selected dropdown item.
     * @param {string} [options.eventBeforeSelected]
     *   The name of the custom event fired before a drop down item is selected.
     *   Cancellation of this event stops selection of drop down item.
     * @param {string} [options.eventAfterSelected] The name of the custom event fired after a drop down item is selected.
     */
    function Dropdown(element, options) {
      (0, _classCallCheck3.default)(this, Dropdown);

      var _this = (0, _possibleConstructorReturn3.default)(this, (Dropdown.__proto__ || (0, _getPrototypeOf2.default)(Dropdown)).call(this, element, options));

      if (_this.element.dataset.dropdown !== 'navigation') {
        _this.element.dataset.dropdown = '';
      }

      /**
       * The handle to release click event listener on document object.
       * @member {Handle}
       */
      _this.hDocumentClick = (0, _on2.default)(_this.element.ownerDocument, 'click', function (event) {
        _this.toggle(event);
      });

      _this.setCloseOnBlur();

      _this.element.addEventListener('keydown', function (event) {
        _this.handleKeyDown(event);
      });
      _this.element.addEventListener('click', function (event) {
        var item = (0, _eventMatches2.default)(event, _this.options.selectorItem);
        if (item) {
          _this.select(item);
        }
      });
      return _this;
    }

    /**
     * Cleans up stuffs specific to this widget.
     */


    (0, _createClass3.default)(Dropdown, [{
      key: 'release',
      value: function release() {
        if (this.hFocusIn) {
          this.hFocusIn = this.hFocusIn.release();
        }
        if (this.hDocumentClick) {
          this.hDocumentClick = this.hDocumentClick.release();
        }
        (0, _get3.default)(Dropdown.prototype.__proto__ || (0, _getPrototypeOf2.default)(Dropdown.prototype), 'release', this).call(this);
      }
    }, {
      key: 'handleKeyDown',
      value: function handleKeyDown(event) {
        var isOpen = this.element.classList.contains('bx--dropdown--open');
        var direction = {
          38: this.constructor.NAVIGATE.BACKWARD,
          40: this.constructor.NAVIGATE.FORWARD
        }[event.which];
        if (isOpen && direction !== undefined) {
          this.navigate(direction);
        } else {
          this.toggle(event);
        }
      }
    }, {
      key: 'toggle',
      value: function toggle(event) {
        var _this2 = this;

        if ([13, 32, 40].indexOf(event.which) >= 0 && !event.target.matches(this.options.selectorItem) || event.which === 27 || event.type === 'click') {
          var isOpen = this.element.classList.contains('bx--dropdown--open');
          var isOfSelf = this.element.contains(event.target);
          var actions = {
            add: isOfSelf && event.which === 40 && !isOpen,
            remove: (!isOfSelf || event.which === 27) && isOpen,
            toggle: isOfSelf && event.which !== 27 && event.which !== 40
          };
          (0, _keys2.default)(actions).forEach(function (action) {
            if (actions[action]) {
              _this2.element.classList[action]('bx--dropdown--open');
              _this2.element.focus();
            }
          });
        }
      }
    }, {
      key: 'getCurrentNavigation',
      value: function getCurrentNavigation() {
        var focused = this.element.ownerDocument.activeElement;
        return focused.matches(this.options.selectorItem) ? focused : null;
      }
    }, {
      key: 'navigate',
      value: function navigate(direction) {
        var items = [].concat((0, _toConsumableArray3.default)(this.element.querySelectorAll(this.options.selectorItem)));
        var start = this.getCurrentNavigation() || this.element.querySelector(this.options.selectorItemSelected);
        var getNextItem = function getNextItem(old) {
          var handleUnderflow = function handleUnderflow(i, l) {
            return i + (i >= 0 ? 0 : l);
          };
          var handleOverflow = function handleOverflow(i, l) {
            return i - (i < l ? 0 : l);
          };
          // `items.indexOf(old)` may be -1 (Scenario of no previous focus)
          var index = Math.max(items.indexOf(old) + direction, -1);
          return items[handleUnderflow(handleOverflow(index, items.length), items.length)];
        };
        for (var current = getNextItem(start); current && current !== start; current = getNextItem(current)) {
          if (!current.matches(this.options.selectorItemSelected)) {
            current.focus();
            break;
          }
        }
      }
    }, {
      key: 'select',
      value: function select(itemToSelect) {
        var _this3 = this;

        var eventStart = new CustomEvent(this.options.eventBeforeSelected, {
          bubbles: true,
          cancelable: true,
          detail: { item: itemToSelect }
        });

        if (this.element.dispatchEvent(eventStart)) {
          if (this.element.dataset.dropdownType !== 'navigation') {
            this.element.firstElementChild.innerHTML = itemToSelect.innerHTML;
            itemToSelect.classList.add(this.options.classSelected);
          }
          this.element.dataset.value = itemToSelect.parentElement.dataset.value;

          [].concat((0, _toConsumableArray3.default)(this.element.querySelectorAll(this.options.selectorItemSelected))).forEach(function (item) {
            if (itemToSelect !== item) {
              item.classList.remove(_this3.options.classSelected);
            }
          });

          itemToSelect.classList.add(this.options.classSelected);

          this.element.dispatchEvent(new CustomEvent(this.options.eventAfterSelected, {
            bubbles: true,
            cancelable: true,
            detail: { item: itemToSelect }
          }));
        }
      }
    }, {
      key: 'setCloseOnBlur',
      value: function setCloseOnBlur() {
        var _this4 = this;

        var hasFocusin = 'onfocusin' in window;
        var focusinEventName = hasFocusin ? 'focusin' : 'focus';
        this.hFocusIn = (0, _on2.default)(this.element.ownerDocument, focusinEventName, function (event) {
          if (!_this4.element.contains(event.target)) {
            _this4.element.classList.remove('bx--dropdown--open');
          }
        }, !hasFocusin);
      }
    }]);
    return Dropdown;
  }((0, _mixin3.default)(_createComponent2.default, _initComponentBySearch2.default));

  Dropdown.components = new _weakMap2.default();
  Dropdown.options = {
    selectorInit: '[data-dropdown]',
    selectorItem: '[data-option] > .bx--dropdown__link',
    selectorItemSelected: '[data-option] > .bx--dropdown__link.bx--dropdown--selected',
    classSelected: 'bx--dropdown--selected',
    eventBeforeSelected: 'dropdown-beingselected',
    eventAfterSelected: 'dropdown-selected'
  };
  Dropdown.NAVIGATE = {
    BACKWARD: -1,
    FORWARD: 1
  };
  exports.default = Dropdown;
});