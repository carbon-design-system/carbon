/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import '@carbon/web-components/es/components/chat-button/chat-button-skeleton.js';
import { expect, fixture, html } from '@open-wc/testing';

describe('cds-chat-button-skeleton', () => {
  describe('supports size', () => {
    const sizes = ['sm', 'md', 'lg'];

    sizes.forEach((size) => {
      it(`size="${size}"`, async () => {
        const el = await fixture(html`
          <cds-chat-button-skeleton size="${size}"></cds-chat-button-skeleton>
        `);
        const skeleton = el.shadowRoot.querySelector('.cds--chat-btn');

        expect(skeleton).to.have.class(`cds--layout--size-${size}`);
      });
    });
  });

  it('should use lg as the default size', async () => {
    const el = await fixture(html`
      <cds-chat-button-skeleton></cds-chat-button-skeleton>
    `);
    const skeleton = el.shadowRoot.querySelector('.cds--chat-btn');

    expect(skeleton).to.have.class('cds--layout--size-lg');
  });

  it('should support a custom class on the host', async () => {
    const el = await fixture(html`
      <cds-chat-button-skeleton class="custom-class"></cds-chat-button-skeleton>
    `);

    expect(el).to.have.class('custom-class');
  });

  it('should forward additional attributes to the host', async () => {
    const el = await fixture(html`
      <cds-chat-button-skeleton
        data-testid="test-id"></cds-chat-button-skeleton>
    `);

    expect(el).to.have.attribute('data-testid', 'test-id');
  });

  it('should be accessible', async () => {
    const el = await fixture(html`
      <cds-chat-button-skeleton></cds-chat-button-skeleton>
    `);

    await expect(el).to.be.accessible();
  });
});
