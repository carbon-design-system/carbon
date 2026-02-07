/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { carbonElement as customElement } from '../../globals/decorators/carbon-element';
import { iconLoader } from '../../globals/internal/icon-loader';
import { prefix } from '../../globals/settings';
import WarningFilled16 from '@carbon/icons/es/warning--filled/16.js';
import WarningAltFilled16 from '@carbon/icons/es/warning--alt--filled/16.js';
import CDSTimePicker from '../time-picker/time-picker';
import { INPUT_SIZE } from '../text-input/text-input';
import type CDSFluidTimePickerSelect from './fluid-time-picker-select';
import ifNonEmpty from '../../globals/directives/if-non-empty';
import styles from './fluid-time-picker.scss?lit';

/**
 * Fluid Time Picker component.
 *
 * @element cds-fluid-time-picker
 * @slot label-text - The label text.
 * @slot invalid-text - The invalid text.
 * @slot warning-text - The warning text.
 * @slot - slot for fluid time picker select components.
 */
@customElement(`${prefix}-fluid-time-picker`)
class CDSFluidTimePicker extends CDSTimePicker {
  private _hoverTargets: HTMLElement[] = [];

  private _handleSelectMouseEnter = (event: MouseEvent) => {
    if (this.disabled || this.readOnly) {
      return;
    }
    const target = event.currentTarget as HTMLElement | null;
    if (target) {
      this._setHoverState(target);
    }
  };

  private _handleSelectMouseLeave = () => {
    this._setHoverState(null);
  };

  private _getNormalizedProps() {
    const { disabled, invalid, warning, readOnly } = this;
    return {
      disabled: !readOnly && disabled,
      invalid: !readOnly && !disabled && invalid,
      warn: !readOnly && !invalid && !disabled && warning,
    };
  }

  private _syncSelectState() {
    const { selectorTimePickerSelect } = this
      .constructor as typeof CDSFluidTimePicker;
    const normalizedProps = this._getNormalizedProps();
    const timePickerSelects = Array.from(
      this.querySelectorAll<CDSFluidTimePickerSelect>(selectorTimePickerSelect)
    );
    const lastIndex = timePickerSelects.length - 1;
    const isOnlyOne = timePickerSelects.length === 1;

    timePickerSelects.forEach((elem, index) => {
      const position =
        isOnlyOne || index === lastIndex
          ? 'last'
          : index === 0
            ? 'first'
            : 'middle';

      if (
        elem.getAttribute('data-fluid-time-picker-position') !== position &&
        position
      ) {
        elem.setAttribute('data-fluid-time-picker-position', position);
      }

      elem.toggleAttribute(
        'data-fluid-time-picker-invalid',
        normalizedProps.invalid
      );
      elem.toggleAttribute('data-fluid-time-picker-warn', normalizedProps.warn);

      // Propagate state to the slotted fluid selects.
      elem.readonly = this.readOnly;
      elem.disabled = this.disabled;
      elem.size =
        this.size === 'sm'
          ? INPUT_SIZE.SMALL
          : this.size === 'lg'
            ? INPUT_SIZE.LARGE
            : INPUT_SIZE.MEDIUM;
    });
  }

  private _setHoverState(target: HTMLElement | null) {
    const { selectorTimePickerSelect } = this
      .constructor as typeof CDSFluidTimePicker;
    const selects = Array.from(this.querySelectorAll(selectorTimePickerSelect));

    selects.forEach((select) =>
      select.removeAttribute('data-fluid-time-picker-hide-divider')
    );

    if (!target) {
      return;
    }

    const position = target.getAttribute('data-fluid-time-picker-position');
    const targetIndex = selects.indexOf(target);

    if (targetIndex === -1) {
      return;
    }

    if (position === 'first') {
      for (let index = targetIndex; index < selects.length; index++) {
        selects[index].setAttribute('data-fluid-time-picker-hide-divider', '');
      }
      return;
    }

    if (position === 'last') {
      target.setAttribute('data-fluid-time-picker-hide-divider', '');
    }
  }

  private _syncHoverListeners() {
    const { selectorTimePickerSelect } = this
      .constructor as typeof CDSFluidTimePicker;
    const selects = Array.from(
      this.querySelectorAll(selectorTimePickerSelect)
    ) as HTMLElement[];

    this._hoverTargets.forEach((select) => {
      select.removeEventListener('mouseenter', this._handleSelectMouseEnter);
      select.removeEventListener('mouseleave', this._handleSelectMouseLeave);
    });

    selects.forEach((select) => {
      select.addEventListener('mouseenter', this._handleSelectMouseEnter);
      select.addEventListener('mouseleave', this._handleSelectMouseLeave);
    });

    this._hoverTargets = selects;
  }

