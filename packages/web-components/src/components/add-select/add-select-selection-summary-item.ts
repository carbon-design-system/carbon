/**
 * @license
 *
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement, html, nothing } from 'lit';
import { property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { carbonElement as customElement } from '../../globals/decorators/carbon-element';
import '../icon-button/index';
import { iconLoader } from '../../globals/internal/icon-loader';
import SubtractAlt16 from '@carbon/icons/es/subtract--alt/16';
import ChevronRight16 from '@carbon/icons/es/chevron--right/16';
import { prefix } from '../../globals/settings';
import type { AddSelectItem } from '@carbon/utilities';
import styles from './add-select-selection-summary-item.scss?lit';

const blockClass = `${prefix}--add-select__next`;

/**
 * Add Select Selection Summary Item — individual selected item display.
 * @element cds-add-select-selection-summary-item
 * @slot default - Highest priority: replaces all rendering when populated
 * @slot render-item - Custom full-row renderer; replaces title/subtitle/body but keeps remove button
 * @slot accordion-title - Custom accordion title (used when use-accordion is true)
 * @slot accordion-body - Custom accordion body (used when use-accordion is true)
 * @fires cds-add-select-selection-summary-item-remove - Fired when remove button clicked; detail: { itemId }
 */
@customElement(`${prefix}-add-select-selection-summary-item`)
class CDSAddSelectSelectionSummaryItem extends LitElement {
  /**
   * Item data (set via JS property)
   */
  @property({ attribute: false })
  item: AddSelectItem | null = null;

  /**
   * Use accordion pattern for display
   */
  @property({ type: Boolean, attribute: 'use-accordion', reflect: true })
  useAccordion = false;

  /**
   * Accessible label for the remove button
   */
  @property({ type: String, attribute: 'remove-button-label' })
  removeButtonLabel = 'Remove item';

  /**
   * When true, the remove button is not rendered
   */
  @property({ type: Boolean, attribute: 'hide-remove-button' })
  hideRemoveButton = false;

  /** Whether the default slot has assigned elements */
  @state()
  private _hasDefaultSlot = false;

  /** Whether the render-item slot has assigned elements */
  @state()
  private _hasRenderItemSlot = false;

  /** Whether the accordion-title slot has assigned elements */
  @state()
  private _hasAccordionTitleSlot = false;

  /** Whether the accordion-body slot has assigned elements */
  @state()
  private _hasAccordionBodySlot = false;

  /** Whether the custom accordion is open */
  @state()
  private _accordionOpen = false;

  private _handleDefaultSlotChange(e: Event) {
    const slot = e.target as HTMLSlotElement;
    this._hasDefaultSlot = slot.assignedElements({ flatten: true }).length > 0;
  }

  private _handleAccordionTitleSlotChange(e: Event) {
    const slot = e.target as HTMLSlotElement;
    this._hasAccordionTitleSlot =
      slot.assignedElements({ flatten: true }).length > 0;
  }

  private _handleAccordionBodySlotChange(e: Event) {
    const slot = e.target as HTMLSlotElement;
    this._hasAccordionBodySlot =
      slot.assignedElements({ flatten: true }).length > 0;
  }

  private _handleRenderItemSlotChange(e: Event) {
    const slot = e.target as HTMLSlotElement;
    this._hasRenderItemSlot =
      slot.assignedElements({ flatten: true }).length > 0;
  }

  private _handleRemove() {
    if (!this.item) {
      return;
    }
    this.dispatchEvent(
      new CustomEvent(
        (
          this.constructor as typeof CDSAddSelectSelectionSummaryItem
        ).eventRemove,
        {
          bubbles: true,
          cancelable: true,
          composed: true,
          detail: { itemId: this.item.id },
        }
      )
    );
  }

  private _renderDefaultItemDetails() {
    const { item } = this;
    if (!item?.itemDetails || !Array.isArray(item.itemDetails)) {
      return nothing;
    }
    if (item.itemDetails.length === 0) {
      return nothing;
    }
    return html`
      ${(item.itemDetails as Array<{ label: string; value: unknown }>).map(
        ({ label, value: val }) => html`
          <div class="${blockClass}__selection-summary-item-entry">
            <p class="${blockClass}__selection-summary-item-header">${label}</p>
            <p class="${blockClass}__selection-summary-item-body">
              ${String(val)}
            </p>
          </div>
        `
      )}
    `;
  }

  private _renderRemoveButton() {
    if (this.hideRemoveButton) {
      return nothing;
    }
    return html`
      <div
        class="${blockClass}__selection-summary-item-remove-button-container">
        <cds-icon-button
          tooltip-text=${this.removeButtonLabel}
          autoalign
          kind="ghost"
          size="sm"
          class="${blockClass}__selection-summary-item-remove-button"
          @click=${(e: Event) => {
            e.stopPropagation();
            this._handleRemove();
          }}>
          ${iconLoader(SubtractAlt16, { slot: 'icon' })}
        </cds-icon-button>
      </div>
    `;
  }

