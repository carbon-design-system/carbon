/**
 * @license
 *
 * Copyright IBM Corp. 2025, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import '../../../examples/export-modal/src/export-modal';
export default {
  title: 'Patterns/Export',
};

export const BasicModal = {
  render: () => {
    return html` <standard-export-modal> </standard-export-modal> `;
  },
};

export const WithExtension = {
  render: () => {
    return html` <export-modal-with-extension> </export-modal-with-extension> `;
  },
};

export const WithPreformattedExtension = {
  render: () => {
    return html`
      <export-modal-preformatted-extension>
      </export-modal-preformatted-extension>
    `;
  },
};
