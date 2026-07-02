/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { expect, fixture, html } from '@open-wc/testing';
import '@carbon/web-components/es/components/code-snippet/index.js';

const snippetTypes = ['single', 'multi'];

describe('cds-code-snippet-skeleton', function () {
  it('should render', async () => {
    const el = await fixture(html`
      <cds-code-snippet-skeleton></cds-code-snippet-skeleton>
    `);
    await expect(el).dom.to.exist;
  });

  describe('automated accessibility testing', () => {
    snippetTypes.forEach((type) => {
      it(`should have no Axe violations with type="${type}"`, async () => {
        const el = await fixture(html`
          <cds-code-snippet-skeleton type="${type}"></cds-code-snippet-skeleton>
        `);
        await expect(el).to.be.accessible();
      });
    });
  });

  it('should default to type="single"', async () => {
    const el = await fixture(html`
      <cds-code-snippet-skeleton
        data-testid="single type"></cds-code-snippet-skeleton>
    `);

    expect(el.type).to.equal('single');
  });

  it('should support a custom class on the outer-most element', async () => {
    const el = await fixture(html`
      <cds-code-snippet-skeleton class="test"></cds-code-snippet-skeleton>
    `);

    expect(el.classList.contains('test')).to.be.true;
  });
});
