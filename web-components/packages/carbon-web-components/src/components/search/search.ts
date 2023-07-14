/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { classMap } from 'lit/directives/class-map.js';
import { LitElement, html } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import Close16 from '@carbon/icons/lib/close/16';
import Search16 from '@carbon/icons/lib/search/16';
import { prefix } from '../../globals/settings';
import ifNonEmpty from '../../globals/directives/if-non-empty';
import FocusMixin from '../../globals/mixins/focus';
import FormMixin from '../../globals/mixins/form';
import { INPUT_SIZE } from '../text-input/text-input';
import HostListener from '../../globals/decorators/host-listener';
import HostListenerMixin from '../../globals/mixins/host-listener';
import styles from './search.scss';

/**
 * Search box.
 *
 * @element cds-search
 * @csspart search-icon The search icon.
 * @csspart label-text The label text.
 * @csspart input The input box.
 * @csspart close-button The close button.
 * @csspart close-icon The close icon.
 * @fires cds-search-input - The custom event fired after the search content is changed upon a user gesture.
 */
@customElement(`${prefix}-search`)
class CDSSearch extends HostListenerMixin(FocusMixin(FormMixin(LitElement))) {
  /**
   * Handles `input` event on the `<input>` in the shadow DOM.
   */
  private _handleInput(event: Event) {
    const { target } = event;
    const { value } = target as HTMLInputElement;
    this.dispatchEvent(
      new CustomEvent((this.constructor as typeof CDSSearch).eventInput, {
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
        new CustomEvent((this.constructor as typeof CDSSearch).eventInput, {
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

  /**
   * Handles `focus` event on the button when the button can be expanded
   */
  @HostListener('focus')
  // @ts-ignore: The decorator refers to this method but TS thinks this method is not referred to
  private _handleExpand() {
    if (this.expandable && !this.expanded) {
      this.setAttribute('expanded', '');
    }
  }

  /**
   * Handles `focusout` event on the component to be closed after being expanded
   * Will not close if there is a value typed within.
   */
  @HostListener('focusout')
  // @ts-ignore: The decorator refers to this method but TS thinks this method is not referred to
  private _handleClose() {
    if (this.expandable && this.expanded && !this.value) {
      this.removeAttribute('expanded');
    }
  }

  /**
   * Handler for @slotchange, will only be ran if user sets an element under the "icon" slot.
   *
   * @private
   */
  private _handleSlotChange() {
    const icon = this.querySelector('svg');
    icon?.setAttribute('part', 'search-icon');
    icon?.setAttribute('class', `${prefix}--search-magnifier-icon`);
    icon?.setAttribute('role', `img`);
    this.hasCustomIcon = true;
  }

  _handleFormdata(event: Event) {
    const { formData } = event as any; // TODO: Wait for `FormDataEvent` being available in `lib.dom.d.ts`
    const { disabled, name, value } = this;
    if (!disabled) {
      formData.append(name, value);
    }
  }

  /**
   * Specify an optional value for the autocomplete property on the underlying <input>,
   * defaults to "off"
   */
  @property({ attribute: 'autocomplete' })
  autoComplete = 'off';

  /**
   * Specify a label to be read by screen readers on the "close" button
   */
  @property({ attribute: 'close-button-label-text' })
  closeButtonLabelText = '';

  /**
   * `true` if the search box should be disabled.
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /**
   * `true` if the search bar can be expandable
   */
  @property({ type: Boolean, reflect: true })
  expandable = false;

  /**
   * `true` if the expandable search has been expanded
   */
  @property({ type: Boolean, reflect: true })
  expanded = false;

  @property({ type: Boolean })
  hasCustomIcon = false;

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
   * Specify the role for the underlying <input>, defaults to searchbox
   */
  @property()
  role = '';

  /**
   * The placeholder text.
   */
  @property()
  placeholder = 'Search';

  /**
   * The search box size.
   */
  @property({ reflect: true })
  size = INPUT_SIZE.MEDIUM;

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

  render() {
    const {
      autoComplete,
      closeButtonLabelText,
      disabled,
      hasCustomIcon,
      labelText,
      name,
      placeholder,
      role,
      type,
      value = '',
      _handleInput: handleInput,
      _handleClearInputButtonClick: handleClearInputButtonClick,
      _handleSlotChange: handleSlotChange,
    } = this;
    const clearClasses = classMap({
      [`${prefix}--search-close`]: true,
      [`${prefix}--search-close--hidden`]: !this.value,
    });
    return html`
      <div class="${prefix}--search-magnifier">
        <slot name="icon" @slotchange=${handleSlotChange}>
          ${hasCustomIcon
            ? html``
            : html`${Search16({
                part: 'search-icon',
                class: `${prefix}--search-magnifier-icon`,
                role: 'img',
              })}`}
        </slot>
      </div>
      <label for="input" part="label-text" class="${prefix}--label">
        <slot>${labelText}</slot>
      </label>
      <input
        autocomplete="${autoComplete}"
        id="input"
        part="input"
        type="${ifNonEmpty(type)}"
        class="${prefix}--search-input"
        ?disabled="${disabled}"
        name="${ifNonEmpty(name)}"
        placeholder="${ifNonEmpty(placeholder)}"
        role="${role}"
        .value="${value}"
        @input="${handleInput}" />
      <button
        part="close-button"
        class="${clearClasses}"
        @click="${handleClearInputButtonClick}"
        type="button"
        aria-label="${closeButtonLabelText}">
        ${Close16({
          part: 'close-icon',
          'aria-label': closeButtonLabelText,
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

  static shadowRootOptions = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true,
  };
  static styles = styles; // `styles` here is a `CSSResult` generated by custom WebPack loader
}

export default CDSSearch;
