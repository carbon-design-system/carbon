/**
 * @license
 *
 * Copyright IBM Corp. 2025, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import '../../../examples/import-modal/src/import-modal';
import { FileType } from '../../../examples/import-modal/src/import-modal';

export default {
  title: 'Patterns/ImportModal',
};

export const importModal = {
  render: (args) => {
    return html`
      <import-modal
        @cds-modal-closed=${() => {
          console.log('onClose');
        }}
        @request-submit=${(e: CustomEvent<FileType[]>) => {
          console.log('Submitting files:', e.detail);
        }}
      >
      </import-modal>
    `;
  },
};
