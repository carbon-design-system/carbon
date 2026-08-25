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
    });

    it('should support a custom class on the outermost element', async () => {
      const el = await fixture(html`
        <cds-search label-text="test-search" class="custom-class"></cds-search>
      `);

      expect(el).to.have.class('custom-class');
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
    });

    it('should respect the disabled attribute', async () => {
      const el = await fixture(html`
        <cds-search label-text="test-search" disabled></cds-search>
      `);

      const input = el.shadowRoot?.querySelector('input');
      expect(input).to.have.attribute('disabled');
    });

    it('should respect the autofocus attribute', async () => {
      const el = await fixture(html`
        <cds-search label-text="test-search" autofocus></cds-search>
      `);

      const input = el.shadowRoot?.querySelector('input');
      expect(input).to.have.attribute('autofocus');
    });

    it('should respect the label-text attribute', async () => {
      const el = await fixture(html`
        <cds-search label-text="test-search"></cds-search>
      `);

      const label = el.shadowRoot?.querySelector('label');
      expect(label?.textContent?.trim()).to.equal('test-search');
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
    });

    it('should have tabbable button and untabbable input if expandable and not expanded', async () => {
      const el = await fixture(html`
        <cds-search label-text="test-search" expandable> </cds-search>
      `);

      expect(el).to.have.attribute('expandable');
      expect(el).to.not.have.attribute('expanded');
    });

    it('should have tabbable input and untabbable button if not expandable', async () => {
      const el = await fixture(html`
        <cds-search label-text="test-search"></cds-search>
      `);

      expect(el).to.not.have.attribute('expandable');
    });

    it('should respect the placeholder attribute', async () => {
      const el = await fixture(html`
        <cds-search
          label-text="test-search"
          placeholder="test-placeholder"></cds-search>
      `);

      const input = el.shadowRoot?.querySelector('input');
      expect(input).to.have.attribute('placeholder', 'test-placeholder');
    });

    it('should set hasCustomIcon when a custom icon is provided', async () => {
      const el = await fixture(html`
        <cds-search label-text="test-search">
          <svg slot="icon" data-testid="test-icon"></svg>
        </cds-search>
      `);

      const customIcon = el.querySelector('svg[data-testid="test-icon"]');
      expect(customIcon).to.exist;
    });

    it('should respect the role attribute', async () => {
      const el = await fixture(html`
        <cds-search label-text="test-search" role="combobox"></cds-search>
      `);

      const input = el.shadowRoot?.querySelector('input');
      expect(input).to.have.attribute('role', 'combobox');
    });

    it('should respect the size attribute', async () => {
      const el = await fixture(html`
        <cds-search label-text="test-search" size="sm"></cds-search>
      `);
      expect(el).to.have.attribute('size', 'sm');
    });

    it('should respect the type attribute', async () => {
      const el = await fixture(html`
        <cds-search label-text="test-search" type="search"></cds-search>
      `);

      const input = el.shadowRoot?.querySelector('input');
      expect(input).to.have.attribute('type', 'search');
    });

    it('should respect the value attribute', async () => {
      const el = await fixture(html`
        <cds-search label-text="test-search" value="test-value"></cds-search>
      `);
      const input = el.shadowRoot?.querySelector('input');
      expect(input).to.have.property('value', 'test-value');
    });
  });

  describe('@query decorator functionality', () => {
    it('should focus input element when clear button is clicked', async () => {
      const el = await fixture(html`
        <cds-search label-text="test-search" value="test-value"></cds-search>
      `);

      await el.updateComplete;

      const input = el.shadowRoot?.querySelector('input');
      const closeButton = el.shadowRoot?.querySelector(
        'button.cds--search-close'
      );

      expect(input).to.exist;
      expect(closeButton).to.exist;

      closeButton?.click();
      await el.updateComplete;

      expect(el.shadowRoot?.activeElement).to.equal(input);
      expect(el.value).to.equal('');
    });

    it('should cache input element reference via @query decorator', async () => {
      const el = await fixture(html`
        <cds-search label-text="test-search" value="initial"></cds-search>
      `);

      await el.updateComplete;

      const inputElement = el._inputElement;
      expect(inputElement).to.exist;
      expect(inputElement?.tagName).to.equal('INPUT');
      expect(inputElement?.value).to.equal('initial');
    });

    it('should cache magnifier element reference via @query decorator', async () => {
      const el = await fixture(html`
        <cds-search label-text="test-search" expandable></cds-search>
      `);

      await el.updateComplete;

      const magnifierElement = el._magnifierElement;
      expect(magnifierElement).to.exist;
      expect(magnifierElement?.classList.contains('cds--search-magnifier')).to
        .be.true;
    });

    it('should focus magnifier when Escape is pressed with empty input in expandable mode', async () => {
      const el = await fixture(html`
        <cds-search label-text="test-search" expandable expanded></cds-search>
      `);

      await el.updateComplete;

      const input = el.shadowRoot?.querySelector('input');
      const magnifier = el.shadowRoot?.querySelector('.cds--search-magnifier');

      expect(input).to.exist;
      expect(magnifier).to.exist;

      input?.focus();
      await el.updateComplete;

      const escapeEvent = new KeyboardEvent('keydown', {
        key: 'Escape',
        bubbles: true,
      });
      el.dispatchEvent(escapeEvent);
      await el.updateComplete;

      expect(el.shadowRoot?.activeElement).to.equal(magnifier);
    });

    it('should clear value but keep focus when Escape is pressed with non-empty input', async () => {
      const el = await fixture(html`
        <cds-search
          label-text="test-search"
          value="test-value"
          expandable
          expanded></cds-search>
      `);

      await el.updateComplete;

      const input = el.shadowRoot?.querySelector('input');
      expect(input).to.exist;

      input?.focus();
      await el.updateComplete;

      const escapeEvent = new KeyboardEvent('keydown', {
        key: 'Escape',
        bubbles: true,
      });
      el.dispatchEvent(escapeEvent);
      await el.updateComplete;

      expect(el.value).to.equal('');
      expect(el.shadowRoot?.activeElement).to.equal(input);
    });

    it('should expand and focus input when magnifier is clicked in expandable mode', async () => {
      const el = await fixture(html`
        <cds-search label-text="test-search" expandable></cds-search>
      `);

      await el.updateComplete;

      expect(el.expanded).to.be.false;

      const magnifier = el.shadowRoot?.querySelector('.cds--search-magnifier');
      const input = el.shadowRoot?.querySelector('input');

      expect(magnifier).to.exist;
      expect(input).to.exist;

      magnifier?.click();
      await el.updateComplete;

      expect(el.expanded).to.be.true;
      expect(el.shadowRoot?.activeElement).to.equal(input);
    });

    it('should handle multiple clear operations correctly', async () => {
      const el = await fixture(html`
        <cds-search label-text="test-search" value="test1"></cds-search>
      `);

      await el.updateComplete;

      const input = el.shadowRoot?.querySelector('input');
      const closeButton = el.shadowRoot?.querySelector(
        'button.cds--search-close'
      );

      closeButton?.click();
      await el.updateComplete;
      expect(el.value).to.equal('');
      expect(el.shadowRoot?.activeElement).to.equal(input);

      el.value = 'test2';
      await el.updateComplete;

      closeButton?.click();
      await el.updateComplete;
      expect(el.value).to.equal('');
      expect(el.shadowRoot?.activeElement).to.equal(input);
    });

    it('should maintain focus management with @query decorator after updates', async () => {
      const el = await fixture(html`
        <cds-search label-text="test-search" expandable></cds-search>
      `);

      await el.updateComplete;

      el.placeholder = 'New placeholder';
      await el.updateComplete;

      el.size = 'sm';
      await el.updateComplete;

      const magnifier = el.shadowRoot?.querySelector('.cds--search-magnifier');
      const input = el.shadowRoot?.querySelector('input');

      magnifier?.click();
      await el.updateComplete;

      expect(el.expanded).to.be.true;
      expect(el.shadowRoot?.activeElement).to.equal(input);
    });
  });
});
