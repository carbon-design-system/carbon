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
import { carbonElement as customElement } from '@carbon/web-components/es/globals/decorators/carbon-element.js';
import { repeat } from 'lit/directives/repeat.js';
import '@carbon/web-components/es/components/overflow-menu/index.js';
import OverflowMenuVertical16 from '@carbon/icons/es/overflow-menu--vertical/16.js';
import { iconLoader } from '@carbon/web-components/es/globals/internal/icon-loader.js';
import styles from './page-header-actions-set.scss?lit';
import { prefix } from '../../../globals/settings';

const blockClass = `${prefix}--page-header-actions-set`;

interface PageAction {
  label: string;
}

@customElement(`${prefix}-page-header-actions-set`)
export default class CDSPageHeaderActionsSet extends LitElement {
  /**
   * Hidden actions that will be rendered in the overflow menu.
   */
  @state()
  hiddenItems: PageAction[] = [];

  /**
   * The list of page action labels for overflow menu.
   */
  @property({ type: Array, attribute: 'actions-data', reflect: true })
  actionsData: PageAction[] = [];

  /**
   * Aria label for the overflow menu button.
   */
  @property({ type: String, attribute: 'overflow-aria-label', reflect: true })
  overflowAriaLabel = 'More page actions';

  /**
   * Container holding all action buttons and the overflow menu.
   */
  @query(`.${blockClass}`)
  private container!: HTMLElement;

  /**
   * Items wrapper containing the slotted elements.
   */
  @query(`.${blockClass}__items`)
  private itemsContainer!: HTMLElement;

  private resizeObserver: ResizeObserver | undefined;
  private isSetup = false;
  private resizeTimeout: number | undefined;
  private lastContainerWidth = 0;

  connectedCallback(): void {
    super.connectedCallback();
    this.style.visibility = 'hidden';
  }

  firstUpdated() {
    if (!this.container) {
      return;
    }

    this.updateComplete.then(() => {
      requestAnimationFrame(() => {
        this.setupOverflowDetection();
        this.isSetup = true;
        this.style.visibility = 'visible';
      });
    });
  }

  updated(changedProperties: Map<string, unknown>) {
    // Only re-setup if actionsData changed and we've already done initial setup
    if (
      this.isSetup &&
      changedProperties.has('actionsData') &&
      !changedProperties.has('hiddenItems')
    ) {
      this.updateComplete.then(() => {
        requestAnimationFrame(() => this.setupOverflowDetection());
      });
    }
  }

  private setupOverflowDetection() {
    if (!this.itemsContainer) {
      return;
    }

    // Disconnect existing observer if any
    this.resizeObserver?.disconnect();

    // Get slotted elements
    const slot = this.shadowRoot?.querySelector('slot') as HTMLSlotElement;

    const checkOverflow = () => {
      const slottedElements = slot?.assignedElements() as HTMLElement[];

      if (!slottedElements || slottedElements.length === 0) {
        return;
      }

      // Use the host element's width as it reflects the actual available space
      const containerWidth =
        this.offsetWidth || this.itemsContainer.clientWidth;
      const overflowMenuWidth = 48; // Approximate width of overflow menu button

      // If container has no width yet, skip check
      if (containerWidth === 0) {
        return;
      }

      // Prevent resize loop - only recalculate if width changed significantly (>5px)
      if (Math.abs(containerWidth - this.lastContainerWidth) < 5) {
        return;
      }
      this.lastContainerWidth = containerWidth;

      // First, check if all items fit without overflow menu
      let totalWidth = 0;
      for (let i = 0; i < slottedElements.length; i++) {
        totalWidth += slottedElements[i].offsetWidth;
      }

      // If all items fit, show all and hide overflow menu
      if (totalWidth <= containerWidth) {
        slottedElements.forEach((el) => {
          el.removeAttribute('data-hidden');
        });
        this.hiddenItems = [];
        return;
      }

      // Items don't fit, calculate how many can fit with overflow menu
      totalWidth = 0;
      let visibleCount = 0;

      for (let i = 0; i < slottedElements.length; i++) {
        const itemWidth = slottedElements[i].offsetWidth;

        // Check if this item plus overflow menu would fit
        if (totalWidth + itemWidth + overflowMenuWidth <= containerWidth) {
          totalWidth += itemWidth;
          visibleCount = i + 1;
        } else {
          break;
        }
      }

      // Update visibility
      slottedElements.forEach((el, index) => {
        if (index >= visibleCount) {
          el.setAttribute('data-hidden', '');
        } else {
          el.removeAttribute('data-hidden');
        }
      });

      // Update hidden items for overflow menu
      this.hiddenItems = this.actionsData?.slice(visibleCount) || [];
    };

    // Initial check
    checkOverflow();

    // Observe both the host element and items container for size changes with debouncing
    this.resizeObserver = new ResizeObserver(() => {
      // Clear existing timeout
      if (this.resizeTimeout) {
        clearTimeout(this.resizeTimeout);
      }

      // Debounce the check to prevent rapid recalculations
      this.resizeTimeout = window.setTimeout(() => {
        checkOverflow();
      }, 100);
    });

    this.resizeObserver.observe(this);
    this.resizeObserver.observe(this.itemsContainer);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.resizeObserver?.disconnect();
    if (this.resizeTimeout) {
      clearTimeout(this.resizeTimeout);
    }
  }

  private handleOverflowItemClick(index: number) {
    // Get the slot and find the corresponding slotted element
    const slot = this.shadowRoot?.querySelector('slot') as HTMLSlotElement;
    const slottedElements = slot?.assignedElements() as HTMLElement[];
    const hiddenIndex =
      this.actionsData.length - this.hiddenItems.length + index;
    const button = slottedElements[hiddenIndex];
    if (button) {
      button.click();
    }
  }

  render() {
    return html`
      <ul class="${blockClass}">
        <li class="${blockClass}__items">
          <slot></slot>
        </li>

        <li data-offset ?data-hidden=${this.hiddenItems.length === 0}>
          <cds-overflow-menu
            size="md"
            close-on-activation
            enter-delay-ms="0"
            leave-delay-ms="0"
            align="left"
            data-floating-menu-container
            aria-label="${this.overflowAriaLabel}"
          >
            ${iconLoader(OverflowMenuVertical16, {
              class: `${blockClass}__overflow-svg`,
              slot: 'icon',
            })}
            <span slot="tooltip-content">More actions</span>
            <cds-overflow-menu-body flipped>
              ${repeat(
                this.hiddenItems ?? [],
                (_item, index) => index,
                (item, index) => html`
                  <cds-overflow-menu-item
                    @click="${() => this.handleOverflowItemClick(index)}"
                  >
                    ${item.label}
                  </cds-overflow-menu-item>
                `
              )}
            </cds-overflow-menu-body>
          </cds-overflow-menu>
        </li>
      </ul>
    `;
  }
  static styles = styles;
}

declare global {
  interface HTMLElementTagNameMap {
    'c4p-page-header-actions-set': CDSPageHeaderActionsSet;
  }
}
