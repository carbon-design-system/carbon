/**
 * @license
 *
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import '@carbon/ibm-products-web-components/es/components/checklist/index.js';

document.addEventListener('DOMContentLoaded', function () {
  const checklist = document.querySelector('c4p-checklist');
  checklist.setAttribute('chart-value', 0.15);

  checklist.addEventListener('c4p-checklist-view-all', function (event) {
    console.log('view all clicked');
  });
  checklist.addEventListener('c4p-checklist-toggle', function (event) {
    console.log('view all clicked');
  });

});
