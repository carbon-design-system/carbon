/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { expect, fixture, html } from '@open-wc/testing';
import '@carbon/web-components/es/components/fluid-form/index.js';

describe('cds-fluid-form', () => {
  describe('renders as expected - Component API', () => {
    it('should render children as expected', async () => {
      const el = await fixture(html`
        <cds-fluid-form>
          <div>Text 1</div>
          <div>Text 2</div>
        </cds-fluid-form>
      `);
      const children = el.querySelectorAll('div');
      expect(children).to.have.lengthOf(2);
      expect(children[0].textContent).to.equal('Text 1');
      expect(children[1].textContent).to.equal('Text 2');
    });

    it('should be a fluid form', async () => {
      const el = await fixture(html`<cds-fluid-form></cds-fluid-form>`);
      const form = el.shadowRoot?.querySelector('form');
      expect(form).to.have.class('cds--form');
      expect(form).to.have.class('cds--form--fluid');
    });

    it('should spread additional attributes on the host element', async () => {
      const el = await fixture(html`
        <cds-fluid-form data-testid="test-id"></cds-fluid-form>
      `);
      expect(el.getAttribute('data-testid')).to.equal('test-id');
    });

    it('should support a custom class on the host element', async () => {
      const el = await fixture(html`
        <cds-fluid-form class="custom-class"></cds-fluid-form>
      `);
      expect(el).to.have.class('custom-class');
    });

    it('should apply `in-modal` attribute when inside a modal-body', async () => {
      const el = await fixture(html`
        <cds-modal-body>
          <cds-fluid-form></cds-fluid-form>
        </cds-modal-body>
      `);
      const fluidForm = el.querySelector('cds-fluid-form');
      expect(fluidForm).to.have.attribute('in-modal');
    });

    it('should not apply `in-modal` attribute when not inside a modal-body', async () => {
      const el = await fixture(html`<cds-fluid-form></cds-fluid-form>`);
      expect(el).to.not.have.attribute('in-modal');
    });
  });
});
