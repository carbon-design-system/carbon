import '../../../../js/array-from';

import Tab from '../../../../components/tabs-nav/tabs-nav';

document.addEventListener('DOMContentLoaded', () => {
  [... document.querySelectorAll('[data-tabs]')].forEach((element) => new Tab(element));
  [... document.querySelectorAll('[data-tabs] .item__link')].forEach((element) => {
    // In demo, don't follow links in tab
    element.addEventListener('click', (event) => {
      event.preventDefault();
    });
  });
});
