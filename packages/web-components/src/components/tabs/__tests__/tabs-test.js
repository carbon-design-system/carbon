/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { expect, fixture, html, oneEvent, waitUntil } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import '@carbon/web-components/es/components/tabs/index.js';

describe('cds-tabs', function () {
  for (const [dir, width] of [
    ['ltr', 320],
    ['ltr', 320.5],
    ['rtl', 320],
    ['rtl', 320.5],
  ]) {
    it(`should hide scroll buttons at the ${dir} boundaries with a ${width}px container`, async () => {
      const host = await fixture(html`
        <div dir=${dir} style=${`width: ${width}px`}>
          <cds-tabs>
            ${Array.from(
              { length: 10 },
              (_, i) => html`
                <cds-tab value=${`tab-${i}`}>Tab number ${i}</cds-tab>
              `
            )}
          </cds-tabs>
        </div>
      `);
      const el = host.firstElementChild;
      await el.updateComplete;
      const container = el.shadowRoot.querySelector(
        '.cds--tabs-nav-content-container'
      );
      const previous = el.shadowRoot.querySelector('[part="prev-button"]');
      const next = el.shadowRoot.querySelector('[part="next-button"]');
      const hidden = (button) => getComputedStyle(button).display === 'none';
      await waitUntil(() => hidden(previous) && !hidden(next));
      // Elastic overscroll can report a position before the start boundary.
      Object.defineProperty(container, 'scrollLeft', {
        configurable: true,
        value: dir === 'rtl' ? 5 : -5,
      });
      try {
        container.dispatchEvent(new Event('scroll'));
        await el.updateComplete;
        expect(hidden(previous)).to.be.true;
      } finally {
        delete container.scrollLeft;
      }
      next.click();
      await waitUntil(() =>
        dir === 'rtl' ? container.scrollLeft < 0 : container.scrollLeft > 0
      );
      container.scrollLeft = (dir === 'rtl' ? -1 : 1) * container.scrollWidth;
      await waitUntil(() => hidden(next) && !hidden(previous));
      previous.click();
      await waitUntil(() => !hidden(next));
      container.scrollLeft = 0;
      await waitUntil(() => hidden(previous));
      host.style.width = '2400px';
      await waitUntil(() => hidden(previous) && hidden(next));
      el.remove();
      host.append(el);
      host.style.width = `${width}px`;
      await waitUntil(() => hidden(previous) && !hidden(next));
    });
  }

  /**
   * Helper to get the inner focusable `<a>` element of a `cds-tab`.
   */
  const tabLink = (tab) => tab.shadowRoot.querySelector('a');

  it('should honor a child marked `selected` on mount', async () => {
    const el = await fixture(html`
      <cds-tabs>
        <cds-tab value="tab-1" target="p-1">First</cds-tab>
        <cds-tab value="tab-2" target="p-2" selected>Second</cds-tab>
        <cds-tab value="tab-3" target="p-3">Third</cds-tab>
      </cds-tabs>
    `);

    await el.updateComplete;
    const tabs = el.querySelectorAll('cds-tab');
    await Promise.all(Array.from(tabs, (tab) => tab.updateComplete));

    expect(el.value).to.equal('tab-2');
    expect(tabs[1].hasAttribute('selected')).to.be.true;
    expect(tabs[0].hasAttribute('selected')).to.be.false;
    expect(tabs[2].hasAttribute('selected')).to.be.false;

    expect(tabLink(tabs[1]).getAttribute('tabindex')).to.equal('0');
    expect(tabLink(tabs[0]).getAttribute('tabindex')).to.equal('-1');
    expect(tabLink(tabs[2]).getAttribute('tabindex')).to.equal('-1');
  });

  it('should ignore a disabled child marked `selected` on mount', async () => {
    const el = await fixture(html`
      <cds-tabs selection-mode="manual">
        <cds-tab value="tab-1" target="p-1">First</cds-tab>
        <cds-tab value="tab-2" target="p-2" selected disabled> Second </cds-tab>
        <cds-tab value="tab-3" target="p-3">Third</cds-tab>
      </cds-tabs>
    `);

    await el.updateComplete;
    const tabs = el.querySelectorAll('cds-tab');
    await Promise.all(Array.from(tabs, (tab) => tab.updateComplete));

    expect(el.value).to.equal('tab-1');
    expect(tabs[0].hasAttribute('selected')).to.be.true;
    expect(tabs[0].hasAttribute('highlighted')).to.be.true;
    expect(tabs[1].hasAttribute('selected')).to.be.false;
    expect(tabs[1].hasAttribute('highlighted')).to.be.false;
  });

  it('should honor a non-first `value` on mount when no child is pre-selected', async () => {
    const el = await fixture(html`
      <cds-tabs value="tab-3">
        <cds-tab value="tab-1" target="p-1">First</cds-tab>
        <cds-tab value="tab-2" target="p-2">Second</cds-tab>
        <cds-tab value="tab-3" target="p-3">Third</cds-tab>
      </cds-tabs>
    `);

    await el.updateComplete;
    const tabs = el.querySelectorAll('cds-tab');
    await Promise.all(Array.from(tabs, (tab) => tab.updateComplete));

    expect(el.value).to.equal('tab-3');
    expect(tabs[2].hasAttribute('selected')).to.be.true;
    expect(tabs[0].hasAttribute('selected')).to.be.false;
    expect(tabLink(tabs[2]).getAttribute('tabindex')).to.equal('0');
    expect(tabLink(tabs[0]).getAttribute('tabindex')).to.equal('-1');
  });

  it('should prefer a consumer-set `selected` child over a conflicting host `value` on mount', async () => {
    const el = await fixture(html`
      <cds-tabs value="tab-3">
        <cds-tab value="tab-1" target="p-1">First</cds-tab>
        <cds-tab value="tab-2" target="p-2" selected>Second</cds-tab>
        <cds-tab value="tab-3" target="p-3">Third</cds-tab>
      </cds-tabs>
    `);

    await el.updateComplete;
    const tabs = el.querySelectorAll('cds-tab');
    await Promise.all(Array.from(tabs, (tab) => tab.updateComplete));

    // The consumer-set `selected` child wins over the host `value`.
    expect(tabs[1].hasAttribute('selected')).to.be.true;
    expect(tabs[2].hasAttribute('selected')).to.be.false;
    // The host `value` is synced to the selected child.
    expect(el.value).to.equal('tab-2');
    expect(tabLink(tabs[1]).getAttribute('tabindex')).to.equal('0');
    expect(tabLink(tabs[2]).getAttribute('tabindex')).to.equal('-1');
  });

  it('should not move focus into the tablist on initial mount', async () => {
    const marker = document.createElement('button');
    document.body.appendChild(marker);
    marker.focus();

    try {
      const el = await fixture(html`
        <cds-tabs value="tab-2">
          <cds-tab value="tab-1" target="p-1">First</cds-tab>
          <cds-tab value="tab-2" target="p-2" selected>Second</cds-tab>
          <cds-tab value="tab-3" target="p-3">Third</cds-tab>
        </cds-tabs>
      `);

      await el.updateComplete;
      const tabs = el.querySelectorAll('cds-tab');
      await Promise.all(Array.from(tabs, (tab) => tab.updateComplete));
      // Allow the microtask queue (where focus previously moved) to drain.
      await Promise.resolve();
      await Promise.resolve();

      expect(document.activeElement).to.equal(marker);
    } finally {
      marker.remove();
    }
  });

  it('should not move focus on a programmatic selectedIndex change', async () => {
    const el = await fixture(html`
      <cds-tabs>
        <cds-tab value="tab-1" target="p-1">First</cds-tab>
        <cds-tab value="tab-2" target="p-2">Second</cds-tab>
        <cds-tab value="tab-3" target="p-3">Third</cds-tab>
      </cds-tabs>
    `);

    await el.updateComplete;
    const tabs = el.querySelectorAll('cds-tab');
    await Promise.all(Array.from(tabs, (tab) => tab.updateComplete));
    await Promise.resolve();
    await Promise.resolve();

    // Move focus to a known, non-tab element to detect any steal.
    const marker = document.createElement('button');
    marker.textContent = 'marker';
    document.body.appendChild(marker);
    marker.focus();
    const before = document.activeElement;

    try {
      el.selectedIndex = 2;
      await el.updateComplete;
      await Promise.all(Array.from(tabs, (tab) => tab.updateComplete));
      await Promise.resolve();
      await Promise.resolve();

      expect(document.activeElement).to.equal(before);
      expect(tabs[2].hasAttribute('selected')).to.be.true;
      expect(el.value).to.equal('tab-3');
    } finally {
      marker.remove();
    }
  });

  it('should select and focus a tab on click', async () => {
    const el = await fixture(html`
      <cds-tabs>
        <cds-tab value="tab-1" target="p-1">First</cds-tab>
        <cds-tab value="tab-2" target="p-2">Second</cds-tab>
        <cds-tab value="tab-3" target="p-3">Third</cds-tab>
      </cds-tabs>
    `);

    await el.updateComplete;
    const tabs = el.querySelectorAll('cds-tab');
    await Promise.all(Array.from(tabs, (tab) => tab.updateComplete));

    const eventPromise = oneEvent(el, 'cds-tabs-selected');
    tabs[1].click();
    await eventPromise;
    await el.updateComplete;
    await Promise.all(Array.from(tabs, (tab) => tab.updateComplete));
    await Promise.resolve();

    expect(tabs[1].hasAttribute('selected')).to.be.true;
    expect(el.value).to.equal('tab-2');
    expect(document.activeElement).to.equal(tabs[1]);
  });

  it('should select and focus the target tab on ArrowRight in automatic mode', async () => {
    const el = await fixture(html`
      <cds-tabs>
        <cds-tab value="tab-1" target="p-1">First</cds-tab>
        <cds-tab value="tab-2" target="p-2">Second</cds-tab>
        <cds-tab value="tab-3" target="p-3">Third</cds-tab>
      </cds-tabs>
    `);

    await el.updateComplete;
    const tabs = el.querySelectorAll('cds-tab');
    await Promise.all(Array.from(tabs, (tab) => tab.updateComplete));
    await Promise.resolve();

    // Start from the initially-selected first tab.
    tabLink(tabs[0]).focus();
    await Promise.resolve();

    const eventPromise = oneEvent(el, 'cds-tabs-selected');
    await sendKeys({ press: 'ArrowRight' });
    await eventPromise;
    await el.updateComplete;
    await Promise.all(Array.from(tabs, (tab) => tab.updateComplete));
    await Promise.resolve();

    expect(tabs[1].hasAttribute('selected')).to.be.true;
    expect(el.value).to.equal('tab-2');
    expect(document.activeElement).to.equal(tabs[1]);
  });

  it('should move focus without selecting on ArrowRight in manual mode; Enter selects', async () => {
    const el = await fixture(html`
      <cds-tabs selection-mode="manual">
        <cds-tab value="tab-1" target="p-1">First</cds-tab>
        <cds-tab value="tab-2" target="p-2">Second</cds-tab>
        <cds-tab value="tab-3" target="p-3">Third</cds-tab>
      </cds-tabs>
    `);

    await el.updateComplete;
    const tabs = el.querySelectorAll('cds-tab');
    await Promise.all(Array.from(tabs, (tab) => tab.updateComplete));
    await Promise.resolve();

    // Manual activation changes navigation behavior, not initial selection.
    expect(tabs[0].hasAttribute('selected')).to.be.true;
    expect(tabs[0].hasAttribute('highlighted')).to.be.true;
    expect(tabLink(tabs[0]).getAttribute('tabindex')).to.equal('0');

    tabLink(tabs[0]).focus();
    await Promise.resolve();

    let selectedFired = false;
    const selectedHandler = () => {
      selectedFired = true;
    };
    el.addEventListener('cds-tabs-selected', selectedHandler);

    await sendKeys({ press: 'ArrowRight' });
    await el.updateComplete;
    await Promise.all(Array.from(tabs, (tab) => tab.updateComplete));
    await Promise.resolve();

    expect(selectedFired).to.be.false;
    expect(tabs[1].hasAttribute('highlighted')).to.be.true;
    expect(tabs[1].hasAttribute('selected')).to.be.false;
    expect(tabs[0].hasAttribute('selected')).to.be.true;
    expect(document.activeElement).to.equal(tabs[1]);

    el.removeEventListener('cds-tabs-selected', selectedHandler);

    const eventPromise = oneEvent(el, 'cds-tabs-selected');
    await sendKeys({ press: 'Enter' });
    await eventPromise;
    await el.updateComplete;
    await Promise.all(Array.from(tabs, (tab) => tab.updateComplete));

    expect(tabs[1].hasAttribute('selected')).to.be.true;
    expect(el.value).to.equal('tab-2');
  });

  it('should select and highlight the initial tab on mount in manual mode', async () => {
    const el = await fixture(html`
      <cds-tabs selection-mode="manual">
        <cds-tab value="tab-1" target="p-1">First</cds-tab>
        <cds-tab value="tab-2" target="p-2">Second</cds-tab>
        <cds-tab value="tab-3" target="p-3">Third</cds-tab>
      </cds-tabs>
    `);

    await el.updateComplete;
    const tabs = el.querySelectorAll('cds-tab');
    await Promise.all(Array.from(tabs, (tab) => tab.updateComplete));
    await Promise.resolve();

    expect(tabs[0].hasAttribute('selected')).to.be.true;
    expect(tabs[0].hasAttribute('highlighted')).to.be.true;
    expect(tabLink(tabs[0]).getAttribute('tabindex')).to.equal('0');
    expect(tabLink(tabs[1]).getAttribute('tabindex')).to.equal('-1');
  });

  it('should apply divider hiding on mount', async () => {
    const el = await fixture(html`
      <cds-tabs value="tab-1">
        <cds-tab value="tab-1" target="p-1">First</cds-tab>
        <cds-tab value="tab-2" target="p-2">Second</cds-tab>
        <cds-tab value="tab-3" target="p-3">Third</cds-tab>
      </cds-tabs>
    `);

    await el.updateComplete;
    const tabs = el.querySelectorAll('cds-tab');
    await Promise.all(Array.from(tabs, (tab) => tab.updateComplete));
    // The divider logic runs in a microtask after selection.
    await Promise.resolve();
    await Promise.resolve();

    // The tab immediately following the selected tab should hide its divider.
    expect(tabs[1].hasAttribute('hide-divider')).to.be.true;
  });
});
