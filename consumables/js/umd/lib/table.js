(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'babel-runtime/core-js/weak-map', 'babel-runtime/helpers/typeof', 'babel-runtime/core-js/object/assign', 'babel-runtime/helpers/classCallCheck', 'babel-runtime/helpers/createClass', '../polyfills/event-matches', '../polyfills/toggle-class', '../polyfills/object-assign'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('babel-runtime/core-js/weak-map'), require('babel-runtime/helpers/typeof'), require('babel-runtime/core-js/object/assign'), require('babel-runtime/helpers/classCallCheck'), require('babel-runtime/helpers/createClass'), require('../polyfills/event-matches'), require('../polyfills/toggle-class'), require('../polyfills/object-assign'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.weakMap, global._typeof, global.assign, global.classCallCheck, global.createClass, global.eventMatches, global.toggleClass, global.objectAssign);
    global.table = mod.exports;
  }
})(this, function (exports, _weakMap, _typeof2, _assign, _classCallCheck2, _createClass2, _eventMatches, _toggleClass) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _weakMap2 = _interopRequireDefault(_weakMap);

  var _typeof3 = _interopRequireDefault(_typeof2);

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

  var Table = function () {
    /**
     * Data table.
     * @implements Component
     * @param {HTMLElement} element The element working as a data table.
     * @param {Object} [options] The component options.
     * @param {string} [options.selectorTitle] The CSS selector to find column titles.
     * @param {string} [options.selectorRow] The CSS selector to find rows.
     * @param {string} [options.selectorCheckbox] The CSS selector to find check boxes.
     * @param {string} [options.classSortState] The CSS class for the sorting state.
     * @param {string} [options.classCheckState] The CSS class for the checked state.
     * @param {string} [options.eventBeforeSortToggled] The name of the custom event fired before a column's sorting is toggled.
     * @param {string} [options.eventAfterSortToggled] The name of the custom event fired after a column's sorting is toggled.
     * @param {string} [options.eventBeforeCheckToggled] The name of the custom event fired before a check box is toggled.
     * @param {string} [options.eventAfterCheckToggled] The name of the custom event fired after a check box is toggled.
     */

    function Table(element) {
      var _this = this;

      var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
      (0, _classCallCheck3.default)(this, Table);

      if (!element || element.nodeType !== Node.ELEMENT_NODE) {
        throw new TypeError('DOM element should be given to initialize this widget.');
      }
      this.element = element;

      this.options = (0, _assign2.default)({
        selectorTitle: '.bx--table__column-title',
        selectorRow: '.bx--table__row',
        selectorCheckbox: '.bx--checkbox',
        classSortState: 'bx--table__column-title--rotated',
        classCheckState: 'bx--table__row--checked',
        eventBeforeSortToggled: 'table-sort-beingtoggled',
        eventAfterSortToggled: 'table-sort-toggled',
        eventBeforeCheckToggled: 'table-check-beingtoggled',
        eventAfterCheckToggled: 'table-check-toggled'
      }, options);

      this.constructor.components.set(this.element, this);

      this.element.addEventListener('click', function (event) {
        return _this.handleClick(event);
      });
    }

    /**
     * Instantiates a data table of the given element.
     * @param {HTMLElement} element The element working as a data table.
     * @param {Object} [options] The component options.
     * @param {string} [options.selectorTitle] The CSS selector to find column titles.
     * @param {string} [options.selectorRow] The CSS selector to find rows.
     * @param {string} [options.selectorCheckbox] The CSS selector to find check boxes.
     * @param {string} [options.classSortState] The CSS class for the sorting state.
     * @param {string} [options.classCheckState] The CSS class for the checked state.
     * @param {string} [options.eventBeforeSortToggled] The name of the custom event fired before a column's sorting is toggled.
     * @param {string} [options.eventAfterSortToggled] The name of the custom event fired after a column's sorting is toggled.
     * @param {string} [options.eventBeforeCheckToggled] The name of the custom event fired before a check box is toggled.
     * @param {string} [options.eventAfterCheckToggled] The name of the custom event fired after a check box is toggled.
     */


    (0, _createClass3.default)(Table, [{
      key: 'handleClick',
      value: function handleClick(event) {
        var title = (0, _eventMatches2.default)(event, this.options.selectorTitle);
        var row = (0, _eventMatches2.default)(event, this.options.selectorRow);
        var checkbox = (0, _eventMatches2.default)(event, this.options.selectorCheckbox);
        if (title) {
          this.toggleState('Sort', title);
        }
        if (row && checkbox) {
          this.toggleState('Check', row);
        }
      }
    }, {
      key: 'toggleState',
      value: function toggleState(type, element, callback) {
        var newState = !element.classList.contains(this.options['class' + type + 'State']);
        var eventStart = new CustomEvent(this.options['eventBefore' + type + 'Toggled'], {
          bubbles: true,
          cancelable: true,
          detail: { newState: newState }
        });

        // https://connect.microsoft.com/IE/feedback/details/790389/event-defaultprevented-returns-false-after-preventdefault-was-called
        if (element.dispatchEvent(eventStart)) {
          (0, _toggleClass2.default)(element, this.options['class' + type + 'State'], newState);
          // this._changeActive(item);
          element.dispatchEvent(new CustomEvent(this.options['eventAfter' + type + 'Toggled'], {
            bubbles: true,
            cancelable: true,
            detail: { newState: newState }
          }));
          if (callback) {
            callback(null, element, newState);
          }
        } else {
          var error = new Error('Toggling on table has been canceled.');
          error.canceled = true;
          error.element = element;
          error.newState = newState;
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
        var _this2 = this;

        var target = arguments.length <= 0 || arguments[0] === undefined ? document : arguments[0];
        var options = arguments[1];

        if (target.nodeType !== Node.ELEMENT_NODE && target.nodeType !== Node.DOCUMENT_NODE) {
          throw new Error('DOM document or DOM element should be given to search for and initialize this widget.');
        }
        if (target.nodeType === Node.ELEMENT_NODE && target.dataset.table !== undefined) {
          this.create(target, options);
        } else {
          var _ret = function () {
            var handler = function handler(event) {
              var element = (0, _eventMatches2.default)(event, '[data-table]');
              if (element && !_this2.components.has(element)) {
                _this2.create(element, options).handleClick(event);
              }
            };
            target.addEventListener('click', handler);
            return {
              v: {
                release: function release() {
                  return target.removeEventListener('click', handler);
                }
              }
            };
          }();

          if ((typeof _ret === 'undefined' ? 'undefined' : (0, _typeof3.default)(_ret)) === "object") return _ret.v;
        }
      }
    }]);
    return Table;
  }();

  exports.default = Table;


  /**
   * The component options.
   * @member {Object} Table#options
   * @property {string} [selectorTitle] The CSS selector to find column titles.
   * @property {string} [selectorRow] The CSS selector to find rows.
   * @property {string} [selectorCheckbox] The CSS selector to find check boxes.
   * @property {string} [classSortState] The CSS class for the sorting state.
   * @property {string} [classCheckState] The CSS class for the checked state.
   * @property {string} [eventBeforeSortToggled] The name of the custom event fired before a column's sorting is toggled.
   * @property {string} [eventAfterSortToggled] The name of the custom event fired after a column's sorting is toggled.
   * @property {string} [eventBeforeCheckToggled] The name of the custom event fired before a check box is toggled.
   * @property {string} [eventAfterCheckToggled] The name of the custom event fired after a check box is toggled.
   */

  /**
   * The map associating DOM element and data table instance.
   * @type {WeakMap}
   */
  Table.components = new _weakMap2.default();
});