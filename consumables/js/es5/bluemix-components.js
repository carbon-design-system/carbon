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
	exports.Accordion = exports.Pagination = exports.ProfileSwitcher = exports.DetailPageHeader = exports.Table = exports.ResponsiveTable = exports.NumberInput = exports.Card = exports.Dropdown = exports.Loading = exports.Toolbars = exports.LeftNav = exports.HeaderNav = exports.Modal = exports.OverflowMenu = exports.Tab = exports.ContentSwitcher = exports.FileUploader = exports.FabButton = exports.initCheckbox = exports.settings = undefined;
	
	var _checkbox = __webpack_require__(1);
	
	var _checkbox2 = _interopRequireDefault(_checkbox);
	
	var _fileUploader = __webpack_require__(2);
	
	var _fileUploader2 = _interopRequireDefault(_fileUploader);
	
	var _fab = __webpack_require__(6);
	
	var _fab2 = _interopRequireDefault(_fab);
	
	var _contentSwitcher = __webpack_require__(9);
	
	var _contentSwitcher2 = _interopRequireDefault(_contentSwitcher);
	
	var _tabs = __webpack_require__(12);
	
	var _tabs2 = _interopRequireDefault(_tabs);
	
	var _overflowMenu = __webpack_require__(14);
	
	var _overflowMenu2 = _interopRequireDefault(_overflowMenu);
	
	var _modals = __webpack_require__(15);
	
	var _modals2 = _interopRequireDefault(_modals);
	
	var _header = __webpack_require__(16);
	
	var _header2 = _interopRequireDefault(_header);
	
	var _toolbars = __webpack_require__(17);
	
	var _toolbars2 = _interopRequireDefault(_toolbars);
	
	var _loading = __webpack_require__(18);
	
	var _loading2 = _interopRequireDefault(_loading);
	
	var _dropdown = __webpack_require__(19);
	
	var _dropdown2 = _interopRequireDefault(_dropdown);
	
	var _card = __webpack_require__(20);
	
	var _card2 = _interopRequireDefault(_card);
	
	var _numberInput = __webpack_require__(21);
	
	var _numberInput2 = _interopRequireDefault(_numberInput);
	
	var _responsiveTable = __webpack_require__(22);
	
	var _responsiveTable2 = _interopRequireDefault(_responsiveTable);
	
	var _table = __webpack_require__(24);
	
	var _table2 = _interopRequireDefault(_table);
	
	var _detailPageHeader = __webpack_require__(25);
	
	var _detailPageHeader2 = _interopRequireDefault(_detailPageHeader);
	
	var _leftNav = __webpack_require__(27);
	
	var _leftNav2 = _interopRequireDefault(_leftNav);
	
	var _unifiedHeader = __webpack_require__(28);
	
	var _unifiedHeader2 = _interopRequireDefault(_unifiedHeader);
	
	var _inlineLeftNav = __webpack_require__(29);
	
	var _inlineLeftNav2 = _interopRequireDefault(_inlineLeftNav);
	
	var _profileSwitcher = __webpack_require__(30);
	
	var _profileSwitcher2 = _interopRequireDefault(_profileSwitcher);
	
	var _pagination = __webpack_require__(31);
	
	var _pagination2 = _interopRequireDefault(_pagination);
	
	var _searchWithOptions = __webpack_require__(32);
	
	var _searchWithOptions2 = _interopRequireDefault(_searchWithOptions);
	
	var _accordion = __webpack_require__(33);
	
	var _accordion2 = _interopRequireDefault(_accordion);
	
	var _copyBtn = __webpack_require__(34);
	
	var _copyBtn2 = _interopRequireDefault(_copyBtn);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	// ====================//
	// Imports and Exports //
	// ====================//
	
	// Base Elements & Components
	// -------------
	// - JavaScript classes for use with components and base-elements.
	// - The following statements import classes from actual locations to
	//   be consumed from this file instead of their actual locations.
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
	    _unifiedHeader2.default.init();
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
	
	__webpack_require__(3);
	
	__webpack_require__(4);
	
	__webpack_require__(5);
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
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
	
	    _classCallCheck(this, FileUploader);
	
	    if (!element || element.nodeType !== Node.ELEMENT_NODE) {
	      throw new TypeError('DOM element should be given to initialize this widget.');
	    }
	
	    this.element = element;
	
	    this.options = Object.assign(Object.create(this.constructor.options), options);
	
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
	
	
	  _createClass(FileUploader, [{
	    key: 'updateLabel',
	
	
	    /**
	     * Updates the label for the file name upon file selection.
	     * @param {Event} event The event triggering this method.
	     */
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
	
	    /**
	     * The map associating DOM element and file uploader instance.
	     * @member FileUploader.components
	     * @type {WeakMap}
	     */
	
	
	    /**
	     * The component options.
	     * If `options` is specified in the constructor, {@linkcode FileUploader.create .create()}, or {@linkcode FileUploader.init .init()},
	     * properties in this object are overriden for the instance being create and how {@linkcode FileUploader.init .init()} works.
	     * @member FileUploader.options
	     * @type {Object}
	     * @property {string} selectorInit The CSS selector to find file uploaders.
	     */
	
	  }], [{
	    key: 'create',
	    value: function create(element, options) {
	      return this.components.get(element) || new this(element, options);
	    }
	
	    /**
	     * Instantiates file uploader in the given node.
	     * If the given element indicates that it's an file uploader, instantiates it.
	     * Otherwise, instantiates file uploader by searching for file uploader in the given node.
	     * @param {HTMLElement} element The element working as a file uploader.
	     * @param {Object} [options] The component options.
	     * @param {string} [options.selectorInit] The CSS selector to find file uploaders.
	     */
	
	  }, {
	    key: 'init',
	    value: function init() {
	      var _this2 = this;
	
	      var target = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document;
	      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	
	      var effectiveOptions = Object.assign(Object.create(this.options), options);
	      if (target.nodeType !== Node.ELEMENT_NODE && target.nodeType !== Node.DOCUMENT_NODE) {
	        throw new Error('DOM document or DOM element should be given to search for and initialize this widget.');
	      }
	      if (target.nodeType === Node.ELEMENT_NODE && target.matches(effectiveOptions.selectorInit)) {
	        this.create(target, effectiveOptions);
	      } else {
	        [].concat(_toConsumableArray(target.querySelectorAll(effectiveOptions.selectorInit))).forEach(function (element) {
	          return _this2.create(element, effectiveOptions);
	        });
	      }
	    }
	  }]);
	
	  return FileUploader;
	}();
	
	FileUploader.components = new WeakMap();
	FileUploader.options = {
	  selectorInit: '[data-file-uploader]',
	  selectorLabel: '[data-file-appearance]'
	};
	exports.default = FileUploader;

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';
	
	var matchesFuncName = ['matches', 'webkitMatchesSelector', 'msMatchesSelector'].filter(function (name) {
	  return typeof Element.prototype[name] === 'function';
	})[0];
	
	if (matchesFuncName !== 'matches') {
	  Element.prototype.matches = Element.prototype[matchesFuncName];
	}

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';
	
	Object.assign = Object.assign || function assignObject(inDst) {
	  if (inDst == null) {
	    // eslint-disable-line eqeqeq
	    // Throw if the given destination is null or undefined
	    throw new TypeError('Can\'t convert to object: ${dst}');
	  }
	
	  var dst = Object(inDst);
	
	  [].concat(Array.prototype.slice.call(arguments)).slice(1).forEach(function (src) {
	    Object.keys(src).forEach(function (prop) {
	      dst[prop] = src[prop];
	    });
	  });
	
	  return dst;
	};

