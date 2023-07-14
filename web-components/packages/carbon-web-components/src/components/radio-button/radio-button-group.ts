/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement, html } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { prefix } from '../../globals/settings';
import FormMixin from '../../globals/mixins/form';
import HostListenerMixin from '../../globals/mixins/host-listener';
import HostListener from '../../globals/decorators/host-listener';
import { find, forEach } from '../../globals/internal/collection-helpers';
import { RADIO_BUTTON_LABEL_POSITION, RADIO_BUTTON_ORIENTATION } from './defs';
import CDSRadioButton from './radio-button';
import styles from './radio-button.scss';

export { RADIO_BUTTON_ORIENTATION };

/**
 * Radio button group.
 *
 * @element cds-radio-button-group
 * @fires cds-radio-button-group-changed - The custom event fired after this radio button group changes its selected item.
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
  }

  render() {
    const fieldsetClasses = classMap({
      [`${prefix}--radio-button-group`]: true,
      [`${prefix}--radio-button-group--readonly`]: this.readOnly,
      [`${prefix}--radio-button-group--${this.orientation}`]:
        this.orientation === 'vertical',
    });

    return html` <fieldset
      class="${fieldsetClasses}"
      ?disabled="${this.disabled}"
      aria-readonly="${this.readOnly}">
      ${this.legendText
        ? html` <legend class="${prefix}--label">${this.legendText}</legend>`
        : ``}
      <slot></slot>
    </fieldset>`;
  }

  /**
   * A selector that will return the radio buttons.
   */
  static get selectorRadioButton() {
    return `${prefix}-radio-button`;
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
