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
	exports.DetailPageHeader = exports.Table = exports.NumberInput = exports.Card = exports.Dropdown = exports.Loading = exports.Toolbars = exports.HeaderNav = exports.Modal = exports.OverflowMenu = exports.Tab = exports.ContentSwitcher = exports.FileUploader = exports.FabButton = exports.settings = undefined;
	
	__webpack_require__(1);
	
	var _fileUploader = __webpack_require__(2);
	
	var _fileUploader2 = _interopRequireDefault(_fileUploader);
	
	var _fab = __webpack_require__(3);
	
	var _fab2 = _interopRequireDefault(_fab);
	
	var _contentSwitcher = __webpack_require__(5);
	
	var _contentSwitcher2 = _interopRequireDefault(_contentSwitcher);
	
	var _tabs = __webpack_require__(9);
	
	var _tabs2 = _interopRequireDefault(_tabs);
	
	var _overflowMenu = __webpack_require__(11);
	
	var _overflowMenu2 = _interopRequireDefault(_overflowMenu);
	
	var _modals = __webpack_require__(12);
	
	var _modals2 = _interopRequireDefault(_modals);
	
	var _header = __webpack_require__(14);
	
	var _header2 = _interopRequireDefault(_header);
	
	var _toolbars = __webpack_require__(15);
	
	var _toolbars2 = _interopRequireDefault(_toolbars);
	
	var _loading = __webpack_require__(16);
	
	var _loading2 = _interopRequireDefault(_loading);
	
	var _dropdown = __webpack_require__(17);
	
	var _dropdown2 = _interopRequireDefault(_dropdown);
	
	var _card = __webpack_require__(18);
	
	var _card2 = _interopRequireDefault(_card);
	
	var _numberInput = __webpack_require__(19);
	
	var _numberInput2 = _interopRequireDefault(_numberInput);
	
	var _table = __webpack_require__(20);
	
	var _table2 = _interopRequireDefault(_table);
	
	var _detailPageHeader = __webpack_require__(21);
	
	var _detailPageHeader2 = _interopRequireDefault(_detailPageHeader);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
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
	// ====================//
	// Imports and Exports //
	// ====================//
	
	// Polyfills
	// -------------
	exports.
	/**
	 * Settings.
	 * @type Object
	 * @property {boolean} [disableAutoInit]
	 *   Disables automatic instantiation of components.
	 *   By default (`BluemixComponents.disableAutoInit` is `false`),
	 *   bluemix-components attempts to instantiate components automatically
	 *   by searching for elements with `data-component-name` (e.g. `data-loading`) attribute
	 *   or upon DOM events (e.g. clicking) on such elements.
	 *   See each components' static `.init()` methods for details.
	 */
	settings = settings;
	exports.
	
	/**
	 * Floating action button.
	 * @type FabButton
	 */
	FabButton = _fab2.default;
	exports.
	
	/**
	 * File uploader.
	 * @type FileUploader
	 */
	FileUploader = _fileUploader2.default;
	exports.
	
	/**
	 * Content switcher.
	 * @type ContentSwitcher
	 */
	ContentSwitcher = _contentSwitcher2.default;
	exports.
	
	/**
	 * Container of tabs.
	 * @type Tab
	 */
	Tab = _tabs2.default;
	exports.
	
	/**
	 * Overflow menu.
	 * @type OverflowMenu
	 */
	OverflowMenu = _overflowMenu2.default;
	exports.
	
	/**
	 * Modal dialog.
	 * @type Modal
	 */
	Modal = _modals2.default;
	exports.
	
	/**
	 * Header with taxonomy menu.
	 * @type HeaderNav
	 */
	HeaderNav = _header2.default;
	exports.
	
	/**
	 * Search button in tool bar.
	 * @type Toolbars
	 */
	Toolbars = _toolbars2.default;
	exports.
	
	/**
	 * Spinner indicating loading state.
	 * @type Loading
	 */
	Loading = _loading2.default;
	exports.
	
	/**
	 * A selector with drop downs.
	 * @type Dropdown
	 */
	Dropdown = _dropdown2.default;
	exports.
	
	/**
	 * The container for cards.
	 * @type Card
	 */
	Card = _card2.default;
	exports.
	
	/**
	 * Number input UI.
	 * @type NumberInput
	 */
	NumberInput = _numberInput2.default;
	exports.
	
	/**
	 * Data table.
	 * @type Table
	 */
	Table = _table2.default;
	exports.
	
	/**
	 * Detail page header.
	 * @type DetailPageHeader
	 */
	DetailPageHeader = _detailPageHeader2.default;
	
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
	    _table2.default.init();
	    _detailPageHeader2.default.init();
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

	/*!
	 * @copyright Copyright (c) 2016 IcoMoon.io
	 * @license   Licensed under MIT license
	 *            See https://github.com/Keyamoon/svgxuse
	 * @version   1.1.16
	 */
	/*jslint browser: true */
	/*global XDomainRequest, MutationObserver, window */
	(function () {
	    'use strict';
	    if (window && window.addEventListener) {
	        var cache = Object.create(null); // holds xhr objects to prevent multiple requests
	        var checkUseElems,
	            tid; // timeout id
	        var debouncedCheck = function () {
	            clearTimeout(tid);
	            tid = setTimeout(checkUseElems, 100);
	        };
	        var unobserveChanges = function () {
	            return;
	        };
	        var observeChanges = function () {
	            var observer;
	            window.addEventListener('resize', debouncedCheck, false);
	            window.addEventListener('orientationchange', debouncedCheck, false);
	            if (window.MutationObserver) {
	                observer = new MutationObserver(debouncedCheck);
	                observer.observe(document.documentElement, {
	                    childList: true,
	                    subtree: true,
	                    attributes: true
	                });
	                unobserveChanges = function () {
	                    try {
	                        observer.disconnect();
	                        window.removeEventListener('resize', debouncedCheck, false);
	                        window.removeEventListener('orientationchange', debouncedCheck, false);
	                    } catch (ignore) {}
	                };
	            } else {
	                document.documentElement.addEventListener('DOMSubtreeModified', debouncedCheck, false);
	                unobserveChanges = function () {
	                    document.documentElement.removeEventListener('DOMSubtreeModified', debouncedCheck, false);
	                    window.removeEventListener('resize', debouncedCheck, false);
	                    window.removeEventListener('orientationchange', debouncedCheck, false);
	                };
	            }
	        };
	        var xlinkNS = 'http://www.w3.org/1999/xlink';
	        checkUseElems = function () {
	            var base,
	                bcr,
	                fallback = '', // optional fallback URL in case no base path to SVG file was given and no symbol definition was found.
	                hash,
	                i,
	                Request,
	                inProgressCount = 0,
	                isHidden,
	                url,
	                uses,
	                xhr;
	            if (window.XMLHttpRequest) {
	                Request = new XMLHttpRequest();
	                if (Request.withCredentials !== undefined) {
	                    Request = XMLHttpRequest;
	                } else {
	                    Request = XDomainRequest || undefined;
	                }
	            }
	            if (Request === undefined) {
	                return;
	            }
	            function observeIfDone() {
	                // If done with making changes, start watching for chagnes in DOM again
	                inProgressCount -= 1;
	                if (inProgressCount === 0) { // if all xhrs were resolved
	                    observeChanges(); // watch for changes to DOM
	                }
	            }
	            function attrUpdateFunc(spec) {
	                return function () {
	                    if (cache[spec.base] !== true) {
	                        spec.useEl.setAttributeNS(xlinkNS, 'xlink:href', '#' + spec.hash);
	                    }
	                };
	            }
	            function onloadFunc(xhr) {
	                return function () {
	                    var body = document.body;
	                    var x = document.createElement('x');
	                    var svg;
	                    xhr.onload = null;
	                    x.innerHTML = xhr.responseText;
	                    svg = x.getElementsByTagName('svg')[0];
	                    if (svg) {
	                        svg.setAttribute('aria-hidden', 'true');
	                        svg.style.position = 'absolute';
	                        svg.style.width = 0;
	                        svg.style.height = 0;
	                        svg.style.overflow = 'hidden';
	                        body.insertBefore(svg, body.firstChild);
	                    }
	                    observeIfDone();
	                };
	            }
	            function onErrorTimeout(xhr) {
	                return function () {
	                    xhr.onerror = null;
	                    xhr.ontimeout = null;
	                    observeIfDone();
	                };
	            }
	            unobserveChanges(); // stop watching for changes to DOM
	            // find all use elements
	            uses = document.getElementsByTagName('use');
	            for (i = 0; i < uses.length; i += 1) {
	                try {
	                    bcr = uses[i].getBoundingClientRect();
	                } catch (ignore) {
	                    // failed to get bounding rectangle of the use element
	                    bcr = false;
	                }
	                url = uses[i].getAttributeNS(xlinkNS, 'href').split('#');
	                base = url[0];
	                hash = url[1];
	                isHidden = bcr && bcr.left === 0 && bcr.right === 0 && bcr.top === 0 && bcr.bottom === 0;
	                if (bcr && bcr.width === 0 && bcr.height === 0 && !isHidden) {
	                    // the use element is empty
	                    // if there is a reference to an external SVG, try to fetch it
	                    // use the optional fallback URL if there is no reference to an external SVG
	                    if (fallback && !base.length && hash && !document.getElementById(hash)) {
	                        base = fallback;
	                    }
	                    if (base.length) {
	                        // schedule updating xlink:href
	                        xhr = cache[base];
	                        if (xhr !== true) {
	                            // true signifies that prepending the SVG was not required
	                            setTimeout(attrUpdateFunc({
	                                useEl: uses[i],
	                                base: base,
	                                hash: hash
	                            }), 0);
	                        }
	                        if (xhr === undefined) {
	                            xhr = new Request();
	                            cache[base] = xhr;
	                            xhr.onload = onloadFunc(xhr);
	                            xhr.onerror = onErrorTimeout(xhr);
	                            xhr.ontimeout = onErrorTimeout(xhr);
	                            xhr.open('GET', base);
	                            xhr.send();
	                            inProgressCount += 1;
	                        }
	                    }
	                } else {
	                    if (!isHidden) {
	                        if (cache[base] === undefined) {
	                            // remember this URL if the use element was not empty and no request was sent
	                            cache[base] = true;
	                        } else if (cache[base].onload) {
	                            // if it turns out that prepending the SVG is not necessary,
	                            // abort the in-progress xhr.
	                            cache[base].abort();
	                            cache[base].onload = undefined;
	                            cache[base] = true;
	                        }
	                    }
	                }
	            }
	            uses = '';
	            inProgressCount += 1;
	            observeIfDone();
	        };
	        // The load event fires when all resources have finished loading, which allows detecting whether SVG use elements are empty.
	        window.addEventListener('load', function winLoad() {
	            window.removeEventListener('load', winLoad, false); // to prevent memory leaks
	            tid = setTimeout(checkUseElems, 0);
	        }, false);
	    }
	}());


