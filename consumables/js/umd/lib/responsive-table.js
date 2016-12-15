(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'babel-runtime/core-js/weak-map', 'babel-runtime/helpers/toConsumableArray', 'babel-runtime/core-js/object/create', 'babel-runtime/core-js/object/assign', 'babel-runtime/helpers/classCallCheck', 'babel-runtime/helpers/createClass', '../polyfills/event-matches', '../misc/resize', '../polyfills/array-from', '../polyfills/element-matches', '../polyfills/object-assign', '../polyfills/custom-event'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('babel-runtime/core-js/weak-map'), require('babel-runtime/helpers/toConsumableArray'), require('babel-runtime/core-js/object/create'), require('babel-runtime/core-js/object/assign'), require('babel-runtime/helpers/classCallCheck'), require('babel-runtime/helpers/createClass'), require('../polyfills/event-matches'), require('../misc/resize'), require('../polyfills/array-from'), require('../polyfills/element-matches'), require('../polyfills/object-assign'), require('../polyfills/custom-event'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.weakMap, global.toConsumableArray, global.create, global.assign, global.classCallCheck, global.createClass, global.eventMatches, global.resize, global.arrayFrom, global.elementMatches, global.objectAssign, global.customEvent);
    global.responsiveTable = mod.exports;
  }
})(this, function (exports, _weakMap, _toConsumableArray2, _create, _assign, _classCallCheck2, _createClass2, _eventMatches, _resize) {
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

  var _eventMatches2 = _interopRequireDefault(_eventMatches);

  var _resize2 = _interopRequireDefault(_resize);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var ResponsiveTable = function () {
    /**
     * Responsive Table
     * @implements components
     * @param {HTMLElement} element The root element of tables
     * @param {Object} [options] the... options
     * @param {string} [options.selectorInit] selector initialization
     * @param {string} [options.selectorExpandCells] css selector for expand
     * @param {string} [options.expandableRow] css selector for expand
     * @param {string} [options.selectorParentRows] css selector for rows housing expansion
     * @param {string} [options.selectorTableBody] root css for table body
     * @param {string} [options.overflowMenu] any overflow menus
     * @param {string} [options.eventTrigger] selector for event bubble capture points
     * @param {string} [options.eventParentContainer] used find the bubble container
     */
    function ResponsiveTable(element) {
      var _this = this;

      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      (0, _classCallCheck3.default)(this, ResponsiveTable);

      _initialiseProps.call(this);

      if (!element || element.nodeType !== Node.ELEMENT_NODE) {
        throw new TypeError('Responsive Tables requires a DOM element');
      }

      this.element = element;

      this.options = (0, _assign2.default)((0, _create2.default)(this.constructor.options), options);

      this.container = element.parentNode; // requires the immediate parent to be the container
      this.expandCells = [].concat((0, _toConsumableArray3.default)(this.element.querySelectorAll(this.options.selectorExpandCells)));
      this.expandableRows = [].concat((0, _toConsumableArray3.default)(this.element.querySelectorAll(this.options.selectorExpandableRows)));
      this.parentRows = [].concat((0, _toConsumableArray3.default)(this.element.querySelectorAll(this.options.selectorParentRows)));
      this.tableBody = this.element.querySelector(this.options.selectorTableBody);

      this.zebraStripe();
      this.initExpandableRows();
      this.initOverflowMenus();

      this.element.addEventListener('click', function (evt) {
        var eventElement = (0, _eventMatches2.default)(evt, _this.options.eventTrigger);
        if (eventElement) {
          _this.emitEvent(eventElement, evt);
        }
      });

      this.constructor.components.set(this.element, this);
    }

    /**
     * Create an object to be used in event emission
     */


    /**
     * Standardize way to emit events
     */


    /**
     * Zebra stripes - done in javascript to handle expandable rows
     */


    /**
     * Find all expandable rows and remove them from the DOM
     */


    /**
     * Because tables has an overflow-x on it, we need to pop the overflow
     * options outside of the table. This appends to the body and tags a resize
     * listener to reposition when needed
     */


    /**
     * When called, finds the position of the icon supplied and positions
     * the menu relative to that
     *
     * Uses fixed because getBoundingClientRect is relative to viewport
     */


    /**
     * On trigger, insert the expandable row back in
     */


    /**
     * On trigger, flip the sort icon
     */


    /**
     * On trigger, check all checkboxes
     */


    (0, _createClass3.default)(ResponsiveTable, [{
      key: 'release',
      value: function release() {
        this.constructor.components.delete(this.element);
      }
    }], [{
      key: 'create',
      value: function create(element) {
        return this.components.get(element) || new this(element);
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
          this.create(target);
        } else {
          [].concat((0, _toConsumableArray3.default)(target.querySelectorAll(effectiveOptions.selectorInit))).forEach(function (element) {
            return _this2.create(element);
          });
        }
      }
    }]);
    return ResponsiveTable;
  }();

  ResponsiveTable.components = new _weakMap2.default();
  ResponsiveTable.eventHandlers = {
    expand: 'toggleRowExpand',
    sort: 'toggleSort',
    'select-all': 'toggleSelectAll'
  };
  ResponsiveTable.options = {
    selectorInit: '[data-responsive-table]',
    selectorExpandCells: '.bx--table-expand',
    selectorExpandableRows: '.bx--expandable-row',
    selectorParentRows: '.bx--parent-row',
    selectorTableBody: '.bx--table-body',
    selectorOverflowMenu: '[data-overflow-menu]',
    selectorCheckbox: '.bx--checkbox',
    selectorOverflowMenuIcon: '.bx--overflow-menu__icon',
    selectorOverflowMenuOptions: '.bx--overflow-menu__options',
    classParentRowEven: 'bx--parent-row--even',
    classExpandableRow: 'bx--expandable-row',
    classExpandableRowEven: 'bx--expandable-row--even',
    classExpandableRowHidden: 'bx--expandable-row--hidden',
    classTableSortAscending: 'bx--table-sort--ascending',
    eventTrigger: '[data-event]',
    eventParentContainer: '[data-parent-row]'
  };

  var _initialiseProps = function _initialiseProps() {
    var _this3 = this;

    this.getEventDetails = function (element, data, evt) {
      var event = data.event;

      var label = data.label ? data.label : '';
      var previousValue = data.previousValue ? data.previousValue : '';
      var initialEvt = evt;

      return {
        element: element,
        event: event,
        label: label,
        previousValue: previousValue,
        initialEvt: initialEvt
      };
    };

    this.emitEvent = function (element, evt) {
      var detail = _this3.getEventDetails(element, element.dataset, evt);

      var eventBefore = new CustomEvent('before' + detail.event, {
        bubbles: true,
        cancelable: true,
        detail: detail
      });

      var eventAfter = new CustomEvent('' + detail.event, {
        bubbles: true,
        cancelable: true,
        detail: detail
      });

      var canceled = !_this3.element.dispatchEvent(eventBefore);

      if (!canceled) {
        _this3[_this3.constructor.eventHandlers[detail.event]](detail);
        _this3.element.dispatchEvent(eventAfter);
      }
    };

    this.zebraStripe = function () {
      _this3.parentRows.forEach(function (item, index) {
        if (index % 2 === 0) {
          item.classList.add(_this3.options.classParentRowEven);
          if (item.nextElementSibling && item.nextElementSibling.classList.contains(_this3.options.classExpandableRow)) {
            item.nextElementSibling.classList.add(_this3.options.classExpandableRowEven);
          }
        }
      });
    };

    this.initExpandableRows = function () {
      _this3.expandableRows.forEach(function (item) {
        item.classList.remove(_this3.options.classExpandableRowHidden);
        _this3.tableBody.removeChild(item);
      });
    };

    this.initOverflowMenus = function () {
      if (!_this3.element.querySelector(_this3.options.selectorOverflowMenu)) {
        return false;
      }

      var menuMap = [].concat((0, _toConsumableArray3.default)(_this3.element.querySelectorAll(_this3.options.selectorOverflowMenu))).map(function (menu) {
        return {
          element: menu,
          optionMenu: menu.querySelector(_this3.options.selectorOverflowMenuOptions)
        };
      });

      _resize2.default.add(function () {
        menuMap.forEach(function (menu) {
          _this3.placeOverflow({
            detail: menu
          });
        });
      });

      menuMap.forEach(function (menu) {
        document.body.appendChild(menu.optionMenu);
      });

      _this3.element.addEventListener('overflow-menu-shown', _this3.placeOverflow);
    };

    this.placeOverflow = function (evt) {
      var _evt$detail = evt.detail,
          element = _evt$detail.element,
          optionMenu = _evt$detail.optionMenu;


      var icon = element.querySelector(_this3.options.selectorOverflowMenuIcon);
      var position = icon.getBoundingClientRect();

      optionMenu.style.position = 'absolute';
      optionMenu.style.top = position.top + element.ownerDocument.defaultView.scrollY + 'px';
      optionMenu.style.left = position.right + 'px';
      optionMenu.style.right = 'auto';
    };

    this.toggleRowExpand = function (detail) {
      var element = detail.element;
      var parent = (0, _eventMatches2.default)(detail.initialEvt, _this3.options.eventParentContainer);

      var index = _this3.expandCells.indexOf(element);
      if (element.dataset.previousValue === undefined || element.dataset.previousValue === 'expanded') {
        element.dataset.previousValue = 'collapsed';
        _this3.tableBody.insertBefore(_this3.expandableRows[index], _this3.parentRows[index + 1]);
      } else {
        _this3.tableBody.removeChild(parent.nextElementSibling);
        element.dataset.previousValue = 'expanded';
      }
    };

    this.toggleSort = function (detail) {
      var element = detail.element,
          previousValue = detail.previousValue;


      if (!previousValue || previousValue === 'descending') {
        element.dataset.previousValue = 'ascending';
        element.classList.add(_this3.options.classTableSortAscending);
      } else {
        element.dataset.previousValue = 'descending';
        element.classList.remove(_this3.options.classTableSortAscending);
      }
    };

    this.toggleSelectAll = function (detail) {
      var element = detail.element,
          previousValue = detail.previousValue;

      var inputs = [].concat((0, _toConsumableArray3.default)(_this3.element.querySelectorAll(_this3.options.selectorCheckbox)));
      if (!previousValue || previousValue === 'toggled') {
        inputs.forEach(function (item) {
          return item.checked = true;
        });
        element.dataset.previousValue = 'off';
      } else {
        inputs.forEach(function (item) {
          return item.checked = false;
        });
        element.dataset.previousValue = 'toggled';
      }
    };
  };

  exports.default = ResponsiveTable;
});