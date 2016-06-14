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
    global.fileUploader = mod.exports;
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

      var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
      (0, _classCallCheck3.default)(this, FileUploader);

      if (!element || element.nodeType !== Node.ELEMENT_NODE) {
        throw new TypeError('DOM element should be given to initialize this widget.');
      }

      this.element = element;

      var labelSelector = options.labelSelector || element.dataset.label;
      this.labelNode = element.parentNode.querySelector(labelSelector) || element.nextElementSibling;

      this.constructor.components.set(this.element, this);

      element.addEventListener('change', function (event) {
        return _this.updateLabel(event);
      });
    }

    /**
     * Instantiates file uploader of the given element.
     * @param {HTMLElement} element The element working as a file uploader.
     * @param {Object} [options] The component options.
     * @param {string} [options.labelSelector] The CSS selector to find the label for the file name.
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

        var target = arguments.length <= 0 || arguments[0] === undefined ? document : arguments[0];
        var options = arguments[1];

        if (target.nodeType !== Node.ELEMENT_NODE && target.nodeType !== Node.DOCUMENT_NODE) {
          throw new Error('DOM document or DOM element should be given to search for and initialize this widget.');
        }
        if (target.nodeType === Node.ELEMENT_NODE && target.dataset.fileInput !== undefined) {
          this.create(target, options);
        } else {
          [].concat((0, _toConsumableArray3.default)(target.querySelectorAll('[data-file-uploader]'))).forEach(function (element) {
            return _this2.create(element, options);
          });
        }
      }
    }]);
    return FileUploader;
  }();

  exports.default = FileUploader;


  /**
   * The component options.
   * @member {Object} FileUploader#options
   * @property {string} [labelSelector] The CSS selector to find the label for the file name.
   */

  /**
   * The map associating DOM element and file uploader instance.
   * @type {WeakMap}
   */
  FileUploader.components = new _weakMap2.default();
});