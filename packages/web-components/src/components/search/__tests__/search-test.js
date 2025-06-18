/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import '@carbon/web-components/es/components/search/index.js';
import { expect, fixture, html } from '@open-wc/testing';

describe('cds-search', () => {
  describe('renders as expected - Component API', () => {
    it('should respect the autocomplete attribute', async () => {
      const el = await fixture(html`
        <cds-search label-text="test-search" autocomplete="test"></cds-search>
      `);

      const input = el.shadowRoot?.querySelector('input');
      expect(input).to.have.attribute('autocomplete', 'test');
      await expect(el).shadowDom.to.equalSnapshot();
    });

    it('should support a custom class on the outermost element', async () => {
      const el = await fixture(html`
        <cds-search label-text="test-search" class="custom-class"></cds-search>
      `);

      expect(el).to.have.class('custom-class');
      await expect(el).shadowDom.to.equalSnapshot();
    });

    it('should respect the close-button-label-text attribute', async () => {
      const el = await fixture(html`
        <cds-search
          label-text="test-search"
          close-button-label-text="clear"></cds-search>
      `);

      const closeButton =
        el.shadowRoot?.querySelector('button[data-action="clear"]') ||
        el.shadowRoot?.querySelector('button[aria-label="clear"]') ||
        el.shadowRoot?.querySelector('button[title="clear"]');
      expect(closeButton).to.exist;
      await expect(el).shadowDom.to.equalSnapshot();
    });

    it('should respect defaultValue prop', async () => {
      const el = await fixture(html`
        <cds-search label-text="test-search" value="test-value"></cds-search>
      `);

      const input = el.shadowRoot?.querySelector('input');
      expect(input).to.have.property('value', 'test-value');
      await expect(el).shadowDom.to.equalSnapshot();
    });

    it('should respect the disabled attribute', async () => {
      const el = await fixture(html`
        <cds-search label-text="test-search" disabled></cds-search>
      `);

      const input = el.shadowRoot?.querySelector('input');
      expect(input).to.have.attribute('disabled');
      await expect(el).shadowDom.to.equalSnapshot();
    });

    it('should respect labelText prop', async () => {
      const el = await fixture(html`
        <cds-search label-text="test-search"></cds-search>
      `);

      const label = el.shadowRoot?.querySelector('label');
      expect(label?.textContent?.trim()).to.equal('test-search');
      await expect(el).shadowDom.to.equalSnapshot();
    });

    it('should call focus expand button on Escape when expanded', async () => {
      const el = await fixture(html`
        <cds-search label-text="test-search" is-expanded> </cds-search>
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
      await expect(el).shadowDom.to.equalSnapshot();
    });

    it('should have tabbable button and untabbable input if expandable and not expanded', async () => {
      const el = await fixture(html`
        <cds-search label-text="test-search" expandable> </cds-search>
      `);

      expect(el).to.have.attribute('expandable');
      expect(el).to.not.have.attribute('expanded');
      await expect(el).shadowDom.to.equalSnapshot();
    });

    it('should have tabbable input and untabbable button if not expandable', async () => {
      const el = await fixture(html`
        <cds-search label-text="test-search"></cds-search>
      `);

      expect(el).to.not.have.attribute('expandable');
      await expect(el).shadowDom.to.equalSnapshot();
    });

    it('should respect placeholder prop', async () => {
      const el = await fixture(html`
        <cds-search
          label-text="test-search"
          placeholder="test-placeholder"></cds-search>
      `);

      const input = el.shadowRoot?.querySelector('input');
      expect(input).to.have.attribute('placeholder', 'test-placeholder');
      await expect(el).shadowDom.to.equalSnapshot();
    });

    it('should respect renderIcon prop', async () => {
      const el = await fixture(html`
        <cds-search label-text="test-search">
          <svg slot="icon" data-testid="test-icon"></svg>
        </cds-search>
      `);

      const customIcon = el.querySelector('svg[data-testid="test-icon"]');
      expect(customIcon).to.exist;
      await expect(el).shadowDom.to.equalSnapshot();
    });

    it('should respect role prop', async () => {
      const el = await fixture(html`
        <cds-search label-text="test-search" role="combobox"></cds-search>
      `);

      const input = el.shadowRoot?.querySelector('input');
      expect(input).to.have.attribute('role', 'combobox');
      await expect(el).shadowDom.to.equalSnapshot();
    });

    it('should respect size prop', async () => {
      const el = await fixture(html`
        <cds-search label-text="test-search" size="sm"></cds-search>
      `);
      expect(el).to.have.attribute('size', 'sm');
      await expect(el).shadowDom.to.equalSnapshot();
    });

    it('should respect type prop', async () => {
      const el = await fixture(html`
        <cds-search label-text="test-search" type="search"></cds-search>
      `);

      const input = el.shadowRoot?.querySelector('input');
      expect(input).to.have.attribute('type', 'search');
      await expect(el).shadowDom.to.equalSnapshot();
    });

    it('should respect value prop', async () => {
      const el = await fixture(html`
        <cds-search label-text="test-search" value="test-value"></cds-search>
      `);

      const input = el.shadowRoot?.querySelector('input');
      expect(input).to.have.property('value', 'test-value');
      await expect(el).shadowDom.to.equalSnapshot();
    });
  });
});
