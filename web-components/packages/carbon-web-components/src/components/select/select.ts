/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement, html } from 'lit';
import { property, customElement, query } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import ChevronDown16 from '@carbon/icons/lib/chevron--down/16';
import WarningFilled16 from '@carbon/icons/lib/warning--filled/16';
import WarningAltFilled16 from '@carbon/icons/lib/warning--alt--filled/16';
import { prefix } from '../../globals/settings';
import { ifDefined } from 'lit/directives/if-defined.js';
import FormMixin from '../../globals/mixins/form';
import { filter } from '../../globals/internal/collection-helpers';
import { INPUT_SIZE } from '../input/input';
import styles from './select.scss';

/**
 * Select box.
 *
 * @element cds-select
 * @slot helper-text - The helper text.
 * @slot label-text - The label text.
 * @slot validity-message - The validity message. If present and non-empty, this input shows the UI of its invalid state.
 */
@customElement(`${prefix}-select`)
class CDSSelect extends FormMixin(LitElement) {
  /**
   * The mutation observer DOM mutation.
   */
  private _observerMutation: MutationObserver | null = null;

  /**
   * The `value` for placeholder `<option>`.
   */
  private _placeholderItemValue = `__${prefix}-select-placeholder_${Math.random()
    .toString(36)
    .slice(2)}`;

  /**
   * The select box.
   */
  @query('select')
  private _selectNode!: HTMLSelectElement;

  /**
   * Handles `oninput` event on the `<input>`.
   *
   * @param event The event.
   */
  private _handleInput({ target }: Event) {
    const { value } = target as HTMLSelectElement;
    this.value = value;
    const { eventSelect } = this.constructor as typeof CDSSelect;
    this.dispatchEvent(
      new CustomEvent(eventSelect, {
        bubbles: true,
        composed: true,
        detail: {
          value,
        },
      })
    );
  }

  /**
   * Handles DOM mutation of `<cds-select-item>` or `<cds-select-item-group>` put in `<cds-select>`, or their changes.
   * In such event, `<cds-select>` creates the corresponding `<option>` and `<optgroup>`, respectively, into shadow DOM,
   * with `._renderItems()`.
   * Doing so allows the shadow DOM style of `<cds-select>` to control the style of the `<option>` and `<optgroup>`,
   * notably the disabled ones.
   */
  private _handleMutation = () => {
    this.requestUpdate();
  };

  /**
   * @param element The parent element containing pseudo `<optgroup>`/`<option>`.
   * @returns The template containing child `<optgroup>`/`<option>` that will be rendered to shadow DOM.
   */
  private _renderItems(element: CDSSelect | HTMLOptGroupElement) {
    const { selectorItem, selectorLeafItem } = this
      .constructor as typeof CDSSelect;
    // Harvests attributes from `<cds-select-item>` and `<cds-select-item-group>`.
    // Does not use properties to avoid delay in attribute to property mapping, which runs in custom element reaction cycle:
    // https://html.spec.whatwg.org/multipage/custom-elements.html#custom-element-reactions
    return html`
      ${filter(
        element.childNodes,
        (item) =>
          item.nodeType === Node.ELEMENT_NODE &&
          (item as Element).matches(selectorItem)
      ).map((item) => {
        const disabled = item.hasAttribute('disabled');
        const label = item.getAttribute('label');
        const selected = item.hasAttribute('selected');
        const value = item.getAttribute('value');
        const { textContent } = item;
        return item.matches(selectorLeafItem)
          ? html`
              <option
                class="${prefix}--select-option"
                ?disabled="${disabled}"
                label="${ifDefined(label ?? textContent)}"
                ?selected="${selected}"
                value="${ifDefined(value)}">
                ${textContent}
              </option>
            `
          : html`
              <optgroup
                class="${prefix}--select-optgroup"
                ?disabled="${disabled}"
                label="${ifDefined(label)}">
                ${this._renderItems(item)}
              </optgroup>
            `;
      })}
    `;
  }

  _handleFormdata(event: Event) {
    const { formData } = event as any; // TODO: Wait for `FormDataEvent` being available in `lib.dom.d.ts`
    const { disabled, name, value } = this;
    if (!disabled) {
      formData.append(name, value);
    }
  }

  /**
   * The count of child `<option>`s.
   * If the placeholder is in effect, it includes the `<option>` for the placeholder.
   */
  get length() {
    return this._selectNode.length;
  }

  /**
   * The child `<option>`s.
   */
  get options() {
    return this._selectNode.options;
  }

  /**
   * This form control's type.
   */
  get type() {
    return this._selectNode.type;
  }

  /**
   * Sets the select to be focussed automatically on page load. Defaults to false
   */
  @property({ type: Boolean })
  autofocus = false;

  /**
   * Controls the disabled state of the select
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /**
   * The helper text.
   */
  @property({ attribute: 'helper-text' })
  helperText = '';

  /**
   * Specify whether the label should be hidden, or not
   */
  @property({ type: Boolean, attribute: 'hide-label' })
  hideLabel = false;

  /**
   * ID to link the `label` and `select`
   */
  @property()
  id = '';

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
   * Specify if the currently value is warn.
   */
  @property({ type: Boolean, reflect: true })
  warn = false;

  /**
   * Message which is displayed if the value is warn.
   */
  @property({ attribute: 'warn-text' })
  warnText = '';

  /**
   * The label text.
   */
  @property({ attribute: 'label-text' })
  labelText = '';

  /**
   * Specify whether you want the inline version of this control
   */
  @property({ type: Boolean, reflect: true })
  inline = false;

