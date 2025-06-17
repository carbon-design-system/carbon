/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import '@carbon/web-components/es/components/combo-button/index.js';
import { expect, fixture, html, waitUntil } from '@open-wc/testing';

describe('cds-combo-button', () => {
  const basicComboButton = html`<cds-combo-button label="Primary action">
    <cds-menu>
      <cds-menu-item label="Additional action"></cds-menu-item>
    </cds-menu>
  </cds-combo-button>`;

  it('should render', async () => {
    const el = await fixture(basicComboButton);
    await expect(el).shadowDom.to.equalSnapshot();
  });

  it('should render with minimum attributes', async () => {
    const el = await fixture(basicComboButton);
    expect(el).to.exist;
    await expect(el).shadowDom.to.equalSnapshot();
  });

  it('should support a custom class name on the outermost element', async () => {
    const el = await fixture(html`
      <cds-combo-button label="Primary action" class="test">
        <cds-menu>
          <cds-menu-item label="Additional action"></cds-menu-item>
        </cds-menu>
      </cds-combo-button>
    `);
    expect(el).to.have.class('test');
    await expect(el).shadowDom.to.equalSnapshot();
  });

  it('should forward additional attributes on the outermost element', async () => {
    const el = await fixture(html`
      <cds-combo-button label="Primary action" data-testid="test">
        <cds-menu>
          <cds-menu-item label="Additional action"></cds-menu-item>
        </cds-menu>
      </cds-combo-button>
    `);
    expect(el).to.have.attribute('data-testid', 'test');
    await expect(el).shadowDom.to.equalSnapshot();
  });

  it('should render props.label on the primary button', async () => {
    const el = await fixture(html`
      <cds-combo-button label="Test">
        <cds-menu>
          <cds-menu-item label="Additional action"></cds-menu-item>
        </cds-menu>
      </cds-combo-button>
    `);

    const primaryButton = el.shadowRoot?.querySelector('cds-button');
    expect(primaryButton?.textContent?.trim()).to.equal('Test');
    await expect(el).shadowDom.to.equalSnapshot();
  });

  it('should support props.disabled', async () => {
    const el = await fixture(html`
      <cds-combo-button label="Primary action" disabled>
        <cds-menu>
          <cds-menu-item label="Additional action"></cds-menu-item>
        </cds-menu>
      </cds-combo-button>
    `);

    const primaryButton = el.shadowRoot?.querySelector('cds-button');
    expect(primaryButton).to.have.attribute('disabled');

    const triggerButton = el.shadowRoot?.querySelector('cds-icon-button');
    expect(triggerButton).to.have.attribute('disabled');
    await expect(el).shadowDom.to.equalSnapshot();
  });

  describe('supports props.size', () => {
    const sizes = ['sm', 'md', 'lg'];

    sizes.forEach((size) => {
      it(`size="${size}"`, async () => {
        const el = await fixture(html`
          <cds-combo-button label="Primary action" size="${size}">
            <cds-menu>
              <cds-menu-item label="Additional action"></cds-menu-item>
            </cds-menu>
          </cds-combo-button>
        `);

        expect(el).to.have.attribute('size', size);

        const primaryButton = el.shadowRoot?.querySelector('cds-button');
        const triggerButton = el.shadowRoot?.querySelector('cds-icon-button');

        expect(primaryButton).to.have.attribute('size', size);
        expect(triggerButton).to.have.attribute('size', size);
        await expect(el).shadowDom.to.equalSnapshot();
      });
    });
  });

  describe('supports props.tooltipAlignment', () => {
    const alignments = [
      'top',
      'top-start',
      'top-end',
      'bottom',
      'bottom-start',
      'bottom-end',
      'left',
      'right',
    ];

    alignments.forEach((alignment) => {
      it(`tooltipAlignment="${alignment}"`, async () => {
        const el = await fixture(html`
          <cds-combo-button
            label="Primary action"
            tooltip-alignment="${alignment}">
            <cds-menu>
              <cds-menu-item label="Additional action"></cds-menu-item>
            </cds-menu>
          </cds-combo-button>
        `);

        expect(el).to.have.attribute('tooltip-alignment', alignment);

        const triggerButton = el.shadowRoot?.querySelector('cds-icon-button');
        expect(triggerButton).to.have.attribute('align', alignment);
        await expect(el).shadowDom.to.equalSnapshot();
      });
    });
  });

  describe('supports props.menuAlignment', () => {
    const alignments = [
      'top',
      'top-start',
      'top-end',
      'bottom',
      'bottom-start',
      'bottom-end',
    ];

    alignments.forEach((alignment) => {
      it(`menuAlignment="${alignment}"`, async () => {
        const el = await fixture(html`
          <cds-combo-button
            label="Primary action"
            menu-alignment="${alignment}">
            <cds-menu>
              <cds-menu-item label="Additional action"></cds-menu-item>
            </cds-menu>
          </cds-combo-button>
        `);

        expect(el).to.have.attribute('menu-alignment', alignment);
        expect(el.menuAlignment).to.equal(alignment);
        await expect(el).shadowDom.to.equalSnapshot();
      });
    });
  });

  it('should support `tooltips-content` attribute', async () => {
    const customTooltip = 'Custom tooltip text';
    const el = await fixture(html`
      <cds-combo-button
        label="Primary action"
        tooltip-content="${customTooltip}">
        <cds-menu>
          <cds-menu-item label="Additional action"></cds-menu-item>
        </cds-menu>
      </cds-combo-button>
    `);

    const triggerButton = el.shadowRoot?.querySelector('cds-icon-button');
    const tooltipSlot = triggerButton?.querySelector(
      '[slot="tooltip-content"]'
    );
    expect(tooltipSlot?.textContent?.trim()).to.equal(customTooltip);
    await expect(el).shadowDom.to.equalSnapshot();
  });

  it('should have default tooltip content', async () => {
    const el = await fixture(basicComboButton);

    const triggerButton = el.shadowRoot?.querySelector('cds-icon-button');
    const tooltipSlot = triggerButton?.querySelector(
      '[slot="tooltip-content"]'
    );
    expect(tooltipSlot?.textContent?.trim()).to.equal('Additional actions');
    expect(el).shadowDom.to.equalSnapshot();
  });
});

