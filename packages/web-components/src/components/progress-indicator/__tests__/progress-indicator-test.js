/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license
 * found in the LICENSE file in the root directory of this source tree.
 */

import { expect, fixture, html, oneEvent } from '@open-wc/testing';
import '@carbon/web-components/es/components/progress-indicator/index.js';

describe('cds-progress-indicator', () => {
  describe('renders as expected - Component API', () => {
    it('should spread extra attributes onto the outermost element', async () => {
      const el = await fixture(html`
        <cds-progress-indicator data-testid="test-id">
          <cds-progress-step label="First step"></cds-progress-step>
        </cds-progress-indicator>
      `);

      expect(el).to.have.attribute('data-testid', 'test-id');
      expect(el).to.have.attribute('role', 'list');
    });

    it('should support a custom class on the outermost element', async () => {
      const el = await fixture(html`
        <cds-progress-indicator class="custom-class">
          <cds-progress-step label="First step"></cds-progress-step>
        </cds-progress-indicator>
      `);

      expect(el.classList.contains('custom-class')).to.be.true;
    });

    it('should respect the current-index attribute', async () => {
      const el = await fixture(html`
        <cds-progress-indicator current-index="0">
          <cds-progress-step label="Step one"></cds-progress-step>
          <cds-progress-step label="Step two"></cds-progress-step>
        </cds-progress-indicator>
      `);

      const steps = el.querySelectorAll('cds-progress-step');
      expect(steps[0].current).to.be.true;
      expect(steps[1].current).to.be.false;
    });

    it('should fire change event when a step is clicked', async () => {
      const el = await fixture(html`
        <cds-progress-indicator current-index="1">
          <cds-progress-step label="Step one"></cds-progress-step>
          <cds-progress-step label="Step two"></cds-progress-step>
        </cds-progress-indicator>
      `);

      el.onChange = () => {};
      await el.updateComplete;

      const firstStep = el.querySelector('cds-progress-step');
      const button = firstStep.shadowRoot.querySelector('[role="button"]');

      const changeEvt = oneEvent(el, 'change');
      button.click();
      const { detail } = await changeEvt;

      expect(detail.index).to.equal(0);
    });

    it('should respect the space-equally attribute', async () => {
      const el = await fixture(html`
        <cds-progress-indicator space-equally>
          <cds-progress-step label="Step one"></cds-progress-step>
          <cds-progress-step label="Step two"></cds-progress-step>
        </cds-progress-indicator>
      `);

      expect(el).to.have.attribute('space-equally');
    });

    it('should respect the vertical attribute', async () => {
      const el = await fixture(html`
        <cds-progress-indicator vertical>
          <cds-progress-step label="Step one"></cds-progress-step>
          <cds-progress-step label="Step two"></cds-progress-step>
        </cds-progress-indicator>
      `);

      expect(el).to.have.attribute('vertical');
    });
  });
});

describe('cds-progress-step', () => {
  describe('renders as expected - Component API', () => {
    it('should spread extra attributes onto the outermost element', async () => {
      const el = await fixture(html`
        <cds-progress-step label="First step" data-testid="test-id">
        </cds-progress-step>
      `);

      expect(el).to.have.attribute('data-testid', 'test-id');
      expect(el).to.have.attribute('role', 'listitem');
    });

    it('should support a custom class on the outermost element', async () => {
      const el = await fixture(html`
        <cds-progress-step label="First step" class="custom-class">
        </cds-progress-step>
      `);

      expect(el.classList.contains('custom-class')).to.be.true;
    });

    it('should respect the complete attribute', async () => {
      const el = await fixture(html`
        <cds-progress-step label="First step" complete> </cds-progress-step>
      `);

      expect(el.complete).to.be.true;
    });

    it('should respect the current attribute', async () => {
      const el = await fixture(html`
        <cds-progress-step label="First step" current> </cds-progress-step>
      `);

      expect(el.current).to.be.true;
    });

    it('should respect the disabled attribute', async () => {
      const el = await fixture(html`
        <cds-progress-step label="First step" disabled> </cds-progress-step>
      `);

      expect(el.disabled).to.be.true;
      const button = el.shadowRoot.querySelector('[role="button"]');
      expect(button.getAttribute('aria-disabled')).to.equal('true');
    });

    it('should respect the invalid attribute', async () => {
      const el = await fixture(html`
        <cds-progress-step label="First step" invalid> </cds-progress-step>
      `);

      expect(el.invalid).to.be.true;
    });

    it('should respect the secondary-label attribute', async () => {
      const el = await fixture(html`
        <cds-progress-step label="First step" secondary-label="Optional label">
        </cds-progress-step>
      `);

      const text = el.shadowRoot.textContent;
      expect(text).to.contain('Optional label');
    });

    it('should emit click event when interactive', async () => {
      const el = await fixture(html`
        <cds-progress-step label="Clickable step"> </cds-progress-step>
      `);

      el.clickable = true;
      const button = el.shadowRoot.querySelector('[role="button"]');

      const listener = oneEvent(el, 'cds-progress-step-click');
      button.click();
      const evt = await listener;

      expect(evt).to.exist;
    });
  });
});
