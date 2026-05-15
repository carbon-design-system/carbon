/**
 * Copyright IBM Corp. 2025, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import '@carbon/web-components/es/components/overflow-menu/index.js';

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

    it('should use default danger description', async () => {
      const el = await fixture(html`
        <cds-overflow-menu-item danger>Delete</cds-overflow-menu-item>
      `);

      await el.updateComplete;

      const dangerSpan = el.shadowRoot?.querySelector('#danger-description');
      expect(dangerSpan).to.exist;
      expect(dangerSpan?.textContent).to.equal('danger');
    });
  });
});