describe('Button props', () => {
  it('should call the click handler on primary action click', async () => {
    let clicked = false;
    const el = await fixture(html`
      <cds-combo-button
        label="Test"
        @click=${() => {
          clicked = true;
        }}>
        <cds-menu>
          <cds-menu-item label="Additional action"></cds-menu-item>
        </cds-menu>
      </cds-combo-button>
    `);

    const primaryButton = el.shadowRoot?.querySelector('cds-button');

    expect(clicked).to.be.false;
    primaryButton?.click();
    await el.updateComplete;
    expect(clicked).to.be.true;
    await expect(el).shadowDom.to.equalSnapshot();
  });

  it('should disable button if disabled prop is passed', async () => {
    const el = await fixture(html`
      <cds-combo-button label="Primary action" disabled>
        <cds-menu>
          <cds-menu-item label="Additional action"></cds-menu-item>
        </cds-menu>
      </cds-combo-button>
    `);

    const triggerButton = el.shadowRoot?.querySelector('cds-icon-button');

    expect(triggerButton).to.have.attribute('disabled');
    await expect(el).shadowDom.to.equalSnapshot();
  });
});

describe('Menu behavior', () => {
  it('should open a menu on click on the trigger button', async () => {
    const el = await fixture(html`
      <cds-combo-button label="Primary action">
        <cds-menu>
          <cds-menu-item label="Additional action"></cds-menu-item>
        </cds-menu>
      </cds-combo-button>
    `);

    const triggerButton = el.shadowRoot?.querySelector('cds-icon-button');
    const menu = el.querySelector('cds-menu');

    // Menu should be closed initially
    expect(menu?.open).to.be.false;

    // Click the trigger button
    triggerButton?.click();
    await el.updateComplete;

    // Wait for menu to open
    await waitUntil(
      () => menu?.open === true,
      'Menu should open after trigger click'
    );

    expect(menu?.open).to.be.true;
    await expect(el).shadowDom.to.equalSnapshot();
  });

  it('should toggle menu when trigger button is clicked multiple times', async () => {
    const el = await fixture(html`
      <cds-combo-button label="Primary action">
        <cds-menu>
          <cds-menu-item label="Additional action"></cds-menu-item>
        </cds-menu>
      </cds-combo-button>
    `);

    const triggerButton = el.shadowRoot?.querySelector('cds-icon-button');
    const menu = el.querySelector('cds-menu');

    triggerButton?.click();
    await el.updateComplete;
    await waitUntil(
      () => menu?.open === true,
      'Menu should open on first click'
    );
    expect(menu?.open).to.be.true;

    triggerButton?.click();
    await el.updateComplete;
    await waitUntil(
      () => menu?.open === false,
      'Menu should close on second click'
    );
    expect(menu?.open).to.be.false;

    // Third click - opens menu again
    triggerButton?.click();
    await el.updateComplete;
    await waitUntil(
      () => menu?.open === true,
      'Menu should open on third click'
    );
    expect(menu?.open).to.be.true;
    await expect(el).shadowDom.to.equalSnapshot();
  });

  it('should pass size to menu when size property changes', async () => {
    const el = await fixture(html`
      <cds-combo-button label="Primary action" size="sm">
        <cds-menu>
          <cds-menu-item label="Additional action"></cds-menu-item>
        </cds-menu>
      </cds-combo-button>
    `);

    const menu = el.querySelector('cds-menu');
    expect(menu).to.have.attribute('size', 'sm');

    el.size = 'lg';
    await el.updateComplete;

    expect(menu).to.have.attribute('size', 'lg');
    await expect(el).shadowDom.to.equalSnapshot();
  });

  it('should handle menu item clicks', async () => {
    let menuItemClicked = false;
    const el = await fixture(html`
      <cds-combo-button
        label="Primary action"
        @click=${(event) => {
          if (event.target.tagName === 'CDS-MENU-ITEM') {
            menuItemClicked = true;
          }
        }}>
        <cds-menu>
          <cds-menu-item label="Additional action"></cds-menu-item>
        </cds-menu>
      </cds-combo-button>
    `);

    const triggerButton = el.shadowRoot?.querySelector('cds-icon-button');
    triggerButton?.click();
    await el.updateComplete;

    const menuItem = el.querySelector('cds-menu-item');

    expect(menuItemClicked).to.be.false;

    menuItem?.click();
    await el.updateComplete;

    await waitUntil(
      () => menuItemClicked === true,
      'Menu item click was not processed'
    );

    expect(menuItemClicked).to.be.true;
    await expect(el).shadowDom.to.equalSnapshot();
  });
});

