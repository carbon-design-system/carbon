/**
 * Copyright IBM Corp. 2019, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { classMap } from 'lit/directives/class-map.js';
import { LitElement, html } from 'lit';
import { property, query, state } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { prefix } from '../../globals/settings';
import FocusMixin from '../../globals/mixins/focus';
import { INPUT_SIZE } from '../text-input/text-input';
import { DATE_PICKER_INPUT_COLOR_SCHEME, DATE_PICKER_INPUT_KIND } from './defs';
import styles from './date-picker.scss?lit';
import Calendar16 from '@carbon/icons/es/calendar/16.js';
import WarningFilled16 from '@carbon/icons/es/warning--filled/16.js';
import WarningAltFilled16 from '@carbon/icons/es/warning--alt--filled/16.js';
import { carbonElement as customElement } from '../../globals/decorators/carbon-element';
import { iconLoader } from '../../globals/internal/icon-loader';

export { DATE_PICKER_INPUT_COLOR_SCHEME, DATE_PICKER_INPUT_KIND };

/**
 * The input box for date picker.
 *
 * @element cds-date-picker-input
 */
@customElement(`${prefix}-date-picker-input`)
class CDSDatePickerInput extends FocusMixin(LitElement) {
  /**
   * `true` if there is an AI Label.
   */
  private _hasAILabel = false;

  /**
   * Handles `slotchange` event.
   */
  protected _handleAILabelSlotChange({ target }: Event) {
    const hasContent = (target as HTMLSlotElement)
      .assignedNodes()
      .filter((elem) =>
        (elem as HTMLElement).matches !== undefined
          ? (elem as HTMLElement).matches(
              (this.constructor as typeof CDSDatePickerInput).aiLabelItem
            ) ||
            // remove reference to slug in v12
            (elem as HTMLElement).matches(
              (this.constructor as typeof CDSDatePickerInput).slugItem
            )
          : false
      );

    this._hasAILabel = Boolean(hasContent);
    (hasContent[0] as HTMLElement).setAttribute('size', 'mini');
    this.requestUpdate();
  }

  /**
   * The calendar icon.
   */
  @query(`.${prefix}--date-picker__icon`)
  private _iconNode!: SVGElement;

  /**
   * Handles `click` event on the calendar icon.
   *
   * @param event The event.
   */
  private _handleClickWrapper(event: MouseEvent) {
    if (event.target === this._iconNode) {
      this.input.focus();
    }
  }

  /**
   * Handles `input` event on `<input>` in the shadow DOM.
   *
   * @param event The event.
   * @param event.target The event target.
   */
  private _handleInput({ target }: Event) {
    const { value } = target as HTMLInputElement;
    this.value = value;
  }

  /**
   * @returns The template for the the calendar icon.
   */
  private _renderIcon() {
    return this.kind === DATE_PICKER_INPUT_KIND.SIMPLE
      ? undefined
      : iconLoader(Calendar16, {
          class: `${prefix}--date-picker__icon`,
          role: 'img',
          title: 'Open calendar',
        });
  }

  /**
   * `true` if there is helper text content.
   */
  @state()
  protected _hasHelperText = false;

  /**
   * Handles `slotchange` event on the default `<slot>`.
   */
  protected _handleSlotChange({ target }: Event) {
    if (!(target as HTMLSlotElement).name) {
      const hasContent = (target as HTMLSlotElement).assignedNodes().some(
        (node) =>
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20452
          node.nodeType !== Node.TEXT_NODE || node!.textContent!.trim()
      );
      this._hasHelperText = hasContent;
    }
  }

  /**
   * The `<input>`, used for Flatpickr to grab.
   */
  @query('input')
  input!: HTMLInputElement;

  /**
   * The color scheme.
   */
  @property({ attribute: 'color-scheme', reflect: true })
  colorScheme = DATE_PICKER_INPUT_COLOR_SCHEME.REGULAR;

  /**
   * `true` if the check box should be disabled.
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /**
   * `true` if the label should be hidden.
   */
  @property({ type: Boolean, reflect: true, attribute: 'hide-label' })
  hideLabel = false;

  /**
   * Controls the invalid state and visibility of the `validityMessage`.
   */
  @property({ type: Boolean, reflect: true })
  invalid = false;

  /**
   * Message which is displayed if the value is invalid.
   */
  @property({ attribute: 'invalid-text' })
  invalidText = '';

  /**
   * Date picker input kind.
   */
  @property({ reflect: true })
  kind = DATE_PICKER_INPUT_KIND.SIMPLE;

  /**
   * The label text.
   */
  @property({ attribute: 'label-text' })
  labelText!: string;

  /**
   * The `pattern` attribute for the `<input>` in the shadow DOM.
   */
  @property()
  pattern!: string;

