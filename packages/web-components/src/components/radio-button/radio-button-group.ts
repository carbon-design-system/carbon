/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { prefix } from '../../globals/settings';
import FormMixin from '../../globals/mixins/form';
import HostListenerMixin from '../../globals/mixins/host-listener';
import HostListener from '../../globals/decorators/host-listener';
import { find, forEach } from '../../globals/internal/collection-helpers';
import { RADIO_BUTTON_LABEL_POSITION, RADIO_BUTTON_ORIENTATION } from './defs';
import WarningFilled16 from '@carbon/icons/lib/warning--filled/16';
import WarningAltFilled16 from '@carbon/icons/lib/warning--alt--filled/16';
import CDSRadioButton from './radio-button';
import styles from './radio-button.scss?lit';
import { carbonElement as customElement } from '../../globals/decorators/carbon-element';

export { RADIO_BUTTON_ORIENTATION };

/**
 * Radio button group.
 *
 * @element cds-radio-button-group
 * @fires cds-radio-button-group-changed - The custom event fired after this radio button group changes its selected item.
 * @fires cds-radio-button-changed
 *   The name of the custom event fired after a radio button changes its checked state.
 */
@customElement(`${prefix}-radio-button-group`)
class CDSRadioButtonGroup extends FormMixin(HostListenerMixin(LitElement)) {
  /**
   * Handles user-initiated change in selected radio button.
   */
  @HostListener('eventChangeRadioButton')
  // @ts-ignore: The decorator refers to this method but TS thinks this method is not referred to
  private _handleAfterChangeRadioButton = () => {
    const { selectorRadioButton } = this
      .constructor as typeof CDSRadioButtonGroup;
    const selected = find(
      this.querySelectorAll(selectorRadioButton),
      (elem) => (elem as CDSRadioButton).checked
    );
    const oldValue = this.value;
    this.value = selected && selected.value;
    if (oldValue !== this.value) {
      const { eventChange } = this.constructor as typeof CDSRadioButtonGroup;
      this.dispatchEvent(
        new CustomEvent(eventChange, {
          bubbles: true,
          composed: true,
          detail: {
            value: this.value,
          },
        })
      );
    }
  };

  _handleFormdata(event: Event) {
    const { formData } = event as any; // TODO: Wait for `FormDataEvent` being available in `lib.dom.d.ts`
    const { disabled, name, value } = this;
    if (
      !disabled &&
      typeof name !== 'undefined' &&
      typeof value !== 'undefined'
    ) {
      formData.append(name, value);
    }
  }

  /**
   * Handles `slotchange` event.
   */
  protected _handleSlotChange({ target }: Event) {
    const hasContent = (target as HTMLSlotElement)
      .assignedNodes()
      .filter((elem) =>
        (elem as HTMLElement).matches !== undefined
          ? (elem as HTMLElement).matches(
              (this.constructor as typeof CDSRadioButtonGroup).aiLabelItem
            ) ||
            // remove reference to slug in v12
            (elem as HTMLElement).matches(
              (this.constructor as typeof CDSRadioButtonGroup).slugItem
            )
          : false
      );

    this._hasAILabel = Boolean(hasContent);
    (hasContent[0] as HTMLElement).setAttribute('size', 'mini');
    this.requestUpdate();
  }

  /**
   * `true` if there is an AI Label.
   */
  protected _hasAILabel = false;

  /**
   * The `value` attribute for the `<input>` for selection.
   */
  @property()
  defaultSelected!: string;

  /**
   * `true` if the radio button group should be disabled.
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /**
   * The label position.
   */
  @property({ reflect: true, attribute: 'label-position' })
  labelPosition = RADIO_BUTTON_LABEL_POSITION.RIGHT;

  /**
   * The label position.
   */
  @property({ reflect: true, attribute: 'legend-text' })
  legendText = '';

  /**
   * The helper text.
   */
  @property({ attribute: 'helper-text' })
  helperText;

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
   * The `name` attribute for the `<input>` for selection.
   */
  @property()
  name!: string;

