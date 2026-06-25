/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { describe, expect, it } from 'vitest';
import { fixture, html } from '@open-wc/testing';
import CDSGuideBannerElement from './guide-banner-element';

const template = () => {
  return html`
    <c4p-guide-banner-element>
      <div slot="title">title</div>
      <div slot="description">description</div>
      <div class="children">children</div>
    </c4p-guide-banner-element>
  `;
};

describe('c4p-guide-banner-element', () => {
  it('renders guide-banner-element', async () => {
    const el = await fixture(template());
    expect(el).to.be.instanceOf(CDSGuideBannerElement);
    expect(el.shadowRoot).to.exist;
  });

  it('renders guide-banner-element with title', async () => {
    const el = await fixture(template());
    const slot = el.shadowRoot?.querySelector(
      `slot[name="title"]`
    ) as HTMLSlotElement;
    expect(slot).to.exist;
    const node = slot.assignedNodes()[0] as HTMLElement;
    const { innerText } = node;
    expect(innerText).toBe('title');
  });

  it('renders guide-banner-element with description', async () => {
    const el = await fixture(template());
    const slot = el.shadowRoot?.querySelector(
      `slot[name="description"]`
    ) as HTMLSlotElement;
    expect(slot).to.exist;
    const node = slot.assignedNodes()[0] as HTMLElement;
    const { innerText } = node;
    expect(innerText).toBe('description');
  });

  it('renders guide-banner-element with children', async () => {
    const el = await fixture(template());
    const node = el?.querySelector('.children');
    expect(node).to.exist;
    expect(node?.innerHTML).toBe('children');
  });
});
