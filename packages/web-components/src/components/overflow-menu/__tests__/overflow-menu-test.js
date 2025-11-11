/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import '@carbon/web-components/es/components/overflow-menu/index.js';

import { expect, fixture, html } from '@open-wc/testing';

describe('cds-overflow-menu', () => {
  const basicOverflowMenu = html`<cds-overflow-menu>
    <span slot="tooltip-content">Options</span>
    <cds-overflow-menu-body>
      <cds-overflow-menu-item>Filter A</cds-overflow-menu-item>
      <cds-overflow-menu-item>Filter B</cds-overflow-menu-item>
    </cds-overflow-menu-body>
  </cds-overflow-menu>`;

  it('should render', async () => {
    const el = await fixture(basicOverflowMenu);
    expect(el);
  });

  describe('supports size', () => {
    const sizes = ['xs', 'sm', 'md', 'lg'];

    sizes.forEach((size) => {
      it(`size="${size}"`, async () => {
        const el = await fixture(html`
          <cds-overflow-menu size=${size}>
            <span slot="tooltip-content">Options</span>
            <cds-overflow-menu-body>
              <cds-overflow-menu-item>Filter A</cds-overflow-menu-item>
              <cds-overflow-menu-item>Filter B</cds-overflow-menu-item>
            </cds-overflow-menu-body>
          </cds-overflow-menu>
        `);

        expect(el).to.have.attribute('size', size);

        const button = el.shadowRoot?.querySelector('button');

        expect(button).to.have.class(`cds--overflow-menu--${size}`);
      });
    });
  });

  describe('Escape key handling', () => {
    it('should handle Escape key to close menu', async () => {
      const el = await fixture(basicOverflowMenu);
      const menuBody = el.querySelector('cds-overflow-menu-body');

      menuBody.open = true;

      const event = new KeyboardEvent('keydown', {
        key: 'Escape',
        bubbles: true,
        cancelable: true,
      });

      menuBody.dispatchEvent(event);

      expect(menuBody.open).to.be.false;
    });

    it('should return focus to trigger button when Escape key is pressed', async () => {
      const el = await fixture(basicOverflowMenu);
      const menuBody = el.querySelector('cds-overflow-menu-body');
      const triggerButton = el.shadowRoot?.querySelector('button');

      el.open = true;
      menuBody.open = true;
      await el.updateComplete;

      const event = new KeyboardEvent('keydown', {
        key: 'Escape',
        bubbles: true,
        cancelable: true,
      });

      menuBody.dispatchEvent(event);

      await new Promise((resolve) => requestAnimationFrame(resolve));

      expect(document.activeElement).to.equal(triggerButton);
      expect(menuBody.open).to.be.false;
      expect(el.open).to.be.false;
    });
  });

  describe('Enter key handling on menu items', () => {
    it('should return focus to trigger button when Enter key is pressed on menu item', async () => {
      const el = await fixture(basicOverflowMenu);
      const menuBody = el.querySelector('cds-overflow-menu-body');
      const menuItem = el.querySelector('cds-overflow-menu-item');
      const triggerButton = el.shadowRoot?.querySelector('button');

      el.open = true;
      menuBody.open = true;
      await el.updateComplete;

      menuItem.focus();

      const event = new KeyboardEvent('keydown', {
        key: 'Enter',
        bubbles: true,
        cancelable: true,
      });

      menuBody.dispatchEvent(event);

      await new Promise((resolve) => requestAnimationFrame(resolve));

      expect(document.activeElement).to.equal(triggerButton);
      expect(menuBody.open).to.be.false;
      expect(el.open).to.be.false;
    });
  });
});
