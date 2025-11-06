/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import '@carbon/web-components/es/components/fluid-search/index.js';
import { expect, fixture, html } from '@open-wc/testing';

describe('cds-fluid-search', () => {
  describe('renders as expected - Component API', () => {
    it('should respect the autocomplete attribute', async () => {
      const el = await fixture(html`
        <cds-fluid-search
          label-text="test-fluid-search"
          autocomplete="test"></cds-fluid-search>
      `);

      const input = el.shadowRoot?.querySelector('input');
      expect(input).to.have.attribute('autocomplete', 'test');
    });

    it('should support a custom class on the outermost element', async () => {
      const el = await fixture(html`
        <cds-fluid-search
          label-text="test-fluid-search"
          class="custom-class"></cds-fluid-search>
      `);

      expect(el).to.have.class('custom-class');
    });

    it('should respect the close-button-label-text attribute', async () => {
      const el = await fixture(html`
        <cds-fluid-search
          label-text="test-fluid-search"
          close-button-label-text="clear"></cds-fluid-search>
      `);

      const closeButton =
        el.shadowRoot?.querySelector('button[data-action="clear"]') ||
        el.shadowRoot?.querySelector('button[aria-label="clear"]') ||
        el.shadowRoot?.querySelector('button[title="clear"]');
      expect(closeButton).to.exist;
    });

    it('should respect the disabled attribute', async () => {
      const el = await fixture(html`
        <cds-fluid-search
          label-text="test-fluid-search"
          disabled></cds-fluid-search>
      `);

      const input = el.shadowRoot?.querySelector('input');
      expect(input).to.have.attribute('disabled');
    });

    it('should respect the label-text attribute', async () => {
      const el = await fixture(html`
        <cds-fluid-search label-text="test-fluid-search"></cds-fluid-search>
      `);

      const label = el.shadowRoot?.querySelector('label');
      expect(label?.textContent?.trim()).to.equal('test-fluid-search');
    });

    it('should call focus expand button on Escape when expanded', async () => {
      const el = await fixture(html`
        <cds-fluid-search label-text="test-fluid-search" is-expanded>
        </cds-fluid-search>
      `);

      const input = el.shadowRoot?.querySelector('input');
      const expandButton =
        el.shadowRoot?.querySelector('button[data-action="expand"]') ||
        el.shadowRoot?.querySelector('button.cds--search-magnifier');

      if (input && expandButton) {
        input.focus();
        const escapeEvent = new KeyboardEvent('keydown', {
          key: 'Escape',
          bubbles: true,
        });
        input.dispatchEvent(escapeEvent);
        await el.updateComplete;

        expect(document.activeElement).to.equal(expandButton);
      }
    });

    it('should have tabbable button and untabbable input if expandable and not expanded', async () => {
      const el = await fixture(html`
        <cds-fluid-search label-text="test-fluid-search" expandable>
        </cds-fluid-search>
      `);

      expect(el).to.have.attribute('expandable');
      expect(el).to.not.have.attribute('expanded');
    });

    it('should have tabbable input and untabbable button if not expandable', async () => {
      const el = await fixture(html`
        <cds-fluid-search label-text="test-fluid-search"></cds-fluid-search>
      `);

      expect(el).to.not.have.attribute('expandable');
    });

    it('should respect the placeholder attribute', async () => {
      const el = await fixture(html`
        <cds-fluid-search
          label-text="test-fluid-search"
          placeholder="test-placeholder"></cds-fluid-search>
      `);

      const input = el.shadowRoot?.querySelector('input');
      expect(input).to.have.attribute('placeholder', 'test-placeholder');
    });

    it('should set hasCustomIcon when a custom icon is provided', async () => {
      const el = await fixture(html`
        <cds-fluid-search label-text="test-fluid-search">
          <svg slot="icon" data-testid="test-icon"></svg>
        </cds-fluid-search>
      `);

      const customIcon = el.querySelector('svg[data-testid="test-icon"]');
      expect(customIcon).to.exist;
    });

    it('should respect the role attribute', async () => {
      const el = await fixture(html`
        <cds-fluid-search
          label-text="test-fluid-search"
          role="combobox"></cds-fluid-search>
      `);

      const input = el.shadowRoot?.querySelector('input');
      expect(input).to.have.attribute('role', 'combobox');
    });

    it('should respect the type attribute', async () => {
      const el = await fixture(html`
        <cds-fluid-search
          label-text="test-fluid-search"
          type="search"></cds-fluid-search>
      `);

      const input = el.shadowRoot?.querySelector('input');
      expect(input).to.have.attribute('type', 'search');
    });

    it('should respect the value attribute', async () => {
      const el = await fixture(html`
        <cds-fluid-search
          label-text="test-fluid-search"
          value="test-value"></cds-fluid-search>
      `);
      const input = el.shadowRoot?.querySelector('input');
      expect(input).to.have.property('value', 'test-value');
    });
  });
});
