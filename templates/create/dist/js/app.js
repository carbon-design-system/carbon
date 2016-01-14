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
	
	var _contentSwitcher = __webpack_require__(1);
	
	var _contentSwitcher2 = _interopRequireDefault(_contentSwitcher);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	(0, _contentSwitcher2.default)();

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
	
	var ContentSwitcher = function ContentSwitcher() {
	
	  var csButtons = [].concat(_toConsumableArray(document.querySelectorAll('.content-switcher__btn')));
	
	  var addActive = function addActive(buttons) {
	    buttons.forEach(function (button) {
	      button.addEventListener('click', function () {
	        removeActive(buttons);
	        button.classList.add('active');
	      });
	    });
	  };
	
	  var removeActive = function removeActive(buttons) {
	    buttons.forEach(function (button) {
	      if (button.classList.contains('active')) {
	        button.classList.remove('active');
	      }
	    });
	  };
	
	  addActive(csButtons);
	};
	
	exports.default = ContentSwitcher;

/***/ }
/******/ ]);
//# sourceMappingURL=app.js.map