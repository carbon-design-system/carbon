/**
 * @license
 *
 * Copyright IBM Corp. 2025, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement, html } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { repeat } from 'lit/directives/repeat.js';
import '@carbon/web-components/es/components/button/index.js';
import '@carbon/web-components/es/components/overflow-menu/index.js';
import { createOverflowHandler } from '@carbon/utilities';
import OverflowMenuVertical16 from '@carbon/icons/es/overflow-menu--vertical/16.js';
import { iconLoader } from "@carbon/web-components/es/globals/internal/icon-loader.js";
import styles from './set-of-actions.scss?lit';

const blockClass = `c4p--set-of-actions`;

interface Action {
  text: string;
  icon: () => void;
  size?: string;
  onClick: () => void;
}

@customElement('set-of-actions')
export default class SetOfActions extends LitElement {
  /**
   * Hidden actions that will be rendered in the overflow menu.
   */
  @property({ type: Array })
  hiddenItems: Action[] = [];

  /**
   * The list of actions.
   */
  @property({ type: Array, attribute: 'actions-data', reflect: true })
  actionsData: Action[] = [];

  /**
   * The orientation of the action set
   */
  @property({ type: String, attribute: 'orientation', reflect: true })
  orientation = '';

  /**
   * Container holding all action buttons and the overflow menu.
   */
  @query(`.${blockClass}`)
  private container!: HTMLElement;

  private overflowHandler: { disconnect: () => void } | undefined;

  connectedCallback(): void {
    super.connectedCallback();
    this.style.visibility = 'hidden';
  }

  firstUpdated() {
    if (!this.container) {
      return;
    }
    this.updateComplete.then(() => {
      setTimeout(() => {
        this.setupOverflowHandler();
        // // On first render, all elements are initially visible. so hiding `this` visibility in connectedCallback
        // // The handler runs on the second render to hide specific elements as needed.
        // // The following line restores visibility after layout settles, allowing for smoother transitions.
        this.style.visibility = 'visible';
      });
    });
  }

  updated(changedProperties: Map<string, unknown>) {
    if (changedProperties.has('actionsData')) {
      this.updateComplete.then(() => {
        this.hiddenItems = [];
        setTimeout(() => this.setupOverflowHandler());
      });
    }

    if (!this.hiddenItems.length) {
      const lastItem = this.shadowRoot?.querySelector(
        '[data-hidden]:not([data-offset])'
      );
      lastItem?.removeAttribute('data-hidden');
    }
  }

  private setupOverflowHandler() {
    if (!this.container) {
      return;
    }

    // Disconnect existing handler if any
    this.overflowHandler?.disconnect();

    this.overflowHandler = createOverflowHandler({
      container: this.container,
      dimension: this.orientation == 'horizontal' ? 'width' : 'height',
      onChange: (visibleItems: HTMLElement[], _) => {
        this.hiddenItems = this.actionsData?.slice(visibleItems.length);
      },
    });
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.overflowHandler?.disconnect();
  }

  render() {
    return html`
      <div
        class=${classMap({
          [`${blockClass}`]: true,
          [`${blockClass}--${this.orientation}`]: true,
        })}
      >
        ${repeat(
          this.actionsData ?? [],
          (action, index) => index,
          (action, index) => html`
            <span>
              <cds-icon-button
                @click="${action.onClick}"
                size=${action.size}
                kind="ghost"
                align=${this.orientation === 'horizontal'
                  ? index === this.actionsData.length - 1
                    ? 'top-right'
                    : 'top-left'
                  : 'right'}
              >
                ${action.icon}
                <span slot="tooltip-content">${action.text}</span>
              </cds-icon-button>
            </span>
          `
        )}

        <div
          data-offset
          ?data-hidden=${this.hiddenItems.length === 0}
          data-floating-menu-container
        >
          <cds-overflow-menu
            size=${this.actionsData[0].size}
            close-on-activation
            enter-delay-ms="0"
            leave-delay-ms="0"
            align=${this.orientation === 'horizontal' ? 'top-right' : 'right'}
          >
            ${iconLoader(OverflowMenuVertical16, {
              class: `${blockClass}__overflow-svg`,
              slot: 'icon',
            })}
            <span slot="tooltip-content">Options</span>
            <cds-overflow-menu-body
              ?flipped=${this.orientation == 'horizontal'}
            >
              ${repeat(
                this.hiddenItems ?? [],
                (item) => item.text,
                (item) => html`
                  <cds-overflow-menu-item @click="${item.onClick}">
                    ${item.text}
                  </cds-overflow-menu-item>
                `
              )}
            </cds-overflow-menu-body>
          </cds-overflow-menu>
        </div>
      </div>
    `;
  }
  static styles = styles;
}

declare global {
  interface HTMLElementTagNameMap {
    'set-of-actions': SetOfActions;
  }
}
