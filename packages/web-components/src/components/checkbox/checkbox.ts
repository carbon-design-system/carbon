/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { LitElement, html } from 'lit';
import { property, query } from 'lit/decorators.js';
import { prefix } from '../../globals/settings';
import FocusMixin from '../../globals/mixins/focus';
import FormMixin from '../../globals/mixins/form';
import WarningFilled16 from '@carbon/icons/lib/warning--filled/16';
import WarningAltFilled16 from '@carbon/icons/lib/warning--alt--filled/16';
import styles from './checkbox.scss?lit';
import { carbonElement as customElement } from '../../globals/decorators/carbon-element';

/**
 * Check box.
 *
 * @element cds-checkbox
 * @fires cds-checkbox-changed - The custom event fired after this changebox changes its checked state.
 * @csspart input The checkbox.
 * @csspart label The label.
 */
@customElement(`${prefix}-checkbox`)
class CDSCheckbox extends FocusMixin(FormMixin(LitElement)) {
  @query('input')
  protected _checkboxNode!: HTMLInputElement;

  /**
   * Handles `click` event on the `<input>` in the shadow DOM.
   */
  protected _handleChange() {
    const { checked, indeterminate } = this._checkboxNode;
    this.checked = checked;
    this.indeterminate = indeterminate;
    const { eventChange } = this.constructor as typeof CDSCheckbox;
    this.dispatchEvent(
      new CustomEvent(eventChange, {
        bubbles: true,
        composed: true,
        detail: {
          checked,
          indeterminate,
        },
      })
    );
  }

  /**
   * Prevent checkbox state from updating when readonly
   */
  private _handleClick(event: MouseEvent) {
    if (this.readonly) {
      event.preventDefault();
    }
  }

  _handleFormdata(event: Event) {
    const { formData } = event as any; // TODO: Wait for `FormDataEvent` being available in `lib.dom.d.ts`
    const { checked, disabled, name, value = 'on' } = this;
    if (!disabled && checked) {
      formData.append(name, value);
    }
  }

  /**
   * Specify whether the underlying input should be checked
   */
  @property({ type: Boolean, reflect: true, attribute: 'checked' })
  checked = false;

  /**
   * Specify if checkbox is being used in a data table
   */
  @property({ type: Boolean, reflect: true, attribute: 'data-table' })
  dataTable = false;

  /**
   * Specify whether the Checkbox should be disabled
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /**
   * Provide text for the form group for additional help
   */
  @property({ type: String, reflect: true, attribute: 'helper-text' })
  helperText;

  /**
   * Specify whether the checkbox should be present in the DOM,
   * but invisible and uninteractable. Used for data-table purposes.
   */
  @property({ type: Boolean, reflect: true, attribute: 'hide-checkbox' })
  hideCheckbox = false;

  /**
   * Specify whether the label should be hidden, or not
   */
  @property({ type: Boolean, reflect: true, attribute: 'hide-label' })
  hideLabel = false;

  /**
   * Specify whether the Checkbox is in an indeterminate state
   */
  @property({ type: Boolean, reflect: true })
  indeterminate = false;

  /**
   * Provide a label to provide a description of the Checkbox input that you are
   * exposing to the user
   */
  @property({ attribute: 'label-text' })
  labelText = '';

  /**
   * The form name.
   */
  @property()
  name!: string;

  /**
   * Specify whether the Checkbox is read-only
   */
  @property({ type: Boolean, reflect: true })
  readonly = false;

  /**
   * Specify whether the Checkbox is currently invalid
   */
  @property({ type: Boolean })
  invalid = false;

  /**
   * Provide the text that is displayed when the Checkbox is in an invalid state
   */
  @property({ type: String, attribute: 'invalid-text' })
  invalidText;

  /**
   * Specify a title for the node for the Checkbox
   */
  @property({ attribute: 'title' })
  title = '';

  /**
   * The value.
   */
  @property()
  value!: string;

  /**
   * Specify whether the Checkbox is in a warn state
   */
  @property({ type: Boolean })
  warn = false;

  /**
   * Provide the text that is displayed when the Checkbox is in a warn state
   */
  @property({ type: String, attribute: 'warn-text' })
  warnText = false;

