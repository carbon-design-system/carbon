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


  // Base Elements & Components
  // -------------
  // - JavaScript classes for use with components and base-elements.
  // - The following statements import classes from actual locations to
  //   be consumed from this file instead of their actual locations.
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