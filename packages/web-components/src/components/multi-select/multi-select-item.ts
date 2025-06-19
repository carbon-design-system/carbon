/**
 * Copyright IBM Corp. 2019, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import { property } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { prefix } from '../../globals/settings';
import CDSDropdownItem from '../dropdown/dropdown-item';
import styles from './multi-select.scss?lit';
import { carbonElement as customElement } from '../../globals/decorators/carbon-element';
import '../checkbox';
/**
 * Multi select item.
 *
 * @element cds-multi-select-item
 */
@customElement(`${prefix}-multi-select-item`)
class CDSMultiSelectItem extends CDSDropdownItem {
  /**
   * The property to hide when item is filtered from input
   */
  @property({ type: Boolean })
  filtered;

  /**
   * Marks this item as the “select all” item.
   */
  @property({ type: Boolean, attribute: 'is-select-all', reflect: true })
  isSelectAll = false;

  /**
   * When `true`, renders the checkbox in its indeterminate state.
   */
  @property({ type: Boolean, reflect: true })
  indeterminate = false;

  /**
   * The `name` attribute for the `<input>` for selection.
   */
  @property({ attribute: 'selection-name' })
  selectionName = '';

  render() {
    const { disabled, selected, selectionName, value, indeterminate } = this;
    return html`
      <div class="${prefix}--list-box__menu-item__option">
        <cds-checkbox
          tabindex="-1"
          class="${prefix}--form-item ${prefix}--checkbox-wrapper"
          .checked=${selected}
          .indeterminate=${indeterminate}
          ?disabled=${disabled}
          name=${ifDefined(selectionName || undefined)}
          value=${value}>
          <slot></slot>
        </cds-checkbox>
      </div>
    `;
  }

  /**
   * A selector that will return multi select.
   */
  static get selectorList() {
    return `${prefix}-multi-select`;
  }

  static styles = styles;
}

export default CDSMultiSelectItem;
