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

  it('should close and refocus trigger when a menu item is clicked', async () => {
    const el = await fixture(basicOverflowMenu);
    const menuBody = el.querySelector('cds-overflow-menu-body');
    const trigger = el.shadowRoot.querySelector('button');

    menuBody.open = true;
    const items = menuBody.querySelectorAll('cds-overflow-menu-item');

    let focusCalled = false;
    const originalFocus = trigger.focus;
    trigger.focus = () => {
      focusCalled = true;
      originalFocus.call(trigger);
    };

    items[0].click();

    await new Promise((r) => requestAnimationFrame(r));

    expect(menuBody.open).to.be.false;
    expect(focusCalled).to.be.true;

    trigger.focus = originalFocus;
  });
});
