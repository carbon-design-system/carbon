/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';
import { carbonElement as customElement } from '../../globals/decorators/carbon-element';
import { classMap } from 'lit/directives/class-map.js';
import { prefix } from '../../globals/settings';
import View16 from '@carbon/icons/lib/view/16.js';
import ViewOff16 from '@carbon/icons/lib/view--off/16.js';
import WarningFilled16 from '@carbon/icons/lib/warning--filled/16.js';
import WarningAltFilled16 from '@carbon/icons/lib/warning--alt--filled/16.js';
import ifNonEmpty from '../../globals/directives/if-non-empty';
import '../tooltip';
import '../tooltip/tooltip-content';
import styles from './password-input.scss?lit';
import CDSTextInput from '../text-input/text-input';

import {
  INPUT_COLOR_SCHEME,
  INPUT_SIZE,
  INPUT_TOOLTIP_ALIGNMENT,
  INPUT_TOOLTIP_DIRECTION,
  INPUT_TYPE,
} from './defs';

export {
  INPUT_COLOR_SCHEME,
  INPUT_SIZE,
  INPUT_TOOLTIP_ALIGNMENT,
  INPUT_TOOLTIP_DIRECTION,
  INPUT_TYPE,
};
/**
 * Password Input element. Supports all the usual attributes for textual input types
 *
 * @element cds-password-input
 * @slot helper-text - The helper text.
 * @slot label-text - The label text.
 * @slot validity-message - The validity message. If present and non-empty, this input shows the UI of its invalid state.
 */
@customElement(`${prefix}-password-input`)
class CDSPasswordInput extends CDSTextInput {
  /**
   * Handles `oninput` event on the `<input>`.
   *
   * @param event The event.
   * @param event.target The event target.
   */
  protected _handleInput({ target }: Event) {
    this.value = (target as HTMLInputElement).value;
  }

  /**
   * "Hide password" tooltip text on password visibility toggle
   */
  @property({
    type: String,
    attribute: 'hide-password-label',
    reflect: true,
  })
  hidePasswordLabel = 'Hide password';

  /**
   * "Show password" tooltip text on password visibility toggle
   */
  @property({
    type: String,
    attribute: 'show-password-label',
    reflect: true,
  })
  showPasswordLabel = 'Show password';

  /**
   * The native `<input>` type. Defaults to “password”.
   */
  @property({ reflect: true })
  type: INPUT_TYPE = INPUT_TYPE.PASSWORD;

  /**
   * Specify the alignment of the tooltip to the icon-only button.
   * Can be one of: start, center, or end.
   */
  @property({
    type: String,
    attribute: 'tooltip-alignment',
    reflect: true,
  })
  tooltipAlignment = INPUT_TOOLTIP_ALIGNMENT.CENTER;

  /**
   * Specify the direction of the tooltip for icon-only buttons.
   * Can be either top, right, bottom, or left.
   */
  @property({
    type: String,
    attribute: 'tooltip-position',
    reflect: true,
  })
  tooltipDirection = INPUT_TOOLTIP_DIRECTION.BOTTOM;

  /**
   * Handles password visibility toggle button click
   */
  private handleTogglePasswordVisibility() {
    if (this.disabled || this.readonly) return;
    this.type =
      this.type === INPUT_TYPE.PASSWORD ? INPUT_TYPE.TEXT : INPUT_TYPE.PASSWORD;
  }

