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
import { property, query, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { repeat } from 'lit/directives/repeat.js';
import { carbonElement as customElement } from '../../../globals/decorators/carbon-element';
import '../../breadcrumb/index';
import '../../overflow-menu/index';
import '../../menu/index';
import { createOverflowHandler } from '../utils';
import OverflowMenuHorizontal16 from '@carbon/icons/es/overflow-menu--horizontal/16.js';
import { iconLoader } from '../../../globals/internal/icon-loader';
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
   * Data items currently collapsed into the overflow menu.
   * Derived from the DOM nodes the overflow handler marks as hidden.
   */
  @state()
  private _hiddenItems: Breadcrumb[] = [];

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
   * Whether custom breadcrumb-content slot content is present.
   */
  @state()
  private _hasBreadcrumbContent = false;

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
  private container: HTMLElement | undefined;

  private overflowHandler: { disconnect: () => void } | undefined;

  /**
   * Handles slotchange for the breadcrumb-content slot.
   */
  protected _handleBreadcrumbContentSlotChange({ target }: Event) {
    this._hasBreadcrumbContent =
      (target as HTMLSlotElement).assignedNodes({ flatten: true }).length > 0;
  }

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
        if (!this.container) {
          return;
        }
        const container = this.container;
        this.overflowHandler = createOverflowHandler({
          offsetValue: 14,
          container,
          onChange: (
            _visibleItems: HTMLElement[],
            hiddenItems: HTMLElement[]
          ) => {
            const navigableItems = Array.from(container.children).filter(
              (el) =>
                !el.hasAttribute('data-fixed') &&
                !el.hasAttribute('data-offset')
            ) as HTMLElement[];
            this._hiddenItems = hiddenItems
              .map((el) => {
                const idx = navigableItems.indexOf(el);
                return idx !== -1 ? this.breadcrumbsData?.[idx] : undefined;
              })
              .filter((item): item is Breadcrumb => item !== undefined);
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
        ?no-trailing-slash="${!this.title}">
        ${repeat(
          this.breadcrumbsData ?? [],
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
          data-offset
          style="display: ${this._hiddenItems?.length >= 1 ? 'flex' : 'none'}">
          <cds-overflow-menu
            breadcrumb=""
            align="bottom"
            aria-label="${this.overflowAriaLabel}">
            ${iconLoader(OverflowMenuHorizontal16, {
              slot: 'icon',
            })}
            <span slot="tooltip-content">${this.overflowAriaLabel}</span>
            <cds-menu size="sm">
              ${repeat(
                this._hiddenItems ?? [],
                (item) => item.href ?? item.text,
                (item) => html`
                  <cds-menu-item
                    label=${item.text}
                    @click=${() => {
                      if (item.href) window.location.href = item.href;
                    }}></cds-menu-item>
                `
              )}
            </cds-menu>
          </cds-overflow-menu>
        </cds-breadcrumb-item>
        <cds-page-header-title-breadcrumb data-fixed>
          <cds-breadcrumb-link is-currentpage="">
            <slot
              name="breadcrumb-content"
              @slotchange=${this._handleBreadcrumbContentSlotChange}></slot>
            ${!this._hasBreadcrumbContent
              ? html`<cds-truncated-text
                  value="${this.title}"
                  lines="1"
                  autoalign></cds-truncated-text>`
              : null}
          </cds-breadcrumb-link>
        </cds-page-header-title-breadcrumb>
      </cds-breadcrumb>
    `;
  }
  static styles = styles;
}

declare global {
  interface HTMLElementTagNameMap {
    'cds-page-header-breadcrumbs-set': CDSPageHeaderBreadcrumbsSet;
  }
}