describe('Edge cases', () => {
  it('should handle disabled state properly', async () => {
    const el = await fixture(html`
      <cds-combo-button label="Primary action" disabled>
        <cds-menu>
          <cds-menu-item label="Additional action"></cds-menu-item>
        </cds-menu>
      </cds-combo-button>
    `);

    const triggerButton = el.shadowRoot?.querySelector('cds-icon-button');
    const menu = el.querySelector('cds-menu');

    triggerButton?.click();
    await el.updateComplete;

    await new Promise((resolve) => setTimeout(resolve, 100));

    expect(menu?.open).to.be.false;
    await expect(el).shadowDom.to.equalSnapshot();
  });

  it('should handle empty menu gracefully', async () => {
    const el = await fixture(html`
      <cds-combo-button label="Primary action">
        <cds-menu> </cds-menu>
      </cds-combo-button>
    `);

    const triggerButton = el.shadowRoot?.querySelector('cds-icon-button');
    const menu = el.querySelector('cds-menu');

    triggerButton?.click();
    await el.updateComplete;
    await waitUntil(() => menu?.open === true, 'Empty menu should still open');

    expect(menu?.open).to.be.true;
    await expect(el).shadowDom.to.equalSnapshot();
  });

  it('should handle dynamic label changes', async () => {
    const el = await fixture(html`
      <cds-combo-button label="Initial">
        <cds-menu>
          <cds-menu-item label="Additional action"></cds-menu-item>
        </cds-menu>
      </cds-combo-button>
    `);

    const primaryButton = el.shadowRoot?.querySelector('cds-button');
    expect(primaryButton?.textContent?.trim()).to.equal('Initial');

    el.label = 'Updated';
    await el.updateComplete;

    expect(primaryButton?.textContent?.trim()).to.equal('Updated');
    await expect(el).shadowDom.to.equalSnapshot();
  });
});

describe('automated verification testing', () => {
  it('should have no Axe violations', async () => {
    const el = await fixture(html`
      <cds-combo-button label="Primary action">
        <cds-menu>
          <cds-menu-item label="Additional action"></cds-menu-item>
        </cds-menu>
      </cds-combo-button>
    `);
    await expect(el).to.be.accessible();
  });
});
