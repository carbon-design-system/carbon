/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement, html } from 'lit';
import { property, customElement, query } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { prefix } from '../../globals/settings';
import View16 from '@carbon/icons/lib/view/16';
import ViewOff16 from '@carbon/icons/lib/view--off/16';
import WarningFilled16 from '@carbon/icons/lib/warning--filled/16';
import {
  FLOATING_MENU_ALIGNMENT,
  FLOATING_MENU_DIRECTION,
} from '../floating-menu/floating-menu';
import ifNonEmpty from '../../globals/directives/if-non-empty';
import FormMixin from '../../globals/mixins/form';
import ValidityMixin from '../../globals/mixins/validity';
import { INPUT_COLOR_SCHEME, INPUT_SIZE, INPUT_TYPE } from './defs';
import styles from './input.scss';

export { INPUT_COLOR_SCHEME, INPUT_SIZE, INPUT_TYPE };

/**
 * Input element. Supports all the usual attributes for textual input types
 *
 * @element cds-input
 * @slot helper-text - The helper text.
 * @slot label-text - The label text.
 * @slot validity-message - The validity message. If present and non-empty, this input shows the UI of its invalid state.
 */
@customElement(`${prefix}-input`)
class CDSInput extends ValidityMixin(FormMixin(LitElement)) {
  /**
   * The underlying input element
   */
  @query('input')
  protected _input!: HTMLInputElement;

  /**
   * The internal value.
   */
  protected _value = '';

  /**
   * Handles `oninput` event on the `<input>`.
   *
   * @param event The event.
   */
  protected _handleInput({ target }: Event) {
    this.value = (target as HTMLInputElement).value;
  }

  _handleFormdata(event: Event) {
    const { formData } = event as any; // TODO: Wait for `FormDataEvent` being available in `lib.dom.d.ts`
    const { disabled, name, value } = this;
    if (!disabled) {
      formData.append(name, value);
    }
  }

  /**
   * May be any of the standard HTML autocomplete options
   */
  @property()
  autocomplete = '';

  /**
   * Sets the input to be focussed automatically on page load. Defaults to false
   */
  @property({ type: Boolean })
  autofocus = false;

  /**
   * The color scheme.
   */
  @property({ attribute: 'color-scheme', reflect: true })
  colorScheme = INPUT_COLOR_SCHEME.REGULAR;

  /**
   * Controls the disabled state of the input
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /**
   * Specify whether to display the character counter
   */
  @property({ type: Boolean, attribute: 'enable-counter', reflect: true })
  enableCounter = false;

  /**
   * The helper text.
   */
  @property({ attribute: 'helper-text' })
  helperText = '';

  /**
   * Specify if the currently value is invalid.
   */
  @property({ type: Boolean, reflect: true })
  invalid = false;

  /**
   * Max character count allowed for input. This is needed in order for enableCounter to display
   */
  @property({ type: Number, attribute: 'max-count', reflect: true })
  maxCount;

  /**
   * Specify whether the control is currently in warning state
   */
  @property({ type: Boolean, reflect: true })
  warn = false;

  /**
   * Provide the text that is displayed when the control is in warning state
   */
  @property({ attribute: 'warn-text' })
  warnText = '';

  /**
   * Message which is displayed if the value is invalid.
   */
  @property({ attribute: 'invalid-text' })
  invalidText = '';

  /**
   * Specify whether you want the underlying label to be visually hidden
   */
  @property({ attribute: 'hide-label', type: Boolean, reflect: true })
  hideLabel = false;

  /**
   * Generic label that will be used as the textual representation of what this field is for
   */
  @property({ attribute: 'label' })
  label = 'label text';

  /**
   * Name for the input in the `FormData`
   */
  @property()
  name = '';

  /**
   * Pattern to validate the input against for HTML validity checking
   */
  @property()
  pattern = '';

  /**
   * Value to display when the input has an empty `value`
   */
  @property({ reflect: true })
  placeholder = '';

  /**
   * Specify if the component should be read-only
   */
  @property({ type: Boolean, reflect: true })
  readonly = false;

  /**
   * Boolean property to set the required status
   */
  @property({ type: Boolean, reflect: true })
  required = false;

  /**
   * The special validity message for `required`.
   */
  @property({ attribute: 'required-validity-message' })
  requiredValidityMessage = 'Please fill out this field.';

  /**
   * "Hide password" tooltip text on password visibility toggle
   */
  @property()
  hidePasswordLabel = 'Hide password';

  /**
   * "Show password" tooltip text on password visibility toggle
   */
  @property()
  showPasswordLabel = 'Show password';

  /**
   * Boolean property to render password visibility toggle
   */
  @property({
    type: Boolean,
    attribute: 'show-password-visibility-toggle',
    reflect: true,
  })
  showPasswordVisibilityToggle = false;

  /**
   * The input box size.
   */
  @property({ reflect: true })
  size = INPUT_SIZE.MEDIUM;

  /**
   * Specify the alignment of the tooltip to the icon-only button.
   * Can be one of: start, center, or end.
   */
  @property()
  tooltipAlignment = FLOATING_MENU_ALIGNMENT.CENTER;

