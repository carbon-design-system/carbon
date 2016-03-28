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
import FabButton from '../components/fab/fab';
import FileUploader from '../base-elements/inputs/file/file';
import Tab from '../components/tabs-nav/tabs-nav';
import OverflowMenu from '../components/overflow-menu/overflow-menu';
import Modal from '../components/modals/modals';
import HeaderNav from '../components/header/header';
import Toolbars from '../components/toolbars/toolbars';
import Spinner from '../components/spinner/spinner';

// Export all vars/classes for consumption:
export {
  FabButton,
  FileUploader,
  Tab,
  OverflowMenu,
  Modal,
  HeaderNav,
  Toolbars,
  Spinner,
};

// ES5 only: Listen for DOMContentLoaded event and initialize all classes
document.addEventListener('DOMContentLoaded', () => {
  FabButton.init();
  FileUploader.init();
  Tab.init();
  OverflowMenu.init();
  Modal.init();
  HeaderNav.init();
  Toolbars.init();
  Spinner.init();
});
