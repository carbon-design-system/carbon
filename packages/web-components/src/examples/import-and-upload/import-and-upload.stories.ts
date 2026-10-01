/**
 * @license
 *
 * Copyright IBM Corp. 2025, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import './example/src/import-modal';
import type { FileType } from './example/src/import-modal';

export default {
  title: 'Examples/Import and Upload',
};

export const importModal = {
  render: () => {
    return html`
      <import-modal
        @cds-modal-closed=${() => {}}
        @request-submit=${(e: CustomEvent<FileType[]>) => {
          void (e.detail satisfies FileType[]);
        }}
      >
      </import-modal>
    `;
  },
};
