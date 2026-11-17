/**
 * Copyright IBM Corp. 2025, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import '@carbon/web-components/es/components/menu/index.js';

import { expect, fixture, html } from '@open-wc/testing';

describe('cds-menu', () => {
  it('should render with default properties', async () => {
    const el = await fixture(html`<cds-menu></cds-menu>`);
    expect(el).to.exist;
  });

  it('should apply custom class to the outermost element', async () => {
    const el = await fixture(html`<cds-menu class="custom-class"></cds-menu>`);
    expect(el).to.have.class('custom-class');
  });

  it('should have an id when one is provided', async () => {
    const el = await fixture(html`<cds-menu id="test-id"></cds-menu>`);
    expect(el).to.have.attribute('id', 'test-id');
  });

  it('should be open if open is supplied', async () => {
    const el = await fixture(html`<cds-menu open></cds-menu>`);
    expect(el.open).to.be.true;
    const menu = el.shadowRoot.querySelector('.cds--menu');
    expect(menu).to.have.class('cds--menu--open');
  });

  it('should be closed if open is not supplied', async () => {
    const el = await fixture(html`<cds-menu></cds-menu>`);
    const menu = el.shadowRoot.querySelector('.cds--menu');
    expect(el.open).to.be.false;
    expect(menu).to.not.have.class('cds--menu--open');
  });

  it('should change size based on size prop', async () => {
    const el = await fixture(html`<cds-menu size="lg"></cds-menu>`);
    const menu = el.shadowRoot.querySelector('.cds--menu');
    expect(menu).to.have.class('cds--menu--lg');
  });

  const renderNestedMenu = () =>
    fixture(html`
      <cds-menu .size=${'md'} .x=${[20, 60]} .y=${[20, 60]} open>
        <cds-menu-item label="Level 1">
          <cds-menu-item-group slot="submenu">
            <cds-menu-item label="Level 2">
              <cds-menu-item-group slot="submenu">
                <cds-menu-item label="Level 3"></cds-menu-item>
              </cds-menu-item-group>
            </cds-menu-item>
          </cds-menu-item-group>
        </cds-menu-item>
      </cds-menu>
    `);

  it('should render nested submenus with the root menu size', async () => {
    const el = await renderNestedMenu();
    await el.updateComplete;

    const getItem = (label) =>
      el.querySelector(`cds-menu-item[label="${label}"]`);

    const openSubmenu = async (item) => {
      item._openSubmenu();
      await item.updateComplete;
      const submenu = item.shadowRoot.querySelector('cds-menu');
      await submenu.updateComplete;
      return submenu;
    };

    const submenus = [
      await openSubmenu(getItem('Level 1')),
      await openSubmenu(getItem('Level 2')),
    ];

    submenus.forEach((submenu) => {
      expect(submenu.size).to.equal('md');
    });

    const rootItemHeight = getItem('Level 1').getBoundingClientRect().height;
    ['Level 2', 'Level 3'].forEach((label) => {
      expect(getItem(label).getBoundingClientRect().height).to.equal(
        rootItemHeight
      );
    });
  });

  it('should update nested submenus when the root menu size changes', async () => {
    const el = await renderNestedMenu();
    await el.updateComplete;

    el.size = 'xs';
    await el.updateComplete;

    for (const label of ['Level 1', 'Level 2']) {
      const item = el.querySelector(`cds-menu-item[label="${label}"]`);
      await item.updateComplete;
      expect(item.shadowRoot.querySelector('cds-menu').size).to.equal('xs');
    }
  });

  it('should set aria-label attribute', async () => {
    const el = await fixture(html`<cds-menu label="Test Menu"></cds-menu>`);
    const menu = el.shadowRoot.querySelector('[role="menu"]');
    expect(menu).to.have.attribute('aria-label', 'Test Menu');
  });

  it('should apply border class when border prop is true', async () => {
    const el = await fixture(html`<cds-menu border></cds-menu>`);
    const menu = el.shadowRoot.querySelector('.cds--menu');
    expect(menu).to.have.class('cds--menu--border');
  });

  it('should not apply border class when border prop is false', async () => {
    const el = await fixture(html`<cds-menu></cds-menu>`);
    const menu = el.shadowRoot.querySelector('.cds--menu');
    expect(menu).to.not.have.class('cds--menu--border');
  });

  it('should apply background token class when backgroundToken is "background"', async () => {
    const el = await fixture(
      html`<cds-menu background-token="background"></cds-menu>`
    );
    const menu = el.shadowRoot.querySelector('.cds--menu');
    expect(menu).to.have.class('cds--menu--background-token__background');
  });

  it('should not apply background token class when backgroundToken is "layer"', async () => {
    const el = await fixture(
      html`<cds-menu background-token="layer"></cds-menu>`
    );
    const menu = el.shadowRoot.querySelector('.cds--menu');
    expect(menu).to.not.have.class('cds--menu--background-token__background');
  });

  describe('firstUpdated', () => {
    it('should set isRtl based on direction', async () => {
      const el = await fixture(html`<cds-menu direction="rtl"></cds-menu>`);
      await el.updateComplete;
      expect(el.isRtl).to.be.true;
    });

    it('should set isRoot from context', async () => {
      const el = await fixture(html`<cds-menu></cds-menu>`);
      await el.updateComplete;
      expect(el.isRoot).to.be.true;
    });

    it('should create a new context if isChild is true', async () => {
      const el = await fixture(html`<cds-menu isChild></cds-menu>`);
      await el.updateComplete;
      expect(el.context.isRoot).to.be.false;
    });
  });

  describe('positioning', () => {
    it('should adjust position when the menu cannot open to the bottom right', async () => {
      const nearMaxX = window.innerWidth - 10;
      const nearMaxY = window.innerHeight - 10;

      const el = await fixture(html`
        <cds-menu .x=${nearMaxX} .y=${nearMaxY} open>
          <cds-menu-item label="Item 1"></cds-menu-item>
        </cds-menu>
      `);

      await el.updateComplete;

      expect(el.position[0]).to.be.a('number');
      expect(el.position[1]).to.be.a('number');
      expect(el.position[0]).to.be.at.most(nearMaxX);
      expect(el.position[1]).to.be.at.most(nearMaxY);
    });

    it('should leave viewport coordinates untouched in LTR', async () => {
      const el = await fixture(html`<cds-menu></cds-menu>`);
      await el.updateComplete;

      expect(el._toInlineRange([100, 250])).to.deep.equal([100, 250]);
    });

    it('should mirror viewport coordinates in RTL', async () => {
      const originalDir = document.dir;
      document.dir = 'rtl';

      const el = await fixture(html`<cds-menu></cds-menu>`);
      await el.updateComplete;

      const max = window.innerWidth;

      expect(el._toInlineRange([100, 250])).to.deep.equal([
        max - 250,
        max - 100,
      ]);

      document.dir = originalDir;
    });

    it('should not mirror a root menu x in RTL', async () => {
      const originalDir = document.dir;
      document.dir = 'rtl';

      const el = await fixture(html`
        <cds-menu open>
          <cds-menu-item label="Item 1"></cds-menu-item>
        </cds-menu>
      `);
      await el.updateComplete;

      // `_fitValue` floors every result at `spacing` via
      // bestOption >= this.spacing ? bestOption : this.spacing;
      expect(el.position[0]).to.equal(el.spacing);

      document.dir = originalDir;
    });

    ['ltr', 'rtl'].forEach((dir) => {
      describe(`in ${dir.toUpperCase()}`, () => {
        let originalDir;

        beforeEach(() => {
          originalDir = document.dir;
          document.dir = dir;
        });

        afterEach(() => {
          document.dir = originalDir;
        });

        const getSurfaceRect = (menu) =>
          menu.shadowRoot.querySelector('.cds--menu').getBoundingClientRect();

        const openSubmenu = async (item) => {
          item._openSubmenu();
          await item.updateComplete;
          const submenu = item.shadowRoot.querySelector('cds-menu');
          await submenu.updateComplete;
          return submenu;
        };

        it('should open nested submenus towards the inline end', async () => {
          const el = await fixture(html`
            <cds-menu .x=${[20, 60]} .y=${[20, 60]} open>
              <cds-menu-item label="Level 1">
                <cds-menu-item-group slot="submenu">
                  <cds-menu-item label="Level 2">
                    <cds-menu-item-group slot="submenu">
                      <cds-menu-item label="Level 3"></cds-menu-item>
                    </cds-menu-item-group>
                  </cds-menu-item>
                </cds-menu-item-group>
              </cds-menu-item>
            </cds-menu>
          `);
          await el.updateComplete;

          const level1 = el.querySelector('cds-menu-item[label="Level 1"]');
          const level2 = el.querySelector('cds-menu-item[label="Level 2"]');

          const submenu1 = await openSubmenu(level1);
          const submenu2 = await openSubmenu(level2);

          [
            [level1, submenu1],
            [level2, submenu2],
          ].forEach(([item, submenu]) => {
            const itemRect = item.getBoundingClientRect();
            const submenuRect = getSurfaceRect(submenu);

            if (dir === 'rtl') {
              expect(submenuRect.right).to.be.closeTo(itemRect.left, 8);
              expect(submenuRect.left).to.be.below(itemRect.left);
            } else {
              expect(submenuRect.left).to.be.closeTo(itemRect.right, 8);
              expect(submenuRect.right).to.be.above(itemRect.right);
            }
          });
        });
      });
    });
  });

  describe('nested keyboard navigation', () => {
    ['ltr', 'rtl'].forEach((dir) => {
      describe(`in ${dir.toUpperCase()}`, () => {
        let originalDir;

        beforeEach(() => {
          originalDir = document.dir;
          document.dir = dir;
        });

        afterEach(() => {
          document.dir = originalDir;
        });

        const renderNested = async () => {
          const el = await fixture(html`
            <cds-menu .x=${[300, 340]} .y=${[20, 60]} open>
              <cds-menu-item label="Level 1">
                <cds-menu-item-group slot="submenu">
                  <cds-menu-item label="Level 2">
                    <cds-menu-item-group slot="submenu">
                      <cds-menu-item label="Level 3"></cds-menu-item>
                    </cds-menu-item-group>
                  </cds-menu-item>
                </cds-menu-item-group>
              </cds-menu-item>
            </cds-menu>
          `);
          await el.updateComplete;
          return el;
        };

        const getItem = (el, label) =>
          el.querySelector(`cds-menu-item[label="${label}"]`);

        const press = async (target, key) => {
          target.dispatchEvent(
            new KeyboardEvent('keydown', { key, bubbles: true, composed: true })
          );
          await new Promise((resolve) => setTimeout(resolve));
        };

        it('should open nested submenus with ArrowRight', async () => {
          const el = await renderNested();
          const level1 = getItem(el, 'Level 1');
          const level2 = getItem(el, 'Level 2');

          level1.focus();
          await press(level1, 'ArrowRight');
          expect(level1.submenuOpen).to.be.true;
          expect(document.activeElement.label).to.equal('Level 2');

          await press(level2, 'ArrowRight');
          expect(level2.submenuOpen).to.be.true;
          expect(document.activeElement.label).to.equal('Level 3');
        });

        it('should close a submenu with ArrowLeft and focus its parent item', async () => {
          const el = await renderNested();
          const level1 = getItem(el, 'Level 1');
          const level2 = getItem(el, 'Level 2');

          level1.focus();
          await press(level1, 'ArrowRight');
          await press(level2, 'ArrowLeft');

          expect(level1.submenuOpen).to.be.false;
          expect(document.activeElement.label).to.equal('Level 1');
          expect(el.open).to.be.true;
        });
      });
    });
  });

  describe('closing behavior', () => {
    it('should dispatch a close event when focus leaves the root menu', async () => {
      const el = await fixture(html`<cds-menu open></cds-menu>`);
      const outside = document.createElement('button');
      document.body.appendChild(outside);

      const closeEvents = [];
      el.addEventListener('cds-menu-closed', (event) => {
        closeEvents.push(event);
      });

      el.dispatchEvent(
        new FocusEvent('focusout', {
          bubbles: true,
          relatedTarget: outside,
        })
      );
      await el.updateComplete;

      expect(closeEvents.length).to.be.at.least(1);
      expect(
        closeEvents[closeEvents.length - 1].detail.triggerEventType
      ).to.equal('focusout');
      outside.remove();
    });

    it('should respond to root close requests from menu items', async () => {
      const el = await fixture(html`
        <cds-menu open>
          <cds-menu-item label="Item 1"></cds-menu-item>
        </cds-menu>
      `);
      const closeEvents = [];
      el.addEventListener('cds-menu-closed', (event) => {
        closeEvents.push(event);
      });

      const triggerEvent = new MouseEvent('click', {
        bubbles: true,
        composed: true,
      });
      el.dispatchEvent(
        new CustomEvent('cds-menu-close-root-request', {
          bubbles: true,
          composed: true,
          detail: { triggerEvent },
        })
      );
      await el.updateComplete;

      expect(closeEvents.length).to.be.at.least(1);
      expect(
        closeEvents[closeEvents.length - 1].detail.triggerEventType
      ).to.equal('click');
    });
  });

  describe('internal close helpers', () => {
    it('should include trigger metadata when dispatching a close event', async () => {
      const el = await fixture(html`<cds-menu open></cds-menu>`);
      const closeEvents = [];
      el.addEventListener('cds-menu-closed', (event) =>
        closeEvents.push(event)
      );

      const triggerEvent = new KeyboardEvent('keydown', { key: 'Escape' });
      el.dispatchCloseEvent(triggerEvent);

      expect(closeEvents.length).to.be.greaterThan(0);
      expect(
        closeEvents[closeEvents.length - 1].detail.triggerEventType
      ).to.equal('keydown');
    });

    it('should delegate root close requests to dispatchCloseEvent', async () => {
      const el = await fixture(html`<cds-menu open></cds-menu>`);
      const triggerEvent = new MouseEvent('click');
      const handled = [];
      const originalDispatch = el.dispatchCloseEvent;
      el.dispatchCloseEvent = (event) => {
        handled.push(event);
      };

      el._handleRootCloseRequest(
        new CustomEvent('cds-menu-close-root-request', {
          detail: { triggerEvent },
        })
      );

      expect(handled[0]).to.equal(triggerEvent);
      el.dispatchCloseEvent = originalDispatch;
    });

    it('should clear inline styles when handleClose is invoked', async () => {
      const el = await fixture(html`<cds-menu open></cds-menu>`);
      el.style.insetInlineStart = '10px';
      el.style.insetInlineEnd = '4px';
      el.style.insetBlockStart = '6px';

      el._handleClose();

      expect(el.style.insetInlineStart).to.equal('');
      expect(el.style.insetInlineEnd).to.equal('');
      expect(el.style.insetBlockStart).to.equal('');
    });
  });
});