  /**
   * Specify the direction of the tooltip for icon-only buttons.
   * Can be either top, right, bottom, or left.
   */
  @property()
  tooltipDirection = FLOATING_MENU_DIRECTION.BOTTOM;

  /**
   * The type of the input. Can be one of the types listed in the INPUT_TYPE enum
   */
  @property({ reflect: true })
  type = INPUT_TYPE.TEXT;

  /**
   * The validity message. If present and non-empty, this input shows the UI of its invalid state.
   */
  @property({ attribute: 'validity-message' })
  validityMessage = '';

  /**
   * The value of the input.
   */
  @property({ reflect: true })
  get value() {
    // FIXME: Figure out how to deal with TS2611
    // once we have the input we can directly query for the value
    if (this._input) {
      return this._input.value;
    }
    // but before then _value will work fine
    return this._value;
  }

  set value(value) {
    const oldValue = this._value;
    this._value = value;
    // make sure that lit-element updates the right properties
    this.requestUpdate('value', oldValue);
    // we set the value directly on the input (when available)
    // so that programatic manipulation updates the UI correctly
    if (this._input) {
      this._input.value = value;
    }
  }

  /**
   * Handles password visibility toggle button click
   */
  private handleTogglePasswordVisibility() {
    this.type =
      this.type === INPUT_TYPE.PASSWORD ? INPUT_TYPE.TEXT : INPUT_TYPE.PASSWORD;
  }

  render() {
    const { _handleInput: handleInput } = this;

    const invalidIcon = WarningFilled16({
      class: `${prefix}--text-input__invalid-icon`,
    });

    const inputClasses = classMap({
      [`${prefix}--text-input`]: true,
      [`${prefix}--text-input--${this.colorScheme}`]: this.colorScheme,
      [`${prefix}--text-input--invalid`]: this.invalid,
      [`${prefix}--text-input--${this.size}`]: this.size,
      [`${prefix}--password-input`]: this.type === INPUT_TYPE.PASSWORD,
    });

    const labelClasses = classMap({
      [`${prefix}--label`]: true,
      [`${prefix}--label--disabled`]: this.disabled,
    });

    const helperTextClasses = classMap({
      [`${prefix}--form__helper-text`]: true,
      [`${prefix}--form__helper-text--disabled`]: this.disabled,
    });

    const passwordIsVisible = this.type !== INPUT_TYPE.PASSWORD;
    const passwordVisibilityIcon = passwordIsVisible
      ? ViewOff16({ class: `${prefix}--icon-visibility-off` })
      : View16({ class: `${prefix}--icon-visibility-on` });

    const passwordVisibilityToggleClasses = classMap({
      [`${prefix}--text-input--password__visibility__toggle`]: true,
      [`${prefix}--btn`]: true,
      [`${prefix}--btn--icon-only`]: true,
      [`${prefix}--tooltip__trigger`]: true,
      [`${prefix}--tooltip--a11y`]: true,
      [`${prefix}--btn--disabled`]: this.disabled,
      [`${prefix}--tooltip--${this.tooltipDirection}`]: this.tooltipDirection,
      [`${prefix}--tooltip--align-${this.tooltipAlignment}`]:
        this.tooltipAlignment,
    });

    const passwordButtonLabel = html`
      <span class="${prefix}--assistive-text">
        ${passwordIsVisible ? this.hidePasswordLabel : this.showPasswordLabel}
      </span>
    `;

    const passwordVisibilityButton = () => html`
      <button
        type="button"
        class="${passwordVisibilityToggleClasses}"
        ?disabled="${this.disabled}"
        @click="${this.handleTogglePasswordVisibility}">
        ${!this.disabled && passwordButtonLabel} ${passwordVisibilityIcon}
      </button>
    `;

    return html`
      <label class="${labelClasses}" for="input">
        <slot name="label-text"> ${this.label} </slot>
      </label>
      <div
        class="${prefix}--text-input__field-wrapper"
        ?data-invalid="${this.invalid}">
        ${this.invalid ? invalidIcon : null}
        <input
          ?autocomplete="${this.autocomplete}"
          ?autofocus="${this.autofocus}"
          class="${inputClasses}"
          ?data-invalid="${this.invalid}"
          ?disabled="${this.disabled}"
          aria-describedby="helper-text"
          id="input"
          name="${ifNonEmpty(this.name)}"
          pattern="${ifNonEmpty(this.pattern)}"
          placeholder="${ifNonEmpty(this.placeholder)}"
          ?readonly="${this.readonly}"
          ?required="${this.required}"
          type="${ifNonEmpty(this.type)}"
          .value="${this._value}"
          @input="${handleInput}" />
        ${this.showPasswordVisibilityToggle &&
        (this.type === INPUT_TYPE.PASSWORD || this.type === INPUT_TYPE.TEXT)
          ? passwordVisibilityButton()
          : null}
      </div>
      <div class="${helperTextClasses}" id="helper-text">
        <slot name="helper-text"> ${this.helperText} </slot>
      </div>
      <div class="${prefix}--form-requirement">
        <slot name="validity-message"> ${this.validityMessage} </slot>
      </div>
    `;
  }

  static shadowRootOptions = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true,
  };
  static styles = styles; // `styles` here is a `CSSResult` generated by custom WebPack loader
}

export default CDSInput;
