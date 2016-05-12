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

const settings = {};

// Export all vars/classes for consumption:
export {
  settings,
  FabButton,
  FileUploader,
  ContentSwitcher,
  Tab,
  OverflowMenu,
  Modal,
  HeaderNav,
  Toolbars,
  Loading,
  Dropdown,
  Card,
  NumberInput,
  Table,
};

const init = () => {
  if (!settings.disableAutoInit) {
    FabButton.init();
    FileUploader.init();
    ContentSwitcher.init();
    Tab.init();
    OverflowMenu.init();
    Modal.init();
    HeaderNav.init();
    Toolbars.init();
    Loading.init();
    Dropdown.init();
    Card.init();
    NumberInput.init();
    Table.init();
  }
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  // DOMContentLoaded has been fired already
  // Let consumer have chance to see if it wants automatic instantiation disabled, and then run automatic instantiation otherwise
  setTimeout(init, 0);
}
