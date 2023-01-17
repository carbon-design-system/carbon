/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import settings from 'carbon-components/es/globals/js/settings';
import { classMap } from 'lit-html/directives/class-map';
import {
  html,
  svg,
  property,
  query,
  customElement,
  LitElement,
} from 'lit-element';
import CheckmarkFilled16 from '@carbon/icons/lib/checkmark--filled/16';
import ifNonNull from '../../globals/directives/if-non-null';
import FocusMixin from '../../globals/mixins/focus';
import { TILE_COLOR_SCHEME } from './defs';
import styles from './tile.scss';

const { prefix } = settings;

/**
 * Multi-selectable tile.
 *
 * @element bx-selectable-tile
 * @fires bx-selectable-tile-changed - The custom event fired after this selectable tile changes its selected state.
 */
@customElement(`${prefix}-selectable-tile`)
class BXSelectableTile extends FocusMixin(LitElement) {
  @query('input')
  protected _inputNode!: HTMLInputElement;

  /**
   * The `type` attribute of the `<input>`.
   */
  protected _inputType = 'checkbox';

  /**
   * Handles `change` event on the `<input>` in the shadow DOM.
   */
  protected _handleChange() {
    this.selected = this._inputNode.checked;

    const selected = this.selected;
    const { eventChange } = this.constructor as typeof BXSelectableTile;
    this.dispatchEvent(
      new CustomEvent(eventChange, {
        bubbles: true,
        composed: true,
        detail: {
          selected,
        },
      })
    );
  }

  /**
   * The a11y text for the checkmark icon of the selected state.
   */
  @property({ attribute: 'checkmark-label' })
  checkmarkLabel!: string;

  /**
   * The color scheme.
   */
  @property({ attribute: 'color-scheme', reflect: true })
  colorScheme = TILE_COLOR_SCHEME.REGULAR;

  /**
   * The form name.
   */
  @property()
  name!: string;

  /**
   * `true` to show the selected state.
   */
  @property({ type: Boolean, reflect: true })
  selected = false;

  /**
   * The form value.
   */
  @property()
  value!: string;

  createRenderRoot() {
    return this.attachShadow({
      mode: 'open',
      delegatesFocus:
        Number((/Safari\/(\d+)/.exec(navigator.userAgent) ?? ['', 0])[1]) <=
        537,
    });
  }

  render() {
    const {
      checkmarkLabel,
      colorScheme,
      name,
      selected,
      value,
      _inputType: inputType,
      _handleChange: handleChange,
    } = this;
    const classes = classMap({
      [`${prefix}--tile`]: true,
      [`${prefix}--tile--selectable`]: true,
      [`${prefix}--tile--${colorScheme}`]: colorScheme,
    });
    return html`
      <input
        type="${inputType}"
        id="input"
        class="${prefix}--tile-input"
        tabindex="-1"
        name="${ifNonNull(name)}"
        value="${ifNonNull(value)}"
        .checked=${selected}
        @change=${handleChange}
      />
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
  static get eventChange() {
    return `${prefix}-selectable-tile-changed`;
  }

  static styles = styles;
}

export default BXSelectableTile;
