import 'svgxuse';
import '../../../../global/js/array-from';

import FileUploader from '../../../../base-elements/inputs/file/file';
import Tab from '../../../../components/tabs-nav/tabs-nav';
import HeaderNav from '../../../../components/header/header';

document.addEventListener('DOMContentLoaded', () => {
  [... document.querySelectorAll('[data-file-input]')]
    .forEach((element) => new FileUploader(element));
  [... document.querySelectorAll('[data-tabs]')].forEach((element) => new Tab(element));
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