  render() {
    const {
      disabled,
      helperText,
      hideLabel,
      inline,
      invalid,
      invalidText,
      label,
      readonly,
      required,
      size,
      type,
      warn,
      warnText,
      _handleInput: handleInput,
      _handleSlotChange: handleSlotChange,
    } = this;

    const invalidIcon = WarningFilled16({
      class: `${prefix}--text-input__invalid-icon`,
    });

    const warnIcon = WarningAltFilled16({
      class: `${prefix}--text-input__invalid-icon ${prefix}--text-input__invalid-icon--warning`,
    });

    const normalizedProps = {
      disabled: !readonly && disabled,
      invalid: !readonly && invalid,
      warn: !readonly && !invalid && warn,
      'slot-name': '',
      'slot-text': '',
      icon: null,
    };

    if (normalizedProps.invalid) {
      normalizedProps.icon = invalidIcon;
      normalizedProps['slot-name'] = 'invalid-text';
      normalizedProps['slot-text'] = invalidText;
    } else if (normalizedProps.warn) {
      normalizedProps.icon = warnIcon;
      normalizedProps['slot-name'] = 'warn-text';
      normalizedProps['slot-text'] = warnText;
    }

    const inputWrapperClasses = classMap({
      [`${prefix}--form-item`]: true,
      [`${prefix}--text-input-wrapper`]: true,
      [`${prefix}--password-input-wrapper`]: true,
      [`${prefix}--text-input-wrapper--inline`]: inline,
      [`${prefix}--text-input-wrapper--readonly`]: readonly,
      [`${prefix}--text-input-wrapper--inline--invalid`]:
        inline && normalizedProps.invalid,
    });

    const inputClasses = classMap({
      [`${prefix}--text-input`]: true,
      [`${prefix}--text-input--invalid`]: normalizedProps.invalid,
      [`${prefix}--text-input--warning`]: normalizedProps.warn,
      [`${prefix}--text-input--${size}`]: size,
      [`${prefix}--layout--size-${size}`]: size,
      [`${prefix}--password-input`]: true,
    });

    const fieldOuterWrapperClasses = classMap({
      [`${prefix}--text-input__field-outer-wrapper`]: true,
      [`${prefix}--text-input__field-outer-wrapper--inline`]: inline,
    });

    const fieldWrapperClasses = classMap({
      [`${prefix}--text-input__field-wrapper`]: true,
      [`${prefix}--text-input__field-wrapper--warning`]: normalizedProps.warn,
    });

    const labelClasses = classMap({
      [`${prefix}--label`]: true,
      [`${prefix}--visually-hidden`]: hideLabel,
      [`${prefix}--label--disabled`]: normalizedProps.disabled,
    });

    const helperTextClasses = classMap({
      [`${prefix}--form__helper-text`]: true,
      [`${prefix}--form__helper-text--disabled`]: normalizedProps.disabled,
    });

    const passwordIsVisible = type !== INPUT_TYPE.PASSWORD;
    const passwordVisibilityIcon = passwordIsVisible
      ? ViewOff16({ class: `${prefix}--icon-visibility-off` })
      : View16({ class: `${prefix}--icon-visibility-on` });

    const passwordVisibilityTooltipClasses = classMap({
      [`${prefix}--text-input--password__visibility__toggle`]: true,
      [`${prefix}--btn`]: true,
      [`${prefix}--tooltip__trigger`]: true,
      [`${prefix}--tooltip--a11y`]: true,
      [`${prefix}--toggle-password-tooltip`]: true,
      [`${prefix}--btn--disabled`]: normalizedProps.disabled || readonly,
      [`${prefix}--tooltip--${this.tooltipDirection}`]: this.tooltipDirection,
      [`${prefix}--tooltip--align-${this.tooltipAlignment}`]:
        this.tooltipAlignment,
    });

    const passwordVisibilityButtonClasses = classMap({
      [`${prefix}--text-input--password__visibility__toggle`]: true,
      [`${prefix}--btn--icon-only`]: true,
      [`${prefix}--tooltip__trigger`]: true,
      [`${prefix}--tooltip--a11y`]: true,
      [`${prefix}--toggle-password-tooltip`]: true,
      [`${prefix}--btn--disabled`]: normalizedProps.disabled || readonly,
    });

    const labelWrapper = html`<div class="${prefix}--text-input__label-wrapper">
      <label class="${labelClasses}"> ${label} </label>
    </div>`;

    const helper = helperText
      ? html`<div
          class="${helperTextClasses}"
          id="helper-text"
          ?hidden="${normalizedProps.invalid || normalizedProps.warn}">
          <slot name="helper-text"> ${helperText} </slot>
        </div>`
      : null;

    let align = '';

    if (
      this.tooltipDirection === INPUT_TOOLTIP_DIRECTION.TOP ||
      this.tooltipDirection === INPUT_TOOLTIP_DIRECTION.BOTTOM
    ) {
      if (this.tooltipAlignment === INPUT_TOOLTIP_ALIGNMENT.CENTER) {
        align = this.tooltipDirection;
      }
      if (this.tooltipAlignment === INPUT_TOOLTIP_ALIGNMENT.END) {
        align = `${this.tooltipDirection}-right`;
      }
      if (this.tooltipAlignment === INPUT_TOOLTIP_ALIGNMENT.START) {
        align = `${this.tooltipDirection}-left`;
      }
    }

    if (this.tooltipDirection === 'right' || this.tooltipDirection === 'left') {
      align = this.tooltipDirection;
    }

    return html`
      <div class="${inputWrapperClasses}">
        ${!inline
          ? labelWrapper
          : html`<div class="${prefix}--text-input__label-helper-wrapper">
              ${labelWrapper} ${helper}
            </div>`}
        <div class="${fieldOuterWrapperClasses}">
          <div class="${fieldWrapperClasses}" ?data-invalid="${invalid}">
            ${normalizedProps.icon}
            <input
              ?autofocus="${this.autofocus}"
              class="${inputClasses}"
              ?data-invalid="${invalid}"
              ?disabled="${disabled}"
              aria-describedby="helper-text"
              id="input"
              name="${ifNonEmpty(this.name)}"
              pattern="${ifNonEmpty(this.pattern)}"
              placeholder="${ifNonEmpty(this.placeholder)}"
              ?readonly="${readonly}"
              ?required="${required}"
              type="${ifNonEmpty(type)}"
              .value="${this._value}"
              @input="${handleInput}" />
            <slot name="slug" @slotchange="${handleSlotChange}"></slot>
            <cds-tooltip
              align="${align}"
              class="${passwordVisibilityTooltipClasses}"
              ?disabled="${normalizedProps.disabled || readonly}">
              <button
                ?disabled="${normalizedProps.disabled || readonly}"
                type="button"
                role="button"
                class="${passwordVisibilityButtonClasses}"
                aria-labelledby="content"
                @click="${this.handleTogglePasswordVisibility}">
                ${passwordVisibilityIcon}
              </button>
              <cds-tooltip-content
                id="content"
                ?hidden="${normalizedProps.disabled || readonly}">
                ${passwordIsVisible
                  ? this.hidePasswordLabel
                  : this.showPasswordLabel}
              </cds-tooltip-content>
            </cds-tooltip>
          </div>
          ${!inline ? helper : null}
          <div
            class="${prefix}--form-requirement"
            ?hidden="${!normalizedProps.invalid && !normalizedProps.warn}">
            <slot name="${normalizedProps['slot-name']}">
              ${normalizedProps['slot-text']}
            </slot>
          </div>
        </div>
      </div>
    `;
  }

  /**
   * A selector that will return the slug item.
   *
   * remove in v12
   */
  static get slugItem() {
    return `${prefix}-slug`;
  }

  static shadowRootOptions = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true,
  };
  static styles = styles;
}

export default CDSPasswordInput;