/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
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
	
	    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	
	    _classCallCheck(this, FileUploader);
	
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
	  }], [{
	    key: 'create',
	    value: function create(element, options) {
	      return this.components.get(element) || new this(element, options);
	    }
	
	    /**
	     * Instantiates file uploader in the given node.
	     * If the given element indicates that it's an file uploader (having `data-file-uploader` attribute), instantiates it.
	     * Otherwise, instantiates file uploader by searching for file uploader in the given node.
	     * @param {HTMLElement} element The element working as a file uploader.
	     * @param {Object} [options] The component options.
	     * @param {string} [options.labelSelector] The CSS selector to find the label for the file name.
	     */
	
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
	        [].concat(_toConsumableArray(target.querySelectorAll('[data-file-uploader]'))).forEach(function (element) {
	          return _this2.create(element, options);
	        });
	      }
	    }
	  }]);
	
	  return FileUploader;
	}();
	
	/**
	 * The component options.
	 * @member {Object} FileUploader#options
	 * @property {string} [labelSelector] The CSS selector to find the label for the file name.
	 */
	
	/**
	 * The map associating DOM element and file uploader instance.
	 * @type {WeakMap}
	 */
	
	
	exports.default = FileUploader;
	FileUploader.components = new WeakMap();

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _eventMatches = __webpack_require__(4);
	
	var _eventMatches2 = _interopRequireDefault(_eventMatches);
	
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
	   * If the given element indicates that it's an floating action button (having `data-fab` attribute), instantiates it.
	   * Otherwise, instantiates floating action buttons by clicking on floating action buttons in the given node.
	   * @param {Node} target The DOM node to instantiate floating action buttons in. Should be a document or an element.
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
	
	      var target = arguments.length <= 0 || arguments[0] === undefined ? document : arguments[0];
	
	      if (target.nodeType !== Node.ELEMENT_NODE && target.nodeType !== Node.DOCUMENT_NODE) {
	        throw new Error('DOM document or DOM element should be given to search for and initialize this widget.');
	      }
	      if (target.nodeType === Node.ELEMENT_NODE && target.dataset.fab !== undefined) {
	        this.create(target);
	      } else {
	        var _ret = function () {
	          var handler = function handler(event) {
	            var element = (0, _eventMatches2.default)(event, '[data-fab]');
	            if (element && !_this2.components.has(element)) {
	              _this2.create(element).toggle(event);
	            }
	          };
	          target.addEventListener('click', handler);
	          return {
	            v: {
	              release: function release() {
	                return target.removeEventListener('click', handler);
	              }
	            }
	          };
	        }();
	
	        if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
	      }
	    }
	  }, {
	    key: 'create',
	    value: function create(element) {
	      return this.components.get(element) || new this(element);
	    }
	  }]);
	
	  return FabButton;
	}();
	
	/**
	 * The map associating DOM element and floating action button instance.
	 * @type {WeakMap}
	 */
	
	
	exports.default = FabButton;
	FabButton.components = new WeakMap();

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = eventMatches;
	var matchesFuncName = ['matches', 'webkitMatchesSelector', 'msMatchesSelector'].filter(function (name) {
	  return typeof document.documentElement[name] === 'function';
	})[0];
	
	function eventMatches(event, selector) {
	  // <svg> in IE does not have `Element#msMatchesSelector()`.
	  // Also a weird behavior is seen in IE where DOM tree seems broken when `event.target` is on <svg>.
	  // Therefore this function simply returns `undefined` when `event.target` is on <svg>.
	  if (typeof event.target[matchesFuncName] === 'function') {
	    if (event.target[matchesFuncName](selector)) {
	      // If event target itself matches the given selector, return it
	      return event.target;
	    } else if (event.target[matchesFuncName](selector + ' *')) {
	      // If event target is a child node of a DOM element that matches the given selector, find the DOM element by going up the DOM tree
	      for (var traverse = event.target; traverse && traverse !== event.currentTarget; traverse = traverse.parentNode) {
	        if (traverse[matchesFuncName](selector)) {
	          return traverse;
	        }
	      }
	    }
	  }
	}

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _eventMatches = __webpack_require__(4);
	
	var _eventMatches2 = _interopRequireDefault(_eventMatches);
	
	__webpack_require__(6);
	
	__webpack_require__(7);
	
	var _toggleClass = __webpack_require__(8);
	
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
	
	    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	
	    _classCallCheck(this, ContentSwitcher);
	
	    if (!element || element.nodeType !== Node.ELEMENT_NODE) {
	      throw new TypeError('DOM element should be given to initialize this widget.');
	    }
	
	    this.element = element;
	
	    this.options = Object.assign({
	      selectorButton: 'input[type="radio"], a.bx--content-switcher__btn',
	      selectorButtonSelected: 'input[type="radio"].bx--content-switcher--selected',
	      classActive: 'bx--content-switcher--selected',
	      eventBeforeSelected: 'content-switcher-beingselected',
	      eventAfterSelected: 'content-switcher-selected'
	    }, options);
	
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
	  }], [{
	    key: 'create',
	    value: function create(element, options) {
	      return this.components.get(element) || new this(element, options);
	    }
	
	    /**
	     * Instantiates content switcher button sets in the given node.
	     * If the given element indicates that it's an content switcher button set (having `data-content-switcher` attribute), instantiates it.
	     * Otherwise, instantiates content switcher button sets by searching for content switcher button sets in the given node.
	     * @param {Node} target The DOM node to instantiate content switcher button sets in. Should be a document or an element.
	     * @param {Object} [options] The component options.
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
	
	      var target = arguments.length <= 0 || arguments[0] === undefined ? document : arguments[0];
	      var options = arguments[1];
	
	      if (target.nodeType !== Node.ELEMENT_NODE && target.nodeType !== Node.DOCUMENT_NODE) {
	        throw new Error('DOM document or DOM element should be given to search for and initialize this widget.');
	      }
	      if (target.nodeType === Node.ELEMENT_NODE && target.dataset.contentSwitcher !== undefined) {
	        this.create(target, options);
	      } else {
	        [].concat(_toConsumableArray(document.querySelectorAll('[data-content-switcher]'))).forEach(function (element) {
	          return _this3.create(element, options);
	        });
	      }
	    }
	  }]);
	
	  return ContentSwitcher;
	}();
	
	/**
	 * The component options.
	 * @member {Object} ContentSwitcher#options
	 * @property {string} [selectorButton] The CSS selector to find switcher buttons.
	 * @property {string} [selectorButtonSelected] The CSS selector to find the selected switcher button.
	 * @property {string} [classActive] The CSS class for switcher button's selected state.
	 * @property {string} [eventBeforeSelected]
	 *   The name of the custom event fired before a switcher button is selected.
	 *   Cancellation of this event stops selection of content switcher button.
	 * @property {string} [eventAfterSelected] The name of the custom event fired after a switcher button is selected.
	 */
	
	/**
	 * The map associating DOM element and content switcher set instance.
	 * @type {WeakMap}
	 */
	
	
	exports.default = ContentSwitcher;
	ContentSwitcher.components = new WeakMap();

/***/ },
/* 6 */
/***/ function(module, exports) {

	"use strict";
	
	Array.from = Array.from || function fromArray(a) {
	  return Array.prototype.slice.call(a);
	};

/***/ },
/* 7 */
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
/* 8 */
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
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	var _eventMatches = __webpack_require__(4);
	
	var _eventMatches2 = _interopRequireDefault(_eventMatches);
	
	__webpack_require__(6);
	
	__webpack_require__(10);
	
	__webpack_require__(7);
	
	var _contentSwitcher = __webpack_require__(5);
	
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
	
	  function Tab(element) {
	    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	
	    _classCallCheck(this, Tab);
	
	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Tab).call(this, element, Object.assign({
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
	    }, options)));
	
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
	   * If the given element indicates that it's an tab container (having `data-tabs` attribute), instantiates it.
	   * Otherwise, instantiates tab containers by searching for tab containers in the given node.
	   * @param {Node} target The DOM node to instantiate tab containers in. Should be a document or an element.
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
	
	
	  _createClass(Tab, [{
	    key: '_changeActive',
	    value: function _changeActive(item) {
	      _get(Object.getPrototypeOf(Tab.prototype), '_changeActive', this).call(this, item);
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
	      _get(Object.getPrototypeOf(Tab.prototype), 'handleClick', this).call(this, event);
	      var button = (0, _eventMatches2.default)(event, this.options.selectorButton);
	      var trigger = (0, _eventMatches2.default)(event, this.options.selectorTrigger);
	      if (button) {
	        _get(Object.getPrototypeOf(Tab.prototype), 'handleClick', this).call(this, event);
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
	  }], [{
	    key: 'init',
	    value: function init() {
	      var _this3 = this;
	
	      var target = arguments.length <= 0 || arguments[0] === undefined ? document : arguments[0];
	      var options = arguments[1];
	
	      if (target.nodeType !== Node.ELEMENT_NODE && target.nodeType !== Node.DOCUMENT_NODE) {
	        throw new Error('DOM document or DOM element should be given to search for and initialize this widget.');
	      }
	      if (target.nodeType === Node.ELEMENT_NODE && target.dataset.tabs !== undefined) {
	        this.create(target, options);
	      } else {
	        [].concat(_toConsumableArray(target.querySelectorAll('[data-tabs]'))).forEach(function (element) {
	          return _this3.create(element, options);
	        });
	      }
	    }
	  }]);
	
	  return Tab;
	}(_contentSwitcher2.default);
	
	/**
	 * The component options.
	 * @member {Object} Tab#options
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
	
	/**
	 * The map associating DOM element and tab container instance.
	 * @type {WeakMap}
	 */
	
	
	exports.default = Tab;
	Tab.components = new WeakMap();

/***/ },
/* 10 */
/***/ function(module, exports) {

	"use strict";
	
	Math.sign = Math.sign || function sign(x) {
	  var n = +x;
	  return n === 0 ? n : n / Math.abs(n);
	};

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	__webpack_require__(6);
	
	var _toggleClass = __webpack_require__(8);
	
	var _toggleClass2 = _interopRequireDefault(_toggleClass);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var OverflowMenu = function () {
	  function OverflowMenu(element) {
	    var _this = this;
	
	    _classCallCheck(this, OverflowMenu);
	
	    if (!element || element.nodeType !== Node.ELEMENT_NODE) {
	      throw new TypeError('DOM element should be given to initialize this widget.');
	    }
	
	    this.element = element;
	    this.constructor.components.set(this.element, this);
	    this.element.ownerDocument.addEventListener('click', function (event) {
	      return _this.handleDocumentClick(event);
	    });
	    this.element.ownerDocument.addEventListener('keypress', function (event) {
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
	
	      (0, _toggleClass2.default)(this.element, 'bx--overflow-menu--open', shouldBeOpen);
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
	
	        (0, _toggleClass2.default)(this.element, 'bx--overflow-menu--open', shouldBeOpen);
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
	      if (target.nodeType === Node.ELEMENT_NODE && target.dataset.overflowMenu !== undefined) {
	        this.create(target);
	      } else {
	        [].concat(_toConsumableArray(target.querySelectorAll('[data-overflow-menu]'))).forEach(function (element) {
	          return _this2.create(element);
	        });
	      }
	    }
	  }]);
	
	  return OverflowMenu;
	}();
	
	exports.default = OverflowMenu;
	
	
	OverflowMenu.components = new WeakMap();

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	__webpack_require__(6);
	
	__webpack_require__(7);
	
	__webpack_require__(13);
	
	var _eventMatches = __webpack_require__(4);
	
	var _eventMatches2 = _interopRequireDefault(_eventMatches);
	
	var _toggleClass = __webpack_require__(8);
	
	var _toggleClass2 = _interopRequireDefault(_toggleClass);
	
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
	   * @param {string} [options.eventAfterShown] The name of the custom event fired after this modal is shown.
	   * @param {string} [options.eventBeforeHidden]
	   *   The name of the custom event fired before this modal is hidden.
	   *   Cancellation of this event stops hiding the modal.
	   * @param {string} [options.eventAfterHidden] The name of the custom event fired after this modal is hidden.
	   */
	
	  function Modal(element) {
	    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	
	    _classCallCheck(this, Modal);
	
	    if (!element || element.nodeType !== Node.ELEMENT_NODE) {
	      throw new TypeError('DOM element should be given to initialize this widget.');
	    }
	
	    this.element = element;
	
	    this.options = Object.assign({
	      classVisible: 'is-visible',
	      classNoScroll: 'bx--noscroll',
	      eventBeforeShown: 'modal-beingshown',
	      eventAfterShown: 'modal-shown',
	      eventBeforeHidden: 'modal-beinghidden',
	      eventAfterHidden: 'modal-hidden'
	    }, options);
	
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
	   * @param {string} [options.eventAfterShown] The name of the custom event fired after this modal is shown.
	   * @param {string} [options.eventBeforeHidden]
	   *   The name of the custom event fired before this modal is hidden.
	   *   Cancellation of this event stops hiding the modal.
	   * @param {string} [options.eventAfterHidden] The name of the custom event fired after this modal is hidden.
	   */
	
	
	  _createClass(Modal, [{
	    key: 'hookCloseActions',
	
	
	    /**
	     * Adds event listeners for closing this dialog.
	     */
	    value: function hookCloseActions() {
	      var _this = this;
	
	      this.element.addEventListener('click', function (event) {
	        if (event.currentTarget === event.target) _this.hide();
	      });
	
	      if (this.keydownHandler) {
	        this.element.ownerDocument.body.removeEventListener('keydown', this.keydownHandler);
	        this.keydownHandler = null;
	      }
	
	      this.keydownHandler = function (event) {
	        if (event.which === 27) {
	          _this.hide();
	        }
	      };
	
	      this.element.ownerDocument.body.addEventListener('keydown', this.keydownHandler);
	
	      [].concat(_toConsumableArray(this.element.querySelectorAll('[data-modal-close]'))).forEach(function (element) {
	        element.addEventListener('click', function () {
	          _this.hide();
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
	    value: function show(launchingElement, callback) {
	      var _this3 = this;
	
	      if (typeof launchingElement === 'function') {
	        callback = launchingElement; // eslint-disable-line no-param-reassign
	        launchingElement = null; // eslint-disable-line no-param-reassign
	      }
	
	      if (launchingElement && !launchingElement.nodeType) {
	        throw new TypeError('DOM Node should be given for launchingElement.');
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
	        detail: { launchingElement: launchingElement }
	      });
	
	      // https://connect.microsoft.com/IE/feedback/details/790389/event-defaultprevented-returns-false-after-preventdefault-was-called
	      if (this.element.dispatchEvent(eventStart)) {
	        this._changeState(true, function () {
	          _this3.element.dispatchEvent(new CustomEvent(_this3.options.eventAfterShown, {
	            bubbles: true,
	            cancelable: true,
	            detail: { launchingElement: launchingElement }
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
	    value: function hide(callback) {
	      var _this4 = this;
	
	      if (!this.element.classList.contains(this.options.classVisible)) {
	        if (callback) {
	          callback(null, true);
	        }
	        return;
	      }
	
	      var eventStart = new CustomEvent(this.options.eventBeforeHidden, {
	        bubbles: true,
	        cancelable: true
	      });
	
	      // https://connect.microsoft.com/IE/feedback/details/790389/event-defaultprevented-returns-false-after-preventdefault-was-called
	      if (this.element.dispatchEvent(eventStart)) {
	        this._changeState(false, function () {
	          _this4.element.dispatchEvent(new CustomEvent(_this4.options.eventAfterHidden, {
	            bubbles: true,
	            cancelable: true
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
	     * If the given element indicates that it's an modal dialog (having `data-modal` attribute), instantiates it.
	     * Otherwise, instantiates modal dialogs by clicking on launcher buttons
	     * (buttons with `data-modal-target` attribute) of modal dialogs in the given node.
	     * @implements Component
	     * @param {Node} target The DOM node to instantiate modal dialogs in. Should be a document or an element.
	     * @param {Object} [options] The component options.
	     * @param {string} [options.classVisible] The CSS class for the visible state.
	     * @param {string} [options.classNoScroll] The CSS class for hiding scroll bar in body element while modal is shown.
	     * @param {string} [options.eventBeforeShown]
	     *   The name of the custom event fired before this modal is shown.
	     *   Cancellation of this event stops showing the modal.
	     * @param {string} [options.eventAfterShown] The name of the custom event fired after this modal is shown.
	     * @param {string} [options.eventBeforeHidden]
	     *   The name of the custom event fired before this modal is hidden.
	     *   Cancellation of this event stops hiding the modal.
	     * @param {string} [options.eventAfterHidden] The name of the custom event fired after this modal is hidden.
	     * @returns {Handle} The handle to remove the event listener to handle clicking.
	     */
	
	  }, {
	    key: 'init',
	    value: function init() {
	      var _this5 = this;
	
	      var target = arguments.length <= 0 || arguments[0] === undefined ? document : arguments[0];
	      var options = arguments[1];
	
	      if (target.nodeType !== Node.ELEMENT_NODE && target.nodeType !== Node.DOCUMENT_NODE) {
	        throw new Error('DOM document or DOM element should be given to search for and initialize this widget.');
	      }
	      if (target.nodeType === Node.ELEMENT_NODE && target.dataset.modal !== undefined) {
	        this.create(target, options);
	      } else {
	        var _ret = function () {
	          var handler = function handler(event) {
	            var element = (0, _eventMatches2.default)(event, '[data-modal-target]');
	
	            if (element) {
	              var modalElements = [].concat(_toConsumableArray(element.ownerDocument.querySelectorAll(element.dataset.modalTarget)));
	              if (modalElements.length > 1) {
	                throw new Error('Target modal must be unique.');
	              }
	
	              if (modalElements.length === 1) {
	                (function () {
	                  if (element.tagName === 'A') {
	                    event.preventDefault();
	                  }
	
	                  var modal = _this5.create(modalElements[0], options);
	                  modal.show(element, function (error, shownAlready) {
	                    if (!error && !shownAlready && modal.element.offsetWidth > 0 && modal.element.offsetHeight > 0) {
	                      modal.element.focus();
	                    }
	                  });
	                })();
	              }
	            }
	          };
	          target.addEventListener('click', handler);
	          return {
	            v: {
	              release: function release() {
	                return target.removeEventListener('click', handler);
	              }
	            }
	          };
	        }();
	
	        if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
	      }
	    }
	  }, {
	    key: 'hook',
	    value: function hook() {
	      console.warn('Modals.hook() is deprecated. Use Modals.init() instead.'); // eslint-disable-line no-console
	    }
	  }]);
	
	  return Modal;
	}();
	
	/**
	 * The component options.
	 * @member {Object} Modal#options
	 * @property {string} [classVisible] The CSS class for the visible state.
	 * @property {string} [classNoScroll] The CSS class for hiding scroll bar in body element while modal is shown.
	 * @property {string} [eventBeforeShown]
	 *   The name of the custom event fired before this modal is shown.
	 *   Cancellation of this event stops showing the modal.
	 * @property {string} [eventAfterShown] The name of the custom event fired after this modal is shown.
	 * @property {string} [eventBeforeHidden]
	 *   The name of the custom event fired before this modal is hidden.
	 *   Cancellation of this event stops hiding the modal.
	 * @property {string} [eventAfterHidden] The name of the custom event fired after this modal is hidden.
	 */
	
	/**
	 * The map associating DOM element and modal instance.
	 * @type {WeakMap}
	 */
	
	
	exports.default = Modal;
	Modal.components = new WeakMap();

/***/ },
/* 13 */
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
	    var init = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	
	    var event = document.createEvent('HTMLEvents');
	    event.initEvent(type, init.bubbles, init.cancelable);
	    if (init.detail) {
	      event.detail = init.detail;
	    }
	    return event;
	  };
	}

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	__webpack_require__(6);
	
	__webpack_require__(7);
	
	__webpack_require__(13);
	
	var _eventMatches = __webpack_require__(4);
	
	var _eventMatches2 = _interopRequireDefault(_eventMatches);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var HeaderNav = function () {
	  /**
	   * Header with taxonomy menu.
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
	
	    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	
	    _classCallCheck(this, HeaderNav);
	
	    if (!element || element.nodeType !== Node.ELEMENT_NODE) {
	      throw new TypeError('DOM element should be given to initialize this widget.');
	    }
	
	    this.element = element;
	
	    this.options = Object.assign({
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
	    }, options);
	
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
	   * If the given element indicates that it's an taxonomy menu (having `data-nav` attribute), instantiates it.
	   * Otherwise, instantiates taxonomy menus by clicking on launcher buttons
	   * (buttons with `data-nav-target` attribute) of taxonomy menus in the given node.
	   * @implements Component
	   * @param {Node} target The DOM node to instantiate taxonomy menus in. Should be a document or an element.
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
	
	      var target = arguments.length <= 0 || arguments[0] === undefined ? document : arguments[0];
	      var options = arguments[1];
	
	      if (target.nodeType !== Node.ELEMENT_NODE && target.nodeType !== Node.DOCUMENT_NODE) {
	        throw new Error('DOM document or DOM element should be given to search for and initialize this widget.');
	      }
	      if (target.nodeType === Node.ELEMENT_NODE && target.dataset.nav !== undefined) {
	        this.create(target, options);
	      } else {
	        var _ret = function () {
	          var handler = function handler(event) {
	            var element = (0, _eventMatches2.default)(event, '[data-nav-target]');
	
	            if (element) {
	              var headerElements = [].concat(_toConsumableArray(element.ownerDocument.querySelectorAll(element.dataset.navTarget)));
	              if (headerElements.length > 1) {
	                throw new Error('Target header must be unique.');
	              }
	
	              if (headerElements.length === 1) {
	                if (element.tagName === 'A') {
	                  event.preventDefault();
	                }
	                _this2.create(headerElements[0], options).toggleNav(event);
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
	  }]);
	
	  return HeaderNav;
	}();
	
	/**
	 * The component options.
	 * @member {Object} HeaderNav#options
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
	
	/**
	 * The map associating DOM element and taxonomy menu instance.
	 * @type {WeakMap}
	 */
	
	
	exports.default = HeaderNav;
	HeaderNav.components = new WeakMap();

/***/ },
/* 15 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
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
	  }], [{
	    key: 'create',
	    value: function create(element) {
	      return this.components.get(element) || new this(element);
	    }
	
	    /**
	     * Instantiates search buttons in the given node.
	     * If the given element indicates that it's an search button (having `data-list-icons-search-action-target` attribute), instantiates it.
	     * Otherwise, instantiates search buttons by searching for search buttons in the given node.
	     * @param {Node} target The DOM node to instantiate search buttons in. Should be a document or an element.
	     */
	
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
	        [].concat(_toConsumableArray(target.querySelectorAll('[data-list-icons-search-action-target]'))).forEach(function (element) {
	          return _this2.create(element);
	        });
	      }
	    }
	  }]);
	
	  return Toolbars;
	}();
	
	/**
	 * The map associating DOM element and search button instance.
	 * @type {WeakMap}
	 */
	
	
	exports.default = Toolbars;
	Toolbars.components = new WeakMap();

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _toggleClass = __webpack_require__(8);
	
	var _toggleClass2 = _interopRequireDefault(_toggleClass);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Loading = function () {
	  /**
	   * Spinner indicating loading state.
	   * @implements Component
	   * @param {HTMLElement} element The element working as a spinner.
	   * @param {Object} options The component options.
	   * @param {boolean} options.active `true` if this spinner should roll.
	   */
	
	  function Loading(element) {
	    var options = arguments.length <= 1 || arguments[1] === undefined ? { active: true } : arguments[1];
	
	    _classCallCheck(this, Loading);
	
	    if (!element || element.nodeType !== Node.ELEMENT_NODE) {
	      throw new TypeError('DOM element should be given to initialize this widget.');
	    }
	
	    this.element = element;
	    this.active = 'active' in options ? options.active : true;
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
	     */
	
	  }, {
	    key: 'init',
	    value: function init() {
	      var _this = this;
	
	      var target = arguments.length <= 0 || arguments[0] === undefined ? document : arguments[0];
	      var options = arguments[1];
	
	      if (target.nodeType !== Node.ELEMENT_NODE && target.nodeType !== Node.DOCUMENT_NODE) {
	        throw new Error('DOM document or DOM element should be given to search for and initialize this widget.');
	      }
	      if (target.nodeType === Node.ELEMENT_NODE && target.dataset.loading !== undefined) {
	        this.create(target, options);
	      } else {
	        [].concat(_toConsumableArray(target.querySelectorAll('[data-loading]'))).forEach(function (element) {
	          return _this.create(element, options);
	        });
	      }
	    }
	  }]);
	
	  return Loading;
	}();
	
	/**
	 * The map associating DOM element and spinner instance.
	 * @type {WeakMap}
	 */
	
	
	exports.default = Loading;
	Loading.components = new WeakMap();

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	__webpack_require__(6);
	
	__webpack_require__(7);
	
	__webpack_require__(13);
	
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
	
	    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	
	    _classCallCheck(this, Dropdown);
	
	    if (!element || element.nodeType !== Node.ELEMENT_NODE) {
	      throw new TypeError('DOM element should be given to initialize this widget.');
	    }
	
	    this.element = element;
	
	    this.options = Object.assign({
	      selectorItem: '[data-option] > .bx--dropdown__link',
	      selectorItemSelected: '[data-option] > .bx--dropdown__link.bx--dropdown--selected',
	      classSelected: 'bx--dropdown--selected',
	      eventBeforeSelected: 'dropdown-beingselected',
	      eventAfterSelected: 'dropdown-selected'
	    }, options);
	
	    this.element.dataset.dropdown = '';
	    this.constructor.components.set(this.element, this);
	
	    this.element.ownerDocument.addEventListener('click', function (event) {
	      return _this.toggle(event);
	    });
	    this.element.addEventListener('keypress', function (event) {
	      return _this.toggle(event);
	    });
	    this.element.addEventListener('click', function (event) {
	      return _this.selected(event);
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
	      this.constructor.components.delete(this.element);
	    }
	
	    /**
	     * Opens and closes the dropdown menu.
	     * @param {Event} event The event triggering this method.
	     */
	
	  }, {
	    key: 'toggle',
	    value: function toggle(event) {
	      var isOfSelf = this.element.contains(event.target);
	
	      if (isOfSelf) {
	        this.element.classList.toggle('bx--dropdown--open');
	      } else if (!isOfSelf && this.element.classList.contains('bx--dropdown--open')) {
	        this.element.classList.remove('bx--dropdown--open');
	      }
	    }
	
	    /**
	     * Handles clicking on the dropdown options, doing the following:
	     * * Change Dropdown text to selected option.
	     * * Remove selected option from options when selected.
	     * * Emit custom events.
	     * @param {Event} event The event triggering this method.
	     */
	
	  }, {
	    key: 'selected',
	    value: function selected(event) {
	      var _this2 = this;
	
	      var activatedElement = event.target;
	      if (activatedElement.parentElement.dataset.option !== undefined) {
	        var eventStart = new CustomEvent(this.options.eventBeforeSelected, {
	          bubbles: true,
	          cancelable: true,
	          detail: { item: activatedElement }
	        });
	
	        if (this.element.dispatchEvent(eventStart)) {
	          this.element.firstElementChild.textContent = activatedElement.textContent;
	          this.element.dataset.value = activatedElement.parentElement.dataset.value;
	
	          [].concat(_toConsumableArray(this.element.querySelectorAll(this.options.selectorItemSelected))).forEach(function (item) {
	            if (activatedElement !== item) {
	              item.classList.remove(_this2.options.classSelected);
	            }
	          });
	
	          activatedElement.classList.add(this.options.classSelected);
	
	          this.element.dispatchEvent(new CustomEvent(this.options.eventAfterSelected, {
	            bubbles: true,
	            cancelable: true,
	            detail: { item: activatedElement }
	          }));
	        }
	      }
	    }
	  }], [{
	    key: 'create',
	    value: function create(element, options) {
	      return this.components.get(element) || new this(element, options);
	    }
	
	    /**
	     * Instantiates selectors in the given node.
	     * If the given element indicates that it's an selector (having `data-dropdown` attribute), instantiates it.
	     * Otherwise, instantiates selectors by searching for selectors in the given node.
	     * @param {Node} target The DOM node to instantiate selectors in. Should be a document or an element.
	     * @param {Object} [options] The component options.
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
	      var _this3 = this;
	
	      var target = arguments.length <= 0 || arguments[0] === undefined ? document : arguments[0];
	      var options = arguments[1];
	
	      if (target.nodeType !== Node.ELEMENT_NODE && target.nodeType !== Node.DOCUMENT_NODE) {
	        throw new Error('DOM document or DOM element should be given to search for and initialize this widget.');
	      }
	      if (target.nodeType === Node.ELEMENT_NODE && target.dataset.loading !== undefined) {
	        this.create(target, options);
	      } else {
	        [].concat(_toConsumableArray(target.querySelectorAll('[data-dropdown]'))).forEach(function (element) {
	          return _this3.create(element, options);
	        });
	      }
	    }
	  }]);
	
	  return Dropdown;
	}();
	
	/**
	 * The component options.
	 * @member {Object} Dropdown#options
	 * @property {string} [selectorItem] The CSS selector to find clickable areas in dropdown items.
	 * @property {string} [selectorItemSelected] The CSS selector to find the clickable area in the selected dropdown item.
	 * @property {string} [classSelected] The CSS class for the selected dropdown item.
	 * @property {string} [eventBeforeSelected]
	 *   The name of the custom event fired before a drop down item is selected.
	 *   Cancellation of this event stops selection of drop down item.
	 * @property {string} [eventAfterSelected] The name of the custom event fired after a drop down item is selected.
	 */
	
	/**
	 * The map associating DOM element and selector instance.
	 * @type {WeakMap}
	 */
	
	
	exports.default = Dropdown;
	Dropdown.components = new WeakMap();

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _eventMatches = __webpack_require__(4);
	
	var _eventMatches2 = _interopRequireDefault(_eventMatches);
	
	__webpack_require__(6);
	
	__webpack_require__(7);
	
	__webpack_require__(10);
	
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
	
	    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	
	    _classCallCheck(this, Card);
	
	    if (!element || element.nodeType !== Node.ELEMENT_NODE) {
	      throw new TypeError('DOM element should be given to initialize this widget.');
	    }
	    this.element = element;
	    this.options = Object.assign({
	      selectorCard: '.bx--card'
	    }, options);
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
	  }], [{
	    key: 'create',
	    value: function create(element, options) {
	      return this.components.get(element) || new this(element, options);
	    }
	
	    /**
	     * Instantiates card container in the given node.
	     * If the given element indicates that it's an card container (having `data-card-list` attribute), instantiates it.
	     * Otherwise, instantiates card containers by searching for card containers in the given node.
	     * @param {Node} target The DOM node to instantiate card containers in. Should be a document or an element.
	     * @param {Object} [options] The component options.
	     * @param {string} [options.selectorCard] The CSS selector to find cards.
	     */
	
	  }, {
	    key: 'init',
	    value: function init() {
	      var _this2 = this;
	
	      var target = arguments.length <= 0 || arguments[0] === undefined ? document : arguments[0];
	      var options = arguments[1];
	
	      if (target.nodeType !== Node.ELEMENT_NODE && target.nodeType !== Node.DOCUMENT_NODE) {
	        throw new Error('DOM document or DOM element should be given to search for and initialize this widget.');
	      }
	      if (target.nodeType === Node.ELEMENT_NODE && target.dataset.cardList !== undefined) {
	        this.create(target, options);
	      } else {
	        [].concat(_toConsumableArray(target.querySelectorAll('[data-card-list]'))).forEach(function (element) {
	          return _this2.create(element, options);
	        });
	      }
	    }
	  }]);
	
	  return Card;
	}();
	
	/**
	 * The component options.
	 * @member {Object} Card#options
	 * @property {string} [selectorCard] The CSS selector to find cards.
	 */
	
	/**
	 * The map associating DOM element and card list instance.
	 * @type {WeakMap}
	 */
	
	
	exports.default = Card;
	Card.components = new WeakMap();

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	__webpack_require__(6);
	
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
	
	    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	
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
	
	      if (state.contains('bx--number__arrow--icon-up')) {
	        if (this.options.ie) {
	          ++numberInput.value;
	        } else {
	          numberInput.stepUp();
	        }
	      } else if (state.contains('bx--number__arrow--icon-down')) {
	        if (this.options.ie) {
	          if (numberInput.value > 0) {
	            --numberInput.value;
	          }
	        } else {
	          numberInput.stepDown();
	        }
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
	
	    /**
	     * Instantiates number input UI in the given node.
	     * If the given element indicates that it's an number input UI (having `data-numberinput` attribute), instantiates it.
	     * Otherwise, instantiates number input UIs by searching for number input UIs in the given node.
	     * @param {Node} target The DOM node to instantiate number input UIs in. Should be a document or an element.
	     */
	
	  }, {
	    key: 'init',
	    value: function init() {
	      var _this2 = this;
	
	      var target = arguments.length <= 0 || arguments[0] === undefined ? document : arguments[0];
	
	      if (target.nodeType !== Node.ELEMENT_NODE && target.nodeType !== Node.DOCUMENT_NODE) {
	        throw new Error('DOM document or DOM element should be given to search for and initialize this widget.');
	      }
	      if (target.nodeType === Node.ELEMENT_NODE && target.dataset.numberinput !== undefined) {
	        this.create(target);
	      } else {
	        [].concat(_toConsumableArray(target.querySelectorAll('[data-numberinput]'))).forEach(function (element) {
	          return _this2.create(element);
	        });
	      }
	    }
	  }]);
	
	  return NumberInput;
	}();
	
	/**
	 * The map associating DOM element and number input UI instance.
	 * @type {WeakMap}
	 */
	
	
	exports.default = NumberInput;
	NumberInput.components = new WeakMap();

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _eventMatches = __webpack_require__(4);
	
	var _eventMatches2 = _interopRequireDefault(_eventMatches);
	
	__webpack_require__(7);
	
	var _toggleClass = __webpack_require__(8);
	
	var _toggleClass2 = _interopRequireDefault(_toggleClass);
	
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
	
	    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	
	    _classCallCheck(this, Table);
	
	    if (!element || element.nodeType !== Node.ELEMENT_NODE) {
	      throw new TypeError('DOM element should be given to initialize this widget.');
	    }
	    this.element = element;
	
	    this.options = Object.assign({
	      selectorTitle: '.bx--table__column-title',
	      selectorRow: '.bx--table__row',
	      selectorCheckbox: '.bx--checkbox',
	      classSortState: 'bx--table__column-title--rotated',
	      classCheckState: 'bx--table__row--checked',
	      eventBeforeSortToggled: 'table-sort-beingtoggled',
	      eventAfterSortToggled: 'table-sort-toggled',
	      eventBeforeCheckToggled: 'table-check-beingtoggled',
	      eventAfterCheckToggled: 'table-check-toggled'
	    }, options);
	
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
	  }], [{
	    key: 'create',
	    value: function create(element, options) {
	      return this.components.get(element) || new this(element, options);
	    }
	
	    /**
	     * Sets up the given node to instantiate data tables in.
	     * If the given element indicates that it's an data table (having `data-table` attribute), instantiates it.
	     * Otherwise, lazily instantiates data table when it's clicked on.
	     * @param {Node} target The DOM node to instantiate data tables in. Should be a document or an element.
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
	     * @returns {Handle} The handle to remove the event listener to handle clicking.
	     */
	
	  }, {
	    key: 'init',
	    value: function init() {
	      var _this2 = this;
	
	      var target = arguments.length <= 0 || arguments[0] === undefined ? document : arguments[0];
	      var options = arguments[1];
	
	      if (target.nodeType !== Node.ELEMENT_NODE && target.nodeType !== Node.DOCUMENT_NODE) {
	        throw new Error('DOM document or DOM element should be given to search for and initialize this widget.');
	      }
	      if (target.nodeType === Node.ELEMENT_NODE && target.dataset.table !== undefined) {
	        this.create(target, options);
	      } else {
	        var _ret = function () {
	          var handler = function handler(event) {
	            var element = (0, _eventMatches2.default)(event, '[data-table]');
	            if (element && !_this2.components.has(element)) {
	              _this2.create(element, options).handleClick(event);
	            }
	          };
	          target.addEventListener('click', handler);
	          return {
	            v: {
	              release: function release() {
	                return target.removeEventListener('click', handler);
	              }
	            }
	          };
	        }();
	
	        if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
	      }
	    }
	  }]);
	
	  return Table;
	}();
	
	/**
	 * The component options.
	 * @member {Object} Table#options
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
	
	/**
	 * The map associating DOM element and data table instance.
	 * @type {WeakMap}
	 */
	
	
	exports.default = Table;
	Table.components = new WeakMap();

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _lodash = __webpack_require__(22);
	
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
	    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	
	    _classCallCheck(this, DetailPageHeader);
	
	    if (!element || element.nodeType !== Node.ELEMENT_NODE) {
	      throw new TypeError('DOM element should be given to initialize this widget.');
	    }
	
	    this.element = element;
	
	    this.options = Object.assign({
	      slideUp: 'bx--detail-page-header--with-tabs--animated-slide-up'
	    }, options);
	
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
	     */
	
	  }, {
	    key: 'init',
	    value: function init() {
	      var _this = this;
	
	      var target = arguments.length <= 0 || arguments[0] === undefined ? document : arguments[0];
	      var options = arguments[1];
	
	      if (target.nodeType !== Node.ELEMENT_NODE && target.nodeType !== Node.DOCUMENT_NODE) {
	        throw new Error('DOM document or DOM element should be given to search for and initialize this widget.');
	      }
	      if (target.nodeType === Node.ELEMENT_NODE && target.dataset.detailPageHeader !== undefined) {
	        this.create(target, options);
	      } else {
	        [].concat(_toConsumableArray(target.querySelectorAll('[data-detail-page-header]'))).forEach(function (element) {
	          return _this.create(element, options);
	        });
	      }
	    }
	  }]);
	
	  return DetailPageHeader;
	}();
	
	/**
	 * The map associating DOM element and detail page header instance.
	 * @type {WeakMap}
	 */
	
	
	exports.default = DetailPageHeader;
	DetailPageHeader.components = new WeakMap();

