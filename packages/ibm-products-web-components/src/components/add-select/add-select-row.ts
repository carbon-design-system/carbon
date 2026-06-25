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
import { classMap } from 'lit/directives/class-map.js';
import { carbonElement as customElement } from '@carbon/web-components/es/globals/decorators/carbon-element.js';
import '@carbon/web-components/es/components/checkbox/index.js';
import '@carbon/web-components/es/components/radio-button/index.js';
import { iconLoader } from '@carbon/web-components/es/globals/internal/icon-loader.js';
import ChevronRight16 from '@carbon/icons/es/chevron--right/16';

import { prefix } from '../../globals/settings';
import styles from './add-select-row.scss?lit';

const blockClass = `${prefix}--add-select__next-row`;

/**
 * Add Select Row component - represents a single selectable row
 * @element c4p-add-select-row
 * @slot default - Custom content to render after the title/subtitle section. Useful for adding badges, tags, or other metadata to the row.
 * @slot icon - Optional icon slot
 * @slot meta - Optional metadata slot
 * @fires c4p-add-select-row-select - Fired when row is selected/deselected
 * @fires c4p-add-select-row-navigate - Fired when navigating to children
 */
@customElement(`${prefix}-add-select-row`)
class CDSAddSelectRow extends LitElement {
  /**
   * Whether this is part of a multi-select list (inherited from parent c4p-add-select)
   * @private
   */
  private get _multi(): boolean {
    const parent = this.closest(`${prefix}-add-select`) as any;
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
   * Whether the item is disabled
   */
  @property({ type: Boolean })
  disabled = false;

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
   * Handle navigation to children
   */
  private _handleNavigate(event: Event) {
    event.stopPropagation();

    if (!this.hasChildren) {
      return;
    }

    // Emit navigation event
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

    // Get the new checked state from the event
    const target = event.target as any;
    this.selected = target.checked || false;

    // Emit selection event
    this._emitSelectionEvent();
  }

  /**
   * Emit selection event
   */
  private _emitSelectionEvent() {
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
      disabled,
      hasChildren,
      _handleSelect: handleSelect,
    } = this;

    const rowClasses = classMap({
      [`${blockClass}`]: true,
      [`${blockClass}--selected`]: selected,
      [`${blockClass}--disabled`]: disabled,
    });

    return html`
      <div
        class=${rowClasses}
        role="row"
        aria-selected=${selected}
        tabindex="-1"
        ?data-has-children=${hasChildren}
      >
        <div class="${blockClass}__cell" role="gridcell">
          <div class="${blockClass}__cell-wrapper">
            ${this._multi
              ? html`
                  <cds-checkbox
                    class="${blockClass}__checkbox"
                    ?checked=${selected}
                    ?disabled=${disabled}
                    @cds-checkbox-changed=${handleSelect}
                    label-text=${title}
                    ?hide-label=${true}
                    tabindex="-1"
                  >
                  </cds-checkbox>
                `
              : html`
                  <cds-radio-button
                    ?checked=${selected}
                    ?disabled=${disabled}
                    @cds-radio-button-changed=${handleSelect}
                    label-text=${title}
                    value=${itemId}
                    tabindex="-1"
                  >
                  </cds-radio-button>
                `}

            <div class="${blockClass}__content">
              <slot name="icon" class="${blockClass}__icon"></slot>
              <div class="${blockClass}__text">
                <div class="${blockClass}__title">${title}</div>
                ${subtitle &&
                html`<div class="${blockClass}__subtitle">${subtitle}</div>`}
              </div>
              <slot></slot>
              <slot name="meta"></slot>
            </div>

            ${hasChildren
              ? html`
                  <div
                    class="${blockClass}__nav-indicator"
                    @click=${this._handleNavigate}
                    role="button"
                    tabindex="-1"
                    aria-label="Navigate to children"
                  >
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

  static styles = styles;
}

export default CDSAddSelectRow;
