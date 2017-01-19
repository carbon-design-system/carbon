(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'babel-runtime/core-js/weak-map', 'babel-runtime/core-js/object/get-prototype-of', 'babel-runtime/helpers/classCallCheck', 'babel-runtime/helpers/createClass', 'babel-runtime/helpers/possibleConstructorReturn', 'babel-runtime/helpers/get', 'babel-runtime/helpers/inherits', '../misc/mixin', '../mixins/create-component', '../mixins/init-component-by-search', '../mixins/evented-state', '../polyfills/toggle-class', '../misc/on', '../polyfills/array-from', '../polyfills/element-matches', '../polyfills/object-assign'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('babel-runtime/core-js/weak-map'), require('babel-runtime/core-js/object/get-prototype-of'), require('babel-runtime/helpers/classCallCheck'), require('babel-runtime/helpers/createClass'), require('babel-runtime/helpers/possibleConstructorReturn'), require('babel-runtime/helpers/get'), require('babel-runtime/helpers/inherits'), require('../misc/mixin'), require('../mixins/create-component'), require('../mixins/init-component-by-search'), require('../mixins/evented-state'), require('../polyfills/toggle-class'), require('../misc/on'), require('../polyfills/array-from'), require('../polyfills/element-matches'), require('../polyfills/object-assign'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.weakMap, global.getPrototypeOf, global.classCallCheck, global.createClass, global.possibleConstructorReturn, global.get, global.inherits, global.mixin, global.createComponent, global.initComponentBySearch, global.eventedState, global.toggleClass, global.on, global.arrayFrom, global.elementMatches, global.objectAssign);
    global.overflowMenu = mod.exports;
  }
})(this, function (exports, _weakMap, _getPrototypeOf, _classCallCheck2, _createClass2, _possibleConstructorReturn2, _get2, _inherits2, _mixin2, _createComponent, _initComponentBySearch, _eventedState, _toggleClass, _on) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _weakMap2 = _interopRequireDefault(_weakMap);

  var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

  var _createClass3 = _interopRequireDefault(_createClass2);

  var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

  var _get3 = _interopRequireDefault(_get2);

  var _inherits3 = _interopRequireDefault(_inherits2);

  var _mixin3 = _interopRequireDefault(_mixin2);

  var _createComponent2 = _interopRequireDefault(_createComponent);

  var _initComponentBySearch2 = _interopRequireDefault(_initComponentBySearch);

  var _eventedState2 = _interopRequireDefault(_eventedState);

  var _toggleClass2 = _interopRequireDefault(_toggleClass);

  var _on2 = _interopRequireDefault(_on);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var OverflowMenu = function (_mixin) {
    (0, _inherits3.default)(OverflowMenu, _mixin);

    function OverflowMenu(element, options) {
      (0, _classCallCheck3.default)(this, OverflowMenu);

      var _this = (0, _possibleConstructorReturn3.default)(this, (OverflowMenu.__proto__ || (0, _getPrototypeOf2.default)(OverflowMenu)).call(this, element, options));

      _this.optionMenu = _this.element.querySelector(_this.options.selectorOptionMenu);

      /**
       * The handle to release click event listener on document object.
       * @member {Handle}
       */
      _this.hDocumentClick = (0, _on2.default)(_this.element.ownerDocument, 'click', function (event) {
        _this.handleDocumentClick(event);
      });

      /**
       * The handle to release keypress event listener on document object.
       * @member {Handle}
       */
      _this.hDocumentKeyPress = (0, _on2.default)(_this.element.ownerDocument, 'keypress', function (event) {
        _this.handleKeyPress(event);
      });
      return _this;
    }

    /**
     * @param {string} state The new state.
     * @returns {boolean} `true` of the current state is different from the given new state.
     */


    (0, _createClass3.default)(OverflowMenu, [{
      key: 'shouldStateBeChanged',
      value: function shouldStateBeChanged(state) {
        return state !== (this.element.classList.contains('bx--overflow-menu--open') ? 'shown' : 'hidden');
      }
    }, {
      key: '_changeState',
      value: function _changeState(state, detail, callback) {
        (0, _toggleClass2.default)(this.optionMenu, 'bx--overflow-menu--open', state === 'shown');
        (0, _toggleClass2.default)(this.element, 'bx--overflow-menu--open', state === 'shown');
        callback();
      }
    }, {
      key: 'handleDocumentClick',
      value: function handleDocumentClick(event) {
        var isOfSelf = this.element.contains(event.target);
        var shouldBeOpen = isOfSelf && !this.element.classList.contains('bx--overflow-menu--open');
        var state = shouldBeOpen ? 'shown' : 'hidden';

        if (isOfSelf && this.element.tagName === 'A') {
          event.preventDefault();
        }

        this.changeState(state, {
          element: this.element,
          optionMenu: this.optionMenu,
          evt: event
        });
      }
    }, {
      key: 'handleKeyPress',
      value: function handleKeyPress(event) {
        var key = event.key || event.which;
        if (key === 'Enter' || key === 13) {
          var isOfSelf = this.element.contains(event.target);
          var shouldBeOpen = isOfSelf && !this.element.classList.contains('bx--overflow-menu--open');
          var state = shouldBeOpen ? 'shown' : 'hidden';

          if (isOfSelf && this.element.tagName === 'A') {
            event.preventDefault();
          }

          this.changeState(state, {
            element: this.element,
            optionMenu: this.optionMenu,
            evt: event
          });
        }
      }
    }, {
      key: 'release',
      value: function release() {
        if (this.hDocumentClick) {
          this.hDocumentClick = this.hDocumentClick.release();
        }
        if (this.hDocumentKeyPress) {
          this.hDocumentKeyPress = this.hDocumentKeyPress.release();
        }
        (0, _get3.default)(OverflowMenu.prototype.__proto__ || (0, _getPrototypeOf2.default)(OverflowMenu.prototype), 'release', this).call(this);
      }
    }]);
    return OverflowMenu;
  }((0, _mixin3.default)(_createComponent2.default, _initComponentBySearch2.default, _eventedState2.default));

  OverflowMenu.components = new _weakMap2.default();
  OverflowMenu.options = {
    selectorInit: '[data-overflow-menu]',
    selectorOptionMenu: '.bx--overflow-menu__options',
    eventBeforeShown: 'overflow-menu-beingshown',
    eventAfterShown: 'overflow-menu-shown',
    eventBeforeHidden: 'overflow-menu-beinghidden',
    eventAfterHidden: 'overflow-menu-hidden'
  };
  exports.default = OverflowMenu;
});