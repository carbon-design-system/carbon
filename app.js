import 'svgxuse';
import './global/js/array-from';

import FabButton from './components/floating-action-button/fab';
import FileUploader from './base-elements/inputs/file/file';
import Tab from './components/tabs-nav/tabs-nav';
import OverflowMenu from './components/overflow-menu/overflow-menu';
import Modal from './components/modals/modals';
import HeaderNav from './components/header/header';
import Toolbars from './components/toolbars/toolbars';

document.addEventListener('DOMContentLoaded', () => {
  [... document.querySelectorAll('[data-floating-action-button]')].forEach((element) => new FabButton(element));
  [... document.querySelectorAll('[data-file-input]')].forEach((element) => new FileUploader(element));
  [... document.querySelectorAll('[data-tabs]')].forEach((element) => new Tab(element));
  [... document.querySelectorAll('[data-overflow-menu]')].forEach((element) => new OverflowMenu(element));
  [... document.querySelectorAll('[data-modal]')].forEach((element) => new Modal(element));
  [... document.querySelectorAll('[data-modal-target].buttons__transactional, [data-modal-target].buttons__passive, [data-modal-target].buttons__inputs')].forEach((element) => Modal.hook(element));
  [... document.querySelectorAll('[data-nav-target]')].forEach((element) => {
    [... document.querySelectorAll(element.getAttribute('data-nav-target'))].forEach((target) => {
      target.addEventListener('header-beingselected', (e) => {
        // In demo, don't follow the link in nav
        e.detail.initiatingEvent.preventDefault();
      });
    });
    HeaderNav.hook(element);
  });
  [... document.querySelectorAll('[data-list-icons-search-action-target]')].forEach((element) => new Toolbars(element));
});
