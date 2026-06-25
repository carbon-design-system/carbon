/**
 * @license
 *
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import '@carbon/ibm-products-web-components/es/components/about-modal/index';
import '@carbon/web-components/es/components/link/index.js';
// The following are used for slotted fields
const toggleButton = document.getElementById('toggle-button');
toggleButton.addEventListener('click', function () {
  document.querySelector(`c4p-about-modal`)?.toggleAttribute('open');
});
