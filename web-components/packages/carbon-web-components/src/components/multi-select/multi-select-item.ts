/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import settings from 'carbon-components/es/globals/js/settings';
import { ifDefined } from 'lit-html/directives/if-defined';
import { html, property, customElement } from 'lit-element';
import BXDropdownItem from '../dropdown/dropdown-item';
import styles from './multi-select.scss';

const { prefix } = settings;

/**
 * Multi select item.
 * @element bx-multi-select-item
 */
@customElement(`${prefix}-multi-select-item`)
class BXMultiSelectItem extends BXDropdownItem {
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
          <input
            id="input"
            type="checkbox"
            class="${prefix}--checkbox"
            tabindex="-1"
            readonly
            ?disabled=${disabled}
            .checked=${selected}
            name="${ifDefined(selectionName || undefined)}"
            value="${value}" />
          <label for="input" class="${prefix}--checkbox-label">
            <span class="${prefix}--checkbox-label-text"><slot></slot></span>
          </label>
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

export default BXMultiSelectItem;
