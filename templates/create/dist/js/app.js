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
	
	__webpack_require__(1);
	
	__webpack_require__(2);
	
	var _file = __webpack_require__(3);
	
	var _file2 = _interopRequireDefault(_file);
	
	var _tabsNav = __webpack_require__(4);
	
	var _tabsNav2 = _interopRequireDefault(_tabsNav);
	
	var _header = __webpack_require__(7);
	
	var _header2 = _interopRequireDefault(_header);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
	
	document.addEventListener('DOMContentLoaded', function () {
	  [].concat(_toConsumableArray(document.querySelectorAll('[data-file-input]'))).forEach(function (element) {
	    return new _file2.default(element);
	  });
	  [].concat(_toConsumableArray(document.querySelectorAll('[data-tabs]'))).forEach(function (element) {
	    return new _tabsNav2.default(element);
	  });
	  [].concat(_toConsumableArray(document.querySelectorAll('[data-nav-target]'))).forEach(function (element) {
	    [].concat(_toConsumableArray(document.querySelectorAll(element.getAttribute('data-nav-target')))).forEach(function (target) {
	      target.addEventListener('header-beingselected', function (e) {
	        // In demo, don't follow the link in nav
	        e.detail.initiatingEvent.preventDefault();
	      });
	    });
	    _header2.default.hook(element);
	  });
	  [].concat(_toConsumableArray(document.querySelectorAll('[data-list-icons-search-action-target]'))).forEach(function (element) {
	    return new Toolbars(element);
	  });
	});

/***/ },
/* 1 */
/***/ function(module, exports) {

	/*!
	 * @copyright Copyright (c) 2015 IcoMoon.io
	 * @license   Licensed under MIT license
	 *            See https://github.com/Keyamoon/svgxuse
	 * @version   1.1.6
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
	                    } catch (ignore) {}
	                };
	            } else {
	                document.documentElement.addEventListener('DOMSubtreeModified', debouncedCheck, false);
	                unobserveChanges = function () {
	                    document.documentElement.removeEventListener('DOMSubtreeModified', debouncedCheck, false);
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
	            function onload(xhr) {
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
	                isHidden = bcr && bcr.left === 0 && bcr.right === 0;
	                if (bcr && bcr.width === 0 && bcr.height === 0 && !isHidden) {
	                    // the use element is empty
	                    // if there is a reference to an external SVG, try to fetch it
	                    // use the optional fallback URL if there is no reference to an external SVG
	                    if (fallback && !base.length && hash && !document.getElementById(hash)) {
	                        base = fallback;
	                    }
	                    if (base.length) {
	                        xhr = cache[base];
	                        if (xhr !== true) {
	                            uses[i].setAttributeNS(xlinkNS, 'xlink:href', '#' + hash);
	                        }
	                        if (xhr === undefined) {
	                            xhr = new Request();
	                            cache[base] = xhr;
	                            xhr.onload = onload(xhr);
	                            xhr.onerror = onErrorTimeout(xhr);
	                            xhr.ontimeout = onErrorTimeout(xhr);
	                            xhr.open('GET', base);
	                            xhr.send();
	                            inProgressCount += 1;
	                        }
	                    }
	                } else {
	                    // remember this URL if the use element was not empty and no request was sent
	                    if (!isHidden && cache[base] === undefined) {
	                        cache[base] = true;
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
	            checkUseElems();
	        }, false);
	    }
	}());
	


/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";
	
	Array.from = Array.from || function fromArray(a) {
	  return Array.prototype.slice.call(a);
	};

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var FileUploader = function () {
	  function FileUploader(element, options) {
	    var _this = this;
	
	    _classCallCheck(this, FileUploader);
	
	    if (!element || element.nodeType !== Node.ELEMENT_NODE) {
	      throw new TypeError('DOM element should be given to initialize this widget.');
	    }
	
	    this.element = element;
	
	    var labelSelector = options && options.labelSelector || element.getAttribute('data-label');
	    this.labelNode = element.parentNode.querySelector(labelSelector) || element.nextElementSibling;
	
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
	        this.labelNode.innerHTML = fileName;
	      }
	    }
	  }]);
	
	  return FileUploader;
	}();

	exports.default = FileUploader;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); // This file was moved here as a dependancy of tab-nav.
	// It no longer has anything to do with content-switcher, so the name could
	// possibly be changed
	
	__webpack_require__(5);
	
	__webpack_require__(6);
	
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
	      classActive: 'selected'
	    }, options);
	
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
	      if (event.currentTarget.tagName === 'A' || event.currentTarget.querySelector('a')) {
	        event.preventDefault();
	      }
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
	      this.element.querySelector(this.options.selectorMenu).classList.toggle('tabs--hidden');
	    }
	  }, {
	    key: 'updateTriggerText',
	    value: function updateTriggerText(target) {
	      this.element.querySelector(this.options.selectorTriggerText).textContent = target.textContent;
	    }
	  }]);
	
	  return Tab;
	}();

	exports.default = Tab;

/***/ },
/* 5 */
/***/ function(module, exports) {

	"use strict";
	
	Array.from = Array.from || function fromArray(a) {
	  return Array.prototype.slice.call(a);
	};

/***/ },
/* 6 */
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
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	__webpack_require__(5);
	
	__webpack_require__(6);
	
	__webpack_require__(8);
	
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
	      var add = undefined;
	      if (event.type === 'click' || event.type === 'keydown' && event.which === 40) {
	        // Toggle button or ESC key on nav
	        add = !isActive;
	      } else if (event.type === 'keydown' && event.which === 27) {
	        // Down arrow on launch button
	        add = false;
	      } else {
	        return;
	      }
	      if (event.currentTarget.tagName === 'A' || event.currentTarget.querySelector('a')) {
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
	  }], [{
	    key: 'create',
	    value: function create(element, options) {
	      return HeaderNav.components.get(element) || new HeaderNav(element, options);
	    }
	  }, {
	    key: 'hook',
	    value: function hook(element, options) {
	      if (!element || element.nodeType !== Node.ELEMENT_NODE) {
	        throw new TypeError('DOM element should be given to initialize this widget.');
	      }
	
	      var navs = [].concat(_toConsumableArray(element.ownerDocument.querySelectorAll(element.getAttribute('data-nav-target')))).map(function (target) {
	        return HeaderNav.create(target, options);
	      });
	
	      ['keydown', 'click'].forEach(function (name) {
	        element.addEventListener(name, function (event) {
	          if (event.currentTarget.tagName === 'A' || event.currentTarget.querySelector('a')) {
	            event.preventDefault();
	          }
	          navs.forEach(function (nav) {
	            return nav.toggleNav(event);
	          });
	        });
	      });
	    }
	  }]);
	
	  return HeaderNav;
	}();
	
	exports.default = HeaderNav;
	
	HeaderNav.components = new WeakMap();

/***/ },
/* 8 */
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

/***/ }
/******/ ]);
//# sourceMappingURL=app.js.map