/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { css } from 'lit-element';
import BXDropdown from '@carbon/carbon-web-components/es/components/dropdown/dropdown.js';
import '@carbon/carbon-web-components/es/components/dropdown/dropdown-item.js';

class MyDropdown extends BXDropdown {}

// We seem to have hit something similar to: https://github.com/codesandbox/codesandbox-client/issues/1935
// Custom CSS to enforce `field-02` (light) style of the dropdown
MyDropdown.styles = [
  BXDropdown.styles,
  css`
    .bx--list-box {
      background-color: white;
    }
  `,
];

customElements.define('my-dropdown', MyDropdown);