  updated(changedProperties) {
    super.updated(changedProperties);
    this._syncSelectState();
  }

  protected _handleSlotChange() {
    super._handleSlotChange();
    this._syncSelectState();
    this._syncHoverListeners();
  }

  disconnectedCallback() {
    // Remove hover listeners added in _syncHoverListeners() to avoid leaks
    this._hoverTargets.forEach((select) => {
      select.removeEventListener('mouseenter', this._handleSelectMouseEnter);
      select.removeEventListener('mouseleave', this._handleSelectMouseLeave);
    });
    this._hoverTargets = [];
    super.disconnectedCallback?.();
  }

  render() {
    const {
      className,
      disabled,
      hideLabel,
      invalidText,
      labelText,
      maxLength,
      name,
      pattern,
      placeholder,
      readOnly,
      required,
      size,
      type,
      value,
      warningText,
      _handleInput: handleInput,
      _handleSlotChange: handleSlotChange,
    } = this;

    const normalizedProps = this._getNormalizedProps();
    const { selectorTimePickerSelect } = this
      .constructor as typeof CDSFluidTimePicker;
    const selectCount = this.querySelectorAll(selectorTimePickerSelect).length;

    const timePickerClasses = classMap({
      [`${prefix}--time-picker--fluid`]: true,
      [`${prefix}--time-picker--equal-width`]: selectCount !== 2,
      [`${prefix}--time-picker--${size}`]: size,
      [`${prefix}--time-picker--fluid--disabled`]: disabled,
      [`${prefix}--time-picker--fluid--invalid`]: normalizedProps.invalid,
      [`${prefix}--time-picker--fluid--warning`]: normalizedProps.warn,
      ...(className && { [className]: true }),
    });

    const inputWrapperClasses = classMap({
      [`${prefix}--form-item`]: true,
      [`${prefix}--text-input-wrapper`]: true,
      [`${prefix}--text-input--fluid`]: true,
      [`${prefix}--text-input-wrapper--readonly`]: readOnly,
    });

    const labelClasses = classMap({
      [`${prefix}--label`]: true,
      [`${prefix}--visually-hidden`]: hideLabel,
      [`${prefix}--label--disabled`]: normalizedProps.disabled,
    });

    const fieldOuterWrapperClasses = classMap({
      [`${prefix}--text-input__field-outer-wrapper`]: true,
    });

    const fieldWrapperClasses = classMap({
      [`${prefix}--text-input__field-wrapper`]: true,
    });

    const inputClasses = classMap({
      [`${prefix}--text-input`]: true,
      [`${prefix}--time-picker__input-field`]: true,
    });

    const validationMessage =
      normalizedProps.invalid || normalizedProps.warn
        ? html`
            <hr class="${prefix}--time-picker__divider" />
            <div class="${prefix}--form-requirement">
              ${normalizedProps.invalid
                ? html` <slot name="invalid-text"> ${invalidText} </slot> `
                : html` <slot name="warning-text"> ${warningText} </slot> `}
            </div>
            ${iconLoader(
              normalizedProps.invalid ? WarningFilled16 : WarningAltFilled16,
              {
                class: `${prefix}--time-picker__icon`,
              }
            )}
          `
        : null;

    const label = html`
      <div class="${prefix}--text-input__label-wrapper">
        <label class="${labelClasses}" for="input">
          <slot name="label-text"> ${labelText} </slot>
        </label>
      </div>
    `;

    return html`
      <div class="${timePickerClasses}">
        <div class="${prefix}--time-picker--fluid__wrapper">
          <div class="${prefix}--time-picker__input">
            <div class="${inputWrapperClasses}">
              ${label}
              <div class="${fieldOuterWrapperClasses}">
                <div class="${fieldWrapperClasses}">
                  <input
                    id="input"
                    class="${inputClasses}"
                    ?disabled="${normalizedProps.disabled}"
                    maxlength="${ifNonEmpty(maxLength)}"
                    name="${ifNonEmpty(name)}"
                    pattern="${ifNonEmpty(pattern)}"
                    placeholder="${ifNonEmpty(placeholder)}"
                    ?readonly="${readOnly}"
                    ?required="${required}"
                    type="${ifNonEmpty(type)}"
                    .value="${value}"
                    @input="${handleInput}" />
                  <hr class="${prefix}--text-input__divider" />
                </div>
              </div>
            </div>
          </div>
          <slot @slotchange="${handleSlotChange}"></slot>
        </div>
        ${validationMessage}
      </div>
    `;
  }

  static get selectorTimePickerSelect() {
    return `${prefix}-fluid-time-picker-select`;
  }

  static styles = [CDSTimePicker.styles, styles];
}

export default CDSFluidTimePicker;
