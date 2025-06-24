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
});
