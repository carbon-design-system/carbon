/**
 * Copyright IBM Corp. 2025, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { expect, fixture, html, oneEvent } from '@open-wc/testing';
import '@carbon/web-components/es/components/checkbox/index.js';

describe('cds-checkbox-skeleton', function () {
  it('should render', async () => {
    const skeleton = html`<cds-checkbox-skeleton></cds-checkbox-skeleton>`;
    const el = await fixture(skeleton);
    expect(el).dom.to.equalSnapshot();
  });
});
