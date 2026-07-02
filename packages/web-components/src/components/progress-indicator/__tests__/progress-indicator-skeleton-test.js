/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license
 * found in the LICENSE file in the root directory of this source tree.
 */

import { expect, fixture, html } from '@open-wc/testing';
import '@carbon/web-components/es/components/progress-indicator/index.js';

describe('cds-progress-indicator-skeleton', () => {
  describe('renders as expected - Component API', () => {
    it('should render correctly with default properties', async () => {
      const el = await fixture(html`
        <cds-progress-indicator-skeleton>
          <cds-progress-step-skeleton></cds-progress-step-skeleton>
          <cds-progress-step-skeleton></cds-progress-step-skeleton>
          <cds-progress-step-skeleton></cds-progress-step-skeleton>
          <cds-progress-step-skeleton></cds-progress-step-skeleton>
        </cds-progress-indicator-skeleton>
      `);

      expect(el).to.exist;
      expect(el).not.to.have.class('cds--progress--vertical');

      const steps = el.querySelectorAll('cds-progress-step-skeleton');
      expect(steps.length).to.equal(4);

      steps.forEach((step) => {
        expect(step).to.have.property('vertical', false);
        const button = step.shadowRoot?.querySelector(
          '.cds--progress-step-button'
        );
        expect(button).to.exist;
      });
    });

    it('should render vertically when vertical attribute is set', async () => {
      const el = await fixture(html`
        <cds-progress-indicator-skeleton vertical>
          <cds-progress-step-skeleton></cds-progress-step-skeleton>
        </cds-progress-indicator-skeleton>
      `);

      expect(el).to.have.attribute('vertical');

      const step = el.querySelector('cds-progress-step-skeleton');
      expect(step.vertical).to.be.true;
    });

    it('should support a custom class on the outermost element', async () => {
      const el = await fixture(html`
        <cds-progress-indicator-skeleton class="custom-class">
          <cds-progress-step-skeleton></cds-progress-step-skeleton>
        </cds-progress-indicator-skeleton>
      `);

      expect(el.classList.contains('custom-class')).to.be.true;
    });
  });
});
