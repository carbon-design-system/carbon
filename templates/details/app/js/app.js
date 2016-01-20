import '../../../../global/js/array-from';

import Tab from '../../../../components/tabs-nav/tabs-nav';

document.addEventListener('DOMContentLoaded', () => {
  [... document.querySelectorAll('[data-tabs]')].forEach((element) => new Tab(element));
});
