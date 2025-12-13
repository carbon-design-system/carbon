/**
 * Copyright IBM Corp. 2019, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement, html } from 'lit';
import { property, query } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { prefix } from '../../globals/settings';
import WarningFilled16 from '@carbon/icons/es/warning--filled/16.js';
import WarningAltFilled16 from '@carbon/icons/es/warning--alt--filled/16.js';
import ifNonEmpty from '../../globals/directives/if-non-empty';
import { ifDefined } from 'lit/directives/if-defined.js';
import CDSTextInput from '../text-input/text-input';
import styles from './textarea.scss?lit';
import { carbonElement as customElement } from '../../globals/decorators/carbon-element';
import { iconLoader } from '../../globals/internal/icon-loader';

/**
 * Text area.
 *
 * @element cds-textarea
 * @slot helper-text - The helper text.
 * @slot label-text - The label text.
 * @slot validity-message - The validity message. If present and non-empty, this input shows the UI of its invalid state.
 */
@customElement(`${prefix}-textarea`)
class CDSTextarea extends CDSTextInput {
  /**
   * Manually handles maxCount for counterMode = 'word'
   * @param event The keyboard event.
   */
  protected _onKeyDown(evt: KeyboardEvent) {
    if (!this.disabled && this.enableCounter && this.counterMode === 'word') {
      const currentWordCount = this.value?.match(/\p{L}+/gu)?.length || 0;
      if (
        (this.maxCount &&
          currentWordCount >= this.maxCount &&
          evt.key === ' ') ||
        (this.maxCount &&
          currentWordCount >= this.maxCount &&
          evt.key === 'Enter')
      ) {
        evt.preventDefault();
      }
    }
  }

  /**
   * Handles `onPaste` event on the `<input>`.
   * Manually handles maxCount for counterMode = 'word' when
   * the user is pasting text
   *
   * @param event The clipboard event.
   */
  protected _onPaste(evt: ClipboardEvent) {
    if (
      this.counterMode === 'word' &&
      this.enableCounter &&
      typeof this.maxCount !== 'undefined'
    ) {
      const existingWords: string[] =
        this._textarea.value.match(/\p{L}+/gu) || [];
      const pastedWords: string[] =
        evt.clipboardData?.getData('Text').match(/\p{L}+/gu) || [];

      const totalWords = existingWords.length + pastedWords.length;

      if (totalWords > this.maxCount) {
        evt.preventDefault();

        const allowedWords = existingWords
          .concat(pastedWords)
          .slice(0, this.maxCount);

        this._textarea.value = allowedWords.join(' ');
        this._textarea.dispatchEvent(
          new InputEvent('input', {
            inputType: 'insertFromPaste',
            data: allowedWords.join(' '),
            bubbles: true,
          })
        );
      }
    }
  }
  /**
   * Handles `oninput` event on the `<input>`.
   *
   * @param event The event.
   * @param event.target The event target.
   */
  protected _handleInput({ target }: Event) {
    this.value = (target as HTMLTextAreaElement).value;
  }

  /**
   * The number of columns for the textarea to show by default
   */
  @property({ type: Number })
  cols;

  /**
   * Specify whether the textarea is fluid or not
   */
  @property({ type: Boolean })
  isFluid = false;

  /**
   * Specify the method used for calculating the counter number
   */
  @property({
    type: String,
    reflect: true,
    hasChanged(newVal: string, oldVal: string) {
      if ((newVal === 'character' || newVal === 'word') && newVal !== oldVal) {
        return true;
      }
      return false;
    },
    attribute: 'counter-mode',
  })
  counterMode: 'character' | 'word' = 'character';

  /**
   * ID to link the `label` and `textarea`
   */
  @property()
  id = '';

  /**
   * Pattern to validate the textarea against for HTML validity checking
   */
  @property()
  pattern = '';

  /**
   * Boolean property to set the required status
   */
  @property({ type: Boolean, reflect: true })
  required = false;

  /**
   * The number of rows for the textarea to show by default
   */
  @property()
  rows = 4;

  /**
   * Get a reference to the underlying textarea so we can directly apply values.
   * This lets us fixe a bug where after a user would clear text, the value wouldn't update programmatically
   */
  @query('textarea')
  protected _textarea!: HTMLTextAreaElement;

  /**
   * The previous counterMode selected. This lets the counterMode state update
   * when the user toggles between both modes.
   */
  private _prevCounterMode: 'character' | 'word' = this.counterMode;

  /**
   * Observes the textarea wrapper’s size to re-measure helper/invalid/warn text width when
   * cols is updated
   */
  private _resizeObserver?: ResizeObserver;

