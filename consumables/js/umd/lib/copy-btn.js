(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'babel-runtime/core-js/weak-map', 'babel-runtime/core-js/object/get-prototype-of', 'babel-runtime/helpers/classCallCheck', 'babel-runtime/helpers/createClass', 'babel-runtime/helpers/possibleConstructorReturn', 'babel-runtime/helpers/inherits', '../misc/mixin', '../mixins/create-component', '../mixins/init-component-by-search', '../polyfills/array-from', '../polyfills/custom-event', '../polyfills/element-matches', '../polyfills/object-assign'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('babel-runtime/core-js/weak-map'), require('babel-runtime/core-js/object/get-prototype-of'), require('babel-runtime/helpers/classCallCheck'), require('babel-runtime/helpers/createClass'), require('babel-runtime/helpers/possibleConstructorReturn'), require('babel-runtime/helpers/inherits'), require('../misc/mixin'), require('../mixins/create-component'), require('../mixins/init-component-by-search'), require('../polyfills/array-from'), require('../polyfills/custom-event'), require('../polyfills/element-matches'), require('../polyfills/object-assign'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.weakMap, global.getPrototypeOf, global.classCallCheck, global.createClass, global.possibleConstructorReturn, global.inherits, global.mixin, global.createComponent, global.initComponentBySearch, global.arrayFrom, global.customEvent, global.elementMatches, global.objectAssign);
    global.copyBtn = mod.exports;
  }
})(this, function (exports, _weakMap, _getPrototypeOf, _classCallCheck2, _createClass2, _possibleConstructorReturn2, _inherits2, _mixin2, _createComponent, _initComponentBySearch) {
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

  var _initComponentBySearch2 = _interopRequireDefault(_initComponentBySearch);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var CopyBtn = function (_mixin) {
    (0, _inherits3.default)(CopyBtn, _mixin);

    /**
     * CopyBtn UI.
     * @extends CreateComponent
     * @extends InitComponentBySearch
     * @param {HTMLElement} element The element working as a copy button UI.
     */
    function CopyBtn(element, options) {
      (0, _classCallCheck3.default)(this, CopyBtn);

      var _this = (0, _possibleConstructorReturn3.default)(this, (CopyBtn.__proto__ || (0, _getPrototypeOf2.default)(CopyBtn)).call(this, element, options));

      _this.element.addEventListener('click', function () {
        return _this.handleClick();
      });
      return _this;
    }

    /**
     * Show the feedback tooltip on click. Hide the feedback tooltip after specified timeout value.
     */


    (0, _createClass3.default)(CopyBtn, [{
      key: 'handleClick',
      value: function handleClick() {
        var _this2 = this;

        var feedback = this.element.querySelector(this.options.feedbackTooltip);
        feedback.classList.add(this.options.classShowFeedback);
        setTimeout(function () {
          feedback.classList.remove(_this2.options.classShowFeedback);
        }, this.options.timeoutValue);
      }
    }]);
    return CopyBtn;
  }((0, _mixin3.default)(_createComponent2.default, _initComponentBySearch2.default));

  CopyBtn.components = new _weakMap2.default();
  CopyBtn.options = {
    selectorInit: '[data-copy-btn]',
    feedbackTooltip: '[data-feedback]',
    classShowFeedback: 'bx--btn--copy__feedback--displayed',
    timeoutValue: 2000
  };
  exports.default = CopyBtn;
});