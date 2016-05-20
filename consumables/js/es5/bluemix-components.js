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
	exports.Table = exports.NumberInput = exports.Card = exports.Dropdown = exports.Loading = exports.Toolbars = exports.HeaderNav = exports.Modal = exports.OverflowMenu = exports.Tab = exports.ContentSwitcher = exports.FileUploader = exports.FabButton = exports.settings = undefined;
	
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
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	// ====================//
	// Imports and Exports //
	// ====================//
	
	// This file is for the following:
	// 1. Export ES2015 classes as modules (used with base-elements and components)
	//    - consume ES2015 modules from this file using import:
	//    - import { Fab, FileUploader } from 'relative/path/to/bower/components';
	// 2. Build an ES5-compatible files for prototyping.
	//    See ./dist/dist-demo.html for details
	
	// Polyfills
	// -------------
	
	
	var settings = {};
	
	// Export all vars/classes for consumption:
	
	// Base Elements & Components
	// -------------
	// - JavaScript classes for use with components and base-elements.
	// - The following statements import classes from actual locations to
	//   be consumed from this file instead of their actual locations.
	exports.settings = settings;
	exports.FabButton = _fab2.default;
	exports.FileUploader = _fileUploader2.default;
	exports.ContentSwitcher = _contentSwitcher2.default;
	exports.Tab = _tabs2.default;
	exports.OverflowMenu = _overflowMenu2.default;
	exports.Modal = _modals2.default;
	exports.HeaderNav = _header2.default;
	exports.Toolbars = _toolbars2.default;
	exports.Loading = _loading2.default;
	exports.Dropdown = _dropdown2.default;
	exports.Card = _card2.default;
	exports.NumberInput = _numberInput2.default;
	exports.Table = _table2.default;
	
	
	var init = function init() {
	  if (!settings.disableAutoInit) {
	    _fab2.default.init();
	    _fileUploader2.default.init();
	    _contentSwitcher2.default.init();
	    _tabs2.default.init();
	    _overflowMenu2.default.init();
	    _modals2.default.init();
	    _header2.default.init();
	    _toolbars2.default.init();
	    _loading2.default.init();
	    _dropdown2.default.init();
	    _card2.default.init();
	    _numberInput2.default.init();
	    _table2.default.init();
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
	  }, {
	    key: 'release',
	    value: function release() {
	      this.constructor.components.delete(this.element);
	    }
	  }], [{
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
	  }, {
	    key: 'create',
	    value: function create(element, options) {
	      return this.components.get(element) || new this(element, options);
	    }
	  }]);
	
	  return FileUploader;
	}();
	
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
	
	  _createClass(FabButton, [{
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
	  }, {
	    key: 'release',
	    value: function release() {
	      this.constructor.components.delete(this.element);
	    }
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
	  function ContentSwitcher(element) {
	    var _this = this;
	
	    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	
	    _classCallCheck(this, ContentSwitcher);
	
	    if (!element || element.nodeType !== Node.ELEMENT_NODE) {
	      throw new TypeError('DOM element should be given to initialize this widget.');
	    }
	
	    this.element = element;
	
	    this.options = Object.assign({
	      selectorButton: 'input[type="radio"]',
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
	
	  _createClass(ContentSwitcher, [{
	    key: 'handleClick',
	    value: function handleClick(event) {
	      var button = (0, _eventMatches2.default)(event, this.options.selectorButton);
	      if (button) {
	        this.setActive(button);
	      }
	    }
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
	
	      [].concat(_toConsumableArray(this.element.querySelectorAll(this.options.selectorButton))).forEach(function (button) {
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
	  }, {
	    key: 'create',
	    value: function create(element, options) {
	      return this.components.get(element) || new this(element, options);
	    }
	  }]);
	
	  return ContentSwitcher;
	}();
	
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
	
	  _createClass(Tab, [{
	    key: '_changeActive',
	    value: function _changeActive(item) {
	      _get(Object.getPrototypeOf(Tab.prototype), '_changeActive', this).call(this, item);
	      this.updateTriggerText(item);
	    }
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
	  }, {
	    key: 'updateMenuState',
	    value: function updateMenuState() {
	      this.element.querySelector(this.options.selectorMenu).classList.toggle(this.options.classHidden);
	    }
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
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Modal = function () {
	  function Modal(element) {
	    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	
	    _classCallCheck(this, Modal);
	
	    if (!element || element.nodeType !== Node.ELEMENT_NODE) {
	      throw new TypeError('DOM element should be given to initialize this widget.');
	    }
	
	    this.element = element;
	
	    this.options = Object.assign({
	      classVisible: 'is-visible',
	      eventBeforeShown: 'modal-beingshown',
	      eventAfterShown: 'modal-shown',
	      eventBeforeHidden: 'modal-beinghidden',
	      eventAfterHidden: 'modal-hidden'
	    }, options);
	
	    this.constructor.components.set(this.element, this);
	
	    this.hookCloseActions();
	  }
	
	  _createClass(Modal, [{
	    key: 'hookCloseActions',
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
	      (0, _toggleClass2.default)(this.element, this.options.classVisible, visible);
	      var transitionDuration = parseFloat(this.element.ownerDocument.defaultView.getComputedStyle(this.element).transitionDuration);
	      if (isNaN(transitionDuration) || transitionDuration === 0) {
	        finishedTransition();
	      }
	    }
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
	          _this4.element.dispatchEvent(new CustomEvent(_this4.options.eventAfterHidden), {
	            bubbles: true,
	            cancelable: true
	          });
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
	  }], [{
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
	    key: 'create',
	    value: function create(element, options) {
	      return this.components.get(element) || new this(element, options);
	    }
	  }, {
	    key: 'hook',
	    value: function hook() {
	      console.warn('Modals.hook() is deprecated. Use Modals.init() instead.'); // eslint-disable-line no-console
	    }
	  }]);
	
	  return Modal;
	}();
	
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
	
	  _createClass(HeaderNav, [{
	    key: 'toggleNav',
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
	  }, {
	    key: 'release',
	    value: function release() {
	      this.constructor.components.delete(this.element);
	    }
	  }], [{
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
	  }, {
	    key: 'create',
	    value: function create(element) {
	      return this.components.get(element) || new this(element);
	    }
	  }]);
	
	  return Toolbars;
	}();
	
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
	      this.element.classList.add('bx--dropdown--ie');
	    }
	
	    this.constructor.components.set(this.element, this);
	
	    // Initialize spinner
	    this.set(this.active);
	  }
	
	  _createClass(Loading, [{
	    key: 'set',
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
	  }, {
	    key: 'toggle',
	    value: function toggle() {
	      return this.set(!this.active);
	    }
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
	
	  _createClass(Dropdown, [{
	    key: 'release',
	    value: function release() {
	      this.constructor.components.delete(this.element);
	    }
	
	    // Open and close dropdown menu
	
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
	
	    // Handles clicking on dropdown options.
	    // * Change Dropdown text to selected option.
	    // * Remove selected option from options when selected.
	    // * Emit custom events.
	
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
	
	__webpack_require__(10);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Card = function () {
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
	  function NumberInput(element) {
	    var _this = this;
	
	    _classCallCheck(this, NumberInput);
	
	    if (!element || element.nodeType !== Node.ELEMENT_NODE) {
	      throw new TypeError('DOM element should be given to initialize this widget.');
	    }
	
	    this.element = element;
	    this.constructor.components.set(this.element, this);
	    this.element.addEventListener('click', function (event) {
	      return _this.handleClick(event);
	    });
	  }
	
	  _createClass(NumberInput, [{
	    key: 'handleClick',
	    value: function handleClick(event) {
	      var state = event.target.classList;
	      var numberInput = this.element.querySelector('.bx--number__input');
	
	      if (state.contains('bx--number__arrow--icon-up')) {
	        numberInput.stepUp();
	      } else if (state.contains('bx--number__arrow--icon-down')) {
	        numberInput.stepDown();
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
	
	var _toggleClass = __webpack_require__(8);
	
	var _toggleClass2 = _interopRequireDefault(_toggleClass);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Table = function () {
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
	
	  _createClass(Table, [{
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
	
	exports.default = Table;
	
	
	Table.components = new WeakMap();

/***/ }
/******/ ]);
//# sourceMappingURL=bluemix-components.js.map