  /**
   * The orientation to lay out radio buttons.
   */
  @property({ reflect: true })
  orientation = RADIO_BUTTON_ORIENTATION.HORIZONTAL;

  /**
   * Controls the readonly state of the radio button group.
   */
  @property({ type: Boolean, reflect: true })
  readOnly = false;

  /**
   * The `value` attribute for the `<input>` for selection.
   */
  @property()
  value!: string;

  updated(changedProperties) {
    const { selectorRadioButton } = this
      .constructor as typeof CDSRadioButtonGroup;
    ['disabled', 'labelPosition', 'orientation', 'readOnly', 'name'].forEach(
      (name) => {
        if (changedProperties.has(name)) {
          const { [name as keyof CDSRadioButtonGroup]: value } = this;
          // Propagate the property to descendants until `:host-context()` gets supported in all major browsers
          forEach(this.querySelectorAll(selectorRadioButton), (elem) => {
            (elem as CDSRadioButton)[name] = value;
          });
        }
      }
    );
    if (changedProperties.has('value')) {
      const { value } = this;
      forEach(this.querySelectorAll(selectorRadioButton), (elem) => {
        (elem as CDSRadioButton).checked =
          value === (elem as CDSRadioButton).value;
      });
    }
    if (changedProperties.has('invalid')) {
      forEach(this.querySelectorAll(selectorRadioButton), (elem) => {
        (elem as CDSRadioButton).invalid = this.invalid;
      });
    }
  }

  render() {
    const {
      readOnly,
      invalid,
      invalidText,
      warn,
      warnText,
      disabled,
      orientation,
      legendText,
      helperText,
      _hasAILabel: hasAILabel,
      _handleSlotChange: handleSlotChange,
    } = this;

    const showWarning = !readOnly && !invalid && warn;
    const showHelper = !invalid && !disabled && !warn;

    const invalidIcon = WarningFilled16({
      class: `${prefix}--radio-button__invalid-icon`,
    });

    const warnIcon = WarningAltFilled16({
      class: `${prefix}--radio-button__invalid-icon ${prefix}--radio-button__invalid-icon--warning`,
    });

    const helper = helperText
      ? html`<div class="${prefix}--form__helper-text">${helperText}</div>`
      : null;

    const fieldsetClasses = classMap({
      [`${prefix}--radio-button-group`]: true,
      [`${prefix}--radio-button-group--readonly`]: readOnly,
      [`${prefix}--radio-button-group--${orientation}`]:
        orientation === 'vertical',
      [`${prefix}--radio-button-group--slug`]: hasAILabel,
    });

    return html` <fieldset
        class="${fieldsetClasses}"
        ?disabled="${disabled}"
        aria-readonly="${readOnly}">
        ${legendText
          ? html` <legend class="${prefix}--label">
              ${legendText}
              <slot name="ai-label" @slotchange="${handleSlotChange}"></slot>
              <slot name="slug" @slotchange="${handleSlotChange}"></slot>
            </legend>`
          : ``}
        <slot></slot>
      </fieldset>
      <div class="${prefix}--radio-button__validation-msg">
        ${!readOnly && invalid
          ? html`
              ${invalidIcon}
              <div class="${prefix}--form-requirement">${invalidText}</div>
            `
          : null}
        ${showWarning
          ? html`${warnIcon}
              <div class="${prefix}--form-requirement">${warnText}</div>`
          : null}
      </div>
      ${showHelper ? helper : null}`;
  }

  /**
   * A selector that will return the radio buttons.
   */
  static get selectorRadioButton() {
    return `${prefix}-radio-button`;
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

  /**
   * The name of the custom event fired after this radio button group changes its selected item.
   */
  static get eventChange() {
    return `${prefix}-radio-button-group-changed`;
  }

  /**
   * The name of the custom event fired after a radio button changes its checked state.
   */
  static get eventChangeRadioButton() {
    return `${prefix}-radio-button-changed`;
  }

  static styles = styles;
}

export default CDSRadioButtonGroup;
