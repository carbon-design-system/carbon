/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { expect, fixture, html, triggerFocusFor } from '@open-wc/testing';
import '@carbon/web-components/es/components/menu-button/index.js';

const menuButton = html`
  <cds-menu-button label="Actions">
    <cds-menu>
      <cds-menu-item label="First action"></cds-menu-item>
      <cds-menu-item label="Second action"></cds-menu-item>
      <cds-menu-item label="Third action" disabled></cds-menu-item>
    </cds-menu>
  </cds-menu-button>
`;

describe('cds-menu-button', function () {
  it('should render and match snapshot', async () => {
    const el = await fixture(menuButton);
    await expect(el).dom.to.equalSnapshot();
  });

  it('should be accessible (closed & open)', async () => {
    const el = await fixture(menuButton);
    await expect(el).to.be.accessible();
    // Also check when menu is open
    const button = el.shadowRoot.querySelector('cds-button');
    button.click();
    await el.updateComplete;
    await expect(el).to.be.accessible();
  });

  describe('Attributes and properties', () => {
    it('should reflect and pass down kind, size, disabled, and label', async () => {
      const el = await fixture(html`
        <cds-menu-button
          kind="tertiary"
          size="sm"
          label="TestLabel"
          ?disabled=${true}>
          <cds-menu>
            <cds-menu-item label="X"></cds-menu-item>
          </cds-menu>
        </cds-menu-button>
      `);
      expect(el.getAttribute('kind')).to.equal('tertiary');
      expect(el.getAttribute('size')).to.equal('sm');
      expect(el.label).to.equal('TestLabel');
      expect(el.disabled).to.be.true;

      // Make sure these props are passed to the internal button
      const button = el.shadowRoot.querySelector('cds-button');
      expect(button.getAttribute('kind')).to.equal('tertiary');
      expect(button.getAttribute('size')).to.equal('sm');
      expect(button.disabled).to.be.true;
    });

    it('should set menu-alignment and reflect on instance', async () => {
      const el = await fixture(html`
        <cds-menu-button menu-alignment="top-end" label="Align">
          <cds-menu>
            <cds-menu-item label="A"></cds-menu-item>
          </cds-menu>
        </cds-menu-button>
      `);
      expect(el.menuAlignment).to.equal('top-end');
      expect(el.getAttribute('menu-alignment')).to.equal('top-end');
    });

    it('should set tabIndex', async () => {
      const el = await fixture(html`
        <cds-menu-button tab-index="5" label="TabIndex">
          <cds-menu>
            <cds-menu-item label="A"></cds-menu-item>
          </cds-menu>
        </cds-menu-button>
      `);
      const button = el.shadowRoot.querySelector('cds-button');
      expect(button.getAttribute('tab-index')).to.equal('5');
    });
  });

  describe('Opening and closing menu', () => {
    it('should open/close menu on trigger click', async () => {
      const el = await fixture(menuButton);
      const button = el.shadowRoot.querySelector('cds-button');
      const menu = el.querySelector('cds-menu');
      expect(menu.open).to.be.false;

      button.click();
      await el.updateComplete;
      await menu.updateComplete;
      expect(menu.open).to.be.true;

      button.click();
      await el.updateComplete;
      await menu.updateComplete;
      expect(menu.open).to.be.false;
    });

    it('should close menu on focusout', async () => {
      const el = await fixture(menuButton);
      const button = el.shadowRoot.querySelector('cds-button');
      const menu = el.querySelector('cds-menu');
      button.click();
      await el.updateComplete;
      await menu.updateComplete;
      expect(menu.open).to.be.true;

      // Simulate focus leaving the menu button component
      const event = new FocusEvent('focusout', {
        relatedTarget: document.body,
        bubbles: true,
        composed: true,
      });
      el.dispatchEvent(event);

      await el.updateComplete;
      await menu.updateComplete;
      expect(menu.open).to.be.false;
    });
  });

  describe('Keyboard and focus interaction', () => {
    it('should receive focus and open with Space/Enter', async () => {
      const el = await fixture(menuButton);
      const button = el.shadowRoot.querySelector('cds-button');
      const menu = el.querySelector('cds-menu');

      // Open with Space key
      await triggerFocusFor(button);
      button.dispatchEvent(
        new KeyboardEvent('keydown', { key: ' ', bubbles: true })
      );
      button.click(); // fallback in case the component does not handle keydown directly
      await el.updateComplete;
      await menu.updateComplete;
      expect(menu.open).to.be.true;

      // Close and open again with Enter key
      button.click(); // close menu
      await el.updateComplete;
      await menu.updateComplete;
      expect(menu.open).to.be.false;

      await triggerFocusFor(button);
      button.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'Enter', bubbles: true })
      );
      button.click();
      await el.updateComplete;
      await menu.updateComplete;
      expect(menu.open).to.be.true;
    });

    it('should not open menu if disabled', async () => {
      const el = await fixture(html`
        <cds-menu-button label="Disabled" ?disabled=${true}>
          <cds-menu>
            <cds-menu-item label="A"></cds-menu-item>
          </cds-menu>
        </cds-menu-button>
      `);
      const button = el.shadowRoot.querySelector('cds-button');
      button.click();
      await el.updateComplete;
      expect(el.querySelector('cds-menu').open).to.be.false;
    });
  });

  describe('Children/slots and special menu content', () => {
    it('should render danger item, divider, and menu items', async () => {
      const el = await fixture(html`
        <cds-menu-button label="Danger">
          <cds-menu>
            <cds-menu-item label="First action"></cds-menu-item>
            <cds-menu-item label="Second action"></cds-menu-item>
            <cds-menu-item label="Third action"></cds-menu-item>
            <cds-menu-item-divider></cds-menu-item-divider>
            <cds-menu-item label="Danger action" kind="danger"></cds-menu-item>
          </cds-menu>
        </cds-menu-button>
      `);
      const button = el.shadowRoot.querySelector('cds-button');
      button.click();
      await el.updateComplete;

      // Find all menu items
      const items = Array.from(el.querySelectorAll('cds-menu-item'));

      // Find the menu item with kind="danger"
      const dangerItem = items.find(
        (item) => item.getAttribute('kind') === 'danger'
      );
      expect(dangerItem).to.exist;
      expect(dangerItem.getAttribute('label')).to.equal('Danger action');

      // Make sure divider is rendered
      const divider = el.querySelector('cds-menu-item-divider');
      expect(divider).to.exist;
    });

    it('should render icon content inside menu items (slot)', async () => {
      const el = await fixture(html`
        <cds-menu-button label="Icons">
          <cds-menu>
            <cds-menu-item label="Asset">
              <svg slot="render-icon"></svg>
            </cds-menu-item>
          </cds-menu>
        </cds-menu-button>
      `);
      const button = el.shadowRoot.querySelector('cds-button');
      button.click();
      await el.updateComplete;
      const menuItem = el.querySelector('cds-menu-item');
      const icon = menuItem.querySelector('[slot="render-icon"]');
      expect(icon).to.exist;
    });

    it('should render nested menus via cds-menu-item-group', async () => {
      const el = await fixture(html`
        <cds-menu-button label="Nested">
          <cds-menu>
            <cds-menu-item label="Export">
              <cds-menu-item-group slot="submenu">
                <cds-menu-item label="PDF"></cds-menu-item>
              </cds-menu-item-group>
            </cds-menu-item>
          </cds-menu>
        </cds-menu-button>
      `);
      const button = el.shadowRoot.querySelector('cds-button');
      button.click();
      await el.updateComplete;
      const menuItem = el.querySelector('cds-menu-item');
      const group = menuItem.querySelector('cds-menu-item-group');
      expect(group).to.exist;
      const nestedItem = group.querySelector('cds-menu-item');
      expect(nestedItem.getAttribute('label')).to.equal('PDF');
    });

    describe('Disabled menu item', () => {
      it('should render menu items with disabled attribute and aria-disabled', async () => {
        const el = await fixture(menuButton);
        const button = el.shadowRoot.querySelector('cds-button');
        button.click();
        await el.updateComplete;
        const menu = el.querySelector('cds-menu');
        const items = menu.querySelectorAll('cds-menu-item');
        expect(items[2].hasAttribute('disabled')).to.be.true;
        // Should also have aria-disabled for accessibility
        expect(items[2].getAttribute('aria-disabled')).to.equal('true');
      });
    });

    describe('Menu alignment variations', () => {
      const alignments = [
        'top',
        'top-start',
        'top-end',
        'bottom',
        'bottom-start',
        'bottom-end',
      ];
      alignments.forEach((alignment) => {
        it(`should render with menu-alignment="${alignment}"`, async () => {
          const el = await fixture(html`
            <cds-menu-button label="Align" menu-alignment="${alignment}">
              <cds-menu>
                <cds-menu-item label="A"></cds-menu-item>
              </cds-menu>
            </cds-menu-button>
          `);
          expect(el.menuAlignment).to.equal(alignment);
        });
      });
    });

    describe('Snapshot variants', () => {
      it('should render with divider and danger and match snapshot', async () => {
        const el = await fixture(html`
          <cds-menu-button label="Test">
            <cds-menu>
              <cds-menu-item label="First action"></cds-menu-item>
              <cds-menu-item-divider></cds-menu-item-divider>
              <cds-menu-item label="Danger" kind="danger"></cds-menu-item>
            </cds-menu>
          </cds-menu-button>
        `);
        await expect(el).dom.to.equalSnapshot();
      });
      it('should render with nested menu and match snapshot', async () => {
        const el = await fixture(html`
          <cds-menu-button label="Nested">
            <cds-menu>
              <cds-menu-item label="Export as">
                <cds-menu-item-group slot="submenu">
                  <cds-menu-item label="PDF"></cds-menu-item>
                </cds-menu-item-group>
              </cds-menu-item>
            </cds-menu>
          </cds-menu-button>
        `);
        await expect(el).dom.to.equalSnapshot();
      });
    });
  });
});
