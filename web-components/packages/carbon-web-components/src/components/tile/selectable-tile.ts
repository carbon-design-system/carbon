/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { classMap } from 'lit/directives/class-map.js';
import { LitElement, html, svg } from 'lit';
import { property, customElement, query } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import Checkbox16 from '@carbon/icons/lib/checkbox/16';
import CheckboxCheckedFilled16 from '@carbon/icons/lib/checkbox--checked--filled/16';
import { prefix } from '../../globals/settings';
import FocusMixin from '../../globals/mixins/focus';
import HostListenerMixin from '../../globals/mixins/host-listener';
import { TILE_COLOR_SCHEME } from './defs';
import styles from './tile.scss';
import HostListener from '../../globals/decorators/host-listener';

/**
 * Multi-selectable tile.
 *
 * @element cds-selectable-tile
 * @fires cds-selectable-tile-changed - The custom event fired after this selectable tile changes its selected state.
 */
@customElement(`${prefix}-selectable-tile`)
class BXSelectableTile extends HostListenerMixin(FocusMixin(LitElement)) {
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
   * Handles the rendering of the icon.
   */
  protected _renderIcon() {
    const { selected, checkmarkLabel } = this;

    return html` ${selected
      ? CheckboxCheckedFilled16({
          children: !checkmarkLabel
            ? undefined
            : svg`<title>${checkmarkLabel}</title>`,
        })
      : Checkbox16({
          children: !checkmarkLabel
            ? undefined
            : svg`<title>${checkmarkLabel}</title>`,
        })}`;
  }

  /**
   * Listener function for keyboard interaction.
   *
   * @param event to get the key pressed
   */
  @HostListener('keydown')
  // @ts-ignore: The decorator refers to this method but TS thinks this method is not referred to
  private _handleKeydown = (event: KeyboardEvent) => {
    const { key } = event;

    if (key === ' ' || key === 'Enter') {
      this.selected = !this.selected;
    }
  };

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

  render() {
    const {
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
        <div
          class="${prefix}--tile__checkmark ${prefix}--tile__checkmark--persistent">
          ${this._renderIcon()}
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

  static shadowRootOptions = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true,
  };

  static styles = styles;
}

export default BXSelectableTile;
