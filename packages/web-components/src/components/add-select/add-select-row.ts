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
import '../checkbox/index';
import '../radio-button/index';
import '../skeleton-text/index';
import '../skeleton-icon/index';
import '../icon-button/index';
import { iconLoader } from '../../globals/internal/icon-loader';
import ChevronRight16 from '@carbon/icons/es/chevron--right/16';
import View16 from '@carbon/icons/es/view/16';

import { prefix } from '../../globals/settings';
import styles from './add-select-row.scss?lit';

const blockClass = `${prefix}--add-select__next-row`;

/**
 * Add Select Row component - represents a single selectable row
 * @element cds-add-select-row
 * @slot default - Custom content to render after the title/subtitle section.
 * @slot icon - Optional icon slot
 * @slot meta - Optional metadata slot
 * @fires cds-add-select-row-select - Fired when row is selected/deselected
 * @fires cds-add-select-row-navigate - Fired when navigating to children
 * @fires cds-add-select-row-item-panel-click - Fired when the item panel icon button is clicked
 */
@customElement(`${prefix}-add-select-row`)
class CDSAddSelectRow extends LitElement {
  /**
   * Whether this row renders a checkbox (multi) or radio button (single).
   * Set by the parent cds-add-select-column via the _column-multi attribute.
   * Falls back to reading the nearest cds-add-select wrapper when not set.
   */
  @property({ type: Boolean, attribute: '_column-multi', reflect: true })
  private _columnMulti = false;

  private get _multi(): boolean {
    if (this.hasAttribute('_column-multi')) {
      return this._columnMulti;
    }
    const parent = this.closest(`${prefix}-add-select`) as HTMLElement & {
      multi?: boolean;
    };
    return parent?.multi ?? false;
  }

  /**
   * Unique identifier for the item
   */
  @property({ type: String, attribute: 'item-id' })
  itemId = '';

  /**
   * Item title
   */
  @property({ type: String })
  title = '';

  /**
   * Item subtitle
   */
  @property({ type: String })
  subtitle = '';

  /**
   * Item value
   */
  @property({ type: String })
  value = '';

  /**
   * Whether the item is selected
   */
  @property({ type: Boolean, reflect: true })
  selected = false;

  /**
   * Whether the checkbox is in an indeterminate state (multi hierarchical)
   */
  @property({ type: Boolean, reflect: true })
  indeterminate = false;

  /**
   * Whether the item is disabled
   */
  @property({ type: Boolean })
  disabled = false;

  /**
   * Whether to render the row as a skeleton (loading) state
   */
  @property({ type: Boolean, reflect: true })
  skeleton = false;

  /** Whether the icon slot has assigned content */
  @state()
  private _hasIconSlot = false;

  private _handleIconSlotChange(e: Event) {
    const slot = e.target as HTMLSlotElement;
    this._hasIconSlot = slot.assignedElements({ flatten: true }).length > 0;
  }

  /** Whether the rowContent slot has assigned content */
  @state()
  private _hasRowContentSlot = false;

  private _handleRowContentSlotChange(e: Event) {
    const slot = e.target as HTMLSlotElement;
    this._hasRowContentSlot =
      slot.assignedElements({ flatten: true }).length > 0;
  }

  /**
   * Whether to show the item details icon button
   */
  @property({ type: Boolean, attribute: 'has-item-panel' })
  hasItemPanel = false;

  /**
   * Whether the item panel is currently open for this item
   */
  @property({ type: Boolean, attribute: 'item-panel-open', reflect: true })
  itemPanelOpen = false;

  /**
   * Accessible label for the item panel icon button
   */
  @property({ type: String, attribute: 'item-panel-icon-description' })
  itemPanelIconDescription = 'View details';

  /**
   * Whether the item has children (for navigation)
   */
  @property({ type: Boolean, attribute: 'has-children' })
  hasChildren = false;

  /**
   * Parent ID for hierarchical navigation
   */
  @property({ type: String, attribute: 'parent-id' })
  parentId = '';

  /**
   * Handle item panel icon button click
   */
  private _handleItemPanelClick(event: Event) {
    event.stopPropagation();
    const init = {
      bubbles: true,
      cancelable: true,
      composed: true,
      detail: { itemId: this.itemId },
    };
    this.dispatchEvent(
      new CustomEvent(
        (this.constructor as typeof CDSAddSelectRow).eventItemPanelClick,
        init
      )
    );
  }

  /**
   * Handle navigation to children
   */
  private _handleNavigate(event: Event) {
    event.stopPropagation();

    if (!this.hasChildren) {
      return;
    }

    const init = {
      bubbles: true,
      cancelable: true,
      composed: true,
      detail: {
        itemId: this.itemId,
        title: this.title,
        parentId: this.parentId,
      },
    };
    this.dispatchEvent(
      new CustomEvent(
        (this.constructor as typeof CDSAddSelectRow).eventNavigate,
        init
      )
    );
  }

  /**
   * Handle selection change from checkbox/radio button
   */
  private _handleSelect(event: Event) {
    if (this.disabled) {
      event.preventDefault();
      return;
    }

    const target = event.target as HTMLElement & { checked?: boolean };
    this.selected = target.checked || false;

    this._emitSelectionEvent();
  }

