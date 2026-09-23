/**
 * @license
 *
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement, html, nothing } from 'lit';
import { property } from 'lit/decorators.js';
import { carbonElement as customElement } from '../../globals/decorators/carbon-element';
import '../tag/index';
import '../icon-button/index';
import { iconLoader } from '../../globals/internal/icon-loader';
import Edit16 from '@carbon/icons/es/edit/16';
import { prefix } from '../../globals/settings';
import styles from './add-select-selection-summary.scss?lit';

const blockClass = `${prefix}--add-select__next`;

/**
 * Add Select Selection Summary — displays the list of selected items.
 * @element cds-add-select-selection-summary
 * @slot default - SelectionSummaryItem components or custom body content
 * @slot header - Replaces the entire header section
 * @slot header-actions - Custom actions alongside the edit icon
 * @slot empty-state - Shown when selectedItemCount is 0 or not set
 * @fires cds-add-select-selection-summary-edit - Fired when edit icon is clicked
 */
@customElement(`${prefix}-add-select-selection-summary`)
class CDSAddSelectSelectionSummary extends LitElement {
  /**
   * Panel title
   */
  @property({ type: String })
  title = 'Selected items';

  /**
   * Number of selected items — shown as a badge next to the title when provided.
   * Badge is hidden when this is omitted/undefined.
   */
  @property({ type: Number, attribute: 'selected-item-count' })
  selectedItemCount: number | undefined = undefined;

  /**
   * Show edit icon next to title
   */
  @property({ type: Boolean, attribute: 'show-edit-icon', reflect: true })
  showEditIcon = false;

  /**
   * Accessible label for the edit icon button
   */
  @property({ type: String, attribute: 'edit-icon-description' })
  editIconDescription = 'Edit selections';

  private _handleEdit() {
    this.dispatchEvent(
      new CustomEvent(
        (this.constructor as typeof CDSAddSelectSelectionSummary).eventEdit,
        { bubbles: true, cancelable: true, composed: true }
      )
    );
  }

  render() {
    const { title, selectedItemCount, showEditIcon, editIconDescription } =
      this;

    const showBody = selectedItemCount !== undefined && selectedItemCount > 0;

    return html`
      <div class="${blockClass}__selection-summary">
        <!-- Header -->
        <div class="${blockClass}__selection-summary-header">
          <slot name="header">
            <p class="${blockClass}__selection-summary-title">${title}</p>
            ${selectedItemCount !== undefined
              ? html`<cds-tag type="gray" size="sm"
                  >${selectedItemCount}</cds-tag
                >`
              : nothing}
            ${showEditIcon
              ? html`
                  <div class="${blockClass}__selection-summary-header-actions">
                    <slot name="header-actions"></slot>
                    <cds-icon-button
                      tooltip-text=${editIconDescription}
                      autoalign
                      kind="ghost"
                      size="sm"
                      class="${blockClass}__selection-summary-edit-button"
                      @click=${this._handleEdit}>
                      ${iconLoader(Edit16, { slot: 'icon' })}
                    </cds-icon-button>
                  </div>
                `
              : html`<slot name="header-actions"></slot>`}
          </slot>
        </div>

        <!-- Body: empty state or items -->
        <div class="${blockClass}__selection-summary-body">
          ${showBody
            ? html`<slot></slot>`
            : html`<slot name="empty-state"></slot>`}
        </div>
      </div>
    `;
  }

  /**
   * The name of the custom event fired when the edit icon is clicked.
   */
  static get eventEdit() {
    return `${prefix}-add-select-selection-summary-edit`;
  }

  static styles = styles;
}

export default CDSAddSelectSelectionSummary;