  /**
   * `true` to enable multiple selection.
   */
  @property({ type: Boolean })
  // eslint-disable-next-line class-methods-use-this
  get multiple() {
    return false;
  }

  /**
   * Name for the select in the `FormData`
   */
  @property()
  name = '';

  /**
   * Pattern to validate the select against for HTML validity checking
   */
  @property()
  pattern = '';

  /**
   * Value to display when the select has an empty `value`
   */
  @property({ reflect: true })
  placeholder = '';

  /**
   * Controls the readonly state of the select
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
   * The selected index.
   */
  @property({ type: Number })
  get selectedIndex() {
    return this._selectNode.selectedIndex;
  }

  set selectedIndex(value) {
    this._selectNode.selectedIndex = value;
    this.value = this._selectNode.value;
  }

  /**
   * The input box size.
   */
  @property({ reflect: true })
  size = INPUT_SIZE.MEDIUM;

  /**
   * The value of the text area.
   */
  @property()
  value = '';

  connectedCallback() {
    super.connectedCallback();
    this._observerMutation = new MutationObserver(this._handleMutation);
    this._observerMutation.observe(this, {
      attributes: true,
      childList: true,
      subtree: true,
    });
  }

  disconnectedCallback() {
    if (this._observerMutation) {
      this._observerMutation.disconnect();
      this._observerMutation = null;
    }
    super.disconnectedCallback();
  }

  updated(changedProperties) {
    if (changedProperties.has('value')) {
      const { value, _placeholderItemValue: placeholderItemValue } = this;
      // Ensures setting the `value` after rendering child `<option>`s/`<optgroup>`s when there is a change in `value`,
      // given reflecting `value` requires child `<option>`s/`<optgroup>`s being there beforehand
      this._selectNode.value = !value ? placeholderItemValue : value;
    }
  }

  render() {
    const {
      disabled,
      helperText,
      hideLabel,
      inline,
      invalid,
      invalidText,
      labelText,
      placeholder,
      readonly,
      size,
      warn,
      warnText,
      value,
      _placeholderItemValue: placeholderItemValue,
      _handleInput: handleInput,
    } = this;

    const selectClasses = classMap({
      [`${prefix}--select`]: true,
      [`${prefix}--select--inline`]: inline,
      [`${prefix}--select--invalid`]: invalid,
      [`${prefix}--select--warning`]: warn,
      [`${prefix}--select--disabled`]: disabled,
      [`${prefix}--select--readonly`]: readonly,
    });

    const inputClasses = classMap({
      [`${prefix}--select-input`]: true,
      [`${prefix}--select-input--${size}`]: size,
    });

    const labelClasses = classMap({
      [`${prefix}--label`]: true,
      [`${prefix}--label--disabled`]: disabled,
    });

    const helperTextClasses = classMap({
      [`${prefix}--form__helper-text`]: true,
      [`${prefix}--form__helper-text--disabled`]: disabled,
    });

    const supplementalText = helperText
      ? html`
          <div class="${helperTextClasses}">
            <slot name="helper-text"> ${helperText} </slot>
          </div>
        `
      : null;

    const errorText =
      invalid || warn
        ? html` <div class="${prefix}--form-requirement">
            ${invalid ? invalidText : warnText}
          </div>`
        : null;

    const input = html`
      <select
        id="input"
        class="${inputClasses}"
        ?disabled="${disabled}"
        aria-readonly="${String(Boolean(readonly))}"
        aria-invalid="${String(Boolean(invalid))}"
        aria-describedby="${ifDefined(!invalid ? undefined : 'invalid-text')}"
        @input="${handleInput}">
        ${!placeholder || value
          ? undefined
          : html`
              <option
                disabled
                hidden
                class="${prefix}--select-option"
                value="${placeholderItemValue}"
                selected>
                ${placeholder}
              </option>
            `}
        ${this._renderItems(this)}
      </select>
      ${ChevronDown16({ class: `${prefix}--select__arrow` })}
      ${!invalid
        ? undefined
        : WarningFilled16({ class: `${prefix}--select__invalid-icon` })}
      ${!invalid && warn
        ? WarningAltFilled16({
            class: `${prefix}--select__invalid-icon ${prefix}--select__invalid-icon--warning`,
          })
        : null}
    `;

    return html`
      <div class="${selectClasses}">
        ${!hideLabel
          ? html`<label class="${labelClasses}" for="input">
              <slot name="label-text"> ${labelText} </slot>
            </label>`
          : null}
        ${inline
          ? html`<div class="${prefix}--select-input--inline__wrapper">
              <div
                class="${prefix}--select-input__wrapper"
                ?data-invalid="${invalid}">
                ${input}
              </div>
              ${errorText}
            </div>`
          : html`<div
              class="${prefix}--select-input__wrapper"
              ?data-invalid="${invalid}">
              ${input}
            </div> `}
        ${!inline && errorText ? errorText : supplementalText}
      </div>
    `;
  }

  /**
   * A selector selecting child pseudo `<optgroup>`/`<option>`.
   */
  static get selectorItem() {
    return `${prefix}-select-item-group,${prefix}-select-item`;
  }

  /**
   * A selector selecting child pseudo `<option>`.
   */
  static get selectorLeafItem() {
    return `${prefix}-select-item`;
  }

  /**
   * The name of the custom event fired after item is selected.
   */
  static get eventSelect() {
    return `${prefix}-select-selected`;
  }

  static shadowRootOptions = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true,
  };
  static styles = styles; // `styles` here is a `CSSResult` generated by custom WebPack loader
}

export default CDSSelect;