  /**
   * The placeholder text.
   */
  @property()
  placeholder!: string;

  /**
   * Specify if the component should be read-only
   */
  @property({ type: Boolean, reflect: true })
  readonly = false;

  /**
   * `true` if the value is required.
   */
  @property({ type: Boolean, reflect: true })
  required = false;

  /**
   * true to use the short version.
   */
  @property({ type: Boolean, reflect: true })
  short = false;

  /**
   * Vertical size of this date picker input.
   */
  @property({ attribute: 'size', reflect: true })
  size = INPUT_SIZE.MEDIUM;

  /**
   * The `type` attribute for the `<input>` in the shadow DOM.
   */
  @property()
  type!: string;

  /**
   * The value.
   */
  @property()
  value!: string;

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

  render() {
    const constructor = this.constructor as typeof CDSDatePickerInput;
    const {
      disabled,
      _hasHelperText: hasHelperText,
      hideLabel,
      invalid,
      invalidText,
      labelText,
      pattern = constructor.defaultPattern,
      placeholder,
      readonly,
      size,
      type = constructor.defaultType,
      value,
      warn,
      warnText,
      _handleClickWrapper: handleClickWrapper,
      _handleInput: handleInput,
      _hasAILabel: hasAILabel,
    } = this;

    const invalidIcon = iconLoader(WarningFilled16, {
      class: `${prefix}--date-picker__icon ${prefix}--date-picker__icon--invalid`,
    });

    const warnIcon = iconLoader(WarningAltFilled16, {
      class: `${prefix}--date-picker__icon ${prefix}--date-picker__icon--warn`,
    });

    const normalizedProps: {
      disabled: boolean;
      invalid: boolean;
      warn: boolean;
      'slot-name': string;
      'slot-text': string;
      icon: ReturnType<typeof iconLoader>;
    } = {
      disabled: disabled && !readonly,
      invalid: invalid && !readonly && !disabled,
      warn: warn && !readonly && !disabled && !invalid,
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

    const labelClasses = classMap({
      [`${prefix}--label`]: true,
      [`${prefix}--visually-hidden`]: hideLabel,
      [`${prefix}--label--disabled`]: disabled,
    });
    const inputClasses = classMap({
      [`${prefix}--date-picker__input`]: true,
      [`${prefix}--date-picker__input--invalid`]: normalizedProps.invalid,
      [`${prefix}--date-picker__input--warn`]: normalizedProps.warn,
      [`${prefix}--date-picker__input--${size}`]: size,
      [`${prefix}--date-picker__input--decorator`]: hasAILabel,
    });

    const inputWrapperClasses = classMap({
      [`${prefix}--date-picker-input__wrapper`]: true,
      [`${prefix}--date-picker-input__wrapper--invalid`]:
        normalizedProps.invalid,
      [`${prefix}--date-picker-input__wrapper--warn`]: normalizedProps.warn,
    });

    const helperTextClasses = classMap({
      [`${prefix}--form__helper-text`]: true,
      [`${prefix}--form__helper-text--disabled`]: disabled,
    });

    return html`
      <label for="input" class="${labelClasses}">
        <slot name="label-text">${labelText}</slot>
      </label>
      <div class="${inputWrapperClasses}" @click="${handleClickWrapper}">
        <span>
          <input
            id="input"
            type="${type}"
            class="${inputClasses}"
            ?disabled="${normalizedProps.disabled}"
            pattern="${pattern}"
            placeholder="${ifDefined(placeholder)}"
            .value="${ifDefined(value)}"
            ?data-invalid="${normalizedProps.invalid}"
            @input="${handleInput}"
            ?readonly="${readonly}" />
          ${normalizedProps.icon || this._renderIcon()}
          <slot
            name="ai-label"
            @slotchange="${this._handleAILabelSlotChange}"></slot>
          <slot
            name="slug"
            @slotchange="${this._handleAILabelSlotChange}"></slot>
        </span>
      </div>
      <div
        class="${prefix}--form-requirement"
        ?hidden="${!normalizedProps.invalid && !normalizedProps.warn}">
        <slot name="${normalizedProps['slot-name']}">
          ${normalizedProps['slot-text']}
        </slot>
      </div>
      <div ?hidden="${hasHelperText}" class="${helperTextClasses}">
        <slot name="helper-text" @slotchange="${this._handleSlotChange}"></slot>
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
   * The default value for `pattern` property.
   */
  static defaultPattern = '\\d{1,2}\\/\\d{1,2}\\/\\d{4}';

  /**
   * The default value for `type` property.
   */
  static defaultType = 'text';

  /**
   * A selector that will return the parent date picker.
   */
  static get selectorParent() {
    return `${prefix}-date-picker`;
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

export default CDSDatePickerInput;
