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
 *
 * @element cds-tabs-vertical
 * @slot tabs - The `<cds-tabs>` navigation element.
 * @slot panel - One or more `<div role="tabpanel">` elements.
 */
@customElement(`${prefix}-tabs-vertical`)
export default class CDSTabsVertical extends LitElement {
  @property({ attribute: 'custom-height' })
  customHeight?: string;

  private _resizeObserver: ResizeObserver | null = null;
  private _mediaQueryList: MediaQueryList | null = null;

  /**
   * Handles viewport width changes to toggle the CSS grid class and vertical attribute.
   * Adds 'cds--css-grid' class and vertical attribute when width >= 673px, removes them when < 673px.
   */
  private _handleViewportChange = (e: MediaQueryListEvent | MediaQueryList) => {
    const tabs = this.querySelector(`${prefix}-tabs`);
    if (e.matches) {
      // Viewport is 673px or wider
      this.classList.add(`${prefix}--css-grid`);
      if (tabs) {
        tabs.setAttribute('vertical', '');
      }
    } else {
      // Viewport is 672px or narrower
      this.classList.remove(`${prefix}--css-grid`);
      if (tabs) {
        tabs.removeAttribute('vertical');
      }
    }
  };

  firstUpdated() {
    // Set up media query listener for viewport width
    this._mediaQueryList = window.matchMedia('(min-width: 673px)');
    // Set initial state
    this._handleViewportChange(this._mediaQueryList);
    // Listen for changes
    this._mediaQueryList.addEventListener('change', this._handleViewportChange);

    requestAnimationFrame(() => {
      this._applyHeight();

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
    // Clean up media query listener
    this._mediaQueryList?.removeEventListener(
      'change',
      this._handleViewportChange
    );
    this._mediaQueryList = null;
  }

  private _applyHeight() {
    // Only apply height calculation when in vertical mode (css-grid class present)
    const isVertical = this.classList.contains(`${prefix}--css-grid`);

    if (this.customHeight) {
      this.style.height = this.customHeight;
      return;
    }

    // Only calculate height when in vertical mode
    if (!isVertical) {
      this.style.removeProperty('height');
      return;
    }

    const panels = Array.from(
      this.querySelectorAll<HTMLElement>('[slot="panel"]')
    );

    if (panels.length === 0) {
      return;
    }

    const hiddenStates = panels.map((panel) => panel.hidden);
    panels.forEach((panel) => {
      panel.hidden = false;
    });

    const tallestPanel = Math.max(...panels.map((panel) => panel.offsetHeight));

    panels.forEach((panel, index) => {
      panel.hidden = hiddenStates[index];
    });

    // Match React behavior: only use panel height, not tabs height
    if (tallestPanel > 0) {
      this.style.height = `${tallestPanel}px`;
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
