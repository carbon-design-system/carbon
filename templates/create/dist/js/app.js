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
	
	var _js = __webpack_require__(1);
	
	var _js2 = _interopRequireDefault(_js);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
	
	document.addEventListener('DOMContentLoaded', function () {
	  [].concat(_toConsumableArray(document.querySelectorAll('[data-file-input]'))).forEach(function (element) {
	    return _js2.default.FileUploader.create(element);
	  });
	  [].concat(_toConsumableArray(document.querySelectorAll('[data-tabs]'))).forEach(function (element) {
	    return _js2.default.Tab.create(element);
	  });
	  [].concat(_toConsumableArray(document.querySelectorAll('[data-nav-target]'))).forEach(function (element) {
	    [].concat(_toConsumableArray(document.querySelectorAll(element.getAttribute('data-nav-target')))).forEach(function (target) {
	      target.addEventListener('header-beingselected', function (e) {
	        // In demo, don't follow the link in nav
	        e.detail.initiatingEvent.preventDefault();
	      });
	    });
	    _js2.default.HeaderNav.hook(element);
	  });
	  [].concat(_toConsumableArray(document.querySelectorAll('[data-list-icons-search-action-target]'))).forEach(function (element) {
	    return _js2.default.Toolbars.create(element);
	  });
	});

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Spinner = exports.Toolbars = exports.HeaderNav = exports.Modal = exports.OverflowMenu = exports.Tab = exports.FileUploader = exports.FabButton = exports.settings = undefined;
	
	__webpack_require__(2);
	
	var _fab = __webpack_require__(3);
	
	var _fab2 = _interopRequireDefault(_fab);
	
	var _file = __webpack_require__(5);
	
	var _file2 = _interopRequireDefault(_file);
	
	var _tabsNav = __webpack_require__(6);
	
	var _tabsNav2 = _interopRequireDefault(_tabsNav);
	
	var _overflowMenu = __webpack_require__(9);
	
	var _overflowMenu2 = _interopRequireDefault(_overflowMenu);
	
	var _modals = __webpack_require__(10);
	
	var _modals2 = _interopRequireDefault(_modals);
	
	var _header = __webpack_require__(12);
	
	var _header2 = _interopRequireDefault(_header);
	
	var _toolbars = __webpack_require__(13);
	
	var _toolbars2 = _interopRequireDefault(_toolbars);
	
	var _spinner = __webpack_require__(14);
	
	var _spinner2 = _interopRequireDefault(_spinner);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	// Base Elements & Components
	// -------------
	// - JavaScript classes for use with components and base-elements.
	// - The following statements import classes from actual locations to
	//   be consumed from this file instead of their actual locations.
	
	var settings = {};
	
	// Export all vars/classes for consumption:
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
	exports.settings = settings;
	exports.FabButton = _fab2.default;
	exports.FileUploader = _file2.default;
	exports.Tab = _tabsNav2.default;
	exports.OverflowMenu = _overflowMenu2.default;
	exports.Modal = _modals2.default;
	exports.HeaderNav = _header2.default;
	exports.Toolbars = _toolbars2.default;
	exports.Spinner = _spinner2.default;
	
	var init = function init() {
	  if (!settings.disableAutoInit) {
	    _fab2.default.init();
	    _file2.default.init();
	    _tabsNav2.default.init();
	    _overflowMenu2.default.init();
	    _modals2.default.init();
	    _header2.default.init();
	    _toolbars2.default.init();
	    _spinner2.default.init();
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
/* 2 */
/***/ function(module, exports) {

	/*!
	 * @copyright Copyright (c) 2016 IcoMoon.io
	 * @license   Licensed under MIT license
	 *            See https://github.com/Keyamoon/svgxuse
	 * @version   1.1.15
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
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
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
	      this.element.classList.toggle('is-closed');
	    }
	  }, {
	    key: 'release',
	    value: function release() {
	      this.constructor.components.delete(this.element);
	    }
	  }], [{
	    key: 'init',
	    value: function init() {
	      document.addEventListener('click', function (event) {
	        var element = (0, _eventMatches2.default)(event, '[data-fab]');
	        if (element && !FabButton.components.has(element)) {
	          FabButton.create(element).toggle(event);
	        }
	      });
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
	
	    var labelSelector = options.labelSelector || element.getAttribute('data-label');
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
	        fileName = (element.getAttribute('data-multiple-caption') || '').replace('{count}', element.files.length);
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
	    value: function init(options) {
	      var _this2 = this;
	
	      [].concat(_toConsumableArray(document.querySelectorAll('[data-file-input]'))).forEach(function (element) {
	        return _this2.create(element, options);
	      });
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
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); // This file was moved here as a dependancy of tab-nav.
	// It no longer has anything to do with content-switcher, so the name could
	// possibly be changed
	
	
	__webpack_require__(7);
	
	__webpack_require__(8);
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function toggleClass(element, name, add) {
	  if (element.classList.contains(name) === !add) {
	    element.classList[add ? 'add' : 'remove'](name);
	  }
	}
	
	var Tab = function () {
	  function Tab(element) {
	    var _this = this;
	
	    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	
	    _classCallCheck(this, Tab);
	
	    if (!element || element.nodeType !== Node.ELEMENT_NODE) {
	      throw new TypeError('DOM element should be given to initialize this widget.');
	    }
	
	    this.element = element;
	
	    this.options = Object.assign({
	      selectorMenu: '.tabs__nav',
	      selectorTrigger: '.tabs__trigger',
	      selectorTriggerText: '.trigger__text',
	      selectorButton: '.nav__item',
	      selectorButtonSelected: '.nav__item.selected',
	      classActive: 'selected',
	      classHidden: 'tabs--hidden'
	    }, options);
	
	    this.constructor.components.set(this.element, this);
	
	    [].concat(_toConsumableArray(this.element.querySelectorAll(this.options.selectorButton))).forEach(function (button) {
	      button.addEventListener('click', function (event) {
	        return _this.handleItemClick(event);
	      });
	    });
	
	    [].concat(_toConsumableArray(this.element.querySelectorAll(this.options.selectorTrigger))).forEach(function (trigger) {
	      trigger.addEventListener('click', function (event) {
	        return _this.updateMenuState(event);
	      });
	    });
	
	    this.updateTriggerText(this.element.querySelector(this.options.selectorButtonSelected));
	  }
	
	  _createClass(Tab, [{
	    key: 'handleItemClick',
	    value: function handleItemClick(event) {
	      this.setActive(event);
	      this.updateMenuState();
	      this.updateTriggerText(event.currentTarget);
	    }
	  }, {
	    key: 'setActive',
	    value: function setActive(event) {
	      var _this2 = this;
	
	      [].concat(_toConsumableArray(this.element.querySelectorAll(this.options.selectorButton))).forEach(function (button) {
	        if (button !== event.currentTarget) {
	          toggleClass(button, _this2.options.classActive, false);
	        }
	      });
	      toggleClass(event.currentTarget, this.options.classActive, true);
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
	  }, {
	    key: 'release',
	    value: function release() {
	      this.constructor.components.delete(this.element);
	    }
	  }], [{
	    key: 'init',
	    value: function init(options) {
	      var _this3 = this;
	
	      [].concat(_toConsumableArray(document.querySelectorAll('[data-tabs]'))).forEach(function (element) {
	        return _this3.create(element, options);
	      });
	    }
	  }, {
	    key: 'create',
	    value: function create(element, options) {
	      return this.components.get(element) || new this(element, options);
	    }
	  }]);
	
	  return Tab;
	}();
	
	exports.default = Tab;
	
	
	Tab.components = new WeakMap();

/***/ },
/* 7 */
/***/ function(module, exports) {

	"use strict";
	
	Array.from = Array.from || function fromArray(a) {
	  return Array.prototype.slice.call(a);
	};

/***/ },
/* 8 */
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
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	__webpack_require__(7);
	
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
	
	    this.element.addEventListener('click', function (event) {
	      return _this.openMenu(event);
	    });
	  }
	
	  _createClass(OverflowMenu, [{
	    key: 'openMenu',
	    value: function openMenu(event) {
	      if (event.currentTarget.tagName === 'A') {
	        event.preventDefault();
	      }
	
	      if (this.element.classList.contains('open')) {
	        this.element.classList.remove('open');
	      } else {
	        [].concat(_toConsumableArray(this.element.ownerDocument.querySelectorAll('[data-overflow-menu].open'))).forEach(function (element) {
	          element.classList.remove('open');
	        });
	
	        this.element.classList.add('open');
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
	
	      [].concat(_toConsumableArray(document.querySelectorAll('[data-overflow-menu]'))).forEach(function (element) {
	        return _this2.create(element);
	      });
	    }
	  }, {
	    key: 'create',
	    value: function create(element) {
	      return this.components.get(element) || new this(element);
	    }
	  }]);
	
	  return OverflowMenu;
	}();
	
	exports.default = OverflowMenu;
	
	
	OverflowMenu.components = new WeakMap();

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	__webpack_require__(7);
	
	__webpack_require__(8);
	
	__webpack_require__(11);
	
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
	      classVisible: 'is-visible'
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
	      this.element.classList[visible ? 'add' : 'remove'](this.options.classVisible);
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
	
	      var eventStart = new CustomEvent('modal-beingshown', {
	        bubbles: true,
	        cancelable: true,
	        detail: { launchingElement: launchingElement }
	      });
	
	      // https://connect.microsoft.com/IE/feedback/details/790389/event-defaultprevented-returns-false-after-preventdefault-was-called
	      if (this.element.dispatchEvent(eventStart)) {
	        this._changeState(true, function () {
	          _this3.element.dispatchEvent(new CustomEvent('modal-shown', {
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
	
	      var eventStart = new CustomEvent('modal-beinghidden', {
	        bubbles: true,
	        cancelable: true
	      });
	
	      // https://connect.microsoft.com/IE/feedback/details/790389/event-defaultprevented-returns-false-after-preventdefault-was-called
	      if (this.element.dispatchEvent(eventStart)) {
	        this._changeState(false, function () {
	          _this4.element.dispatchEvent(new CustomEvent('modal-hidden'), {
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
	    value: function init(options) {
	      var _this5 = this;
	
	      [].concat(_toConsumableArray(document.querySelectorAll('[data-modal-target]'))).forEach(function (element) {
	        return _this5.hook(element, options);
	      });
	      [].concat(_toConsumableArray(document.querySelectorAll('[data-modal]'))).forEach(function (element) {
	        return _this5.create(element, options);
	      });
	    }
	  }, {
	    key: 'create',
	    value: function create(element, options) {
	      return this.components.get(element) || new this(element, options);
	    }
	  }, {
	    key: 'hook',
	    value: function hook(element, options) {
	      if (!element || element.nodeType !== Node.ELEMENT_NODE) {
	        throw new TypeError('DOM element should be given to initialize this widget.');
	      }
	
	      var modalElements = [].concat(_toConsumableArray(element.ownerDocument.querySelectorAll(element.getAttribute('data-modal-target'))));
	      if (modalElements.length > 1) {
	        throw new Error('Target modal must be unique.');
	      }
	
	      var modal = this.create(modalElements[0], options);
	
	      element.addEventListener('click', function (event) {
	        if (event.currentTarget.tagName === 'A') {
	          event.preventDefault();
	        }
	        modal.show(event.currentTarget, function (error, shownAlready) {
	          if (!error && !shownAlready && modal.element.offsetWidth > 0 && modal.element.offsetHeight > 0) {
	            modal.element.focus();
	          }
	        });
	      });
	
	      return modal;
	    }
	  }]);
	
	  return Modal;
	}();
	
	exports.default = Modal;
	
	
	Modal.components = new WeakMap();

/***/ },
/* 11 */
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
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	__webpack_require__(7);
	
	__webpack_require__(8);
	
	__webpack_require__(11);
	
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
	      selectorLabel: '.taxonomy-item__label'
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
	      if (event.currentTarget.tagName === 'A') {
	        event.preventDefault();
	      }
	
	      var launchingElement = event.currentTarget;
	      var typeSuffix = add ? 'shown' : 'hidden';
	      var eventStart = new CustomEvent('header-being' + typeSuffix, {
	        bubbles: true,
	        cancelable: true,
	        detail: { launchingElement: launchingElement }
	      });
	      this.element.dispatchEvent(eventStart);
	
	      if (add) {
	        this.triggerNode = event.currentTarget;
	        this.triggerLabelNode = this.triggerNode.querySelector(this.options.selectorTriggerLabel);
	      }
	
	      if (!eventStart.defaultPrevented) {
	        this.element.classList[add ? 'add' : 'remove'](this.options.classActive);
	        (this.element.classList.contains(this.options.classActive) ? this.menuNode : this.triggerNode).focus();
	        this.element.dispatchEvent(new CustomEvent('header-' + typeSuffix, {
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
	      var eventStart = new CustomEvent('header-beingselected', {
	        bubbles: true,
	        cancelable: true,
	        detail: {
	          initiatingEvent: event,
	          itemElement: activatedElement
	        }
	      });
	      this.element.dispatchEvent(eventStart);
	
	      if (!eventStart.defaultPrevented) {
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
	        this.element.dispatchEvent(new CustomEvent('header-selected', {
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
	    value: function init(options) {
	      var _this2 = this;
	
	      [].concat(_toConsumableArray(document.querySelectorAll('[data-nav-target]'))).forEach(function (element) {
	        return _this2.hook(element, options);
	      });
	    }
	  }, {
	    key: 'create',
	    value: function create(element, options) {
	      return this.components.get(element) || new this(element, options);
	    }
	  }, {
	    key: 'hook',
	    value: function hook(element, options) {
	      var _this3 = this;
	
	      if (!element || element.nodeType !== Node.ELEMENT_NODE) {
	        throw new TypeError('DOM element should be given to initialize this widget.');
	      }
	
	      var navs = [].concat(_toConsumableArray(element.ownerDocument.querySelectorAll(element.getAttribute('data-nav-target')))).map(function (target) {
	        return _this3.create(target, options);
	      });
	
	      ['keydown', 'click'].forEach(function (name) {
	        element.addEventListener(name, function (event) {
	          navs.forEach(function (nav) {
	            return nav.toggleNav(event);
	          });
	        });
	      });
	
	      return navs;
	    }
	  }]);
	
	  return HeaderNav;
	}();
	
	exports.default = HeaderNav;
	
	
	HeaderNav.components = new WeakMap();

/***/ },
/* 13 */
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
	    this.searchFieldNode = this.element.ownerDocument.querySelector(this.element.getAttribute('data-list-icons-search-action-target'));
	
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
	      this.searchFieldNode.classList.toggle('show-search');
	      this.searchFieldNode.value = '';
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
	
	      [].concat(_toConsumableArray(document.querySelectorAll('[data-list-icons-search-action-target]'))).forEach(function (element) {
	        return _this2.create(element);
	      });
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
/* 14 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Spinner = function () {
	  function Spinner(element) {
	    var options = arguments.length <= 1 || arguments[1] === undefined ? { active: true } : arguments[1];
	
	    _classCallCheck(this, Spinner);
	
	    if (!element || element.nodeType !== Node.ELEMENT_NODE) {
	      throw new TypeError('DOM element should be given to initialize this widget.');
	    }
	
	    this.element = element;
	    this.active = 'active' in options ? options.active : true;
	
	    this.ie = false;
	
	    // check if browser is Internet Explorer
	    if (options.ie || window.ActiveXObject || 'ActiveXObject' in window) {
	      this.ie = true;
	      this.element.classList.add('is--ie');
	    }
	
	    this.constructor.components.set(this.element, this);
	
	    // initialize spinner
	    this.set(this.active);
	  }
	
	  _createClass(Spinner, [{
	    key: 'set',
	    value: function set(active) {
	      if (typeof active !== 'boolean') {
	        throw new TypeError('set expects a boolean.');
	      }
	
	      this.active = active;
	
	      if (this.active) {
	        this.element.classList.remove('is-stopping--ie', 'is-stopping');
	      } else {
	        if (this.ie) {
	          this.element.classList.add('is-stopping--ie');
	        } else {
	          this.element.classList.add('is-stopping');
	        }
	      }
	
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
	    key: 'init',
	    value: function init(options) {
	      var _this = this;
	
	      [].concat(_toConsumableArray(document.querySelectorAll('[data-spinner]'))).forEach(function (element) {
	        return _this.create(element, options);
	      });
	    }
	  }, {
	    key: 'create',
	    value: function create(element) {
	      return this.components.get(element) || new this(element);
	    }
	  }]);
	
	  return Spinner;
	}();
	
	exports.default = Spinner;
	
	
	Spinner.components = new WeakMap();

/***/ }
/******/ ]);
//# sourceMappingURL=app.js.map