/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { ifDefined } from 'lit-html/directives/if-defined';
import { html, property, query, customElement, LitElement } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map';
import settings from 'carbon-components/es/globals/js/settings';
import ChevronDown16 from '@carbon/icons/lib/chevron--down/16';
import WarningFilled16 from '@carbon/icons/lib/warning--filled/16';
import { FORM_ELEMENT_COLOR_SCHEME } from '../../globals/shared-enums';
import ifNonNull from '../../globals/directives/if-non-null';
import FormMixin from '../../globals/mixins/form';
import ValidityMixin from '../../globals/mixins/validity';
import { filter } from '../../globals/internal/collection-helpers';
import { INPUT_SIZE } from '../input/input';
import styles from './select.scss';

export { FORM_ELEMENT_COLOR_SCHEME as SELECT_COLOR_SCHEME } from '../../globals/shared-enums';

const { prefix } = settings;

/**
 * Select box.
 *
 * @element bx-select
 * @slot helper-text - The helper text.
 * @slot label-text - The label text.
 * @slot validity-message - The validity message. If present and non-empty, this input shows the UI of its invalid state.
 */
@customElement(`${prefix}-select`)
class BXSelect extends ValidityMixin(FormMixin(LitElement)) {
  /**
   * The mutation observer DOM mutation.
   */
  private _observerMutation: MutationObserver | null = null;

  /**
   * The `value` for placeholder `<option>`.
   */
  private _placeholderItemValue = `__${prefix}-select-placeholder_${Math.random().toString(36).slice(2)}`;

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
    const { eventSelect } = this.constructor as typeof BXSelect;
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
   * Handles DOM mutation of `<bx-select-item>` or `<bx-select-item-group>` put in `<bx-select>`, or their changes.
   * In such event, `<bx-select>` creates the corresponding `<option>` and `<optgroup>`, respectively, into shadow DOM,
   * with `._renderItems()`.
   * Doing so allows the shadow DOM style of `<bx-select>` to control the style of the `<option>` and `<optgroup>`,
   * notably the disabled ones.
   */
  private _handleMutation = () => {
    this.requestUpdate();
  };

  /**
   * @param element The parent element containing pseudo `<optgroup>`/`<option>`.
   * @returns The template containing child `<optgroup>`/`<option>` that will be rendered to shadow DOM.
   */
  private _renderItems(element: BXSelect | HTMLOptGroupElement) {
    const { selectorItem, selectorLeafItem } = this.constructor as typeof BXSelect;
    // Harvests attributes from `<bx-select-item>` and `<bx-select-item-group>`.
    // Does not use properties to avoid delay in attribute to property mapping, which runs in custom element reaction cycle:
    // https://html.spec.whatwg.org/multipage/custom-elements.html#custom-element-reactions
    return html`
      ${filter(element.childNodes, (item) => item.nodeType === Node.ELEMENT_NODE && (item as Element).matches(selectorItem)).map(
        (item) => {
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
                  label="${ifNonNull(label ?? textContent)}"
                  ?selected="${selected}"
                  value="${ifNonNull(value)}"
                >
                  ${textContent}
                </option>
              `
            : html`
                <optgroup class="${prefix}--select-optgroup" ?disabled="${disabled}" label="${ifNonNull(label)}">
                  ${this._renderItems(item)}
                </optgroup>
              `;
        }
      )}
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
   * The color scheme.
   */
  @property({ attribute: 'color-scheme', reflect: true })
  colorScheme = FORM_ELEMENT_COLOR_SCHEME.REGULAR;

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
   * ID to link the `label` and `select`
   */
  @property()
  id = '';

  /**
   * Controls the invalid state and visibility of the `validityMessage`
   */
  @property({ type: Boolean, reflect: true })
  invalid = false;

  /**
   * The label text.
   */
  @property({ attribute: 'label-text' })
  labelText = '';

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
  size = INPUT_SIZE.REGULAR;

  /**
   * The validity message.
   */
  @property({ attribute: 'validity-message' })
  validityMessage = '';

  /**
   * The value of the text area.
   */
  @property()
  value = '';

  createRenderRoot() {
    return this.attachShadow({ mode: 'open', delegatesFocus: true });
  }

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
      invalid,
      labelText,
      placeholder,
      size,
      validityMessage,
      value,
      _placeholderItemValue: placeholderItemValue,
      _handleInput: handleInput,
    } = this;

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

    const supplementalText = !invalid
      ? html`
          <div class="${helperTextClasses}">
            <slot name="helper-text"> ${helperText} </slot>
          </div>
        `
      : html`
          <div class="${prefix}--form-requirement" id="validity-message">
            <slot name="validity-message"> ${validityMessage} </slot>
          </div>
        `;

    return html`
      <label class="${labelClasses}" for="input">
        <slot name="label-text"> ${labelText} </slot>
      </label>
      <div class="${prefix}--select-input__wrapper" ?data-invalid="${invalid}">
        <select
          id="input"
          class="${inputClasses}"
          ?disabled="${disabled}"
          aria-invalid="${String(Boolean(invalid))}"
          aria-describedby="${ifDefined(!invalid ? undefined : 'validity-message')}"
          @input="${handleInput}"
        >
          ${!placeholder || value
            ? undefined
            : html`
                <option disabled hidden class="${prefix}--select-option" value="${placeholderItemValue}" selected>
                  ${placeholder}
                </option>
              `}
          ${this._renderItems(this)}
        </select>
        ${ChevronDown16({ class: `${prefix}--select__arrow` })}
        ${!invalid ? undefined : WarningFilled16({ class: `${prefix}--select__invalid-icon` })}
      </div>
      ${supplementalText}
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

  static styles = styles; // `styles` here is a `CSSResult` generated by custom WebPack loader
}

export default BXSelect;
