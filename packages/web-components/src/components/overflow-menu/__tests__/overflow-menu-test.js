/**
 * Copyright IBM Corp. 2025, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import '@carbon/web-components/es/components/overflow-menu/index.js';
import '@carbon/web-components/es/components/feature-flags/index.js';

import { expect, fixture, html } from '@open-wc/testing';

describe('cds-overflow-menu', () => {
  let originalBodyPosition;

  beforeEach(() => {
    originalBodyPosition = document.body.style.position;
    document.body.style.position = 'relative';
  });

  afterEach(() => {
    document.body.style.position = originalBodyPosition;
  });

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

  it('should close menu when a menu item is clicked', async () => {
    const el = await fixture(basicOverflowMenu);
    const menuBody = el.querySelector('cds-overflow-menu-body');

    el.open = true;
    await el.updateComplete;
    await menuBody.updateComplete;

    expect(el.open).to.be.true;
    expect(menuBody.open).to.be.true;

    const items = menuBody.querySelectorAll('cds-overflow-menu-item');

    items[0].click();

    await new Promise((r) => setTimeout(r, 0));
    await el.updateComplete;
    await menuBody.updateComplete;

    expect(el.open).to.be.false;
    expect(menuBody.open).to.be.false;
  });

  it('should render icon slot in menu item', async () => {
    const el = await fixture(html`
      <cds-overflow-menu>
        <span slot="tooltip-content">Options</span>
        <cds-overflow-menu-body>
          <cds-overflow-menu-item>
            Filter A
            <svg slot="icon" width="16" height="16" data-testid="icon">
              <rect width="16" height="16" />
            </svg>
          </cds-overflow-menu-item>
        </cds-overflow-menu-body>
      </cds-overflow-menu>
    `);

    const menuItem = el.querySelector('cds-overflow-menu-item');
    const icon = menuItem.querySelector('[slot="icon"]');

    expect(icon).to.exist;
    expect(icon.getAttribute('slot')).to.equal('icon');
    expect(icon.getAttribute('data-testid')).to.equal('icon');
  });

  it('should render icon slot in menu item with href', async () => {
    const el = await fixture(html`
      <cds-overflow-menu>
        <span slot="tooltip-content">Options</span>
        <cds-overflow-menu-body>
          <cds-overflow-menu-item href="https://example.com">
            Filter A
            <svg slot="icon" width="16" height="16" data-testid="icon-link">
              <rect width="16" height="16" />
            </svg>
          </cds-overflow-menu-item>
        </cds-overflow-menu-body>
      </cds-overflow-menu>
    `);

    const menuItem = el.querySelector('cds-overflow-menu-item');
    const icon = menuItem.querySelector('[slot="icon"]');

    expect(icon).to.exist;
    expect(icon.getAttribute('slot')).to.equal('icon');
    expect(icon.getAttribute('data-testid')).to.equal('icon-link');
    expect(menuItem.href).to.equal('https://example.com');
  });

  describe('cds-overflow-menu-item', () => {
    it('should render danger description for button variant', async () => {
      const el = await fixture(html`
        <cds-overflow-menu-item danger danger-description="Delete action">
          Delete
        </cds-overflow-menu-item>
      `);

      await el.updateComplete;

      const dangerSpan = el.shadowRoot?.querySelector('#danger-description');
      expect(dangerSpan).to.exist;
      expect(dangerSpan).to.have.class('cds--visually-hidden');
      expect(dangerSpan?.textContent).to.equal('Delete action');
    });

    it('should render danger description for href variant', async () => {
      const el = await fixture(html`
        <cds-overflow-menu-item
          danger
          danger-description="Delete action"
          href="#delete">
          Delete
        </cds-overflow-menu-item>
      `);

      await el.updateComplete;

      const dangerSpan = el.shadowRoot?.querySelector('#danger-description');
      expect(dangerSpan).to.exist;
      expect(dangerSpan).to.have.class('cds--visually-hidden');
      expect(dangerSpan?.textContent).to.equal('Delete action');
    });

    it('should not render danger description when danger is false', async () => {
      const el = await fixture(html`
        <cds-overflow-menu-item>Normal action</cds-overflow-menu-item>
      `);

      await el.updateComplete;

      const dangerSpan = el.shadowRoot?.querySelector('#danger-description');
      expect(dangerSpan).to.not.exist;
    });

    it('should not render default danger description when none is provided', async () => {
      const el = await fixture(html`
        <cds-overflow-menu-item danger>Delete</cds-overflow-menu-item>
      `);

      await el.updateComplete;

      const dangerSpan = el.shadowRoot?.querySelector('#danger-description');
      expect(dangerSpan).to.not.exist;
    });
  });

  describe('enable-v12-overflowmenu', () => {
    it('should support align on the flagged path', async () => {
      const featureFlag = await fixture(html`
        <feature-flags enable-v12-overflowmenu="true">
          <cds-overflow-menu label="Actions" align="bottom">
            <cds-menu>
              <cds-menu-item label="Stop app"></cds-menu-item>
            </cds-menu>
          </cds-overflow-menu>
        </feature-flags>
      `);
      const el = featureFlag.querySelector('cds-overflow-menu');

      await el.updateComplete;

      const tooltip = el.shadowRoot?.querySelector('cds-tooltip');

      expect(el.align).to.equal('bottom');
      expect(tooltip).to.have.attribute('align', 'bottom');
    });

    it('should use the label prop for the trigger tooltip and menu label', async () => {
      const featureFlag = await fixture(html`
        <feature-flags enable-v12-overflowmenu="true">
          <cds-overflow-menu label="Actions">
            <cds-menu>
              <cds-menu-item label="Stop app"></cds-menu-item>
            </cds-menu>
          </cds-overflow-menu>
        </feature-flags>
      `);
      const el = featureFlag.querySelector('cds-overflow-menu');

      await el.updateComplete;

      const button = el.shadowRoot?.querySelector('button');

      expect(button).to.have.attribute('aria-label', 'Actions');
    });

    it('should manage a cds-menu child when the feature flag is enabled', async () => {
      const featureFlag = await fixture(html`
        <feature-flags enable-v12-overflowmenu="true">
          <cds-overflow-menu label="Actions">
            <cds-menu>
              <cds-menu-item label="Stop app"></cds-menu-item>
              <cds-menu-item-divider></cds-menu-item-divider>
              <cds-menu-item label="Delete app" kind="danger"></cds-menu-item>
            </cds-menu>
          </cds-overflow-menu>
        </feature-flags>
      `);
      const el = featureFlag.querySelector('cds-overflow-menu');

      el.open = true;
      await el.updateComplete;

      const menu = el.querySelector('cds-menu');
      await menu.updateComplete;

      const menuNode = menu.shadowRoot?.querySelector('[role="menu"]');

      expect(menu).to.exist;
      expect(menu.open).to.be.true;
      expect(menuNode).to.have.attribute('aria-label', 'Actions');
      expect(el.shadowRoot?.querySelector('button')).to.have.attribute(
        'aria-controls',
        menu.id
      );
    });

    it('should propagate menu-alignment to the flagged cds-menu child', async () => {
      const featureFlag = await fixture(html`
        <feature-flags enable-v12-overflowmenu="true">
          <cds-overflow-menu label="Actions" menu-alignment="top-end">
            <cds-menu>
              <cds-menu-item label="Stop app"></cds-menu-item>
            </cds-menu>
          </cds-overflow-menu>
        </feature-flags>
      `);
      const el = featureFlag.querySelector('cds-overflow-menu');

      el.open = true;
      await el.updateComplete;

      const menu = el.querySelector('cds-menu');
      await menu.updateComplete;

      expect(el.menuAlignment).to.equal('top-end');
      expect(menu.menuAlignment).to.equal('top-end');
    });

    it('should accept all valid menu-alignment values', async () => {
      const validAlignments = [
        'bottom-start',
        'bottom-end',
        'top-start',
        'top-end',
      ];

      for (const alignment of validAlignments) {
        const featureFlag = await fixture(html`
          <feature-flags enable-v12-overflowmenu="true">
            <cds-overflow-menu label="Actions" menu-alignment="${alignment}">
              <cds-menu>
                <cds-menu-item label="Stop app"></cds-menu-item>
              </cds-menu>
            </cds-overflow-menu>
          </feature-flags>
        `);
        const el = featureFlag.querySelector('cds-overflow-menu');

        await el.updateComplete;

        expect(el.menuAlignment).to.equal(alignment);
      }
    });

    it('should not apply floating UI styles when dynamic floating styles are disabled', async () => {
      const featureFlag = await fixture(html`
        <feature-flags enable-v12-overflowmenu="true">
          <cds-overflow-menu label="Actions">
            <cds-menu>
              <cds-menu-item label="Stop app"></cds-menu-item>
            </cds-menu>
          </cds-overflow-menu>
        </feature-flags>
      `);
      const el = featureFlag.querySelector('cds-overflow-menu');

      el.open = true;
      await el.updateComplete;

      const menu = el.querySelector('cds-menu');
      await menu.updateComplete;

      const menuSurface = menu.shadowRoot?.querySelector('.cds--menu');

      expect(menuSurface?.style.position).to.equal('');
      expect(menuSurface?.style.left).to.equal('');
      expect(menuSurface?.style.top).to.equal('');
    });

    it('should apply floating UI styles when dynamic floating styles are enabled', async () => {
      const featureFlag = await fixture(html`
        <feature-flags
          enable-v12-overflowmenu="true"
          enable-v12-dynamic-floating-styles="true">
          <cds-overflow-menu label="Actions">
            <cds-menu>
              <cds-menu-item label="Stop app"></cds-menu-item>
            </cds-menu>
          </cds-overflow-menu>
        </feature-flags>
      `);
      const el = featureFlag.querySelector('cds-overflow-menu');

      el.open = true;
      await el.updateComplete;

      const menu = el.querySelector('cds-menu');
      await menu.updateComplete;

      await new Promise((resolve) => {
        setTimeout(resolve, 0);
      });

      const menuSurface = menu.shadowRoot?.querySelector('.cds--menu');

      expect(menuSurface?.style.position).to.equal('fixed');
      expect(menuSurface?.style.left).to.not.equal('');
      expect(menuSurface?.style.top).to.not.equal('');
    });

    it('should apply floating UI styles when autoalign is enabled', async () => {
      const featureFlag = await fixture(html`
        <feature-flags enable-v12-overflowmenu="true">
          <cds-overflow-menu label="Actions" autoalign>
            <cds-menu>
              <cds-menu-item label="Stop app"></cds-menu-item>
            </cds-menu>
          </cds-overflow-menu>
        </feature-flags>
      `);
      const el = featureFlag.querySelector('cds-overflow-menu');

      el.open = true;
      await el.updateComplete;

      const menu = el.querySelector('cds-menu');
      await menu.updateComplete;

      await new Promise((resolve) => {
        setTimeout(resolve, 0);
      });

      const menuSurface = menu.shadowRoot?.querySelector('.cds--menu');

      expect(el.autoalign).to.be.true;
      expect(menuSurface?.style.position).to.equal('fixed');
      expect(menuSurface?.style.left).to.not.equal('');
      expect(menuSurface?.style.top).to.not.equal('');
    });

    it('should close the root menu when the managed menu emits a close event', async () => {
      const featureFlag = await fixture(html`
        <feature-flags enable-v12-overflowmenu="true">
          <cds-overflow-menu label="Actions">
            <cds-menu>
              <cds-menu-item label="Stop app"></cds-menu-item>
              <cds-menu-item label="Delete app" kind="danger"></cds-menu-item>
            </cds-menu>
          </cds-overflow-menu>
        </feature-flags>
      `);
      const el = featureFlag.querySelector('cds-overflow-menu');

      el.open = true;
      await el.updateComplete;

      const menu = el.querySelector('cds-menu');
      await menu.updateComplete;

      menu.dispatchEvent(
        new CustomEvent('cds-menu-closed', {
          bubbles: true,
          composed: true,
          detail: {
            triggerEventType: 'click',
          },
        })
      );

      await new Promise((resolve) => {
        setTimeout(resolve, 0);
      });
      await el.updateComplete;
      await menu.updateComplete;

      expect(el.open).to.be.false;
      expect(menu.open).to.be.false;
    });

    it('should focus the first enabled menu item when opened from the trigger', async () => {
      const featureFlag = await fixture(html`
        <feature-flags enable-v12-overflowmenu="true">
          <cds-overflow-menu label="Actions">
            <cds-menu>
              <cds-menu-item label="Stop app"></cds-menu-item>
              <cds-menu-item label="Delete app" kind="danger"></cds-menu-item>
            </cds-menu>
          </cds-overflow-menu>
        </feature-flags>
      `);
      const el = featureFlag.querySelector('cds-overflow-menu');
      const triggerButton = el.shadowRoot?.querySelector('button');

      triggerButton?.click();
      await el.updateComplete;

      const menu = el.querySelector('cds-menu');
      await menu.updateComplete;
      await new Promise((resolve) => {
        setTimeout(resolve, 0);
      });

      const firstItem = menu.querySelector('cds-menu-item');
      expect(document.activeElement).to.equal(firstItem);
    });

    it('should focus selectable composition when it is the first active item', async () => {
      const featureFlag = await fixture(html`
        <feature-flags enable-v12-overflowmenu="true">
          <cds-overflow-menu label="Actions">
            <cds-menu>
              <cds-menu-item-selectable
                label="Stop app"></cds-menu-item-selectable>
              <cds-menu-item label="Delete app" kind="danger"></cds-menu-item>
            </cds-menu>
          </cds-overflow-menu>
        </feature-flags>
      `);
      const el = featureFlag.querySelector('cds-overflow-menu');
      const triggerButton = el.shadowRoot?.querySelector('button');

      triggerButton?.click();
      await el.updateComplete;

      const menu = el.querySelector('cds-menu');
      await menu.updateComplete;
      await new Promise((resolve) => {
        setTimeout(resolve, 0);
      });

      const firstSelectable = menu.querySelector('cds-menu-item-selectable');
      const selectableInnerItem =
        firstSelectable?.shadowRoot?.querySelector('cds-menu-item');

      expect(document.activeElement).to.equal(firstSelectable);
      expect(firstSelectable?.shadowRoot?.activeElement).to.equal(
        selectableInnerItem
      );
    });

    it('should close when opened from the trigger and the menu emits focusout close', async () => {
      const featureFlag = await fixture(html`
        <feature-flags enable-v12-overflowmenu="true">
          <cds-overflow-menu label="Actions">
            <cds-menu>
              <cds-menu-item label="Stop app"></cds-menu-item>
              <cds-menu-item label="Delete app" kind="danger"></cds-menu-item>
            </cds-menu>
          </cds-overflow-menu>
        </feature-flags>
      `);
      const el = featureFlag.querySelector('cds-overflow-menu');
      const triggerButton = el.shadowRoot?.querySelector('button');

      triggerButton?.click();
      await el.updateComplete;

      const menu = el.querySelector('cds-menu');
      await menu.updateComplete;
      await new Promise((resolve) => {
        setTimeout(resolve, 0);
      });

      expect(el.open).to.be.true;
      menu.dispatchEvent(
        new CustomEvent('cds-menu-closed', {
          bubbles: true,
          composed: true,
          detail: {
            triggerEventType: 'focusout',
          },
        })
      );

      await new Promise((resolve) => {
        setTimeout(resolve, 0);
      });
      await el.updateComplete;
      await menu.updateComplete;

      expect(el.open).to.be.false;
      expect(menu.open).to.be.false;
    });

    it('should keep trigger tooltip closed when hovering a v12 menu item', async () => {
      const featureFlag = await fixture(html`
        <feature-flags enable-v12-overflowmenu="true">
          <cds-overflow-menu label="Actions">
            <cds-menu>
              <cds-menu-item label="Stop app"></cds-menu-item>
              <cds-menu-item label="Delete app" kind="danger"></cds-menu-item>
            </cds-menu>
          </cds-overflow-menu>
        </feature-flags>
      `);
      const el = featureFlag.querySelector('cds-overflow-menu');

      el.open = true;
      await el.updateComplete;

      const menu = el.querySelector('cds-menu');
      await menu.updateComplete;

      const menuItem = menu.querySelector('cds-menu-item[kind="danger"]');
      const tooltip = el.shadowRoot?.querySelector('cds-tooltip');

      menuItem?.dispatchEvent(new MouseEvent('mouseover', { bubbles: true }));

      await new Promise((resolve) => {
        setTimeout(resolve, 125);
      });

      const tooltipContent = el.shadowRoot?.querySelector(
        'cds-tooltip-content'
      );
      expect(tooltip?.open).to.be.false;
      expect(tooltipContent?.hidden).to.be.true;
    });
  });
});
