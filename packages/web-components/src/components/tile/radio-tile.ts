/**
 * Copyright IBM Corp. 2019, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { prefix } from '../../globals/settings';
import SelectableTile from './selectable-tile';
import CheckmarkFilled16 from '@carbon/icons/es/checkmark--filled/16.js';
import { carbonElement as customElement } from '../../globals/decorators/carbon-element';
import { iconLoader } from '../../globals/internal/icon-loader';

/**
 * Radio tile.
 *
 * @element cds-radio-tile
 * @fires cds-radio-tile-selected
 *   The name of the custom event fired after this radio tile changes its selected state.
 */
@customElement(`${prefix}-radio-tile`)
class CDSRadioTile extends SelectableTile {
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

  protected _handleKeydown = (event: KeyboardEvent) => {
    if (event.key === ' ' || event.key === 'Enter') {
      event.preventDefault();
    }
  };

  render() {
    const {
      colorScheme,
      checkmarkLabel,
      disabled,
      hasRoundedCorners,
      name,
      selected,
      value,
      _handleChange: handleChange,
      _handleKeydown: handleKeydown,
      _hasAILabel: hasAILabel,
    } = this;
    const classes = classMap({
      [`${prefix}--tile`]: true,
      [`${prefix}--tile--selectable`]: true,
      [`${prefix}--tile--radio`]: true,
      [`${prefix}--tile--disabled`]: disabled,
      [`${prefix}--tile--is-selected`]: selected,
      [`${prefix}--tile--${colorScheme}`]: colorScheme,
      [`${prefix}--tile--slug-rounded`]: hasAILabel && hasRoundedCorners,
    });

    return html`
      <input
        type="radio"
        id="input"
        class="${prefix}--tile-input"
        ?disabled="${disabled}"
        tabindex="${selected ? 0 : -1}"
        name="${ifDefined(name)}"
        value="${ifDefined(value)}"
        .checked=${selected}
        @change=${!disabled ? handleChange : undefined}
        @keydown="${!disabled ? handleKeydown : undefined}" />
      <label part="label" for="input" class="${classes}">
        ${iconLoader(CheckmarkFilled16, {
          class: `${prefix}--tile__checkmark`,
          title: checkmarkLabel,
        })}
        <div class="${prefix}--tile-content"><slot></slot></div>
      </label>
      <slot name="decorator"></slot>
      <slot name="ai-label" @slotchange="${this._handleSlotChange}"></slot>
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
