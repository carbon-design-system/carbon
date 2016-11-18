(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'babel-runtime/core-js/weak-map', 'babel-runtime/helpers/toConsumableArray', 'babel-runtime/core-js/object/create', 'babel-runtime/core-js/object/assign', 'babel-runtime/helpers/classCallCheck', 'babel-runtime/helpers/createClass'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('babel-runtime/core-js/weak-map'), require('babel-runtime/helpers/toConsumableArray'), require('babel-runtime/core-js/object/create'), require('babel-runtime/core-js/object/assign'), require('babel-runtime/helpers/classCallCheck'), require('babel-runtime/helpers/createClass'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.weakMap, global.toConsumableArray, global.create, global.assign, global.classCallCheck, global.createClass);
    global.pagination = mod.exports;
  }
})(this, function (exports, _weakMap, _toConsumableArray2, _create, _assign, _classCallCheck2, _createClass2) {
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

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var Pagination = function () {
    /**
    * Pagination component.
    * @implements Component
    * @param {HTMLElement} element The element working as a pagination component.
    * @param {Object} [options] The component options.
    * @property {string} [selectorInit] The CSS selector to find pagination components.
    * @property {string} [selectorItemsPerPageInput] The CSS selector to find the input that determines the number of items per page.
    * @property {string} [selectorPageNumberInput] The CSS selector to find the input that changes the page displayed.
    * @property {string} [selectorPageBackward] The CSS selector to find the button that goes back a page.
    * @property {string} [selectorPageForward] The CSS selector to find the button that goes forward a page.
    * @property {string} [eventItemsPerPage]
    *   The name of the custom event fired when a user changes the number of items per page.
    *   event.detail.value contains the number of items a user wishes to see.
    * @property {string} [eventPageNumber]
    *   The name of the custom event fired when a user inputs a specific page number.
    *   event.detail.value contains the value that the user input.
    * @property {string} [eventPageChange]
    *   The name of the custom event fired when a user goes forward or backward a page.
    *   event.detail.direction contains the direction a user wishes to go.
    */
    function Pagination(element) {
      var _this = this;

      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      (0, _classCallCheck3.default)(this, Pagination);

      this.emitEvent = function (evtName, detail) {
        var event = new CustomEvent('' + evtName, {
          bubbles: true,
          cancelable: true,
          detail: detail
        });

        _this.element.dispatchEvent(event);
      };

      if (!element || element.nodeType !== Node.ELEMENT_NODE) {
        throw new TypeError('DOM element should be given to initialize this widget.');
      }

      this.element = element;

      this.options = (0, _assign2.default)((0, _create2.default)(this.constructor.options), options);

      this.constructor.components.set(this.element, this);

      this.element.addEventListener('click', function (evt) {
        if (evt.target.matches(_this.options.selectorPageBackward)) {
          var detail = {
            initialEvt: evt,
            element: evt.target,
            direction: 'backward'
          };
          _this.emitEvent(_this.options.eventPageChange, detail);
        } else if (evt.target.matches(_this.options.selectorPageForward)) {
          var _detail = {
            initialEvt: evt,
            element: evt.target,
            direction: 'forward'
          };
          _this.emitEvent(_this.options.eventPageChange, _detail);
        }
      });

      this.element.addEventListener('input', function (evt) {
        if (evt.target.matches(_this.options.selectorItemsPerPageInput)) {
          var detail = {
            initialEvt: evt,
            element: evt.target,
            value: evt.target.value
          };
          _this.emitEvent(_this.options.eventItemsPerPage, detail);
        } else if (evt.target.matches(_this.options.selectorPageNumberInput)) {
          var _detail2 = {
            initialEvt: evt,
            element: evt.target,
            value: evt.target.value
          };
          _this.emitEvent(_this.options.eventPageNumber, _detail2);
        }
      });
    }

    /**
     * Dispatches a custom event
     * @param {String} evtName name of the event to be dispatched.
     * @param {Object} detail contains the original event and any other necessary details.
     */


    (0, _createClass3.default)(Pagination, null, [{
      key: 'create',
      value: function create(element, options) {
        return this.components.get(element) || new this(element, options);
      }
    }, {
      key: 'init',
      value: function init() {
        var _this2 = this;

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
            return _this2.create(element, effectiveOptions);
          });
        }
      }
    }]);
    return Pagination;
  }();

  exports.default = Pagination;


  /**
   * The map associating DOM element and pagination instance.
   * @type {WeakMap}
   */
  Pagination.components = new _weakMap2.default();

  /**
   * The component options.
   * If `options` is specified in the constructor, {@linkcode Pagination.create .create()}, or {@linkcode Pagination.init .init()},
   * properties in this object are overriden for the instance being create and how {@linkcode Pagination.init .init()} works.
   * @property {string} [selectorInit] The CSS selector to find pagination components.
   * @property {string} [selectorItemsPerPageInput] The CSS selector to find the input that determines the number of items per page.
   * @property {string} [selectorPageNumberInput] The CSS selector to find the input that changes the page displayed.
   * @property {string} [selectorPageBackward] The CSS selector to find the button that goes back a page.
   * @property {string} [selectorPageForward] The CSS selector to find the button that goes forward a page.
   * @property {string} [eventItemsPerPage]
   *   The name of the custom event fired when a user changes the number of items per page.
   *   event.detail.value contains the number of items a user wishes to see.
   * @property {string} [eventPageNumber]
   *   The name of the custom event fired when a user inputs a specific page number.
   *   event.detail.value contains the value that the user input.
   * @property {string} [eventPageChange]
   *   The name of the custom event fired when a user goes forward or backward a page.
   *   event.detail.direction contains the direction a user wishes to go.
   */
  Pagination.options = {
    selectorInit: '[data-pagination]',
    selectorItemsPerPageInput: '[data-items-per-page]',
    selectorPageNumberInput: '[data-page-number-input]',
    selectorPageBackward: '[data-page-backward]',
    selectorPageForward: '[data-page-forward]',
    eventItemsPerPage: 'itemsPerPage',
    eventPageNumber: 'pageNumber',
    eventPageChange: 'pageChange'
  };
});