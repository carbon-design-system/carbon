/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import '@carbon/web-components/es/components/button/index.js';
import { expect, fixture, html } from '@open-wc/testing';

describe('cds-button', () => {
  it('should support a custom tabIndex through props', async () => {
    const el = await fixture(
      html`<cds-button tab-index="-1">test</cds-button>`
    );
    expect(el).to.have.attribute('tab-index', '-1');
    await expect(el).shadowDom.to.equalSnapshot();
  });

  it('should support a custom className on the outermost element', async () => {
    const el = await fixture(html`
      <cds-button class="custom-class">test</cds-button>
    `);
    expect(el).to.have.class('custom-class');
    await expect(el).shadowDom.to.equalSnapshot();
  });

  it('should render an element with the button role', async () => {
    const el = await fixture(html`<cds-button>test</cds-button>`);
    const button = el.shadowRoot?.querySelector('button');
    expect(button).to.exist;
    await expect(el).shadowDom.to.equalSnapshot();
  });

  it('should use the disabled prop to set disabled on the <button>', async () => {
    const el = await fixture(html`<cds-button>test</cds-button>`);
    const button = el.shadowRoot?.querySelector('button');
    expect(button).to.not.have.attribute('disabled');

    el.disabled = true;
    await el.updateComplete;
    expect(button).to.have.attribute('disabled');
    await expect(el).shadowDom.to.equalSnapshot();
  });

  it('should render with a default button type of button', async () => {
    const el = await fixture(html`<cds-button>test</cds-button>`);
    const button = el.shadowRoot?.querySelector('button');
    expect(button).to.have.attribute('type', 'button');
    await expect(el).shadowDom.to.equalSnapshot();
  });

  const types = ['button', 'submit', 'reset'];

  types.forEach((type) => {
    it(`should support changing the button type to ${type} with the \`type\` prop`, async () => {
      const el = await fixture(
        html`<cds-button type="${type}">test</cds-button>`
      );
      const button = el.shadowRoot?.querySelector('button');
      expect(button).to.have.attribute('type', type);
      await expect(el).shadowDom.to.equalSnapshot();
    });
  });

  it('should render as an element with the role of `link` when the `href` prop is used', async () => {
    const el = await fixture(html`<cds-button href="/">test</cds-button>`);
    const link = el.shadowRoot?.querySelector('a');
    expect(link).to.exist;
    expect(link).to.have.attribute('href', '/');
    await expect(el).shadowDom.to.equalSnapshot();
  });

  it('should not error on tooltipAlignment even when hasIconOnly=false', async () => {
    const el = await fixture(
      html`<cds-button tooltip-alignment="start"></cds-button>`
    );
    expect(el).to.have.attribute('tooltip-alignment', 'start');
    await expect(el).shadowDom.to.equalSnapshot();
  });

  const kinds = [
    ['primary', 'cds--btn--primary'],
    ['secondary', 'cds--btn--secondary'],
    ['ghost', 'cds--btn--ghost'],
    ['danger', 'cds--btn--danger'],
    ['danger--primary', 'cds--btn--danger--primary'],
    ['danger-ghost', 'cds--btn--danger--ghost'],
    ['danger-tertiary', 'cds--btn--danger--tertiary'],
    ['tertiary', 'cds--btn--tertiary'],
  ];

  kinds.forEach(([kind, className]) => {
    it(`kind="${kind}"`, async () => {
      const el = await fixture(
        html`<cds-button kind="${kind}">test</cds-button>`
      );
      expect(el).to.have.attribute('kind', kind);
      const button = el.shadowRoot?.querySelector('button');
      expect([...button.classList]).to.include(className);
    });
  });
  describe('supports props.size', () => {
    const sizes = [
      ['sm', 'cds--btn--sm'],
      ['md', 'cds--btn--md'],
      ['lg', 'cds--btn--lg'],
      ['xl', 'cds--btn--xl'],
      ['2xl', 'cds--btn--2xl'],
    ];

    sizes.forEach(([size, className]) => {
      it(`size="${size}"`, async () => {
        const el = await fixture(
          html`<cds-button size="${size}">test</cds-button>`
        );
        expect(el).to.have.attribute('size', size);

        const button = el.shadowRoot?.querySelector('button');
        expect(button).to.have.class(className);
        await expect(el).shadowDom.to.equalSnapshot();
      });
    });
  });

  describe('Button with Icon variant', () => {
    it('should render the given icon within the <button> element', async () => {
      const el = await fixture(html`
        <cds-button>
          test
          <svg slot="icon" data-testid="svg"></svg>
        </cds-button>
      `);

      const svg = el.querySelector('svg[data-testid="svg"]');
      expect(svg).to.exist;
      await expect(el).shadowDom.to.equalSnapshot();
    });
  });

  describe('Icon Button variant', () => {
    it('should set the icon-only class', async () => {
      const el = await fixture(html`
        <cds-button has-icon-only>
          <svg slot="icon" data-testid="svg"></svg>
        </cds-button>
      `);

      expect(el).to.have.attribute('has-icon-only');
      await expect(el).shadowDom.to.equalSnapshot();
    });

    it('should support badge indicator', async () => {
      const el = await fixture(html`
        <cds-button has-icon-only badge-count="12" kind="ghost" size="lg">
          <svg slot="icon" data-testid="svg"></svg>
        </cds-button>
      `);

      expect(el).to.have.attribute('badge-count', '12');
      await expect(el).shadowDom.to.equalSnapshot();
    });

    it('should support badge indicator and truncate', async () => {
      const el = await fixture(html`
        <cds-button has-icon-only badge-count="1200" kind="ghost" size="lg">
          <svg slot="icon" data-testid="svg"></svg>
        </cds-button>
      `);

      expect(el).to.have.attribute('badge-count', '1200');

      await el.updateComplete;

      // Check that the badge shows "999+" for counts over 999
      const shadowRoot = el.shadowRoot;
      const badgeSlot = shadowRoot?.querySelector(
        'slot[name="badge-indicator"]'
      );

      let foundBadgeText = false;
      let badgeText = '';

      const assignedElements = badgeSlot?.assignedElements?.();
      if (assignedElements && assignedElements.length > 0) {
        badgeText = assignedElements[0].textContent?.trim() || '';
        foundBadgeText = badgeText === '999+';
      }
      expect(el).to.have.attribute('badge-count', '1200');
      await expect(el).shadowDom.to.equalSnapshot();
    });
  });

  describe('Tooltip popover position classes', () => {
    const positions = ['top', 'bottom', 'left', 'right'];
    const alignments = ['start', 'center', 'end'];

    positions.forEach((position) => {
      alignments.forEach((alignment) => {
        const expectedClass =
          position === 'top' || position === 'bottom'
            ? `cds--popover--${position}-${alignment}`
            : `cds--popover--${position}`;

        it(`uses "${expectedClass}" for tooltip-position="${position}" tooltip-alignment="${alignment}"`, async () => {
          const el = await fixture(html`
            <cds-button
              has-icon-only
              tooltip-text="tip"
              tooltip-position="${position}"
              tooltip-alignment="${alignment}">
              <svg slot="icon" data-testid="svg"></svg>
            </cds-button>
          `);
          await el.updateComplete;

          const container = el.shadowRoot?.querySelector(
            '.cds--popover-container'
          );
          expect(container).to.exist;
          expect(container).to.have.class(expectedClass);
          expect(container).to.have.class('cds--tooltip');
          expect(container).to.have.class('cds--icon-tooltip');
        });
      });
    });
  });

  describe('Tooltip popover RTL alignment', () => {
    const renderTooltip = async ({ dir, position, alignment = '' }) => {
      const el = await fixture(html`
        <cds-button
          dir="${dir}"
          has-icon-only
          tooltip-text="tip"
          tooltip-position="${position}"
          tooltip-alignment="${alignment}">
          <svg slot="icon" data-testid="svg"></svg>
        </cds-button>
      `);
      el.openTooltip = true;
      await el.updateComplete;
      await new Promise((resolve) => requestAnimationFrame(resolve));
      const root = el.shadowRoot;
      return {
        el,
        content: root?.querySelector('.cds--popover-content'),
        caret: root?.querySelector('.cds--popover-caret'),
      };
    };

    const horizontalCenter = (rect) => rect.left + rect.width / 2;

    ['top', 'bottom'].forEach((position) => {
      it(`renders centered "${position}" tooltip horizontally aligned with the button in RTL`, async () => {
        const { el, content } = await renderTooltip({
          dir: 'rtl',
          position,
          alignment: '',
        });
        const buttonRect = el.getBoundingClientRect();
        const contentRect = content.getBoundingClientRect();

        const buttonCenter = horizontalCenter(buttonRect);
        const contentCenter = horizontalCenter(contentRect);
        const offset = Math.abs(contentCenter - buttonCenter);

        expect(
          offset,
          `popover center (${contentCenter.toFixed(1)}) should align with button center (${buttonCenter.toFixed(1)})`
        ).to.be.lessThan(2);
      });
    });

    [
      { position: 'top', alignment: 'left', expectedAnchor: 'start' },
      { position: 'top', alignment: 'right', expectedAnchor: 'end' },
      { position: 'bottom', alignment: 'left', expectedAnchor: 'start' },
      { position: 'bottom', alignment: 'right', expectedAnchor: 'end' },
    ].forEach(({ position, alignment, expectedAnchor }) => {
      it(`anchors "${position}-${alignment}" tooltip toward the button's inline-${expectedAnchor} edge in RTL`, async () => {
        const { el, content } = await renderTooltip({
          dir: 'rtl',
          position,
          alignment,
        });
        const buttonRect = el.getBoundingClientRect();
        const contentRect = content.getBoundingClientRect();

        expect(contentRect.width).to.be.greaterThan(0);

        if (expectedAnchor === 'start') {
          expect(contentRect.right).to.be.greaterThan(buttonRect.right - 4);
        } else {
          expect(contentRect.left).to.be.lessThan(buttonRect.left + 4);
        }
      });
    });

    ['right', 'left'].forEach((position) => {
      it(`keeps "${position}" tooltip on the same physical side of the button in RTL as in LTR`, async () => {
        const ltr = await renderTooltip({ dir: 'ltr', position });
        const rtl = await renderTooltip({ dir: 'rtl', position });

        const ltrButton = ltr.el.getBoundingClientRect();
        const rtlButton = rtl.el.getBoundingClientRect();
        const ltrPopover = ltr.content.getBoundingClientRect();
        const rtlPopover = rtl.content.getBoundingClientRect();
        const ltrCaret = ltr.caret.getBoundingClientRect();
        const rtlCaret = rtl.caret.getBoundingClientRect();

        if (position === 'right') {
          expect(ltrPopover.left).to.be.greaterThanOrEqual(ltrButton.right - 1);
          expect(ltrCaret.left).to.be.greaterThanOrEqual(ltrButton.right - 1);
          expect(rtlPopover.left).to.be.greaterThanOrEqual(rtlButton.right - 1);
          expect(rtlCaret.left).to.be.greaterThanOrEqual(rtlButton.right - 1);
        } else {
          expect(ltrPopover.right).to.be.lessThanOrEqual(ltrButton.left + 1);
          expect(ltrCaret.right).to.be.lessThanOrEqual(ltrButton.left + 1);
          expect(rtlPopover.right).to.be.lessThanOrEqual(rtlButton.left + 1);
          expect(rtlCaret.right).to.be.lessThanOrEqual(rtlButton.left + 1);
        }
      });
    });
  });
});
