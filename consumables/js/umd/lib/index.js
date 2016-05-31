(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', './file-uploader', './fab', './content-switcher', './tabs', './overflow-menu', './modals', './header', './toolbars', './loading', './dropdown', './card', './number-input', './table', 'svgxuse'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('./file-uploader'), require('./fab'), require('./content-switcher'), require('./tabs'), require('./overflow-menu'), require('./modals'), require('./header'), require('./toolbars'), require('./loading'), require('./dropdown'), require('./card'), require('./number-input'), require('./table'), require('svgxuse'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.fileUploader, global.fab, global.contentSwitcher, global.tabs, global.overflowMenu, global.modals, global.header, global.toolbars, global.loading, global.dropdown, global.card, global.numberInput, global.table, global.svgxuse);
    global.index = mod.exports;
  }
})(this, function (exports, _fileUploader, _fab, _contentSwitcher, _tabs, _overflowMenu, _modals, _header, _toolbars, _loading, _dropdown, _card, _numberInput, _table) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Table = exports.NumberInput = exports.Card = exports.Dropdown = exports.Loading = exports.Toolbars = exports.HeaderNav = exports.Modal = exports.OverflowMenu = exports.Tab = exports.ContentSwitcher = exports.FileUploader = exports.FabButton = exports.settings = undefined;

  var _fileUploader2 = _interopRequireDefault(_fileUploader);

  var _fab2 = _interopRequireDefault(_fab);

  var _contentSwitcher2 = _interopRequireDefault(_contentSwitcher);

  var _tabs2 = _interopRequireDefault(_tabs);

  var _overflowMenu2 = _interopRequireDefault(_overflowMenu);

  var _modals2 = _interopRequireDefault(_modals);

  var _header2 = _interopRequireDefault(_header);

  var _toolbars2 = _interopRequireDefault(_toolbars);

  var _loading2 = _interopRequireDefault(_loading);

  var _dropdown2 = _interopRequireDefault(_dropdown);

  var _card2 = _interopRequireDefault(_card);

  var _numberInput2 = _interopRequireDefault(_numberInput);

  var _table2 = _interopRequireDefault(_table);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

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
});