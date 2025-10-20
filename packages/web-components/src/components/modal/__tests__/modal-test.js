/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { expect, fixture, html } from '@open-wc/testing';
import '@carbon/web-components/es/components/modal/index.js';

const modal = html`
  <cds-modal>
    <cds-modal-header>
      <cds-modal-close-button></cds-modal-close-button>
      <cds-modal-heading>Modal heading</cds-modal-heading>
    </cds-modal-header>
    <cds-modal-body>Modal body</cds-modal-body>
  </cds-modal>
`;

describe('cds-modal', function () {
  it('should render ', async () => {
    const el = await fixture(modal);
    await expect(el);
  });

  it('Should be able to close modal', async () => {
    const el = await fixture(modal);
    const closeButton = el.querySelector('cds-modal-close-button');

    await closeButton.click();
    await expect(el).to.not.be.visible;
  });
});