  render() {
    const { enableCounter, maxCount } = this;

    const textCount = this.value?.length ?? 0;
    const wordCount = this.value?.match(/\p{L}+/gu)?.length || 0;

    const invalidIcon = iconLoader(WarningFilled16, {
      class: `${prefix}--text-area__invalid-icon`,
    });

    const warnIcon = iconLoader(WarningAltFilled16, {
      class: `${prefix}--text-area__invalid-icon ${prefix}--text-area__invalid-icon--warning`,
    });

    const textareaClasses = classMap({
      [`${prefix}--text-area`]: true,
      [`${prefix}--text-area--warn`]: this.warn,
      [`${prefix}--text-area--invalid`]: this.invalid,
      [`${prefix}--text-area__wrapper--decorator`]: this._hasAILabel,
    });

    const textareaWrapperClasses = classMap({
      [`${prefix}--text-area__wrapper`]: true,
      [`${prefix}--text-area__wrapper--cols`]: this.cols,
      [`${prefix}--text-area__wrapper--warn`]: this.warn,
      [`${prefix}--text-area__wrapper--readonly`]: this.readonly,
    });

    const labelClasses = classMap({
      [`${prefix}--label`]: true,
      [`${prefix}--visually-hidden`]: this.hideLabel,
      [`${prefix}--label--disabled`]: this.disabled,
    });

    const counterClasses = classMap({
      [`${prefix}--label`]: true,
      [`${prefix}--label--disabled`]: this.disabled,
      [`${prefix}--text-area__label-counter`]: true,
    });

    const helperTextClasses = classMap({
      [`${prefix}--form__helper-text`]: true,
      [`${prefix}--form__helper-text--disabled`]: this.disabled,
    });

    const counter =
      enableCounter && maxCount
        ? html` <label class="${counterClasses}">
            <slot name="label-text"
              >${this.counterMode === 'word'
                ? wordCount
                : textCount}/${maxCount}</slot
            >
          </label>`
        : null;

    const icon = () => {
      if (this.invalid) {
        return invalidIcon;
      } else if (this.warn && !this.invalid) {
        return warnIcon;
      }
      return null;
    };

    const helper = html`
      <div class="${helperTextClasses}" id="helper-text">
        <slot name="helper-text">${this.helperText}</slot>
      </div>
    `;

    const normalizedProps = {
      invalid: this.invalid,
      warn: this.warn,
      'slot-name': this.invalid ? 'invalid-text' : 'warn-text',
      'slot-text': this.invalid ? this.invalidText : this.warnText,
    };

    const validationMessage = html`
      <div
        class="${prefix}--form-requirement"
        ?hidden="${!normalizedProps.invalid && !normalizedProps.warn}">
        <slot name="${normalizedProps['slot-name']}">
          ${normalizedProps['slot-text']} ${this.isFluid ? icon() : null}
        </slot>
      </div>
    `;

    return html`
      <div class="${prefix}--text-area__label-wrapper">
        <label class="${labelClasses}" for="input">
          <slot name="label-text"> ${this.label} </slot>
        </label>
        ${counter}
      </div>
      <div class="${textareaWrapperClasses}" ?data-invalid="${this.invalid}">
        ${!this.isFluid ? icon() : null}
        <textarea
          autocomplete="${this.autocomplete}"
          ?autofocus="${this.autofocus}"
          class="${textareaClasses}"
          cols="${ifDefined(this.cols)}"
          ?data-invalid="${this.invalid}"
          ?disabled="${this.disabled}"
          id="input"
          name="${ifNonEmpty(this.name)}"
          pattern="${ifNonEmpty(this.pattern)}"
          placeholder="${ifNonEmpty(this.placeholder)}"
          ?readonly="${this.readonly}"
          ?required="${this.required}"
          rows="${ifDefined(this.rows)}"
          .value="${this.value}"
          maxlength="${this.counterMode === 'character'
            ? ifNonEmpty(this.maxCount)
            : ''}"
          @keydown="${this._onKeyDown}"
          @paste="${this._onPaste}"
          @input="${this._handleInput}"></textarea>
        <slot name="ai-label" @slotchange="${this._handleSlotChange}"></slot>
        <slot name="slug" @slotchange="${this._handleSlotChange}"></slot>
        ${this.isFluid
          ? html`
              <hr class="${prefix}--text-area__divider" />
              ${validationMessage}
            `
          : null}
      </div>
      ${/* Non-fluid: validation and helper outside field wrapper */ ''}
      ${!this.isFluid ? html` ${helper} ${validationMessage} ` : null}
    `;
  }
  updated(): void {
    super.updated?.();
    if (this.counterMode !== this._prevCounterMode) {
      const textarea = this._textarea;
      if (textarea) {
        if (this.counterMode === 'character') {
          textarea.setAttribute('maxlength', String(this.maxCount));
        } else {
          textarea.removeAttribute('maxlength');
        }
      }
      this._prevCounterMode = this.counterMode;
    }

    const wrapper = this.shadowRoot?.querySelector<HTMLElement>(
      `.${prefix}--text-area__wrapper`
    );
    if (!wrapper) return;

    this._resizeObserver = new ResizeObserver(() => {
      this._measureWrapper();
    });
    this._resizeObserver.observe(wrapper);
  }

  /**
   * Measures the width of the wrapper and applies that to the max-width of the
   * helper-text and invalid/warn-text
   */
  private _measureWrapper() {
    const wrapper = this.shadowRoot?.querySelector<HTMLElement>(
      `.${prefix}--text-area__wrapper`
    );

    const wrapperWidth = wrapper?.scrollWidth;

    const helper = this.shadowRoot?.querySelector<HTMLElement>(
      `.${prefix}--form__helper-text`
    );
    const requirement = this.shadowRoot?.querySelector<HTMLElement>(
      `.${prefix}--form-requirement`
    );
    [helper, requirement].forEach((el) => {
      if (el) {
        el.style.maxWidth = `${wrapperWidth}px`;
        el.style.overflowWrap = 'break-word';
      }
    });
  }

  disconnectedCallback() {
    super.disconnectedCallback?.();
    this._resizeObserver?.disconnect();
  }

  static shadowRootOptions = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true,
  };
  static styles = styles;
}

export default CDSTextarea;
