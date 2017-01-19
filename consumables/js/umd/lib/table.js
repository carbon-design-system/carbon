(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'babel-runtime/core-js/weak-map', 'babel-runtime/core-js/object/get-prototype-of', 'babel-runtime/helpers/classCallCheck', 'babel-runtime/helpers/createClass', 'babel-runtime/helpers/possibleConstructorReturn', 'babel-runtime/helpers/inherits', '../misc/mixin', '../mixins/create-component', '../mixins/init-component-by-event', '../polyfills/event-matches', '../polyfills/toggle-class', '../polyfills/custom-event', '../polyfills/element-matches', '../polyfills/object-assign'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('babel-runtime/core-js/weak-map'), require('babel-runtime/core-js/object/get-prototype-of'), require('babel-runtime/helpers/classCallCheck'), require('babel-runtime/helpers/createClass'), require('babel-runtime/helpers/possibleConstructorReturn'), require('babel-runtime/helpers/inherits'), require('../misc/mixin'), require('../mixins/create-component'), require('../mixins/init-component-by-event'), require('../polyfills/event-matches'), require('../polyfills/toggle-class'), require('../polyfills/custom-event'), require('../polyfills/element-matches'), require('../polyfills/object-assign'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.weakMap, global.getPrototypeOf, global.classCallCheck, global.createClass, global.possibleConstructorReturn, global.inherits, global.mixin, global.createComponent, global.initComponentByEvent, global.eventMatches, global.toggleClass, global.customEvent, global.elementMatches, global.objectAssign);
    global.table = mod.exports;
  }
})(this, function (exports, _weakMap, _getPrototypeOf, _classCallCheck2, _createClass2, _possibleConstructorReturn2, _inherits2, _mixin2, _createComponent, _initComponentByEvent, _eventMatches, _toggleClass) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _weakMap2 = _interopRequireDefault(_weakMap);

  var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

  var _createClass3 = _interopRequireDefault(_createClass2);

  var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

  var _inherits3 = _interopRequireDefault(_inherits2);

  var _mixin3 = _interopRequireDefault(_mixin2);

  var _createComponent2 = _interopRequireDefault(_createComponent);

  var _initComponentByEvent2 = _interopRequireDefault(_initComponentByEvent);

  var _eventMatches2 = _interopRequireDefault(_eventMatches);

  var _toggleClass2 = _interopRequireDefault(_toggleClass);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var Table = function (_mixin) {
    (0, _inherits3.default)(Table, _mixin);

    /**
     * Data table.
     * @extends CreateComponent
     * @extends InitComponentBySearch
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
    function Table(element, options) {
      (0, _classCallCheck3.default)(this, Table);

      var _this = (0, _possibleConstructorReturn3.default)(this, (Table.__proto__ || (0, _getPrototypeOf2.default)(Table)).call(this, element, options));

      _this.element.addEventListener('click', function (event) {
        _this.handleClick(event);
      });
      return _this;
    }

    /**
     * A method called when this widget is created upon clicking.
     * @param {Event} event The event triggering the creation.
     */


    (0, _createClass3.default)(Table, [{
      key: 'createdByEvent',
      value: function createdByEvent(event) {
        this.handleClick(event);
      }
    }, {
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

        // eslint-disable-next-line max-len
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
    }]);
    return Table;
  }((0, _mixin3.default)(_createComponent2.default, _initComponentByEvent2.default));

  Table.components = new _weakMap2.default();
  Table.options = {
    selectorInit: '[data-table]',
    selectorTitle: '.bx--table__column-title',
    selectorRow: '.bx--table__row',
    selectorCheckbox: '.bx--checkbox',
    classSortState: 'bx--table__column-title--rotated',
    classCheckState: 'bx--table__row--checked',
    eventBeforeSortToggled: 'table-sort-beingtoggled',
    eventAfterSortToggled: 'table-sort-toggled',
    eventBeforeCheckToggled: 'table-check-beingtoggled',
    eventAfterCheckToggled: 'table-check-toggled',
    initEventNames: ['click']
  };
  exports.default = Table;
});