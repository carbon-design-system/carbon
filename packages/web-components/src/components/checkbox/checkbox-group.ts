/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { classMap } from 'lit/directives/class-map.js';
import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';
import { prefix } from '../../globals/settings';
import WarningFilled16 from '@carbon/icons/lib/warning--filled/16';
import WarningAltFilled16 from '@carbon/icons/lib/warning--alt--filled/16';
import CDSCheckbox from './checkbox';
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
@customElement(`${prefix}-checkbox-group`)
class CDSCheckboxGroup extends LitElement {
  /**
   * fieldset `aria-labelledby`
   */
  @property({ type: String, reflect: true, attribute: 'aria-labelledby' })
  ariaLabelledBy;

  /**
   * Specify whether the form group is currently disabled
   */
  @property({ type: Boolean })
  disabled;

  /**
   * Provide text for the form group for additional help
   */
  @property({ type: String, reflect: true, attribute: 'helper-text' })
  helperText;

  /**
   * Specify whether the form group is currently invalid
   */
  @property({ type: Boolean, attribute: 'invalid' })
  invalid;

  /**
   * Provide the text that is displayed when the form group is in an invalid state
   */
  @property({ type: String, reflect: true, attribute: 'invalid-text' })
  invalidText;

  /**
   * Provide id for the fieldset <legend> which corresponds to the fieldset
   * `aria-labelledby`
   */
  @property({ type: String, reflect: true, attribute: 'legend-id' })
  legendId;

  /**
   * Provide the text to be rendered inside of the fieldset <legend>
   */
  @property({ type: String, reflect: true, attribute: 'legend-text' })
  legendText;

  /**
   * Whether the CheckboxGroup should be read-only
   */
  @property({ type: Boolean, reflect: true })
  readonly = false;

  /**
   * Specify whether the form group is currently in warning state
   */
  @property({ type: Boolean, reflect: true })
  warn = false;

  /**
   * Provide the text that is displayed when the form group is in warning state
   */
  @property({ type: String, reflect: true, attribute: 'warn-text' })
  warnText = '';

  /*
   * Handles `slotchange` event.
   */
  protected _handleSlotChange({ target }: Event) {
    const hasContent = (target as HTMLSlotElement)
      .assignedNodes()
      .filter((elem) =>
        (elem as HTMLElement).matches !== undefined
          ? (elem as HTMLElement).matches(
              (this.constructor as typeof CDSCheckboxGroup).aiLabelItem
            ) ||
            // remove slug reference in v12
            (elem as HTMLElement).matches(
              (this.constructor as typeof CDSCheckboxGroup).slugItem
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

  updated(changedProperties) {
    const { selectorCheckbox } = this.constructor as typeof CDSCheckboxGroup;
    const checkboxes = this.querySelectorAll(selectorCheckbox);
    ['disabled', 'readonly'].forEach((name) => {
      if (changedProperties.has(name)) {
        const { [name as keyof CDSCheckboxGroup]: value } = this;
        // Propagate the property to descendants until `:host-context()` gets supported in all major browsers
        checkboxes.forEach((elem) => {
          (elem as CDSCheckbox)[name] = value;
        });
      }
    });
    if (changedProperties.has('invalid')) {
      const { invalid } = this;
      checkboxes.forEach((elem) => {
        if (invalid) {
          (elem as CDSCheckbox).setAttribute('invalid-group', '');
        } else {
          (elem as CDSCheckbox).removeAttribute('invalid-group');
        }
      });
    }
  }

  render() {
    const {
      ariaLabelledBy,
      disabled,
      helperText,
      invalid,
      invalidText,
      legendId,
      legendText,
      readonly,
      warn,
      warnText,
      _hasAILabel: hasAILabel,
      _handleSlotChange: handleSlotChange,
    } = this;

    const showWarning = !readonly && !invalid && warn;
    const showHelper = !invalid && !warn;

    const checkboxGroupInstanceId = Math.random().toString(16).slice(2);

    const helperId = !helperText
      ? undefined
      : `checkbox-group-helper-text-${checkboxGroupInstanceId}`;

    const helper = helperText
      ? html` <div id="${helperId}" class="${prefix}--form__helper-text">
          ${helperText}
        </div>`
      : null;

    const fieldsetClasses = classMap({
      [`${prefix}--checkbox-group`]: true,
      [`${prefix}--checkbox-group--readonly`]: readonly,
      [`${prefix}--checkbox-group--invalid`]: !readonly && invalid,
      [`${prefix}--checkbox-group--warning`]: showWarning,
      [`${prefix}--checkbox-group--slug`]: hasAILabel,
    });

    return html`
      <fieldset
        class="${fieldsetClasses}"
        ?data-invalid=${invalid}
        ?disabled=${disabled}
        aria-readonly=${readonly}
        ?aria-labelledby=${ariaLabelledBy || legendId}
        ?aria-describedby=${!invalid && !warn && helper ? helperId : undefined}>
        <legend class="${prefix}--label" id=${legendId || ariaLabelledBy}>
          ${legendText}
          <slot name="ai-label" @slotchange="${handleSlotChange}"></slot>
          <slot name="slug" @slotchange="${handleSlotChange}"></slot>
        </legend>
        <slot></slot>
        <div class="${prefix}--checkbox-group__validation-msg">
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
      </fieldset>
    `;
  }

  /**
   * A selector that will return the checkboxes.
   */
  static get selectorCheckbox() {
    return `${prefix}-checkbox`;
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
  static styles = styles; // `styles` here is a `CSSResult` generated by custom Vite loader
}

export default CDSCheckboxGroup;
