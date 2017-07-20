var BluemixComponents =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.InlineLeftNav = exports.Accordion = exports.Pagination = exports.ProfileSwitcher = exports.DetailPageHeader = exports.Table = exports.ResponsiveTable = exports.NumberInput = exports.Card = exports.Dropdown = exports.Loading = exports.Toolbars = exports.LeftNav = exports.HeaderNav = exports.Modal = exports.OverflowMenu = exports.Tab = exports.ContentSwitcher = exports.FileUploader = exports.FabButton = exports.initCheckbox = exports.settings = undefined;
	
	var _checkbox = __webpack_require__(1);
	
	var _checkbox2 = _interopRequireDefault(_checkbox);
	
	var _fileUploader = __webpack_require__(2);
	
	var _fileUploader2 = _interopRequireDefault(_fileUploader);
	
	var _fab = __webpack_require__(9);
	
	var _fab2 = _interopRequireDefault(_fab);
	
	var _contentSwitcher = __webpack_require__(13);
	
	var _contentSwitcher2 = _interopRequireDefault(_contentSwitcher);
	
	var _tabs = __webpack_require__(17);
	
	var _tabs2 = _interopRequireDefault(_tabs);
	
	var _overflowMenu = __webpack_require__(19);
	
	var _overflowMenu2 = _interopRequireDefault(_overflowMenu);
	
	var _modals = __webpack_require__(20);
	
	var _modals2 = _interopRequireDefault(_modals);
	
	var _header = __webpack_require__(22);
	
	var _header2 = _interopRequireDefault(_header);
	
	var _toolbars = __webpack_require__(23);
	
	var _toolbars2 = _interopRequireDefault(_toolbars);
	
	var _loading = __webpack_require__(24);
	
	var _loading2 = _interopRequireDefault(_loading);
	
	var _dropdown = __webpack_require__(25);
	
	var _dropdown2 = _interopRequireDefault(_dropdown);
	
	var _card = __webpack_require__(26);
	
	var _card2 = _interopRequireDefault(_card);
	
	var _numberInput = __webpack_require__(27);
	
	var _numberInput2 = _interopRequireDefault(_numberInput);
	
	var _responsiveTable = __webpack_require__(28);
	
	var _responsiveTable2 = _interopRequireDefault(_responsiveTable);
	
	var _table = __webpack_require__(30);
	
	var _table2 = _interopRequireDefault(_table);
	
	var _detailPageHeader = __webpack_require__(31);
	
	var _detailPageHeader2 = _interopRequireDefault(_detailPageHeader);
	
	var _leftNav = __webpack_require__(33);
	
	var _leftNav2 = _interopRequireDefault(_leftNav);
	
	var _inlineLeftNav = __webpack_require__(34);
	
	var _inlineLeftNav2 = _interopRequireDefault(_inlineLeftNav);
	
	var _profileSwitcher = __webpack_require__(35);
	
	var _profileSwitcher2 = _interopRequireDefault(_profileSwitcher);
	
	var _pagination = __webpack_require__(36);
	
	var _pagination2 = _interopRequireDefault(_pagination);
	
	var _searchWithOptions = __webpack_require__(37);
	
	var _searchWithOptions2 = _interopRequireDefault(_searchWithOptions);
	
	var _accordion = __webpack_require__(38);
	
	var _accordion2 = _interopRequireDefault(_accordion);
	
	var _copyBtn = __webpack_require__(39);
	
	var _copyBtn2 = _interopRequireDefault(_copyBtn);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var settings = {};
	
	/**
	 * This module is used for the following purposes:
	 * 1. Export ES2015 classes as modules (used with base-elements and components)
	 * 2. Build an ES5-compatible files for prototyping.
	 *    See /path/to/bluemix-components/dist/dist-demo.html for details.
	 * @exports BluemixComponents
	 * @example <caption>Consume ES2015 modules from this file using import (Usage pattern 1.)</caption>
	 * import { Fab, FileUploader } from '/path/to/your/project/node_modules/@console/bluemix-components';
	 */
	// ====================//
	// Imports and Exports //
	// ====================//
	
	// Base Elements & Components
	// -------------
	// - JavaScript classes for use with components and base-elements.
	// - The following statements import classes from actual locations to
	//   be consumed from this file instead of their actual locations.
	exports.settings = settings;
	exports.initCheckbox = _checkbox2.default;
	exports.FabButton = _fab2.default;
	exports.FileUploader = _fileUploader2.default;
	exports.ContentSwitcher = _contentSwitcher2.default;
	exports.Tab = _tabs2.default;
	exports.OverflowMenu = _overflowMenu2.default;
	exports.Modal = _modals2.default;
	exports.HeaderNav = _header2.default;
	exports.LeftNav = _leftNav2.default;
	exports.Toolbars = _toolbars2.default;
	exports.Loading = _loading2.default;
	exports.Dropdown = _dropdown2.default;
	exports.Card = _card2.default;
	exports.NumberInput = _numberInput2.default;
	exports.ResponsiveTable = _responsiveTable2.default;
	exports.Table = _table2.default;
	exports.DetailPageHeader = _detailPageHeader2.default;
	exports.ProfileSwitcher = _profileSwitcher2.default;
	exports.Pagination = _pagination2.default;
	exports.Accordion = _accordion2.default;
	exports.InlineLeftNav = _inlineLeftNav2.default;
	
	/**
	 * Instantiates components automatically
	 * by searching for elements with `data-component-name` (e.g. `data-loading`) attribute
	 * or upon DOM events (e.g. clicking) on such elements.
	 * See each components' static `.init()` methods for details.
	 *
	 * HeaderNav is not instantiated - see PR https://github.ibm.com/Bluemix/bluemix-components/pull/1318
	 *
	 * @private
	 */
	
	var init = function init() {
	  if (!settings.disableAutoInit) {
	    (0, _checkbox2.default)();
	    _fab2.default.init();
	    _fileUploader2.default.init();
	    _contentSwitcher2.default.init();
	    _tabs2.default.init();
	    _overflowMenu2.default.init();
	    _modals2.default.init();
	    _toolbars2.default.init();
	    _loading2.default.init();
	    _dropdown2.default.init();
	    _card2.default.init();
	    _numberInput2.default.init();
	    _responsiveTable2.default.init();
	    _table2.default.init();
	    _detailPageHeader2.default.init();
	    _leftNav2.default.init();
	    _inlineLeftNav2.default.init();
	    _profileSwitcher2.default.init();
	    _pagination2.default.init();
	    _searchWithOptions2.default.init();
	    _accordion2.default.init();
	    _copyBtn2.default.init();
	  }
	};
	
	if (document.readyState === 'loading') {
	  document.addEventListener('DOMContentLoaded', init);
	} else {
	  // DOMContentLoaded has been fired already
	  // Let consumer have chance to see if it wants automatic instantiation disabled, and then run automatic instantiation otherwise
	  setTimeout(init, 0);
	}

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	function listener(event) {
	  var element = event.target;
	  if (element.tagName === 'INPUT' && element.type === 'checkbox' && element.hasAttribute('checked') !== element.checked) {
	    if (element.checked) {
	      element.setAttribute('checked', '');
	    } else {
	      element.removeAttribute('checked');
	    }
	  }
	}
	
	/**
	 * Watches for change in checkbox in the given document and force changing `checked` attribute
	 * so that DOM mutation observer in {@link https://www.npmjs.com/package/svgxuse svgxuse} is triggered.
	 * @param {Document} [doc=document] The document object to watch for.
	 * @returns {Handle} The handle to release the event listener.
	 */
	function initCheckbox() {
	  var doc = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document;
	
	  doc.removeEventListener('change', listener); // In case this function has been called earlier
	  doc.addEventListener('change', listener);
	  return {
	    release: function release() {
	      doc.removeEventListener('change', listener);
	      return null;
	    }
	  };
	}
	
	exports.default = initCheckbox;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _mixin2 = __webpack_require__(3);
	
	var _mixin3 = _interopRequireDefault(_mixin2);
	
	var _createComponent = __webpack_require__(4);
	
	var _createComponent2 = _interopRequireDefault(_createComponent);
	
	var _initComponentBySearch = __webpack_require__(5);
	
	var _initComponentBySearch2 = _interopRequireDefault(_initComponentBySearch);
	
	__webpack_require__(6);
	
	__webpack_require__(7);
	
	__webpack_require__(8);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var FileUploader = function (_mixin) {
	  _inherits(FileUploader, _mixin);
	
	  /**
	   * File uploader.
	   * @extends CreateComponent
	   * @extends InitComponentBySearch
	   * @param {HTMLElement} element The element working as a file uploader.
	   * @param {Object} [options] The component options.
	   * @param {string} [options.labelSelector] The CSS selector to find the label for the file name.
	   */
	  function FileUploader(element, options) {
	    _classCallCheck(this, FileUploader);
	
	    var _this = _possibleConstructorReturn(this, (FileUploader.__proto__ || Object.getPrototypeOf(FileUploader)).call(this, element, options));
	
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
	
	
	  _createClass(FileUploader, [{
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
	
	    /**
	     * The map associating DOM element and file uploader instance.
	     * @member FileUploader.components
	     * @type {WeakMap}
	     */
	
	
	    /**
	     * The component options.
	     * If `options` is specified in the constructor,
	     * {@linkcode FileUploader.create .create()}, or {@linkcode FileUploader.init .init()},
	     * properties in this object are overriden for the instance being create and how {@linkcode FileUploader.init .init()} works.
	     * @member FileUploader.options
	     * @type {Object}
	     * @property {string} selectorInit The CSS selector to find file uploaders.
	     */
	
	  }]);
	
	  return FileUploader;
	}((0, _mixin3.default)(_createComponent2.default, _initComponentBySearch2.default));
	
	FileUploader.components = new WeakMap();
	FileUploader.options = {
	  selectorInit: '[data-file-uploader]',
	  selectorLabel: '[data-file-appearance]'
	};
	exports.default = FileUploader;

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = mixin;
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/**
	 * @function mixinfn
	 * @param {Class} ToMix The class to mix.
	 * @returns {Class} The class mixed-in with the given ToMix class.
	 */
	
	/**
	 * @param {...mixinfn} mixinfns The functions generating mix-ins.
	 * @returns {Class} The class generated with the given mix-ins.
	 */
	function mixin() {
	  for (var _len = arguments.length, mixinfns = Array(_len), _key = 0; _key < _len; _key++) {
	    mixinfns[_key] = arguments[_key];
	  }
	
	  return mixinfns.reduce(function (Class, mixinfn) {
	    return mixinfn(Class);
	  }, function () {
	    function _class() {
	      _classCallCheck(this, _class);
	    }
	
	    return _class;
	  }());
	}

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	exports.default = function (ToMix) {
	  var CreateComponent = function (_ToMix) {
	    _inherits(CreateComponent, _ToMix);
	
	    /**
	     * Mix-in class to manage lifecycle of component.
	     * The constructor sets up this component's effective options,
	     * and registers this component't instance associated to an element.
	     * @implements Handle
	     * @param {HTMLElement} element The element working as this component.
	     * @param {Object} [options] The component options.
	     */
	    function CreateComponent(element) {
	      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	
	      _classCallCheck(this, CreateComponent);
	
	      var _this = _possibleConstructorReturn(this, (CreateComponent.__proto__ || Object.getPrototypeOf(CreateComponent)).call(this, element, options));
	
	      if (!element || element.nodeType !== Node.ELEMENT_NODE) {
	        throw new TypeError('DOM element should be given to initialize this widget.');
	      }
	
	      _this.element = element;
	      _this.options = Object.assign(Object.create(_this.constructor.options), options);
	      _this.constructor.components.set(_this.element, _this);
	      return _this;
	    }
	
	    /**
	     * Instantiates this component of the given element.
	     * @param {HTMLElement} element The element.
	     */
	
	
	    _createClass(CreateComponent, [{
	      key: 'release',
	
	
	      /**
	       * Releases this component's instance from the associated element.
	       */
	      value: function release() {
	        this.constructor.components.delete(this.element);
	        return null;
	      }
	    }], [{
	      key: 'create',
	      value: function create(element, options) {
	        return this.components.get(element) || new this(element, options);
	      }
	    }]);
	
	    return CreateComponent;
	  }(ToMix);
	
	  return CreateComponent;
	};
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	exports.default = function (ToMix) {
	  /**
	   * Mix-in class to instantiate components by searching for their root elements.
	   * @class InitComponentBySearch
	   */
	  var InitComponentBySearch = function (_ToMix) {
	    _inherits(InitComponentBySearch, _ToMix);
	
	    function InitComponentBySearch() {
	      _classCallCheck(this, InitComponentBySearch);
	
	      return _possibleConstructorReturn(this, (InitComponentBySearch.__proto__ || Object.getPrototypeOf(InitComponentBySearch)).apply(this, arguments));
	    }
	
	    _createClass(InitComponentBySearch, null, [{
	      key: 'init',
	
	      /**
	       * Instantiates component in the given node.
	       * If the given element indicates that it's an component of this class, instantiates it.
	       * Otherwise, instantiates components by searching for components in the given node.
	       * @param {Node} target The DOM node to instantiate components in. Should be a document or an element.
	       * @param {Object} [options] The component options.
	       * @param {boolean} [options.selectorInit] The CSS selector to find components.
	       */
	      value: function init() {
	        var _this2 = this;
	
	        var target = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document;
	        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	
	        var effectiveOptions = Object.assign(Object.create(this.options), options);
	        if (target.nodeType !== Node.ELEMENT_NODE && target.nodeType !== Node.DOCUMENT_NODE) {
	          throw new Error('DOM document or DOM element should be given to search for and initialize this widget.');
	        }
	        if (target.nodeType === Node.ELEMENT_NODE && target.matches(effectiveOptions.selectorInit)) {
	          this.create(target, options);
	        } else {
	          [].concat(_toConsumableArray(target.querySelectorAll(effectiveOptions.selectorInit))).forEach(function (element) {
	            return _this2.create(element, options);
	          });
	        }
	      }
	    }]);
	
	    return InitComponentBySearch;
	  }(ToMix);
	
	  return InitComponentBySearch;
	};
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/***/ },
/* 6 */
/***/ function(module, exports) {

	'use strict';
	
	var matchesFuncName = ['matches', 'webkitMatchesSelector', 'msMatchesSelector'].filter(function (name) {
	  return typeof Element.prototype[name] === 'function';
	})[0];
	
	if (matchesFuncName !== 'matches') {
	  Element.prototype.matches = Element.prototype[matchesFuncName];
	}

/***/ },
/* 7 */
/***/ function(module, exports) {

	"use strict";
	
	Object.assign = Object.assign || function assignObject(inDst) {
	  if (inDst == null) {
	    // eslint-disable-line eqeqeq
	    // Throw if the given destination is null or undefined
	    throw new TypeError("Can't convert to object: " + inDst);
	  }
	
	  var dst = Object(inDst);
	
	  for (var _len = arguments.length, srcs = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	    srcs[_key - 1] = arguments[_key];
	  }
	
	  srcs.forEach(function (inSrc) {
	    var src = Object(inSrc);
	    Object.keys(src).forEach(function (prop) {
	      dst[prop] = src[prop];
	    });
	  });
	
	  return dst;
	};

/***/ },
/* 8 */
/***/ function(module, exports) {

	"use strict";
	
	Array.from = Array.from || function fromArray(a) {
	  return Array.prototype.slice.call(a);
	};

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _mixin2 = __webpack_require__(3);
	
	var _mixin3 = _interopRequireDefault(_mixin2);
	
	var _createComponent = __webpack_require__(4);
	
	var _createComponent2 = _interopRequireDefault(_createComponent);
	
	var _initComponentByEvent = __webpack_require__(10);
	
	var _initComponentByEvent2 = _interopRequireDefault(_initComponentByEvent);
	
	__webpack_require__(6);
	
	__webpack_require__(7);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var FabButton = function (_mixin) {
	  _inherits(FabButton, _mixin);
	
	  /**
	   * Floating action button.
	   * @extends CreateComponent
	   * @extends InitComponentByEvent
	   * @param {HTMLElement} element The element working as a floting action button.
	   */
	  function FabButton(element) {
	    _classCallCheck(this, FabButton);
	
	    var _this = _possibleConstructorReturn(this, (FabButton.__proto__ || Object.getPrototypeOf(FabButton)).call(this, element));
	
	    element.addEventListener('click', function (event) {
	      _this.toggle(event);
	    });
	    return _this;
	  }
	
	  /**
	   * A method called when this widget is created upon clicking.
	   * @param {Event} event The event triggering the creation.
	   */
	
	
	  _createClass(FabButton, [{
	    key: 'createdByEvent',
	    value: function createdByEvent(event) {
	      this.toggle(event);
	    }
	
	    /**
	     * Toggles this floating action button.
	     * @param {Event} event The event triggering this method.
	     */
	
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
	
	    /**
	     * Instantiates floating action button of the given element.
	     * @param {HTMLElement} element The element.
	     */
	
	  }], [{
	    key: 'create',
	    value: function create(element) {
	      return this.components.get(element) || new this(element);
	    }
	
	    /**
	     * The map associating DOM element and floating action button instance.
	     * @member FabButton.components
	     * @type {WeakMap}
	     */
	
	
	    /**
	     * The component options.
	     * If `options` is specified in the constructor, {@linkcode FabButton.create .create()}, or {@linkcode FabButton.init .init()},
	     * properties in this object are overriden for the instance being create and how {@linkcode FabButton.init .init()} works.
	     * @member FabButton.options
	     * @type {Object}
	     * @property {string} selectorInit The CSS selector to find floating action buttons.
	     */
	
	  }]);
	
	  return FabButton;
	}((0, _mixin3.default)(_createComponent2.default, _initComponentByEvent2.default));
	
	FabButton.components = new WeakMap();
	FabButton.options = {
	  selectorInit: '[data-fab]',
	  initEventNames: ['click']
	};
	exports.default = FabButton;

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	exports.default = function (ToMix) {
	  /**
	   * Mix-in class to instantiate components upon events.
	   * @class InitComponentByEvent
	   */
	  var InitComponentByEvent = function (_ToMix) {
	    _inherits(InitComponentByEvent, _ToMix);
	
	    function InitComponentByEvent() {
	      _classCallCheck(this, InitComponentByEvent);
	
	      return _possibleConstructorReturn(this, (InitComponentByEvent.__proto__ || Object.getPrototypeOf(InitComponentByEvent)).apply(this, arguments));
	    }
	
	    _createClass(InitComponentByEvent, null, [{
	      key: 'init',
	
	      /**
	       * Instantiates this component in the given element.
	       * If the given element indicates that it's an component of this class, instantiates it.
	       * Otherwise, instantiates this component by clicking on this component in the given node.
	       * @param {Node} target The DOM node to instantiate this component in. Should be a document or an element.
	       * @param {Object} [options] The component options.
	       * @param {string} [options.selectorInit] The CSS selector to find this component.
	       * @returns {Handle} The handle to remove the event listener to handle clicking.
	       */
	      value: function init() {
	        var _this2 = this;
	
	        var target = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document;
	        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	
	        var effectiveOptions = Object.assign(Object.create(this.options), options);
	        if (target.nodeType !== Node.ELEMENT_NODE && target.nodeType !== Node.DOCUMENT_NODE) {
	          throw new Error('DOM document or DOM element should be given to search for and initialize this widget.');
	        }
	        if (target.nodeType === Node.ELEMENT_NODE && target.matches(effectiveOptions.selectorInit)) {
	          this.create(target, options);
	        } else {
	          var handles = effectiveOptions.initEventNames.map(function (name) {
	            return (0, _on2.default)(target, name, function (event) {
	              var element = (0, _eventMatches2.default)(event, effectiveOptions.selectorInit);
	              if (element && !_this2.components.has(element)) {
	                var component = _this2.create(element, options);
	                if (typeof component.createdByEvent === 'function') {
	                  component.createdByEvent(event);
	                }
	              }
	            });
	          });
	          return {
	            release: function release() {
	              for (var handle = handles.pop(); handle; handle = handles.pop()) {
	                handle.release();
	              }
	            }
	          };
	        }
	      }
	    }]);
	
	    return InitComponentByEvent;
	  }(ToMix);
	
	  return InitComponentByEvent;
	};
	
	var _eventMatches = __webpack_require__(11);
	
	var _eventMatches2 = _interopRequireDefault(_eventMatches);
	
	var _on = __webpack_require__(12);
	
	var _on2 = _interopRequireDefault(_on);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = eventMatches;
	
	__webpack_require__(6);
	
	function eventMatches(event, selector) {
	  // <svg> in IE does not have `Element#msMatchesSelector()` (that should be copied to `Element#matches()` by the polyfill).
	  // Also a weird behavior is seen in IE where DOM tree seems broken when `event.target` is on <svg>.
	  // Therefore this function simply returns `undefined` when `event.target` is on <svg>.
	  if (typeof event.target.matches === 'function') {
	    if (event.target.matches(selector)) {
	      // If event target itself matches the given selector, return it
	      return event.target;
	    } else if (event.target.matches(selector + ' *')) {
	      // If event target is a child node of a DOM element that matches the given selector,
	      // find the DOM element by going up the DOM tree
	      for (var traverse = event.target; traverse && traverse !== event.currentTarget; traverse = traverse.parentNode) {
	        if (traverse.matches(selector)) {
	          return traverse;
	        }
	      }
	    }
	  }
	  return null;
	}

/***/ },
/* 12 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = on;
	function on(element) {
	  for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	    args[_key - 1] = arguments[_key];
	  }
	
	  element.addEventListener.apply(element, args);
	  return {
	    release: function release() {
	      element.removeEventListener.apply(element, args);
	      return null;
	    }
	  };
	}

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _mixin2 = __webpack_require__(3);
	
	var _mixin3 = _interopRequireDefault(_mixin2);
	
	var _createComponent = __webpack_require__(4);
	
	var _createComponent2 = _interopRequireDefault(_createComponent);
	
	var _initComponentBySearch = __webpack_require__(5);
	
	var _initComponentBySearch2 = _interopRequireDefault(_initComponentBySearch);
	
	var _eventedState = __webpack_require__(14);
	
	var _eventedState2 = _interopRequireDefault(_eventedState);
	
	var _eventMatches = __webpack_require__(11);
	
	var _eventMatches2 = _interopRequireDefault(_eventMatches);
	
	__webpack_require__(8);
	
	__webpack_require__(15);
	
	__webpack_require__(6);
	
	__webpack_require__(7);
	
	var _toggleClass = __webpack_require__(16);
	
	var _toggleClass2 = _interopRequireDefault(_toggleClass);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var ContentSwitcher = function (_mixin) {
	  _inherits(ContentSwitcher, _mixin);
	
	  /**
	   * Set of content switcher buttons.
	   * @extends CreateComponent
	   * @extends InitComponentBySearch
	   * @extends EventedState
	   * @param {HTMLElement} element The element working as a set of content switcher buttons.
	   * @param {Object} [options] The component options.
	   * @param {string} [options.selectorButton] The CSS selector to find switcher buttons.
	   * @param {string} [options.selectorButtonSelected] The CSS selector to find the selected switcher button.
	   * @param {string} [options.classActive] The CSS class for switcher button's selected state.
	   * @param {string} [options.eventBeforeSelected]
	   *   The name of the custom event fired before a switcher button is selected.
	   *   Cancellation of this event stops selection of content switcher button.
	   * @param {string} [options.eventAfterSelected] The name of the custom event fired after a switcher button is selected.
	   */
	  function ContentSwitcher(element, options) {
	    _classCallCheck(this, ContentSwitcher);
	
	    var _this = _possibleConstructorReturn(this, (ContentSwitcher.__proto__ || Object.getPrototypeOf(ContentSwitcher)).call(this, element, options));
	
	    _this.element.addEventListener('click', function (event) {
	      _this.handleClick(event);
	    });
	
	    [].concat(_toConsumableArray(element.querySelectorAll('input'))).forEach(function (input) {
	      if (input.checked) _this._changeActive(input);
	    });
	    return _this;
	  }
	
	  /**
	   * Handles click on content switcher button set.
	   * If the click is on a content switcher button, activates it.
	   * @param {Event} event The event triggering this method.
	   */
	
	
	  _createClass(ContentSwitcher, [{
	    key: 'handleClick',
	    value: function handleClick(event) {
	      var button = (0, _eventMatches2.default)(event, this.options.selectorButton);
	
	      if (button) {
	        this.changeState({
	          group: 'selected',
	          item: button,
	          launchingEvent: event
	        });
	      }
	    }
	
	    /**
	     * Internal method of {@linkcode ContentSwitcher#setActive .setActive()}, to select a content switcher button.
	     * @private
	     * @param {Object} detail The detail of the event trigging this action.
	     * @param {HTMLElement} detail.item The button to be selected.
	     * @param {Function} callback Callback called when change in state completes.
	     */
	
	  }, {
	    key: '_changeState',
	    value: function _changeState(detail, callback) {
	      var _this2 = this;
	
	      var item = detail.item;
	      // `options.selectorLink` is not defined in this class itself, code here primary is for inherited classes
	      var itemLink = item.querySelector(this.options.selectorLink);
	      if (itemLink) {
	        [].concat(_toConsumableArray(this.element.querySelectorAll(this.options.selectorLink))).forEach(function (link) {
	          if (link !== itemLink) {
	            link.setAttribute('aria-selected', 'false');
	          }
	        });
	        itemLink.setAttribute('aria-selected', 'true');
	      }
	
	      var selectorButtons = [].concat(_toConsumableArray(this.element.querySelectorAll(this.options.selectorButton)));
	
	      selectorButtons.forEach(function (button) {
	        if (button !== item) {
	          (0, _toggleClass2.default)(button, _this2.options.classActive, false);
	          [].concat(_toConsumableArray(button.ownerDocument.querySelectorAll(button.dataset.target))).forEach(function (element) {
	            return element.setAttribute('hidden', '');
	          });
	        }
	      });
	
	      (0, _toggleClass2.default)(item, this.options.classActive, true);
	      [].concat(_toConsumableArray(item.ownerDocument.querySelectorAll(item.dataset.target))).forEach(function (element) {
	        return element.removeAttribute('hidden');
	      });
	
	      callback();
	    }
	
	    /**
	     * Selects a content switcher button.
	     * If the selected button has `data-target` attribute, DOM elements it points to as a CSS selector will be shown.
	     * DOM elements associated with unselected buttons in the same way will be hidden.
	     * @param {HTMLElement} item The button to be selected.
	     * @param {ChangeState~callback} callback The callback called once selection is finished or is canceled.
	     */
	
	  }, {
	    key: 'setActive',
	    value: function setActive(item, callback) {
	      this.changeState({
	        group: 'selected',
	        item: item
	      }, function (error) {
	        if (error) {
	          callback(Object.assign(error, { item: item }));
	        } else {
	          callback(null, item);
	        }
	      });
	    }
	
	    /**
	     * The map associating DOM element and content switcher set instance.
	     * @member ContentSwitcher.components
	     * @type {WeakMap}
	     */
	
	
	    /**
	     * The component options.
	     * If `options` is specified in the constructor,
	     * {@linkcode ContentSwitcher.create .create()}, or {@linkcode ContentSwitcher.init .init()},
	     * properties in this object are overriden for the instance being create and how {@linkcode ContentSwitcher.init .init()} works.
	     * @member ContentSwitcher.options
	     * @type {Object}
	     * @property {string} selectorInit The CSS selector to find content switcher button set.
	     * @property {string} [selectorButton] The CSS selector to find switcher buttons.
	     * @property {string} [selectorButtonSelected] The CSS selector to find the selected switcher button.
	     * @property {string} [classActive] The CSS class for switcher button's selected state.
	     * @property {string} [eventBeforeSelected]
	     *   The name of the custom event fired before a switcher button is selected.
	     *   Cancellation of this event stops selection of content switcher button.
	     * @property {string} [eventAfterSelected] The name of the custom event fired after a switcher button is selected.
	     */
	
	  }]);
	
	  return ContentSwitcher;
	}((0, _mixin3.default)(_createComponent2.default, _initComponentBySearch2.default, _eventedState2.default));
	
	ContentSwitcher.components = new WeakMap();
	ContentSwitcher.options = {
	  selectorInit: '[data-content-switcher]',
	  selectorButton: 'input[type="radio"], .bx--content-switcher__btn',
	  selectorButtonSelected: 'input[type="radio"].bx--content-switcher--selected',
	  classActive: 'bx--content-switcher--selected',
	  eventBeforeSelected: 'content-switcher-beingselected',
	  eventAfterSelected: 'content-switcher-selected'
	};
	exports.default = ContentSwitcher;

