// cspell:words currentpage
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
import '@carbon/web-components/es/components/breadcrumb/index.js';
import '@carbon/web-components/es/components/overflow-menu/index.js';
import { createOverflowHandler } from './overflowHandler';
import OverflowMenuHorizontal16 from '@carbon/icons/es/overflow-menu--horizontal/16.js';
import { iconLoader } from "@carbon/web-components/es/globals/internal/icon-loader.js";
import styles from './set-of-breadcrumbs.scss?lit';

const blockClass = `c4p--set-of-breadcrumbs`;

interface Breadcrumb {
  text: string;
  href: string;
}

@customElement('set-of-breadcrumbs')
export default class SetOfBreadcrumbs extends LitElement {
  /**
   * Hidden items that will be rendered in the overflow menu.
   */
  @property({ type: Array })
  hiddenItems: Breadcrumb[] = [];

  /**
   * The list of breadcrumbs.
   */
  @property({ type: Array, attribute: 'breadcrumbs-data', reflect: true })
  breadcrumbsData: Breadcrumb[] = [];

  /**
   * Container holding all breadcrumbs and the overflow menu.
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
    const sr = this.shadowRoot;
    const breadcrumb = sr?.querySelector(
      'cds-breadcrumb'
    ) as HTMLElement | null;

    if (breadcrumb) {
      breadcrumb.style.display = 'block';

      requestAnimationFrame(() => {
        const ol = breadcrumb.shadowRoot?.querySelector(
          'ol'
        ) as HTMLElement | null;
        if (ol) {
          ol.style.display = 'flex';
          ol.style.flexWrap = 'unset';
        }
      });
    }

    this.updateComplete.then(() => {
      requestAnimationFrame(() => {
        this.overflowHandler = createOverflowHandler({
          offsetValue: 14,
          container: this.container,
          onChange: (visibleItems: HTMLElement[], _) => {
            this.hiddenItems = this.breadcrumbsData?.slice(visibleItems.length);
          },
        });
      });
    });
    // On first render, all elements are initially visible. so hiding `this` visibility in connectedCallback
    // The handler runs on the second render to hide specific elements as needed.
    // The following line restores visibility after layout settles, allowing for smoother transitions.
    setTimeout(() => {
      this.style.visibility = 'visible';
    });
  }
  updated(changedProperties: Map<string, unknown>) {
    if (changedProperties.has('breadcrumbsData')) {
      this.hiddenItems = [];
      this.overflowHandler?.disconnect();
      this.overflowHandler = createOverflowHandler({
        offsetValue: 14,
        container: this.container,
        onChange: (visibleItems: HTMLElement[], _) => {
          this.hiddenItems = this.breadcrumbsData?.slice(visibleItems.length);
        },
      });
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this.overflowHandler) {
      this.overflowHandler.disconnect();
    }
  }

  render() {
    return html`
      <cds-breadcrumb
        aria-label="breadcrumbs"
        class=${classMap({
          [`${blockClass}`]: true,
        })}
      >
        ${repeat(
          this.breadcrumbsData?.slice(0, -1) ?? [],
          (item) => item.href ?? item.text,
          (item) => html`
            <cds-breadcrumb-item>
              <cds-breadcrumb-link href="${item.href}">
                ${item.text}
              </cds-breadcrumb-link>
            </cds-breadcrumb-item>
          `
        )}

        <cds-breadcrumb-item
          data-fixed
          style="display: ${this.hiddenItems?.length >= 2 ? 'flex' : 'none'}"
        >
          <cds-overflow-menu breadcrumb="" align="top">
            ${iconLoader(OverflowMenuHorizontal16, {
              slot: 'icon',
            })}
            <span slot="tooltip-content"> Breadcrumbs </span>
            <cds-overflow-menu-body size="sm">
              ${repeat(
                this.hiddenItems?.slice(0, -1) ?? [],
                (item) => item.href ?? item.text,
                (item) => html`
                  <cds-overflow-menu-item href=${item.href}>
                    ${item.text}
                  </cds-overflow-menu-item>
                `
              )}
            </cds-overflow-menu-body>
          </cds-overflow-menu>
        </cds-breadcrumb-item>
        <cds-breadcrumb-item data-fixed>
          <cds-breadcrumb-link is-currentpage="">
            ${this.breadcrumbsData!.at(-1)!.text}
          </cds-breadcrumb-link>
        </cds-breadcrumb-item>
      </cds-breadcrumb>
    `;
  }
  static styles = styles;
}

declare global {
  interface HTMLElementTagNameMap {
    'set-of-breadcrumbs': SetOfBreadcrumbs;
  }
}
