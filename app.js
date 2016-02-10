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
  [... document.querySelectorAll('[data-modal-target]')].forEach((element) => Modal.hook(element));
  [... document.querySelectorAll('[data-nav-target]')].forEach((element) => {
    [... document.querySelectorAll(element.getAttribute('data-nav-target'))].forEach((target) => {
      target.addEventListener('header-beingselected', (event) => {
        // In demo, don't follow the link in nav
        event.detail.initiatingEvent.preventDefault();
      });
    });
    HeaderNav.hook(element);
  });
  [... document.querySelectorAll('[data-list-icons-search-action-target]')].forEach((element) => new Toolbars(element));

  // // Where should this example code go?
  // // example of how to hook into Modal for a 'transactional' effect
  // const transactionalModal = Modal.getTarget('transactional-modal');
  // transactionalModal.options.canClose = false;
  //
  // transactionalModal.element.addEventListener('modal-beinghidden', (event) => {
  //   if (!transactionalModal.options.canClose) {
  //     event.preventDefault(); //this stops the event
  //     console.log('Nope! Overriding hide event. Hit save to close.');
  //   }
  // });
  //
  // transactionalModal.element.querySelector('.buttons__save').addEventListener('click', () => {
  //   transactionalModal.options.canClose = true;
  //   transactionalModal.hide();
  //   transactionalModal.options.canClose = false;
  // });
  // // ----- transactional modal example
});
