(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'babel-runtime/core-js/weak-map', 'babel-runtime/core-js/object/get-prototype-of', 'babel-runtime/helpers/classCallCheck', 'babel-runtime/helpers/possibleConstructorReturn', 'babel-runtime/helpers/inherits', '../misc/mixin', '../mixins/create-component', '../mixins/init-component-by-search', '../polyfills/array-from', '../polyfills/custom-event', '../polyfills/element-matches', '../polyfills/object-assign'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('babel-runtime/core-js/weak-map'), require('babel-runtime/core-js/object/get-prototype-of'), require('babel-runtime/helpers/classCallCheck'), require('babel-runtime/helpers/possibleConstructorReturn'), require('babel-runtime/helpers/inherits'), require('../misc/mixin'), require('../mixins/create-component'), require('../mixins/init-component-by-search'), require('../polyfills/array-from'), require('../polyfills/custom-event'), require('../polyfills/element-matches'), require('../polyfills/object-assign'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.weakMap, global.getPrototypeOf, global.classCallCheck, global.possibleConstructorReturn, global.inherits, global.mixin, global.createComponent, global.initComponentBySearch, global.arrayFrom, global.customEvent, global.elementMatches, global.objectAssign);
    global.pagination = mod.exports;
  }
})(this, function (exports, _weakMap, _getPrototypeOf, _classCallCheck2, _possibleConstructorReturn2, _inherits2, _mixin2, _createComponent, _initComponentBySearch) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _weakMap2 = _interopRequireDefault(_weakMap);

  var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

  var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

  var _inherits3 = _interopRequireDefault(_inherits2);

  var _mixin3 = _interopRequireDefault(_mixin2);

  var _createComponent2 = _interopRequireDefault(_createComponent);

  var _initComponentBySearch2 = _interopRequireDefault(_initComponentBySearch);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var Pagination = function (_mixin) {
    (0, _inherits3.default)(Pagination, _mixin);

    /**
    * Pagination component.
    * @extends CreateComponent
    * @extends InitComponentBySearch
    * @param {HTMLElement} element The element working as a pagination component.
    * @param {Object} [options] The component options.
    * @property {string} [selectorInit] The CSS selector to find pagination components.
    * @property {string} [selectorItemsPerPageInput]
    *   The CSS selector to find the input that determines the number of items per page.
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
    function Pagination(element, options) {
      (0, _classCallCheck3.default)(this, Pagination);

      var _this = (0, _possibleConstructorReturn3.default)(this, (Pagination.__proto__ || (0, _getPrototypeOf2.default)(Pagination)).call(this, element, options));

      _this.emitEvent = function (evtName, detail) {
        var event = new CustomEvent('' + evtName, {
          bubbles: true,
          cancelable: true,
          detail: detail
        });

        _this.element.dispatchEvent(event);
      };

      _this.element.addEventListener('click', function (evt) {
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

      _this.element.addEventListener('input', function (evt) {
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
      return _this;
    }

    /**
     * Dispatches a custom event
     * @param {String} evtName name of the event to be dispatched.
     * @param {Object} detail contains the original event and any other necessary details.
     */


    return Pagination;
  }((0, _mixin3.default)(_createComponent2.default, _initComponentBySearch2.default));

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

  exports.default = Pagination;
});