/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, property, customElement, LitElement } from 'lit-element';
import settings from 'carbon-components/es/globals/js/settings';
import FormMixin from '../../globals/mixins/form';
import HostListenerMixin from '../../globals/mixins/host-listener';
import HostListener from '../../globals/decorators/host-listener';
import { find, forEach } from '../../globals/internal/collection-helpers';
import { RADIO_BUTTON_LABEL_POSITION, RADIO_BUTTON_ORIENTATION } from './defs';
import BXRadioButton from './radio-button';
import styles from './radio-button.scss';

export { RADIO_BUTTON_ORIENTATION };

const { prefix } = settings;

/**
 * Radio button group.
 *
 * @element bx-radio-button-group
 * @fires bx-radio-button-group-changed - The custom event fired after this radio button group changes its selected item.
 */
@customElement(`${prefix}-radio-button-group`)
class BXRadioButtonGroup extends FormMixin(HostListenerMixin(LitElement)) {
  /**
   * Handles user-initiated change in selected radio button.
   */
  @HostListener('eventChangeRadioButton')
  // @ts-ignore: The decorator refers to this method but TS thinks this method is not referred to
  private _handleAfterChangeRadioButton = () => {
    const { selectorRadioButton } = this.constructor as typeof BXRadioButtonGroup;
    const selected = find(this.querySelectorAll(selectorRadioButton), elem => (elem as BXRadioButton).checked);
    const oldValue = this.value;
    this.value = selected && selected.value;
    if (oldValue !== this.value) {
      const { eventChange } = this.constructor as typeof BXRadioButtonGroup;
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
    if (!disabled && typeof name !== 'undefined' && typeof value !== 'undefined') {
      formData.append(name, value);
    }
  }

  /**
   * `true` if the check box should be disabled.
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /**
   * The label position.
   */
  @property({ reflect: true, attribute: 'label-position' })
  labelPosition = RADIO_BUTTON_LABEL_POSITION.RIGHT;

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
   * The `value` attribute for the `<input>` for selection.
   */
  @property()
  value!: string;

  updated(changedProperties) {
    const { selectorRadioButton } = this.constructor as typeof BXRadioButtonGroup;
    ['disabled', 'labelPosition', 'orientation', 'name'].forEach(name => {
      if (changedProperties.has(name)) {
        const { [name as keyof BXRadioButtonGroup]: value } = this;
        // Propagate the property to descendants until `:host-context()` gets supported in all major browsers
        forEach(this.querySelectorAll(selectorRadioButton), elem => {
          (elem as BXRadioButton)[name] = value;
        });
      }
    });
    if (changedProperties.has('value')) {
      const { value } = this;
      forEach(this.querySelectorAll(selectorRadioButton), elem => {
        (elem as BXRadioButton).checked = value === (elem as BXRadioButton).value;
      });
    }
  }

  render() {
    return html`
      <slot></slot>
    `;
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

export default BXRadioButtonGroup;
