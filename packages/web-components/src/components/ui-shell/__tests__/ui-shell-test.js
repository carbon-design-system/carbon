/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { expect, fixture, html, waitUntil } from '@open-wc/testing';
import { resetMouse, sendMouse } from '@web/test-runner-commands';
import '@carbon/web-components/es/components/ui-shell/index.js';

describe('cds-side-nav-link', () => {
  afterEach(async () => {
    await resetMouse();
  });

  it('uses the inherited hover color for a top-level link', async () => {
    expect(window.matchMedia('(any-hover: hover)').matches).to.be.true;

    const el = await fixture(html`
      <cds-side-nav-link
        href="#"
        style="--cds-background-hover: rgb(12, 34, 56)">
        Link
      </cds-side-nav-link>
    `);
    const link = el.shadowRoot.querySelector('a');
    const { x, y, width, height } = link.getBoundingClientRect();
    const background = getComputedStyle(link).backgroundColor;

    await sendMouse({
      type: 'move',
      position: [Math.round(x + width / 2), Math.round(y + height / 2)],
    });

    await waitUntil(
      () => getComputedStyle(link).backgroundColor === 'rgb(12, 34, 56)'
    );

    expect(getComputedStyle(link).backgroundColor).to.equal('rgb(12, 34, 56)');

    await resetMouse();

    await waitUntil(
      () => getComputedStyle(link).backgroundColor === background
    );

    expect(getComputedStyle(link).backgroundColor).to.equal(background);
  });
});

describe('cds-header-global-action', () => {
  describe('Handling click', () => {
    it('should set expanded on the linked panel when the panel is collapsed', async () => {
      const el = await fixture(html`
        <div>
          <cds-header-global-action panel-id="test-panel-1">
          </cds-header-global-action>
          <cds-header-panel id="test-panel-1"></cds-header-panel>
        </div>
      `);

      const action = el.querySelector('cds-header-global-action');
      const panel = el.querySelector('cds-header-panel');

      action.click();

      expect(panel.hasAttribute('expanded')).to.be.true;
    });

    it('should remove expanded from the linked panel when the panel is already expanded', async () => {
      const el = await fixture(html`
        <div>
          <cds-header-global-action panel-id="test-panel-2">
          </cds-header-global-action>
          <cds-header-panel id="test-panel-2" expanded></cds-header-panel>
        </div>
      `);

      const action = el.querySelector('cds-header-global-action');
      const panel = el.querySelector('cds-header-panel');

      action.click();

      expect(panel.hasAttribute('expanded')).to.be.false;
    });
  });
});