/***/ },
/* 14 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	exports.default = function (ToMix) {
	  /**
	   * Mix-in class to manage events associated with states.
	   * @class EventedState
	   */
	  var EventedState = function (_ToMix) {
	    _inherits(EventedState, _ToMix);
	
	    function EventedState() {
	      _classCallCheck(this, EventedState);
	
	      return _possibleConstructorReturn(this, (EventedState.__proto__ || Object.getPrototypeOf(EventedState)).apply(this, arguments));
	    }
	
	    _createClass(EventedState, [{
	      key: '_changeState',
	
	      /**
	       * The internal implementation for {@link EventedState#changeState `.changeState()`}, performing actual change in state.
	       * @param {string} [state] The new state. Can be an omitted, which means toggling.
	       * @param {Object} [detail]
	       *   The object that should be put to event details that is fired before/after changing state.
	       *   Can have a `group` property, which specifies what state to be changed.
	       * @param {EventedState~changeStateCallback} callback The callback called once changing state is finished or is canceled.
	       * @private
	       */
	      value: function _changeState() {
	        throw new Error('_changeState() should be overriden to perform actual change in state.');
	      }
	
	      /**
	       * Changes the state of this component.
	       * @param {string} [state] The new state. Can be an omitted, which means toggling.
	       * @param {Object} [detail]
	       *   The object that should be put to event details that is fired before/after changing state.
	       *   Can have a `group` property, which specifies what state to be changed.
	       * @param {EventedState~changeStateCallback} [callback] The callback called once changing state is finished or is canceled.
	       */
	
	    }, {
	      key: 'changeState',
	      value: function changeState() {
	        var _this2 = this;
	
	        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	          args[_key] = arguments[_key];
	        }
	
	        var state = typeof args[0] === 'string' ? args.shift() : undefined;
	        var detail = Object(args[0]) === args[0] && typeof args[0] !== 'function' ? args.shift() : undefined;
	        var callback = typeof args[0] === 'function' ? args.shift() : undefined;
	
	        if (typeof this.shouldStateBeChanged === 'function' && !this.shouldStateBeChanged(state, detail)) {
	          if (callback) {
	            callback(null, true);
	          }
	          return;
	        }
	
	        var data = {
	          group: detail && detail.group,
	          state: state
	        };
	
	        var eventNameSuffix = [data.group, state].filter(Boolean).join('-').split('-') // Group or state may contain hyphen
	        .map(function (item) {
	          return item[0].toUpperCase() + item.substr(1);
	        }).join('');
	
	        var eventStart = new CustomEvent(this.options['eventBefore' + eventNameSuffix], {
	          bubbles: true,
	          cancelable: true,
	          detail: detail
	        });
	
	        var canceled = !this.element.dispatchEvent(eventStart);
	
	        if (canceled) {
	          if (callback) {
	            var error = new Error('Changing state (' + JSON.stringify(data) + ') has been canceled.');
	            error.canceled = true;
	            callback(error);
	          }
	        } else {
	          var changeStateArgs = [state, detail].filter(Boolean);
	          this._changeState.apply(this, _toConsumableArray(changeStateArgs).concat([function () {
	            _this2.element.dispatchEvent(new CustomEvent(_this2.options['eventAfter' + eventNameSuffix], {
	              bubbles: true,
	              cancelable: true,
	              detail: detail
	            }));
	            if (callback) {
	              callback();
	            }
	          }]));
	        }
	      }
	
	      /**
	       * Tests if change in state should happen or not.
	       * Classes inheriting {@link EventedState `EventedState`} should override this function.
	       * @function EventedState#shouldStateBeChanged
	       * @param {string} [state] The new state. Can be an omitted, which means toggling.
	       * @param {Object} [detail]
	       *   The object that should be put to event details that is fired before/after changing state.
	       *   Can have a `group` property, which specifies what state to be changed.
	       * @returns {boolean}
	       *   `false` if change in state shouldn't happen, e.g. when the given new state is the same as the current one.
	       */
	
	    }]);
	
	    return EventedState;
	  }(ToMix);
	
	  /**
	   * The callback called once changing state is finished or is canceled.
	   * @callback EventedState~changeStateCallback
	   * @param {Error} error
	   *   An error object with `true` in its `canceled` property if changing state is canceled.
	   *   Cancellation happens if the handler of a custom event, that is fired before changing state happens,
	   *   calls `.preventDefault()` against the event.
	   * @param {boolean} keptState
	   *   `true` if the call to {@link EventedState#changeState `.changeState()`} didn't cause actual change in state.
	   */
	
	  return EventedState;
	};
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/***/ },
/* 15 */
/***/ function(module, exports) {

	'use strict';
	
	var missingNativeCustomEvent = function () {
	  try {
	    new CustomEvent('test-event'); // eslint-disable-line no-new
	  } catch (error) {
	    return true;
	  }
	  return false;
	}();
	if (missingNativeCustomEvent) {
	  window.CustomEvent = function CustomEvent(type) {
	    var init = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	
	    var event = document.createEvent('HTMLEvents');
	    event.initEvent(type, init.bubbles, init.cancelable);
	    if (init.detail) {
	      event.detail = init.detail;
	    }
	    return event;
	  };
	}

/***/ },
/* 16 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = toggleClass;
	function toggleClass(element, name, add) {
	  if (element.classList.contains(name) === !add) {
	    element.classList[add ? 'add' : 'remove'](name);
	  }
	}

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	var _eventMatches = __webpack_require__(11);
	
	var _eventMatches2 = _interopRequireDefault(_eventMatches);
	
	__webpack_require__(8);
	
	__webpack_require__(6);
	
	__webpack_require__(18);
	
	__webpack_require__(7);
	
	var _contentSwitcher = __webpack_require__(13);
	
	var _contentSwitcher2 = _interopRequireDefault(_contentSwitcher);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Tab = function (_ContentSwitcher) {
	  _inherits(Tab, _ContentSwitcher);
	
	  /**
	   * Container of tabs.
	   * @extends ContentSwitcher
	   * @param {HTMLElement} element The element working as a container of tabs.
	   * @param {Object} [options] The component options.
	   * @param {string} [options.selectorMenu] The CSS selector to find the drop down menu used in narrow mode.
	   * @param {string} [options.selectorTrigger] The CSS selector to find the button to open the drop down menu used in narrow mode.
	   * @param {string} [options.selectorTriggerText]
	   *   The CSS selector to find the element used in narrow mode showing the selected tab item.
	   * @param {string} [options.selectorButton] The CSS selector to find tab containers.
	   * @param {string} [options.selectorButtonSelected] The CSS selector to find the selected tab.
	   * @param {string} [options.selectorLink] The CSS selector to find the links in tabs.
	   * @param {string} [options.classActive] The CSS class for tab's selected state.
	   * @param {string} [options.classHidden] The CSS class for the drop down menu's hidden state used in narrow mode.
	   * @param {string} [options.eventBeforeSelected]
	   *   The name of the custom event fired before a tab is selected.
	   *   Cancellation of this event stops selection of tab.
	   * @param {string} [options.eventAfterSelected] The name of the custom event fired after a tab is selected.
	   */
	  function Tab(element, options) {
	    _classCallCheck(this, Tab);
	
	    var _this = _possibleConstructorReturn(this, (Tab.__proto__ || Object.getPrototypeOf(Tab)).call(this, element, options));
	
	    _this.element.addEventListener('keydown', function (event) {
	      _this.handleKeyDown(event);
	    });
	
	    var selected = _this.element.querySelector(_this.options.selectorButtonSelected);
	    if (selected) {
	      _this.updateTriggerText(selected);
	    }
	    return _this;
	  }
	
	  /**
	   * Internal method of {@linkcode Tab#setActive .setActive()}, to select a tab item.
	   * @private
	   * @param {Object} detail The detail of the event trigging this action.
	   * @param {HTMLElement} detail.item The tab item to be selected.
	   * @param {Function} callback Callback called when change in state completes.
	   */
	
	
	  _createClass(Tab, [{
	    key: '_changeState',
	    value: function _changeState(detail, callback) {
	      var _this2 = this;
	
	      _get(Tab.prototype.__proto__ || Object.getPrototypeOf(Tab.prototype), '_changeState', this).call(this, detail, function (error) {
	        for (var _len = arguments.length, data = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	          data[_key - 1] = arguments[_key];
	        }
	
	        if (!error) {
	          _this2.updateTriggerText(detail.item);
	        }
	        callback.apply(undefined, [error].concat(data));
	      });
	    }
	
	    /**
	     * Handles click on tab container.
	     * * If the click is on a tab, activates it.
	     * * If the click is on the button to open the drop down menu, does so.
	     * @param {Event} event The event triggering this method.
	     */
	
	  }, {
	    key: 'handleClick',
	    value: function handleClick(event) {
	      _get(Tab.prototype.__proto__ || Object.getPrototypeOf(Tab.prototype), 'handleClick', this).call(this, event);
	      var button = (0, _eventMatches2.default)(event, this.options.selectorButton);
	      var trigger = (0, _eventMatches2.default)(event, this.options.selectorTrigger);
	      if (button) {
	        _get(Tab.prototype.__proto__ || Object.getPrototypeOf(Tab.prototype), 'handleClick', this).call(this, event);
	        this.updateMenuState();
	      }
	      if (trigger) {
	        this.updateMenuState();
	      }
	    }
	
	    /**
	     * Handles arrow keys on tab container.
	     * * Up/Left keys are used to go to previous tab.
	     * * Down/Right keys are used to go to next tab.
	     * @param {Event} event The event triggering this method.
	     */
	
	  }, {
	    key: 'handleKeyDown',
	    value: function handleKeyDown(event) {
	      var _this3 = this;
	
	      var triggerNode = this.element.querySelector(this.options.selectorTrigger);
	      if (triggerNode && triggerNode.offsetParent) {
	        return;
	      }
	
	      var direction = {
	        Left: -1,
	        Right: 1,
	        ArrowLeft: -1,
	        ArrowRight: 1
	      }[event.key || event.keyIdentifier];
	
	      if (direction) {
	        var buttons = [].concat(_toConsumableArray(this.element.querySelectorAll(this.options.selectorButton)));
	        var button = this.element.querySelector(this.options.selectorButtonSelected);
	        var nextIndex = Math.max(buttons.indexOf(button) + direction, -1 /* For `button` not found in `buttons` */);
	        var nextIndexLooped = nextIndex >= 0 && nextIndex < buttons.length ? nextIndex : nextIndex - Math.sign(nextIndex) * buttons.length;
	        this.setActive(buttons[nextIndexLooped], function (error, item) {
	          if (item) {
	            var link = item.querySelector(_this3.options.selectorLink);
	            if (link) {
	              link.focus();
	            }
	          }
	        });
	        event.preventDefault();
	      }
	    }
	
	    /**
	     * Shows/hides the drop down menu used in narrow mode.
	     */
	
	  }, {
	    key: 'updateMenuState',
	    value: function updateMenuState() {
	      this.element.querySelector(this.options.selectorMenu).classList.toggle(this.options.classHidden);
	    }
	
	    /**
	     * Updates the text indicating the currently selected tab item.
	     * @param {HTMLElement} target The newly selected tab item.
	     */
	
	  }, {
	    key: 'updateTriggerText',
	    value: function updateTriggerText(target) {
	      this.element.querySelector(this.options.selectorTriggerText).textContent = target.textContent;
	    }
	
	    /**
	     * The map associating DOM element and tab container instance.
	     * @member Tab.components
	     * @type {WeakMap}
	     */
	
	
	    /**
	     * The component options.
	     * If `options` is specified in the constructor, {@linkcode ContentSwitcher.create .create()}, or {@linkcode Tab.init .init()},
	     * properties in this object are overriden for the instance being create and how {@linkcode Tab.init .init()} works.
	     * @member Tab.options
	     * @type {Object}
	     * @property {string} selectorInit The CSS selector to find tab containers.
	     * @property {string} [selectorMenu] The CSS selector to find the drop down menu used in narrow mode.
	     * @property {string} [selectorTrigger] The CSS selector to find the button to open the drop down menu used in narrow mode.
	     * @property {string} [selectorTriggerText]
	     *   The CSS selector to find the element used in narrow mode showing the selected tab item.
	     * @property {string} [selectorButton] The CSS selector to find tab containers.
	     * @property {string} [selectorButtonSelected] The CSS selector to find the selected tab.
	     * @property {string} [selectorLink] The CSS selector to find the links in tabs.
	     * @property {string} [classActive] The CSS class for tab's selected state.
	     * @property {string} [classHidden] The CSS class for the drop down menu's hidden state used in narrow mode.
	     * @property {string} [eventBeforeSelected]
	     *   The name of the custom event fired before a tab is selected.
	     *   Cancellation of this event stops selection of tab.
	     * @property {string} [eventAfterSelected] The name of the custom event fired after a tab is selected.
	     */
	
	  }]);
	
	  return Tab;
	}(_contentSwitcher2.default);
	
	Tab.components = new WeakMap();
	Tab.options = Object.assign(Object.create(_contentSwitcher2.default.options), {
	  selectorInit: '[data-tabs]',
	  selectorMenu: '.bx--tabs__nav',
	  selectorTrigger: '.bx--tabs__trigger',
	  selectorTriggerText: '.bx--tabs__trigger-text',
	  selectorButton: '.bx--tabs__nav-item',
	  selectorButtonSelected: '.bx--tabs__nav-item.bx--tabs--selected',
	  selectorLink: '.bx--tabs__nav-link',
	  classActive: 'bx--tabs--selected',
	  classHidden: 'bx--tabs--hidden',
	  eventBeforeSelected: 'tab-beingselected',
	  eventAfterSelected: 'tab-selected'
	});
	exports.default = Tab;

