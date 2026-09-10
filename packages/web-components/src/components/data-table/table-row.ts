/**
 * Copyright IBM Corp. 2019, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';
import { prefix } from '../../globals/settings';
import ChevronRight16 from '@carbon/icons/es/chevron--right/16.js';
import { carbonElement as customElement } from '../../globals/decorators/carbon-element';
import FocusMixin from '../../globals/mixins/focus';
import styles from './data-table.scss?lit';
import '../checkbox';
import '../radio-button';

import HostListener from '../../globals/decorators/host-listener';
import HostListenerMixin from '../../globals/mixins/host-listener';
import CDSTableExpandedRow from './table-expanded-row';
import CDSTableCell from './table-cell';
import { iconLoader } from '../../globals/internal/icon-loader';

/**
 * Data table row.
 *
 * @element cds-table-row
 * @csspart selection-container The container of the checkbox.
 * @csspart selection The checkbox.
 * @fires cds-table-row-change-selection
 *   The custom event fired before this row is selected/unselected upon a user gesture.
 *   Cancellation of this event stops the user-initiated change in selection.
 * @fires cds-radio-button-changed
 *   The name of the custom event fired after this radio button changes its checked state.
 * @fires cds-checkbox-changed
 *   The name of the custom event fired after this checkbox changes its checked state.
 * @fires cds-table-row-expando-beingtoggled
 *   The name of the custom event fired before the expanded state of this row is being toggled upon a user gesture.
 *   Cancellation of this event stops the user-initiated action of toggling the expanded state.
 * @fires cds-table-row-expando-toggled
 *   The name of the custom event fired after the expanded state of this row is toggled upon a user gesture.
 */
@customElement(`${prefix}-table-row`)
class CDSTableRow extends HostListenerMixin(FocusMixin(LitElement)) {
  /**
   * `true` if there is an AI Label.
   */
  protected _hasAILabel = false;

  /**
   * Handles `click` event on the radio button.
   *
   * @param event The event.
   */
  @HostListener('eventRadioChange')
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment -- https://github.com/carbon-design-system/carbon/issues/20452
  // @ts-ignore
  private _handleClickSelectionRadio(event: CustomEvent) {
    const { detail } = event;
    const selected = detail.checked;
    const init = {
      bubbles: true,
      cancelable: true,
      composed: true,
      detail: {
        selected,
      },
    };
    const constructor = this.constructor as typeof CDSTableRow;
    if (
      this.dispatchEvent(
        new CustomEvent(constructor.eventBeforeChangeSelection, init)
      )
    ) {
      this.selected = selected;
      const { selectorExpandedRow } = this.constructor as typeof CDSTableRow;

      if (this.nextElementSibling?.matches(selectorExpandedRow)) {
        (this.nextElementSibling as CDSTableExpandedRow).selected = selected;
      }
    }
  }

  /**
   * Handles `click` event on the check box.
   *
   * @param event The event.
   */
  @HostListener('eventCheckboxChange')
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment -- https://github.com/carbon-design-system/carbon/issues/20452
  // @ts-expect-error
  private _handleClickSelectionCheckbox(event: CustomEvent) {
    const { detail } = event;
    const selected = detail.checked;
    const init = {
      bubbles: true,
      cancelable: true,
      composed: true,
      detail: {
        selected,
      },
    };
    const constructor = this.constructor as typeof CDSTableRow;
    if (
      this.dispatchEvent(
        new CustomEvent(constructor.eventBeforeChangeSelection, init)
      )
    ) {
      this.selected = selected;
      const { selectorExpandedRow } = this.constructor as typeof CDSTableRow;

      if (this.nextElementSibling?.matches(selectorExpandedRow)) {
        (this.nextElementSibling as CDSTableExpandedRow).selected = selected;
      }
    }
  }

  /**
   * Handles `click` event on the expando button.
   */
  private _handleClickExpando() {
    this._handleUserInitiatedToggleExpando();
  }

  /**
   * Handles `mouseover`/`mouseout` event handler on this element.
   *
   * @param event The event.
   */
  @HostListener('mouseover')
  @HostListener('mouseout')
  // @ts-expect-error: The decorator refers to this method but TS thinks this method is not referred to
  private _handleMouseOverOut(event: MouseEvent) {
    const { selectorExpandedRow, selectorTableCellOverflowMenu } = this
      .constructor as typeof CDSTableRow;
    const { nextElementSibling } = this;
    if (nextElementSibling?.matches(selectorExpandedRow)) {
      (nextElementSibling as CDSTableExpandedRow).highlighted =
        event.type === 'mouseover';
    }
    if (this.overflowMenuOnHover) {
      const overflowMenu = this.querySelector(selectorTableCellOverflowMenu);
      const parentCell = overflowMenu?.parentElement;

      if (event.type === 'mouseout') {
        (parentCell as CDSTableCell).overflowMenuOnHover = true;
      } else {
        (parentCell as CDSTableCell).overflowMenuOnHover = false;
      }
    }
  }

