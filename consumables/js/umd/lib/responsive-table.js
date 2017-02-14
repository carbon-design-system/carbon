(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'babel-runtime/helpers/toConsumableArray', 'babel-runtime/core-js/weak-map', 'babel-runtime/core-js/object/get-prototype-of', 'babel-runtime/helpers/classCallCheck', 'babel-runtime/helpers/createClass', 'babel-runtime/helpers/possibleConstructorReturn', 'babel-runtime/helpers/inherits', '../misc/mixin', '../mixins/create-component', '../mixins/init-component-by-search', '../mixins/evented-state', '../polyfills/event-matches', '../misc/resize', '../polyfills/array-from', '../polyfills/element-matches', '../polyfills/object-assign', '../polyfills/custom-event'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('babel-runtime/helpers/toConsumableArray'), require('babel-runtime/core-js/weak-map'), require('babel-runtime/core-js/object/get-prototype-of'), require('babel-runtime/helpers/classCallCheck'), require('babel-runtime/helpers/createClass'), require('babel-runtime/helpers/possibleConstructorReturn'), require('babel-runtime/helpers/inherits'), require('../misc/mixin'), require('../mixins/create-component'), require('../mixins/init-component-by-search'), require('../mixins/evented-state'), require('../polyfills/event-matches'), require('../misc/resize'), require('../polyfills/array-from'), require('../polyfills/element-matches'), require('../polyfills/object-assign'), require('../polyfills/custom-event'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.toConsumableArray, global.weakMap, global.getPrototypeOf, global.classCallCheck, global.createClass, global.possibleConstructorReturn, global.inherits, global.mixin, global.createComponent, global.initComponentBySearch, global.eventedState, global.eventMatches, global.resize, global.arrayFrom, global.elementMatches, global.objectAssign, global.customEvent);
    global.responsiveTable = mod.exports;
  }
})(this, function (exports, _toConsumableArray2, _weakMap, _getPrototypeOf, _classCallCheck2, _createClass2, _possibleConstructorReturn2, _inherits2, _mixin2, _createComponent, _initComponentBySearch, _eventedState, _eventMatches, _resize) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

  var _weakMap2 = _interopRequireDefault(_weakMap);

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

  var _resize2 = _interopRequireDefault(_resize);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var ResponsiveTable = function (_mixin) {
    (0, _inherits3.default)(ResponsiveTable, _mixin);

    /**
     * Responsive Table
     * @extends CreateComponent
     * @extends InitComponentBySearch
     * @extends EventedState
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
    function ResponsiveTable(element, options) {
      (0, _classCallCheck3.default)(this, ResponsiveTable);

      var _this = (0, _possibleConstructorReturn3.default)(this, (ResponsiveTable.__proto__ || (0, _getPrototypeOf2.default)(ResponsiveTable)).call(this, element, options));

      _initialiseProps.call(_this);

      _this.container = element.parentNode; // requires the immediate parent to be the container
      _this.tableBody = _this.element.querySelector(_this.options.selectorTableBody);
      _this.expandCells = [];
      _this.expandableRows = [];
      _this.parentRows = [];
      _this.overflowInitialized = false;

      _this.refreshRows();

      _this.element.addEventListener('click', function (evt) {
        var eventElement = (0, _eventMatches2.default)(evt, _this.options.eventTrigger);
        if (eventElement) {
          _this.toggleState(eventElement, evt);
        }
      });
      return _this;
    }

    /**
     * Toggles the given state.
     * @private
     * @param {Object} detail The detail of the event trigging this action.
     * @param {Function} callback Callback called when change in state completes.
     */


    (0, _createClass3.default)(ResponsiveTable, [{
      key: '_changeState',
      value: function _changeState(detail, callback) {
        this[this.constructor.eventHandlers[detail.group]](detail);
        callback();
      }
    }]);
    return ResponsiveTable;
  }((0, _mixin3.default)(_createComponent2.default, _initComponentBySearch2.default, _eventedState2.default));

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
    eventBeforeExpand: 'responsive-table-beforetoggleexpand',
    eventAfterExpand: 'responsive-table-aftertoggleexpand',
    eventBeforeSort: 'responsive-table-beforetogglesort',
    eventAfterSort: 'responsive-table-aftertogglesort',
    eventBeforeSelectAll: 'responsive-table-beforetoggleselectall',
    eventAfterSelectAll: 'responsive-table-aftertoggleselectall',
    eventTrigger: '[data-event]',
    eventParentContainer: '[data-parent-row]'
  };

  var _initialiseProps = function _initialiseProps() {
    var _this2 = this;

    this.toggleState = function (element, evt) {
      var data = element.dataset;
      var label = data.label ? data.label : '';
      var previousValue = data.previousValue ? data.previousValue : '';
      var initialEvt = evt;
      _this2.changeState({
        group: data.event,
        element: element,
        label: label,
        previousValue: previousValue,
        initialEvt: initialEvt
      });
    };

    this.zebraStripe = function (parentRows) {
      parentRows.forEach(function (item, index) {
        if (index % 2 === 0) {
          item.classList.add(_this2.options.classParentRowEven);
          if (item.nextElementSibling && item.nextElementSibling.classList.contains(_this2.options.classExpandableRow)) {
            item.nextElementSibling.classList.add(_this2.options.classExpandableRowEven);
          }
        }
      });
    };

    this.initExpandableRows = function (expandableRows) {
      expandableRows.forEach(function (item) {
        item.classList.remove(_this2.options.classExpandableRowHidden);
        _this2.tableBody.removeChild(item);
      });
    };

    this.initOverflowMenus = function (parentRows) {
      if (!_this2.element.querySelector(_this2.options.selectorOverflowMenu)) {
        return false;
      }

      var menuMap = parentRows.map(function (row) {
        var menu = row.querySelector(_this2.options.selectorOverflowMenu);

        return {
          element: menu,
          optionMenu: menu.querySelector(_this2.options.selectorOverflowMenuOptions)
        };
      });

      _resize2.default.add(function () {
        menuMap.forEach(function (menu) {
          _this2.placeOverflow({
            detail: menu
          });
        });
      });

      menuMap.forEach(function (menu) {
        document.body.appendChild(menu.optionMenu);
      });

      if (!_this2.overflowInitialized) {
        _this2.element.addEventListener('overflow-menu-shown', _this2.placeOverflow);
        _this2.overflowInitialized = true;
      }

      return true;
    };

    this.placeOverflow = function (evt) {
      var MAGIC = {
        TOP: 5,
        RIGHT: 38
      };

      var _evt$detail = evt.detail,
          element = _evt$detail.element,
          optionMenu = _evt$detail.optionMenu;


      var icon = element.querySelector(_this2.options.selectorOverflowMenuIcon);
      var elementHeight = element.offsetHeight;
      var position = icon.getBoundingClientRect();
      var centerIcon = position.left + (position.right - position.left) / 2;
      var topCalc = position.bottom + elementHeight + element.ownerDocument.defaultView.scrollY - MAGIC.TOP + 'px';
      var rightCalc = document.documentElement.clientWidth - centerIcon - MAGIC.RIGHT + 'px';

      _this2.element.ownerDocument.defaultView.requestAnimationFrame(function () {
        optionMenu.style.position = 'absolute';
        optionMenu.style.top = topCalc;
        optionMenu.style.left = 'auto';
        optionMenu.style.right = rightCalc;
        optionMenu.style.margin = 0;
      });
    };

    this.toggleRowExpand = function (detail) {
      var element = detail.element;
      var parent = (0, _eventMatches2.default)(detail.initialEvt, _this2.options.eventParentContainer);

      var index = _this2.expandCells.indexOf(element);
      if (element.dataset.previousValue === undefined || element.dataset.previousValue === 'expanded') {
        element.dataset.previousValue = 'collapsed';
        _this2.tableBody.insertBefore(_this2.expandableRows[index], _this2.parentRows[index + 1]);
      } else {
        _this2.tableBody.removeChild(parent.nextElementSibling);
        element.dataset.previousValue = 'expanded';
      }
    };

    this.toggleSort = function (detail) {
      var element = detail.element,
          previousValue = detail.previousValue;


      if (!previousValue || previousValue === 'descending') {
        element.dataset.previousValue = 'ascending';
        element.classList.add(_this2.options.classTableSortAscending);
      } else {
        element.dataset.previousValue = 'descending';
        element.classList.remove(_this2.options.classTableSortAscending);
      }
    };

    this.toggleSelectAll = function (detail) {
      var element = detail.element,
          previousValue = detail.previousValue;

      var inputs = [].concat((0, _toConsumableArray3.default)(_this2.element.querySelectorAll(_this2.options.selectorCheckbox)));
      if (!previousValue || previousValue === 'toggled') {
        inputs.forEach(function (item) {
          item.checked = true;
        }); // eslint-disable-line no-param-reassign
        element.dataset.previousValue = 'off';
      } else {
        inputs.forEach(function (item) {
          item.checked = false;
        }); // eslint-disable-line no-param-reassign
        element.dataset.previousValue = 'toggled';
      }
    };

    this.refreshRows = function () {
      var newExpandCells = [].concat((0, _toConsumableArray3.default)(_this2.element.querySelectorAll(_this2.options.selectorExpandCells)));
      var newExpandableRows = [].concat((0, _toConsumableArray3.default)(_this2.element.querySelectorAll(_this2.options.selectorExpandableRows)));
      var newParentRows = [].concat((0, _toConsumableArray3.default)(_this2.element.querySelectorAll(_this2.options.selectorParentRows)));

      // check if this is a refresh or the first time
      if (_this2.parentRows.length > 0) {
        var diffParentRows = newParentRows.filter(function (newRow) {
          return !_this2.parentRows.some(function (oldRow) {
            return oldRow === newRow;
          });
        });

        // check if there are expandable rows
        if (newExpandableRows.length > 0) {
          var diffExpandableRows = diffParentRows.map(function (newRow) {
            return newRow.nextElementSibling;
          });
          var mergedExpandableRows = [].concat((0, _toConsumableArray3.default)(_this2.expandableRows), (0, _toConsumableArray3.default)(diffExpandableRows));
          _this2.initExpandableRows(diffExpandableRows);
          _this2.expandableRows = mergedExpandableRows;
        }

        _this2.zebraStripe(newParentRows);
        _this2.initOverflowMenus(diffParentRows);
      } else {
        _this2.zebraStripe(newParentRows);

        if (newExpandableRows.length > 0) {
          _this2.initExpandableRows(newExpandableRows);
          _this2.expandableRows = newExpandableRows;
        }

        _this2.initOverflowMenus(newParentRows);
      }

      _this2.expandCells = newExpandCells;
      _this2.parentRows = newParentRows;
    };
  };

  exports.default = ResponsiveTable;
});