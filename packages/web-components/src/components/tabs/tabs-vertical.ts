/**
 * Copyright IBM Corp. 2019, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';
import { prefix } from '../../globals/settings';
import styles from './tabs.scss?lit';
import { carbonElement as customElement } from '../../globals/decorators/carbon-element';

/**
 * Vertical tabs container component.
 * A layout wrapper that arranges a `<cds-tabs>` alongside its associated tab
 * panels in a CSS grid, providing the vertical-tab appearance.
 *
 * Uses two named slots:
 * - `slot="tabs"` — receives the `<cds-tabs>` navigation element
 * - `slot="panel"` — receives `<div role="tabpanel">` elements, wrapped in a
 *   shadow-DOM `<div class="panel-container">` for reliable layout styling
 *
 * The slotted `<cds-tabs>` receives a `vertical` boolean attribute set in
 * `firstUpdated()` — the correct LitElement lifecycle hook because:
 * - `connectedCallback` fires during HTML parsing before children are available
 * - `firstUpdated()` runs after the first render, when all light-DOM children
 *   are parsed and upgraded
 *
 * Height behaviour (mirrors React `<TabPanels>` auto-sizing logic):
 * - When `custom-height` is provided, it is applied directly to the host element.
 * - When `custom-height` is omitted, the host height is auto-calculated as the
 *   maximum of: (a) the tallest panel height, and (b) the total height of all
 *   tabs. This ensures all tabs are always fully visible without scrolling, and
 *   the panel area is tall enough to show the largest panel's content.
 *
 * @element cds-tabs-vertical
 * @slot tabs - The `<cds-tabs>` navigation element.
 * @slot panel - One or more `<div role="tabpanel">` elements.
 */
@customElement(`${prefix}-tabs-vertical`)
export default class CDSTabsVertical extends LitElement {
  /**
   * Optional height for the vertical tabs container.
   * Accepts any valid CSS height value (e.g. '500px', '50vh', '100%').
   * When omitted, the container height is auto-calculated from the tallest
   * panel and total tabs height — matching React `<TabsVertical>` behaviour.
   */
  @property({ attribute: 'custom-height' })
  customHeight?: string;

  private _resizeObserver: ResizeObserver | null = null;

  firstUpdated() {
    // Light-DOM children are available here (unlike connectedCallback).
    // Set `vertical` on the slotted <cds-tabs> so that
    // :host(cds-tabs[vertical]) styles in tabs.scss apply.
    const tabs = this.querySelector(`${prefix}-tabs`);
    if (tabs) {
      tabs.setAttribute('vertical', '');
    }

    // Defer height calculation to after the browser has painted so that
    // slotted light-DOM children have their layout computed (offsetHeight > 0).
    // Using requestAnimationFrame mirrors React's useIsomorphicEffect timing.
    requestAnimationFrame(() => {
      this._applyHeight();

      // Re-calculate whenever any child resizes (e.g. font load, dynamic content).
      const resizeObserver = new ResizeObserver(() => {
        if (!this.customHeight) {
          this._applyHeight();
        }
      });
      this._resizeObserver = resizeObserver;
      this.querySelectorAll<HTMLElement>('[slot="panel"]').forEach((panel) => {
        resizeObserver.observe(panel);
      });
    });
  }

  updated(changedProperties) {
    super.updated?.(changedProperties);
    if (changedProperties.has('customHeight')) {
      this._applyHeight();
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._resizeObserver?.disconnect();
    this._resizeObserver = null;
  }

  /**
   * Applies height to the host element.
   *
   * - If `customHeight` is set, use it directly (opt-in explicit height).
   * - Otherwise, auto-calculates the height as the maximum of:
   *   1. The tallest panel — all panels are temporarily un-hidden to measure,
   *      then re-hidden. Mirrors React `TabPanels` logic (`Tabs.tsx` ~line 1756).
   *   2. The total scroll height of all tabs — ensures all tabs are always
   *      fully visible without the tab list needing to scroll.
   */
  private _applyHeight() {
    if (this.customHeight) {
      this.style.height = this.customHeight;
      return;
    }

    // Measure all slotted panels.
    const panels = Array.from(
      this.querySelectorAll<HTMLElement>('[slot="panel"]')
    );

    if (panels.length === 0) {
      return;
    }

    // Record hidden states, then un-hide all to get accurate offsetHeight.
    const hiddenStates = panels.map((panel) => panel.hidden);
    panels.forEach((panel) => {
      panel.hidden = false;
    });

    // Find the tallest panel.
    const tallestPanel = Math.max(...panels.map((panel) => panel.offsetHeight));

    // Restore original hidden states.
    panels.forEach((panel, index) => {
      panel.hidden = hiddenStates[index];
    });

    // Measure total height of all tabs so they are all visible without scrolling.
    // scrollHeight gives the full content height regardless of overflow clipping.
    const tabsEl = this.querySelector<HTMLElement>(`${prefix}-tabs`);
    const tabsScrollHeight = tabsEl?.scrollHeight ?? 0;

    const height = Math.max(tallestPanel, tabsScrollHeight);

    if (height > 0) {
      this.style.height = `${height}px`;
    } else {
      this.style.removeProperty('height');
    }
  }

  render() {
    return html`
      <slot name="tabs"></slot>
      <div class="${prefix}-panel-container">
        <slot name="panel"></slot>
      </div>
    `;
  }

  static styles = styles;
}