  /**
   * Handles user-initiated toggle request of the expando button in this table row.
   *
   * @param expanded The new expanded state.
   */
  _handleUserInitiatedToggleExpando(expanded = !this.expanded) {
    const init = {
      bubbles: true,
      cancelable: true,
      composed: true,
      detail: {
        expanded,
      },
    };
    if (
      this.dispatchEvent(
        new CustomEvent(
          (this.constructor as typeof CDSTableRow).eventBeforeExpandoToggle,
          init
        )
      )
    ) {
      this.expanded = expanded;
      this.dispatchEvent(
        new CustomEvent(
          (this.constructor as typeof CDSTableRow).eventExpandoToggle,
          init
        )
      );
    }
  }

  protected _renderExpandButton() {
    const { _handleClickExpando: handleClickExpando } = this;

    // Always use the same structure for consistency, but only render the button for expandable rows
    return html`
      <div class="${prefix}--table-expand">
        <div>
          <slot name="ai-label" @slotchange="${this._handleSlotChange}"></slot>
          <slot name="slug" @slotchange="${this._handleSlotChange}"></slot>
          ${this.expandable
            ? html`<button
                class="${prefix}--table-expand__button"
                @click="${handleClickExpando}">
                ${iconLoader(ChevronRight16, {
                  class: `${prefix}--table-expand__svg`,
                })}
              </button>`
            : html`&nbsp;`}
          <!-- Add non-breaking space for proper styling -->
        </div>
      </div>
    `;
  }

  /**
   * Handles `slotchange` event.
   */
  protected _handleSlotChange({ target }: Event) {
    const hasContent = (target as HTMLSlotElement)
      .assignedNodes()
      .filter((elem) =>
        (elem as HTMLElement).matches !== undefined
          ? (elem as HTMLElement).matches(
              (this.constructor as typeof CDSTableRow).aiLabelItem
            ) ||
            (elem as HTMLElement).matches(
              (this.constructor as typeof CDSTableRow).slugItem
            )
          : false
      );
    if (hasContent.length > 0) {
      this._hasAILabel = Boolean(hasContent);
      (hasContent[0] as HTMLElement).setAttribute('size', 'mini');
    }
    this.requestUpdate();
  }

  /**
   * @returns The first set of table cells.
   */
  protected _renderFirstCells() {
    const {
      disabled,
      hideCheckbox,
      radio,
      selected,
      selectionLabel,
      selectionName,
      selectionValue,
    } = this;
    return !selectionName
      ? undefined
      : html`
          <div class="${prefix}--table-column-checkbox">
            <div>
              <slot
                name="ai-label"
                @slotchange="${this._handleSlotChange}"></slot>
              <slot name="slug" @slotchange="${this._handleSlotChange}"></slot>
              ${radio
                ? html`<cds-radio-button data-table></cds-radio-button>`
                : html`<cds-checkbox
                    hide-label
                    ?hide-checkbox="${hideCheckbox}"
                    label-text="${selectionLabel}"
                    name=${selectionName}
                    data-table
                    ?disabled=${disabled}
                    ?checked=${selected}
                    value=${selectionValue}></cds-checkbox> `}
            </div>
          </div>
        `;
  }

  /**
   * `true` if this table should support batch expansion
   */
  @property({ type: Boolean, reflect: true, attribute: 'batch-expansion' })
  batchExpansion = false;

  /**
   * `true` if this table row should be disabled.
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /**
   * `true` if this table row is placed at an even position in parent `<cds-table-body>`.
   * `<cds-table-body>` sets this property, _only_ in zebra stripe mode.
   *
   * @private
   */
  @property({ type: Boolean, reflect: true })
  even = false;

  /**
   * `true` if this table row can be expanded to show content underneath
   *
   * @private
   */
  @property({ type: Boolean, reflect: true })
  expandable = false;

  /**
   * `true` when the table row expanded is showing
   *
   * @private
   */
  @property({ type: Boolean, reflect: true })
  expanded = false;

  /**
   * `true` if this table row should be filtered out.
   */
  @property({ type: Boolean, reflect: true })
  filtered = false;

  /**
   * Specify whether the checkbox should be present in the DOM,
   * but invisible and uninteractable.
   */
  @property({ type: Boolean, reflect: true, attribute: 'hide-checkbox' })
  hideCheckbox = false;

  /**
   * `true` if the table row should be highlighted.
   */
  @property({ type: Boolean, reflect: true })
  highlighted = false;

  /**
   * `true` if this table row is placed at an odd position in parent `<cds-table-body>`.
   * `<cds-table-body>` sets this property, _only_ in zebra stripe mode.
   *
   * @private
   */
  @property({ type: Boolean, reflect: true })
  odd = false;

