/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { classMap } from 'lit-html/directives/class-map';
import { html, property, customElement, LitElement } from 'lit-element';
import Close16 from '@carbon/icons/lib/close/16';
import Close20 from '@carbon/icons/lib/close/20';
import Search16 from '@carbon/icons/lib/search/16';
import settings from 'carbon-components/es/globals/js/settings';
import ifNonEmpty from '../../globals/directives/if-non-empty';
import FocusMixin from '../../globals/mixins/focus';
import FormMixin from '../../globals/mixins/form';
import { INPUT_SIZE } from '../input/input';
import { SEARCH_COLOR_SCHEME } from './defs';
import styles from './search.scss';

export { SEARCH_COLOR_SCHEME };

const { prefix } = settings;

/**
 * Search box.
 *
 * @element bx-search
 * @csspart search-icon The search icon.
 * @csspart label-text The label text.
 * @csspart input The input box.
 * @csspart close-button The close button.
 * @csspart close-icon The close icon.
 * @fires bx-search-input - The custom event fired after the search content is changed upon a user gesture.
 */
@customElement(`${prefix}-search`)
class BXSearch extends FocusMixin(FormMixin(LitElement)) {
  /**
   * Handles `input` event on the `<input>` in the shadow DOM.
   */
  private _handleInput(event: Event) {
    const { target } = event;
    const { value } = target as HTMLInputElement;
    this.dispatchEvent(
      new CustomEvent((this.constructor as typeof BXSearch).eventInput, {
        bubbles: true,
        composed: true,
        cancelable: false,
        detail: {
          value,
        },
      })
    );
    this.value = value;
  }

  /**
   * Handles `click` event on the button to clear search box content.
   */
  private _handleClearInputButtonClick() {
    if (this.value) {
      this.dispatchEvent(
        new CustomEvent((this.constructor as typeof BXSearch).eventInput, {
          bubbles: true,
          composed: true,
          cancelable: false,
          detail: {
            value: '',
          },
        })
      );
      this.value = '';

      // set focus on back to input once search is cleared
      const input = this.shadowRoot!.querySelector('input');
      (input as HTMLElement).focus();
    }
  }

  _handleFormdata(event: Event) {
    const { formData } = event as any; // TODO: Wait for `FormDataEvent` being available in `lib.dom.d.ts`
    const { disabled, name, value } = this;
    if (!disabled) {
      formData.append(name, value);
    }
  }

  /**
   * The assistive text for the close button.
   */
  @property({ attribute: 'close-button-assistive-text' })
  closeButtonAssistiveText = '';

  /**
   * The color scheme.
   */
  @property({ attribute: 'color-scheme', reflect: true })
  colorScheme = SEARCH_COLOR_SCHEME.REGULAR;

  /**
   * `true` if the search box should be disabled.
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /**
   * The label text.
   */
  @property({ attribute: 'label-text' })
  labelText = '';

  /**
   * The form name in `FormData`.
   */
  @property()
  name = '';

  /**
   * The placeholder text.
   */
  @property()
  placeholder = '';

  /**
   * The search box size.
   */
  @property({ reflect: true })
  size = INPUT_SIZE.REGULAR;

  /**
   * The `<input>` name.
   */
  @property()
  type = '';

  /**
   * The value.
   */
  @property({ type: String })
  value = '';

  createRenderRoot() {
    return this.attachShadow({
      mode: 'open',
      delegatesFocus:
        Number((/Safari\/(\d+)/.exec(navigator.userAgent) ?? ['', 0])[1]) <=
        537,
    });
  }

  render() {
    const {
      closeButtonAssistiveText,
      disabled,
      labelText,
      name,
      placeholder,
      size,
      type,
      value = '',
      _handleInput: handleInput,
      _handleClearInputButtonClick: handleClearInputButtonClick,
    } = this;
    const clearClasses = classMap({
      [`${prefix}--search-close`]: true,
      [`${prefix}--search-close--hidden`]: !this.value,
    });
    return html`
      ${Search16({
        part: 'search-icon',
        class: `${prefix}--search-magnifier-icon`,
        role: 'img',
      })}
      <label for="input" part="label-text" class="${prefix}--label">
        <slot>${labelText}</slot>
      </label>
      <input
        id="input"
        part="input"
        type="${ifNonEmpty(type)}"
        class="${prefix}--search-input"
        ?disabled="${disabled}"
        name="${ifNonEmpty(name)}"
        placeholder="${ifNonEmpty(placeholder)}"
        role="searchbox"
        .value="${value}"
        @input="${handleInput}" />
      <button
        part="close-button"
        class="${clearClasses}"
        @click="${handleClearInputButtonClick}"
        type="button"
        aria-label="${closeButtonAssistiveText}">
        ${(size === INPUT_SIZE.SMALL ? Close16 : Close20)({
          part: 'close-icon',
          'aria-label': closeButtonAssistiveText,
          role: 'img',
        })}
      </button>
    `;
  }

  /**
   * The name of the custom event fired after the search content is changed upon a user gesture.
   */
  static get eventInput() {
    return `${prefix}-search-input`;
  }

  static styles = styles; // `styles` here is a `CSSResult` generated by custom WebPack loader
}

export default BXSearch;
