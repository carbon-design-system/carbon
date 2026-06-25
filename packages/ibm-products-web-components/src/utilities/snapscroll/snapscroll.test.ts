/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { describe, expect, it } from 'vitest';
import { fixture, html } from '@open-wc/testing';
import { snapScroll } from './snapscroll';

const template = () => {
  return html`
    <div class="app">
      <div class="body">
        <div class="child">child element</div>
        <div class="child">child element</div>
        <div class="child">child element</div>
      </div>
    </div>
  `;
};

describe('snapscroll', () => {
  it('snaps', async () => {
    const el = await fixture(template());
    snapScroll('.body', '.child');
    const body = el.querySelector('.body');
    expect(body?.classList.contains('c4p--snappy')).toBe(true);
    const child = el.querySelector('.child');
    expect(child?.classList.contains('c4p--snappy__elm')).toBe(true);
    const children = el.querySelectorAll('.c4p--snappy__elm');
    expect(children.length).toBe(3);
  });
});
