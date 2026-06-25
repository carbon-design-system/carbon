// cspell:words currentpage
/**
 * @license
 *
 * Copyright IBM Corp. 2025, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement, html } from 'lit';
import { property, query } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { repeat } from 'lit/directives/repeat.js';
import { carbonElement as customElement } from '@carbon/web-components/es/globals/decorators/carbon-element.js';
import '@carbon/web-components/es/components/breadcrumb/index.js';
import '@carbon/web-components/es/components/overflow-menu/index.js';
import { createOverflowHandler } from '../utils';
import OverflowMenuHorizontal16 from '@carbon/icons/es/overflow-menu--horizontal/16.js';
import { iconLoader } from '@carbon/web-components/es/globals/internal/icon-loader.js';
import '../../truncated-text';
import styles from './page-header-breadcrumbs-set.scss?lit';
import '../page-header-title-breadcrumb';
import { prefix } from '../../../globals/settings';

const blockClass = `${prefix}--page-header-breadcrumbs-set`;

interface Breadcrumb {
  text: string;
  href: string;
}

@customElement(`${prefix}-page-header-breadcrumbs-set`)
export default class CDSPageHeaderBreadcrumbsSet extends LitElement {
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
   * The page title to display in the title breadcrumb.
   */
  @property({ type: String })
  title = '';

  /**
   * Aria label for the breadcrumb navigation.
   */
  @property({ type: String, attribute: 'breadcrumb-aria-label', reflect: true })
  breadcrumbAriaLabel = 'breadcrumbs';

  /**
   * Aria label for the breadcrumb overflow menu button.
   */
  @property({ type: String, attribute: 'overflow-aria-label', reflect: true })
  overflowAriaLabel = 'More breadcrumbs';

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
            const totalItems = (this.breadcrumbsData?.length ?? 1) - 1; // Exclude last item
            const hiddenCount = totalItems - visibleItems.length;
            this.hiddenItems =
              this.breadcrumbsData?.slice(0, hiddenCount) ?? [];
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

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this.overflowHandler) {
      this.overflowHandler.disconnect();
    }
  }

  render() {
    return html`
      <cds-breadcrumb
        aria-label="${this.breadcrumbAriaLabel}"
        class=${classMap({
          [`${blockClass}`]: true,
        })}
      >
        <cds-breadcrumb-item
          data-fixed
          data-offset
          style="display: ${this.hiddenItems?.length >= 1 ? 'flex' : 'none'}"
        >
          <cds-overflow-menu
            breadcrumb=""
            align="bottom"
            aria-label="${this.overflowAriaLabel}"
          >
            ${iconLoader(OverflowMenuHorizontal16, {
              slot: 'icon',
            })}
            <span slot="tooltip-content"> Breadcrumbs </span>
            <cds-overflow-menu-body size="sm">
              ${repeat(
                this.hiddenItems ?? [],
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
        ${repeat(
          this.breadcrumbsData?.slice(this.hiddenItems?.length ?? 0, -1) ?? [],
          (item) => item.href ?? item.text,
          (item) => html`
            <cds-breadcrumb-item>
              <cds-breadcrumb-link href="${item.href}">
                ${item.text}
              </cds-breadcrumb-link>
            </cds-breadcrumb-item>
          `
        )}
        <c4p-page-header-title-breadcrumb data-fixed>
          <cds-breadcrumb-link is-currentpage="">
            <c4p-truncated-text
              value="${this.title}"
              lines="1"
              autoalign
            ></c4p-truncated-text>
          </cds-breadcrumb-link>
        </c4p-page-header-title-breadcrumb>
      </cds-breadcrumb>
    `;
  }
  static styles = styles;
}

declare global {
  interface HTMLElementTagNameMap {
    'c4p-page-header-breadcrumbs-set': CDSPageHeaderBreadcrumbsSet;
  }
}
