(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'babel-runtime/core-js/weak-map', 'babel-runtime/core-js/object/get-prototype-of', 'babel-runtime/helpers/classCallCheck', 'babel-runtime/helpers/createClass', 'babel-runtime/helpers/possibleConstructorReturn', 'babel-runtime/helpers/inherits', '../misc/mixin', '../mixins/create-component', '../mixins/init-component-by-event', '../polyfills/element-matches', '../polyfills/object-assign'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('babel-runtime/core-js/weak-map'), require('babel-runtime/core-js/object/get-prototype-of'), require('babel-runtime/helpers/classCallCheck'), require('babel-runtime/helpers/createClass'), require('babel-runtime/helpers/possibleConstructorReturn'), require('babel-runtime/helpers/inherits'), require('../misc/mixin'), require('../mixins/create-component'), require('../mixins/init-component-by-event'), require('../polyfills/element-matches'), require('../polyfills/object-assign'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.weakMap, global.getPrototypeOf, global.classCallCheck, global.createClass, global.possibleConstructorReturn, global.inherits, global.mixin, global.createComponent, global.initComponentByEvent, global.elementMatches, global.objectAssign);
    global.fab = mod.exports;
  }
})(this, function (exports, _weakMap, _getPrototypeOf, _classCallCheck2, _createClass2, _possibleConstructorReturn2, _inherits2, _mixin2, _createComponent, _initComponentByEvent) {
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

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var FabButton = function (_mixin) {
    (0, _inherits3.default)(FabButton, _mixin);

    /**
     * Floating action button.
     * @extends CreateComponent
     * @extends InitComponentByEvent
     * @param {HTMLElement} element The element working as a floting action button.
     */
    function FabButton(element) {
      (0, _classCallCheck3.default)(this, FabButton);

      var _this = (0, _possibleConstructorReturn3.default)(this, (FabButton.__proto__ || (0, _getPrototypeOf2.default)(FabButton)).call(this, element));

      element.addEventListener('click', function (event) {
        _this.toggle(event);
      });
      return _this;
    }

    /**
     * A method called when this widget is created upon clicking.
     * @param {Event} event The event triggering the creation.
     */


    (0, _createClass3.default)(FabButton, [{
      key: 'createdByEvent',
      value: function createdByEvent(event) {
        this.toggle(event);
      }
    }, {
      key: 'toggle',
      value: function toggle(event) {
        if (this.element.tagName === 'A') {
          event.preventDefault();
        }

        if (this.element.dataset.state === 'closed') {
          this.element.dataset.state = 'open';
        } else {
          this.element.dataset.state = 'closed';
        }
      }
    }], [{
      key: 'create',
      value: function create(element) {
        return this.components.get(element) || new this(element);
      }
    }]);
    return FabButton;
  }((0, _mixin3.default)(_createComponent2.default, _initComponentByEvent2.default));

  FabButton.components = new _weakMap2.default();
  FabButton.options = {
    selectorInit: '[data-fab]',
    initEventNames: ['click']
  };
  exports.default = FabButton;
});