/***/ },
/* 18 */
/***/ function(module, exports) {

	"use strict";
	
	Math.sign = Math.sign || function sign(x) {
	  var n = +x;
	  return n === 0 ? n : n / Math.abs(n);
	};

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	var _mixin2 = __webpack_require__(3);
	
	var _mixin3 = _interopRequireDefault(_mixin2);
	
	var _createComponent = __webpack_require__(4);
	
	var _createComponent2 = _interopRequireDefault(_createComponent);
	
	var _initComponentBySearch = __webpack_require__(5);
	
	var _initComponentBySearch2 = _interopRequireDefault(_initComponentBySearch);
	
	var _eventedState = __webpack_require__(14);
	
	var _eventedState2 = _interopRequireDefault(_eventedState);
	
	__webpack_require__(8);
	
	__webpack_require__(6);
	
	__webpack_require__(7);
	
	var _toggleClass = __webpack_require__(16);
	
	var _toggleClass2 = _interopRequireDefault(_toggleClass);
	
	var _on = __webpack_require__(12);
	
	var _on2 = _interopRequireDefault(_on);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var OverflowMenu = function (_mixin) {
	  _inherits(OverflowMenu, _mixin);
	
	  function OverflowMenu(element, options) {
	    _classCallCheck(this, OverflowMenu);
	
	    var _this = _possibleConstructorReturn(this, (OverflowMenu.__proto__ || Object.getPrototypeOf(OverflowMenu)).call(this, element, options));
	
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
	
	
	  _createClass(OverflowMenu, [{
	    key: 'shouldStateBeChanged',
	    value: function shouldStateBeChanged(state) {
	      return state !== (this.element.classList.contains('bx--overflow-menu--open') ? 'shown' : 'hidden');
	    }
	
	    /**
	     * Changes the shown/hidden state.
	     * @private
	     * @param {string} state The new state.
	     * @param {Object} detail The detail of the event trigging this action.
	     * @param {Function} callback Callback called when change in state completes.
	     */
	
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
	      _get(OverflowMenu.prototype.__proto__ || Object.getPrototypeOf(OverflowMenu.prototype), 'release', this).call(this);
	    }
	  }]);
	
	  return OverflowMenu;
	}((0, _mixin3.default)(_createComponent2.default, _initComponentBySearch2.default, _eventedState2.default));
	
	OverflowMenu.components = new WeakMap();
	OverflowMenu.options = {
	  selectorInit: '[data-overflow-menu]',
	  selectorOptionMenu: '.bx--overflow-menu__options',
	  eventBeforeShown: 'overflow-menu-beingshown',
	  eventAfterShown: 'overflow-menu-shown',
	  eventBeforeHidden: 'overflow-menu-beinghidden',
	  eventAfterHidden: 'overflow-menu-hidden'
	};
	exports.default = OverflowMenu;

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	var _mixin2 = __webpack_require__(3);
	
	var _mixin3 = _interopRequireDefault(_mixin2);
	
	var _createComponent = __webpack_require__(4);
	
	var _createComponent2 = _interopRequireDefault(_createComponent);
	
	var _initComponentByLauncher = __webpack_require__(21);
	
	var _initComponentByLauncher2 = _interopRequireDefault(_initComponentByLauncher);
	
	var _eventedState = __webpack_require__(14);
	
	var _eventedState2 = _interopRequireDefault(_eventedState);
	
	__webpack_require__(8);
	
	__webpack_require__(6);
	
	__webpack_require__(7);
	
	__webpack_require__(15);
	
	var _toggleClass = __webpack_require__(16);
	
	var _toggleClass2 = _interopRequireDefault(_toggleClass);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
	
	/**
	 * @param {Element} element The element to obtain transition duration from.
	 * @returns {number} The transition duration of the given property set in the given element.
	 */
	function getTransitionDuration(element) {
	  var computedStyle = element.ownerDocument.defaultView.getComputedStyle(element);
	  var durations = computedStyle.transitionDuration.split(/,\s*/).map(function (transitionDuration) {
	    return parseFloat(transitionDuration);
	  }).filter(function (duration) {
	    return !isNaN(duration);
	  });
	  return durations.length > 0 ? Math.max.apply(Math, _toConsumableArray(durations)) : 0;
	}
	
	var Modal = function (_mixin) {
	  _inherits(Modal, _mixin);
	
	  /**
	   * Modal dialog.
	   * @extends CreateComponent
	   * @extends InitComponentByLauncher
	   * @extends EventedState
	   * @param {HTMLElement} element The element working as a modal dialog.
	   * @param {Object} [options] The component options.
	   * @param {string} [options.classVisible] The CSS class for the visible state.
	   * @param {string} [options.classNoScroll] The CSS class for hiding scroll bar in body element while modal is shown.
	   * @param {string} [options.eventBeforeShown]
	   *   The name of the custom event fired before this modal is shown.
	   *   Cancellation of this event stops showing the modal.
	   * @param {string} [options.eventAfterShown]
	   *   The name of the custom event telling that modal is sure shown
	   *   without being canceled by the event handler named by `eventBeforeShown` option (`modal-beingshown`).
	   * @param {string} [options.eventBeforeHidden]
	   *   The name of the custom event fired before this modal is hidden.
	   *   Cancellation of this event stops hiding the modal.
	   * @param {string} [options.eventAfterHidden]
	   *   The name of the custom event telling that modal is sure hidden
	   *   without being canceled by the event handler named by `eventBeforeHidden` option (`modal-beinghidden`).
	   */
	  function Modal(element, options) {
	    _classCallCheck(this, Modal);
	
	    var _this = _possibleConstructorReturn(this, (Modal.__proto__ || Object.getPrototypeOf(Modal)).call(this, element, options));
	
	    _this.hookCloseActions();
	    return _this;
	  }
	
	  /**
	   * A method called when this widget is created upon clicking on launcher button.
	   * @param {Event} event The event triggering the creation.
	   */
	
	
	  _createClass(Modal, [{
	    key: 'createdByLauncher',
	    value: function createdByLauncher(event) {
	      this.show(event);
	    }
	
	    /**
	     * Adds event listeners for closing this dialog.
	     */
	
	  }, {
	    key: 'hookCloseActions',
	    value: function hookCloseActions() {
	      var _this2 = this;
	
	      this.element.addEventListener('click', function (event) {
	        if (event.currentTarget === event.target) _this2.hide(event);
	      });
	
	      if (this.keydownHandler) {
	        this.element.ownerDocument.body.removeEventListener('keydown', this.keydownHandler);
	        this.keydownHandler = null;
	      }
	
	      this.keydownHandler = function (event) {
	        if (event.which === 27) {
	          _this2.hide(event);
	        }
	      };
	
	      this.element.ownerDocument.body.addEventListener('keydown', this.keydownHandler);
	
	      [].concat(_toConsumableArray(this.element.querySelectorAll('[data-modal-close]'))).forEach(function (element) {
	        element.addEventListener('click', function (event) {
	          _this2.hide(event);
	        });
	      });
	    }
	
	    /**
	     * @param {string} state The new state.
	     * @returns {boolean} `true` of the current state is different from the given new state.
	     */
	
	  }, {
	    key: 'shouldStateBeChanged',
	    value: function shouldStateBeChanged(state) {
	      return state !== (this.element.classList.contains(this.options.classVisible) ? 'shown' : 'hidden');
	    }
	
	    /**
	     * Changes the shown/hidden state.
	     * @private
	     * @param {string} state The new state.
	     * @param {Object} detail The detail of the event trigging this action.
	     * @param {Function} callback Callback called when change in state completes.
	     */
	
	  }, {
	    key: '_changeState',
	    value: function _changeState(state, detail, callback) {
	      var _this3 = this;
	
	      var finished = void 0;
	      var visible = state === 'shown';
	      var finishedTransition = function finishedTransition() {
	        if (!finished) {
	          finished = true;
	          _this3.element.removeEventListener('transitionend', finishedTransition);
	          if (visible && _this3.element.offsetWidth > 0 && _this3.element.offsetHeight > 0) {
	            // Sets focus to modal's container element so that hitting tab navigates user to first navigable element in modal.
	            // Application can override this behavior by hooking to `modal-shown` event and setting focus to an element.
	            // (e.g. default input box, default button)
	            _this3.element.focus();
	          }
	          callback();
	        }
	      };
	
	      this.element.addEventListener('transitionend', finishedTransition);
	      var transitionDuration = getTransitionDuration(this.element);
	      (0, _toggleClass2.default)(this.element, this.options.classVisible, visible);
	      (0, _toggleClass2.default)(this.element.ownerDocument.body, this.options.classNoScroll, visible);
	      if (transitionDuration === 0) {
	        finishedTransition();
	      }
	    }
	
	    /**
	     * Shows this modal dialog.
	     * @param {HTMLElement} [launchingElement] The DOM element that triggered calling this function.
	     * @param {EventedState~changeStateCallback} [callback] The callback called once showing this dialog is finished or is canceled.
	     */
	
	  }, {
	    key: 'show',
	    value: function show(launchingElementOrEvent, callback) {
	      var launchingElementOrEventOmitted = !launchingElementOrEvent || typeof launchingElementOrEvent === 'function';
	      if (launchingElementOrEventOmitted) {
	        callback = launchingElementOrEvent; // eslint-disable-line no-param-reassign
	      }
	
	      var launchingElement = launchingElementOrEventOmitted ? null : launchingElementOrEvent.delegateTarget || launchingElementOrEvent.currentTarget || launchingElementOrEvent;
	
	      var launchingEvent = launchingElementOrEventOmitted ? null : launchingElementOrEvent.currentTarget && launchingElementOrEvent;
	
	      if (launchingElement && !launchingElement.nodeType) {
	        throw new TypeError('DOM Node should be given for launching element.');
	      }
	
	      if (launchingEvent && !launchingEvent.type) {
	        throw new TypeError('DOM event should be given for launching event.');
	      }
	
	      this.changeState('shown', { launchingElement: launchingElement, launchingEvent: launchingEvent }, callback);
	    }
	
	    /**
	     * Hides this modal dialog.
	     * @param {EventedState~changeStateCallback} [callback] The callback called once showing this dialog is finished or is canceled.
	     */
	
	  }, {
	    key: 'hide',
	    value: function hide(launchingElementOrEvent, callback) {
	      var launchingElementOrEventOmitted = !launchingElementOrEvent || typeof launchingElementOrEvent === 'function';
	      if (launchingElementOrEventOmitted) {
	        callback = launchingElementOrEvent; // eslint-disable-line no-param-reassign
	      }
	
	      var launchingElement = launchingElementOrEventOmitted ? null : launchingElementOrEvent.currentTarget || launchingElementOrEvent;
	
	      var launchingEvent = launchingElementOrEventOmitted ? null : launchingElementOrEvent.currentTarget && launchingElementOrEvent;
	
	      if (launchingElement && !launchingElement.nodeType) {
	        throw new TypeError('DOM Node should be given for launching element.');
	      }
	
	      if (launchingEvent && !launchingEvent.type) {
	        throw new TypeError('DOM event should be given for launching event.');
	      }
	
	      this.changeState('hidden', { launchingElement: launchingElement, launchingEvent: launchingEvent }, callback);
	    }
	  }, {
	    key: 'release',
	    value: function release() {
	      if (this.keydownHandler) {
	        this.element.ownerDocument.body.removeEventListener('keydown', this.keydownHandler);
	        this.keydownHandler = null;
	      }
	      _get(Modal.prototype.__proto__ || Object.getPrototypeOf(Modal.prototype), 'release', this).call(this);
	    }
	
	    /**
	     * @deprecated
	     */
	
	  }], [{
	    key: 'hook',
	    value: function hook() {
	      console.warn('Modals.hook() is deprecated. Use Modals.init() instead.'); // eslint-disable-line no-console
	    }
	
	    /**
	     * The map associating DOM element and modal instance.
	     * @member Modal.components
	     * @type {WeakMap}
	     */
	
	
	    /**
	     * The component options.
	     * If `options` is specified in the constructor, {@linkcode Modal.create .create()}, or {@linkcode Modal.init .init()},
	     * properties in this object are overriden for the instance being create and how {@linkcode Modal.init .init()} works.
	     * @member Modal.options
	     * @type {Object}
	     * @property {string} selectorInit The CSS class to find modal dialogs.
	     * @property {string} attribInitTarget The attribute name in the launcher buttons to find target modal dialogs.
	     * @property {string} [classVisible] The CSS class for the visible state.
	     * @property {string} [classNoScroll] The CSS class for hiding scroll bar in body element while modal is shown.
	     * @property {string} [eventBeforeShown]
	     *   The name of the custom event fired before this modal is shown.
	     *   Cancellation of this event stops showing the modal.
	     * @property {string} [eventAfterShown]
	     *   The name of the custom event telling that modal is sure shown
	     *   without being canceled by the event handler named by `eventBeforeShown` option (`modal-beingshown`).
	     * @property {string} [eventBeforeHidden]
	     *   The name of the custom event fired before this modal is hidden.
	     *   Cancellation of this event stops hiding the modal.
	     * @property {string} [eventAfterHidden]
	     *   The name of the custom event telling that modal is sure hidden
	     *   without being canceled by the event handler named by `eventBeforeHidden` option (`modal-beinghidden`).
	     */
	
	  }]);
	
	  return Modal;
	}((0, _mixin3.default)(_createComponent2.default, _initComponentByLauncher2.default, _eventedState2.default));
	
	Modal.components = new WeakMap();
	Modal.options = {
	  selectorInit: '[data-modal]',
	  attribInitTarget: 'data-modal-target',
	  classVisible: 'is-visible',
	  classNoScroll: 'bx--noscroll',
	  eventBeforeShown: 'modal-beingshown',
	  eventAfterShown: 'modal-shown',
	  eventBeforeHidden: 'modal-beinghidden',
	  eventAfterHidden: 'modal-hidden',
	  initEventNames: ['click']
	};
	exports.default = Modal;

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	exports.default = function (ToMix) {
	  /**
	   * Mix-in class to instantiate components events on launcher button.
	   * @class InitComponentByLauncher
	   */
	  var InitComponentByLauncher = function (_ToMix) {
	    _inherits(InitComponentByLauncher, _ToMix);
	
	    function InitComponentByLauncher() {
	      _classCallCheck(this, InitComponentByLauncher);
	
	      return _possibleConstructorReturn(this, (InitComponentByLauncher.__proto__ || Object.getPrototypeOf(InitComponentByLauncher)).apply(this, arguments));
	    }
	
	    _createClass(InitComponentByLauncher, null, [{
	      key: 'init',
	
	      /**
	       * Instantiates this component in the given element.
	       * If the given element indicates that it's an component of this class, instantiates it.
	       * Otherwise, instantiates this component by clicking on launcher buttons
	       * (buttons with attribute that `options.attribInitTarget` points to) of this component in the given node.
	       * @param {Node} target The DOM node to instantiate this component in. Should be a document or an element.
	       * @param {Object} [options] The component options.
	       * @param {string} [options.selectorInit] The CSS selector to find this component.
	       * @param {string} [options.attribInitTarget] The attribute name in the launcher buttons to find target component.
	       * @returns {Handle} The handle to remove the event listener to handle clicking.
	       */
	      value: function init() {
	        var _this2 = this;
	
	        var target = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document;
	        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	
	        var effectiveOptions = Object.assign(Object.create(this.options), options);
	        if (target.nodeType !== Node.ELEMENT_NODE && target.nodeType !== Node.DOCUMENT_NODE) {
	          throw new Error('DOM document or DOM element should be given to search for and initialize this widget.');
	        }
	        if (target.nodeType === Node.ELEMENT_NODE && target.matches(effectiveOptions.selectorInit)) {
	          this.create(target, options);
	        } else {
	          var handles = effectiveOptions.initEventNames.map(function (name) {
	            return (0, _on2.default)(target, name, function (event) {
	              var launcher = (0, _eventMatches2.default)(event, '[' + effectiveOptions.attribInitTarget + ']');
	
	              if (launcher) {
	                event.delegateTarget = launcher; // eslint-disable-line
	
	                var elements = [].concat(_toConsumableArray(launcher.ownerDocument.querySelectorAll(launcher.getAttribute(effectiveOptions.attribInitTarget))));
	                if (elements.length > 1) {
	                  throw new Error('Target widget must be unique.');
	                }
	
	                if (elements.length === 1) {
	                  if (launcher.tagName === 'A') {
	                    event.preventDefault();
	                  }
	
	                  var component = _this2.create(elements[0], options);
	                  if (typeof component.createdByLauncher === 'function') {
	                    component.createdByLauncher(event);
	                  }
	                }
	              }
	            });
	          });
	          return {
	            release: function release() {
	              for (var handle = handles.pop(); handle; handle = handles.pop()) {
	                handle.release();
	              }
	            }
	          };
	        }
	      }
	    }]);
	
	    return InitComponentByLauncher;
	  }(ToMix);
	
	  return InitComponentByLauncher;
	};
	
	var _eventMatches = __webpack_require__(11);
	
	var _eventMatches2 = _interopRequireDefault(_eventMatches);
	
	var _on = __webpack_require__(12);
	
	var _on2 = _interopRequireDefault(_on);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _mixin2 = __webpack_require__(3);
	
	var _mixin3 = _interopRequireDefault(_mixin2);
	
	var _createComponent = __webpack_require__(4);
	
	var _createComponent2 = _interopRequireDefault(_createComponent);
	
	var _initComponentByLauncher = __webpack_require__(21);
	
	var _initComponentByLauncher2 = _interopRequireDefault(_initComponentByLauncher);
	
	var _eventedState = __webpack_require__(14);
	
	var _eventedState2 = _interopRequireDefault(_eventedState);
	
	__webpack_require__(8);
	
	__webpack_require__(6);
	
	__webpack_require__(7);
	
	__webpack_require__(15);
	
	var _toggleClass = __webpack_require__(16);
	
	var _toggleClass2 = _interopRequireDefault(_toggleClass);
	
	var _eventMatches = __webpack_require__(11);
	
	var _eventMatches2 = _interopRequireDefault(_eventMatches);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var HeaderNav = function (_mixin) {
	  _inherits(HeaderNav, _mixin);
	
	  /**
	   * Header with taxonomy menu.
	   * @deprecated
	   * @extends CreateComponent
	   * @extends InitComponentByLauncher
	   * @extends EventedState
	   * @param {HTMLElement} element The element working as a taxonomy menu.
	   * @param {Object} [options] The component options.
	   * @param {string} [options.selectorTriggerLabel] The CSS selector to find the label for the selected menu item.
	   * @param {string} [options.selectorMenu] The CSS selector to find the container of the menu items.
	   * @param {string} [options.selectorItem] The CSS selector to find the menu items.
	   * @param {string} [options.selectorItemLink] The CSS selector to find the link in the menu items.
	   * @param {string} [options.selectorLabel] The CSS selector to find the label of the menu items.
	   * @param {string} [options.classActive] The CSS class for the visible state.
	   * @param {string} [options.eventBeforeShown]
	   *   The name of the custom event fired before this taxonomy menu is shown.
	   *   Cancellation of this event stops showing the taxonomy menu.
	   * @param {string} [options.eventAfterShown] The name of the custom event fired after this taxonomy menu is shown.
	   * @param {string} [options.eventBeforeHidden]
	   *   The name of the custom event fired before this taxonomy menu is hidden.
	   *   Cancellation of this event stops hiding the taxonomy menu.
	   * @param {string} [options.eventAfterHidden] The name of the custom event fired after this taxonomy menu is hidden.
	   * @param {string} [options.eventBeforeSelected]
	   *   The name of the custom event fired before a menu item is selected.
	   *   Cancellation of this event stops the selection.
	   * @param {string} [options.eventAfterSelected] The name of the custom event fired after a menu item is selected.
	   */
	  function HeaderNav(element, options) {
	    _classCallCheck(this, HeaderNav);
	
	    var _this = _possibleConstructorReturn(this, (HeaderNav.__proto__ || Object.getPrototypeOf(HeaderNav)).call(this, element, options));
	
	    _this.menuNode = _this.element.querySelector(_this.options.selectorMenu);
	
	    _this.element.addEventListener('keydown', function (event) {
	      _this.toggleNav(event);
	    });
	
	    [].concat(_toConsumableArray(_this.element.querySelectorAll(_this.options.selectorItemLink))).forEach(function (item) {
	      item.addEventListener('click', function (e) {
	        _this.select(e);
	      });
	    });
	    return _this;
	  }
	
	  /**
	   * A method called when this widget is created upon clicking on launcher button.
	   * @param {Event} event The event triggering the creation.
	   */
	
	
	  _createClass(HeaderNav, [{
	    key: 'createdByLauncher',
	    value: function createdByLauncher(event) {
	      this.toggleNav(event);
	    }
	
	    /**
	     * @param {string} state The new state.
	     * @returns {boolean} `true` of the current state is different from the given new state.
	     */
	
	  }, {
	    key: 'shouldStateBeChanged',
	    value: function shouldStateBeChanged(state) {
	      return state !== (this.element.classList.contains(this.options.classActive) ? 'shown' : 'hidden');
	    }
	
	    /**
	     * Changes the shown/hidden state.
	     * @private
	     * @param {string} state The new state.
	     * @param {Object} detail The detail of the event trigging this action.
	     * @param {EventedState~changeStateCallback} callback Callback called when change in state completes.
	     */
	
	  }, {
	    key: '_changeState',
	    value: function _changeState(state, detail, callback) {
	      (0, _toggleClass2.default)(this.element, this.options.classActive, state === 'shown');
	      callback();
	    }
	
	    /**
	     * Shows/hides this taxonomy menu.
	     * @param {Event} event The event triggering this function.
	     */
	
	  }, {
	    key: 'toggleNav',
	    value: function toggleNav(event) {
	      var _this2 = this;
	
	      var isActive = this.element.classList.contains(this.options.classActive);
	      var add = void 0;
	      if (event.type === 'click' || event.type === 'keydown' && event.which === 40) {
	        // Toggle button or ESC key on nav
	        add = !isActive;
	      } else if (event.type === 'keydown' && event.which === 27) {
	        // Down arrow on launch button
	        add = false;
	      } else {
	        return;
	      }
	
	      var launchingElement = (0, _eventMatches2.default)(event, '[data-nav-target]') || event.currentTarget;
	      if (launchingElement.tagName === 'A') {
	        event.preventDefault();
	      }
	
	      if (add) {
	        this.triggerNode = launchingElement;
	        this.triggerLabelNode = this.triggerNode.querySelector(this.options.selectorTriggerLabel);
	      }
	
	      this.changeState(add ? 'shown' : 'hidden', { launchingElement: launchingElement }, function (error) {
	        if (!error) {
	          (_this2.element.classList.contains(_this2.options.classActive) ? _this2.menuNode : _this2.triggerNode).focus();
	        }
	      });
	    }
	
	    /**
	     * Selects a menu item.
	     * @param {Event} event The event triggering this function.
	     */
	
	  }, {
	    key: 'select',
	    value: function select(event) {
	      var activatedElement = event.currentTarget;
	      var eventStart = new CustomEvent(this.options.eventBeforeSelected, {
	        bubbles: true,
	        cancelable: true,
	        detail: {
	          initiatingEvent: event,
	          itemElement: activatedElement
	        }
	      });
	
	      if (this.element.dispatchEvent(eventStart)) {
	        [].concat(_toConsumableArray(this.element.querySelectorAll(this.options.selectorItem))).forEach(function (element) {
	          if (element.contains(activatedElement)) {
	            element.classList.add('selected');
	          } else if (element.classList.contains('selected')) {
	            element.classList.remove('selected');
	          }
	        });
	        activatedElement.classList.add('selected');
	        if (this.triggerLabelNode) {
	          this.triggerLabelNode.textContent = activatedElement.querySelector(this.options.selectorLabel).textContent;
	        }
	        this.element.dispatchEvent(new CustomEvent(this.options.eventAfterSelected, {
	          bubbles: true,
	          cancelable: true,
	          detail: { itemElement: activatedElement }
	        }));
	      }
	    }
	
	    /**
	     * @deprecated
	     */
	
	  }], [{
	    key: 'hook',
	    value: function hook() {
	      console.warn('HeaderNav.hook() is deprecated. Use HeaderNav.init() instead.'); // eslint-disable-line no-console
	    }
	
	    /**
	     * The map associating DOM element and taxonomy menu instance.
	     * @member HeaderNav.components
	     * @type {WeakMap}
	     */
	
	
	    /**
	     * The component options.
	     * If `options` is specified in the constructor, {@linkcode HeaderNav.create .create()}, or {@linkcode HeaderNav.init .init()},
	     * properties in this object are overriden for the instance being create and how {@linkcode HeaderNav.init .init()} works.
	     * @member HeaderNav.options
	     * @type {Object}
	     * @property {string} selectorInit The CSS selector to find taxonomy menus.
	     * @property {string} attribInitTarget The attribute name in the lancher buttons to find taxonomy menus.
	     * @property {string} [selectorTriggerLabel] The CSS selector to find the label for the selected menu item.
	     * @property {string} [selectorMenu] The CSS selector to find the container of the menu items.
	     * @property {string} [selectorItem] The CSS selector to find the menu items.
	     * @property {string} [selectorItemLink] The CSS selector to find the link in the menu items.
	     * @property {string} [selectorLabel] The CSS selector to find the label of the menu items.
	     * @property {string} [classActive] The CSS class for the visible state.
	     * @property {string} [eventBeforeShown]
	     *   The name of the custom event fired before this taxonomy menu is shown.
	     *   Cancellation of this event stops showing the taxonomy menu.
	     * @property {string} [eventAfterShown] The name of the custom event fired after this taxonomy menu is shown.
	     * @property {string} [eventBeforeHidden]
	     *   The name of the custom event fired before this taxonomy menu is hidden.
	     *   Cancellation of this event stops hiding the taxonomy menu.
	     * @property {string} [eventAfterHidden] The name of the custom event fired after this taxonomy menu is hidden.
	     * @property {string} [eventBeforeSelected]
	     *   The name of the custom event fired before a menu item is selected.
	     *   Cancellation of this event stops the selection.
	     * @property {string} [eventAfterSelected] The name of the custom event fired after a menu item is selected.
	     */
	
	  }]);
	
	  return HeaderNav;
	}((0, _mixin3.default)(_createComponent2.default, _initComponentByLauncher2.default, _eventedState2.default));
	
	HeaderNav.components = new WeakMap();
	HeaderNav.options = {
	  selectorInit: '[data-nav]',
	  attribInitTarget: 'data-nav-target',
	  selectorTriggerLabel: '.current-taxonomy',
	  classActive: 'taxonomy-nav--active',
	  selectorMenu: '.taxonomy-menu',
	  selectorItem: '.taxonomy-item',
	  selectorItemLink: '.taxonomy-item--taxonomy-menu',
	  selectorLabel: '.taxonomy-item__label',
	  eventBeforeShown: 'header-beingshown',
	  eventAfterShown: 'header-shown',
	  eventBeforeHidden: 'header-beinghidden',
	  eventAfterHidden: 'header-hidden',
	  eventBeforeSelected: 'header-beingselected',
	  eventAfterSelected: 'header-selected',
	  initEventNames: ['click', 'keydown']
	};
	exports.default = HeaderNav;

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _mixin2 = __webpack_require__(3);
	
	var _mixin3 = _interopRequireDefault(_mixin2);
	
	var _createComponent = __webpack_require__(4);
	
	var _createComponent2 = _interopRequireDefault(_createComponent);
	
	var _initComponentBySearch = __webpack_require__(5);
	
	var _initComponentBySearch2 = _interopRequireDefault(_initComponentBySearch);
	
	__webpack_require__(8);
	
	__webpack_require__(6);
	
	__webpack_require__(7);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Toolbars = function (_mixin) {
	  _inherits(Toolbars, _mixin);
	
	  /**
	   * Search button in tool bar.
	   * @extends CreateComponent
	   * @extends InitComponentBySearch
	   * @param {HTMLElement} element The element working as an search button.
	   */
	  function Toolbars(element) {
	    _classCallCheck(this, Toolbars);
	
	    var _this = _possibleConstructorReturn(this, (Toolbars.__proto__ || Object.getPrototypeOf(Toolbars)).call(this, element));
	
	    _this.searchFieldNode = _this.element.ownerDocument.querySelector(_this.element.dataset.listIconsSearchActionTarget);
	    _this.element.addEventListener('click', function (event) {
	      _this.handleActionClick(event);
	    });
	    return _this;
	  }
	
	  /**
	   * Show/hide search box.
	   * @param {Event} event The event triggering this method.
	   */
	
	
	  _createClass(Toolbars, [{
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
	
	    /**
	     * The map associating DOM element and search button instance.
	     * @member Toolbars.components
	     * @type {WeakMap}
	     */
	
	
	    /**
	     * The component options.
	     * If `options` is specified in the constructor, {@linkcode Toolbars.create .create()}, or {@linkcode Toolbars.init .init()},
	     * properties in this object are overriden for the instance being create and how {@linkcode Toolbars.init .init()} works.
	     * @member Toolbars.options
	     * @type {Object}
	     * @property {string} selectorInit The CSS selector to find search buttons.
	     */
	
	  }]);
	
	  return Toolbars;
	}((0, _mixin3.default)(_createComponent2.default, _initComponentBySearch2.default));
	
	Toolbars.components = new WeakMap();
	Toolbars.options = {
	  selectorInit: '[data-list-icons-search-action-target]'
	};
	exports.default = Toolbars;

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _mixin2 = __webpack_require__(3);
	
	var _mixin3 = _interopRequireDefault(_mixin2);
	
	var _createComponent = __webpack_require__(4);
	
	var _createComponent2 = _interopRequireDefault(_createComponent);
	
	var _initComponentBySearch = __webpack_require__(5);
	
	var _initComponentBySearch2 = _interopRequireDefault(_initComponentBySearch);
	
	__webpack_require__(8);
	
	__webpack_require__(6);
	
	__webpack_require__(7);
	
	var _toggleClass = __webpack_require__(16);
	
	var _toggleClass2 = _interopRequireDefault(_toggleClass);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Loading = function (_mixin) {
	  _inherits(Loading, _mixin);
	
	  /**
	   * Spinner indicating loading state.
	   * @extends CreateComponent
	   * @extends InitComponentBySearch
	   * @param {HTMLElement} element The element working as a spinner.
	   * @param {Object} [options] The component options.
	   * @param {boolean} [options.active] `true` if this spinner should roll.
	   */
	  function Loading(element, options) {
	    _classCallCheck(this, Loading);
	
	    var _this = _possibleConstructorReturn(this, (Loading.__proto__ || Object.getPrototypeOf(Loading)).call(this, element, options));
	
	    _this.active = _this.options.active;
	
	    // Initialize spinner
	    _this.set(_this.active);
	    return _this;
	  }
	
	  /**
	   * Sets active/inactive state.
	   * @param {boolean} active `true` if this spinner should roll.
	   */
	
	
	  _createClass(Loading, [{
	    key: 'set',
	    value: function set(active) {
	      if (typeof active !== 'boolean') {
	        throw new TypeError('set expects a boolean.');
	      }
	
	      this.active = active;
	      (0, _toggleClass2.default)(this.element, 'bx--loading--stop', !this.active);
	
	      return this;
	    }
	
	    /**
	     * Toggles active/inactive state.
	     * @param {boolean} active `true` if this spinner should roll.
	     */
	
	  }, {
	    key: 'toggle',
	    value: function toggle() {
	      return this.set(!this.active);
	    }
	
	    /**
	     * @returns {boolean} `true` if this spinner is rolling roll.
	     */
	
	  }, {
	    key: 'isActive',
	    value: function isActive() {
	      return this.active;
	    }
	
	    /**
	     * The map associating DOM element and spinner instance.
	     * @member Loading.components
	     * @type {WeakMap}
	     */
	
	
	    /**
	     * The component options.
	     * If `options` is specified in the constructor, {@linkcode Loading.create .create()}, or {@linkcode Loading.init .init()},
	     * properties in this object are overriden for the instance being create and how {@linkcode Loading.init .init()} works.
	     * @member Loading.options
	     * @type {Object}
	     * @property {string} selectorInit The CSS selector to find spinners.
	     */
	
	  }]);
	
	  return Loading;
	}((0, _mixin3.default)(_createComponent2.default, _initComponentBySearch2.default));
	
	Loading.components = new WeakMap();
	Loading.options = {
	  selectorInit: '[data-loading]',
	  active: true
	};
	exports.default = Loading;

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	var _mixin2 = __webpack_require__(3);
	
	var _mixin3 = _interopRequireDefault(_mixin2);
	
	var _createComponent = __webpack_require__(4);
	
	var _createComponent2 = _interopRequireDefault(_createComponent);
	
	var _initComponentBySearch = __webpack_require__(5);
	
	var _initComponentBySearch2 = _interopRequireDefault(_initComponentBySearch);
	
	var _eventMatches = __webpack_require__(11);
	
	var _eventMatches2 = _interopRequireDefault(_eventMatches);
	
	__webpack_require__(8);
	
	__webpack_require__(6);
	
	__webpack_require__(7);
	
	__webpack_require__(15);
	
	var _on = __webpack_require__(12);
	
	var _on2 = _interopRequireDefault(_on);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Dropdown = function (_mixin) {
	  _inherits(Dropdown, _mixin);
	
	  /**
	   * A selector with drop downs.
	   * @extends CreateComponent
	   * @extends InitComponentBySearch
	   * @param {HTMLElement} element The element working as a selector.
	   * @param {Object} [options] The component options.
	   * @param {string} [options.selectorItem] The CSS selector to find clickable areas in dropdown items.
	   * @param {string} [options.selectorItemSelected] The CSS selector to find the clickable area in the selected dropdown item.
	   * @param {string} [options.classSelected] The CSS class for the selected dropdown item.
	   * @param {string} [options.eventBeforeSelected]
	   *   The name of the custom event fired before a drop down item is selected.
	   *   Cancellation of this event stops selection of drop down item.
	   * @param {string} [options.eventAfterSelected] The name of the custom event fired after a drop down item is selected.
	   */
	  function Dropdown(element, options) {
	    _classCallCheck(this, Dropdown);
	
	    var _this = _possibleConstructorReturn(this, (Dropdown.__proto__ || Object.getPrototypeOf(Dropdown)).call(this, element, options));
	
	    if (_this.element.dataset.dropdown !== 'navigation') {
	      _this.element.dataset.dropdown = '';
	    }
	
	    /**
	     * The handle to release click event listener on document object.
	     * @member {Handle}
	     */
	    _this.hDocumentClick = (0, _on2.default)(_this.element.ownerDocument, 'click', function (event) {
	      _this.toggle(event);
	    });
	
	    _this.setCloseOnBlur();
	
	    _this.element.addEventListener('keydown', function (event) {
	      _this.handleKeyDown(event);
	    });
	    _this.element.addEventListener('click', function (event) {
	      var item = (0, _eventMatches2.default)(event, _this.options.selectorItem);
	      if (item) {
	        _this.select(item);
	      }
	    });
	    return _this;
	  }
	
	  /**
	   * Cleans up stuffs specific to this widget.
	   */
	
	
	  _createClass(Dropdown, [{
	    key: 'release',
	    value: function release() {
	      if (this.hFocusIn) {
	        this.hFocusIn = this.hFocusIn.release();
	      }
	      if (this.hDocumentClick) {
	        this.hDocumentClick = this.hDocumentClick.release();
	      }
	      _get(Dropdown.prototype.__proto__ || Object.getPrototypeOf(Dropdown.prototype), 'release', this).call(this);
	    }
	
	    /**
	     * Handles keydown event.
	     * @param {Event} event The event triggering this method.
	     */
	
	  }, {
	    key: 'handleKeyDown',
	    value: function handleKeyDown(event) {
	      var isOpen = this.element.classList.contains('bx--dropdown--open');
	      var direction = {
	        38: this.constructor.NAVIGATE.BACKWARD,
	        40: this.constructor.NAVIGATE.FORWARD
	      }[event.which];
	      if (isOpen && direction !== undefined) {
	        this.navigate(direction);
	      } else {
	        this.toggle(event);
	      }
	    }
	
	    /**
	     * Opens and closes the dropdown menu.
	     * @param {Event} [event] The event triggering this method.
	     */
	
	  }, {
	    key: 'toggle',
	    value: function toggle(event) {
	      var _this2 = this;
	
	      if ([13, 32, 40].indexOf(event.which) >= 0 && !event.target.matches(this.options.selectorItem) || event.which === 27 || event.type === 'click') {
	        var isOpen = this.element.classList.contains('bx--dropdown--open');
	        var isOfSelf = this.element.contains(event.target);
	        var actions = {
	          add: isOfSelf && event.which === 40 && !isOpen,
	          remove: (!isOfSelf || event.which === 27) && isOpen,
	          toggle: isOfSelf && event.which !== 27 && event.which !== 40
	        };
	        Object.keys(actions).forEach(function (action) {
	          if (actions[action]) {
	            _this2.element.classList[action]('bx--dropdown--open');
	            _this2.element.focus();
	          }
	        });
	      }
	    }
	
	    /**
	     * @returns {Element} Currently highlighted element.
	     */
	
	  }, {
	    key: 'getCurrentNavigation',
	    value: function getCurrentNavigation() {
	      var focused = this.element.ownerDocument.activeElement;
	      return focused.matches(this.options.selectorItem) ? focused : null;
	    }
	
	    /**
	     * Moves up/down the focus.
	     * @param {number} direction The direction of navigating.
	     */
	
	  }, {
	    key: 'navigate',
	    value: function navigate(direction) {
	      var items = [].concat(_toConsumableArray(this.element.querySelectorAll(this.options.selectorItem)));
	      var start = this.getCurrentNavigation() || this.element.querySelector(this.options.selectorItemSelected);
	      var getNextItem = function getNextItem(old) {
	        var handleUnderflow = function handleUnderflow(i, l) {
	          return i + (i >= 0 ? 0 : l);
	        };
	        var handleOverflow = function handleOverflow(i, l) {
	          return i - (i < l ? 0 : l);
	        };
	        // `items.indexOf(old)` may be -1 (Scenario of no previous focus)
	        var index = Math.max(items.indexOf(old) + direction, -1);
	        return items[handleUnderflow(handleOverflow(index, items.length), items.length)];
	      };
	      for (var current = getNextItem(start); current && current !== start; current = getNextItem(current)) {
	        if (!current.matches(this.options.selectorItemSelected)) {
	          current.focus();
	          break;
	        }
	      }
	    }
	
	    /**
	     * Handles clicking on the dropdown options, doing the following:
	     * * Change Dropdown text to selected option.
	     * * Remove selected option from options when selected.
	     * * Emit custom events.
	     * @param {HTMLElement} itemToSelect The element to be activated.
	     */
	
	  }, {
	    key: 'select',
	    value: function select(itemToSelect) {
	      var _this3 = this;
	
	      var eventStart = new CustomEvent(this.options.eventBeforeSelected, {
	        bubbles: true,
	        cancelable: true,
	        detail: { item: itemToSelect }
	      });
	
	      if (this.element.dispatchEvent(eventStart)) {
	        if (this.element.dataset.dropdownType !== 'navigation') {
	          this.element.firstElementChild.innerHTML = itemToSelect.innerHTML;
	          itemToSelect.classList.add(this.options.classSelected);
	        }
	        this.element.dataset.value = itemToSelect.parentElement.dataset.value;
	
	        [].concat(_toConsumableArray(this.element.querySelectorAll(this.options.selectorItemSelected))).forEach(function (item) {
	          if (itemToSelect !== item) {
	            item.classList.remove(_this3.options.classSelected);
	          }
	        });
	
	        itemToSelect.classList.add(this.options.classSelected);
	
	        this.element.dispatchEvent(new CustomEvent(this.options.eventAfterSelected, {
	          bubbles: true,
	          cancelable: true,
	          detail: { item: itemToSelect }
	        }));
	      }
	    }
	
	    /**
	     * Sets an event handler to document for "close on blur" behavior.
	     */
	
	  }, {
	    key: 'setCloseOnBlur',
	    value: function setCloseOnBlur() {
	      var _this4 = this;
	
	      var hasFocusin = 'onfocusin' in window;
	      var focusinEventName = hasFocusin ? 'focusin' : 'focus';
	      this.hFocusIn = (0, _on2.default)(this.element.ownerDocument, focusinEventName, function (event) {
	        if (!_this4.element.contains(event.target)) {
	          _this4.element.classList.remove('bx--dropdown--open');
	        }
	      }, !hasFocusin);
	    }
	
	    /**
	     * The map associating DOM element and selector instance.
	     * @member Dropdown.components
	     * @type {WeakMap}
	     */
	
	
	    /**
	     * The component options.
	     * If `options` is specified in the constructor, {@linkcode Dropdown.create .create()}, or {@linkcode Dropdown.init .init()},
	     * properties in this object are overriden for the instance being create and how {@linkcode Dropdown.init .init()} works.
	     * @member Dropdown.options
	     * @type {Object}
	     * @property {string} selectorInit The CSS selector to find selectors.
	     * @property {string} [selectorItem] The CSS selector to find clickable areas in dropdown items.
	     * @property {string} [selectorItemSelected] The CSS selector to find the clickable area in the selected dropdown item.
	     * @property {string} [classSelected] The CSS class for the selected dropdown item.
	     * @property {string} [eventBeforeSelected]
	     *   The name of the custom event fired before a drop down item is selected.
	     *   Cancellation of this event stops selection of drop down item.
	     * @property {string} [eventAfterSelected] The name of the custom event fired after a drop down item is selected.
	     */
	
	
	    /**
	     * Enum for navigating backward/forward.
	     * @readonly
	     * @member Dropdown.NAVIGATE
	     * @type {Object}
	     * @property {number} BACKWARD Navigating backward.
	     * @property {number} FORWARD Navigating forward.
	     */
	
	  }]);
	
	  return Dropdown;
	}((0, _mixin3.default)(_createComponent2.default, _initComponentBySearch2.default));
	
	Dropdown.components = new WeakMap();
	Dropdown.options = {
	  selectorInit: '[data-dropdown]',
	  selectorItem: '[data-option] > .bx--dropdown__link',
	  selectorItemSelected: '[data-option] > .bx--dropdown__link.bx--dropdown--selected',
	  classSelected: 'bx--dropdown--selected',
	  eventBeforeSelected: 'dropdown-beingselected',
	  eventAfterSelected: 'dropdown-selected'
	};
	Dropdown.NAVIGATE = {
	  BACKWARD: -1,
	  FORWARD: 1
	};
	exports.default = Dropdown;

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _mixin2 = __webpack_require__(3);
	
	var _mixin3 = _interopRequireDefault(_mixin2);
	
	var _createComponent = __webpack_require__(4);
	
	var _createComponent2 = _interopRequireDefault(_createComponent);
	
	var _initComponentBySearch = __webpack_require__(5);
	
	var _initComponentBySearch2 = _interopRequireDefault(_initComponentBySearch);
	
	var _eventMatches = __webpack_require__(11);
	
	var _eventMatches2 = _interopRequireDefault(_eventMatches);
	
	__webpack_require__(8);
	
	__webpack_require__(6);
	
	__webpack_require__(7);
	
	__webpack_require__(18);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Card = function (_mixin) {
	  _inherits(Card, _mixin);
	
	  /**
	   * The container for cards.
	   * @extends CreateComponent
	   * @extends InitComponentBySearch
	   * @param {HTMLElement} element The element working as a container.
	   * @param {Object} [options] The component options.
	   * @param {string} [options.selectorCard] The CSS selector to find cards.
	   */
	  function Card(element, options) {
	    _classCallCheck(this, Card);
	
	    var _this = _possibleConstructorReturn(this, (Card.__proto__ || Object.getPrototypeOf(Card)).call(this, element, options));
	
	    _this.element.addEventListener('keydown', function (event) {
	      _this.cardKeyPress(event);
	    });
	    return _this;
	  }
	
	  /**
	   * Goes back/forward among cards,
	   * right arrow key for going forward, left arrow key for going backward.
	   * @param {Event} event The event triggering this method.
	   */
	
	
	  _createClass(Card, [{
	    key: 'cardKeyPress',
	    value: function cardKeyPress(event) {
	      var direction = {
	        Left: -1,
	        Right: 1,
	        ArrowLeft: -1,
	        ArrowRight: 1
	      }[event.key || event.keyIdentifier];
	      var card = (0, _eventMatches2.default)(event, this.options.selectorCard);
	
	      if (direction && card && card === document.activeElement) {
	        var cards = [].concat(_toConsumableArray(this.element.querySelectorAll(this.options.selectorCard)));
	        var nextIndex = Math.max(cards.indexOf(card) + direction, -1 /* For `card` not found in `cards` */);
	        var nextIndexLooped = nextIndex >= 0 && nextIndex < cards.length ? nextIndex : nextIndex - Math.sign(nextIndex) * cards.length;
	        cards[nextIndexLooped].focus();
	      }
	    }
	
	    /**
	     * The map associating DOM element and card list instance.
	     * @member Card.components
	     * @type {WeakMap}
	     */
	
	
	    /**
	     * The component options.
	     * If `options` is specified in the constructor, {@linkcode Card.create .create()}, or {@linkcode Card.init .init()},
	     * properties in this object are overriden for the instance being create and how {@linkcode Card.init .init()} works.
	     * @member Card.options
	     * @type {Object}
	     * @property {string} selectorInit The CSS selector to find card containers.
	     * @property {string} [selectorCard] The CSS selector to find cards.
	     */
	
	  }]);
	
	  return Card;
	}((0, _mixin3.default)(_createComponent2.default, _initComponentBySearch2.default));
	
	Card.components = new WeakMap();
	Card.options = {
	  selectorInit: '[data-card-list]',
	  selectorCard: '.bx--card'
	};
	exports.default = Card;

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _mixin2 = __webpack_require__(3);
	
	var _mixin3 = _interopRequireDefault(_mixin2);
	
	var _createComponent = __webpack_require__(4);
	
	var _createComponent2 = _interopRequireDefault(_createComponent);
	
	var _initComponentBySearch = __webpack_require__(5);
	
	var _initComponentBySearch2 = _interopRequireDefault(_initComponentBySearch);
	
	__webpack_require__(8);
	
	__webpack_require__(15);
	
	__webpack_require__(6);
	
	__webpack_require__(7);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var NumberInput = function (_mixin) {
	  _inherits(NumberInput, _mixin);
	
	  /**
	   * Number input UI.
	   * @extends CreateComponent
	   * @extends InitComponentBySearch
	   * @param {HTMLElement} element The element working as a number input UI.
	   */
	  function NumberInput(element, options) {
	    _classCallCheck(this, NumberInput);
	
	    var _this = _possibleConstructorReturn(this, (NumberInput.__proto__ || Object.getPrototypeOf(NumberInput)).call(this, element, options));
	
	    _this.options.ie = _this.options.ie || 'ActiveXObject' in window;
	    // Broken DOM tree is seen with up/down arrows <svg> in IE, which breaks event delegation.
	    // Also <svg> does not seems to have `Element.classList`.
	    _this.element.querySelector('.bx--number__arrow--up').addEventListener('click', function (event) {
	      _this.handleClick(event);
	    });
	    _this.element.querySelector('.bx--number__arrow--down').addEventListener('click', function (event) {
	      _this.handleClick(event);
	    });
	    return _this;
	  }
	
	  /**
	   * Increase/decrease number by clicking on up/down icons.
	   * @param {Event} event The event triggering this method.
	   */
	
	
	  _createClass(NumberInput, [{
	    key: 'handleClick',
	    value: function handleClick(event) {
	      var state = event.currentTarget.classList;
	      var numberInput = this.element.querySelector('.bx--number__input');
	
	      if (state.contains('bx--number__arrow--up')) {
	        if (this.options.ie) {
	          ++numberInput.value;
	        } else {
	          numberInput.stepUp();
	        }
	      } else if (state.contains('bx--number__arrow--down')) {
	        if (this.options.ie) {
	          if (numberInput.value > 0) {
	            --numberInput.value;
	          }
	        } else {
	          numberInput.stepDown();
	        }
	      } else {
	        return;
	      }
	
	      // Programmatic change in value (including `stepUp()`/`stepDown()`) won't fire change event
	      numberInput.dispatchEvent(new CustomEvent('change', {
	        bubbles: true,
	        cancelable: false
	      }));
	    }
	
	    /**
	     * The map associating DOM element and number input UI instance.
	     * @member NumberInput.components
	     * @type {WeakMap}
	     */
	
	
	    /**
	     * The component options.
	     * If `options` is specified in the constructor,
	     * {@linkcode NumberInput.create .create()}, or {@linkcode NumberInput.init .init()},
	     * properties in this object are overriden for the instance being create and how {@linkcode NumberInput.init .init()} works.
	     * @member NumberInput.options
	     * @type {Object}
	     * @property {string} selectorInit The CSS selector to find number input UIs.
	     */
	
	  }]);
	
	  return NumberInput;
	}((0, _mixin3.default)(_createComponent2.default, _initComponentBySearch2.default));
	
	NumberInput.components = new WeakMap();
	NumberInput.options = {
	  selectorInit: '[data-numberinput]'
	};
	exports.default = NumberInput;

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _mixin2 = __webpack_require__(3);
	
	var _mixin3 = _interopRequireDefault(_mixin2);
	
	var _createComponent = __webpack_require__(4);
	
	var _createComponent2 = _interopRequireDefault(_createComponent);
	
	var _initComponentBySearch = __webpack_require__(5);
	
	var _initComponentBySearch2 = _interopRequireDefault(_initComponentBySearch);
	
	var _eventedState = __webpack_require__(14);
	
	var _eventedState2 = _interopRequireDefault(_eventedState);
	
	var _eventMatches = __webpack_require__(11);
	
	var _eventMatches2 = _interopRequireDefault(_eventMatches);
	
	__webpack_require__(8);
	
	__webpack_require__(6);
	
	__webpack_require__(7);
	
	__webpack_require__(15);
	
	var _resize = __webpack_require__(29);
	
	var _resize2 = _interopRequireDefault(_resize);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var ResponsiveTable = function (_mixin) {
	  _inherits(ResponsiveTable, _mixin);
	
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
	    _classCallCheck(this, ResponsiveTable);
	
	    var _this = _possibleConstructorReturn(this, (ResponsiveTable.__proto__ || Object.getPrototypeOf(ResponsiveTable)).call(this, element, options));
	
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
	
	
	  _createClass(ResponsiveTable, [{
	    key: '_changeState',
	    value: function _changeState(detail, callback) {
	      this[this.constructor.eventHandlers[detail.group]](detail);
	      callback();
	    }
	
	    /**
	     * Toggles the state of this component specified by `data-event` attribute of the given element.
	     * @param {HTMLElement} element The element.
	     * @param {Event} evt The event trigging this action.
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
	     * MAGIC NUMBERS
	     * 38 = center of arrow position
	     * 5 = visual top nudge
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
	
	
	    /**
	     * On fire, create the parent child rows + striping
	     */
	
	  }]);
	
	  return ResponsiveTable;
	}((0, _mixin3.default)(_createComponent2.default, _initComponentBySearch2.default, _eventedState2.default));
	
	ResponsiveTable.components = new WeakMap();
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
	
	    var inputs = [].concat(_toConsumableArray(_this2.element.querySelectorAll(_this2.options.selectorCheckbox)));
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
	    var newExpandCells = [].concat(_toConsumableArray(_this2.element.querySelectorAll(_this2.options.selectorExpandCells)));
	    var newExpandableRows = [].concat(_toConsumableArray(_this2.element.querySelectorAll(_this2.options.selectorExpandableRows)));
	    var newParentRows = [].concat(_toConsumableArray(_this2.element.querySelectorAll(_this2.options.selectorParentRows)));
	
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
	        var mergedExpandableRows = [].concat(_toConsumableArray(_this2.expandableRows), _toConsumableArray(diffExpandableRows));
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

/***/ },
/* 29 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	// mdn resize function
	
	var optimizedResize = function optimizedResize() {
	  var callbacks = [];
	  var running = false;
	
	  // run the actual callbacks
	  function runCallbacks() {
	    callbacks.forEach(function (callback) {
	      callback();
	    });
	
	    running = false;
	  }
	
	  // fired on resize event
	  function resize() {
	    if (!running) {
	      running = true;
	
	      if (window.requestAnimationFrame) {
	        window.requestAnimationFrame(runCallbacks);
	      } else {
	        setTimeout(runCallbacks, 66);
	      }
	    }
	  }
	
	  // adds callback to loop
	  function addCallback(callback) {
	    if (callback) {
	      callbacks.push(callback);
	    }
	  }
	
	  return {
	    // public method to add additional callback
	    add: function add(callback) {
	      if (!callbacks.length) {
	        window.addEventListener('resize', resize);
	      }
	      addCallback(callback);
	    }
	  };
	}();
	
	exports.default = optimizedResize;

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _mixin2 = __webpack_require__(3);
	
	var _mixin3 = _interopRequireDefault(_mixin2);
	
	var _createComponent = __webpack_require__(4);
	
	var _createComponent2 = _interopRequireDefault(_createComponent);
	
	var _initComponentByEvent = __webpack_require__(10);
	
	var _initComponentByEvent2 = _interopRequireDefault(_initComponentByEvent);
	
	__webpack_require__(15);
	
	__webpack_require__(6);
	
	var _eventMatches = __webpack_require__(11);
	
	var _eventMatches2 = _interopRequireDefault(_eventMatches);
	
	__webpack_require__(7);
	
	var _toggleClass = __webpack_require__(16);
	
	var _toggleClass2 = _interopRequireDefault(_toggleClass);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Table = function (_mixin) {
	  _inherits(Table, _mixin);
	
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
	    _classCallCheck(this, Table);
	
	    var _this = _possibleConstructorReturn(this, (Table.__proto__ || Object.getPrototypeOf(Table)).call(this, element, options));
	
	    _this.element.addEventListener('click', function (event) {
	      _this.handleClick(event);
	    });
	    return _this;
	  }
	
	  /**
	   * A method called when this widget is created upon clicking.
	   * @param {Event} event The event triggering the creation.
	   */
	
	
	  _createClass(Table, [{
	    key: 'createdByEvent',
	    value: function createdByEvent(event) {
	      this.handleClick(event);
	    }
	
	    /**
	     * Handles click on data table.
	     * * If the click is on a column title, toggles its sorting state.
	     * * If the click is on a check box, toggles the check box.
	     * @param {Event} event The event triggering this method.
	     */
	
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
	
	    /**
	     * The callback called once toggling is finished or is canceled.
	     * @callback Table~toggleStateCallback
	     * @param {Error} error
	     *   An error object with `true` in its `canceled` property if the toggling is canceled.
	     *   Cancellation happens if the handler of a custom event, that is fired before toggling happens,
	     *   calls `.preventDefault()` against the event.
	     * @param {HTMLElement} element The toggled element.
	     * @param {boolean} newState The new toggle state.
	     */
	
	    /**
	     * Toggles a sorting state or a check box's state.
	     * @param {string} type
	     *   Specifies what state to toggle:
	     *   * `"Sort"` for toggling a sorting state.
	     *   * `"Check"` for toggling a check box's state.
	     * @param {HTMLElement} element The DOM element to toggle its state.
	     * @param {Table~toggleStateCallback} callback The callback called once toggling is finished or is canceled.
	     */
	
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
	
	    /**
	     * The map associating DOM element and data table instance.
	     * @member Table.components
	     * @type {WeakMap}
	     */
	
	
	    /**
	     * The component options.
	     * If `options` is specified in the constructor, {@linkcode Table.create .create()}, or {@linkcode Table.init .init()},
	     * properties in this object are overriden for the instance being create and how {@linkcode Table.init .init()} works.
	     * @member Table.options
	     * @type {Object}
	     * @property {string} selectorInit The CSS selector to find data tables.
	     * @property {string} [selectorTitle] The CSS selector to find column titles.
	     * @property {string} [selectorRow] The CSS selector to find rows.
	     * @property {string} [selectorCheckbox] The CSS selector to find check boxes.
	     * @property {string} [classSortState] The CSS class for the sorting state.
	     * @property {string} [classCheckState] The CSS class for the checked state.
	     * @property {string} [eventBeforeSortToggled] The name of the custom event fired before a column's sorting is toggled.
	     * @property {string} [eventAfterSortToggled] The name of the custom event fired after a column's sorting is toggled.
	     * @property {string} [eventBeforeCheckToggled] The name of the custom event fired before a check box is toggled.
	     * @property {string} [eventAfterCheckToggled] The name of the custom event fired after a check box is toggled.
	     */
	
	  }]);
	
	  return Table;
	}((0, _mixin3.default)(_createComponent2.default, _initComponentByEvent2.default));
	
	Table.components = new WeakMap();
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

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	var _lodash = __webpack_require__(32);
	
	var _lodash2 = _interopRequireDefault(_lodash);
	
	var _mixin2 = __webpack_require__(3);
	
	var _mixin3 = _interopRequireDefault(_mixin2);
	
	var _createComponent = __webpack_require__(4);
	
	var _createComponent2 = _interopRequireDefault(_createComponent);
	
	var _initComponentBySearch = __webpack_require__(5);
	
	var _initComponentBySearch2 = _interopRequireDefault(_initComponentBySearch);
	
	__webpack_require__(8);
	
	__webpack_require__(6);
	
	__webpack_require__(7);
	
	var _on = __webpack_require__(12);
	
	var _on2 = _interopRequireDefault(_on);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var DetailPageHeader = function (_mixin) {
	  _inherits(DetailPageHeader, _mixin);
	
	  /**
	   * The Detail Page Header.
	   * @extends CreateComponent
	   * @extends InitComponentBySearch
	   * @param {HTMLElement} element The element working as a page header.
	   * @param {Object} [options] The component options.
	   */
	  function DetailPageHeader(element, options) {
	    _classCallCheck(this, DetailPageHeader);
	
	    // Debounce scroll event calls to handleScroll
	    var _this = _possibleConstructorReturn(this, (DetailPageHeader.__proto__ || Object.getPrototypeOf(DetailPageHeader)).call(this, element, options));
	
	    var debouncedScroll = (0, _lodash2.default)(_this.handleScroll.bind(_this), 50);
	
	    _this.hScroll = (0, _on2.default)(_this.element.ownerDocument.defaultView, 'scroll', debouncedScroll);
	    return _this;
	  }
	
	  /**
	   * Adds class to header based on users position on the page
	   */
	
	
	  _createClass(DetailPageHeader, [{
	    key: 'handleScroll',
	    value: function handleScroll() {
	      if (this.element.ownerDocument.defaultView.scrollY > 101) {
	        this.element.classList.add(this.options.slideUp);
	      } else {
	        this.element.classList.remove(this.options.slideUp);
	      }
	    }
	
	    /**
	     * Cleans up stuffs specific to this widget.
	     */
	
	  }, {
	    key: 'release',
	    value: function release() {
	      this.hScroll.release();
	      _get(DetailPageHeader.prototype.__proto__ || Object.getPrototypeOf(DetailPageHeader.prototype), 'release', this).call(this);
	    }
	
	    /**
	     * The map associating DOM element and detail page header instance.
	     * @member DetailPageHeader.components
	     * @type {WeakMap}
	     */
	
	
	    /**
	     * The component options.
	     * If `options` is specified in the constructor,
	     * {@linkcode DetailPageHeader.create .create()}, or {@linkcode DetailPageHeader.init .init()},
	     * properties in this object are overriden for the instance being created
	     * and how {@linkcode DetailPageHeader.init .init()} works.
	     * @member DetailPageHeader.options
	     * @type {Object}
	     * @property {string} selectorInit The CSS selector to find detail page headers.
	     */
	
	  }]);
	
	  return DetailPageHeader;
	}((0, _mixin3.default)(_createComponent2.default, _initComponentBySearch2.default));
	
	DetailPageHeader.components = new WeakMap();
	DetailPageHeader.options = {
	  slideUp: 'bx--detail-page-header--with-tabs--animated-slide-up',
	  selectorInit: '[data-detail-page-header]'
	};
	exports.default = DetailPageHeader;

