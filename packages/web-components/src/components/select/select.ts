/**
 * Copyright IBM Corp. 2020, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement, html } from 'lit';
import { property, query, queryAll } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { prefix } from '../../globals/settings';
import ChevronDown16 from '@carbon/icons/es/chevron--down/16.js';
import WarningFilled16 from '@carbon/icons/es/warning--filled/16.js';
import WarningAltFilled16 from '@carbon/icons/es/warning--alt--filled/16.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import FormMixin from '../../globals/mixins/form';
import { filter } from '../../globals/internal/collection-helpers';
import { INPUT_SIZE } from '../text-input/text-input';
import { iconLoader } from '../../globals/internal/icon-loader';
import styles from './select.scss?lit';
import ifNonEmpty from '../../globals/directives/if-non-empty';
import { carbonElement as customElement } from '../../globals/decorators/carbon-element';

/**
 * Select box.
 *
 * @element cds-select
 * @fires cds-select-selected
 *   The name of the custom event fired after an item is selected.
 * @slot helper-text - The helper text.
 * @slot label-text - The label text.
 * @slot validity-message - The validity message. If present and non-empty, this input shows the UI of its invalid state.
 */
@customElement(`${prefix}-select`)
class CDSSelect extends FormMixin(LitElement) {
  /**
   * `true` if there is an AI Label.
   */
  protected _hasAILabel = false;

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
   * Input node of `select` element
   */
  @query('#input')
  private _inputNode!: HTMLInputElement;

  /**
   * Select all <option> nodes with `selected` attribute
   */
  @queryAll(`.${prefix}--select-option[selected]`)
  private _selectedOptionNodes!: HTMLOptionElement[];

  /**
   * Specify whether the textarea is fluid or not
   */
  @property({ type: Boolean })
  isFluid = false;

  /**
   * Handles `oninput` event on the `<input>`.
   *
   * @param event The event.
   * @param event.target The event target.
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
                label="${ifNonEmpty(label)}"
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

  _handleFormdata(event: FormDataEvent) {
    const { formData } = event;
    const { disabled, name, value } = this;
    if (!disabled) {
      formData.append(name, value);
    }
  }

  /**
   * Handles `slotchange` event.
   */
  protected _handleAILabelSlotChange({ target }: Event) {
    const hasContent = (target as HTMLSlotElement)
      .assignedNodes()
      .filter((elem) =>
        (elem as HTMLElement).matches !== undefined
          ? (elem as HTMLElement).matches(
              (this.constructor as typeof CDSSelect).aiLabelItem
            ) ||
            // remove reference to slug in v12
            (elem as HTMLElement).matches(
              (this.constructor as typeof CDSSelect).slugItem
            )
          : false
      );

    this._hasAILabel = Boolean(hasContent);
    this.setAttribute('slug', `${this._hasAILabel}`);
    (hasContent[0] as HTMLElement).setAttribute('size', 'mini');
    this.requestUpdate();
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
    return this._selectNode?.selectedIndex;
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
  @property({ reflect: true })
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

      const lastOption =
        this._selectedOptionNodes?.[this._selectedOptionNodes?.length - 1]?.[
          'value'
        ];

      if (value) {
        this._selectNode.value = value;
      } else if (lastOption) {
        this._selectNode.value = lastOption;
      } else {
        this._selectNode.value = placeholderItemValue;
      }
    }

    const label = this.shadowRoot?.querySelector("slot[name='ai-label']");

    if (label) {
      if ((label as HTMLSlotElement).assignedNodes()?.length) {
        this._inputNode?.classList.add(`${prefix}--select-input-has--ai-label`);
      }

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
      _handleAILabelSlotChange: handleAILabelSlotChange,
    } = this;

    const normalizedProps: {
      disabled: boolean;
      invalid: boolean;
      warn: boolean;
    } = {
      disabled: !readonly && disabled,
      invalid: !readonly && !disabled && invalid,
      warn: !readonly && !invalid && !disabled && warn,
    };

    const inputClasses = classMap({
      [`${prefix}--select-input`]: true,
      [`${prefix}--select-input--${size}`]: size,
    });

    const labelClasses = classMap({
      [`${prefix}--label`]: true,
      [`${prefix}--label--disabled`]: normalizedProps.disabled,
      [`${prefix}--visually-hidden`]: hideLabel,
    });

    const helperTextClasses = classMap({
      [`${prefix}--form__helper-text`]: true,
      [`${prefix}--form__helper-text--disabled`]: normalizedProps.disabled,
    });

    const supplementalText = helperText
      ? html`
          <div id="helper-text" class="${helperTextClasses}">
            <slot name="helper-text"> ${helperText} </slot>
          </div>
        `
      : null;

    const errorText =
      normalizedProps.invalid || normalizedProps.warn
        ? html` <div id="error-text" class="${prefix}--form-requirement">
            ${normalizedProps.invalid ? invalidText : warnText}
          </div>`
        : null;

    let describedBy: string | undefined;
    if (normalizedProps.invalid || normalizedProps.warn) {
      describedBy = 'error-text';
    } else if (helperText) {
      describedBy = 'helper-text';
    }

    const input = html`
      <select
        id="input"
        class="${inputClasses}"
        ?disabled="${disabled}"
        title="${value}"
        aria-readonly="${String(Boolean(readonly))}"
        aria-invalid="${String(Boolean(normalizedProps.invalid))}"
        aria-describedby="${ifDefined(describedBy)}"
        @input="${handleInput}">
        ${!placeholder || value
          ? undefined
          : html`
              <option
                disabled
                hidden
                class="${prefix}--select-option"
                value="${placeholderItemValue}">
                ${placeholder}
              </option>
            `}
        ${this._renderItems(this)}
      </select>
      ${iconLoader(ChevronDown16, {
        class: `${prefix}--select__arrow`,
        'aria-hidden': 'true',
      })}
      <slot
        name="ai-label"
        style="--${prefix}-show-before: ${normalizedProps.warn ||
        normalizedProps.invalid
          ? 'block'
          : 'none'}"
        @slotchange=${handleAILabelSlotChange}></slot>
      <slot name="slug" @slotchange=${handleAILabelSlotChange}></slot>
      ${!normalizedProps.invalid
        ? undefined
        : iconLoader(WarningFilled16, {
            class: `${prefix}--select__invalid-icon`,
          })}
      ${!normalizedProps.invalid && normalizedProps.warn
        ? iconLoader(WarningAltFilled16, {
            class: `${prefix}--select__invalid-icon ${prefix}--select__invalid-icon--warning`,
          })
        : null}
    `;

    return html`
      <label class="${labelClasses}" for="input">
        <slot name="label-text"> ${labelText} </slot>
      </label>

      ${inline
        ? html`<div
            class="${prefix}--select-input--inline__wrapper"
            ?data-invalid="${normalizedProps.invalid}">
            <div
              class="${prefix}--select-input__wrapper"
              ?data-invalid="${normalizedProps.invalid}">
              ${input}
            </div>
          </div>`
        : html`<div
            class="${prefix}--select-input__wrapper"
            ?data-invalid="${normalizedProps.invalid}">
            ${input}
            ${this.isFluid
              ? html`
                  <hr class="${prefix}--select__divider" />
                  ${errorText ? errorText : null}
                `
              : null}
          </div> `}
      ${!this.isFluid && errorText ? errorText : supplementalText}
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
   * The name of the custom event fired after item is selected.
   */
  static get eventSelect() {
    return `${prefix}-select-selected`;
  }

  static shadowRootOptions = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true,
  };
  static styles = styles;
}

export default CDSSelect;
