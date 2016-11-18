(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'babel-runtime/core-js/weak-map', 'babel-runtime/helpers/toConsumableArray', 'babel-runtime/core-js/object/create', 'babel-runtime/core-js/object/assign', 'babel-runtime/helpers/classCallCheck', 'babel-runtime/helpers/createClass', '../misc/on', '../polyfills/array-from', '../polyfills/element-matches', '../polyfills/object-assign', '../polyfills/custom-event'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('babel-runtime/core-js/weak-map'), require('babel-runtime/helpers/toConsumableArray'), require('babel-runtime/core-js/object/create'), require('babel-runtime/core-js/object/assign'), require('babel-runtime/helpers/classCallCheck'), require('babel-runtime/helpers/createClass'), require('../misc/on'), require('../polyfills/array-from'), require('../polyfills/element-matches'), require('../polyfills/object-assign'), require('../polyfills/custom-event'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.weakMap, global.toConsumableArray, global.create, global.assign, global.classCallCheck, global.createClass, global.on, global.arrayFrom, global.elementMatches, global.objectAssign, global.customEvent);
    global.dropdown = mod.exports;
  }
})(this, function (exports, _weakMap, _toConsumableArray2, _create, _assign, _classCallCheck2, _createClass2, _on) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _weakMap2 = _interopRequireDefault(_weakMap);

  var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

  var _create2 = _interopRequireDefault(_create);

  var _assign2 = _interopRequireDefault(_assign);

  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

  var _createClass3 = _interopRequireDefault(_createClass2);

  var _on2 = _interopRequireDefault(_on);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var Dropdown = function () {
    /**
     * A selector with drop downs.
     * @implements Component
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
    function Dropdown(element) {
      var _this = this;

      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      (0, _classCallCheck3.default)(this, Dropdown);

      if (!element || element.nodeType !== Node.ELEMENT_NODE) {
        throw new TypeError('DOM element should be given to initialize this widget.');
      }

      this.element = element;

      this.options = (0, _assign2.default)((0, _create2.default)(this.constructor.options), options);

      if (this.element.dataset.dropdown !== 'navigation') {
        this.element.dataset.dropdown = '';
      }
      this.constructor.components.set(this.element, this);

      /**
       * The handle to release click event listener on document object.
       * @member {Handle}
       */
      this.hDocumentClick = (0, _on2.default)(this.element.ownerDocument, 'click', function (event) {
        return _this.toggle(event);
      });

      this.setCloseOnBlur();

      this.element.addEventListener('keypress', function (event) {
        return _this.toggle(event);
      });
      this.element.addEventListener('click', function (event) {
        return _this.selected(event);
      });
    }

    /**
     * Instantiates selector of the given element.
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


    (0, _createClass3.default)(Dropdown, [{
      key: 'release',
      value: function release() {
        if (this.hFocusIn) {
          this.hFocusIn = this.hFocusIn.release();
        }
        if (this.hDocumentClick) {
          this.hDocumentClick = this.hDocumentClick.release();
        }
        this.constructor.components.delete(this.element);
      }
    }, {
      key: 'toggle',
      value: function toggle(event) {
        if (event.which === 13 || event.which === 32 || event.type === 'click') {
          var isOfSelf = this.element.contains(event.target);

          if (isOfSelf) {
            this.element.classList.toggle('bx--dropdown--open');
          } else if (!isOfSelf && this.element.classList.contains('bx--dropdown--open')) {
            this.element.classList.remove('bx--dropdown--open');
          }
        }
      }
    }, {
      key: 'selected',
      value: function selected(event) {
        var _this2 = this;

        var activatedElement = event.target;
        if (activatedElement.parentElement.dataset.option !== undefined) {
          var eventStart = new CustomEvent(this.options.eventBeforeSelected, {
            bubbles: true,
            cancelable: true,
            detail: { item: activatedElement }
          });

          if (this.element.dispatchEvent(eventStart)) {
            if (this.element.dataset.dropdownType !== 'navigation') {
              this.element.firstElementChild.innerHTML = activatedElement.innerHTML;
              activatedElement.classList.add(this.options.classSelected);
            }
            this.element.dataset.value = activatedElement.parentElement.dataset.value;
            [].concat((0, _toConsumableArray3.default)(this.element.querySelectorAll(this.options.selectorItemSelected))).forEach(function (item) {
              if (activatedElement !== item) {
                item.classList.remove(_this2.options.classSelected);
              }
            });

            this.element.dispatchEvent(new CustomEvent(this.options.eventAfterSelected, {
              bubbles: true,
              cancelable: true,
              detail: { item: activatedElement }
            }));
          }
        }
      }
    }, {
      key: 'setCloseOnBlur',
      value: function setCloseOnBlur() {
        var _this3 = this;

        var hasFocusin = 'onfocusin' in window;
        var focusinEventName = hasFocusin ? 'focusin' : 'focus';
        this.hFocusIn = (0, _on2.default)(this.element.ownerDocument, focusinEventName, function (event) {
          if (!_this3.element.contains(event.target)) {
            _this3.element.classList.remove('bx--dropdown--open');
          }
        }, !hasFocusin);
      }
    }], [{
      key: 'create',
      value: function create(element, options) {
        return this.components.get(element) || new this(element, options);
      }
    }, {
      key: 'init',
      value: function init() {
        var _this4 = this;

        var target = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document;
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        var effectiveOptions = (0, _assign2.default)((0, _create2.default)(this.options), options);
        if (target.nodeType !== Node.ELEMENT_NODE && target.nodeType !== Node.DOCUMENT_NODE) {
          throw new Error('DOM document or DOM element should be given to search for and initialize this widget.');
        }
        if (target.nodeType === Node.ELEMENT_NODE && target.matches(effectiveOptions.selectorInit)) {
          this.create(target, effectiveOptions);
        } else {
          [].concat((0, _toConsumableArray3.default)(target.querySelectorAll(effectiveOptions.selectorInit))).forEach(function (element) {
            return _this4.create(element, effectiveOptions);
          });
        }
      }
    }]);
    return Dropdown;
  }();

  Dropdown.components = new _weakMap2.default();
  Dropdown.options = {
    selectorInit: '[data-dropdown]',
    selectorItem: '[data-option] > .bx--dropdown__link',
    selectorItemSelected: '[data-option] > .bx--dropdown__link.bx--dropdown--selected',
    classSelected: 'bx--dropdown--selected',
    eventBeforeSelected: 'dropdown-beingselected',
    eventAfterSelected: 'dropdown-selected'
  };
  exports.default = Dropdown;
});