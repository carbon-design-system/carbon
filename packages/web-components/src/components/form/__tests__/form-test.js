/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { expect, fixture, html } from '@open-wc/testing';
import '@carbon/web-components/es/components/form/index.js';

describe('cds-form', function () {
  describe('renders as expected', () => {
    it('should render children as expected', async () => {
      const el = await fixture(html`
        <cds-form>
          <div data-testid="field">Field</div>
        </cds-form>
      `);
      const form = el.shadowRoot.querySelector('form');
      const slot = el.shadowRoot.querySelector('slot');

      expect(form).to.exist;
      expect(form).to.have.class('cds--form');
      expect(slot.assignedElements()).to.have.lengthOf(1);
      expect(el.querySelector('[data-testid="field"]')).to.exist;
    });

    it('should support a custom class on the outermost element', async () => {
      const el = await fixture(html`<cds-form class="test"></cds-form>`);

      expect(el).to.have.class('test');
    });

    it('should spread extra props onto outermost element', async () => {
      const el = await fixture(html`
        <cds-form data-testid="test"></cds-form>
      `);

      expect(el).to.have.attribute('data-testid', 'test');
    });

    it('should render a form element with the Carbon form class', async () => {
      const el = await fixture(html`<cds-form></cds-form>`);
      const form = el.shadowRoot.querySelector('form');
      const slot = el.shadowRoot.querySelector('slot');

      expect(form).to.exist;
      expect(form).to.have.class('cds--form');
      expect(slot).to.exist;
    });

    it('should render a slot inside the form element for projected content', async () => {
      const el = await fixture(html`
        <cds-form>
          <input id="name" type="text" />
        </cds-form>
      `);
      const form = el.shadowRoot.querySelector('form');
      const slot = el.shadowRoot.querySelector('slot');

      expect(form.contains(slot)).to.be.true;
      expect(slot.assignedElements()[0]).to.equal(el.querySelector('#name'));
    });
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