  /**
   * Emit selection event
   */
  _emitSelectionEvent() {
    const init = {
      bubbles: true,
      cancelable: true,
      composed: true,
      detail: {
        itemId: this.itemId,
        selected: this.selected,
        value: this.value,
      },
    };
    this.dispatchEvent(
      new CustomEvent(
        (this.constructor as typeof CDSAddSelectRow).eventSelect,
        init
      )
    );
  }

  render() {
    const {
      itemId,
      title,
      subtitle,
      selected,
      indeterminate,
      disabled,
      hasChildren,
      hasItemPanel,
      itemPanelOpen,
      itemPanelIconDescription,
      skeleton,
      _handleSelect: handleSelect,
    } = this;

    const rowClasses = classMap({
      [`${blockClass}`]: true,
      [`${blockClass}--selected`]: selected,
      [`${blockClass}--disabled`]: disabled,
      [`${blockClass}--skeleton`]: skeleton,
    });

    // Skeleton state — non-interactive placeholder
    if (skeleton) {
      return html`
        <div class=${rowClasses} aria-hidden="true">
          <div class="${blockClass}__cell">
            <div class="${blockClass}__cell-wrapper">
              <div class="${blockClass}__skeleton-control"></div>
              <div class="${blockClass}__content">
                <!-- Hidden slot kept so slotchange fires and _hasIconSlot is accurate -->
                <slot
                  name="icon"
                  style="display:none"
                  @slotchange=${this._handleIconSlotChange}></slot>
                ${this._hasIconSlot
                  ? html`
                      <div class="${blockClass}__icon">
                        <cds-skeleton-icon></cds-skeleton-icon>
                      </div>
                    `
                  : nothing}
                <div class="${blockClass}__text">
                  <cds-skeleton-text
                    class="${blockClass}__skeleton-title"></cds-skeleton-text>
                </div>
              </div>
            </div>
          </div>
        </div>
      `;
    }

    return html`
      <div
        class=${rowClasses}
        role="row"
        aria-selected=${selected}
        tabindex="-1"
        ?data-has-children=${hasChildren}>
        <div class="${blockClass}__cell" role="gridcell">
          <div class="${blockClass}__cell-wrapper">
            ${this._multi
              ? html`
                  <cds-checkbox
                    class="${blockClass}__checkbox"
                    ?checked=${selected}
                    ?indeterminate=${indeterminate}
                    ?disabled=${disabled}
                    @cds-checkbox-changed=${handleSelect}
                    label-text=${title}
                    ?hide-label=${true}
                    tabindex="-1"></cds-checkbox>
                `
              : html`
                  <cds-radio-button
                    class="${blockClass}__radio"
                    ?checked=${selected}
                    ?disabled=${disabled}
                    @cds-radio-button-changed=${handleSelect}
                    label-text=" "
                    aria-label=${title}
                    value=${itemId}
                    tabindex="-1"></cds-radio-button>
                `}

            <div class="${blockClass}__content">
              <slot
                name="icon"
                class="${blockClass}__icon"
                @slotchange=${this._handleIconSlotChange}></slot>
              ${this._hasRowContentSlot
                ? nothing
                : html`
                    <div class="${blockClass}__text">
                      <div class="${blockClass}__title">${title}</div>
                      ${subtitle
                        ? html`<div class="${blockClass}__subtitle">
                            ${subtitle}
                          </div>`
                        : nothing}
                    </div>
                    <slot></slot>
                  `}
              <slot
                name="row-content"
                @slotchange=${this._handleRowContentSlotChange}></slot>
              <slot name="meta"></slot>
            </div>

            ${hasItemPanel
              ? html`
                  <cds-icon-button
                    class="${blockClass}__view-item-panel"
                    kind="ghost"
                    size="sm"
                    tooltip-text=${itemPanelIconDescription}
                    autoalign
                    ?aria-pressed=${itemPanelOpen}
                    @click=${this._handleItemPanelClick}>
                    ${iconLoader(View16, { slot: 'icon' })}
                  </cds-icon-button>
                `
              : nothing}
            ${hasChildren
              ? html`
                  <div
                    class="${blockClass}__nav-indicator"
                    @click=${this._handleNavigate}
                    role="button"
                    tabindex="-1"
                    aria-label="Navigate into ${title}">
                    <slot name="nav-icon">
                      ${iconLoader(ChevronRight16, {
                        slot: 'icon',
                      })}
                    </slot>
                  </div>
                `
              : nothing}
          </div>
        </div>
      </div>
    `;
  }

  /**
   * The name of the custom event fired when row is selected/deselected
   */
  static get eventSelect() {
    return `${prefix}-add-select-row-select`;
  }

  /**
   * The name of the custom event fired when navigating to children
   */
  static get eventNavigate() {
    return `${prefix}-add-select-row-navigate`;
  }

  /**
   * The name of the custom event fired when item panel icon button is clicked
   */
  static get eventItemPanelClick() {
    return `${prefix}-add-select-row-item-panel-click`;
  }

  static styles = styles;
}

export default CDSAddSelectRow;
