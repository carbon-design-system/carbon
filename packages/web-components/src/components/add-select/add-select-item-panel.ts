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
import Close16 from '@carbon/icons/es/close/16';
import { prefix } from '../../globals/settings';
import type { AddSelectItem } from '@carbon/utilities';
import styles from './add-select-item-panel.scss?lit';

const blockClass = `${prefix}--add-select__next`;

/**
 * Add Select Item Panel — side panel displaying detailed information about an item.
 * CSS modifier `${blockClass}__item-summary-panel--open` is added when `open` is true,
 * enabling CSS-driven slide-in/out transitions.
 * @element cds-add-select-item-panel
 * @slot default - Highest priority: replaces all body rendering when populated
 * @slot render-item - Medium priority: receives item for custom rendering
 * @fires cds-add-select-item-panel-close - Fired when close icon is clicked
 */
@customElement(`${prefix}-add-select-item-panel`)
class CDSAddSelectItemPanel extends LitElement {
  /**
   * Panel title
   */
  @property({ type: String })
  title = 'Item details';

  /**
   * Item data (set via JS property)
   */
  @property({ attribute: false })
  item: AddSelectItem | null = null;

  /**
   * Controls panel visibility via CSS modifier class (enables CSS transitions)
   */
  @property({ type: Boolean, reflect: true })
  open = false;

  /**
   * Accessible label for the close icon button
   */
  @property({ type: String, attribute: 'close-icon-description' })
  closeIconDescription = 'Close';

  /**
   * Whether to show the close button
   */
  @property({ type: Boolean, attribute: 'show-close-button', reflect: true })
  showCloseButton = true;

  private _handleClose() {
    this.dispatchEvent(
      new CustomEvent(
        (this.constructor as typeof CDSAddSelectItemPanel).eventClose,
        { bubbles: true, cancelable: true, composed: true }
      )
    );
  }

  private _renderDefaultContent() {
    const { item } = this;
    if (!item) {
      return nothing;
    }
    const { itemDetails } = item;
    if (
      !itemDetails ||
      !Array.isArray(itemDetails) ||
      itemDetails.length === 0
    ) {
      return nothing;
    }
    return html`
      ${(itemDetails as Array<{ label: string; value: unknown }>).map(
        ({ label, value: val }) => html`
          <div class="${blockClass}__item-summary-panel-entry">
            <p class="${blockClass}__item-summary-panel-entry-title">
              ${label}
            </p>
            <p class="${blockClass}__item-summary-panel-entry-body">
              ${String(val)}
            </p>
          </div>
        `
      )}
    `;
  }

  /** Whether the default slot has assigned elements */
  @state()
  private _hasDefaultSlot = false;

  /** Whether the render-item slot has assigned elements */
  @state()
  private _hasRenderItemSlot = false;

  private _handleDefaultSlotChange(e: Event) {
    const slot = e.target as HTMLSlotElement;
    this._hasDefaultSlot = slot.assignedElements({ flatten: true }).length > 0;
  }

  private _handleRenderItemSlotChange(e: Event) {
    const slot = e.target as HTMLSlotElement;
    this._hasRenderItemSlot =
      slot.assignedElements({ flatten: true }).length > 0;
  }

  render() {
    const { title, open, closeIconDescription, showCloseButton } = this;

    const panelClasses = classMap({
      [`${blockClass}__item-summary-panel`]: true,
      [`${blockClass}__item-summary-panel--open`]: open,
    });

    // Priority: default slot > render-item slot > default item details
    const showDefault = this._hasDefaultSlot;
    const showRenderItem = !showDefault && this._hasRenderItemSlot;
    const showItemDetails = !showDefault && !showRenderItem;

    return html`
      <div class=${panelClasses}>
        <!-- Header -->
        <div class="${blockClass}__item-summary-panel-header">
          <p class="${blockClass}__item-summary-panel-title">${title}</p>
          ${showCloseButton
            ? html`
                <cds-icon-button
                  tooltip-text=${closeIconDescription}
                  autoalign
                  kind="ghost"
                  size="sm"
                  class="${blockClass}__item-summary-panel-close"
                  @click=${this._handleClose}>
                  ${iconLoader(Close16, { slot: 'icon' })}
                </cds-icon-button>
              `
            : nothing}
        </div>

        <!-- Body: each slot exists once; wrappers hide/show via display:none -->
        <div class="${blockClass}__item-summary-panel-body">
          <!-- default slot — always in DOM -->
          <div style=${showDefault ? '' : 'display:none'}>
            <slot @slotchange=${this._handleDefaultSlotChange}></slot>
          </div>
          <!-- render-item slot — always in DOM -->
          <div style=${showRenderItem ? '' : 'display:none'}>
            <slot
              name="render-item"
              @slotchange=${this._handleRenderItemSlotChange}></slot>
          </div>
          <!-- default item details — shown when no slot content -->
          <div style=${showItemDetails ? '' : 'display:none'}>
            ${this._renderDefaultContent()}
          </div>
        </div>
      </div>
    `;
  }

  /**
   * The name of the custom event fired when the close icon is clicked.
   */
  static get eventClose() {
    return `${prefix}-add-select-item-panel-close`;
  }

  static styles = styles;
}

export default CDSAddSelectItemPanel;