/***/ },
/* 5 */
/***/ function(module, exports) {

	"use strict";
	
	Array.from = Array.from || function fromArray(a) {
	  return Array.prototype.slice.call(a);
	};

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	__webpack_require__(3);
	
	__webpack_require__(4);
	
	var _eventMatches = __webpack_require__(7);
	
	var _eventMatches2 = _interopRequireDefault(_eventMatches);
	
	var _on = __webpack_require__(8);
	
	var _on2 = _interopRequireDefault(_on);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var FabButton = function () {
	  /**
	   * Floating action button.
	   * @implements Component
	   * @param {HTMLElement} element The element working as a floting action button.
	   */
	  function FabButton(element) {
	    var _this = this;
	
	    _classCallCheck(this, FabButton);
	
	    if (!element || element.nodeType !== Node.ELEMENT_NODE) {
	      throw new TypeError('DOM element should be given to initialize this widget.');
	    }
	    this.element = element;
	
	    this.constructor.components.set(this.element, this);
	
	    element.addEventListener('click', function (event) {
	      return _this.toggle(event);
	    });
	  }
	
	  /**
	   * Instantiates floating action buttons in the given element.
	   * If the given element indicates that it's an floating action button, instantiates it.
	   * Otherwise, instantiates floating action buttons by clicking on floating action buttons in the given node.
	   * @param {Node} target The DOM node to instantiate floating action buttons in. Should be a document or an element.
	   * @param {Object} [options] The component options.
	   * @param {string} [options.selectorItem] The CSS selector to find floating action buttons.
	   * @returns {Handle} The handle to remove the event listener to handle clicking.
	   */
	
	
	  _createClass(FabButton, [{
	    key: 'toggle',
	
	
	    /**
	     * Toggles this floating action button.
	     * @param {Event} event The event triggering this method.
	     */
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
	  }, {
	    key: 'release',
	    value: function release() {
	      this.constructor.components.delete(this.element);
	    }
	
	    /**
	     * Instantiates floating action button of the given element.
	     * @param {HTMLElement} element The element.
	     */
	
	  }], [{
	    key: 'init',
	    value: function init() {
	      var _this2 = this;
	
	      var target = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document;
	      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	
	      var effectiveOptions = Object.assign(Object.create(this.options), options);
	      if (target.nodeType !== Node.ELEMENT_NODE && target.nodeType !== Node.DOCUMENT_NODE) {
	        throw new Error('DOM document or DOM element should be given to search for and initialize this widget.');
	      }
	      if (target.nodeType === Node.ELEMENT_NODE && target.matches(effectiveOptions.selectorInit)) {
	        this.create(target);
	      } else {
	        return (0, _on2.default)(target, 'click', function (event) {
	          var element = (0, _eventMatches2.default)(event, effectiveOptions.selectorInit);
	          if (element && !_this2.components.has(element)) {
	            _this2.create(element).toggle(event);
	          }
	        });
	      }
	    }
	  }, {
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
	}();
	
	FabButton.components = new WeakMap();
	FabButton.options = {
	  selectorInit: '[data-fab]'
	};
	exports.default = FabButton;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = eventMatches;
	
	__webpack_require__(3);
	
	function eventMatches(event, selector) {
	  // <svg> in IE does not have `Element#msMatchesSelector()` (that should be copied to `Element#matches()` by the polyfill).
	  // Also a weird behavior is seen in IE where DOM tree seems broken when `event.target` is on <svg>.
	  // Therefore this function simply returns `undefined` when `event.target` is on <svg>.
	  if (typeof event.target.matches === 'function') {
	    if (event.target.matches(selector)) {
	      // If event target itself matches the given selector, return it
	      return event.target;
	    } else if (event.target.matches(selector + ' *')) {
	      // If event target is a child node of a DOM element that matches the given selector, find the DOM element by going up the DOM tree
	      for (var traverse = event.target; traverse && traverse !== event.currentTarget; traverse = traverse.parentNode) {
	        if (traverse.matches(selector)) {
	          return traverse;
	        }
	      }
	    }
	  }
	}

/***/ },
/* 8 */
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
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _eventMatches = __webpack_require__(7);
	
	var _eventMatches2 = _interopRequireDefault(_eventMatches);
	
	__webpack_require__(5);
	
	__webpack_require__(10);
	
	__webpack_require__(3);
	
	__webpack_require__(4);
	
	var _toggleClass = __webpack_require__(11);
	
	var _toggleClass2 = _interopRequireDefault(_toggleClass);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var ContentSwitcher = function () {
	  /**
	   * Set of content switcher buttons.
	   * @implements Component
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
	  function ContentSwitcher(element) {
	    var _this = this;
	
	    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	
	    _classCallCheck(this, ContentSwitcher);
	
	    if (!element || element.nodeType !== Node.ELEMENT_NODE) {
	      throw new TypeError('DOM element should be given to initialize this widget.');
	    }
	
	    this.element = element;
	
	    this.options = Object.assign(Object.create(this.constructor.options), options);
	
	    this.constructor.components.set(this.element, this);
	
	    this.element.addEventListener('click', function (event) {
	      return _this.handleClick(event);
	    });
	
	    [].concat(_toConsumableArray(element.querySelectorAll('input'))).forEach(function (input) {
	      if (input.checked) _this._changeActive(input);
	    });
	  }
	
	  /**
	   * Instantiates a set of content switcher buttons of the given element.
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
	
	
	  _createClass(ContentSwitcher, [{
	    key: 'handleClick',
	
	
	    /**
	     * Handles click on content switcher button set.
	     * If the click is on a content switcher button, activates it.
	     * @param {Event} event The event triggering this method.
	     */
	    value: function handleClick(event) {
	      var button = (0, _eventMatches2.default)(event, this.options.selectorButton);
	
	      if (button) {
	        this.setActive(button);
	      }
	    }
	
	    /**
	     * Internal method of {@linkcode ContentSwitcher#setActive .setActive()}, to select a content switcher button.
	     * @private
	     * @param {HTMLElement} item The button to be selected.
	     */
	
	  }, {
	    key: '_changeActive',
	    value: function _changeActive(item) {
	      var _this2 = this;
	
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
	    }
	
	    /**
	     * Error thrown when selection (upon clicking on a content switcher button, etc.) is canceled.
	     * @typedef {Object} ContentSwitcher~cancelError
	     * @property {boolean} canceled `true` always.
	     * @property {boolean} item The content switcher button that was about to be selected.
	     */
	
	    /**
	     * The callback called once switching is finished or is canceled.
	     * @callback ContentSwitcher~setActiveCallback
	     * @param {ContentSwitcher~cancelError} error Error thrown when selection (upon clicking on a content switcher button, etc.) is canceled.
	     * @param {HTMLElement} item The newly selected button. `null` if when selection is canceled.
	     */
	
	    /**
	     * Selects a content switcher button.
	     * If the selected button has `data-target` attribute, DOM elements it points to as a CSS selector will be shown.
	     * DOM elements associated with unselected buttons in the same way will be hidden.
	     * @param {HTMLElement} item The button to be selected.
	     * @param {ContentSwitcher~setActiveCallback} callback The callback called once selection is finished or is canceled.
	     */
	
	  }, {
	    key: 'setActive',
	    value: function setActive(item, callback) {
	      var eventStart = new CustomEvent(this.options.eventBeforeSelected, {
	        bubbles: true,
	        cancelable: true,
	        detail: { item: item }
	      });
	
	      // https://connect.microsoft.com/IE/feedback/details/790389/event-defaultprevented-returns-false-after-preventdefault-was-called
	      if (this.element.dispatchEvent(eventStart)) {
	        this._changeActive(item);
	        this.element.dispatchEvent(new CustomEvent(this.options.eventAfterSelected, {
	          bubbles: true,
	          cancelable: true,
	          detail: { item: item }
	        }));
	        if (callback) {
	          callback(null, item);
	        }
	      } else {
	        var error = new Error('Switching active item has been canceled.');
	        error.canceled = true;
	        error.item = item;
	        if (callback) {
	          callback(error);
	        }
	      }
	    }
	  }, {
	    key: 'release',
	    value: function release() {
	      this.constructor.components.delete(this.element);
	    }
	
	    /**
	     * The map associating DOM element and content switcher set instance.
	     * @member ContentSwitcher.components
	     * @type {WeakMap}
	     */
	
	
	    /**
	     * The component options.
	     * If `options` is specified in the constructor, {@linkcode ContentSwitcher.create .create()}, or {@linkcode ContentSwitcher.init .init()},
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
	
	  }], [{
	    key: 'create',
	    value: function create(element, options) {
	      return this.components.get(element) || new this(element, options);
	    }
	
	    /**
	     * Instantiates content switcher button sets in the given node.
	     * If the given element indicates that it's an content switcher button set, instantiates it.
	     * Otherwise, instantiates content switcher button sets by searching for content switcher button sets in the given node.
	     * @param {Node} target The DOM node to instantiate content switcher button sets in. Should be a document or an element.
	     * @param {Object} [options] The component options.
	     * @param {string} [options.selectorInit] The CSS selector to find content switcher button set.
	     * @param {string} [options.selectorButton] The CSS selector to find switcher buttons.
	     * @param {string} [options.selectorButtonSelected] The CSS selector to find the selected switcher button.
	     * @param {string} [options.classActive] The CSS class for switcher button's selected state.
	     * @param {string} [options.eventBeforeSelected]
	     *   The name of the custom event fired before a switcher button is selected.
	     *   Cancellation of this event stops selection of content switcher button.
	     * @param {string} [options.eventAfterSelected] The name of the custom event fired after a switcher button is selected.
	     */
	
	  }, {
	    key: 'init',
	    value: function init() {
	      var _this3 = this;
	
	      var target = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document;
	      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	
	      var effectiveOptions = Object.assign(Object.create(this.options), options);
	      if (target.nodeType !== Node.ELEMENT_NODE && target.nodeType !== Node.DOCUMENT_NODE) {
	        throw new Error('DOM document or DOM element should be given to search for and initialize this widget.');
	      }
	      if (target.nodeType === Node.ELEMENT_NODE && target.matches(effectiveOptions.selectorInit)) {
	        this.create(target, effectiveOptions);
	      } else {
	        [].concat(_toConsumableArray(document.querySelectorAll(effectiveOptions.selectorInit))).forEach(function (element) {
	          return _this3.create(element, effectiveOptions);
	        });
	      }
	    }
	  }]);
	
	  return ContentSwitcher;
	}();
	
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
/* 10 */
/***/ function(module, exports) {

	'use strict';
	
	var missingNativeCustomEvent = function () {
	  try {
	    new CustomEvent('test-event'); // eslint-disable-line no-new
	  } catch (error) {
	    return true;
	  }
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
/* 11 */
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
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	var _eventMatches = __webpack_require__(7);
	
	var _eventMatches2 = _interopRequireDefault(_eventMatches);
	
	__webpack_require__(5);
	
	__webpack_require__(3);
	
	__webpack_require__(13);
	
	__webpack_require__(4);
	
	var _contentSwitcher = __webpack_require__(9);
	
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
	   * @param {string} [options.selectorTriggerText] The CSS selector to find the element used in narrow mode showing the selected tab item.
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
	      return _this.handleKeyDown(event);
	    });
	
	    var selected = _this.element.querySelector(_this.options.selectorButtonSelected);
	    if (selected) {
	      _this.updateTriggerText(selected);
	    }
	    return _this;
	  }
	
	  /**
	   * Instantiates tab containers in the given node.
	   * If the given element indicates that it's an tab container, instantiates it.
	   * Otherwise, instantiates tab containers by searching for tab containers in the given node.
	   * @param {Node} target The DOM node to instantiate tab containers in. Should be a document or an element.
	   * @param {Object} [options] The component options.
	   * @param {string} [options.selectorInit] The CSS selector to find tab containers.
	   * @param {string} [options.selectorMenu] The CSS selector to find the drop down menu used in narrow mode.
	   * @param {string} [options.selectorTrigger] The CSS selector to find the button to open the drop down menu used in narrow mode.
	   * @param {string} [options.selectorTriggerText] The CSS selector to find the element used in narrow mode showing the selected tab item.
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
	
	
	  _createClass(Tab, [{
	    key: '_changeActive',
	    value: function _changeActive(item) {
	      _get(Tab.prototype.__proto__ || Object.getPrototypeOf(Tab.prototype), '_changeActive', this).call(this, item);
	      this.updateTriggerText(item);
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
	      var _this2 = this;
	
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
	            var link = item.querySelector(_this2.options.selectorLink);
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
	     * @property {string} [selectorTriggerText] The CSS selector to find the element used in narrow mode showing the selected tab item.
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
	
	  }], [{
	    key: 'init',
	    value: function init() {
	      var _this3 = this;
	
	      var target = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document;
	      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	
	      var effectiveOptions = Object.assign(Object.create(this.options), options);
	      if (target.nodeType !== Node.ELEMENT_NODE && target.nodeType !== Node.DOCUMENT_NODE) {
	        throw new Error('DOM document or DOM element should be given to search for and initialize this widget.');
	      }
	      if (target.nodeType === Node.ELEMENT_NODE && target.matches(effectiveOptions.selectorInit)) {
	        this.create(target, effectiveOptions);
	      } else {
	        [].concat(_toConsumableArray(target.querySelectorAll(effectiveOptions.selectorInit))).forEach(function (element) {
	          return _this3.create(element, effectiveOptions);
	        });
	      }
	    }
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
/* 13 */
/***/ function(module, exports) {

	"use strict";
	
	Math.sign = Math.sign || function sign(x) {
	  var n = +x;
	  return n === 0 ? n : n / Math.abs(n);
	};

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	__webpack_require__(5);
	
	__webpack_require__(3);
	
	__webpack_require__(4);
	
	var _toggleClass = __webpack_require__(11);
	
	var _toggleClass2 = _interopRequireDefault(_toggleClass);
	
	var _on = __webpack_require__(8);
	
	var _on2 = _interopRequireDefault(_on);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var OverflowMenu = function () {
	  function OverflowMenu(element) {
	    var _this = this;
	
	    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	
	    _classCallCheck(this, OverflowMenu);
	
	    _initialiseProps.call(this);
	
	    if (!element || element.nodeType !== Node.ELEMENT_NODE) {
	      throw new TypeError('DOM element should be given to initialize this widget.');
	    }
	
	    this.element = element;
	    this.options = Object.assign(Object.create(this.constructor.options), options);
	    this.optionMenu = this.element.querySelector(this.options.selectorOptionMenu);
	    this.constructor.components.set(this.element, this);
	
	    /**
	     * The handle to release click event listener on document object.
	     * @member {Handle}
	     */
	    this.hDocumentClick = (0, _on2.default)(this.element.ownerDocument, 'click', function (event) {
	      return _this.handleDocumentClick(event);
	    });
	
	    /**
	     * The handle to release keypress event listener on document object.
	     * @member {Handle}
	     */
	    this.hDocumentKeyPress = (0, _on2.default)(this.element.ownerDocument, 'keypress', function (event) {
	      return _this.handleKeyPress(event);
	    });
	  }
	
	  _createClass(OverflowMenu, [{
	    key: 'handleDocumentClick',
	    value: function handleDocumentClick(event) {
	      var isOfSelf = this.element.contains(event.target);
	      var shouldBeOpen = isOfSelf && !this.element.classList.contains('bx--overflow-menu--open');
	
	      if (isOfSelf && this.element.tagName === 'A') {
	        event.preventDefault();
	      }
	
	      (0, _toggleClass2.default)(this.optionMenu, 'bx--overflow-menu--open', shouldBeOpen);
	      (0, _toggleClass2.default)(this.element, 'bx--overflow-menu--open', shouldBeOpen);
	
	      if (shouldBeOpen) {
	        this.emitEvent(this.element, event);
	      }
	    }
	  }, {
	    key: 'handleKeyPress',
	    value: function handleKeyPress(event) {
	      var key = event.key || event.which;
	      if (key === 'Enter' || key === 13) {
	        var isOfSelf = this.element.contains(event.target);
	        var shouldBeOpen = isOfSelf && !this.element.classList.contains('bx--overflow-menu--open');
	
	        if (isOfSelf && this.element.tagName === 'A') {
	          event.preventDefault();
	        }
	
	        if (shouldBeOpen) {
	          this.emitEvent(this.element, event);
	        }
	
	        (0, _toggleClass2.default)(this.optionMenu, 'bx--overflow-menu--open', shouldBeOpen);
	        (0, _toggleClass2.default)(this.element, 'bx--overflow-menu--open', shouldBeOpen);
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
	
	      var effectiveOptions = Object.assign(Object.create(this.options), options);
	      if (target.nodeType !== Node.ELEMENT_NODE && target.nodeType !== Node.DOCUMENT_NODE) {
	        throw new Error('DOM document or DOM element should be given to search for and initialize this widget.');
	      }
	      if (target.nodeType === Node.ELEMENT_NODE && target.matches(effectiveOptions.selectorInit)) {
	        this.create(target);
	      } else {
	        [].concat(_toConsumableArray(target.querySelectorAll(effectiveOptions.selectorInit))).forEach(function (element) {
	          return _this2.create(element);
	        });
	      }
	    }
	  }]);
	
	  return OverflowMenu;
	}();
	
	OverflowMenu.components = new WeakMap();
	OverflowMenu.options = {
	  selectorInit: '[data-overflow-menu]',
	  selectorOptionMenu: '.bx--overflow-menu__options'
	};
	
	var _initialiseProps = function _initialiseProps() {
	  var _this3 = this;
	
	  this.emitEvent = function (element, evt) {
	    var detail = {
	      element: element,
	      optionMenu: _this3.optionMenu,
	      evt: evt
	    };
	
	    var eventAfter = new CustomEvent('overflow', {
	      bubbles: true,
	      cancelable: true,
	      detail: detail
	    });
	
	    _this3.element.ownerDocument.dispatchEvent(eventAfter);
	  };
	};
	
	exports.default = OverflowMenu;

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	__webpack_require__(5);
	
	__webpack_require__(3);
	
	__webpack_require__(4);
	
	__webpack_require__(10);
	
	var _eventMatches = __webpack_require__(7);
	
	var _eventMatches2 = _interopRequireDefault(_eventMatches);
	
	var _toggleClass = __webpack_require__(11);
	
	var _toggleClass2 = _interopRequireDefault(_toggleClass);
	
	var _on = __webpack_require__(8);
	
	var _on2 = _interopRequireDefault(_on);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
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
	
	var Modal = function () {
	  /**
	   * Modal dialog.
	   * @implements Component
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
	  function Modal(element) {
	    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	
	    _classCallCheck(this, Modal);
	
	    if (!element || element.nodeType !== Node.ELEMENT_NODE) {
	      throw new TypeError('DOM element should be given to initialize this widget.');
	    }
	
	    this.element = element;
	
	    this.options = Object.assign(Object.create(this.constructor.options), options);
	
	    this.constructor.components.set(this.element, this);
	
	    this.hookCloseActions();
	  }
	
	  /**
	   * Instantiates modal dialog of the given element.
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
	
	
	  _createClass(Modal, [{
	    key: 'hookCloseActions',
	
	
	    /**
	     * Adds event listeners for closing this dialog.
	     */
	    value: function hookCloseActions() {
	      var _this = this;
	
	      this.element.addEventListener('click', function (event) {
	        if (event.currentTarget === event.target) _this.hide(event);
	      });
	
	      if (this.keydownHandler) {
	        this.element.ownerDocument.body.removeEventListener('keydown', this.keydownHandler);
	        this.keydownHandler = null;
	      }
	
	      this.keydownHandler = function (event) {
	        if (event.which === 27) {
	          _this.hide(event);
	        }
	      };
	
	      this.element.ownerDocument.body.addEventListener('keydown', this.keydownHandler);
	
	      [].concat(_toConsumableArray(this.element.querySelectorAll('[data-modal-close]'))).forEach(function (element) {
	        element.addEventListener('click', function (event) {
	          _this.hide(event);
	        });
	      });
	    }
	
	    /**
	     * Internal method of {@linkcode Modal#show .show()} and  {@linkcode Modal#hide .hide()}, to change show/hidden state.
	     * @private
	     * @param {boolean} visible `true` to make this modal dialog visible.
	     * @param {Function} callback Callback called when change in state completes.
	     */
	
	  }, {
	    key: '_changeState',
	    value: function _changeState(visible, callback) {
	      var _this2 = this;
	
	      var finished = void 0;
	      var finishedTransition = function finishedTransition() {
	        if (!finished) {
	          finished = true;
	          _this2.element.removeEventListener('transitionend', finishedTransition);
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
	     * The callback called once showing/hiding this dialog is finished or is canceled.
	     * @callback Modal~stateChangeCallback
	     * @param {Error} error
	     *   An error object with `true` in its `canceled` property if the showing/hiding this dialog is canceled.
	     *   Cancellation happens if the handler of a custom event, that is fired before showing/hiding this dialog happens,
	     *   calls `.preventDefault()` against the event.
	     * @param {boolean} newState The new toggle state.
	     */
	
	    /**
	     * Shows this modal dialog.
	     * @param {HTMLElement} [launchingElement] The DOM element that triggered calling this function.
	     * @param {Modal~stateChangeCallback} [callback] The callback called once showing this dialog is finished or is canceled.
	     */
	
	  }, {
	    key: 'show',
	    value: function show(launchingElementOrEvent, callback) {
	      var _this3 = this;
	
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
	
	      if (this.element.classList.contains(this.options.classVisible)) {
	        if (callback) {
	          callback(null, true);
	        }
	        return;
	      }
	
	      var eventStart = new CustomEvent(this.options.eventBeforeShown, {
	        bubbles: true,
	        cancelable: true,
	        detail: {
	          launchingElement: launchingElement,
	          launchingEvent: launchingEvent
	        }
	      });
	
	      // https://connect.microsoft.com/IE/feedback/details/790389/event-defaultprevented-returns-false-after-preventdefault-was-called
	      if (this.element.dispatchEvent(eventStart)) {
	        this._changeState(true, function () {
	          _this3.element.dispatchEvent(new CustomEvent(_this3.options.eventAfterShown, {
	            bubbles: true,
	            cancelable: true,
	            detail: {
	              launchingElement: launchingElement,
	              launchingEvent: launchingEvent
	            }
	          }));
	          if (callback) {
	            callback();
	          }
	        });
	      } else {
	        var error = new Error('Showing dialog has been canceled.');
	        error.canceled = true;
	        if (callback) {
	          callback(error);
	        }
	      }
	    }
	
	    /**
	     * Hides this modal dialog.
	     * @param {Modal~stateChangeCallback} [callback] The callback called once showing this dialog is finished or is canceled.
	     */
	
	  }, {
	    key: 'hide',
	    value: function hide(launchingElementOrEvent, callback) {
	      var _this4 = this;
	
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
	
	      if (!this.element.classList.contains(this.options.classVisible)) {
	        if (callback) {
	          callback(null, true);
	        }
	        return;
	      }
	
	      var eventStart = new CustomEvent(this.options.eventBeforeHidden, {
	        bubbles: true,
	        cancelable: true,
	        detail: {
	          launchingElement: launchingElement,
	          launchingEvent: launchingEvent
	        }
	      });
	
	      // https://connect.microsoft.com/IE/feedback/details/790389/event-defaultprevented-returns-false-after-preventdefault-was-called
	      if (this.element.dispatchEvent(eventStart)) {
	        this._changeState(false, function () {
	          _this4.element.dispatchEvent(new CustomEvent(_this4.options.eventAfterHidden, {
	            bubbles: true,
	            cancelable: true,
	            detail: {
	              launchingElement: launchingElement,
	              launchingEvent: launchingEvent
	            }
	          }));
	          if (callback) {
	            callback();
	          }
	        });
	      } else {
	        var error = new Error('Hiding dialog has been canceled.');
	        error.canceled = true;
	        if (callback) {
	          callback(error);
	        }
	      }
	    }
	  }, {
	    key: 'release',
	    value: function release() {
	      if (this.keydownHandler) {
	        this.element.ownerDocument.body.removeEventListener('keydown', this.keydownHandler);
	        this.keydownHandler = null;
	      }
	      this.constructor.components.delete(this.element);
	    }
	
	    /**
	     * @deprecated
	     */
	
	  }], [{
	    key: 'create',
	    value: function create(element, options) {
	      return this.components.get(element) || new this(element, options);
	    }
	
	    /**
	     * Instantiates modal dialogs in the given element.
	     * If the given element indicates that it's an modal dialog, instantiates it.
	     * Otherwise, instantiates modal dialogs by clicking on launcher buttons
	     * (buttons with `data-modal-target` attribute) of modal dialogs in the given node.
	     * @implements Component
	     * @param {Node} target The DOM node to instantiate modal dialogs in. Should be a document or an element.
	     * @param {Object} [options] The component options.
	     * @param {string} [options.selectorInit] The CSS class to find modal dialogs.
	     * @param {string} [options.attribInitTarget] The attribute name in the launcher buttons to find target modal dialogs.
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
	     * @returns {Handle} The handle to remove the event listener to handle clicking.
	     */
	
	  }, {
	    key: 'init',
	    value: function init() {
	      var _this5 = this;
	
	      var target = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document;
	      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	
	      var effectiveOptions = Object.assign(Object.create(this.options), options);
	      if (target.nodeType !== Node.ELEMENT_NODE && target.nodeType !== Node.DOCUMENT_NODE) {
	        throw new Error('DOM document or DOM element should be given to search for and initialize this widget.');
	      }
	      if (target.nodeType === Node.ELEMENT_NODE && target.matches(effectiveOptions.selectorInit)) {
	        this.create(target, effectiveOptions);
	      } else {
	        return (0, _on2.default)(target, 'click', function (event) {
	          var element = (0, _eventMatches2.default)(event, '[' + effectiveOptions.attribInitTarget + ']');
	
	          if (element) {
	            event.delegateTarget = element;
	
	            var modalElements = [].concat(_toConsumableArray(element.ownerDocument.querySelectorAll(element.getAttribute(effectiveOptions.attribInitTarget))));
	            if (modalElements.length > 1) {
	              throw new Error('Target modal must be unique.');
	            }
	
	            if (modalElements.length === 1) {
	              (function () {
	                if (element.tagName === 'A') {
	                  event.preventDefault();
	                }
	
	                var modal = _this5.create(modalElements[0], effectiveOptions);
	                modal.show(event, function (error, shownAlready) {
	                  if (!error && !shownAlready && modal.element.offsetWidth > 0 && modal.element.offsetHeight > 0) {
	                    modal.element.focus();
	                  }
	                });
	              })();
	            }
	          }
	        });
	      }
	    }
	  }, {
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
	}();
	
	Modal.components = new WeakMap();
	Modal.options = {
	  selectorInit: '[data-modal]',
	  attribInitTarget: 'data-modal-target',
	  classVisible: 'is-visible',
	  classNoScroll: 'bx--noscroll',
	  eventBeforeShown: 'modal-beingshown',
	  eventAfterShown: 'modal-shown',
	  eventBeforeHidden: 'modal-beinghidden',
	  eventAfterHidden: 'modal-hidden'
	};
	exports.default = Modal;

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	__webpack_require__(5);
	
	__webpack_require__(3);
	
	__webpack_require__(4);
	
	__webpack_require__(10);
	
	var _eventMatches = __webpack_require__(7);
	
	var _eventMatches2 = _interopRequireDefault(_eventMatches);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var HeaderNav = function () {
	  /**
	   * Header with taxonomy menu.
	   * @deprecated
	   * @implements Component
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
	  function HeaderNav(element) {
	    var _this = this;
	
	    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	
	    _classCallCheck(this, HeaderNav);
	
	    if (!element || element.nodeType !== Node.ELEMENT_NODE) {
	      throw new TypeError('DOM element should be given to initialize this widget.');
	    }
	
	    this.element = element;
	
	    this.options = Object.assign(Object.create(this.constructor.options), options);
	
	    this.constructor.components.set(this.element, this);
	
	    this.menuNode = this.element.querySelector(this.options.selectorMenu);
	
	    this.element.addEventListener('keydown', function (event) {
	      return _this.toggleNav(event);
	    });
	
	    [].concat(_toConsumableArray(this.element.querySelectorAll(this.options.selectorItemLink))).forEach(function (item) {
	      item.addEventListener('click', function (e) {
	        return _this.select(e);
	      });
	    });
	  }
	
	  /**
	   * Instantiates taxonomy menus in the given element.
	   * If the given element indicates that it's an taxonomy menu, instantiates it.
	   * Otherwise, instantiates taxonomy menus by clicking on launcher buttons
	   * (buttons with `data-nav-target` attribute) of taxonomy menus in the given node.
	   * @implements Component
	   * @param {Node} target The DOM node to instantiate taxonomy menus in. Should be a document or an element.
	   * @param {Object} [options] The component options.
	   * @param {string} [options.selectorInit] The CSS selector to find taxonomy menus.
	   * @param {string} [options.attribInitTarget] The attribute name in the lancher buttons to find taxonomy menus.
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
	   * @returns {Handle} The handle to remove the event listener to handle clicking.
	   */
	
	
	  _createClass(HeaderNav, [{
	    key: 'toggleNav',
	
	
	    /**
	     * Shows/hides this taxonomy menu.
	     * @param {Event} event The event triggering this function.
	     */
	    value: function toggleNav(event) {
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
	
	      var eventStart = new CustomEvent(this.options[add ? 'eventBeforeShown' : 'eventBeforeHidden'], {
	        bubbles: true,
	        cancelable: true,
	        detail: { launchingElement: launchingElement }
	      });
	      var defaultNotPrevented = this.element.dispatchEvent(eventStart);
	
	      if (add) {
	        this.triggerNode = launchingElement;
	        this.triggerLabelNode = this.triggerNode.querySelector(this.options.selectorTriggerLabel);
	      }
	
	      if (defaultNotPrevented) {
	        this.element.classList[add ? 'add' : 'remove'](this.options.classActive);
	        (this.element.classList.contains(this.options.classActive) ? this.menuNode : this.triggerNode).focus();
	        this.element.dispatchEvent(new CustomEvent(this.options[add ? 'eventAfterShown' : 'eventAfterHidden'], {
	          bubbles: true,
	          cancelable: true,
	          detail: { launchingElement: launchingElement }
	        }));
	      }
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
	  }, {
	    key: 'release',
	    value: function release() {
	      this.constructor.components.delete(this.element);
	    }
	
	    /**
	     * @deprecated
	     */
	
	  }], [{
	    key: 'init',
	    value: function init() {
	      var _this2 = this;
	
	      var target = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document;
	      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	
	      var effectiveOptions = Object.assign(Object.create(this.options), options);
	      if (target.nodeType !== Node.ELEMENT_NODE && target.nodeType !== Node.DOCUMENT_NODE) {
	        throw new Error('DOM document or DOM element should be given to search for and initialize this widget.');
	      }
	      if (target.nodeType === Node.ELEMENT_NODE && target.matches(effectiveOptions.selectorInit)) {
	        this.create(target, effectiveOptions);
	      } else {
	        var _ret = function () {
	          var handler = function handler(event) {
	            var element = (0, _eventMatches2.default)(event, '[' + effectiveOptions.attribInitTarget + ']');
	
	            if (element) {
	              var headerElements = [].concat(_toConsumableArray(element.ownerDocument.querySelectorAll(element.getAttribute(effectiveOptions.attribInitTarget))));
	              if (headerElements.length > 1) {
	                throw new Error('Target header must be unique.');
	              }
	
	              if (headerElements.length === 1) {
	                if (element.tagName === 'A') {
	                  event.preventDefault();
	                }
	                _this2.create(headerElements[0], effectiveOptions).toggleNav(event);
	              }
	            }
	          };
	
	          target.addEventListener('click', handler);
	          target.addEventListener('keydown', handler);
	
	          return {
	            v: {
	              release: function release() {
	                target.removeEventListener('keydown', handler);
	                target.removeEventListener('click', handler);
	              }
	            }
	          };
	        }();
	
	        if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
	      }
	    }
	
	    /**
	     * Instantiates taxonomy menu of the given element.
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
	
	  }, {
	    key: 'create',
	    value: function create(element, options) {
	      return this.components.get(element) || new this(element, options);
	    }
	  }, {
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
	}();
	
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
	  eventAfterSelected: 'header-selected'
	};
	exports.default = HeaderNav;

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	__webpack_require__(5);
	
	__webpack_require__(3);
	
	__webpack_require__(4);
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Toolbars = function () {
	  /**
	   * Search button in tool bar.
	   * @implements Component
	   * @param {HTMLElement} element The element working as an search button.
	   */
	  function Toolbars(element) {
	    var _this = this;
	
	    _classCallCheck(this, Toolbars);
	
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
	
	
	  _createClass(Toolbars, [{
	    key: 'handleActionClick',
	
	
	    /**
	     * Show/hide search box.
	     * @param {Event} event The event triggering this method.
	     */
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
	
	  }], [{
	    key: 'create',
	    value: function create(element) {
	      return this.components.get(element) || new this(element);
	    }
	
	    /**
	     * Instantiates search buttons in the given node.
	     * If the given element indicates that it's an search button, instantiates it.
	     * Otherwise, instantiates search buttons by searching for search buttons in the given node.
	     * @param {Node} target The DOM node to instantiate search buttons in. Should be a document or an element.
	     * @param {Object} [options] The component options.
	     * @param {string} [options.selectorInit] The CSS selector to find search buttons.
	     */
	
	  }, {
	    key: 'init',
	    value: function init() {
	      var _this2 = this;
	
	      var target = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document;
	      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	
	      var effectiveOptions = Object.assign(Object.create(this.options), options);
	      if (target.nodeType !== Node.ELEMENT_NODE && target.nodeType !== Node.DOCUMENT_NODE) {
	        throw new Error('DOM document or DOM element should be given to search for and initialize this widget.');
	      }
	      if (target.nodeType === Node.ELEMENT_NODE && target.matches(effectiveOptions.selectorInit)) {
	        this.create(target);
	      } else {
	        [].concat(_toConsumableArray(target.querySelectorAll(effectiveOptions.selectorInit))).forEach(function (element) {
	          return _this2.create(element);
	        });
	      }
	    }
	  }]);
	
	  return Toolbars;
	}();
	
	Toolbars.components = new WeakMap();
	Toolbars.options = {
	  selectorInit: '[data-list-icons-search-action-target]'
	};
	exports.default = Toolbars;

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	__webpack_require__(5);
	
	__webpack_require__(3);
	
	__webpack_require__(4);
	
	var _toggleClass = __webpack_require__(11);
	
	var _toggleClass2 = _interopRequireDefault(_toggleClass);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Loading = function () {
	  /**
	   * Spinner indicating loading state.
	   * @implements Component
	   * @param {HTMLElement} element The element working as a spinner.
	   * @param {Object} [options] The component options.
	   * @param {boolean} [options.active] `true` if this spinner should roll.
	   */
	  function Loading(element) {
	    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	
	    _classCallCheck(this, Loading);
	
	    if (!element || element.nodeType !== Node.ELEMENT_NODE) {
	      throw new TypeError('DOM element should be given to initialize this widget.');
	    }
	
	    this.element = element;
	    this.options = Object.assign(Object.create(this.constructor.options), options);
	    this.active = this.options.active;
	    this.ie = false;
	
	    // Check if browser is Internet Explorer
	    if (options.ie || window.ActiveXObject || 'ActiveXObject' in window) {
	      this.ie = true;
	      this.element.classList.add('bx--loading--ie');
	    }
	
	    this.constructor.components.set(this.element, this);
	
	    // Initialize spinner
	    this.set(this.active);
	  }
	
	  /**
	   * Instantiates spinner of the given element.
	   * @param {HTMLElement} element The element.
	   */
	
	
	  _createClass(Loading, [{
	    key: 'set',
	
	
	    /**
	     * Sets active/inactive state.
	     * @param {boolean} active `true` if this spinner should roll.
	     */
	    value: function set(active) {
	      if (typeof active !== 'boolean') {
	        throw new TypeError('set expects a boolean.');
	      }
	
	      this.active = active;
	
	      if (this.ie) {
	        (0, _toggleClass2.default)(this.element, 'bx--loading--stop--ie', !this.active);
	      }
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
	  }, {
	    key: 'release',
	    value: function release() {
	      this.constructor.components.delete(this.element);
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
	
	  }], [{
	    key: 'create',
	    value: function create(element) {
	      return this.components.get(element) || new this(element);
	    }
	
	    /**
	     * Instantiates spinner in the given node.
	     * If the given element indicates that it's an spinner, instantiates it.
	     * Otherwise, instantiates spinners by searching for spinners in the given node.
	     * @param {Node} target The DOM node to instantiate spinners in. Should be a document or an element.
	     * @param {Object} [options] The component options.
	     * @param {boolean} [options.selectorInit] The CSS selector to find spinners.
	     * @param {boolean} [options.active] `true` if this spinner should roll.
	     */
	
	  }, {
	    key: 'init',
	    value: function init() {
	      var _this = this;
	
	      var target = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document;
	      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	
	      var effectiveOptions = Object.assign(Object.create(this.options), options);
	      if (target.nodeType !== Node.ELEMENT_NODE && target.nodeType !== Node.DOCUMENT_NODE) {
	        throw new Error('DOM document or DOM element should be given to search for and initialize this widget.');
	      }
	      if (target.nodeType === Node.ELEMENT_NODE && target.matches(effectiveOptions.selectorInit)) {
	        this.create(target, effectiveOptions);
	      } else {
	        [].concat(_toConsumableArray(target.querySelectorAll(effectiveOptions.selectorInit))).forEach(function (element) {
	          return _this.create(element, effectiveOptions);
	        });
	      }
	    }
	  }]);
	
	  return Loading;
	}();
	
	Loading.components = new WeakMap();
	Loading.options = {
	  selectorInit: '[data-loading]',
	  active: true
	};
	exports.default = Loading;

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _eventMatches = __webpack_require__(7);
	
	var _eventMatches2 = _interopRequireDefault(_eventMatches);
	
	__webpack_require__(5);
	
	__webpack_require__(3);
	
	__webpack_require__(4);
	
	__webpack_require__(10);
	
	var _on = __webpack_require__(8);
	
	var _on2 = _interopRequireDefault(_on);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Dropdown = function () {
	  /**
	   * A selector with drop downs.
	   * @implements Component
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
	  function Dropdown(element) {
	    var _this = this;
	
	    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	
	    _classCallCheck(this, Dropdown);
	
	    if (!element || element.nodeType !== Node.ELEMENT_NODE) {
	      throw new TypeError('DOM element should be given to initialize this widget.');
	    }
	
	    this.element = element;
	
	    this.options = Object.assign(Object.create(this.constructor.options), options);
	
	    if (this.element.dataset.dropdown !== 'navigation') {
	      this.element.dataset.dropdown = '';
	    }
	    this.constructor.components.set(this.element, this);
	
	    /**
	     * The handle to release click event listener on document object.
	     * @member {Handle}
	     */
	    this.hDocumentClick = (0, _on2.default)(this.element.ownerDocument, 'click', function (event) {
	      return _this.toggle(event);
	    });
	
	    this.setCloseOnBlur();
	
	    this.element.addEventListener('keypress', function (event) {
	      return _this.toggle(event);
	    });
	    this.element.addEventListener('click', function (event) {
	      var item = (0, _eventMatches2.default)(event, _this.options.selectorItem);
	      if (item) {
	        _this.select(item);
	      }
	    });
	  }
	
	  /**
	   * Instantiates selector of the given element.
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
	
	
	  _createClass(Dropdown, [{
	    key: 'release',
	    value: function release() {
	      if (this.hFocusIn) {
	        this.hFocusIn = this.hFocusIn.release();
	      }
	      if (this.hDocumentClick) {
	        this.hDocumentClick = this.hDocumentClick.release();
	      }
	      this.constructor.components.delete(this.element);
	    }
	
	    /**
	     * Opens and closes the dropdown menu.
	     * @param {Event} event The event triggering this method.
	     */
	
	  }, {
	    key: 'toggle',
	    value: function toggle(event) {
	      if (event.which === 13 || event.which === 32 || event.type === 'click') {
	        var isOfSelf = this.element.contains(event.target);
	
	        if (isOfSelf) {
	          this.element.classList.toggle('bx--dropdown--open');
	        } else if (!isOfSelf && this.element.classList.contains('bx--dropdown--open')) {
	          this.element.classList.remove('bx--dropdown--open');
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
	      var _this2 = this;
	
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
	            item.classList.remove(_this2.options.classSelected);
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
	      var _this3 = this;
	
	      var hasFocusin = 'onfocusin' in window;
	      var focusinEventName = hasFocusin ? 'focusin' : 'focus';
	      this.hFocusIn = (0, _on2.default)(this.element.ownerDocument, focusinEventName, function (event) {
	        if (!_this3.element.contains(event.target)) {
	          _this3.element.classList.remove('bx--dropdown--open');
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
	
	  }], [{
	    key: 'create',
	    value: function create(element, options) {
	      return this.components.get(element) || new this(element, options);
	    }
	
	    /**
	     * Instantiates selectors in the given node.
	     * If the given element indicates that it's an selector, instantiates it.
	     * Otherwise, instantiates selectors by searching for selectors in the given node.
	     * @param {Node} target The DOM node to instantiate selectors in. Should be a document or an element.
	     * @param {Object} [options] The component options.
	     * @param {string} [options.selectorInit] The CSS selector to find selectors.
	     * @param {string} [options.selectorItem] The CSS selector to find clickable areas in dropdown items.
	     * @param {string} [options.selectorItemSelected] The CSS selector to find the clickable area in the selected dropdown item.
	     * @param {string} [options.classSelected] The CSS class for the selected dropdown item.
	     * @param {string} [options.eventBeforeSelected]
	     *   The name of the custom event fired before a drop down item is selected.
	     *   Cancellation of this event stops selection of drop down item.
	     * @param {string} [options.eventAfterSelected] The name of the custom event fired after a drop down item is selected.
	     */
	
	  }, {
	    key: 'init',
	    value: function init() {
	      var _this4 = this;
	
	      var target = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document;
	      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	
	      var effectiveOptions = Object.assign(Object.create(this.options), options);
	      if (target.nodeType !== Node.ELEMENT_NODE && target.nodeType !== Node.DOCUMENT_NODE) {
	        throw new Error('DOM document or DOM element should be given to search for and initialize this widget.');
	      }
	      if (target.nodeType === Node.ELEMENT_NODE && target.matches(effectiveOptions.selectorInit)) {
	        this.create(target, effectiveOptions);
	      } else {
	        [].concat(_toConsumableArray(target.querySelectorAll(effectiveOptions.selectorInit))).forEach(function (element) {
	          return _this4.create(element, effectiveOptions);
	        });
	      }
	    }
	  }]);
	
	  return Dropdown;
	}();
	
	Dropdown.components = new WeakMap();
	Dropdown.options = {
	  selectorInit: '[data-dropdown]',
	  selectorItem: '[data-option] > .bx--dropdown__link',
	  selectorItemSelected: '[data-option] > .bx--dropdown__link.bx--dropdown--selected',
	  classSelected: 'bx--dropdown--selected',
	  eventBeforeSelected: 'dropdown-beingselected',
	  eventAfterSelected: 'dropdown-selected'
	};
	exports.default = Dropdown;

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _eventMatches = __webpack_require__(7);
	
	var _eventMatches2 = _interopRequireDefault(_eventMatches);
	
	__webpack_require__(5);
	
	__webpack_require__(3);
	
	__webpack_require__(4);
	
	__webpack_require__(13);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Card = function () {
	  /**
	   * The container for cards.
	   * @implements Component
	   * @param {HTMLElement} element The element working as a container.
	   * @param {Object} [options] The component options.
	   * @param {string} [options.selectorCard] The CSS selector to find cards.
	   */
	  function Card(element) {
	    var _this = this;
	
	    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	
	    _classCallCheck(this, Card);
	
	    if (!element || element.nodeType !== Node.ELEMENT_NODE) {
	      throw new TypeError('DOM element should be given to initialize this widget.');
	    }
	    this.element = element;
	    this.options = Object.assign(Object.create(this.constructor.options), options);
	    this.constructor.components.set(this.element, this);
	    this.element.addEventListener('keydown', function (event) {
	      return _this.cardKeyPress(event);
	    });
	  }
	
	  /**
	   * Instantiates card container of the given element.
	   * @param {HTMLElement} element The element working as a container.
	   * @param {Object} [options] The component options.
	   * @param {string} [options.selectorCard] The CSS selector to find cards.
	   */
	
	
	  _createClass(Card, [{
	    key: 'cardKeyPress',
	
	
	    /**
	     * Goes back/forward among cards,
	     * right arrow key for going forward, left arrow key for going backward.
	     * @param {Event} event The event triggering this method.
	     */
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
	  }, {
	    key: 'release',
	    value: function release() {
	      this.constructor.components.delete(this.element);
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
	
	  }], [{
	    key: 'create',
	    value: function create(element, options) {
	      return this.components.get(element) || new this(element, options);
	    }
	
	    /**
	     * Instantiates card container in the given node.
	     * If the given element indicates that it's an card container, instantiates it.
	     * Otherwise, instantiates card containers by searching for card containers in the given node.
	     * @param {Node} target The DOM node to instantiate card containers in. Should be a document or an element.
	     * @param {Object} [options] The component options.
	     * @param {string} [options.selectorInit] The CSS selector to find card containers.
	     * @param {string} [options.selectorCard] The CSS selector to find cards.
	     */
	
	  }, {
	    key: 'init',
	    value: function init() {
	      var _this2 = this;
	
	      var target = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document;
	      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	
	      var effectiveOptions = Object.assign(Object.create(this.options), options);
	      if (target.nodeType !== Node.ELEMENT_NODE && target.nodeType !== Node.DOCUMENT_NODE) {
	        throw new Error('DOM document or DOM element should be given to search for and initialize this widget.');
	      }
	      if (target.nodeType === Node.ELEMENT_NODE && target.matches(effectiveOptions.selectorInit)) {
	        this.create(target, effectiveOptions);
	      } else {
	        [].concat(_toConsumableArray(target.querySelectorAll(effectiveOptions.selectorInit))).forEach(function (element) {
	          return _this2.create(element, effectiveOptions);
	        });
	      }
	    }
	  }]);
	
	  return Card;
	}();
	
	Card.components = new WeakMap();
	Card.options = {
	  selectorInit: '[data-card-list]',
	  selectorCard: '.bx--card'
	};
	exports.default = Card;

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	__webpack_require__(5);
	
	__webpack_require__(10);
	
	__webpack_require__(3);
	
	__webpack_require__(4);
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var NumberInput = function () {
	  /**
	   * Number input UI.
	   * @implements Component
	   * @param {HTMLElement} element The element working as a number input UI.
	   */
	  function NumberInput(element) {
	    var _this = this;
	
	    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	
	    _classCallCheck(this, NumberInput);
	
	    if (!element || element.nodeType !== Node.ELEMENT_NODE) {
	      throw new TypeError('DOM element should be given to initialize this widget.');
	    }
	
	    this.options = options;
	    this.options.ie = this.options.ie || 'ActiveXObject' in window;
	
	    this.element = element;
	    this.constructor.components.set(this.element, this);
	    // Broken DOM tree is seen with up/down arrows <svg> in IE, which breaks event delegation.
	    // Also <svg> does not seems to have `Element.classList`.
	    this.element.querySelector('.bx--number__arrow--up').addEventListener('click', function (event) {
	      return _this.handleClick(event);
	    });
	    this.element.querySelector('.bx--number__arrow--down').addEventListener('click', function (event) {
	      return _this.handleClick(event);
	    });
	  }
	
	  /**
	   * Instantiates number input UI of the given element.
	   * @param {HTMLElement} element The element.
	   */
	
	
	  _createClass(NumberInput, [{
	    key: 'handleClick',
	
	
	    /**
	     * Increase/decrease number by clicking on up/down icons.
	     * @param {Event} event The event triggering this method.
	     */
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
	  }, {
	    key: 'release',
	    value: function release() {
	      this.constructor.components.delete(this.element);
	    }
	
	    /**
	     * The map associating DOM element and number input UI instance.
	     * @member NumberInput.components
	     * @type {WeakMap}
	     */
	
	
	    /**
	     * The component options.
	     * If `options` is specified in the constructor, {@linkcode NumberInput.create .create()}, or {@linkcode NumberInput.init .init()},
	     * properties in this object are overriden for the instance being create and how {@linkcode NumberInput.init .init()} works.
	     * @member NumberInput.options
	     * @type {Object}
	     * @property {string} selectorInit The CSS selector to find number input UIs.
	     */
	
	  }], [{
	    key: 'create',
	    value: function create(element) {
	      return this.components.get(element) || new this(element);
	    }
	
	    /**
	     * Instantiates number input UI in the given node.
	     * If the given element indicates that it's an number input UI, instantiates it.
	     * Otherwise, instantiates number input UIs by searching for number input UIs in the given node.
	     * @param {Node} target The DOM node to instantiate number input UIs in. Should be a document or an element.
	     * @param {Object} [options] The component options.
	     * @param {boolean} [options.selectorInit] The CSS selector to find number input UIs.
	     */
	
	  }, {
	    key: 'init',
	    value: function init() {
	      var _this2 = this;
	
	      var target = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document;
	      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	
	      var effectiveOptions = Object.assign(Object.create(this.options), options);
	      if (target.nodeType !== Node.ELEMENT_NODE && target.nodeType !== Node.DOCUMENT_NODE) {
	        throw new Error('DOM document or DOM element should be given to search for and initialize this widget.');
	      }
	      if (target.nodeType === Node.ELEMENT_NODE && target.matches(effectiveOptions.selectorInit)) {
	        this.create(target);
	      } else {
	        [].concat(_toConsumableArray(target.querySelectorAll(effectiveOptions.selectorInit))).forEach(function (element) {
	          return _this2.create(element);
	        });
	      }
	    }
	  }]);
	
	  return NumberInput;
	}();
	
	NumberInput.components = new WeakMap();
	NumberInput.options = {
	  selectorInit: '[data-numberinput]'
	};
	exports.default = NumberInput;

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _eventMatches = __webpack_require__(7);
	
	var _eventMatches2 = _interopRequireDefault(_eventMatches);
	
	__webpack_require__(5);
	
	__webpack_require__(3);
	
	__webpack_require__(4);
	
	__webpack_require__(10);
	
	var _resize = __webpack_require__(23);
	
	var _resize2 = _interopRequireDefault(_resize);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
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
	
	    _classCallCheck(this, ResponsiveTable);
	
	    _initialiseProps.call(this);
	
	    if (!element || element.nodeType !== Node.ELEMENT_NODE) {
	      throw new TypeError('Responsive Tables requires a DOM element');
	    }
	
	    this.element = element;
	
	    this.options = Object.assign(Object.create(this.constructor.options), options);
	
	    this.container = element.parentNode; // requires the immediate parent to be the container
	    this.expandCells = [].concat(_toConsumableArray(this.element.querySelectorAll(this.options.selectorExpandCells)));
	    this.expandableRows = [].concat(_toConsumableArray(this.element.querySelectorAll(this.options.selectorExpandableRows)));
	    this.parentRows = [].concat(_toConsumableArray(this.element.querySelectorAll(this.options.selectorParentRows)));
	    this.tableBody = this.element.querySelector(this.options.selectorTableBody);
	
	    this.zebraStripe();
	    this.initExpandableRows();
	    this.initOverflowMenus();
	
	    this.eventHandlers = {
	      expand: this.toggleRowExpand,
	      sort: this.toggleSort,
	      'select-all': this.toggleSelectAll
	    };
	
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
	
	
	  _createClass(ResponsiveTable, [{
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
	
	      var effectiveOptions = Object.assign(Object.create(this.options), options);
	      if (target.nodeType !== Node.ELEMENT_NODE && target.nodeType !== Node.DOCUMENT_NODE) {
	        throw new Error('DOM document or DOM element should be given to search for and initialize this widget.');
	      }
	      if (target.nodeType === Node.ELEMENT_NODE && target.matches(effectiveOptions.selectorInit)) {
	        this.create(target);
	      } else {
	        [].concat(_toConsumableArray(target.querySelectorAll(effectiveOptions.selectorInit))).forEach(function (element) {
	          return _this2.create(element);
	        });
	      }
	    }
	  }]);
	
	  return ResponsiveTable;
	}();
	
	ResponsiveTable.components = new WeakMap();
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
	      _this3.eventHandlers[detail.event](detail);
	      _this3.element.dispatchEvent(eventAfter);
	    }
	  };
	
	  this.zebraStripe = function () {
	    _this3.parentRows.forEach(function (item, index) {
	      if (index % 2 === 0) {
	        item.classList.add(_this3.options.classParentRowEven);
	        if (item.nextElementSibling.classList.contains(_this3.options.classExpandableRow)) {
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
	
	    var menuMap = [].concat(_toConsumableArray(_this3.element.querySelectorAll(_this3.options.selectorOverflowMenu))).map(function (menu) {
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
	      _this3.placeOverflow({
	        detail: menu
	      });
	    });
	  };
	
	  this.placeOverflow = function (evt) {
	    var _evt$detail = evt.detail,
	        element = _evt$detail.element,
	        optionMenu = _evt$detail.optionMenu;
	
	
	    var icon = element.querySelector(_this3.options.selectorOverflowMenuIcon);
	    var position = icon.getBoundingClientRect();
	
	    optionMenu.style.position = 'absolute';
	    optionMenu.style.top = position.top + 'px';
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
	
	    var inputs = [].concat(_toConsumableArray(_this3.element.querySelectorAll(_this3.options.selectorCheckbox)));
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

/***/ },
/* 23 */
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
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	__webpack_require__(10);
	
	__webpack_require__(3);
	
	var _eventMatches = __webpack_require__(7);
	
	var _eventMatches2 = _interopRequireDefault(_eventMatches);
	
	__webpack_require__(4);
	
	var _toggleClass = __webpack_require__(11);
	
	var _toggleClass2 = _interopRequireDefault(_toggleClass);
	
	var _on = __webpack_require__(8);
	
	var _on2 = _interopRequireDefault(_on);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Table = function () {
	  /**
	   * Data table.
	   * @implements Component
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
	  function Table(element) {
	    var _this = this;
	
	    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	
	    _classCallCheck(this, Table);
	
	    if (!element || element.nodeType !== Node.ELEMENT_NODE) {
	      throw new TypeError('DOM element should be given to initialize this widget.');
	    }
	    this.element = element;
	
	    this.options = Object.assign(Object.create(this.constructor.options), options);
	
	    this.constructor.components.set(this.element, this);
	
	    this.element.addEventListener('click', function (event) {
	      return _this.handleClick(event);
	    });
	  }
	
	  /**
	   * Instantiates a data table of the given element.
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
	
	
	  _createClass(Table, [{
	    key: 'handleClick',
	
	
	    /**
	     * Handles click on data table.
	     * * If the click is on a column title, toggles its sorting state.
	     * * If the click is on a check box, toggles the check box.
	     * @param {Event} event The event triggering this method.
	     */
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
	  }, {
	    key: 'release',
	    value: function release() {
	      this.constructor.components.delete(this.element);
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
	
	  }], [{
	    key: 'create',
	    value: function create(element, options) {
	      return this.components.get(element) || new this(element, options);
	    }
	
	    /**
	     * Sets up the given node to instantiate data tables in.
	     * If the given element indicates that it's an data table, instantiates it.
	     * Otherwise, lazily instantiates data table when it's clicked on.
	     * @param {Node} target The DOM node to instantiate data tables in. Should be a document or an element.
	     * @param {Object} [options] The component options.
	     * @param {string} [options.selectorInit] The CSS selector to find data tables.
	     * @param {string} [options.selectorTitle] The CSS selector to find column titles.
	     * @param {string} [options.selectorRow] The CSS selector to find rows.
	     * @param {string} [options.selectorCheckbox] The CSS selector to find check boxes.
	     * @param {string} [options.classSortState] The CSS class for the sorting state.
	     * @param {string} [options.classCheckState] The CSS class for the checked state.
	     * @param {string} [options.eventBeforeSortToggled] The name of the custom event fired before a column's sorting is toggled.
	     * @param {string} [options.eventAfterSortToggled] The name of the custom event fired after a column's sorting is toggled.
	     * @param {string} [options.eventBeforeCheckToggled] The name of the custom event fired before a check box is toggled.
	     * @param {string} [options.eventAfterCheckToggled] The name of the custom event fired after a check box is toggled.
	     * @returns {Handle} The handle to remove the event listener to handle clicking.
	     */
	
	  }, {
	    key: 'init',
	    value: function init() {
	      var _this2 = this;
	
	      var target = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document;
	      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	
	      var effectiveOptions = Object.assign(Object.create(this.options), options);
	      if (target.nodeType !== Node.ELEMENT_NODE && target.nodeType !== Node.DOCUMENT_NODE) {
	        throw new Error('DOM document or DOM element should be given to search for and initialize this widget.');
	      }
	      if (target.nodeType === Node.ELEMENT_NODE && target.matches(effectiveOptions.selectorInit)) {
	        this.create(target, effectiveOptions);
	      } else {
	        return (0, _on2.default)(target, 'click', function (event) {
	          var element = (0, _eventMatches2.default)(event, effectiveOptions.selectorInit);
	          if (element && !_this2.components.has(element)) {
	            _this2.create(element, effectiveOptions).handleClick(event);
	          }
	        });
	      }
	    }
	  }]);
	
	  return Table;
	}();
	
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
	  eventAfterCheckToggled: 'table-check-toggled'
	};
	exports.default = Table;

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	__webpack_require__(5);
	
	__webpack_require__(3);
	
	__webpack_require__(4);
	
	var _lodash = __webpack_require__(26);
	
	var _lodash2 = _interopRequireDefault(_lodash);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var DetailPageHeader = function () {
	
	  /**
	   * The Detail Page Header.
	   * @implements Component
	   * @param {HTMLElement} element The element working as a page header.
	   * @param {Object} [options] The component options.
	   */
	  function DetailPageHeader(element) {
	    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	
	    _classCallCheck(this, DetailPageHeader);
	
	    if (!element || element.nodeType !== Node.ELEMENT_NODE) {
	      throw new TypeError('DOM element should be given to initialize this widget.');
	    }
	
	    this.element = element;
	
	    this.options = Object.assign(this.constructor.options, options);
	
	    this.constructor.components.set(this.element, this);
	
	    // Debounce scroll event calls to handleScroll
	    var debouncedScroll = (0, _lodash2.default)(this.handleScroll.bind(this), 50);
	
	    this.element.ownerDocument.defaultView.addEventListener('scroll', debouncedScroll);
	  }
	
	  /**
	   * Instantiates detail page header of the given element.
	   * @param {HTMLElement} element The element.
	   * @param {Object} [options] The component options.
	   */
	
	
	  _createClass(DetailPageHeader, [{
	    key: 'handleScroll',
	
	
	    /**
	     * Adds class to header based on users position on the page
	     */
	    value: function handleScroll() {
	      if (this.element.ownerDocument.defaultView.scrollY > 101) {
	        this.element.classList.add(this.options.slideUp);
	      } else {
	        this.element.classList.remove(this.options.slideUp);
	      }
	    }
	  }, {
	    key: 'release',
	    value: function release() {
	      this.constructor.components.delete(this.element);
	    }
	
	    /**
	     * The map associating DOM element and detail page header instance.
	     * @member DetailPageHeader.components
	     * @type {WeakMap}
	     */
	
	
	    /**
	     * The component options.
	     * If `options` is specified in the constructor, {@linkcode DetailPageHeader.create .create()}, or {@linkcode DetailPageHeader.init .init()},
	     * properties in this object are overriden for the instance being create and how {@linkcode DetailPageHeader.init .init()} works.
	     * @member DetailPageHeader.options
	     * @type {Object}
	     * @property {string} selectorInit The CSS selector to find detail page headers.
	     */
	
	  }], [{
	    key: 'create',
	    value: function create(element, options) {
	      return this.components.get(element) || new this(element, options);
	    }
	
	    /**
	     * Instantiates the detail page header in the given element.
	     * If the given element indicates that it's a detail page header (animated) (having `data-detail-page-header` attribute), instantiates it.
	     * Otherwise, instantiates detail page header by searching for detail page header in the given node.
	     * @param {Node} target The DOM node to instantiate detail page header in. Should be a document or an element.
	     * @param {Object} [options] The component options.
	     * @param {string} [options.selectorInit] The CSS selector to find detail page headers.
	     */
	
	  }, {
	    key: 'init',
	    value: function init() {
	      var _this = this;
	
	      var target = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document;
	      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	
	      var effectiveOptions = Object.assign(Object.create(this.options), options);
	      if (target.nodeType !== Node.ELEMENT_NODE && target.nodeType !== Node.DOCUMENT_NODE) {
	        throw new Error('DOM document or DOM element should be given to search for and initialize this widget.');
	      }
	      if (target.nodeType === Node.ELEMENT_NODE && target.matches(effectiveOptions.selectorInit)) {
	        this.create(target, effectiveOptions);
	      } else {
	        [].concat(_toConsumableArray(target.querySelectorAll(effectiveOptions.selectorInit))).forEach(function (element) {
	          return _this.create(element, effectiveOptions);
	        });
	      }
	    }
	  }]);
	
	  return DetailPageHeader;
	}();
	
	DetailPageHeader.components = new WeakMap();
	DetailPageHeader.options = {
	  slideUp: 'bx--detail-page-header--with-tabs--animated-slide-up',
	  selectorInit: '[data-detail-page-header]'
	};
	exports.default = DetailPageHeader;

/***/ },
/* 26 */
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
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	__webpack_require__(5);
	
	__webpack_require__(3);
	
	__webpack_require__(4);
	
	__webpack_require__(10);
	
	var _toggleClass = __webpack_require__(11);
	
	var _toggleClass2 = _interopRequireDefault(_toggleClass);
	
	var _eventMatches = __webpack_require__(7);
	
	var _eventMatches2 = _interopRequireDefault(_eventMatches);
	
	var _on = __webpack_require__(8);
	
	var _on2 = _interopRequireDefault(_on);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var LeftNav = function () {
	  /**
	   * Left Navigation.
	   * @implements Component
	   * @param {HTMLElement} element The element working as a left navigation.
	   * @param {Object} [options] The component options
	   * @param {string} [options.selectorLeftNav] The data attribute selector for the nav element in the left nav container.
	   * @param {string} [options.selectorLeftNavList] The data attribute selector for the main ul element in the left nav.
	   * @param {string} [options.selectorLeftNavNestedList] The data attribute selector for the nested ul elements in the left nav.
	   * @param {string} [options.selectorLeftNavToggle] The data attribute selector for the button that will show and hide the left navigation.
	   * @param {string} [options.selectorLeftNavListItem] The data attribute selector for all list items in the left navigation.
	   * @param {string} [options.selectorLeftNavNestedListItem] The data attribute selector for all nested list items in the left navigation.
	   * @param {string} [options.selectorLeftNavArrowIcon] The data attribute selector for the arrow icons in the left nav.
	   * @param {string} [options.selectorLeftNavFlyoutMenu] The data attribute selector for the flyout menus in the left nav.
	   * @param {string} [options.selectorLeftNavFlyoutItem] The data attribute selector for the flyout menu items in the left nav.
	   * @param {string} [options.selectorLeftNavSection] The data attribute selector for the three sections in the header of the left nav.
	   * @param {string} [options.selectorLeftNavCurrentPage] The data attribute selector for the current section title in the left nav header.
	   * @param {string} [options.classActiveLeftNav] The class name for when a left nav is active.
	   * @param {string} [options.classActiveLeftNavListItem] The class name for when a left nav list item is active.
	   * @param {string} [options.classExpandedLeftNavListItem] The class name for when a nested list is expanded.
	   * @param {string} [options.classFlyoutDisplayed] The class name for when a flyout menu is displayed.
	   * @param {string} [options.classActiveSection] The class name for an active section item in the left nav header.
	   * @param {string} [options.classItemHasChildren] The class name for when a list item has children.
	   */
	  function LeftNav(element) {
	    var _this = this;
	
	    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	
	    _classCallCheck(this, LeftNav);
	
	    if (!element || element.nodeType !== Node.ELEMENT_NODE) {
	      throw new TypeError('DOM element should be given to initialize this widget.');
	    }
	
	    this.element = element;
	
	    this.leftNavSectionActive = false;
	
	    this.options = Object.assign(this.constructor.options, options);
	
	    this.constructor.components.set(this.element, this);
	
	    this.hookOpenActions();
	    this.hookListSectionEvents();
	    this.hookListItemsEvents();
	    this.hDocumentClick = (0, _on2.default)(this.element.ownerDocument, 'click', function (evt) {
	      return _this.handleDocumentClick(evt);
	    });
	  }
	
	  /**
	   * Instantiates a left navigation of the given element.
	   * @param {HTMLElement} element The element working as the left navigation.
	   * @param {Object} [options] The component options
	   * @param {string} [options.selectorLeftNav] The data attribute selector for the nav element in the left nav container.
	   * @param {string} [options.selectorLeftNavList] The data attribute selector for the main ul element in the left nav.
	   * @param {string} [options.selectorLeftNavNestedList] The data attribute selector for the nested ul elements in the left nav.
	   * @param {string} [options.selectorLeftNavToggle] The data attribute selector for the button that will show and hide the left navigation.
	   * @param {string} [options.selectorLeftNavListItem] The data attribute selector for all list items in the left navigation.
	   * @param {string} [options.selectorLeftNavNestedListItem] The data attribute selector for all nested list items in the left navigation.
	   * @param {string} [options.selectorLeftNavArrowIcon] The data attribute selector for the arrow icons in the left nav.
	   * @param {string} [options.selectorLeftNavFlyoutMenu] The data attribute selector for the flyout menus in the left nav.
	   * @param {string} [options.selectorLeftNavFlyoutItem] The data attribute selector for the flyout menu items in the left nav.
	   * @param {string} [options.selectorLeftNavSection] The data attribute selector for the three sections in the header of the left nav.
	   * @param {string} [options.selectorLeftNavCurrentPage] The data attribute selector for the current section title in the left nav header.
	   * @param {string} [options.classActiveLeftNav] The class name for when a left nav is active.
	   * @param {string} [options.classActiveLeftNavListItem] The class name for when a left nav list item is active.
	   * @param {string} [options.classExpandedLeftNavListItem] The class name for when a nested list is expanded.
	   * @param {string} [options.classFlyoutDisplayed] The class name for when a flyout menu is displayed.
	   * @param {string} [options.classActiveSection] The class name for an active section item in the left nav header.
	   * @param {string} [options.classItemHasChildren] The class name for when a list item has children.
	   */
	
	
	  _createClass(LeftNav, [{
	    key: 'closeMenu',
	
	
	    /**
	     * Closes the menu.
	     */
	    value: function closeMenu() {
	      this.element.classList.remove(this.options.classActiveLeftNav);
	      this.element.ownerDocument.querySelector(this.options.selectorLeftNavToggleOpen).classList.remove(this.options.classActiveTrigger);
	      this.element.querySelector(this.options.selectorLeftNav).parentNode.setAttribute('aria-expanded', 'false');
	    }
	
	    /**
	     * Toggles the menu to open and close.
	     */
	
	  }, {
	    key: 'toggleMenu',
	    value: function toggleMenu() {
	      var leftNavContainer = this.element.querySelector(this.options.selectorLeftNav).parentNode;
	      this.element.classList.toggle(this.options.classActiveLeftNav);
	      this.element.ownerDocument.querySelector(this.options.selectorLeftNavToggleOpen).classList.toggle(this.options.classActiveTrigger);
	      if (leftNavContainer.getAttribute('aria-expanded') === 'false') leftNavContainer.setAttribute('aria-expanded', 'true');else leftNavContainer.setAttribute('aria-expanded', 'false');
	    }
	
	    /**
	     * Adds a transitional animation to the navSection
	     */
	
	  }, {
	    key: 'animateNavSection',
	    value: function animateNavSection(selectedNav) {
	      var _this2 = this;
	
	      var selectedNavValue = selectedNav.dataset.leftNavSection;
	      var selectedNavLink = selectedNav.querySelector(this.options.selectorLeftNavSectionLink);
	      var leftNav = this.element.querySelector(this.options.selectorLeftNav);
	      var leftNavSections = this.element.querySelector(this.options.selectorLeftNavSections);
	
	      selectedNav.classList.remove(this.options.classNavSection);
	      selectedNav.classList.remove(this.options.classNavSection + '--' + selectedNavValue);
	      selectedNav.classList.add(this.options.classNavSectionTransition);
	      if (leftNavSections.children[0] === selectedNav) selectedNav.classList.add(this.options.classNavSectionTransition + '--50'); // First child only move 50px
	      else selectedNav.classList.add(this.options.classNavSectionTransition + '--100'); // Second move 100px
	      selectedNav.setAttribute('data-left-nav-section', selectedNavValue);
	      /* Not sure what trick more performant*/
	      setTimeout(function () {
	        selectedNav.classList.add(_this2.options.classNavSectionTransition + '--0');
	      }, 100); // Could probably use a promise here
	
	      selectedNavLink.classList.remove(this.options.classNavSectionLink);
	      selectedNavLink.classList.add(this.options.classNavHeaderTitle);
	      selectedNavLink.setAttribute('data-left-nav-current-section-title', '');
	      selectedNavLink.removeAttribute('data-left-nav-section-link');
	
	      this.element.insertBefore(selectedNav, leftNav);
	    }
	
	    /**
	     * Adds a transitional animation to the navigation items on nav section click
	     */
	
	  }, {
	    key: 'animateNavList',
	    value: function animateNavList(selectedNavTitle) {
	      var _this3 = this;
	
	      var currentLeftNavList = this.element.querySelector(this.options.selectorLeftNavList + ':not(.bx--left-nav__main-nav--hidden)');
	      var newLeftNavList = this.element.querySelector('[data-left-nav-list=' + selectedNavTitle + ']');
	      var currentLeftNavItems = [].concat(_toConsumableArray(currentLeftNavList.querySelectorAll(this.options.selectorLeftNavListItem))).reverse();
	      var newLeftNavItems = [].concat(_toConsumableArray(newLeftNavList.querySelectorAll(this.options.selectorLeftNavListItem)));
	
	      var fadeOutTime = 300;
	      var counter = 0;
	      var counterIteration = fadeOutTime / currentLeftNavItems.length; // Length of animation divided by number of items
	      currentLeftNavItems.forEach(function (item) {
	        item.setAttribute('tabIndex', '-1');
	        setTimeout(function () {
	          item.classList.add(_this3.options.classItemFade);
	        }, counter);
	        counter += counterIteration;
	      });
	
	      newLeftNavItems.forEach(function (item) {
	        item.setAttribute('tabIndex', '0');
	        item.classList.remove(_this3.options.classItemFade);
	      });
	
	      setTimeout(function () {
	        currentLeftNavList.classList.add(_this3.options.classListHidden);
	        currentLeftNavList.classList.add(_this3.options.classListTop);
	        currentLeftNavList.setAttribute('aria-hidden', 'true');
	        newLeftNavList.classList.remove(_this3.options.classListHidden);
	        setTimeout(function () {
	          newLeftNavList.classList.remove(_this3.options.classListTop);
	        }, 100);
	        newLeftNavList.setAttribute('aria-hidden', 'false');
	      }, fadeOutTime + 100); // Wait for items to fade out.
	    }
	  }, {
	    key: 'hookOpenActions',
	    value: function hookOpenActions() {
	      var _this4 = this;
	
	      var openBtn = this.element.ownerDocument.querySelector(this.options.selectorLeftNavToggleOpen);
	      var closeBtn = this.element.ownerDocument.querySelector(this.options.selectorLeftNavToggleClose);
	
	      openBtn.addEventListener('click', function () {
	        _this4.element.tabIndex = '0';
	        _this4.toggleMenu();
	      });
	
	      openBtn.addEventListener('keydown', function (evt) {
	        if (evt.which === 13) {
	          _this4.element.tabIndex = '0';
	          _this4.toggleMenu();
	        }
	      });
	
	      if (closeBtn) {
	        closeBtn.addEventListener('click', function () {
	          _this4.element.tabIndex = '-1';
	          _this4.closeMenu();
	        });
	
	        closeBtn.addEventListener('keydown', function (evt) {
	          if (evt.which === 13) {
	            _this4.element.tabIndex = '-1';
	            _this4.closeMenu();
	          }
	        });
	      }
	
	      this.element.ownerDocument.addEventListener('keydown', function (evt) {
	        if (evt.which === 27 && _this4.element.classList.contains(_this4.options.classActiveLeftNav)) {
	          _this4.closeMenu();
	        }
	      });
	    }
	
	    /**
	     * Addes Event listeners to list sections
	     */
	
	  }, {
	    key: 'hookListSectionEvents',
	    value: function hookListSectionEvents() {
	      var _this5 = this;
	
	      var leftNavSections = this.element.querySelector(this.options.selectorLeftNavSections);
	      leftNavSections.addEventListener('click', function (evt) {
	        _this5.handleSectionItemClick(evt, leftNavSections);
	      });
	
	      leftNavSections.addEventListener('keydown', function (evt) {
	        if (evt.which === 13) {
	          _this5.handleSectionItemClick(evt, leftNavSections);
	          _this5.element.querySelector(_this5.options.selectorLeftNavCurrentSectionTitle).focus();
	        }
	      });
	    }
	
	    /**
	     * Adds event listeners to list items
	     */
	
	  }, {
	    key: 'hookListItemsEvents',
	    value: function hookListItemsEvents() {
	      var _this6 = this;
	
	      var leftNavList = [].concat(_toConsumableArray(this.element.querySelectorAll(this.options.selectorLeftNavList)));
	      leftNavList.forEach(function (list) {
	        list.addEventListener('click', function (evt) {
	          var leftNavItem = (0, _eventMatches2.default)(evt, _this6.options.selectorLeftNavListItem);
	          if (leftNavItem) {
	            var childItem = (0, _eventMatches2.default)(evt, _this6.options.selectorLeftNavNestedListItem);
	            var hasChildren = (0, _eventMatches2.default)(evt, _this6.options.selectorLeftNavListItemHasChildren);
	            var flyoutItem = (0, _eventMatches2.default)(evt, _this6.options.selectorLeftNavFlyoutItem);
	            if (flyoutItem) {
	              _this6.addActiveListItem(flyoutItem);
	            } else if (childItem) {
	              if (childItem.querySelector(_this6.options.selectorLeftNavFlyoutMenu)) {
	                var flyoutMenu = childItem.querySelector(_this6.options.selectorLeftNavFlyoutMenu);
	                flyoutMenu.classList.toggle(_this6.options.classFlyoutDisplayed);
	              } else {
	                _this6.addActiveListItem(childItem);
	              }
	            } else if (hasChildren) {
	              _this6.handleNestedListClick(leftNavItem);
	            } else {
	              _this6.addActiveListItem(leftNavItem);
	            }
	          }
	        });
	        list.addEventListener('keydown', function (evt) {
	          if (evt.which === 13) {
	            var leftNavItem = (0, _eventMatches2.default)(evt, _this6.options.selectorLeftNavListItem);
	            if (leftNavItem) {
	              var childItem = (0, _eventMatches2.default)(evt, _this6.options.selectorLeftNavNestedListItem);
	              var hasChildren = (0, _eventMatches2.default)(evt, _this6.options.selectorLeftNavListItemHasChildren);
	              var flyoutItem = (0, _eventMatches2.default)(evt, _this6.options.selectorLeftNavFlyoutItem);
	              if (flyoutItem) {
	                _this6.addActiveListItem(flyoutItem);
	              } else if (childItem) {
	                if (!childItem.querySelector(_this6.options.selectorLeftNavFlyoutMenu)) {
	                  _this6.addActiveListItem(childItem);
	                } else {
	                  childItem.querySelector(_this6.options.selectorLeftNavFlyoutMenu).setAttribute('aria-hidden', 'false');
	                  childItem.querySelector(_this6.options.selectorLeftNavFlyoutMenu).style.top = childItem.offsetTop - _this6.element.querySelector(_this6.options.selectorLeftNav).scrollTop + 'px';
	                  childItem.querySelector(_this6.options.selectorLeftNavFlyoutMenu).style.left = childItem.offsetLeft + Math.round(childItem.offsetWidth) + 'px';
	                }
	              } else if (hasChildren) {
	                _this6.handleNestedListClick(leftNavItem);
	              } else {
	                _this6.addActiveListItem(leftNavItem);
	              }
	            }
	          }
	        });
	      });
	      var flyouts = [].concat(_toConsumableArray(this.element.ownerDocument.querySelectorAll(this.options.selectorLeftNavListItemHasFlyout)));
	      flyouts.forEach(function (flyout) {
	        flyout.addEventListener('mouseenter', function () {
	          flyout.querySelector(_this6.options.selectorLeftNavFlyoutMenu).setAttribute('aria-hidden', 'false');
	          flyout.querySelector(_this6.options.selectorLeftNavFlyoutMenu).style.top = flyout.offsetTop - _this6.element.querySelector(_this6.options.selectorLeftNav).scrollTop + 'px';
	          flyout.querySelector(_this6.options.selectorLeftNavFlyoutMenu).style.left = flyout.offsetLeft + Math.round(flyout.offsetWidth) + 'px';
	          flyout.querySelector(_this6.options.selectorLeftNavFlyoutMenu).classList.toggle(_this6.options.classFlyoutDisplayed);
	        });
	        flyout.addEventListener('mouseleave', function () {
	          flyout.querySelector(_this6.options.selectorLeftNavFlyoutMenu).setAttribute('aria-hidden', 'true');
	          flyout.querySelector(_this6.options.selectorLeftNavFlyoutMenu).classList.remove(_this6.options.classFlyoutDisplayed);
	        });
	      });
	    }
	
	    /**
	     * Hides all flyout menus.
	     */
	
	  }, {
	    key: 'hideAllFlyoutMenus',
	    value: function hideAllFlyoutMenus() {
	      var _this7 = this;
	
	      var flyoutMenus = [].concat(_toConsumableArray(this.element.querySelectorAll(this.options.selectorLeftNavFlyoutMenu)));
	      flyoutMenus.forEach(function (menu) {
	        menu.setAttribute('aria-hidden', 'true');
	        menu.classList.remove(_this7.options.classFlyoutDisplayed);
	      });
	    }
	
	    /**
	     * Sets a list item as active.
	     * @param {Object} item The active list item.
	     */
	
	  }, {
	    key: 'addActiveListItem',
	    value: function addActiveListItem(item) {
	      var _this8 = this;
	
	      [].concat(_toConsumableArray(this.element.querySelectorAll(this.options.selectorLeftNavAllListItems))).forEach(function (currentItem) {
	        if (!(item === currentItem)) {
	          if (!currentItem.contains(item)) {
	            currentItem.classList.remove(_this8.options.classActiveLeftNavListItem);
	          } else {
	            currentItem.classList.add(_this8.options.classActiveLeftNavListItem);
	          }
	        }
	      });
	      [].concat(_toConsumableArray(this.element.querySelectorAll(this.options.selectorLeftNavNestedListItem))).forEach(function (currentItem) {
	        if (!(item === currentItem)) {
	          currentItem.classList.remove(_this8.options.classActiveLeftNavListItem);
	        }
	      });
	      item.classList.add(this.options.classActiveLeftNavListItem);
	      this.closeMenu();
	      this.hideAllFlyoutMenus();
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
	      var flyoutOpen = void 0;
	      if (this.element.querySelector(this.options.selectorLeftNavFlyoutMenu)) {
	        flyoutOpen = this.element.querySelector(this.options.selectorLeftNavFlyoutMenu).classList.contains(this.options.classFlyoutDisplayed);
	      }
	      if (isOfSelf && this.element.tagName === 'A') {
	        evt.preventDefault();
	      }
	      if (shouldClose) {
	        this.closeMenu();
	      }
	      if (this.element.querySelector(this.options.selectorLeftNavFlyoutMenu)) {
	        if (flyoutOpen && !isOfSelf && isOpen) {
	          this.element.querySelector(this.options.selectorLeftNavFlyoutMenu).classList.remove(this.options.classFlyoutDisplayed);
	        }
	      }
	    }
	
	    /**
	     * Handles click on a list item that contains a nested list in the left navigation.
	     * It hides all flyout menus and switches the tab-index on the list items based on whether or not the list is expanded.
	     * @param {HTMLElement} listItem The list item that was clicked.
	     * @param {Event} event The event triggering this method.
	     */
	
	  }, {
	    key: 'handleNestedListClick',
	    value: function handleNestedListClick(listItem) {
	      var _this9 = this;
	
	      var isOpen = listItem.classList.contains(this.options.classExpandedLeftNavListItem);
	      this.hideAllFlyoutMenus();
	      (0, _toggleClass2.default)(listItem, this.options.classExpandedLeftNavListItem, !isOpen);
	      var listItems = [].concat(_toConsumableArray(listItem.querySelectorAll(this.options.selectorLeftNavNestedListItem)));
	      listItems.forEach(function (item) {
	        if (isOpen) {
	          listItem.querySelector(_this9.options.selectorLeftNavNestedList).setAttribute('aria-hidden', 'true');
	          item.querySelector(_this9.options.selectorLeftNavListItemLink).tabIndex = -1;
	        } else {
	          listItem.querySelector(_this9.options.selectorLeftNavNestedList).setAttribute('aria-hidden', 'false');
	          item.querySelector(_this9.options.selectorLeftNavListItemLink).tabIndex = 0;
	        }
	      });
	    }
	  }, {
	    key: 'handleSectionItemClick',
	    value: function handleSectionItemClick(evt, leftNavSections) {
	      var _this10 = this;
	
	      // Sorry
	      var leftNavSectionItem = (0, _eventMatches2.default)(evt, this.options.selectorLeftNavSection);
	      if (leftNavSectionItem) {
	        var _ret = function () {
	          // currently selected
	          var selectedLeftNavSectionItem = _this10.element.querySelector(_this10.options.selectorLeftNavCurrentSection);
	          var selectedLeftNavSectionItemTitle = selectedLeftNavSectionItem.querySelector(_this10.options.selectorLeftNavCurrentSectionTitle);
	          var selectedLeftNavSectionItemIcon = _this10.element.querySelector(_this10.options.selectorLeftNavCurrentSectionIcon);
	          var selectedLeftNavSectionItemUse = selectedLeftNavSectionItemIcon.querySelector('use');
	          var selectedLeftNavSectionValue = selectedLeftNavSectionItem.dataset.leftNavCurrentSection;
	
	          // clicked on item
	          var leftNavSectionItemLink = leftNavSectionItem.querySelector(_this10.options.selectorLeftNavSectionLink);
	          var leftNavSectionItemIcon = leftNavSectionItem.querySelector(_this10.options.selectorLeftNavSectionIcon);
	          var leftNavSectionItemIconUse = leftNavSectionItemIcon.querySelector('use');
	          var leftNavSectionValue = leftNavSectionItem.dataset.leftNavSection;
	
	          if (_this10.leftNavSectionActive) {
	            return {
	              v: void 0
	            };
	          }
	          _this10.leftNavSectionActive = true;
	
	          var newLeftNavSectionItem = document.createElement('li');
	          newLeftNavSectionItem.setAttribute('data-left-nav-section', selectedLeftNavSectionValue);
	          newLeftNavSectionItem.classList.add(_this10.options.classNavSection);
	          newLeftNavSectionItem.classList.add(_this10.options.classNavSection + '--' + selectedLeftNavSectionValue);
	
	          var newLeftNavSectionItemAnchor = document.createElement('a');
	          newLeftNavSectionItemAnchor.setAttribute('href', 'javascript:void(0)'); // eslint-disable-line no-script-url
	          newLeftNavSectionItemAnchor.setAttribute('tabindex', 0);
	          newLeftNavSectionItemAnchor.classList.add(_this10.options.classNavSectionAnchor);
	
	          var newLeftNavSectionItemIcon = selectedLeftNavSectionItemIcon.cloneNode(true);
	          // IE11 doesn't support classList on SVG, must revert to className
	          newLeftNavSectionItemIcon.setAttribute('class', 'bx--left-nav__section--taxonomy-icon');
	          newLeftNavSectionItemIcon.removeAttribute('data-left-nav-current-section-icon');
	          newLeftNavSectionItemIcon.setAttribute('data-left-nav-section-icon', selectedLeftNavSectionValue);
	
	          var newLeftNavSectionItemLink = document.createElement('span');
	          newLeftNavSectionItemLink.setAttribute('data-left-nav-section-link', '');
	          newLeftNavSectionItemLink.classList.add(_this10.options.classNavSectionLink);
	          newLeftNavSectionItemLink.textContent = selectedLeftNavSectionItemTitle.textContent;
	
	          _this10.animateNavSection(leftNavSectionItem);
	          _this10.animateNavList(leftNavSectionValue);
	
	          newLeftNavSectionItemAnchor.appendChild(newLeftNavSectionItemIcon);
	          newLeftNavSectionItemAnchor.appendChild(newLeftNavSectionItemLink);
	          newLeftNavSectionItem.appendChild(newLeftNavSectionItemAnchor);
	          leftNavSections.insertBefore(newLeftNavSectionItem, leftNavSections.firstChild);
	
	          setTimeout(function () {
	            selectedLeftNavSectionItemTitle.textContent = leftNavSectionItemLink.textContent;
	            selectedLeftNavSectionItem.setAttribute('data-left-nav-current-section', leftNavSectionValue);
	            selectedLeftNavSectionItemIcon.setAttribute('data-left-nav-current-section-icon', leftNavSectionValue);
	            selectedLeftNavSectionItemUse.setAttribute('xlink:href', leftNavSectionItemIconUse.getAttribute('xlink:href'));
	
	            leftNavSectionItem.parentNode.removeChild(leftNavSectionItem); // Cant use .remove() because of IE11
	            _this10.leftNavSectionActive = false;
	          }, 450); // Wait for nav items to animate
	        }();
	
	        if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
	      }
	    }
	  }, {
	    key: 'release',
	    value: function release() {
	      if (this.hDocumentClick) {
	        this.hDocumentClick = this.hDocumentClick.release();
	      }
	      this.constructor.components.delete(this.element);
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
	     * @property {string} [selectorLeftNavNestedList] The data attribute selector for the nested ul elements in the left nav.
	     * @property {string} [selectorLeftNavToggle] The data attribute selector for the button that will show and hide the left navigation.
	     * @property {string} [selectorLeftNavListItem] The data attribute selector for all list items in the left navigation.
	     * @property {string} [selectorLeftNavNestedListItem] The data attribute selector for all nested list items in the left navigation.
	     * @property {string} [selectorLeftNavArrowIcon] The data attribute selector for the arrow icons in the left nav.
	     * @property {string} [selectorLeftNavFlyoutMenu] The data attribute selector for the flyout menus in the left nav.
	     * @property {string} [selectorLeftNavFlyoutItem] The data attribute selector for the flyout menu items in the left nav.
	     * @property {string} [selectorLeftNavSection] The data attribute selector for the three sections in the header of the left nav.
	     * @property {string} [selectorLeftNavCurrentPage] The data attribute selector for the current section title in the left nav header.
	     * @property {string} [classActiveLeftNav] The class name for when a left nav is active.
	     * @property {string} [classActiveLeftNavListItem] The class name for when a left nav list item is active.
	     * @property {string} [classExpandedLeftNavListItem] The class name for when a nested list is expanded.
	     * @property {string} [classFlyoutDisplayed] The class name for when a flyout menu is displayed.
	     * @property {string} [classActiveSection] The class name for an active section item in the left nav header.
	     * @property {string} [classItemHasChildren] The class name for when a list item has children.
	     */
	
	
	    /**
	     * The map associating DOM element and left navigation instance.
	     * @member LeftNav.components
	     * @type {WeakMap}
	     */
	
	  }], [{
	    key: 'create',
	    value: function create(element, options) {
	      return this.components.get(element) || new this(element, options);
	    }
	
	    /**
	     * Instantiates a left navigation in the given node.
	     * If the given element indicates that it's a left navigation (having `data-left-nav-container` attribute), instantiates it.
	     * Otherwise, instantiates left navigation by searching for left navigation in the given node.
	     * @param {Node} target The DOM node to instantiate left navigation in. Should be a document or an element.
	     * @param {Object} [options] The component options
	     * @param {string} [options.selectorInit] The CSS selector to find left nav containers.
	     * @param {string} [options.selectorLeftNav] The data attribute selector for the nav element in the left nav container.
	     * @param {string} [options.selectorLeftNavList] The data attribute selector for the main ul element in the left nav.
	     * @param {string} [options.selectorLeftNavNestedList] The data attribute selector for the nested ul elements in the left nav.
	     * @param {string} [options.selectorLeftNavToggle] The data attribute selector for the button that will show and hide the left navigation.
	     * @param {string} [options.selectorLeftNavListItem] The data attribute selector for all list items in the left navigation.
	     * @param {string} [options.selectorLeftNavNestedListItem] The data attribute selector for all nested list items in the left navigation.
	     * @param {string} [options.selectorLeftNavArrowIcon] The data attribute selector for the arrow icons in the left nav.
	     * @param {string} [options.selectorLeftNavFlyoutMenu] The data attribute selector for the flyout menus in the left nav.
	     * @param {string} [options.selectorLeftNavFlyoutItem] The data attribute selector for the flyout menu items in the left nav.
	     * @param {string} [options.selectorLeftNavSection] The data attribute selector for the three sections in the header of the left nav.
	     * @param {string} [options.selectorLeftNavCurrentPage] The data attribute selector for the current section title in the left nav header.
	     * @param {string} [options.classActiveLeftNav] The class name for when a left nav is active.
	     * @param {string} [options.classActiveLeftNavListItem] The class name for when a left nav list item is active.
	     * @param {string} [options.classExpandedLeftNavListItem] The class name for when a nested list is expanded.
	     * @param {string} [options.classFlyoutDisplayed] The class name for when a flyout menu is displayed.
	     * @param {string} [options.classActiveSection] The class name for an active section item in the left nav header.
	     * @param {string} [options.classItemHasChildren] The class name for when a list item has children.
	     */
	
	  }, {
	    key: 'init',
	    value: function init() {
	      var _this11 = this;
	
	      var target = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document;
	      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	
	      var effectiveOptions = Object.assign(Object.create(this.options), options);
	      if (target.nodeType !== Node.ELEMENT_NODE && target.nodeType !== Node.DOCUMENT_NODE) {
	        throw new Error('DOM document or DOM element should be given to search for and initialize this widget.');
	      }
	      if (target.nodeType === Node.ELEMENT_NODE && target.matches(effectiveOptions.selectorInit)) {
	        this.create(target, effectiveOptions);
	      } else {
	        [].concat(_toConsumableArray(target.querySelectorAll(effectiveOptions.selectorInit))).forEach(function (element) {
	          return _this11.create(element, effectiveOptions);
	        });
	      }
	    }
	  }]);
	
	  return LeftNav;
	}();
	
	LeftNav.options = {
	  selectorInit: '[data-left-nav-container]',
	  // Data Attribute selectors
	  selectorLeftNav: '[data-left-nav]',
	  selectorLeftNavList: '[data-left-nav-list]',
	  selectorLeftNavNestedList: '[data-left-nav-nested-list]',
	  selectorLeftNavToggleOpen: '[data-left-nav-toggle="open"]',
	  selectorLeftNavToggleClose: '[data-left-nav-toggle="close"]',
	  selectorLeftNavListItem: '[data-left-nav-item]',
	  selectorLeftNavListItemLink: '[data-left-nav-item-link]',
	  selectorLeftNavNestedListItem: '[data-left-nav-nested-item]',
	  selectorLeftNavArrowIcon: '[data-left-nav-icon]',
	  selectorLeftNavFlyoutMenu: '[data-left-nav-flyout]',
	  selectorLeftNavFlyoutItem: '[data-left-nav-flyout-item]',
	  selectorLeftNavSections: '[data-left-nav-sections]',
	  selectorLeftNavSection: '[data-left-nav-section]',
	  selectorLeftNavSectionLink: '[data-left-nav-section-link]',
	  selectorLeftNavSectionIcon: '[data-left-nav-section-icon]',
	  selectorLeftNavCurrentSection: '[data-left-nav-current-section]',
	  selectorLeftNavCurrentSectionTitle: '[data-left-nav-current-section-title]',
	  selectorLeftNavCurrentSectionIcon: '[data-left-nav-current-section-icon]',
	  selectorLeftNavListItemHasChildren: '[data-left-nav-item-with-children]',
	  selectorLeftNavListItemHasFlyout: '[data-left-nav-has-flyout]',
	  selectorLeftNavAllListItems: '[data-left-nav-item], [data-left-nav-nested-item], [data-left-nav-flyout-item]',
	  // CSS Class Selectors
	  classActiveTrigger: 'bx--left-nav__trigger--active',
	  classActiveLeftNav: 'bx--left-nav--active',
	  classActiveLeftNavListItem: 'bx--active-list-item',
	  classExpandedLeftNavListItem: 'bx--main-nav__parent-item--expanded',
	  classFlyoutDisplayed: 'bx--nested-list__flyout-menu--displayed',
	  classItemHasChildren: 'bx--main-nav__parent-item--has-children',
	  classNavSection: 'bx--left-nav__section',
	  classNavSectionTransition: 'bx--left-nav__section--transition',
	  classNavSectionAnchor: 'bx--left-nav__section--anchor',
	  classNavSectionLink: 'bx--left-nav__section--link',
	  classNavHeaderTitle: 'bx--left-nav__header--title',
	  classItemFade: 'bx--main-nav__parent-item--fade',
	  classItemHidden: 'bx--main-nav__parent-item--hidden',
	  classListHidden: 'bx--left-nav__main-nav--hidden',
	  classListTop: 'bx--left-nav__main-nav--top'
	};
	LeftNav.components = new WeakMap();
	exports.default = LeftNav;

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	__webpack_require__(5);
	
	__webpack_require__(3);
	
	__webpack_require__(4);
	
	__webpack_require__(10);
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var UnifiedHeader = function () {
	  function UnifiedHeader(element) {
	    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	
	    _classCallCheck(this, UnifiedHeader);
	
	    if (!element || element.nodeType !== Node.ELEMENT_NODE) {
	      throw new TypeError('DOM element should be given to initialize this widget.');
	    }
	
	    this.element = element;
	
	    this.options = Object.assign(this.constructor.options, options);
	    this.constructor.components.set(this.element, this);
	  }
	
	  _createClass(UnifiedHeader, [{
	    key: 'release',
	    value: function release() {
	      var _this = this;
	
	      if (this.handleDocumentClick) {
	        this.element.ownerDocument.removeEventListener('click', function (evt) {
	          return _this.handleDocumentClick(evt);
	        });
	      }
	      this.constructor.components.delete(this.element);
	    }
	
	    /**
	     * The map associating DOM element and left navigation instance.
	     * @member UnifiedHeader.components
	     * @type {WeakMap}
	     */
	
	
	    /**
	     * The component options.
	     * If `options` is specified in the constructor, {@linkcode UnifiedHeader.create .create()}, or {@linkcode UnifiedHeader.init .init()},
	     * properties in this object are overriden for the instance being create and how {@linkcode UnifiedHeader.init .init()} works.
	     * @member UnifiedHeader.options
	     * @type {Object}
	     * @property {string} selectorInit The CSS selector to find unified headers.
	     */
	
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
	
	      var effectiveOptions = Object.assign(Object.create(this.options), options);
	      if (target.nodeType !== Node.ELEMENT_NODE && target.nodeType !== Node.DOCUMENT_NODE) {
	        throw new Error('DOM document or DOM element should be given to search for and initialize this widget.');
	      }
	      if (target.nodeType === Node.ELEMENT_NODE && target.matches(effectiveOptions.selectorInit)) {
	        this.create(target, effectiveOptions);
	      } else {
	        [].concat(_toConsumableArray(target.querySelectorAll(effectiveOptions.selectorInit))).forEach(function (element) {
	          return _this2.create(element, effectiveOptions);
	        });
	      }
	    }
	  }]);
	
	  return UnifiedHeader;
	}();
	
	UnifiedHeader.components = new WeakMap();
	UnifiedHeader.options = {
	  selectorInit: '[data-unified-header]'
	};
	exports.default = UnifiedHeader;

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	__webpack_require__(5);
	
	__webpack_require__(3);
	
	__webpack_require__(4);
	
	__webpack_require__(10);
	
	var _toggleClass = __webpack_require__(11);
	
	var _toggleClass2 = _interopRequireDefault(_toggleClass);
	
	var _eventMatches = __webpack_require__(7);
	
	var _eventMatches2 = _interopRequireDefault(_eventMatches);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var InlineLeftNav = function () {
	  /**
	   * Spinner indicating loading state.
	   * @implements Component
	   * @param {HTMLElement} element The element working as a spinner.
	   * @param {Object} options The component options.
	   */
	  function InlineLeftNav(element) {
	    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	
	    _classCallCheck(this, InlineLeftNav);
	
	    if (!element || element.nodeType !== Node.ELEMENT_NODE) {
	      throw new TypeError('DOM element should be given to initialize this widget.');
	    }
	
	    this.options = Object.assign(this.constructor.options, options);
	
	    this.element = element;
	
	    this.constructor.components.set(this.element, this);
	    this.hookListItemsEvents();
	  }
	
	  /**
	   * Instantiates spinner of the given element.
	   * @param {HTMLElement} element The element.
	   */
	
	
	  _createClass(InlineLeftNav, [{
	    key: 'hookListItemsEvents',
	    value: function hookListItemsEvents() {
	      var _this = this;
	
	      var leftNavList = this.element.querySelector(this.options.selectorLeftNavList);
	      leftNavList.addEventListener('click', function (evt) {
	        var leftNavItem = (0, _eventMatches2.default)(evt, _this.options.selectorLeftNavListItem);
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
	      });
	      [].concat(_toConsumableArray(this.element.querySelectorAll(this.options.selectorLeftNavListItem))).forEach(function (item) {
	        item.addEventListener('keydown', function (evt) {
	          var leftNavItemWithChildren = (0, _eventMatches2.default)(evt, _this.options.selectorLeftNavListItemHasChildren);
	          if (leftNavItemWithChildren && evt.which === 13) {
	            _this.handleNestedListClick(leftNavItemWithChildren, evt);
	          }
	        });
	      });
	    }
	  }, {
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
	
	      var isOpen = listItem.classList.contains(this.options.classExpandedLeftNavListItem);
	      if (!('leftNavItemLink' in evt.target.dataset)) {
	        (0, _toggleClass2.default)(listItem, this.options.classExpandedLeftNavListItem, !isOpen);
	      }
	      var list = listItem.querySelector(this.options.selectorLeftNavNestedList);
	      var listItems = [].concat(_toConsumableArray(list.querySelectorAll(this.options.selectorLeftNavNestedListItem)));
	      listItems.forEach(function (item) {
	        if (isOpen) {
	          item.querySelector(_this3.options.selectorLeftNavListItemLink).tabIndex = -1;
	        } else {
	          item.querySelector(_this3.options.selectorLeftNavListItemLink).tabIndex = 0;
	        }
	      });
	    }
	  }, {
	    key: 'release',
	    value: function release() {
	      this.constructor.components.delete(this.element);
	    }
	
	    /**
	     * The map associating DOM element and spinner instance.
	     * @member InlineLeftNav.components
	     * @type {WeakMap}
	     */
	
	
	    /**
	     * The component options.
	     * If `options` is specified in the constructor, {@linkcode InlineLeftNav.create .create()}, or {@linkcode InlineLeftNav.init .init()},
	     * properties in this object are overriden for the instance being create and how {@linkcode InlineLeftNav.init .init()} works.
	     * @member InlineLeftNav.options
	     * @type {Object}
	     * @property {string} selectorInit The CSS selector to find inline left navs.
	     */
	
	  }], [{
	    key: 'create',
	    value: function create(element) {
	      return this.components.get(element) || new this(element);
	    }
	
	    /**
	     * Instantiates spinner in the given node.
	     * If the given element indicates that it's an spinner (having `data-loading` attribute), instantiates it.
	     * Otherwise, instantiates spinners by searching for spinners in the given node.
	     * @param {Node} target The DOM node to instantiate spinners in. Should be a document or an element.
	     * @param {Object} [options] The component options.
	     * @param {string} [options.selectorInit] The CSS selector to find inline left navs.
	     */
	
	  }, {
	    key: 'init',
	    value: function init() {
	      var _this4 = this;
	
	      var target = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document;
	      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	
	      var effectiveOptions = Object.assign(Object.create(this.options), options);
	      if (target.nodeType !== Node.ELEMENT_NODE && target.nodeType !== Node.DOCUMENT_NODE) {
	        throw new Error('DOM document or DOM element should be given to search for and initialize this widget.');
	      }
	      if (target.nodeType === Node.ELEMENT_NODE && target.matches(effectiveOptions.selectorInit)) {
	        this.create(target, effectiveOptions);
	      } else {
	        [].concat(_toConsumableArray(target.querySelectorAll(effectiveOptions.selectorInit))).forEach(function (element) {
	          return _this4.create(element, effectiveOptions);
	        });
	      }
	    }
	  }]);
	
	  return InlineLeftNav;
	}();
	
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
	  // CSS Class Selectors
	  classActiveLeftNavListItem: 'left-nav-list__item--active',
	  classExpandedLeftNavListItem: 'left-nav-list__item--expanded'
	};
	exports.default = InlineLeftNav;

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	__webpack_require__(5);
	
	__webpack_require__(3);
	
	__webpack_require__(4);
	
	__webpack_require__(10);
	
	var _on = __webpack_require__(8);
	
	var _on2 = _interopRequireDefault(_on);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var ProfileSwitcher = function () {
	  /**
	   * Profile Switcher.
	   * @implements Component
	   * @param {HTMLElement} element The element working as a profile switcher.
	   * @param {Object} [options] The component options
	   * @param {string} [options.selectorProfileSwitcher] The data attribute selector for the profile switcher.
	   * @param {string} [options.selectorAccount] The data attribute selector for the element containing the account name in the profile switcher.
	   * @param {string} [options.selectorOrg] The data attribute selector for the element containing the organization name in the profile switcher.
	   * @param {string} [options.selectorSpace] The data attribute selector for the element containing the space name in the profile switcher.
	   * @param {string} [options.selectorAccountDropdown] The data attribute selector for the dropdown item containing the current account name.
	   * @param {string} [options.selectorOrgDropdown] The data attribute selector for the dropdown item containing the current organization name.
	   * @param {string} [options.selectorSpaceDropdown] The data attribute selector for the dropdown item containing the current space name.
	   */
	  function ProfileSwitcher(element) {
	    var _this = this;
	
	    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	
	    _classCallCheck(this, ProfileSwitcher);
	
	    if (!element || element.nodeType !== Node.ELEMENT_NODE) {
	      throw new TypeError('DOM element should be given to initialize this widget.');
	    }
	
	    this.element = element;
	
	    this.options = Object.assign(this.constructor.options, options);
	
	    this.constructor.components.set(this.element, this);
	
	    this.hDocumentClick = (0, _on2.default)(this.element.ownerDocument, 'click', function (evt) {
	      return _this.handleDocumentClick(evt);
	    });
	
	    this.element.addEventListener('dropdown-beingselected', function (event) {
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
	
	    this.element.querySelector(this.options.selectorToggle).addEventListener('keydown', function (event) {
	      return _this.toggle(event);
	    });
	
	    this.element.querySelector(this.options.selectorToggle).addEventListener('mouseenter', function (event) {
	      _this.getLinkedData(event);
	      _this.determineSwitcherValues(true);
	    });
	
	    this.element.querySelector(this.options.selectorToggle).addEventListener('mouseleave', function (event) {
	      _this.getLinkedData(event);
	      _this.determineSwitcherValues(false);
	    });
	
	    this.element.ownerDocument.addEventListener('keyup', function () {
	      return _this.handleBlur();
	    });
	  }
	
	  /**
	   * Instantiates a profile switcher of the given element.
	   * @param {HTMLElement} element The element working as the profile switcher.
	   * @param {Object} [options] The component options
	   */
	
	
	  _createClass(ProfileSwitcher, [{
	    key: 'toggle',
	
	
	    /**
	     * Opens and closes the menu.
	     * @param {Event} event The event triggering this method.
	     */
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
	            linkedElement.appendChild(this.element.linkedAccount);
	          }
	          if (this.element.linkedIcon) {
	            linkedElement.appendChild(this.element.linkedIcon);
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
	      this.constructor.components.delete(this.element);
	    }
	
	    /**
	     * The component options.
	     * @member ProfileSwitcher.options
	     * @type {Object}
	     * @property {string} selectorInit The CSS selector to find profile switchers.
	     * @property {string} [selectorProfileSwitcher] The data attribute selector for the profile switcher.
	     * @property {string} [selectorAccount] The data attribute selector for the element containing the account name in the profile switcher.
	     * @property {string} [selectorOrg] The data attribute selector for the element containing the organization name in the profile switcher.
	     * @property {string} [selectorSpace] The data attribute selector for the element containing the space name in the profile switcher.
	     * @property {string} [selectorAccountDropdown] The data attribute selector for the dropdown item containing the current account name.
	     * @property {string} [selectorOrgDropdown] The data attribute selector for the dropdown item containing the current organization name.
	     * @property {string} [selectorSpaceDropdown] The data attribute selector for the dropdown item containing the current space name.
	     */
	
	
	    /**
	     * The map associating DOM element and profile switcher instance.
	     * @member ProfileSwitcher.components
	     * @type {WeakMap}
	     */
	
	  }], [{
	    key: 'create',
	    value: function create(element, options) {
	      return this.components.get(element) || new this(element, options);
	    }
	
	    /**
	     * Instantiates a profile switcher in the given node.
	     * If the given element indicates that it's a profile switcher (having `data-profile-switcher` attribute), instantiates it.
	     * Otherwise, instantiates profile switcher by searching for profile switcher in the given node.
	     * @param {Node} target The DOM node to instantiate profile switcher in. Should be a document or an element.
	     * @param {Object} [options] The component options
	     * @param {string} [options.selectorInit] The CSS selector to find profile switchers.
	     */
	
	  }, {
	    key: 'init',
	    value: function init() {
	      var _this2 = this;
	
	      var target = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document;
	      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	
	      var effectiveOptions = Object.assign(Object.create(this.options), options);
	      if (target.nodeType !== Node.ELEMENT_NODE && target.nodeType !== Node.DOCUMENT_NODE) {
	        throw new Error('DOM document or DOM element should be given to search for and initialize this widget.');
	      }
	      if (target.nodeType === Node.ELEMENT_NODE && target.matches(effectiveOptions.selectorInit)) {
	        this.create(target, effectiveOptions);
	      } else {
	        [].concat(_toConsumableArray(target.querySelectorAll(effectiveOptions.selectorInit))).forEach(function (element) {
	          return _this2.create(element, effectiveOptions);
	        });
	      }
	    }
	  }]);
	
	  return ProfileSwitcher;
	}();
	
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
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	__webpack_require__(5);
	
	__webpack_require__(10);
	
	__webpack_require__(3);
	
	__webpack_require__(4);
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Pagination = function () {
	  /**
	  * Pagination component.
	  * @implements Component
	  * @param {HTMLElement} element The element working as a pagination component.
	  * @param {Object} [options] The component options.
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
	  function Pagination(element) {
	    var _this = this;
	
	    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	
	    _classCallCheck(this, Pagination);
	
	    this.emitEvent = function (evtName, detail) {
	      var event = new CustomEvent('' + evtName, {
	        bubbles: true,
	        cancelable: true,
	        detail: detail
	      });
	
	      _this.element.dispatchEvent(event);
	    };
	
	    if (!element || element.nodeType !== Node.ELEMENT_NODE) {
	      throw new TypeError('DOM element should be given to initialize this widget.');
	    }
	
	    this.element = element;
	
	    this.options = Object.assign(Object.create(this.constructor.options), options);
	
	    this.constructor.components.set(this.element, this);
	
	    this.element.addEventListener('click', function (evt) {
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
	
	    this.element.addEventListener('input', function (evt) {
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
	  }
	
	  /**
	   * Dispatches a custom event
	   * @param {String} evtName name of the event to be dispatched.
	   * @param {Object} detail contains the original event and any other necessary details.
	   */
	
	
	  _createClass(Pagination, null, [{
	    key: 'create',
	
	
	    /**
	     * Instantiates a pagination component of the given element.
	     * @param {HTMLElement} element The element working as a pagination component.
	     * @param {Object} [options] The component options.
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
	    value: function create(element, options) {
	      return this.components.get(element) || new this(element, options);
	    }
	
	    /**
	    * Sets up the given node to instantiate a pagination component in.
	    * If the given element indicates that it's an pagination component, instantiates it.
	    * Otherwise, lazily instantiates pagination component when it's clicked on.
	    * @param {Node} target The DOM node to instantiate pagination component in. Should be a document or an element.
	    * @param {Object} [options] The component options.
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
	
	  }, {
	    key: 'init',
	    value: function init() {
	      var _this2 = this;
	
	      var target = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document;
	      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	
	      var effectiveOptions = Object.assign(Object.create(this.options), options);
	      if (target.nodeType !== Node.ELEMENT_NODE && target.nodeType !== Node.DOCUMENT_NODE) {
	        throw new Error('DOM document or DOM element should be given to search for and initialize this widget.');
	      }
	      if (target.nodeType === Node.ELEMENT_NODE && target.matches(effectiveOptions.selectorInit)) {
	        this.create(target, effectiveOptions);
	      } else {
	        [].concat(_toConsumableArray(target.querySelectorAll(effectiveOptions.selectorInit))).forEach(function (element) {
	          return _this2.create(element, effectiveOptions);
	        });
	      }
	    }
	  }]);
	
	  return Pagination;
	}();
	
	/**
	 * The map associating DOM element and pagination instance.
	 * @type {WeakMap}
	 */
	
	
	exports.default = Pagination;
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

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	__webpack_require__(5);
	
	__webpack_require__(3);
	
	__webpack_require__(4);
	
	__webpack_require__(10);
	
	var _toggleClass = __webpack_require__(11);
	
	var _toggleClass2 = _interopRequireDefault(_toggleClass);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var SearchWithOptions = function () {
	  /**
	   * Search with Options.
	   * @implements Component
	   * @param {HTMLElement} element The element working as the search component.
	   * @param {Object} [options] The component options
	   * @param {string} [options.selectorToggleLayoutBtn] The data attribute selector for the button that toggles between the layouts.
	   * @param {string} [options.selectorIconContainer] The data attribute selector for the icon layout container.
	   * @param {string} [options.classHiddenContainer] The class selector for a hidden container.
	   */
	  function SearchWithOptions(element) {
	    var _this = this;
	
	    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	
	    _classCallCheck(this, SearchWithOptions);
	
	    if (!element || element.nodeType !== Node.ELEMENT_NODE) {
	      throw new TypeError('DOM element should be given to initialize this widget.');
	    }
	
	    this.element = element;
	
	    this.options = Object.assign(this.constructor.options, options);
	
	    this.constructor.components.set(this.element, this);
	
	    this.element.querySelector(this.options.selectorToggleLayoutBtn).addEventListener('click', function (evt) {
	      return _this.toggleLayout(evt);
	    });
	  }
	
	  /**
	   * Instantiates a search component of the given element.
	   * @param {HTMLElement} element The element working as the search component.
	   * @param {Object} [options] The component options
	   */
	
	
	  _createClass(SearchWithOptions, [{
	    key: 'toggleLayout',
	
	
	    /**
	     * Toggles between the grid and list layout.
	     * @param {Event} event The event triggering this method.
	     */
	    value: function toggleLayout(evt) {
	      var _this2 = this;
	
	      var btn = evt.currentTarget;
	      var iconContainers = [].concat(_toConsumableArray(btn.querySelectorAll(this.options.selectorIconContainer)));
	      iconContainers.forEach(function (container) {
	        var isHidden = container.classList.contains(_this2.options.classHiddenContainer);
	        (0, _toggleClass2.default)(container, _this2.options.classHiddenContainer, !isHidden);
	      });
	    }
	  }, {
	    key: 'release',
	    value: function release() {
	      this.constructor.components.delete(this.element);
	    }
	
	    /**
	     * The map associating DOM element and content switcher set instance.
	     * @member SearchWithOptions.components
	     * @type {WeakMap}
	     */
	
	
	    /**
	     * The component options.
	     * If `options` is specified in the constructor, {@linkcode SearchWithOptions.create .create()}, or {@linkcode SearchWithOptions.init .init()},
	     * properties in this object are overriden for the instance being create and how {@linkcode SearchWithOptions.init .init()} works.
	     * @member SearchWithOptions.options
	     * @type {Object}
	     * @property {string} selectorInit The CSS selector to find search UIs with options.
	     */
	
	  }], [{
	    key: 'create',
	    value: function create(element, options) {
	      return this.components.get(element) || new this(element, options);
	    }
	
	    /**
	     * Instantiates a search component in the given node.
	     * If the given element indicates that it's a search component (having `data-search-with-options` attribute), instantiates it.
	     * Otherwise, instantiates the search component by searching for the search component in the given node.
	     * @param {Node} target The DOM node to instantiate the search component in. Should be a document or an element..
	     * @param {Object} [options] The component options
	     * @param {string} [options.selectorInit] The CSS selector to find unified headers.
	     */
	
	  }, {
	    key: 'init',
	    value: function init() {
	      var _this3 = this;
	
	      var target = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document;
	      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	
	      var effectiveOptions = Object.assign(Object.create(this.options), options);
	      if (target.nodeType !== Node.ELEMENT_NODE && target.nodeType !== Node.DOCUMENT_NODE) {
	        throw new Error('DOM document or DOM element should be given to search for and initialize this widget.');
	      }
	      if (target.nodeType === Node.ELEMENT_NODE && target.matches(effectiveOptions.selectorInit)) {
	        this.create(target, effectiveOptions);
	      } else {
	        [].concat(_toConsumableArray(target.querySelectorAll(effectiveOptions.selectorInit))).forEach(function (element) {
	          return _this3.create(element, effectiveOptions);
	        });
	      }
	    }
	  }]);
	
	  return SearchWithOptions;
	}();
	
	SearchWithOptions.components = new WeakMap();
	SearchWithOptions.options = {
	  selectorInit: '[data-search-with-options]',
	  selectorToggleLayoutBtn: '[data-search-toggle-btn]',
	  selectorIconContainer: '[data-search-toggle-layout]',
	  classHiddenContainer: 'bx--search__toggle-layout__container--hidden'
	};
	exports.default = SearchWithOptions;

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	__webpack_require__(5);
	
	__webpack_require__(3);
	
	__webpack_require__(4);
	
	__webpack_require__(10);
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Accordion = function () {
	  /**
	   * Accordion.
	   * @implements Component
	   * @param {HTMLElement} element The element working as an accordion.
	   */
	  function Accordion(element) {
	    var _this = this;
	
	    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	
	    _classCallCheck(this, Accordion);
	
	    if (!element || element.nodeType !== Node.ELEMENT_NODE) {
	      throw new TypeError('DOM element should be given to initialize this widget.');
	    }
	
	    this.element = element;
	    this.options = Object.assign(Object.create(this.constructor.options), options);
	    this.constructor.components.set(this.element, this);
	
	    [].concat(_toConsumableArray(this.element.querySelectorAll(this.options.accordionItem))).forEach(function (item) {
	      item.addEventListener('click', function (event) {
	        return _this.handleClick(event);
	      });
	    });
	  }
	
	  /**
	   * Instantiates accordion of the given element.
	   * @param {HTMLElement} element The element.
	   */
	
	
	  _createClass(Accordion, [{
	    key: 'handleClick',
	
	
	    /**
	     * Increase/decrease number by clicking on up/down icons.
	     * @param {Event} event The event triggering this method.
	     */
	    value: function handleClick(event) {
	      event.currentTarget.classList.toggle('bx--accordion__item--active');
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
	
	    /**
	     * Instantiates accordion UI in the given node.
	     * If the given element indicates that it's an accordion UI, instantiates it.
	     * Otherwise, instantiates accordion UIs by searching for accordion UIs in the given node.
	     * @param {Node} target The DOM node to instantiate accordion UIs in. Should be a document or an element.
	     * @param {Object} [options] The component options.
	     * @param {boolean} [options.selectorInit] The CSS selector to find accordion UIs.
	     */
	
	  }, {
	    key: 'init',
	    value: function init() {
	      var _this2 = this;
	
	      var target = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document;
	      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	
	      var effectiveOptions = Object.assign(Object.create(this.options), options);
	      if (target.nodeType !== Node.ELEMENT_NODE && target.nodeType !== Node.DOCUMENT_NODE) {
	        throw new Error('DOM document or DOM element should be given to search for and initialize this widget.');
	      }
	      if (target.nodeType === Node.ELEMENT_NODE && target.matches(effectiveOptions.selectorInit)) {
	        this.create(target);
	      } else {
	        [].concat(_toConsumableArray(target.querySelectorAll(effectiveOptions.selectorInit))).forEach(function (element) {
	          return _this2.create(element);
	        });
	      }
	    }
	  }]);
	
	  return Accordion;
	}();
	
	/**
	 * The map associating DOM element and accordion UI instance.
	 * @type {WeakMap}
	 */
	
	
	exports.default = Accordion;
	Accordion.components = new WeakMap();
	
	/**
	 * The component options.
	 * If `options` is specified in the constructor, {@linkcode NumberInput.create .create()}, or {@linkcode NumberInput.init .init()},
	 * properties in this object are overriden for the instance being create and how {@linkcode NumberInput.init .init()} works.
	 * @property {string} selectorInit The CSS selector to find accordion UIs.
	 */
	Accordion.options = {
	  selectorInit: '[data-accordion]',
	  accordionItem: '[data-accordion-item]'
	};

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	__webpack_require__(5);
	
	__webpack_require__(10);
	
	__webpack_require__(3);
	
	__webpack_require__(4);
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var CopyBtn = function () {
	  /**
	   * CopyBtn UI.
	   * @implements Component
	   * @param {HTMLElement} element The element working as a copy button UI.
	   */
	  function CopyBtn(element) {
	    var _this = this;
	
	    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	
	    _classCallCheck(this, CopyBtn);
	
	    if (!element || element.nodeType !== Node.ELEMENT_NODE) {
	      throw new TypeError('DOM element should be given to initialize this widget.');
	    }
	
	    this.element = element;
	    this.constructor.components.set(this.element, this);
	
	    this.options = Object.assign(Object.create(this.constructor.options), options);
	    this.element.addEventListener('click', function () {
	      return _this.handleClick();
	    });
	  }
	
	  /**
	   * Instantiates copy button UI of the given element.
	   * @param {HTMLElement} element The element.
	   */
	
	
	  _createClass(CopyBtn, [{
	    key: 'handleClick',
	
	
	    /**
	     * Show the feedback tooltip on click. Hide the feedback tooltip after specified timeout value.
	     */
	    value: function handleClick() {
	      var _this2 = this;
	
	      var feedback = this.element.querySelector(this.options.feedbackTooltip);
	      feedback.classList.add(this.options.classShowFeedback);
	      setTimeout(function () {
	        feedback.classList.remove(_this2.options.classShowFeedback);
	      }, this.options.timeoutValue);
	    }
	  }, {
	    key: 'release',
	    value: function release() {
	      this.constructor.components.delete(this.element);
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
	
	  }], [{
	    key: 'create',
	    value: function create(element) {
	      return this.components.get(element) || new this(element);
	    }
	
	    /**
	     * Instantiates copy button UI in the given node.
	     * If the given element indicates that it's an copy button UI, instantiates it.
	     * Otherwise, instantiates copy button UIs by searching for copy button UIs in the given node.
	     * @param {Node} target The DOM node to instantiate copy button UIs in. Should be a document or an element.
	     * @param {Object} [options] The component options.
	     * @param {boolean} [options.selectorInit] The CSS selector to find copy button UIs.
	     */
	
	  }, {
	    key: 'init',
	    value: function init() {
	      var _this3 = this;
	
	      var target = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document;
	      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	
	      var effectiveOptions = Object.assign(Object.create(this.options), options);
	      if (target.nodeType !== Node.ELEMENT_NODE && target.nodeType !== Node.DOCUMENT_NODE) {
	        throw new Error('DOM document or DOM element should be given to search for and initialize this widget.');
	      }
	      if (target.nodeType === Node.ELEMENT_NODE && target.matches(effectiveOptions.selectorInit)) {
	        this.create(target);
	      } else {
	        [].concat(_toConsumableArray(target.querySelectorAll(effectiveOptions.selectorInit))).forEach(function (element) {
	          return _this3.create(element);
	        });
	      }
	    }
	  }]);
	
	  return CopyBtn;
	}();
	
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