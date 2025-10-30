/**
 * Copyright IBM Corp. 2020, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, LitElement } from 'lit';
import { property, query } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { prefix } from '../../globals/settings';
import { iconLoader } from '../../globals/internal/icon-loader';
import ChevronDown16 from '@carbon/icons/es/chevron--down/16.js';
import { filter } from '../../globals/internal/collection-helpers';
import styles from './time-picker.scss?lit';
import { carbonElement as customElement } from '../../globals/decorators/carbon-element';
import { TIME_PICKER_SIZE } from './defs';
import FormMixin from '../../globals/mixins/form';

/**
 * Time picker select dropdown.
 *
 * @element cds-time-picker-select
 */
@customElement(`${prefix}-time-picker-select`)
class CDSTimePickerSelect extends FormMixin(LitElement) {
  /**
   * The mutation observer for DOM mutation.
   */
  private _observerMutation: MutationObserver | null = null;

  /**
   * The select element.
   */
  @query('select')
  private _selectNode!: HTMLSelectElement;

  /**
   * The ARIA label for the UI control.
   */
  @property({ attribute: 'aria-label' })
  ariaLabel = 'open list of options';

  /**
   * Optionally provide the default value of the select
   */
  @property({ attribute: 'default-value' })
  defaultValue = '';

  /**
   * Controls the readOnly state of the select
   */
  @property({ type: Boolean, reflect: true })
  readOnly = false;

  /**
   * Specify whether the control is disabled
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /**
   * Specify a custom id for the select box
   */
  @property({ reflect: true })
  id = '';

  /**
   * Name for the select in the `FormData`
   */
  @property()
  name = '';

  /**
   * The value of the select.
   */
  @property({ reflect: true })
  value = '';

  /**
   * Size of the time picker select
   */
  @property({ reflect: true })
  size = TIME_PICKER_SIZE.MEDIUM;

  /**
   * Handles `oninput` event on the `<select>`.
   *
   * @param event The event.
   * @param event.target The event target.
   */
  private _handleInput(event: Event) {
    const { value } = event.target as HTMLSelectElement;
    this.value = value;
    const { eventSelect } = this.constructor as typeof CDSTimePickerSelect;
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
   * Handles DOM mutation of select items
   */
  private _handleMutation = () => {
    this.requestUpdate();
  };

  /**
   * @returns The template containing child `<option>` elements from select items.
   */
  private _renderItems() {
    const selectorItem = `${prefix}-select-item`;

    return filter(
      this.childNodes,
      (item) =>
        item.nodeType === Node.ELEMENT_NODE &&
        (item as Element).matches(selectorItem)
    ).map((item) => {
      const disabled = item.hasAttribute('disabled');
      const label = item.getAttribute('label');
      const selected = item.hasAttribute('selected');
      const value = item.getAttribute('value');
      const { textContent } = item;

      return html`
        <option
          ?disabled="${disabled}"
          label="${ifDefined(label)}"
          ?selected="${selected}"
          value="${ifDefined(value)}">
          ${textContent}
        </option>
      `;
    });
  }

  _handleFormdata(event: Event) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20452
    const { formData } = event as any; // TODO: Wait for `FormDataEvent` being available in `lib.dom.d.ts`
    const { disabled, name, value } = this;
    if (!disabled) {
      formData.append(name, value);
    }
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
    if (
      changedProperties.has('defaultValue') &&
      this.defaultValue &&
      !this.value
    ) {
      this.value = this.defaultValue;
    }

    if (changedProperties.has('value')) {
      if (this._selectNode) {
        this._selectNode.value = this.value;
      }
    }
  }

  render() {
    const {
      ariaLabel,
      disabled,
      size,
      id,
      value,
      readOnly,
      _handleInput: handleInput,
    } = this;

    const inputClasses = classMap({
      [`${prefix}--select-input`]: true,
      [`${prefix}--select-input--${size}`]: size,
    });

    return html`
      <select
        id="${ifDefined(id)}"
        class="${inputClasses}"
        aria-readonly="${String(Boolean(readOnly))}"
        ?disabled="${disabled}"
        aria-label="${ifDefined(ariaLabel)}"
        .value="${ifDefined(value)}"
        @input="${handleInput}">
        ${this._renderItems()}
      </select>
      ${iconLoader(ChevronDown16, {
        class: `${prefix}--select__arrow`,
        'aria-hidden': 'true',
      })}
    `;
  }
  static get eventSelect() {
    return `${prefix}-select-selected`;
  }

  static shadowRootOptions = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true,
  };

  static styles = styles;
}

export default CDSTimePickerSelect;
