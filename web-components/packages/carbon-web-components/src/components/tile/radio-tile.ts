/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, svg } from 'lit';
import { classMap } from 'lit-html/directives/class-map';
import { ifDefined } from 'lit/directives/if-defined';
import { customElement } from 'lit/decorators.js';
import { prefix } from '../../globals/settings';
import SelectableTile from './selectable-tile';
import CheckmarkFilled16 from '@carbon/icons/lib/checkmark--filled/16';

/**
 * Single-selectable tile.
 *
 * @element cds-radio-tile
 */
@customElement(`${prefix}-radio-tile`)
class CDSRadioTile extends SelectableTile {
  /**
   * The `type` attribute of the `<input>`.
   */
  protected _inputType = 'radio';

  /**
   * Handles `change` event on the `<input>` in the shadow DOM.
   */
  protected _handleChange() {
    this.selected = true;
    const { selected, name } = this;
    const { eventRadioChange } = this.constructor as typeof CDSRadioTile;
    this.dispatchEvent(
      new CustomEvent(eventRadioChange, {
        bubbles: true,
        composed: true,
        detail: {
          selected,
          name,
        },
      })
    );
  }

  render() {
    const {
      colorScheme,
      checkmarkLabel,
      name,
      selected,
      value,
      _inputType: inputType,
      _handleChange: handleChange,
    } = this;
    const classes = classMap({
      [`${prefix}--tile`]: true,
      [`${prefix}--tile--selectable`]: true,
      [`${prefix}--tile--is-selected`]: selected,
      [`${prefix}--tile--${colorScheme}`]: colorScheme,
    });
    return html`
      <input
        type="${inputType}"
        id="input"
        class="${prefix}--tile-input"
        tabindex="-1"
        name="${ifDefined(name)}"
        value="${ifDefined(value)}"
        .checked=${selected}
        @change=${handleChange} />
      <label for="input" class="${classes}" tabindex="0">
        <div class="${prefix}--tile__checkmark">
          ${CheckmarkFilled16({
            children: !checkmarkLabel
              ? undefined
              : svg`<title>${checkmarkLabel}</title>`,
          })}
        </div>
        <div class="${prefix}--tile-content"><slot></slot></div>
      </label>
    `;
  }

  /**
   * The name of the custom event fired after this selectable tile changes its selected state.
   */
  static get eventRadioChange() {
    return `${prefix}-radio-tile-selected`;
  }
}

export default CDSRadioTile;