/***/ },
/* 32 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {/**
	 * lodash (Custom Build) <https://lodash.com/>
	 * Build: `lodash modularize exports="npm" -o ./`
	 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
	 * Released under MIT license <https://lodash.com/license>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 */
	
	/** Used as the `TypeError` message for "Functions" methods. */
	var FUNC_ERROR_TEXT = 'Expected a function';
	
	/** Used as references for various `Number` constants. */
	var NAN = 0 / 0;
	
	/** `Object#toString` result references. */
	var symbolTag = '[object Symbol]';
	
	/** Used to match leading and trailing whitespace. */
	var reTrim = /^\s+|\s+$/g;
	
	/** Used to detect bad signed hexadecimal string values. */
	var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;
	
	/** Used to detect binary string values. */
	var reIsBinary = /^0b[01]+$/i;
	
	/** Used to detect octal string values. */
	var reIsOctal = /^0o[0-7]+$/i;
	
	/** Built-in method references without a dependency on `root`. */
	var freeParseInt = parseInt;
	
	/** Detect free variable `global` from Node.js. */
	var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;
	
	/** Detect free variable `self`. */
	var freeSelf = typeof self == 'object' && self && self.Object === Object && self;
	
	/** Used as a reference to the global object. */
	var root = freeGlobal || freeSelf || Function('return this')();
	
	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;
	
	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeMax = Math.max,
	    nativeMin = Math.min;
	
	/**
	 * Gets the timestamp of the number of milliseconds that have elapsed since
	 * the Unix epoch (1 January 1970 00:00:00 UTC).
	 *
	 * @static
	 * @memberOf _
	 * @since 2.4.0
	 * @category Date
	 * @returns {number} Returns the timestamp.
	 * @example
	 *
	 * _.defer(function(stamp) {
	 *   console.log(_.now() - stamp);
	 * }, _.now());
	 * // => Logs the number of milliseconds it took for the deferred invocation.
	 */
	var now = function() {
	  return root.Date.now();
	};
	
	/**
	 * Creates a debounced function that delays invoking `func` until after `wait`
	 * milliseconds have elapsed since the last time the debounced function was
	 * invoked. The debounced function comes with a `cancel` method to cancel
	 * delayed `func` invocations and a `flush` method to immediately invoke them.
	 * Provide `options` to indicate whether `func` should be invoked on the
	 * leading and/or trailing edge of the `wait` timeout. The `func` is invoked
	 * with the last arguments provided to the debounced function. Subsequent
	 * calls to the debounced function return the result of the last `func`
	 * invocation.
	 *
	 * **Note:** If `leading` and `trailing` options are `true`, `func` is
	 * invoked on the trailing edge of the timeout only if the debounced function
	 * is invoked more than once during the `wait` timeout.
	 *
	 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
	 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
	 *
	 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
	 * for details over the differences between `_.debounce` and `_.throttle`.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Function
	 * @param {Function} func The function to debounce.
	 * @param {number} [wait=0] The number of milliseconds to delay.
	 * @param {Object} [options={}] The options object.
	 * @param {boolean} [options.leading=false]
	 *  Specify invoking on the leading edge of the timeout.
	 * @param {number} [options.maxWait]
	 *  The maximum time `func` is allowed to be delayed before it's invoked.
	 * @param {boolean} [options.trailing=true]
	 *  Specify invoking on the trailing edge of the timeout.
	 * @returns {Function} Returns the new debounced function.
	 * @example
	 *
	 * // Avoid costly calculations while the window size is in flux.
	 * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
	 *
	 * // Invoke `sendMail` when clicked, debouncing subsequent calls.
	 * jQuery(element).on('click', _.debounce(sendMail, 300, {
	 *   'leading': true,
	 *   'trailing': false
	 * }));
	 *
	 * // Ensure `batchLog` is invoked once after 1 second of debounced calls.
	 * var debounced = _.debounce(batchLog, 250, { 'maxWait': 1000 });
	 * var source = new EventSource('/stream');
	 * jQuery(source).on('message', debounced);
	 *
	 * // Cancel the trailing debounced invocation.
	 * jQuery(window).on('popstate', debounced.cancel);
	 */
	function debounce(func, wait, options) {
	  var lastArgs,
	      lastThis,
	      maxWait,
	      result,
	      timerId,
	      lastCallTime,
	      lastInvokeTime = 0,
	      leading = false,
	      maxing = false,
	      trailing = true;
	
	  if (typeof func != 'function') {
	    throw new TypeError(FUNC_ERROR_TEXT);
	  }
	  wait = toNumber(wait) || 0;
	  if (isObject(options)) {
	    leading = !!options.leading;
	    maxing = 'maxWait' in options;
	    maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
	    trailing = 'trailing' in options ? !!options.trailing : trailing;
	  }
	
	  function invokeFunc(time) {
	    var args = lastArgs,
	        thisArg = lastThis;
	
	    lastArgs = lastThis = undefined;
	    lastInvokeTime = time;
	    result = func.apply(thisArg, args);
	    return result;
	  }
	
	  function leadingEdge(time) {
	    // Reset any `maxWait` timer.
	    lastInvokeTime = time;
	    // Start the timer for the trailing edge.
	    timerId = setTimeout(timerExpired, wait);
	    // Invoke the leading edge.
	    return leading ? invokeFunc(time) : result;
	  }
	
	  function remainingWait(time) {
	    var timeSinceLastCall = time - lastCallTime,
	        timeSinceLastInvoke = time - lastInvokeTime,
	        result = wait - timeSinceLastCall;
	
	    return maxing ? nativeMin(result, maxWait - timeSinceLastInvoke) : result;
	  }
	
	  function shouldInvoke(time) {
	    var timeSinceLastCall = time - lastCallTime,
	        timeSinceLastInvoke = time - lastInvokeTime;
	
	    // Either this is the first call, activity has stopped and we're at the
	    // trailing edge, the system time has gone backwards and we're treating
	    // it as the trailing edge, or we've hit the `maxWait` limit.
	    return (lastCallTime === undefined || (timeSinceLastCall >= wait) ||
	      (timeSinceLastCall < 0) || (maxing && timeSinceLastInvoke >= maxWait));
	  }
	
	  function timerExpired() {
	    var time = now();
	    if (shouldInvoke(time)) {
	      return trailingEdge(time);
	    }
	    // Restart the timer.
	    timerId = setTimeout(timerExpired, remainingWait(time));
	  }
	
	  function trailingEdge(time) {
	    timerId = undefined;
	
	    // Only invoke if we have `lastArgs` which means `func` has been
	    // debounced at least once.
	    if (trailing && lastArgs) {
	      return invokeFunc(time);
	    }
	    lastArgs = lastThis = undefined;
	    return result;
	  }
	
	  function cancel() {
	    if (timerId !== undefined) {
	      clearTimeout(timerId);
	    }
	    lastInvokeTime = 0;
	    lastArgs = lastCallTime = lastThis = timerId = undefined;
	  }
	
	  function flush() {
	    return timerId === undefined ? result : trailingEdge(now());
	  }
	
	  function debounced() {
	    var time = now(),
	        isInvoking = shouldInvoke(time);
	
	    lastArgs = arguments;
	    lastThis = this;
	    lastCallTime = time;
	
	    if (isInvoking) {
	      if (timerId === undefined) {
	        return leadingEdge(lastCallTime);
	      }
	      if (maxing) {
	        // Handle invocations in a tight loop.
	        timerId = setTimeout(timerExpired, wait);
	        return invokeFunc(lastCallTime);
	      }
	    }
	    if (timerId === undefined) {
	      timerId = setTimeout(timerExpired, wait);
	    }
	    return result;
	  }
	  debounced.cancel = cancel;
	  debounced.flush = flush;
	  return debounced;
	}
	
	/**
	 * Checks if `value` is the
	 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
	 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
	 * @example
	 *
	 * _.isObject({});
	 * // => true
	 *
	 * _.isObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isObject(_.noop);
	 * // => true
	 *
	 * _.isObject(null);
	 * // => false
	 */
	function isObject(value) {
	  var type = typeof value;
	  return !!value && (type == 'object' || type == 'function');
	}
	
	/**
	 * Checks if `value` is object-like. A value is object-like if it's not `null`
	 * and has a `typeof` result of "object".
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	 * @example
	 *
	 * _.isObjectLike({});
	 * // => true
	 *
	 * _.isObjectLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isObjectLike(_.noop);
	 * // => false
	 *
	 * _.isObjectLike(null);
	 * // => false
	 */
	function isObjectLike(value) {
	  return !!value && typeof value == 'object';
	}
	
	/**
	 * Checks if `value` is classified as a `Symbol` primitive or object.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
	 * @example
	 *
	 * _.isSymbol(Symbol.iterator);
	 * // => true
	 *
	 * _.isSymbol('abc');
	 * // => false
	 */
	function isSymbol(value) {
	  return typeof value == 'symbol' ||
	    (isObjectLike(value) && objectToString.call(value) == symbolTag);
	}
	
	/**
	 * Converts `value` to a number.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to process.
	 * @returns {number} Returns the number.
	 * @example
	 *
	 * _.toNumber(3.2);
	 * // => 3.2
	 *
	 * _.toNumber(Number.MIN_VALUE);
	 * // => 5e-324
	 *
	 * _.toNumber(Infinity);
	 * // => Infinity
	 *
	 * _.toNumber('3.2');
	 * // => 3.2
	 */
	function toNumber(value) {
	  if (typeof value == 'number') {
	    return value;
	  }
	  if (isSymbol(value)) {
	    return NAN;
	  }
	  if (isObject(value)) {
	    var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
	    value = isObject(other) ? (other + '') : other;
	  }
	  if (typeof value != 'string') {
	    return value === 0 ? value : +value;
	  }
	  value = value.replace(reTrim, '');
	  var isBinary = reIsBinary.test(value);
	  return (isBinary || reIsOctal.test(value))
	    ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
	    : (reIsBadHex.test(value) ? NAN : +value);
	}
	
	module.exports = debounce;
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	var _mixin2 = __webpack_require__(3);
	
	var _mixin3 = _interopRequireDefault(_mixin2);
	
	var _createComponent = __webpack_require__(4);
	
	var _createComponent2 = _interopRequireDefault(_createComponent);
	
	var _initComponentBySearch = __webpack_require__(5);
	
	var _initComponentBySearch2 = _interopRequireDefault(_initComponentBySearch);
	
	__webpack_require__(8);
	
	__webpack_require__(6);
	
	__webpack_require__(7);
	
	__webpack_require__(15);
	
	var _eventMatches = __webpack_require__(11);
	
	var _eventMatches2 = _interopRequireDefault(_eventMatches);
	
	var _on = __webpack_require__(12);
	
	var _on2 = _interopRequireDefault(_on);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var LeftNav = function (_mixin) {
	  _inherits(LeftNav, _mixin);
	
	  /**
	   * Left Navigation.
	   * @extends CreateComponent
	   * @extends InitComponentBySearch
	   * @param {HTMLElement} element The element working as a left navigation.
	   * @param {Object} [options] The component options
	   * @param {string} [options.selectorLeftNav] The data attribute selector for the nav element in the left nav container.
	   * @param {string} [options.selectorLeftNavList] The data attribute selector for the main ul element in the left nav.
	   * @param {string} [options.selectorLeftNavToggle]
	   *   The data attribute selector for the button that will show and hide the left navigation.
	   * @param {string} [options.selectorLeftNavListItem] The data attribute selector for all list items in the left navigation.
	   * @param {string} [options.selectorLeftNavCurrentPage]
	   *   The data attribute selector for the current section title in the left nav header.
	   * @param {string} [options.classActiveLeftNav] The class name for when a left nav is active.
	   * @param {string} [options.classActiveLeftNavListItem] The class name for when a left nav list item is active.
	   * @param {string} [options.classActiveSection] The class name for an active section item in the left nav header.
	   */
	  function LeftNav(element, options) {
	    _classCallCheck(this, LeftNav);
	
	    var _this = _possibleConstructorReturn(this, (LeftNav.__proto__ || Object.getPrototypeOf(LeftNav)).call(this, element, options));
	
	    _this.leftNavSectionActive = false;
	    _this.focusIndex = 0;
	    _this.hookOpenActions();
	    _this.hookListItemsEvents();
	    _this.hDocumentClick = (0, _on2.default)(_this.element.ownerDocument, 'click', function (evt) {
	      _this.handleDocumentClick(evt);
	    });
	    return _this;
	  }
	
	  /**
	   * Closes the menu.
	   */
	
	
	  _createClass(LeftNav, [{
	    key: 'closeMenu',
	    value: function closeMenu() {
	      this.element.classList.remove(this.options.classActiveLeftNav);
	      var toggleOpenNode = this.element.ownerDocument.querySelector(this.options.selectorLeftNavToggleOpen);
	      toggleOpenNode.classList.remove(this.options.classActiveTrigger);
	      this.element.querySelector(this.options.selectorLeftNav).parentNode.setAttribute('aria-expanded', 'false');
	      toggleOpenNode.removeAttribute('aria-expanded');
	    }
	
	    /**
	     * Toggles the menu to open and close.
	     */
	
	  }, {
	    key: 'toggleMenu',
	    value: function toggleMenu() {
	      var leftNavContainer = this.element.querySelector(this.options.selectorLeftNav).parentNode;
	      this.element.classList.toggle(this.options.classActiveLeftNav);
	      var toggleOpenNode = this.element.ownerDocument.querySelector(this.options.selectorLeftNavToggleOpen);
	      toggleOpenNode.classList.toggle(this.options.classActiveTrigger);
	      if (leftNavContainer.getAttribute('aria-expanded') === 'false') {
	        leftNavContainer.setAttribute('aria-expanded', 'true');
	        toggleOpenNode.setAttribute('aria-expanded', 'true');
	        this.focusIndex = 0;
	      } else {
	        leftNavContainer.setAttribute('aria-expanded', 'false');
	        toggleOpenNode.removeAttribute('aria-expanded');
	      }
	    }
	  }, {
	    key: 'onKeyDown',
	    value: function onKeyDown(evt) {
	      var leftNavContainer = document.querySelector('[data-left-nav]');
	      var navItems = [].concat(_toConsumableArray(leftNavContainer.getElementsByClassName('bx--parent-item__link')));
	
	      var visibleNavItems = navItems.filter(function (item) {
	        return window.getComputedStyle(item.parentElement).display !== 'none';
	      });
	
	      var button = [].concat(_toConsumableArray(document.getElementsByClassName('bx--left-nav__trigger')));
	      visibleNavItems.unshift(button[0]);
	
	      switch (evt.which) {
	        case 9:
	          // tab
	          if (evt.shiftKey) {
	            if (this.focusIndex > 0) {
	              this.focusIndex--;
	            } else {
	              this.closeMenu();
	            }
	          }
	
	          if (!evt.shiftKey) {
	            if (this.focusIndex < visibleNavItems.length - 1) {
	              this.focusIndex++;
	            } else {
	              this.closeMenu();
	            }
	          }
	          break;
	
	        case 38:
	          // arrow up
	          if (this.focusIndex > 0) {
	            this.focusIndex--;
	          }
	          visibleNavItems[this.focusIndex].focus();
	          break;
	
	        case 40:
	          // arrow down
	          if (this.focusIndex < visibleNavItems.length - 1) {
	            this.focusIndex++;
	          }
	          visibleNavItems[this.focusIndex].focus();
	          break;
	
	        case 36:
	          // home
	          this.focusIndex = 1;
	          visibleNavItems[this.focusIndex].focus();
	          break;
	
	        case 35:
	          // end
	          this.focusIndex = visibleNavItems.length - 1;
	          visibleNavItems[this.focusIndex].focus();
	          break;
	
	        default:
	          break;
	      }
	    }
	  }, {
	    key: 'hookOpenActions',
	    value: function hookOpenActions() {
	      var _this2 = this;
	
	      var openBtn = this.element.ownerDocument.querySelector(this.options.selectorLeftNavToggleOpen);
	      // on btn click or enter press or space press
	      openBtn.addEventListener('click', function () {
	        _this2.toggleMenu();
	      });
	
	      // on esc press
	      this.element.ownerDocument.addEventListener('keydown', function (evt) {
	        if (evt.which === 27 && _this2.element.classList.contains(_this2.options.classActiveLeftNav)) {
	          openBtn.focus();
	          _this2.closeMenu();
	        } else {
	          var toggleOpen = _this2.element.ownerDocument.querySelector(_this2.options.selectorLeftNavToggleOpen);
	          if (toggleOpen.classList.contains(_this2.options.classActiveTrigger)) {
	            _this2.onKeyDown = _this2.onKeyDown.bind(_this2);
	            _this2.onKeyDown(evt);
	          }
	        }
	      });
	    }
	
	    /**
	     * Adds event listeners to list items
	     */
	
	  }, {
	    key: 'hookListItemsEvents',
	    value: function hookListItemsEvents() {
	      var _this3 = this;
	
	      var leftNavList = [].concat(_toConsumableArray(this.element.querySelectorAll(this.options.selectorLeftNavList)));
	      leftNavList.forEach(function (list) {
	        // on mouse click
	        list.addEventListener('click', function (evt) {
	          var leftNavItem = (0, _eventMatches2.default)(evt, _this3.options.selectorLeftNavListItem);
	          if (leftNavItem) _this3.addActiveListItem(leftNavItem);
	        });
	        // on enter press
	        list.addEventListener('keydown', function (evt) {
	          if (evt.which === 13) {
	            var leftNavItem = (0, _eventMatches2.default)(evt, _this3.options.selectorLeftNavListItem);
	            if (leftNavItem) _this3.addActiveListItem(leftNavItem);
	          }
	        });
	      });
	    }
	
	    /**
	     * Sets a list item as active.
	     * @param {Object} item The active list item.
	     */
	
	  }, {
	    key: 'addActiveListItem',
	    value: function addActiveListItem(item) {
	      var _this4 = this;
	
	      [].concat(_toConsumableArray(this.element.querySelectorAll(this.options.selectorLeftNavListItem))).forEach(function (currentItem) {
	        if (!(item === currentItem)) {
	          if (!currentItem.contains(item)) {
	            currentItem.classList.remove(_this4.options.classActiveLeftNavListItem);
	          } else {
	            currentItem.classList.add(_this4.options.classActiveLeftNavListItem);
	          }
	        }
	      });
	
	      item.classList.add(this.options.classActiveLeftNavListItem);
	      this.closeMenu();
	    }
	
	    /**
	     * Handles click on the document.
	     * Closes the left navigation when document is clicked outside the left navigation.
	     * @param {Event} event The event triggering this method.
	     */
	
	  }, {
	    key: 'handleDocumentClick',
	    value: function handleDocumentClick(evt) {
	      var clickTarget = evt.target;
	      var isOfSelf = this.element.contains(clickTarget);
	      var isToggleBtn = this.element.ownerDocument.querySelector(this.options.selectorLeftNavToggleOpen).contains(clickTarget);
	      var isOpen = this.element.classList.contains(this.options.classActiveLeftNav);
	      var isUnifiedHeader = this.element.ownerDocument.querySelector('[data-unified-header]').contains(clickTarget);
	      var shouldClose = !isOfSelf && isOpen && !isToggleBtn && !isUnifiedHeader;
	
	      if (isOfSelf && this.element.tagName === 'A') {
	        evt.preventDefault();
	      }
	      if (shouldClose) {
	        this.closeMenu();
	      }
	    }
	  }, {
	    key: 'release',
	    value: function release() {
	      if (this.hDocumentClick) {
	        this.hDocumentClick = this.hDocumentClick.release();
	      }
	      _get(LeftNav.prototype.__proto__ || Object.getPrototypeOf(LeftNav.prototype), 'release', this).call(this);
	    }
	
	    /**
	     * The component options.
	     * If `options` is specified in the constructor, {@linkcode LeftNav.create .create()}, or {@linkcode LeftNav.init .init()},
	     * properties in this object are overriden for the instance being create and how {@linkcode LeftNav.init .init()} works.
	     * @member LeftNav.options
	     * @type {Object}
	     * @property {string} selectorInit The CSS selector to find left nav containers.
	     * @property {string} [selectorLeftNav] The data attribute selector for the nav element in the left nav container.
	     * @property {string} [selectorLeftNavList] The data attribute selector for the main ul element in the left nav.
	     * @property {string} [selectorLeftNavToggle]
	     *   The data attribute selector for the button that will show and hide the left navigation.
	     * @property {string} [selectorLeftNavListItem] The data attribute selector for all list items in the left navigation.
	     * @property {string} [selectorLeftNavCurrentPage]
	     *   The data attribute selector for the current section title in the left nav header.
	     * @property {string} [classActiveLeftNav] The class name for when a left nav is active.
	     * @property {string} [classActiveLeftNavListItem] The class name for when a left nav list item is active.
	     * @property {string} [classActiveSection] The class name for an active section item in the left nav header.
	     */
	
	
	    /**
	     * The map associating DOM element and left navigation instance.
	     * @member LeftNav.components
	     * @type {WeakMap}
	     */
	
	  }]);
	
	  return LeftNav;
	}((0, _mixin3.default)(_createComponent2.default, _initComponentBySearch2.default));
	
	LeftNav.options = {
	  selectorInit: '[data-left-nav-container]',
	  // Data Attribute selectors
	  selectorLeftNav: '[data-left-nav]',
	  selectorLeftNavList: '[data-left-nav-list]',
	  selectorLeftNavToggleOpen: '[data-left-nav-toggle="open"]',
	  selectorLeftNavToggleClose: '[data-left-nav-toggle="close"]',
	  selectorLeftNavListItem: '[data-left-nav-item]',
	  selectorLeftNavListItemLink: '[data-left-nav-item-link]',
	  // CSS Class Selectors
	  classActiveTrigger: 'bx--left-nav__trigger--active',
	  classActiveLeftNav: 'bx--left-nav--active',
	  classActiveLeftNavListItem: 'bx--active-list-item',
	  classItemFade: 'bx--main-nav__parent-item--fade',
	  classItemHidden: 'bx--main-nav__parent-item--hidden',
	  classListHidden: 'bx--left-nav__main-nav--hidden',
	  classListTop: 'bx--left-nav__main-nav--top'
	};
	LeftNav.components = new WeakMap();
	exports.default = LeftNav;

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _mixin2 = __webpack_require__(3);
	
	var _mixin3 = _interopRequireDefault(_mixin2);
	
	var _createComponent = __webpack_require__(4);
	
	var _createComponent2 = _interopRequireDefault(_createComponent);
	
	var _initComponentBySearch = __webpack_require__(5);
	
	var _initComponentBySearch2 = _interopRequireDefault(_initComponentBySearch);
	
	__webpack_require__(8);
	
	__webpack_require__(6);
	
	__webpack_require__(7);
	
	__webpack_require__(15);
	
	var _toggleClass = __webpack_require__(16);
	
	var _toggleClass2 = _interopRequireDefault(_toggleClass);
	
	var _eventMatches = __webpack_require__(11);
	
	var _eventMatches2 = _interopRequireDefault(_eventMatches);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var InlineLeftNav = function (_mixin) {
	  _inherits(InlineLeftNav, _mixin);
	
	  /**
	   * Spinner indicating loading state.
	   * @extends CreateComponent
	   * @extends InitComponentBySearch
	   * @param {HTMLElement} element The element working as a spinner.
	   * @param {Object} options The component options.
	   */
	  function InlineLeftNav(element, options) {
	    _classCallCheck(this, InlineLeftNav);
	
	    var _this = _possibleConstructorReturn(this, (InlineLeftNav.__proto__ || Object.getPrototypeOf(InlineLeftNav)).call(this, element, options));
	
	    _this.hookListItemsEvents = function () {
	      _this.element.addEventListener('click', function (evt) {
	        var leftNavItem = (0, _eventMatches2.default)(evt, _this.options.selectorLeftNavListItem);
	        var collapseEl = (0, _eventMatches2.default)(evt, _this.options.selectorLeftNavCollapse);
	        var collapsedBar = (0, _eventMatches2.default)(evt, '.' + _this.options.classLeftNavCollapsed);
	
	        if (leftNavItem) {
	          var childItem = (0, _eventMatches2.default)(evt, _this.options.selectorLeftNavNestedListItem);
	          var hasChildren = leftNavItem.classList.contains('left-nav-list__item--has-children');
	          if (childItem) {
	            _this.addActiveListItem(childItem);
	          } else if (hasChildren) {
	            _this.handleNestedListClick(leftNavItem, evt);
	          } else {
	            _this.addActiveListItem(leftNavItem);
	          }
	        }
	
	        if (collapseEl || collapsedBar) {
	          evt.preventDefault();
	          _this.toggleLeftNav();
	        }
	      });
	
	      _this.element.addEventListener('keydown', function (evt) {
	        var leftNavItemWithChildren = (0, _eventMatches2.default)(evt, _this.options.selectorLeftNavListItemHasChildren);
	        var leftNavItem = (0, _eventMatches2.default)(evt, _this.options.selectorLeftNavListItem);
	
	        if (leftNavItemWithChildren && evt.which === 13) {
	          _this.handleNestedListClick(leftNavItemWithChildren, evt);
	        } else if (leftNavItem && evt.which === 13) {
	          _this.addActiveListItem(leftNavItem);
	        }
	      });
	    };
	
	    _this.toggleLeftNav = function () {
	      var collapsed = _this.element.dataset.collapsed === 'true';
	      var eventStart = new CustomEvent(_this.options.eventBeforeLeftNavToggled, {
	        bubbles: true,
	        cancelable: true,
	        detail: { collapsed: !collapsed } // shows where the toggle is going, not where it is
	      });
	
	      if (_this.element.dispatchEvent(eventStart)) {
	        if (!collapsed) {
	          _this.element.dataset.collapsed = true;
	          _this.element.classList.add(_this.options.classLeftNavCollapsing);
	
	          window.setTimeout(function () {
	            _this.element.classList.remove(_this.options.classLeftNavCollapsing);
	            _this.element.classList.add(_this.options.classLeftNavCollapsed);
	            _this.element.dispatchEvent(new CustomEvent(_this.options.eventAfterLeftNavToggled, {
	              bubbles: true,
	              cancelable: true,
	              detail: { collapsed: true }
	            }));
	          }, 250);
	        } else {
	          _this.element.dataset.collapsed = false;
	          _this.element.classList.remove(_this.options.classLeftNavCollapsed);
	          _this.element.classList.add(_this.options.classLeftNavExpanding);
	
	          window.setTimeout(function () {
	            _this.element.classList.remove(_this.options.classLeftNavExpanding);
	            _this.element.dispatchEvent(new CustomEvent(_this.options.eventAfterLeftNavToggled, {
	              bubbles: true,
	              cancelable: true,
	              detail: { collapsed: false }
	            }));
	          }, 250);
	        }
	      }
	    };
	
	    _this.constructor.components.set(_this.element, _this);
	    _this.hookListItemsEvents();
	    return _this;
	  }
	
	  _createClass(InlineLeftNav, [{
	    key: 'addActiveListItem',
	    value: function addActiveListItem(item) {
	      var _this2 = this;
	
	      [].concat(_toConsumableArray(this.element.querySelectorAll(this.options.selectorLeftNavListItem))).forEach(function (currentItem) {
	        if (!(item === currentItem)) {
	          currentItem.classList.remove(_this2.options.classActiveLeftNavListItem);
	        }
	      });
	      [].concat(_toConsumableArray(this.element.querySelectorAll(this.options.selectorLeftNavNestedListItem))).forEach(function (currentItem) {
	        if (!(item === currentItem)) {
	          currentItem.classList.remove(_this2.options.classActiveLeftNavListItem);
	        }
	      });
	      item.classList.add(this.options.classActiveLeftNavListItem);
	    }
	
	    /**
	     * Handles click on a list item that contains a nested list in the left navigation.
	     * The nested list is expanded and the icon is rotated.
	     * @param {HTMLElement} listItem The list item that was clicked.
	     * @param {Event} event The event triggering this method.
	     */
	
	  }, {
	    key: 'handleNestedListClick',
	    value: function handleNestedListClick(listItem, evt) {
	      var _this3 = this;
	
	      var allNestedItems = [].concat(_toConsumableArray(document.querySelectorAll(this.options.selectorLeftNavListItemHasChildren)));
	      var isOpen = listItem.classList.contains(this.options.classExpandedLeftNavListItem);
	      allNestedItems.forEach(function (currentItem) {
	        if (currentItem !== listItem) {
	          (0, _toggleClass2.default)(currentItem, _this3.options.classExpandedLeftNavListItem, false);
	        }
	      });
	      if (!('inlineLeftNavItemLink' in evt.target.dataset)) {
	        (0, _toggleClass2.default)(listItem, this.options.classExpandedLeftNavListItem, !isOpen);
	      }
	      var list = listItem.querySelector(this.options.selectorLeftNavNestedList);
	      var listItems = [].concat(_toConsumableArray(list.querySelectorAll(this.options.selectorLeftNavNestedListItem)));
	      listItems.forEach(function (item) {
	        if (isOpen) {
	          // eslint-disable-next-line no-param-reassign
	          item.querySelector(_this3.options.selectorLeftNavListItemLink).tabIndex = -1;
	        } else {
	          // eslint-disable-next-line no-param-reassign
	          item.querySelector(_this3.options.selectorLeftNavListItemLink).tabIndex = 0;
	        }
	      });
	    }
	
	    /**
	     * The map associating DOM element and spinner instance.
	     * @member InlineLeftNav.components
	     * @type {WeakMap}
	     */
	
	
	    /**
	     * The component options.
	     * If `options` is specified in the constructor,
	     * {@linkcode InlineLeftNav.create .create()}, or {@linkcode InlineLeftNav.init .init()},
	     * properties in this object are overriden for the instance being create and how {@linkcode InlineLeftNav.init .init()} works.
	     * @member InlineLeftNav.options
	     * @type {Object}
	     * @property {string} selectorInit The CSS selector to find inline left navs.
	     */
	
	  }]);
	
	  return InlineLeftNav;
	}((0, _mixin3.default)(_createComponent2.default, _initComponentBySearch2.default));
	
	InlineLeftNav.components = new WeakMap();
	InlineLeftNav.options = {
	  selectorInit: '[data-inline-left-nav]',
	  // Data Attribute selectors
	  selectorLeftNavList: '[data-inline-left-nav-list]',
	  selectorLeftNavNestedList: '[data-inline-left-nav-nested-list]',
	  selectorLeftNavListItem: '[data-inline-left-nav-item]',
	  selectorLeftNavListItemLink: '[data-inline-left-nav-item-link]',
	  selectorLeftNavNestedListItem: '[data-inline-left-nav-nested-item]',
	  selectorLeftNavListItemHasChildren: '[data-inline-left-nav-with-children]',
	  selectorLeftNavCollapse: '[data-inline-left-nav-collapse]',
	  // CSS Class Selectors
	  classActiveLeftNavListItem: 'left-nav-list__item--active',
	  classExpandedLeftNavListItem: 'left-nav-list__item--expanded',
	  classLeftNavCollapsing: 'bx--inline-left-nav--collapsing',
	  classLeftNavCollapsed: 'bx--inline-left-nav--collapsed',
	  classLeftNavExpanding: 'bx--inline-left-nav--expanding',
	  // Event
	  eventBeforeLeftNavToggled: 'left-nav-beingtoggled',
	  eventAfterLeftNavToggled: 'left-nav-toggled'
	};
	exports.default = InlineLeftNav;

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	var _mixin2 = __webpack_require__(3);
	
	var _mixin3 = _interopRequireDefault(_mixin2);
	
	var _createComponent = __webpack_require__(4);
	
	var _createComponent2 = _interopRequireDefault(_createComponent);
	
	var _initComponentBySearch = __webpack_require__(5);
	
	var _initComponentBySearch2 = _interopRequireDefault(_initComponentBySearch);
	
	__webpack_require__(8);
	
	__webpack_require__(6);
	
	__webpack_require__(7);
	
	__webpack_require__(15);
	
	var _on = __webpack_require__(12);
	
	var _on2 = _interopRequireDefault(_on);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var ProfileSwitcher = function (_mixin) {
	  _inherits(ProfileSwitcher, _mixin);
	
	  /**
	   * Profile Switcher.
	   * @extends CreateComponent
	   * @extends InitComponentBySearch
	   * @param {HTMLElement} element The element working as a profile switcher.
	   * @param {Object} [options] The component options
	   * @param {string} [options.selectorProfileSwitcher] The data attribute selector for the profile switcher.
	   * @param {string} [options.selectorAccount]
	   *   The data attribute selector for the element containing the account name in the profile switcher.
	   * @param {string} [options.selectorOrg]
	   *   The data attribute selector for the element containing the organization name in the profile switcher.
	   * @param {string} [options.selectorSpace]
	   *   The data attribute selector for the element containing the space name in the profile switcher.
	   * @param {string} [options.selectorAccountDropdown]
	   *   The data attribute selector for the dropdown item containing the current account name.
	   * @param {string} [options.selectorOrgDropdown]
	   *   The data attribute selector for the dropdown item containing the current organization name.
	   * @param {string} [options.selectorSpaceDropdown]
	   *   The data attribute selector for the dropdown item containing the current space name.
	   */
	  function ProfileSwitcher(element, options) {
	    _classCallCheck(this, ProfileSwitcher);
	
	    var _this = _possibleConstructorReturn(this, (ProfileSwitcher.__proto__ || Object.getPrototypeOf(ProfileSwitcher)).call(this, element, options));
	
	    _this.hDocumentClick = (0, _on2.default)(_this.element.ownerDocument, 'click', function (evt) {
	      _this.handleDocumentClick(evt);
	    });
	
	    _this.element.addEventListener('dropdown-beingselected', function (event) {
	      if (event.target.querySelector(_this.options.selectorAccountDropdown) !== null) {
	        if (event.detail.item.querySelector(_this.options.classLinkedIcon) !== null) {
	          _this.element.linkedAccount = event.detail.item.querySelector(_this.options.selectorAccountSlLinked).cloneNode(true);
	          _this.element.isLinked = true;
	          _this.element.linkedIcon = event.detail.item.querySelector(_this.options.classLinkedIcon).cloneNode(true);
	        } else {
	          _this.element.linkedAccount = '';
	          _this.element.isLinked = false;
	          _this.element.linkedIcon = '';
	        }
	      }
	    });
	
	    _this.element.querySelector(_this.options.selectorToggle).addEventListener('keydown', function (event) {
	      _this.toggle(event);
	    });
	
	    _this.element.querySelector(_this.options.selectorToggle).addEventListener('mouseenter', function (event) {
	      _this.getLinkedData(event);
	      _this.determineSwitcherValues(true);
	    });
	
	    _this.element.querySelector(_this.options.selectorToggle).addEventListener('mouseleave', function (event) {
	      _this.getLinkedData(event);
	      _this.determineSwitcherValues(false);
	    });
	
	    _this.element.ownerDocument.addEventListener('keyup', function () {
	      return _this.handleBlur();
	    });
	    return _this;
	  }
	
	  /**
	   * Opens and closes the menu.
	   * @param {Event} event The event triggering this method.
	   */
	
	
	  _createClass(ProfileSwitcher, [{
	    key: 'toggle',
	    value: function toggle(event) {
	      var isOfSelf = this.element.contains(event.target);
	      if (event.which === 13 || event.which === 32) {
	        if (isOfSelf) {
	          this.element.classList.toggle(this.options.classSwitcherOpen);
	        } else if (!isOfSelf && this.element.classList.contains(this.options.classSwitcherOpen)) {
	          this.element.classList.remove(this.options.classSwitcherOpen);
	        }
	      }
	    }
	  }, {
	    key: 'getLinkedData',
	    value: function getLinkedData(event) {
	      if (event.target.querySelector(this.options.selectorLinkedAccount) !== null) {
	        if (event.target.querySelector(this.options.selectorLinkedAccount).textContent.length > 1) {
	          this.element.isLinked = true;
	        } else {
	          this.element.isLinked = false;
	        }
	      }
	    }
	  }, {
	    key: 'handleBlur',
	    value: function handleBlur() {
	      if (!this.element.contains(document.activeElement)) {
	        this.element.classList.remove(this.options.classSwitcherOpen);
	      }
	    }
	
	    /**
	     * Handles click on the document.
	     * Closes the profile switcherwhen document is clicked outside the left navigation or
	     * the user clicks the profile switcher while it is open.
	     * @param {Event} event The event triggering this method.
	     */
	
	  }, {
	    key: 'handleDocumentClick',
	    value: function handleDocumentClick(evt) {
	      var clickTarget = evt.target;
	      var isOfSelf = this.element.contains(clickTarget);
	      var isToggle = this.element.ownerDocument.querySelector(this.options.selectorToggle).contains(clickTarget);
	      var isOpen = this.element.classList.contains(this.options.classSwitcherOpen);
	
	      if (isOfSelf) {
	        if (isToggle && isOpen) {
	          this.element.classList.remove(this.options.classSwitcherOpen);
	        } else if (isOpen) {
	          this.determineSwitcherValues();
	        } else {
	          this.element.classList.add(this.options.classSwitcherOpen);
	        }
	      } else {
	        this.element.classList.remove(this.options.classSwitcherOpen);
	      }
	    }
	
	    /**
	     * Handles logic to determine what text to display in profile switcher.
	     * If the text is over 25 characters long, truncate and add ellipses.
	     * Also adds logic to change the switcher width based on the width of the hovered
	     * profile switcher
	     * @param {boolean} isHovered boolean value passed by the event listener on bx--toggle.
	     */
	
	  }, {
	    key: 'determineSwitcherValues',
	    value: function determineSwitcherValues(isHovered) {
	      var linkedElement = this.element.querySelector(this.options.selectorLinkedAccount);
	      var nameElement = this.element.querySelector(this.options.selectorAccount);
	      var regionElement = this.element.querySelector(this.options.selectorRegion);
	      var orgElement = this.element.querySelector(this.options.selectorOrg);
	      var spaceElement = this.element.querySelector(this.options.selectorSpace);
	      var menuElement = this.element.querySelector(this.options.selectorMenu);
	      var isOpen = this.element.classList.contains(this.options.classSwitcherOpen);
	
	      if (linkedElement) {
	        if (this.element.isLinked) {
	          if (this.element.linkedAccount) {
	            if (linkedElement.textContent.length) {
	              linkedElement.querySelector(this.options.selectorAccountSlLinked).textContent = this.element.linkedAccount.textContent;
	            } else {
	              linkedElement.appendChild(this.element.linkedAccount);
	              if (this.element.linkedIcon) {
	                linkedElement.appendChild(this.element.linkedIcon);
	              }
	            }
	          }
	        } else {
	          linkedElement.textContent = '';
	        }
	      }
	
	      var nameDropdownValue = '';
	      if (this.element.querySelector(this.options.selectorAccountDropdown)) {
	        if (this.element.isLinked) {
	          nameDropdownValue = this.element.querySelector(this.options.selectorAccountLinked).textContent;
	        } else {
	          nameDropdownValue = this.element.querySelector(this.options.selectorAccountDropdown).textContent;
	        }
	      }
	
	      var regionDropdownValue = '';
	      if (this.element.querySelector(this.options.selectorRegionDropdown)) {
	        regionDropdownValue = this.element.querySelector(this.options.selectorRegionDropdown).textContent;
	      }
	
	      var orgDropdownValue = '';
	      if (this.element.querySelector(this.options.selectorOrgDropdown)) {
	        orgDropdownValue = this.element.querySelector(this.options.selectorOrgDropdown).textContent;
	      }
	
	      var spaceDropdownValue = '';
	      if (this.element.querySelector(this.options.selectorSpaceDropdown)) {
	        spaceDropdownValue = this.element.querySelector(this.options.selectorSpaceDropdown).textContent;
	      }
	
	      var nameShort = void 0;
	      var orgShort = void 0;
	      var spaceShort = void 0;
	
	      if (isHovered && !isOpen) {
	        nameElement.textContent = nameDropdownValue;
	        orgElement.textContent = orgDropdownValue;
	        spaceElement.textContent = spaceDropdownValue;
	        regionElement.textContent = regionDropdownValue;
	        menuElement.style.width = this.element.getBoundingClientRect().width + 'px';
	      } else {
	        if (nameDropdownValue.length > 25) {
	          nameShort = nameDropdownValue.substr(0, 25) + '...';
	          nameElement.textContent = nameShort;
	        } else {
	          nameElement.textContent = nameDropdownValue;
	        }
	
	        if (orgDropdownValue.length > 25) {
	          orgShort = orgDropdownValue.slice(0, 12) + '...' + orgDropdownValue.slice(-13);
	          orgElement.textContent = orgShort;
	        } else {
	          orgElement.textContent = orgDropdownValue;
	        }
	
	        if (spaceDropdownValue.length > 25) {
	          spaceShort = spaceDropdownValue.substr(0, 25) + '...';
	          spaceElement.textContent = spaceShort;
	        } else {
	          spaceElement.textContent = spaceDropdownValue;
	        }
	
	        regionElement.textContent = regionDropdownValue;
	        menuElement.style.width = this.element.getBoundingClientRect().width + 'px';
	      }
	    }
	  }, {
	    key: 'release',
	    value: function release() {
	      if (this.hDocumentClick) {
	        this.hDocumentClick = this.hDocumentClick.release();
	      }
	      _get(ProfileSwitcher.prototype.__proto__ || Object.getPrototypeOf(ProfileSwitcher.prototype), 'release', this).call(this);
	    }
	
	    /**
	     * The component options.
	     * @member ProfileSwitcher.options
	     * @type {Object}
	     * @property {string} selectorInit The CSS selector to find profile switchers.
	     * @property {string} [selectorProfileSwitcher] The data attribute selector for the profile switcher.
	     * @property {string} [selectorAccount]
	     *   The data attribute selector for the element containing the account name in the profile switcher.
	     * @property {string} [selectorOrg]
	     *   The data attribute selector for the element containing the organization name in the profile switcher.
	     * @property {string} [selectorSpace]
	     *   The data attribute selector for the element containing the space name in the profile switcher.
	     * @property {string} [selectorAccountDropdown]
	     *   The data attribute selector for the dropdown item containing the current account name.
	     * @property {string} [selectorOrgDropdown]
	     *   The data attribute selector for the dropdown item containing the current organization name.
	     * @property {string} [selectorSpaceDropdown]
	     *   The data attribute selector for the dropdown item containing the current space name.
	     */
	
	
	    /**
	     * The map associating DOM element and profile switcher instance.
	     * @member ProfileSwitcher.components
	     * @type {WeakMap}
	     */
	
	  }]);
	
	  return ProfileSwitcher;
	}((0, _mixin3.default)(_createComponent2.default, _initComponentBySearch2.default));
	
	ProfileSwitcher.options = {
	  selectorInit: '[data-profile-switcher]',
	  // Data Attribute selectors
	  selectorProfileSwitcher: '[data-profile-switcher]',
	  selectorToggle: '[data-profile-switcher-toggle]',
	  selectorMenu: '[data-switcher-menu]',
	  selectorLinkedAccount: '[data-switcher-account-sl]',
	  selectorAccount: '[data-switcher-account]',
	  selectorRegion: '[data-switcher-region]',
	  selectorOrg: '[data-switcher-org]',
	  selectorSpace: '[data-switcher-space]',
	  selectorDropdown: '[data-dropdown]',
	  selectorAccountDropdown: '[data-dropdown-account]',
	  selectorAccountSlDropdown: '[data-dropdown-account-sl]',
	  selectorAccountLinked: '[data-dropdown-account-linked]',
	  selectorAccountSlLinked: '[data-dropdown-account-sl-linked]',
	  selectorRegionDropdown: '[data-dropdown-region]',
	  selectorOrgDropdown: '[data-dropdown-org]',
	  selectorSpaceDropdown: '[data-dropdown-space]',
	  classSwitcherOpen: 'bx--account-switcher--open',
	  classLinkedIcon: '.bx--account-switcher__linked-icon'
	};
	ProfileSwitcher.components = new WeakMap();
	exports.default = ProfileSwitcher;

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _mixin2 = __webpack_require__(3);
	
	var _mixin3 = _interopRequireDefault(_mixin2);
	
	var _createComponent = __webpack_require__(4);
	
	var _createComponent2 = _interopRequireDefault(_createComponent);
	
	var _initComponentBySearch = __webpack_require__(5);
	
	var _initComponentBySearch2 = _interopRequireDefault(_initComponentBySearch);
	
	__webpack_require__(8);
	
	__webpack_require__(15);
	
	__webpack_require__(6);
	
	__webpack_require__(7);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Pagination = function (_mixin) {
	  _inherits(Pagination, _mixin);
	
	  /**
	  * Pagination component.
	  * @extends CreateComponent
	  * @extends InitComponentBySearch
	  * @param {HTMLElement} element The element working as a pagination component.
	  * @param {Object} [options] The component options.
	  * @property {string} [selectorInit] The CSS selector to find pagination components.
	  * @property {string} [selectorItemsPerPageInput]
	  *   The CSS selector to find the input that determines the number of items per page.
	  * @property {string} [selectorPageNumberInput] The CSS selector to find the input that changes the page displayed.
	  * @property {string} [selectorPageBackward] The CSS selector to find the button that goes back a page.
	  * @property {string} [selectorPageForward] The CSS selector to find the button that goes forward a page.
	  * @property {string} [eventItemsPerPage]
	  *   The name of the custom event fired when a user changes the number of items per page.
	  *   event.detail.value contains the number of items a user wishes to see.
	  * @property {string} [eventPageNumber]
	  *   The name of the custom event fired when a user inputs a specific page number.
	  *   event.detail.value contains the value that the user input.
	  * @property {string} [eventPageChange]
	  *   The name of the custom event fired when a user goes forward or backward a page.
	  *   event.detail.direction contains the direction a user wishes to go.
	  */
	  function Pagination(element, options) {
	    _classCallCheck(this, Pagination);
	
	    var _this = _possibleConstructorReturn(this, (Pagination.__proto__ || Object.getPrototypeOf(Pagination)).call(this, element, options));
	
	    _this.emitEvent = function (evtName, detail) {
	      var event = new CustomEvent('' + evtName, {
	        bubbles: true,
	        cancelable: true,
	        detail: detail
	      });
	
	      _this.element.dispatchEvent(event);
	    };
	
	    _this.element.addEventListener('click', function (evt) {
	      if (evt.target.matches(_this.options.selectorPageBackward)) {
	        var detail = {
	          initialEvt: evt,
	          element: evt.target,
	          direction: 'backward'
	        };
	        _this.emitEvent(_this.options.eventPageChange, detail);
	      } else if (evt.target.matches(_this.options.selectorPageForward)) {
	        var _detail = {
	          initialEvt: evt,
	          element: evt.target,
	          direction: 'forward'
	        };
	        _this.emitEvent(_this.options.eventPageChange, _detail);
	      }
	    });
	
	    _this.element.addEventListener('input', function (evt) {
	      if (evt.target.matches(_this.options.selectorItemsPerPageInput)) {
	        var detail = {
	          initialEvt: evt,
	          element: evt.target,
	          value: evt.target.value
	        };
	        _this.emitEvent(_this.options.eventItemsPerPage, detail);
	      } else if (evt.target.matches(_this.options.selectorPageNumberInput)) {
	        var _detail2 = {
	          initialEvt: evt,
	          element: evt.target,
	          value: evt.target.value
	        };
	        _this.emitEvent(_this.options.eventPageNumber, _detail2);
	      }
	    });
	    return _this;
	  }
	
	  /**
	   * Dispatches a custom event
	   * @param {String} evtName name of the event to be dispatched.
	   * @param {Object} detail contains the original event and any other necessary details.
	   */
	
	
	  return Pagination;
	}((0, _mixin3.default)(_createComponent2.default, _initComponentBySearch2.default));
	
	/**
	 * The map associating DOM element and pagination instance.
	 * @type {WeakMap}
	 */
	
	
	Pagination.components = new WeakMap();
	
	/**
	 * The component options.
	 * If `options` is specified in the constructor, {@linkcode Pagination.create .create()}, or {@linkcode Pagination.init .init()},
	 * properties in this object are overriden for the instance being create and how {@linkcode Pagination.init .init()} works.
	 * @property {string} [selectorInit] The CSS selector to find pagination components.
	 * @property {string} [selectorItemsPerPageInput] The CSS selector to find the input that determines the number of items per page.
	 * @property {string} [selectorPageNumberInput] The CSS selector to find the input that changes the page displayed.
	 * @property {string} [selectorPageBackward] The CSS selector to find the button that goes back a page.
	 * @property {string} [selectorPageForward] The CSS selector to find the button that goes forward a page.
	 * @property {string} [eventItemsPerPage]
	 *   The name of the custom event fired when a user changes the number of items per page.
	 *   event.detail.value contains the number of items a user wishes to see.
	 * @property {string} [eventPageNumber]
	 *   The name of the custom event fired when a user inputs a specific page number.
	 *   event.detail.value contains the value that the user input.
	 * @property {string} [eventPageChange]
	 *   The name of the custom event fired when a user goes forward or backward a page.
	 *   event.detail.direction contains the direction a user wishes to go.
	 */
	Pagination.options = {
	  selectorInit: '[data-pagination]',
	  selectorItemsPerPageInput: '[data-items-per-page]',
	  selectorPageNumberInput: '[data-page-number-input]',
	  selectorPageBackward: '[data-page-backward]',
	  selectorPageForward: '[data-page-forward]',
	  eventItemsPerPage: 'itemsPerPage',
	  eventPageNumber: 'pageNumber',
	  eventPageChange: 'pageChange'
	};
	
	exports.default = Pagination;

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _mixin2 = __webpack_require__(3);
	
	var _mixin3 = _interopRequireDefault(_mixin2);
	
	var _createComponent = __webpack_require__(4);
	
	var _createComponent2 = _interopRequireDefault(_createComponent);
	
	var _initComponentBySearch = __webpack_require__(5);
	
	var _initComponentBySearch2 = _interopRequireDefault(_initComponentBySearch);
	
	__webpack_require__(8);
	
	__webpack_require__(6);
	
	__webpack_require__(7);
	
	__webpack_require__(15);
	
	var _toggleClass = __webpack_require__(16);
	
	var _toggleClass2 = _interopRequireDefault(_toggleClass);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var SearchWithOptions = function (_mixin) {
	  _inherits(SearchWithOptions, _mixin);
	
	  /**
	   * Search with Options.
	   * @extends CreateComponent
	   * @extends InitComponentBySearch
	   * @param {HTMLElement} element The element working as the search component.
	   * @param {Object} [options] The component options
	   * @param {string} [options.selectorToggleLayoutBtn]
	   *   The data attribute selector for the button that toggles between the layouts.
	   * @param {string} [options.selectorIconContainer] The data attribute selector for the icon layout container.
	   * @param {string} [options.classHiddenContainer] The class selector for a hidden container.
	   */
	  function SearchWithOptions(element, options) {
	    _classCallCheck(this, SearchWithOptions);
	
	    var _this = _possibleConstructorReturn(this, (SearchWithOptions.__proto__ || Object.getPrototypeOf(SearchWithOptions)).call(this, element, options));
	
	    var toggleLayoutBtnNode = _this.element.querySelector(_this.options.selectorToggleLayoutBtn);
	    toggleLayoutBtnNode.addEventListener('click', function (evt) {
	      _this.toggleLayout(evt);
	    });
	    return _this;
	  }
	
	  /**
	   * Toggles between the grid and list layout.
	   * @param {Event} event The event triggering this method.
	   */
	
	
	  _createClass(SearchWithOptions, [{
	    key: 'toggleLayout',
	    value: function toggleLayout(evt) {
	      var _this2 = this;
	
	      var btn = evt.currentTarget;
	      var iconContainers = [].concat(_toConsumableArray(btn.querySelectorAll(this.options.selectorIconContainer)));
	      iconContainers.forEach(function (container) {
	        var isHidden = container.classList.contains(_this2.options.classHiddenContainer);
	        (0, _toggleClass2.default)(container, _this2.options.classHiddenContainer, !isHidden);
	      });
	    }
	
	    /**
	     * The map associating DOM element and content switcher set instance.
	     * @member SearchWithOptions.components
	     * @type {WeakMap}
	     */
	
	
	    /**
	     * The component options.
	     * If `options` is specified in the constructor,
	     * {@linkcode SearchWithOptions.create .create()}, or {@linkcode SearchWithOptions.init .init()},
	     * properties in this object are overriden for the instance being created
	     * and how {@linkcode SearchWithOptions.init .init()} works.
	     * @member SearchWithOptions.options
	     * @type {Object}
	     * @property {string} selectorInit The CSS selector to find search UIs with options.
	     */
	
	  }]);
	
	  return SearchWithOptions;
	}((0, _mixin3.default)(_createComponent2.default, _initComponentBySearch2.default));
	
	SearchWithOptions.components = new WeakMap();
	SearchWithOptions.options = {
	  selectorInit: '[data-search-with-options]',
	  selectorToggleLayoutBtn: '[data-search-toggle-btn]',
	  selectorIconContainer: '[data-search-toggle-layout]',
	  classHiddenContainer: 'bx--search__toggle-layout__container--hidden'
	};
	exports.default = SearchWithOptions;

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _mixin2 = __webpack_require__(3);
	
	var _mixin3 = _interopRequireDefault(_mixin2);
	
	var _createComponent = __webpack_require__(4);
	
	var _createComponent2 = _interopRequireDefault(_createComponent);
	
	var _initComponentBySearch = __webpack_require__(5);
	
	var _initComponentBySearch2 = _interopRequireDefault(_initComponentBySearch);
	
	var _eventMatches = __webpack_require__(11);
	
	var _eventMatches2 = _interopRequireDefault(_eventMatches);
	
	__webpack_require__(8);
	
	__webpack_require__(6);
	
	__webpack_require__(7);
	
	__webpack_require__(15);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Accordion = function (_mixin) {
	  _inherits(Accordion, _mixin);
	
	  /**
	   * Accordion.
	   * @extends CreateComponent
	   * @extends InitComponentBySearch
	   * @param {HTMLElement} element The element working as an accordion.
	   */
	  function Accordion(element, options) {
	    _classCallCheck(this, Accordion);
	
	    var _this = _possibleConstructorReturn(this, (Accordion.__proto__ || Object.getPrototypeOf(Accordion)).call(this, element, options));
	
	    _this.element.addEventListener('click', function (event) {
	      var item = (0, _eventMatches2.default)(event, _this.options.accordionItem);
	      if (item && !(0, _eventMatches2.default)(event, _this.options.accordionContent)) {
	        item.classList.toggle(_this.options.classActive);
	      }
	    });
	
	    _this.element.addEventListener('keypress', function (event) {
	      var item = (0, _eventMatches2.default)(event, _this.options.accordionItem);
	      if (item && !(0, _eventMatches2.default)(event, _this.options.accordionContent)) {
	        _this.handleKeypress(event);
	      }
	    });
	    return _this;
	  }
	
	  /**
	   * Handles toggling of active state of accordion via keyboard
	   * @param {Event} event The event triggering this method.
	   */
	
	
	  _createClass(Accordion, [{
	    key: 'handleKeypress',
	    value: function handleKeypress(event) {
	      if (event.keyCode === 13 || event.keyCode === 32) {
	        event.target.classList.toggle(this.options.classActive);
	      }
	    }
	
	    /**
	     * The component options.
	     * If `options` is specified in the constructor,
	     * {@linkcode NumberInput.create .create()}, or {@linkcode NumberInput.init .init()},
	     * properties in this object are overriden for the instance being create and how {@linkcode NumberInput.init .init()} works.
	     * @property {string} selectorInit The CSS selector to find accordion UIs.
	     */
	
	
	    /**
	     * The map associating DOM element and accordion UI instance.
	     * @type {WeakMap}
	     */
	
	  }]);
	
	  return Accordion;
	}((0, _mixin3.default)(_createComponent2.default, _initComponentBySearch2.default));
	
	Accordion.options = {
	  selectorInit: '[data-accordion]',
	  accordionItem: '.bx--accordion__item',
	  accordionContent: '.bx--accordion__content',
	  classActive: 'bx--accordion__item--active'
	};
	Accordion.components = new WeakMap();
	exports.default = Accordion;

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _mixin2 = __webpack_require__(3);
	
	var _mixin3 = _interopRequireDefault(_mixin2);
	
	var _createComponent = __webpack_require__(4);
	
	var _createComponent2 = _interopRequireDefault(_createComponent);
	
	var _initComponentBySearch = __webpack_require__(5);
	
	var _initComponentBySearch2 = _interopRequireDefault(_initComponentBySearch);
	
	__webpack_require__(8);
	
	__webpack_require__(15);
	
	__webpack_require__(6);
	
	__webpack_require__(7);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var CopyBtn = function (_mixin) {
	  _inherits(CopyBtn, _mixin);
	
	  /**
	   * CopyBtn UI.
	   * @extends CreateComponent
	   * @extends InitComponentBySearch
	   * @param {HTMLElement} element The element working as a copy button UI.
	   */
	  function CopyBtn(element, options) {
	    _classCallCheck(this, CopyBtn);
	
	    var _this = _possibleConstructorReturn(this, (CopyBtn.__proto__ || Object.getPrototypeOf(CopyBtn)).call(this, element, options));
	
	    _this.element.addEventListener('click', function () {
	      return _this.handleClick();
	    });
	    return _this;
	  }
	
	  /**
	   * Show the feedback tooltip on click. Hide the feedback tooltip after specified timeout value.
	   */
	
	
	  _createClass(CopyBtn, [{
	    key: 'handleClick',
	    value: function handleClick() {
	      var _this2 = this;
	
	      var feedback = this.element.querySelector(this.options.feedbackTooltip);
	      feedback.classList.add(this.options.classShowFeedback);
	      setTimeout(function () {
	        feedback.classList.remove(_this2.options.classShowFeedback);
	      }, this.options.timeoutValue);
	    }
	
	    /**
	     * The map associating DOM element and copy button UI instance.
	     * @member CopyBtn.components
	     * @type {WeakMap}
	     */
	
	
	    /**
	     * The component options.
	     * If `options` is specified in the constructor, {@linkcode CopyBtn.create .create()}, or {@linkcode CopyBtn.init .init()},
	     * properties in this object are overriden for the instance being create and how {@linkcode CopyBtn.init .init()} works.
	     * @member CopyBtn.options
	     * @type {Object}
	     * @property {string} selectorInit The data attribute to find copy button UIs.
	     * @property {string} feedbackTooltip The data attribute to find feedback tooltip.
	     * @property {string} classShowFeedback The CSS selector for showing the feedback tooltip.
	     * @property {number} timeoutValue The specified timeout value before the feedback tooltip is hidden.
	     */
	
	  }]);
	
	  return CopyBtn;
	}((0, _mixin3.default)(_createComponent2.default, _initComponentBySearch2.default));
	
	CopyBtn.components = new WeakMap();
	CopyBtn.options = {
	  selectorInit: '[data-copy-btn]',
	  feedbackTooltip: '[data-feedback]',
	  classShowFeedback: 'bx--btn--copy__feedback--displayed',
	  timeoutValue: 2000
	};
	exports.default = CopyBtn;

/***/ }
/******/ ]);
//# sourceMappingURL=bluemix-components.js.map