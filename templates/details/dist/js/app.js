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
	
	var _tabsNav = __webpack_require__(1);
	
	var _tabsNav2 = _interopRequireDefault(_tabsNav);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	(0, _tabsNav2.default)();

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
	
	var Tab = function Tab() {
	
	  var CLASSES = {
	    MENU: '.tabs__nav',
	    TRIGGER: '.tabs__trigger',
	    TRIGGER_TEXT: '.trigger__text',
	    LINK: '.nav__item'
	  };
	
	  var trigger = document.querySelector(CLASSES.TRIGGER);
	  var menu = document.querySelector(CLASSES.MENU);
	  var links = [].concat(_toConsumableArray(document.querySelectorAll(CLASSES.LINK)));
	  var triggerText = document.querySelector(CLASSES.TRIGGER_TEXT);
	
	  // ADDS CLICK EVENT LISTENER TO ALL LIST ITEMS
	  var addListenerToLinks = function addListenerToLinks(tabLinks) {
	    tabLinks.forEach(function (link) {
	      link.addEventListener('click', function (e) {
	        removeSelected(tabLinks);
	        link.classList.add('selected');
	        changeTopText(tabLinks);
	        menu.classList.toggle('tabs--hidden');
	      });
	    });
	  };
	
	  // REMOVES SELECTED CLASS FOR PREVIOUS SELECTED
	  var removeSelected = function removeSelected(tabLinks) {
	    tabLinks.forEach(function (link) {
	      if (link.classList.contains('selected')) {
	        link.classList.remove('selected');
	      }
	    });
	  };
	
	  // ADDS INNER TEXT OF SELECTED LIST ITEM TO TABS TRIGGER
	  var changeTopText = function changeTopText(tabLinks) {
	    tabLinks.forEach(function (link) {
	      if (link.classList.contains('selected')) {
	        triggerText.innerText = link.innerText;
	      }
	    });
	  };
	
	  trigger.addEventListener('click', function (e) {
	    menu.classList.toggle('tabs--hidden');
	  });
	
	  addListenerToLinks(links);
	  changeTopText(links);
	};
	
	exports.default = Tab;

/***/ }
/******/ ]);
//# sourceMappingURL=app.js.map