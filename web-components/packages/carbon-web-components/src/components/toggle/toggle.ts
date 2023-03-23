/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { classMap } from 'lit/directives/class-map.js';
import { html } from 'lit';
import { property, customElement, query } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { prefix } from '../../globals/settings';
import BXCheckbox from '../checkbox/checkbox';
import { TOGGLE_SIZE } from './defs';
import styles from './toggle.scss';
import HostListener from '../../globals/decorators/host-listener';
import HostListenerMixin from '../../globals/mixins/host-listener';

export { TOGGLE_SIZE };

/**
 * Basic toggle.
 *
 * @element cds-toggle
 * @slot label-text - The label text.
 * @slot checked-text - The text for the checked state.
 * @slot unchecked-text - The text for the unchecked state.
 * @fires cds-toggle-changed - The custom event fired after this changebox changes its checked state.
 */
@customElement(`${prefix}-toggle`)
class CDSToggle extends HostListenerMixin(BXCheckbox) {
  @query('button')
  protected _checkboxNode!: HTMLInputElement;

  /**
   * Handles `click` event on the `<button>` in the shadow DOM.
   */
  protected _handleChange() {
    const { checked, indeterminate } = this._checkboxNode;
    if (this.disabled || this.readOnly) return;
    this.checked = !checked;
    this.indeterminate = indeterminate;
    const { eventChange } = this.constructor as typeof BXCheckbox;
    this.dispatchEvent(
      new CustomEvent(eventChange, {
        bubbles: true,
        composed: true,
        detail: {
          indeterminate,
        },
      })
    );
  }

  /**
   * Handles `keydown` event on the toggle button.
   */
  @HostListener('keydown')
  // @ts-ignore: The decorator refers to this method but TS thinks this method is not referred to
  protected _handleKeydown = async (event: KeyboardEvent) => {
    const { key } = event;

    if (key === ' ') {
      this._handleChange();
    }
  };

  protected _renderCheckmark() {
    if (this.size !== TOGGLE_SIZE.SMALL) {
      return undefined;
    }
    return html`
      <svg
        class="${prefix}--toggle__check"
        width="6px"
        height="5px"
        viewBox="0 0 6 5">
        <path d="M2.2 2.7L5 0 6 1 2.2 5 0 2.7 1 1.5z" />
      </svg>
    `;
  }

  /**
   * The text for the checked state.
   */
  @property({ attribute: 'label-a' })
  labelA = '';

  /**
   * Hide label text.
   */
  @property({ reflect: true, type: Boolean })
  hideLabel = false;

  /**
   * Read only boolean.
   */
  @property({ reflect: true, attribute: 'read-only', type: Boolean })
  readOnly = false;

  /**
   * Toggle size.
   */
  @property({ reflect: true })
  size = TOGGLE_SIZE.REGULAR;

  /**
   * The text for the unchecked state.
   */
  @property({ attribute: 'label-b' })
  labelB = '';

  render() {
    const {
      checked,
      disabled,
      labelText,
      hideLabel,
      id,
      name,
      size,
      labelA,
      labelB,
      value,
      _handleChange: handleChange,
    } = this;
    const inputClasses = classMap({
      [`${prefix}--toggle__appearance`]: true,
      [`${prefix}--toggle__appearance--${size}`]: size,
    });
    const toggleClasses = classMap({
      [`${prefix}--toggle__switch`]: true,
      [`${prefix}--toggle__switch--checked`]: checked,
    });
    const stateText = checked ? labelA : labelB;
    return html`
      <button
        class="${prefix}--toggle__button"
        role="switch"
        type="button"
        aria-checked=${checked}
        aria-lable=${labelText}
        .checked="${checked}"
        name="${ifDefined(name)}"
        value="${ifDefined(value)}"
        ?disabled=${disabled}
        id="${id}"></button>
      <label for="${id}" class="${prefix}--toggle__label">
        <span class="${prefix}--toggle__label-text">${labelText}</span>
        <div class="${inputClasses}">
          <div class="${toggleClasses}" @click=${handleChange}>
            ${this._renderCheckmark()}
          </div>
          <span
            ?hidden="${hideLabel}"
            class="${prefix}--toggle__text"
            aria-hidden="true"
            >${stateText}</span
          >
        </div>
      </label>
    `;
  }

  /**
   * The name of the custom event fired after this changebox changes its checked state.
   */
  static get eventChange() {
    return `${prefix}-toggle-changed`;
  }

  static styles = styles;
}

export default CDSToggle;