  /**
   * Handles `slotchange` event.
   */
  protected _handleSlotChange({ target }: Event) {
    const hasContent = (target as HTMLSlotElement)
      .assignedNodes()
      .filter((elem) =>
        (elem as HTMLElement).matches !== undefined
          ? (elem as HTMLElement).matches(
              (this.constructor as typeof CDSCheckbox).aiLabelItem
            ) ||
            // remove slug reference in v12
            (elem as HTMLElement).matches(
              (this.constructor as typeof CDSCheckbox).slugItem
            )
          : false
      );

    this._hasAILabel = Boolean(hasContent);
    const type = (hasContent[0] as HTMLElement).getAttribute('kind');
    (hasContent[0] as HTMLElement).setAttribute(
      'size',
      type === 'inline' ? 'md' : 'mini'
    );
    this.requestUpdate();
  }

  /**
   * `true` if there is an AI Label.
   */
  protected _hasAILabel = false;

  updated() {
    const { _hasAILabel: hasAILabel } = this;
    hasAILabel
      ? this.setAttribute('ai-label', '')
      : this.removeAttribute('ai-label');
  }

  render() {
    const {
      checked,
      disabled,
      helperText,
      hideLabel,
      indeterminate,
      invalid,
      invalidText,
      labelText,
      name,
      readonly,
      title,
      value,
      warn,
      warnText,
      _handleChange: handleChange,
      _handleClick: handleClick,
    } = this;

    const showWarning = !readonly && !invalid && warn;
    const showHelper = !invalid && !warn;

    const helper = helperText
      ? html` <div class="${prefix}--form__helper-text">${helperText}</div>`
      : null;

    const labelClasses = classMap({
      [`${prefix}--checkbox-label`]: true,
    });
    const labelTextClasses = classMap({
      [`${prefix}--checkbox-label-text`]: true,
      [`${prefix}--visually-hidden`]: hideLabel,
    });
    return html`
      <input
        id="checkbox"
        type="checkbox"
        part="input"
        class="${`${prefix}--checkbox`}"
        aria-checked="${indeterminate ? 'mixed' : String(Boolean(checked))}"
        aria-readonly="${String(Boolean(readonly))}"
        .checked="${checked}"
        ?disabled="${disabled}"
        .indeterminate="${indeterminate}"
        name="${ifDefined(name)}"
        value="${ifDefined(value)}"
        @change="${handleChange}"
        @click="${handleClick}" />
      <label
        for="checkbox"
        part="label"
        class="${labelClasses}"
        title="${ifDefined(title)}">
        <span class="${labelTextClasses}"
          >${labelText ? labelText : html`<slot></slot>`}</span
        >
      </label>
      <slot name="ai-label" @slotchange="${this._handleSlotChange}"></slot>
      <slot name="slug" @slotchange="${this._handleSlotChange}"></slot>
      <div class="${prefix}--checkbox__validation-msg">
        ${!readonly && invalid
          ? html`
              ${WarningFilled16({
                class: `${prefix}--checkbox__invalid-icon`,
              })}
              <div class="${prefix}--form-requirement">${invalidText}</div>
            `
          : null}
        ${showWarning
          ? html`
              ${WarningAltFilled16({
                class: `${prefix}--checkbox__invalid-icon ${prefix}--checkbox__invalid-icon--warning`,
              })}
              <div class="${prefix}--form-requirement">${warnText}</div>
            `
          : null}
      </div>
      ${showHelper ? helper : null}
    `;
  }

  /**
   * The name of the custom event fired after this changebox changes its checked state.
   */
  static get eventChange() {
    return `${prefix}-checkbox-changed`;
  }

  /**
   * A selector that will return the slug item.
   *
   * Remove in v12
   */
  static get slugItem() {
    return `${prefix}-slug`;
  }

  /**
   * A selector that will return the ai-label item.
   */
  static get aiLabelItem() {
    return `${prefix}-ai-label`;
  }

  static shadowRootOptions = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true,
  };
  static styles = styles; // `styles` here is a `CSSResult` generated by custom Vite loader
}

export default CDSCheckbox;
