/**
 * Copyright IBM Corp. 2019, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement, html } from 'lit';
import { property, query } from 'lit/decorators.js';
import { carbonElement as customElement } from '../../globals/decorators/carbon-element';
import { classMap } from 'lit/directives/class-map.js';
import { prefix } from '../../globals/settings';
import View16 from '@carbon/icons/lib/view/16.js';
import ViewOff16 from '@carbon/icons/lib/view--off/16.js';
import WarningFilled16 from '@carbon/icons/lib/warning--filled/16.js';
import WarningAltFilled16 from '@carbon/icons/lib/warning--alt--filled/16.js';
import ifNonEmpty from '../../globals/directives/if-non-empty';
import FormMixin from '../../globals/mixins/form';
import ValidityMixin from '../../globals/mixins/validity';
import {
  INPUT_COLOR_SCHEME,
  INPUT_SIZE,
  INPUT_TOOLTIP_ALIGNMENT,
  INPUT_TOOLTIP_DIRECTION,
  INPUT_TYPE,
} from './defs';
import styles from './text-input.scss?lit';

export {
  INPUT_COLOR_SCHEME,
  INPUT_SIZE,
  INPUT_TOOLTIP_ALIGNMENT,
  INPUT_TOOLTIP_DIRECTION,
  INPUT_TYPE,
};

/**
 * Text Input element. Supports all the usual attributes for textual input types
 *
 * @element cds-text-input
 * @slot helper-text - The helper text.
 * @slot label-text - The label text.
 * @slot validity-message - The validity message. If present and non-empty, this input shows the UI of its invalid state.
 */
@customElement(`${prefix}-text-input`)
class CDSTextInput extends ValidityMixin(FormMixin(LitElement)) {
  /**
   * `true` if there is an AI Label.
   */
  protected _hasAILabel = false;

  /**
   * Handles `slotchange` event.
   */
  protected _handleSlotChange({ target }: Event) {
    const hasContent = (target as HTMLSlotElement)
      .assignedNodes()
      .filter((elem) =>
        (elem as HTMLElement).matches !== undefined
          ? (elem as HTMLElement).matches(
              (this.constructor as typeof CDSTextInput).aiLabelItem
            ) ||
            // remove reference to slug in v12
            (elem as HTMLElement).matches(
              (this.constructor as typeof CDSTextInput).slugItem
            )
          : false
      );

    this._hasAILabel = Boolean(hasContent);
    (hasContent[0] as HTMLElement).setAttribute('size', 'mini');
    this.requestUpdate();
  }
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
   * @param event.target The event target.
   */
  protected _handleInput({ target }: Event) {
    this.value = (target as HTMLInputElement).value;
  }

  _handleFormdata(event: FormDataEvent) {
    const { formData } = event;
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
   * Message which is displayed if the value is invalid.
   */
  @property({ attribute: 'invalid-text' })
  invalidText = '';

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
   * Specify whether you want the underlying label to be visually hidden
   */
  @property({ attribute: 'hide-label', type: Boolean, reflect: true })
  hideLabel = false;

  /**
   * Generic label that will be used as the textual representation of what this field is for
   */
  @property({ attribute: 'label' })
  label = '';

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
   * true to use the inline version.
   */
  @property({ type: Boolean, reflect: true })
  inline = false;

  /**
   * Specify the alignment of the tooltip to the icon-only button.
   * Can be one of: start, center, or end.
   */
  @property()
  tooltipAlignment = INPUT_TOOLTIP_ALIGNMENT.CENTER;

  /**
   * Specify the direction of the tooltip for icon-only buttons.
   * Can be either top, right, bottom, or left.
   */
  @property()
  tooltipDirection = INPUT_TOOLTIP_DIRECTION.BOTTOM;

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
    const {
      disabled,
      enableCounter,
      helperText,
      hideLabel,
      inline,
      invalid,
      invalidText,
      label,
      maxCount,
      readonly,
      required,
      size,
      type,
      warn,
      warnText,
      value,
      _handleInput: handleInput,
      _hasAILabel: hasAILabel,
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

    const counterClasses = classMap({
      [`${prefix}--label`]: true,
      [`${prefix}--text-input__label-counter`]: true,
      [`${prefix}--label--disabled`]: disabled,
    });

    const inputWrapperClasses = classMap({
      [`${prefix}--form-item`]: true,
      [`${prefix}--text-input-wrapper`]: true,
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
      [`${prefix}--password-input`]: type === INPUT_TYPE.PASSWORD,
      [`${prefix}--text-input__field-wrapper--decorator`]: hasAILabel,
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

    const passwordVisibilityToggleClasses = classMap({
      [`${prefix}--text-input--password__visibility__toggle`]: true,
      [`${prefix}--btn`]: true,
      [`${prefix}--btn--icon-only`]: true,
      [`${prefix}--tooltip__trigger`]: true,
      [`${prefix}--tooltip--a11y`]: true,
      [`${prefix}--btn--disabled`]: normalizedProps.disabled,
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
        ?disabled="${normalizedProps.disabled}"
        @click="${this.handleTogglePasswordVisibility}">
        ${!normalizedProps.disabled ? passwordButtonLabel : null}
        ${passwordVisibilityIcon}
      </button>
    `;

    const textCount = value?.length;

    const counter =
      enableCounter && maxCount
        ? html` <label class="${counterClasses}">
            <slot name="label-text">${textCount}/${maxCount}</slot>
          </label>`
        : null;

    const labelWrapper = html`<div class="${prefix}--text-input__label-wrapper">
      <label class="${labelClasses}"> ${label} </label> ${counter}
    </div>`;

    const helper = helperText
      ? html`<div
          class="${helperTextClasses}"
          id="helper-text"
          ?hidden="${normalizedProps.invalid || normalizedProps.warn}">
          <slot name="helper-text"> ${helperText} </slot>
        </div>`
      : null;

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
              autocomplete="${this.autocomplete}"
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
              maxlength="${ifNonEmpty(maxCount)}"
              @input="${handleInput}" />
            <slot name="ai-label" @slotchange="${handleSlotChange}"></slot>
            <slot name="slug" @slotchange="${handleSlotChange}"></slot>
            ${this.showPasswordVisibilityToggle &&
            (type === INPUT_TYPE.PASSWORD || type === INPUT_TYPE.TEXT)
              ? passwordVisibilityButton()
              : null}
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

  updated() {
    this.toggleAttribute('ai-label', this._hasAILabel);
    const label = this.shadowRoot?.querySelector("slot[name='ai-label']");

    if (label) {
      label?.classList.toggle(
        `${prefix}--slug--revert`,
        this.querySelector(`${prefix}-ai-label`)?.hasAttribute('revert-active')
      );
    } else {
      this.shadowRoot
        ?.querySelector("slot[name='slug']")
        ?.classList.toggle(
          `${prefix}--slug--revert`,
          this.querySelector(`${prefix}-slug`)?.hasAttribute('revert-active')
        );
    }
  }

  /**
   * A selector that will return the slug item.
   *
   * remove in v12
   */
  static get slugItem() {
    return `${prefix}-slug`;
  }

  /**
   * A selector that will return the AI Label item.
   */
  static get aiLabelItem() {
    return `${prefix}-ai-label`;
  }

  static shadowRootOptions = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true,
  };
  static styles = styles;
}

export default CDSTextInput;
