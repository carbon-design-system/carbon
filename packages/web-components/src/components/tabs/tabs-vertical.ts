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
 * Breakpoint for switching between horizontal and vertical tab layouts.
 * Matches Carbon's md breakpoint (673px) - below this, tabs display horizontally.
 */
const VERTICAL_TABS_BREAKPOINT = '(min-width: 673px)';

/**
 * Vertical tabs container component.
 *
 * @element cds-tabs-vertical
 * @slot tabs - The `<cds-tabs>` navigation element.
 * @slot panel - One or more `<div role="tabpanel">` elements.
 */
@customElement(`${prefix}-tabs-vertical`)
export default class CDSTabsVertical extends LitElement {
  /**
   * Option to set a height style only if using vertical variation.
   */
  @property({ attribute: 'custom-height' })
  customHeight?: string;

  private _mediaQueryList: MediaQueryList | null = null;

  private _handleViewportChange = (e: MediaQueryListEvent | MediaQueryList) => {
    const tabs = this.querySelector(`${prefix}-tabs`);
    if (e.matches) {
      this.classList.add(`${prefix}--css-grid`);
      if (tabs) {
        tabs.setAttribute('vertical', '');
      }
    } else {
      this.classList.remove(`${prefix}--css-grid`);
      if (tabs) {
        tabs.removeAttribute('vertical');
      }
    }
  };

  firstUpdated() {
    this._mediaQueryList = window.matchMedia(VERTICAL_TABS_BREAKPOINT);
    this._handleViewportChange(this._mediaQueryList);
    this._mediaQueryList.addEventListener('change', this._handleViewportChange);

    requestAnimationFrame(() => {
      this._applyHeight();
    });

    const panelSlot = this.shadowRoot?.querySelector('slot[name="panel"]');
    panelSlot?.addEventListener('slotchange', () => {
      this._applyHeight();
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
    this._mediaQueryList?.removeEventListener(
      'change',
      this._handleViewportChange
    );
    this._mediaQueryList = null;
  }

  private _applyHeight() {
    const isVertical = this.classList.contains(`${prefix}--css-grid`);

    if (this.customHeight) {
      this.style.height = this.customHeight;
      return;
    }

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

    const tabsEl = this.querySelector<HTMLElement>(`${prefix}-tabs`);
    const tabsHeight = tabsEl?.offsetHeight ?? 0;

    const height = Math.max(tallestPanel, tabsHeight);
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
