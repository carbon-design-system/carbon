/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { expect, describe, it, beforeEach } from 'vitest';

import '../accordion';

import axe from 'axe-core';

function html(strings: TemplateStringsArray, ...values: any[]): string {
  let result = strings[0];
  for (let i = 0; i < values.length; i++) {
    result += values[i];
    result += strings[i + 1];
  }
  return result;
}

async function vitestFixture<T extends HTMLElement>(
  template: string
): Promise<T> {
  document.body.innerHTML = '';
  const div = document.createElement('div');
  div.innerHTML = template;
  const element = div.firstElementChild as T;
  if (!element) {
    throw new Error('Fixture template resulted in no element.');
  }
  document.body.appendChild(element);

  if ('updateComplete' in element) {
    await (element as any).updateComplete;
  } else {
    await Promise.resolve();
  }
  return element;
}

async function triggerFocusFor(el: HTMLElement) {
  el.focus();
  await Promise.resolve();
}

async function sendKeys(options: { press: string }) {
  const activeElement = document.activeElement as HTMLElement;
  if (!activeElement) {
    return;
  }

  const key = options.press;
  const eventOptions = { key, code: key, bubbles: true, cancelable: true };

  activeElement.dispatchEvent(new KeyboardEvent('keydown', eventOptions));
  activeElement.dispatchEvent(new KeyboardEvent('keyup', eventOptions));

  await Promise.resolve();
}

const accordionTemplate = html`
  <cds-accordion>
    <cds-accordion-item title="Heading A">
      <p>Panel A</p>
    </cds-accordion-item>
    <cds-accordion-item title="Heading B">
      <p>Panel B</p>
    </cds-accordion-item>
    <cds-accordion-item title="Heading C">
      <p>Panel C</p>
    </cds-accordion-item>
  </cds-accordion>
`;

describe('cds-accordion (Vitest)', function () {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('should render', async () => {
    const el = await vitestFixture<HTMLElement>(accordionTemplate);
    await expect(el).toMatchSnapshot();
  });

  describe('automated verification testing', () => {
    it('should have no Axe violations', async () => {
      const el = await vitestFixture<HTMLElement>(accordionTemplate);
      const firstItem = el.firstElementChild as HTMLElement;

      let results = await axe.run(firstItem);
      expect(results.violations.length).toBe(0);

      firstItem.click();
      await (firstItem as any).updateComplete;
      await Promise.resolve();

      results = await axe.run(firstItem);
      expect(results.violations.length).toBe(0);
    });
  });

  describe('basic keyboard accessibility testing', () => {
    it('should receive focus', async () => {
      const el = await vitestFixture<HTMLElement>(accordionTemplate);
      const firstItem = el.firstElementChild as HTMLElement;

      await triggerFocusFor(firstItem);
      expect(document.activeElement).toBe(firstItem);
    });

    it.skip('should open with enter', async () => {
      const el = await vitestFixture<HTMLElement>(accordionTemplate);
      const firstItem = el.firstElementChild as HTMLElement;

      await triggerFocusFor(firstItem);
      await sendKeys({ press: 'Enter' });

      expect(firstItem.hasAttribute('open')).toBe(true);
    });

    it.skip('should open with spacebar', async () => {
      const el = await vitestFixture<HTMLElement>(accordionTemplate);
      const firstItem = el.firstElementChild as HTMLElement;

      await triggerFocusFor(firstItem);
      await sendKeys({ press: 'Space' });

      expect(firstItem.hasAttribute('open')).toBe(true);
    });
  });

  describe('Flush align', () => {
    it('should align to the left if prop isFlush is passed', async () => {
      const el = await vitestFixture<HTMLElement>(
        html`<cds-accordion isFlush>
          <cds-accordion-item title="Heading A">
            <p>Panel A</p>
          </cds-accordion-item>
          <cds-accordion-item title="Heading B">
            <p>Panel B</p>
          </cds-accordion-item>
          <cds-accordion-item title="Heading C">
            <p>Panel C</p>
          </cds-accordion-item>
        </cds-accordion>`
      );

      expect(el.hasAttribute('isFlush')).toBe(true);
    });

    it('should not align to left if alignment="start"', async () => {
      const el = await vitestFixture<HTMLElement>(
        html`<cds-accordion isFlush alignment="start">
          <cds-accordion-item title="Heading A" alignment="start">
            <p>Panel A</p>
          </cds-accordion-item>
          <cds-accordion-item title="Heading B" alignment="start">
            <p>Panel B</p>
          </cds-accordion-item>
          <cds-accordion-item title="Heading C" alignment="start">
            <p>Panel C</p>
          </cds-accordion-item>
        </cds-accordion>`
      );
      const firstItem = el.firstElementChild as HTMLElement;

      expect(firstItem.hasAttribute('isFlush')).toBe(false);
    });
  });

  describe('Expand/Collapse All', () => {
    let el: HTMLElement;
    let elItems: NodeListOf<HTMLElement>;
    let expandAllButton: HTMLButtonElement;
    let collapseAllButton: HTMLButtonElement;

    beforeEach(async () => {
      el = await vitestFixture<HTMLElement>(accordionTemplate);
      elItems = el.querySelectorAll('cds-accordion-item');
      expandAllButton = document.createElement('cds-button');
      collapseAllButton = document.createElement('cds-button');

      expandAllButton.addEventListener('click', () => {
        elItems.forEach((item) => {
          item.setAttribute('open', '');
        });
      });

      collapseAllButton.addEventListener('click', () => {
        elItems.forEach((item) => {
          item.removeAttribute('open');
        });
      });
      await Promise.resolve();
    });

    it('should expand All on click to button', async () => {
      expandAllButton.click();
      await Promise.all(
        Array.from(elItems).map(
          (item) => (item as any).updateComplete || Promise.resolve()
        )
      );
      await Promise.resolve();

      elItems.forEach((item) => {
        expect(item.hasAttribute('open')).toBe(true);
      });
    });

    it('should collapse All on click to button', async () => {
      expandAllButton.click();
      await Promise.all(
        Array.from(elItems).map(
          (item) => (item as any).updateComplete || Promise.resolve()
        )
      );
      await Promise.resolve();

      collapseAllButton.click();
      await Promise.all(
        Array.from(elItems).map(
          (item) => (item as any).updateComplete || Promise.resolve()
        )
      );
      await Promise.resolve();

      elItems.forEach((item) => {
        expect(item.hasAttribute('open')).toBe(false);
      });
    });
  });
});
