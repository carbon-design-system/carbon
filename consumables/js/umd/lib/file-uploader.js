(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'babel-runtime/core-js/weak-map', 'babel-runtime/core-js/object/get-prototype-of', 'babel-runtime/helpers/classCallCheck', 'babel-runtime/helpers/createClass', 'babel-runtime/helpers/possibleConstructorReturn', 'babel-runtime/helpers/inherits', '../misc/mixin', '../mixins/create-component', '../mixins/init-component-by-search', '../polyfills/element-matches', '../polyfills/object-assign', '../polyfills/array-from'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('babel-runtime/core-js/weak-map'), require('babel-runtime/core-js/object/get-prototype-of'), require('babel-runtime/helpers/classCallCheck'), require('babel-runtime/helpers/createClass'), require('babel-runtime/helpers/possibleConstructorReturn'), require('babel-runtime/helpers/inherits'), require('../misc/mixin'), require('../mixins/create-component'), require('../mixins/init-component-by-search'), require('../polyfills/element-matches'), require('../polyfills/object-assign'), require('../polyfills/array-from'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.weakMap, global.getPrototypeOf, global.classCallCheck, global.createClass, global.possibleConstructorReturn, global.inherits, global.mixin, global.createComponent, global.initComponentBySearch, global.elementMatches, global.objectAssign, global.arrayFrom);
    global.fileUploader = mod.exports;
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

  var FileUploader = function (_mixin) {
    (0, _inherits3.default)(FileUploader, _mixin);

    /**
     * File uploader.
     * @extends CreateComponent
     * @extends InitComponentBySearch
     * @param {HTMLElement} element The element working as a file uploader.
     * @param {Object} [options] The component options.
     * @param {string} [options.labelSelector] The CSS selector to find the label for the file name.
     */
    function FileUploader(element, options) {
      (0, _classCallCheck3.default)(this, FileUploader);

      var _this = (0, _possibleConstructorReturn3.default)(this, (FileUploader.__proto__ || (0, _getPrototypeOf2.default)(FileUploader)).call(this, element, options));

      _this.labelNode = _this.element.nextElementSibling || _this.element.ownerDocument.querySelector('.bx--file__label' + _this.options.selectorLabel);

      element.addEventListener('change', function (event) {
        _this.updateLabel(event);
      });
      return _this;
    }

    /**
     * Updates the label for the file name upon file selection.
     * @param {Event} event The event triggering this method.
     */


    (0, _createClass3.default)(FileUploader, [{
      key: 'updateLabel',
      value: function updateLabel(event) {
        var fileName = '';
        var element = this.element;

        if (element.files && element.files.length > 1) {
          fileName = (element.dataset.multipleCaption || '').replace('{count}', element.files.length);
        } else {
          fileName = event.target.value.split('\\').pop();
        }

        if (fileName) {
          this.labelNode.textContent = fileName;
        }
      }
    }]);
    return FileUploader;
  }((0, _mixin3.default)(_createComponent2.default, _initComponentBySearch2.default));

  FileUploader.components = new _weakMap2.default();
  FileUploader.options = {
    selectorInit: '[data-file-uploader]',
    selectorLabel: '[data-file-appearance]'
  };
  exports.default = FileUploader;
});