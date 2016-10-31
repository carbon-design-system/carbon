(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'svg4everybody', './file-uploader', './fab', './content-switcher', './tabs', './overflow-menu', './modals', './header', './toolbars', './loading', './dropdown', './card', './number-input', './table', './detail-page-header', './left-nav', './unified-header', './inline-left-nav', './profile-switcher', './search-with-options'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('svg4everybody'), require('./file-uploader'), require('./fab'), require('./content-switcher'), require('./tabs'), require('./overflow-menu'), require('./modals'), require('./header'), require('./toolbars'), require('./loading'), require('./dropdown'), require('./card'), require('./number-input'), require('./table'), require('./detail-page-header'), require('./left-nav'), require('./unified-header'), require('./inline-left-nav'), require('./profile-switcher'), require('./search-with-options'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.svg4everybody, global.fileUploader, global.fab, global.contentSwitcher, global.tabs, global.overflowMenu, global.modals, global.header, global.toolbars, global.loading, global.dropdown, global.card, global.numberInput, global.table, global.detailPageHeader, global.leftNav, global.unifiedHeader, global.inlineLeftNav, global.profileSwitcher, global.searchWithOptions);
    global.index = mod.exports;
  }
})(this, function (exports, _svg4everybody, _fileUploader, _fab, _contentSwitcher, _tabs, _overflowMenu, _modals, _header, _toolbars, _loading, _dropdown, _card, _numberInput, _table, _detailPageHeader, _leftNav, _unifiedHeader, _inlineLeftNav, _profileSwitcher, _searchWithOptions) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.ProfileSwitcher = exports.DetailPageHeader = exports.Table = exports.NumberInput = exports.Card = exports.Dropdown = exports.Loading = exports.Toolbars = exports.LeftNav = exports.HeaderNav = exports.Modal = exports.OverflowMenu = exports.Tab = exports.ContentSwitcher = exports.FileUploader = exports.FabButton = exports.settings = undefined;

  var _svg4everybody2 = _interopRequireDefault(_svg4everybody);

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

  var _detailPageHeader2 = _interopRequireDefault(_detailPageHeader);

  var _leftNav2 = _interopRequireDefault(_leftNav);

  var _unifiedHeader2 = _interopRequireDefault(_unifiedHeader);

  var _inlineLeftNav2 = _interopRequireDefault(_inlineLeftNav);

  var _profileSwitcher2 = _interopRequireDefault(_profileSwitcher);

  var _searchWithOptions2 = _interopRequireDefault(_searchWithOptions);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  (0, _svg4everybody2.default)({ polyfill: true });

  // Base Elements & Components
  // -------------
  // - JavaScript classes for use with components and base-elements.
  // - The following statements import classes from actual locations to
  //   be consumed from this file instead of their actual locations.
  // ====================//
  // Imports and Exports //
  // ====================//


  // Polyfills
  // -------------


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
  exports.Table = _table2.default;
  exports.DetailPageHeader = _detailPageHeader2.default;
  exports.ProfileSwitcher = _profileSwitcher2.default;


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
      _leftNav2.default.init();
      _unifiedHeader2.default.init();
      _inlineLeftNav2.default.init();
      _profileSwitcher2.default.init();
      _searchWithOptions2.default.init();
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