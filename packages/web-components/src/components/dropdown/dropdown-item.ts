/**
 * Copyright IBM Corp. 2019, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement, html } from 'lit';
import { property, state } from 'lit/decorators.js';
import { prefix } from '../../globals/settings';
import { iconLoader } from '../../globals/internal/icon-loader';
import Checkmark16 from '@carbon/icons/es/checkmark/16.js';
import { DROPDOWN_SIZE } from './dropdown';
import styles from './dropdown.scss?lit';
import { carbonElement as customElement } from '../../globals/decorators/carbon-element';

/**
 * Dropdown item.
 *
 * @element cds-dropdown-item
 * @csspart selected-icon The selected icon.
 */
@customElement(`${prefix}-dropdown-item`)
class CDSDropdownItem extends LitElement {
  /**
   * `true` if this dropdown item should be disabled.
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /**
   * `true` if this dropdown item should be highlighted.
   * If `true`, parent `<dropdown>` selects/deselects this dropdown item upon keyboard interaction.
   *
   * @private
   */
  @property({ type: Boolean, reflect: true })
  highlighted = false;

  /**
   * `true` if this dropdown item should be selected.
   *
   * @private
   */
  @property({ type: Boolean, reflect: true })
  selected = false;

  /**
   * Dropdown size.
   */
  @property({ reflect: true })
  size = DROPDOWN_SIZE.MEDIUM;

  /**
   * The `value` attribute that is set to the parent `<cds-dropdown>` when this dropdown item is selected.
   */
  @property()
  value = '';

  /**
   * true if menu item has ellipsis applied
   */
  @state()
  _hasEllipsisApplied = false;

  connectedCallback() {
    super.connectedCallback();
    if (!this.hasAttribute('role')) {
      this.setAttribute('role', 'option');
    }
    if (!this.hasAttribute('id')) {
      this.setAttribute(
        'id',
        `${prefix}-dropdown-item-${(this.constructor as typeof CDSDropdownItem)
          .id++}`
      );
    }
    this.setAttribute('aria-selected', String(this.selected));
  }

  /**
   * Handles `slotchange` event.
   *
   * Adds the `title` property to its parent element so the native
   * browser tooltip appears for menu items that result in ellipsis
   */
  protected _handleSlotChange({ target }: Event) {
    const text = (target as HTMLSlotElement).assignedNodes().filter(
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20071
      (node) => node.nodeType !== Node.TEXT_NODE || node!.textContent!.trim()
    );

    const textContainer = this.shadowRoot?.querySelector(
      `.${prefix}--list-box__menu-item__option`
    );

    if (!textContainer || this._hasEllipsisApplied === true) return;

    const observer = new ResizeObserver(() => {
      this._hasEllipsisApplied =
        textContainer.scrollWidth > textContainer.clientWidth;

      if (this._hasEllipsisApplied) {
        textContainer.setAttribute('title', text[0].textContent ?? '');
      }
    });

    observer.observe(textContainer);
  }

  render() {
    const { selected, _handleSlotChange: handleSlotChange } = this;
    return html`
      <div class="${prefix}--list-box__menu-item__option" part="menu-item">
        <slot @slotchange=${handleSlotChange}></slot>
        ${!selected
          ? undefined
          : iconLoader(Checkmark16, {
              part: 'selected-icon',
              class: `${prefix}--list-box__menu-item__selected-icon`,
            })}
      </div>
    `;
  }

  /**
   * Store an identifier for use in composing this item's id.
   *
   * Auto-increments anytime a new dropdown-item appears.
   */
  static id = 0;

  static styles = styles;
}

export default CDSDropdownItem;
