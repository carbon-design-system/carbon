/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { expect, fixture, html } from '@open-wc/testing';
import '@carbon/web-components/es/components/form/index.js';

describe('cds-form', function () {
  it('should render a form element with the Carbon form class', async () => {
    const el = await fixture(html`<cds-form></cds-form>`);
    const form = el.shadowRoot.querySelector('form');

    expect(form).to.exist;
    expect(form.classList.contains('cds--form')).to.be.true;
  });

  it('should project slotted content and keep it queryable from the host', async () => {
    const el = await fixture(html`
      <cds-form>
        <div data-testid="field">Field</div>
        <label for="i">Label</label>
        <input id="i" type="text" />
      </cds-form>
    `);

    const slot = el.shadowRoot.querySelector('slot');
    const assigned = slot.assignedNodes({ flatten: true });
    const field = assigned.find(
      (node) =>
        node.nodeType === Node.ELEMENT_NODE &&
        node.matches('[data-testid="field"]')
    );

    expect(field).to.exist;
    expect(field.textContent.trim()).to.equal('Field');
    expect(el.querySelector('label[for="i"]')).to.exist;
    expect(el.querySelector('input#i')).to.exist;
  });

  it('should render with no slotted children', async () => {
    const el = await fixture(html`<cds-form></cds-form>`);
    const slot = el.shadowRoot.querySelector('slot');
    const assigned = slot.assignedNodes({ flatten: true }).filter(
      (node) => node.nodeType === Node.ELEMENT_NODE
    );

    expect(assigned.length).to.equal(0);
    expect(el.shadowRoot.querySelector('form')).to.exist;
  });

  it('should preserve a class on the host element', async () => {
    const el = await fixture(html`
      <cds-form class="custom-form-class">
        <span>Content</span>
      </cds-form>
    `);

    expect(el.classList.contains('custom-form-class')).to.be.true;
  });

  describe('automated verification testing', () => {
    it('should have no Axe violations', async () => {
      const el = await fixture(html`
        <cds-form>
          <label for="a11y-input">Name</label>
          <input id="a11y-input" type="text" />
        </cds-form>
      `);
      await expect(el).to.be.accessible();
    });
  });
});
