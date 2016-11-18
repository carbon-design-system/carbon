(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'babel-runtime/core-js/weak-map', 'babel-runtime/helpers/toConsumableArray', 'babel-runtime/core-js/object/create', 'babel-runtime/core-js/object/assign', 'babel-runtime/helpers/classCallCheck', 'babel-runtime/helpers/createClass', '../polyfills/element-matches', '../polyfills/object-assign', '../polyfills/array-from'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('babel-runtime/core-js/weak-map'), require('babel-runtime/helpers/toConsumableArray'), require('babel-runtime/core-js/object/create'), require('babel-runtime/core-js/object/assign'), require('babel-runtime/helpers/classCallCheck'), require('babel-runtime/helpers/createClass'), require('../polyfills/element-matches'), require('../polyfills/object-assign'), require('../polyfills/array-from'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.weakMap, global.toConsumableArray, global.create, global.assign, global.classCallCheck, global.createClass, global.elementMatches, global.objectAssign, global.arrayFrom);
    global.fileUploader = mod.exports;
  }
})(this, function (exports, _weakMap, _toConsumableArray2, _create, _assign, _classCallCheck2, _createClass2) {
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

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var FileUploader = function () {
    /**
     * File uploader.
     * @implements Component
     * @param {HTMLElement} element The element working as a file uploader.
     * @param {Object} [options] The component options.
     * @param {string} [options.labelSelector] The CSS selector to find the label for the file name.
     */
    function FileUploader(element) {
      var _this = this;

      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      (0, _classCallCheck3.default)(this, FileUploader);

      if (!element || element.nodeType !== Node.ELEMENT_NODE) {
        throw new TypeError('DOM element should be given to initialize this widget.');
      }

      this.element = element;

      this.options = (0, _assign2.default)((0, _create2.default)(this.constructor.options), options);

      this.labelNode = this.element.nextElementSibling || this.element.ownerDocument.querySelector('.bx--file__label' + this.options.selectorLabel);

      this.constructor.components.set(this.element, this);

      element.addEventListener('change', function (event) {
        return _this.updateLabel(event);
      });
    }

    /**
     * Instantiates file uploader of the given element.
     * @param {HTMLElement} element The element working as a file uploader.
     * @param {Object} [options] The component options.
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

        var target = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document;
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        var effectiveOptions = (0, _assign2.default)((0, _create2.default)(this.options), options);
        if (target.nodeType !== Node.ELEMENT_NODE && target.nodeType !== Node.DOCUMENT_NODE) {
          throw new Error('DOM document or DOM element should be given to search for and initialize this widget.');
        }
        if (target.nodeType === Node.ELEMENT_NODE && target.matches(effectiveOptions.selectorInit)) {
          this.create(target, effectiveOptions);
        } else {
          [].concat((0, _toConsumableArray3.default)(target.querySelectorAll(effectiveOptions.selectorInit))).forEach(function (element) {
            return _this2.create(element, effectiveOptions);
          });
        }
      }
    }]);
    return FileUploader;
  }();

  FileUploader.components = new _weakMap2.default();
  FileUploader.options = {
    selectorInit: '[data-file-uploader]',
    selectorLabel: '[data-file-appearance]'
  };
  exports.default = FileUploader;
});