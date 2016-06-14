(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'babel-runtime/core-js/weak-map', 'babel-runtime/helpers/toConsumableArray', 'babel-runtime/helpers/classCallCheck', 'babel-runtime/helpers/createClass'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('babel-runtime/core-js/weak-map'), require('babel-runtime/helpers/toConsumableArray'), require('babel-runtime/helpers/classCallCheck'), require('babel-runtime/helpers/createClass'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.weakMap, global.toConsumableArray, global.classCallCheck, global.createClass);
    global.toolbars = mod.exports;
  }
})(this, function (exports, _weakMap, _toConsumableArray2, _classCallCheck2, _createClass2) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _weakMap2 = _interopRequireDefault(_weakMap);

  var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

  var _createClass3 = _interopRequireDefault(_createClass2);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var Toolbars = function () {
    /**
     * Search button in tool bar.
     * @implements Component
     * @param {HTMLElement} element The element working as an search button.
     */

    function Toolbars(element) {
      var _this = this;

      (0, _classCallCheck3.default)(this, Toolbars);

      if (!element || element.nodeType !== Node.ELEMENT_NODE) {
        throw new TypeError('DOM element should be given to initialize this widget.');
      }

      this.element = element;
      this.searchFieldNode = this.element.ownerDocument.querySelector(this.element.dataset.listIconsSearchActionTarget);

      this.constructor.components.set(this.element, this);

      this.element.addEventListener('click', function (event) {
        return _this.handleActionClick(event);
      });
    }

    /**
     * Instantiates a search button of the given element.
     * @param {HTMLElement} element The element working as a search button.
     */


    (0, _createClass3.default)(Toolbars, [{
      key: 'handleActionClick',
      value: function handleActionClick(event) {
        var searchActionNode = event.currentTarget;

        if (searchActionNode.tagName === 'A') {
          event.preventDefault();
        }

        this.element.classList.toggle('show-search');
        if (this.searchFieldNode) {
          this.searchFieldNode.classList.toggle('show-search');
          this.searchFieldNode.value = '';
        }
      }
    }, {
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

        var target = arguments.length <= 0 || arguments[0] === undefined ? document : arguments[0];

        if (target.nodeType !== Node.ELEMENT_NODE && target.nodeType !== Node.DOCUMENT_NODE) {
          throw new Error('DOM document or DOM element should be given to search for and initialize this widget.');
        }
        if (target.nodeType === Node.ELEMENT_NODE && target.dataset.listIconsSearchActionTarget !== undefined) {
          this.create(target);
        } else {
          [].concat((0, _toConsumableArray3.default)(target.querySelectorAll('[data-list-icons-search-action-target]'))).forEach(function (element) {
            return _this2.create(element);
          });
        }
      }
    }]);
    return Toolbars;
  }();

  exports.default = Toolbars;


  /**
   * The map associating DOM element and search button instance.
   * @type {WeakMap}
   */
  Toolbars.components = new _weakMap2.default();
});