/***/ },
/* 22 */
/***/ function(module, exports) {

	/**
	 * lodash 4.0.6 (Custom Build) <https://lodash.com/>
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
	var funcTag = '[object Function]',
	    genTag = '[object GeneratorFunction]',
	    symbolTag = '[object Symbol]';
	
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
	
	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
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
	 * @type {Function}
	 * @category Date
	 * @returns {number} Returns the timestamp.
	 * @example
	 *
	 * _.defer(function(stamp) {
	 *   console.log(_.now() - stamp);
	 * }, _.now());
	 * // => Logs the number of milliseconds it took for the deferred function to be invoked.
	 */
	var now = Date.now;
	
	/**
	 * Creates a debounced function that delays invoking `func` until after `wait`
	 * milliseconds have elapsed since the last time the debounced function was
	 * invoked. The debounced function comes with a `cancel` method to cancel
	 * delayed `func` invocations and a `flush` method to immediately invoke them.
	 * Provide an options object to indicate whether `func` should be invoked on
	 * the leading and/or trailing edge of the `wait` timeout. The `func` is invoked
	 * with the last arguments provided to the debounced function. Subsequent calls
	 * to the debounced function return the result of the last `func` invocation.
	 *
	 * **Note:** If `leading` and `trailing` options are `true`, `func` is invoked
	 * on the trailing edge of the timeout only if the debounced function is
	 * invoked more than once during the `wait` timeout.
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
	      lastCallTime = 0,
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
	    return (!lastCallTime || (timeSinceLastCall >= wait) ||
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
	    clearTimeout(timerId);
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
	    lastCallTime = lastInvokeTime = 0;
	    lastArgs = lastThis = timerId = undefined;
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
	        clearTimeout(timerId);
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
	 * Checks if `value` is classified as a `Function` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified,
	 *  else `false`.
	 * @example
	 *
	 * _.isFunction(_);
	 * // => true
	 *
	 * _.isFunction(/abc/);
	 * // => false
	 */
	function isFunction(value) {
	  // The use of `Object#toString` avoids issues with the `typeof` operator
	  // in Safari 8 which returns 'object' for typed array and weak map constructors,
	  // and PhantomJS 1.9 which returns 'function' for `NodeList` instances.
	  var tag = isObject(value) ? objectToString.call(value) : '';
	  return tag == funcTag || tag == genTag;
	}
	
	/**
	 * Checks if `value` is the
	 * [language type](http://www.ecma-international.org/ecma-262/6.0/#sec-ecmascript-language-types)
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
	 * @returns {boolean} Returns `true` if `value` is correctly classified,
	 *  else `false`.
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
	 * _.toNumber(3);
	 * // => 3
	 *
	 * _.toNumber(Number.MIN_VALUE);
	 * // => 5e-324
	 *
	 * _.toNumber(Infinity);
	 * // => Infinity
	 *
	 * _.toNumber('3');
	 * // => 3
	 */
	function toNumber(value) {
	  if (typeof value == 'number') {
	    return value;
	  }
	  if (isSymbol(value)) {
	    return NAN;
	  }
	  if (isObject(value)) {
	    var other = isFunction(value.valueOf) ? value.valueOf() : value;
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


/***/ }
/******/ ]);
//# sourceMappingURL=bluemix-components.js.map