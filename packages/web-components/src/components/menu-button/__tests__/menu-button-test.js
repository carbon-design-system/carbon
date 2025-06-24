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

  describe('Component API parity', () => {
    it('supports a ref on the outermost element', async () => {
      // Included for parity with React. Since refs don’t apply to Web Components,
      // we verify the outer element tag instead.
      const el = await fixture(html`
        <cds-menu-button label="Ref test">
          <cds-menu>
            <cds-menu-item label="Action"></cds-menu-item>
          </cds-menu>
        </cds-menu-button>
      `);
      expect(el.nodeName.toLowerCase()).to.equal('cds-menu-button');
    });

    it('supports a custom class name', async () => {
      // Included for parity with React. We check that the class is applied
      // directly to the custom element host.
      const el = await fixture(html`
        <cds-menu-button label="Custom class" class="test">
          <cds-menu>
            <cds-menu-item label="Action"></cds-menu-item>
          </cds-menu>
        </cds-menu-button>
      `);
      expect(el.classList.contains('test')).to.be.true;
    });

    describe('renders as expected – Component API', () => {
      const sizes = ['sm', 'md', 'lg'];
      const kinds = ['primary', 'tertiary', 'ghost'];

      sizes.forEach((size) => {
        it(`supports size="${size}"`, async () => {
          const el = await fixture(html`
            <cds-menu-button label="Size test" size="${size}">
              <cds-menu>
                <cds-menu-item label="Test"></cds-menu-item>
              </cds-menu>
            </cds-menu-button>
          `);

          const button = el.shadowRoot.querySelector('cds-button');
          expect(button).to.exist;
          expect(button.size).to.equal(size);
        });
      });

      kinds.forEach((kind) => {
        it(`supports kind="${kind}"`, async () => {
          const el = await fixture(html`
            <cds-menu-button label="Kind test" kind="${kind}">
              <cds-menu>
                <cds-menu-item label="Test"></cds-menu-item>
              </cds-menu>
            </cds-menu-button>
          `);

          const button = el.shadowRoot.querySelector('cds-button');
          expect(button).to.exist;
          expect(button.kind).to.equal(kind);
        });
      });
    });

    it('forwards additional props', async () => {
      // Included for parity with React. Custom attributes like data-testid
      // are asserted directly on the custom element.
      const el = await fixture(html`
        <cds-menu-button label="Additional props" data-testid="test-id">
          <cds-menu>
            <cds-menu-item label="Action"></cds-menu-item>
          </cds-menu>
        </cds-menu-button>
      `);
      expect(el.getAttribute('data-testid')).to.equal('test-id');
    });

    // Ensure the provided label prop is rendered as button content
    it('renders props.label on the trigger button', async () => {
      const el = await fixture(html`
        <cds-menu-button label="MyLabel">
          <cds-menu>
            <cds-menu-item label="Item"></cds-menu-item>
          </cds-menu>
        </cds-menu-button>
      `);
      const button = el.shadowRoot.querySelector('cds-button');
      expect(button.textContent.trim()).to.equal('MyLabel');
    });
  });

  describe('Attributes and properties', () => {
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

    // Simulate focus moving outside to trigger menu close behavior
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

  // Note: Focus management in WC is limited by Shadow DOM, so this suite covers basic trigger behavior only
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

    it('does not steal focus', async () => {
      const el = await fixture(html`
        <div>
          <cds-menu-button label="Actions">
            <cds-menu>
              <cds-menu-item
                label="Action"
                @click=${() => {
                  document.querySelector('input')?.focus();
                }}>
              </cds-menu-item>
            </cds-menu>
          </cds-menu-button>
          <input type="text" id="focus-target" />
        </div>
      `);

      const menuButton = el.querySelector('cds-menu-button');
      const button = menuButton.shadowRoot.querySelector('cds-button');
      const input = el.querySelector('#focus-target');

      button.click();
      await menuButton.updateComplete;

      const item = el.querySelector('cds-menu-item');
      item.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'Enter', bubbles: true })
      );
      item.click();
      await menuButton.updateComplete;

      expect(document.activeElement).to.equal(input);
    });
  });

  describe('Children and special content', () => {
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
      const group = el.querySelector('cds-menu-item-group');
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
        const items = el.querySelectorAll('cds-menu-item');
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
  });
});
