/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2023
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
   * The `name` attribute for the `<input>` for selection.
   */
  @property({ attribute: 'selection-name' })
  selectionName = '';

  render() {
    const { disabled, selected, selectionName, value } = this;
    return html`
      <div class="${prefix}--list-box__menu-item__option">
        <div class="${prefix}--form-item ${prefix}--checkbox-wrapper">
          <span
            value="${value}"
            name="${ifDefined(selectionName || undefined)}"
            class="${prefix}--checkbox-label"
            ?disabled=${disabled}
            data-contained-checkbox-state=${selected}
            ><slot></slot
          ></span>
        </div>
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