  /**
   * Specify whether the overflow menu (if it exists) should be shown always, or only on hover
   */
  @property({
    type: Boolean,
    reflect: true,
    attribute: 'overflow-menu-on-hover',
  })
  overflowMenuOnHover = false;

  /**
   * Specify whether the control should be a radio button or inline checkbox
   *
   * @private
   */
  @property({ type: Boolean, reflect: true })
  radio = false;

  /**
   * `true` if this table row should be selected.
   */
  @property({ type: Boolean, reflect: true })
  selected = false;

  /**
   * The `aria-label` attribute for the `<label>` for selection.
   */
  @property({ attribute: 'selection-label' })
  selectionLabel = 'Select row';

  /**
   * The `name` attribute for the `<input>` for selection.
   * If present, this table row will be a selectable one.
   */
  @property({ attribute: 'selection-name' })
  selectionName = '';

  /**
   * The `value` attribute for the `<input>` for selection.
   */
  @property({ attribute: 'selection-value' })
  selectionValue = '';

  /**
   * TODO: Uncomment when Carbon fully implements sticky header
   * Specify whether the header should be sticky.
   * Still experimental: may not work with every combination of table props
   */
  // @property({ type: Boolean, reflect: true, attribute: 'sticky-header' })
  // stickyHeader = false;

  connectedCallback() {
    if (!this.hasAttribute('role')) {
      this.setAttribute('role', 'row');
    }
    super.connectedCallback();
  }

  updated(changedProperties) {
    if (changedProperties.has('expanded')) {
      const { selectorExpandedRow } = this.constructor as typeof CDSTableRow;
      const { expanded, nextElementSibling } = this;
      if (nextElementSibling?.matches(selectorExpandedRow)) {
        (nextElementSibling as CDSTableExpandedRow).expanded = expanded;
      }
    }

    if (changedProperties.has('highlighted')) {
      const { selectorExpandedRow } = this.constructor as typeof CDSTableRow;
      const { highlighted, nextElementSibling } = this;
      if (nextElementSibling?.matches(selectorExpandedRow)) {
        (nextElementSibling as CDSTableExpandedRow).highlighted = highlighted;
      }
    }

    if (this._hasAILabel) {
      this.setAttribute('ai-label', '');
    } else {
      this.removeAttribute('ai-label');
    }
  }

  render() {
    if (this.selectionName) {
      this.closest(
        (this.constructor as typeof CDSTableRow).selectorTable
      )?.setAttribute('is-selectable', '');
    }

    // Always render the expand button container for consistent table structure
    // The button itself will only be rendered if the row is expandable
    const tableHasExpandableRows = this.closest(
      (this.constructor as typeof CDSTableRow).selectorTable
    )?.hasAttribute('expandable');

    return html`
      ${tableHasExpandableRows ? this._renderExpandButton() : ''}
      ${this._renderFirstCells()}
      <slot></slot>
    `;
  }

  /**
   * The name of the custom event fired after this radio button changes its checked state.
   */
  static get eventRadioChange() {
    return `${prefix}-radio-button-changed`;
  }

  /**
   * The name of the custom event fired after this radio button changes its checked state.
   */
  static get eventCheckboxChange() {
    return `${prefix}-checkbox-changed`;
  }

  /**
   * The name of the custom event fired before this row is selected/unselected upon a user gesture.
   * Cancellation of this event stops the user-initiated change in selection.
   */
  static get eventBeforeChangeSelection() {
    return `${prefix}-table-row-change-selection`;
  }

  /**
   * A selector that will return the parent table
   */
  static get selectorTable() {
    return `${prefix}-table`;
  }

  /**
   * The CSS selector to find the overflow menu on the table cell
   */
  static get selectorTableCellOverflowMenu() {
    return `${prefix}-table-cell ${prefix}-overflow-menu`;
  }

  /**
   * A selector that will return the corresponding expanded row.
   */
  static get selectorExpandedRow() {
    return `${prefix}-table-expanded-row`;
  }

  /**
   * A selector that will return the slug item.
   *
   * remove in v12
   */
  static get slugItem() {
    return `${prefix}-slug`;
  }

  /**
   * A selector that will return the AI Label item.
   */
  static get aiLabelItem() {
    return `${prefix}-ai-label`;
  }

  /**
   * The name of the custom event fired before the expanded state this row is being toggled upon a user gesture.
   * Cancellation of this event stops the user-initiated action of toggling the expanded state.
   */
  static get eventBeforeExpandoToggle() {
    return `${prefix}-table-row-expando-beingtoggled`;
  }

  /**
   * The name of the custom event fired after the expanded state this row is toggled upon a user gesture.
   */
  static get eventExpandoToggle() {
    return `${prefix}-table-row-expando-toggled`;
  }

  static styles = styles;
}

export default CDSTableRow;
