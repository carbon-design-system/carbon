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

  firstUpdated() {
    const tabs = this.querySelector(`${prefix}-tabs`);
    if (tabs) {
      tabs.setAttribute('vertical', '');
    }

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
  }

  private _applyHeight() {
    if (this.customHeight) {
      this.style.height = this.customHeight;
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
