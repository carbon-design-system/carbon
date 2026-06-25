/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { html, fixture, elementUpdated } from '@open-wc/testing';
import { prefix } from '../../globals/settings';
import CDSBigNumber from './big-number';
import { Characters } from './constants';
import './index';

const blockClass = `${prefix}--big-number`;

describe('c4p-big-number', () => {
  let el: CDSBigNumber;

  beforeEach(async () => {
    el = await fixture(html`
      <c4p-big-number
        value=${12345.678}
        total=${1000000}
        size="lg"
        label="Test Label"
        locale="en-US"
        truncate
        trending
      ></c4p-big-number>
    `);
  });

  it('renders with default properties', () => {
    const shadow = el.shadowRoot!;
    // Render value
    expect(
      shadow!.querySelector(`.${blockClass}__value`)?.textContent?.trim()
    ).toBe('12.3K');
    // Render total
    expect(
      shadow!.querySelector(`.${blockClass}__total`)?.textContent?.trim()
    ).toBe(`${Characters.Slash}1.0M`);
    // Render trending icon
    const trendingIcon = shadow!.querySelector(`.${blockClass}__trend`);
    expect(trendingIcon).to.exist;
  });

  it('displays Percentage symbol and hides Total when percentage props is true ', async () => {
    el.percentage = true;
    await elementUpdated(el);
    const shadow = el.shadowRoot!;
    // Render percentage mark
    expect(
      shadow!
        .querySelector(`.${blockClass}__percentage-mark`)
        ?.textContent?.trim()
    ).toBe(Characters.Percentage);

    // Hide total
    const denominator = shadow!.querySelector(`.${blockClass}__total`);
    expect(denominator).not.to.exist;
  });

  it('formats value correctly with specified locale', async () => {
    el.locale = 'fr-CA';
    await elementUpdated(el);
    const shadow = el.shadowRoot!;
    expect(
      shadow!.querySelector(`.${blockClass}__value`)?.textContent?.trim()
    ).toBe('12,3 k');
    expect(
      shadow!.querySelector(`.${blockClass}__total`)?.textContent?.trim()
      // eslint-disable-next-line no-irregular-whitespace
    ).toBe(`${Characters.Slash}1,0 M`);
  });

  it('handles loading state', async () => {
    el.loading = true;
    await elementUpdated(el);
    const shadow = el.shadowRoot!;
    expect(shadow!.querySelector(`.${blockClass}__value`)).toBeNull();
  });

  it('formats value with specified fractionDigits', async () => {
    el.fractionDigits = 2;
    await elementUpdated(el);
    const shadow = el.shadowRoot!;
    expect(
      shadow!.querySelector(`.${blockClass}__value`)?.textContent?.trim()
    ).toBe('12.35K');
  });

  it('does not truncate value when truncate is false', async () => {
    el.truncate = false;
    await elementUpdated(el);
    const shadow = el.shadowRoot!;
    expect(
      shadow!.querySelector(`.${blockClass}__value`)?.textContent?.trim()
    ).toBe('12,345.678');
  });

  it('displays denominator when total is greater than value', async () => {
    el.total = 15000;
    await elementUpdated(el);
    const shadow = el.shadowRoot!;
    expect(
      shadow!.querySelector(`.${blockClass}__total`)?.textContent?.trim()
    ).toBe(`${Characters.Slash}15.0K`);
  });

  it('does not display denominator when total is not greater than value', async () => {
    el.total = 12000;
    await elementUpdated(el);
    const shadow = el.shadowRoot!;
    expect(shadow!.querySelector(`.${blockClass}__total`)).toBeNull();
  });

  it('formats value correctly with different sizes', async () => {
    el.size = 'xl';
    await elementUpdated(el);
    const shadow = el.shadowRoot!;
    expect(
      shadow!.querySelector(`.${blockClass}__value`)?.textContent?.trim()
    ).toBe('12.3K');
    const modifierClassEl = el.shadowRoot!.querySelector(`.${blockClass}--xl`);
    expect(modifierClassEl).to.exist;
  });
});