  render() {
    const { item, useAccordion } = this;

    const itemClasses = classMap({
      [`${blockClass}__selection-summary-item`]: true,
      [`${blockClass}__selection-summary-item--accordion`]: useAccordion,
      [`${blockClass}__selection-summary-item--default`]: !useAccordion,
    });

    const defaultTitle = item
      ? html`
          <div class="${blockClass}__selection-summary-item-selected-item">
            <p class="${blockClass}__selection-summary-item-title">
              ${item.title}
            </p>
            ${item.subtitle
              ? html`<p class="${blockClass}__selection-summary-item-subtitle">
                  ${item.subtitle}
                </p>`
              : nothing}
          </div>
        `
      : nothing;

    // Priority flags (high → low):
    // 1. default slot has content
    // 2. render-item slot has content
    // 3. useAccordion (with optional accordion-title / accordion-body slots)
    // 4. plain default rendering from item data
    const showDefault = this._hasDefaultSlot;
    const showRenderItem = !showDefault && this._hasRenderItemSlot;
    const showAccordion = !showDefault && !showRenderItem && useAccordion;
    const showPlain = !showDefault && !showRenderItem && !useAccordion;

    return html`
      <div class=${itemClasses}>
        <!-- Default slot — hidden wrapper, always present for detection -->
        <div style=${showDefault ? '' : 'display:none'}>
          <slot @slotchange=${this._handleDefaultSlotChange}></slot>
        </div>

        <!-- render-item slot — slot content owns full width; remove button is absolute -->
        <div
          class="${blockClass}__selection-summary-item-render-item-wrapper"
          style=${showRenderItem ? '' : 'display:none'}>
          <slot
            name="render-item"
            @slotchange=${this._handleRenderItemSlotChange}></slot>
          ${showRenderItem ? this._renderRemoveButton() : nothing}
        </div>

        <!-- accordion mode wrapper — always rendered when useAccordion, hidden otherwise -->
        <div style=${showAccordion ? '' : 'display:none'}>
          <div class="${blockClass}__selection-summary-item-accordion">
            <button
              type="button"
              class="${blockClass}__selection-summary-item-accordion-heading"
              aria-expanded=${this._accordionOpen}
              @click=${() => {
                this._accordionOpen = !this._accordionOpen;
              }}>
              <span
                class="${blockClass}__selection-summary-item-accordion-arrow ${this
                  ._accordionOpen
                  ? `${blockClass}__selection-summary-item-accordion-arrow--open`
                  : ''}">
                ${iconLoader(ChevronRight16, {})}
              </span>

              <span
                class="${blockClass}__selection-summary-item-accordion-title"
                style=${this._hasAccordionTitleSlot ? 'display:none' : ''}>
                ${defaultTitle}
              </span>
              <span
                class="${blockClass}__selection-summary-item-accordion-title ${blockClass}__selection-summary-item-accordion-title--slot"
                style=${this._hasAccordionTitleSlot ? '' : 'display:none'}>
                <slot
                  name="accordion-title"
                  @slotchange=${this._handleAccordionTitleSlotChange}></slot>
              </span>

              ${this._renderRemoveButton()}
            </button>

            <!-- accordion-body: shown only when open -->
            <div
              class="${blockClass}__selection-summary-item-accordion-body"
              style=${this._accordionOpen ? '' : 'display:none'}>
              <div style=${this._hasAccordionBodySlot ? 'display:none' : ''}>
                ${this._renderDefaultItemDetails()}
              </div>
              <div style=${this._hasAccordionBodySlot ? '' : 'display:none'}>
                <slot
                  name="accordion-body"
                  @slotchange=${this._handleAccordionBodySlotChange}></slot>
              </div>
            </div>
          </div>
        </div>

        <!-- plain (non-accordion) mode -->
        ${showPlain
          ? html`
              <div class="${blockClass}__selection-summary-item-title-wrapper">
                ${defaultTitle} ${this._renderRemoveButton()}
              </div>
              <div class="${blockClass}__selection-summary-item-content">
                ${this._renderDefaultItemDetails()}
              </div>
            `
          : nothing}
      </div>
    `;
  }

  /**
   * The name of the custom event fired when the remove button is clicked.
   * detail: { itemId: string }
   */
  static get eventRemove() {
    return `${prefix}-add-select-selection-summary-item-remove`;
  }

  static styles = styles;
}

export default CDSAddSelectSelectionSummaryItem;
