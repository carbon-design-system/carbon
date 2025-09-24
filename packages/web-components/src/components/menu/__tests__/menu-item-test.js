/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import '@carbon/web-components/es/components/menu/index.js';
import { expect, fixture, html } from '@open-wc/testing';

describe('cds-menu-item', () => {
  it('should render with default properties', async () => {
    const el = await fixture(html`<cds-menu-item></cds-menu-item>`);
    expect(el).to.exist;
  });

  it('should render with a label', async () => {
    const el = await fixture(
      html`<cds-menu-item label="Test Item"></cds-menu-item>`
    );
    const labelElement = el.shadowRoot.querySelector('.cds--menu-item__label');
    expect(labelElement.textContent).to.equal('Test Item');
  });

  it('should render with a shortcut', async () => {
    const el = await fixture(
      html`<cds-menu-item label="Test Item" shortcut="Ctrl+S"></cds-menu-item>`
    );
    const shortcutElement = el.shadowRoot.querySelector(
      '.cds--menu-item__shortcut'
    );
    expect(shortcutElement.textContent.trim()).to.equal('Ctrl+S');
  });

  it('should be disabled when disabled attribute is set', async () => {
    const el = await fixture(
      html`<cds-menu-item label="Test Item" disabled></cds-menu-item>`
    );
    await el.updateComplete;
    expect(el).to.have.attribute('aria-disabled', 'true');
    expect(el).to.have.attribute('tabindex', '-1');
  });

  it('should apply danger kind class when kind is set to danger', async () => {
    const el = await fixture(
      html`<cds-menu-item label="Test Item" kind="danger"></cds-menu-item>`
    );
    await el.updateComplete;
    expect(el).to.have.class('cds--menu-item--danger');
  });

  describe('firstUpdated', () => {
    it('should detect submenu', async () => {
      const el = await fixture(html`
        <cds-menu-item label="Parent Item">
          <cds-menu-item slot="submenu" label="Child Item"></cds-menu-item>
        </cds-menu-item>
      `);
      await el.updateComplete;
      expect(el.hasSubmenu).to.be.true;
      expect(el).to.have.attribute('aria-haspopup', 'true');
      expect(el).to.have.attribute('aria-expanded', 'true');
    });

    it('should detect RTL direction', async () => {
      // Save original document direction
      const originalDir = document.dir;

      // Set document direction to RTL
      document.dir = 'rtl';

      const el = await fixture(
        html`<cds-menu-item label="RTL Item"></cds-menu-item>`
      );
      await el.updateComplete;

      expect(el.isRtl).to.be.true;

      // Restore original document direction
      document.dir = originalDir;
    });

    it('should set role to menuitem by default', async () => {
      const el = await fixture(
        html`<cds-menu-item label="Test Item"></cds-menu-item>`
      );
      await el.updateComplete;
      expect(el).to.have.attribute('role', 'menuitem');
    });
  });

  describe('event handling', () => {
    it('should handle click events', async () => {
      const el = await fixture(
        html`<cds-menu-item label="Test Item"></cds-menu-item>`
      );

      // Create a mock for _handleClick
      const originalHandleClick = el._handleClick;
      let handleClickCalled = false;

      el._handleClick = function (event) {
        handleClickCalled = true;
        originalHandleClick.call(this, event);
      };

      el.click();

      expect(handleClickCalled).to.be.true;

      // Restore original method
      el._handleClick = originalHandleClick;
    });

    it('should open submenu on mouseenter after delay', async () => {
      const el = await fixture(html`
        <cds-menu-item label="Parent Item">
          <cds-menu-item slot="submenu" label="Child Item"></cds-menu-item>
        </cds-menu-item>
      `);
      await el.updateComplete;

      // Create a mock for _openSubmenu
      const originalOpenSubmenu = el._openSubmenu;
      let openSubmenuCalled = false;

      el._openSubmenu = function () {
        openSubmenuCalled = true;
        originalOpenSubmenu.call(this);
      };

      // Trigger mouseenter
      el.dispatchEvent(new MouseEvent('mouseenter'));

      // Fast-forward time to trigger the timeout
      await new Promise((resolve) =>
        setTimeout(resolve, el.hoverIntentDelay + 10)
      );

      expect(openSubmenuCalled).to.be.true;

      // Restore original method
      el._openSubmenu = originalOpenSubmenu;
    });

    it('should handle keydown events for submenu navigation', async () => {
      const el = await fixture(html`
        <cds-menu-item label="Parent Item">
          <cds-menu-item slot="submenu" label="Child Item"></cds-menu-item>
        </cds-menu-item>
      `);
      await el.updateComplete;

      // Create a mock for _openSubmenu
      const originalOpenSubmenu = el._openSubmenu;
      let openSubmenuCalled = false;

      el._openSubmenu = function () {
        openSubmenuCalled = true;
        originalOpenSubmenu.call(this);
      };

      // Trigger ArrowRight keydown
      el.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight' }));

      expect(openSubmenuCalled).to.be.true;

      // Restore original method
      el._openSubmenu = originalOpenSubmenu;
    });

    it('should handle Enter key to trigger click', async () => {
      const el = await fixture(
        html`<cds-menu-item label="Test Item"></cds-menu-item>`
      );

      // Create a mock for _handleClick
      const originalHandleClick = el._handleClick;
      let handleClickCalled = false;

      el._handleClick = function (event) {
        handleClickCalled = true;
        originalHandleClick.call(this, event);
      };

      // Trigger Enter keydown
      el.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));

      expect(handleClickCalled).to.be.true;

      // Restore original method
      el._handleClick = originalHandleClick;
    });
  });

  describe('submenu positioning', () => {
    it('should calculate correct boundaries for submenu in LTR mode', async () => {
      const el = await fixture(html`
        <cds-menu-item label="Parent Item">
          <cds-menu-item slot="submenu" label="Child Item"></cds-menu-item>
        </cds-menu-item>
      `);
      await el.updateComplete;

      // Mock getBoundingClientRect
      el.getBoundingClientRect = () => ({
        x: 100,
        y: 200,
        width: 150,
        height: 40,
      });

      el._openSubmenu();

      expect(el.boundaries.x).to.deep.equal([100, 250]);
      expect(el.boundaries.y).to.deep.equal([200, 240]);
    });

    it('should calculate correct boundaries for submenu in RTL mode', async () => {
      // Save original document direction
      const originalDir = document.dir;

      // Set document direction to RTL
      document.dir = 'rtl';

      const el = await fixture(html`
        <cds-menu-item label="Parent Item">
          <cds-menu-item slot="submenu" label="Child Item"></cds-menu-item>
        </cds-menu-item>
      `);
      await el.updateComplete;

      // Mock getBoundingClientRect
      el.getBoundingClientRect = () => ({
        x: 100,
        y: 200,
        width: 150,
        height: 40,
      });

      el._openSubmenu();

      expect(el.boundaries.x).to.deep.equal([-100, -50]);
      expect(el.boundaries.y).to.deep.equal([200, 240]);

      // Restore original document direction
      document.dir = originalDir;
    });
  });
});
