(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', './checkbox', './file-uploader', './fab', './content-switcher', './tabs', './overflow-menu', './modals', './header', './toolbars', './loading', './dropdown', './card', './number-input', './responsive-table', './table', './detail-page-header', './left-nav', './inline-left-nav', './profile-switcher', './pagination', './search-with-options', './accordion', './copy-btn'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('./checkbox'), require('./file-uploader'), require('./fab'), require('./content-switcher'), require('./tabs'), require('./overflow-menu'), require('./modals'), require('./header'), require('./toolbars'), require('./loading'), require('./dropdown'), require('./card'), require('./number-input'), require('./responsive-table'), require('./table'), require('./detail-page-header'), require('./left-nav'), require('./inline-left-nav'), require('./profile-switcher'), require('./pagination'), require('./search-with-options'), require('./accordion'), require('./copy-btn'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.checkbox, global.fileUploader, global.fab, global.contentSwitcher, global.tabs, global.overflowMenu, global.modals, global.header, global.toolbars, global.loading, global.dropdown, global.card, global.numberInput, global.responsiveTable, global.table, global.detailPageHeader, global.leftNav, global.inlineLeftNav, global.profileSwitcher, global.pagination, global.searchWithOptions, global.accordion, global.copyBtn);
    global.index = mod.exports;
  }
})(this, function (exports, _checkbox, _fileUploader, _fab, _contentSwitcher, _tabs, _overflowMenu, _modals, _header, _toolbars, _loading, _dropdown, _card, _numberInput, _responsiveTable, _table, _detailPageHeader, _leftNav, _inlineLeftNav, _profileSwitcher, _pagination, _searchWithOptions, _accordion, _copyBtn) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.InlineLeftNav = exports.Accordion = exports.Pagination = exports.ProfileSwitcher = exports.DetailPageHeader = exports.Table = exports.ResponsiveTable = exports.NumberInput = exports.Card = exports.Dropdown = exports.Loading = exports.Toolbars = exports.LeftNav = exports.HeaderNav = exports.Modal = exports.OverflowMenu = exports.Tab = exports.ContentSwitcher = exports.FileUploader = exports.FabButton = exports.initCheckbox = exports.settings = undefined;

  var _checkbox2 = _interopRequireDefault(_checkbox);

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

  var _responsiveTable2 = _interopRequireDefault(_responsiveTable);

  var _table2 = _interopRequireDefault(_table);

  var _detailPageHeader2 = _interopRequireDefault(_detailPageHeader);

  var _leftNav2 = _interopRequireDefault(_leftNav);

  var _inlineLeftNav2 = _interopRequireDefault(_inlineLeftNav);

  var _profileSwitcher2 = _interopRequireDefault(_profileSwitcher);

  var _pagination2 = _interopRequireDefault(_pagination);

  var _searchWithOptions2 = _interopRequireDefault(_searchWithOptions);

  var _accordion2 = _interopRequireDefault(_accordion);

  var _copyBtn2 = _interopRequireDefault(_copyBtn);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

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
});