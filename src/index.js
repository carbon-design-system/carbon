// ====================//
// Imports and Exports //
// ====================//

// Base Elements & Components
// -------------
// - JavaScript classes for use with components and base-elements.
// - The following statements import classes from actual locations to
//   be consumed from this file instead of their actual locations.
import initCheckbox from './components/checkbox/checkbox';
import FileUploader from './components/file-uploader/file-uploader';
import FabButton from './components/fab/fab';
import ContentSwitcher from './components/content-switcher/content-switcher';
import Tab from './components/tabs/tabs';
import OverflowMenu from './components/overflow-menu/overflow-menu';
import Modal from './components/modal/modal';
import Loading from './components/loading/loading';
import Dropdown from './components/dropdown/dropdown';
import Card from './components/card/card';
import NumberInput from './components/number-input/number-input';
import DataTable from './components/data-table/data-table';
import DataTableV2 from './components/data-table-v2/data-table-v2';
import DatePicker from './components/date-picker/date-picker';
import DetailPageHeader from './components/detail-page-header/detail-page-header';
import LeftNav from './components/unified-header/left-nav';
import InteriorLeftNav from './components/interior-left-nav/interior-left-nav';
import ProfileSwitcher from './components/unified-header/profile-switcher';
import Pagination from './components/pagination/pagination';
import Search from './components/search/search';
import Accordion from './components/accordion/accordion';
import CopyButton from './components/copy-button/copy-button';
import Notification from './components/notification/notification';
import Toolbar from './components/toolbar/toolbar';
import Tooltip from './components/tooltip/tooltip';
import ProgressIndicator from './components/progress-indicator/progress-indicator';
import FloatingMenu from './components/floating-menu/floating-menu';
import StructuredList from './components/structured-list/structured-list';
import Slider from './components/slider/slider';
import Tile from './components/tile/tile';
import Carousel from './components/carousel/carousel';
import Lightbox from './components/lightbox/lightbox';

export { default as watch } from './globals/js/watch';

const settings = {};

/**
 * This module is used for the following purposes:
 * 1. Export ES2015 classes as modules (used with base-elements and components)
 * 2. Build an ES5-compatible files for prototyping.
 *    See /path/to/bluemix-components/dist/dist-demo.html for details.
 * @exports CarbomComponents
 * @example <caption>Consume ES2015 modules from this file using import (Usage pattern 1.)</caption>
 * import { Fab, FileUploader } from '/path/to/your/project/node_modules/@console/bluemix-components';
 */
export {
  /**
   * Settings.
   * @type Object
   * @property {boolean} [disableAutoInit]
   *   Disables automatic instantiation of components.
   *   By default (`CarbonComponents.disableAutoInit` is `false`),
   *   bluemix-components attempts to instantiate components automatically
   *   by searching for elements with `data-component-name` (e.g. `data-loading`) attribute
   *   or upon DOM events (e.g. clicking) on such elements.
   *   See each components' static `.init()` methods for details.
   */
  settings,
  /**
   * Watches for change in checkbox in the given document and force changing `checked` attribute
   * so that DOM mutation observer in {@link https://www.npmjs.com/package/svgxuse svgxuse} is triggered.
   * @type initCheckbox
   */
  initCheckbox,
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
   * Left Navigation Menu
   * @type LeftNav
   */
  LeftNav,
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
   *  DataTable
   *  @type DataTable
   */
  DataTable,
  /**
   *  DataTableV2
   *  @type DataTableV2
   */
  DataTableV2,
  /**
   * Detail page header.
   * @type DetailPageHeader
   */
  DetailPageHeader,
  /**
   * Search.
   * @type Search
   */
  Search,
  /**
   * Profile Switcher.
   * @type ProfileSwitcher
   */
  ProfileSwitcher,
  /**
   * Pagination.
   * @type Pagination
   */
  Pagination,
  /**
   * Accordion.
   * @type Accordion
   */
  Accordion,
  /**
   * Inline Left Navigation Menu.
   * @type InteriorLeftNav
   */
  InteriorLeftNav,
  /**
   * Notification.
   * @type InteriorLeftNav
   */
  Notification,
  /**
   * Toolbar.
   * @type Toolbar
   */
  Toolbar,
  /**
   * Tooltip.
   * @type Tooltip
   */
  Tooltip,
  /** ProgressIndicator.
   * @type InteriorLeftNav
   */
  ProgressIndicator,
  /**
   * Floating menu.
   * @type FloatingMenu
   */
  FloatingMenu,
  /**
   * CopyButton.
   * @type CopyButton
   */
  CopyButton,
  /**
   * StructuredList.
   * @type StructuredList
   */
  StructuredList,
  /**
   * DatePicker.
   * @type DatePicker
   */
  DatePicker,
  /**
   * Slider.
   * @type Slider
   */
  Slider,
  /**
   * Tile.
   * @type Tile
   */
  Tile,
  /**
   * Carousel.
   * @type Carousel
   */
  Carousel,
  /**
   * Lightbox.
   * @type Lightbox
   */
  Lightbox,
};

/**
 * List of component classes to be auto-instantiated.
 * @private
 */
export const componentClasses = [
  FabButton,
  FileUploader,
  ContentSwitcher,
  Tab,
  OverflowMenu,
  Modal,
  Loading,
  Dropdown,
  Card,
  NumberInput,
  DataTable,
  DataTableV2,
  DetailPageHeader,
  LeftNav,
  InteriorLeftNav,
  ProfileSwitcher,
  Pagination,
  Search,
  Accordion,
  CopyButton,
  Notification,
  Toolbar,
  Tooltip,
  ProgressIndicator,
  StructuredList,
  DatePicker,
  Slider,
  Tile,
  Carousel,
  Lightbox,
  // Floating menu instances are created by Tooltip, etc. and thus not for automatic instantiation
];

/**
 * Instantiates components automatically
 * by searching for elements with `data-component-name` (e.g. `data-loading`) attribute
 * or upon DOM events (e.g. clicking) on such elements.
 * See each components' static `.init()` methods for details.
 * @private
 */
const init = () => {
  if (!settings.disableAutoInit) {
    initCheckbox();
    componentClasses.forEach(Clz => {
      Clz.init();
    });
  }
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  // DOMContentLoaded has been fired already
  // Let consumer have chance to see if it wants automatic instantiation disabled, and then run automatic instantiation otherwise
  setTimeout(init, 0);
}
