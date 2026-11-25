/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import '@carbon/web-components/es/components/button/index.js';
import '@carbon/web-components/es/components/stack/index.js';
import { expect, fixture, html } from '@open-wc/testing';

describe('cds-stack', () => {
  it('does not stretch nested buttons in a vertical stack', async () => {
    const el = await fixture(html`
      <cds-stack gap="6" style="inline-size: 400px;">
        <cds-button>Button</cds-button>
      </cds-stack>
    `);
    const button = el.querySelector('cds-button');

    expect(button.getBoundingClientRect().width).to.be.lessThan(
      el.getBoundingClientRect().width
    );
  });
});
