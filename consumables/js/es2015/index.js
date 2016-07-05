// ====================//
// Imports and Exports //
// ====================//


// Polyfills
// -------------
import 'svgxuse';

// Base Elements & Components
// -------------
// - JavaScript classes for use with components and base-elements.
// - The following statements import classes from actual locations to
//   be consumed from this file instead of their actual locations.
import FileUploader from './file-uploader';
import FabButton from './fab';
import ContentSwitcher from './content-switcher';
import Tab from './tabs';
import OverflowMenu from './overflow-menu';
import Modal from './modals';
import HeaderNav from './header';
import Toolbars from './toolbars';
import Loading from './loading';
import Dropdown from './dropdown';
import Card from './card';
import NumberInput from './number-input';
import Table from './table';
import ThemeSwitcher from './theme-switcher';

const settings = {};

/**
 * This module is used for the following purposes:
 * 1. Export ES2015 classes as modules (used with base-elements and components)
 * 2. Build an ES5-compatible files for prototyping.
 *    See /path/to/bluemix-components/dist/dist-demo.html for details.
 * @exports BluemixComponents
 * @example <caption>Consume ES2015 modules from this file using import (Usage pattern 1.)</caption>
 * import { Fab, FileUploader } from '/path/to/your/project/node_modules/@console/bluemix-components';
 */
export {
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
  settings,

  /**
   * Floating action button.
   * @type FabButton
   */
  FabButton,

  /**
   * File uploader.
   * @type FileUploader
   */
  FileUploader,

  /**
   * Content switcher.
   * @type ContentSwitcher
   */
  ContentSwitcher,

  /**
   * Container of tabs.
   * @type Tab
   */
  Tab,

  /**
   * Overflow menu.
   * @type OverflowMenu
   */
  OverflowMenu,

  /**
   * Modal dialog.
   * @type Modal
   */
  Modal,

  /**
   * Header with taxonomy menu.
   * @type HeaderNav
   */
  HeaderNav,

  /**
   * Search button in tool bar.
   * @type Toolbars
   */
  Toolbars,

  /**
   * Spinner indicating loading state.
   * @type Loading
   */
  Loading,

  /**
   * A selector with drop downs.
   * @type Dropdown
   */
  Dropdown,

  /**
   * The container for cards.
   * @type Card
   */
  Card,

  /**
   * Number input UI.
   * @type NumberInput
   */
  NumberInput,

  /**
   * Data table.
   * @type Table
   */
  Table,
};

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

const init = () => {
  if (!settings.disableAutoInit) {
    FabButton.init();
    FileUploader.init();
    ContentSwitcher.init();
    Tab.init();
    OverflowMenu.init();
    Modal.init();
    Toolbars.init();
    Loading.init();
    Dropdown.init();
    Card.init();
    NumberInput.init();
    Table.init();
    ThemeSwitcher.init();
  }
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  // DOMContentLoaded has been fired already
  // Let consumer have chance to see if it wants automatic instantiation disabled, and then run automatic instantiation otherwise
  setTimeout(init, 0);
}
