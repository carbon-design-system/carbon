/**
 * @license
 *
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement, html } from 'lit';
import { property, state, query } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { carbonElement as customElement } from '@carbon/web-components/es/globals/decorators/carbon-element.js';
import { prefix, carbonPrefix } from '../../globals/settings';
import styles from './edit-in-place.scss?lit';
import '@carbon/web-components/es/components/icon-button/index.js';
import '@carbon/web-components/es/components/tooltip/index.js';
import Edit16 from '@carbon/icons/es/edit/16';
import EditOff16 from '@carbon/icons/es/edit--off/16';
import Checkmark16 from '@carbon/icons/es/checkmark/16';
import Close16 from '@carbon/icons/es/close/16';
import WarningFilled16 from '@carbon/icons/es/warning--filled/16';
import { iconLoader } from '@carbon/web-components/es/globals/internal/icon-loader.js';
import { EDIT_IN_PLACE_SIZE, TOOLTIP_ALIGNMENT } from './defs';

const blockClass = `${prefix}--edit-in-place`;

export type EditInPlaceSize = `${EDIT_IN_PLACE_SIZE}`;
export type TooltipAlignment = `${TOOLTIP_ALIGNMENT}`;

/**
 * EditInPlace component for inline text editing.
 *
 * @element c4p-edit-in-place
 * @csspart input - The input element
 * @csspart actions - The button container
 * @csspart invalid-text - The error message container
 * @fires c4p-edit-in-place-change - Fired when the input value changes
 * @fires c4p-edit-in-place-save - Fired when the save button is clicked or Enter is pressed
 * @fires c4p-edit-in-place-cancel - Fired when the cancel button is clicked or Escape is pressed
 * @fires c4p-edit-in-place-blur - Fired when the input loses focus (if onBlur handler is used)
 */
@customElement(`${prefix}-edit-in-place`)
class C4PEditInPlace extends LitElement {
  /**
   * Label for the cancel button
   */
  @property({ type: String, attribute: 'cancel-label' })
  cancelLabel = 'Cancel';

  /**
   * By default the edit icon is shown on hover only. Set to true to always show it.
   */
  @property({ type: Boolean, attribute: 'edit-always-visible' })
  editAlwaysVisible = false;

  /**
   * Label for the edit button
   */
  @property({ type: String, attribute: 'edit-label' })
  editLabel = 'Edit';

  /**
   * Specify a custom id for the input
   */
  @property({ type: String })
  id = '';

  /**
   * Causes the text entry field to inherit typography settings from the container
   */
  @property({ type: Boolean, attribute: 'inherit-typography' })
  inheritTypography = false;

  /**
   * Determines if the input is invalid
   */
  @property({ type: Boolean })
  invalid = false;

  /**
   * Text that is displayed if the input is invalid
   */
  @property({ type: String, attribute: 'invalid-text' })
  invalidText = '';

  /**
   * Text that will be read by a screen reader when visiting this control
   */
  @property({ type: String, attribute: 'label-text' })
  labelText = '';

  /**
   * Placeholder text for the input
   */
  @property({ type: String })
  placeholder = '';

  /**
   * Determines if the input is in readOnly mode
   */
  @property({ type: Boolean, attribute: 'read-only' })
  readOnly = false;

  /**
   * Label for the edit off button that displays when in read only mode
   */
  @property({ type: String, attribute: 'read-only-label' })
  readOnlyLabel = 'Edit off';

  /**
   * Text for the toggletip that displays when in read only mode
   */
  @property({ type: String, attribute: 'read-only-toggletip-text' })
  readOnlyToggleTipText = 'This field is read-only and cannot be edited';

  /**
   * Label for the save button
   */
  @property({ type: String, attribute: 'save-label' })
  saveLabel = 'Save';

  /**
   * Vertical size of control
   */
  @property({ type: String })
  size: EditInPlaceSize = 'sm';

  /**
   * Alignment for the toggletip that displays when in read only mode
   */
  @property({ type: String, attribute: 'toggletip-alignment' })
  toggleTipAlignment: TooltipAlignment = 'bottom';

  /**
   * Tooltip alignment for buttons
   */
  @property({ type: String, attribute: 'tooltip-alignment' })
  tooltipAlignment: TooltipAlignment = 'top';

  /**
   * Current value of the input (controlled mode)
   */
  @property({ type: String })
  value = '';

  /**
   * Default value for uncontrolled mode
   */
  @property({ type: String, attribute: 'default-value' })
  defaultValue = '';

  /**
   * Internal state for focused mode
   */
  @state()
  private _focused = false;

  /**
   * Internal value for managing state
   */
  @state()
  private _internalValue = '';

  /**
   * Internal state for initial value (when entering edit mode)
   */
  @state()
  private _initialValue = '';

  /**
   * Internal state to track if input has been modified
   */
  @state()
  private _dirtyInput = false;

  /**
   * Flag to track if we're handling escape key
   */
  private _escaping = false;

  /**
   * Flag to track if we're clicking within the component
   */
  private _clickingWithin = false;

  /**
   * Reference to the input element
   */
  @query('input')
  private _inputElement!: HTMLInputElement;

  /**
   * Bound handler for document clicks (for cleanup)
   */
  private _boundHandleDocumentClick: ((e: MouseEvent) => void) | null = null;

  /**
   * Check if value has changed from initial
   */
  private get _hasValueChanged(): boolean {
    return this._internalValue.trim() !== this._initialValue.trim();
  }

  /**
   * Check if we can save (value changed and not invalid)
   */
  private get _canSave(): boolean {
    return this._hasValueChanged && !this.invalid;
  }

  /**
   * Check if we can cancel (value has changed)
   */
  private get _canCancel(): boolean {
    return this._hasValueChanged;
  }

  /**
   * Handle input change
   */
  private _handleChange(e: Event) {
    const input = e.target as HTMLInputElement;
    if (!this._dirtyInput) {
      this._dirtyInput = true;
    }

    this._internalValue = input.value;

    const init = {
      bubbles: true,
      composed: true,
      detail: { value: this._internalValue },
    };
    this.dispatchEvent(new CustomEvent(`${prefix}-edit-in-place-change`, init));
  }

  /**
   * Handle focus
   */
  private _handleFocus(e: FocusEvent) {
    const relatedTarget = e.relatedTarget as Node;
    if (!this.contains(relatedTarget)) {
      requestAnimationFrame(() => {
        this._inputElement?.focus();
      });
    }
    this._focused = true;
  }

  /**
   * Handle save
   */
  private _handleSave(exitEditMode = false) {
    this._initialValue = this._internalValue;
    this._dirtyInput = false;

    const init = {
      bubbles: true,
      composed: true,
      detail: { value: this._internalValue },
    };
    this.dispatchEvent(new CustomEvent(`${prefix}-edit-in-place-save`, init));

    if (exitEditMode) {
      this._focused = false;
    } else {
      requestAnimationFrame(() => {
        this._inputElement?.focus();
      });
    }
  }

  /**
   * Handle cancel
   */
  private _handleCancel(exitEditMode = false) {
    this._dirtyInput = false;
    this._internalValue = this._initialValue;

    const init = {
      bubbles: true,
      composed: true,
      detail: { value: this._initialValue },
    };
    this.dispatchEvent(new CustomEvent(`${prefix}-edit-in-place-cancel`, init));

    if (exitEditMode) {
      this._focused = false;
    } else {
      requestAnimationFrame(() => {
        if (this._inputElement) {
          this._inputElement.focus();
          const length = this._inputElement.value.length;
          this._inputElement.setSelectionRange(length, length);
        }
      });
    }
  }

  /**
   * Handle blur
   */
  private _handleBlur(e: FocusEvent) {
    const relatedTarget = e.relatedTarget as Node;
    const clickedWithin = this._clickingWithin;
    const targetingChild = this.contains(relatedTarget);

    // Reset clicking flag if we clicked within
    if (clickedWithin) {
      this._clickingWithin = false;
      // If focus is staying within, don't exit edit mode
      if (targetingChild) {
        return;
      }
    }

    // If tabbing to a button within, allow it
    if (!clickedWithin && targetingChild) {
      return;
    }

    // Default behavior: auto-save or auto-cancel
    if (this._escaping) {
      return;
    }

    if (this._canSave) {
      this._handleSave(true);
    } else {
      this._handleCancel(true);
    }

    // Dispatch blur event
    const init = {
      bubbles: true,
      composed: true,
      detail: { value: this._initialValue },
    };
    this.dispatchEvent(new CustomEvent(`${prefix}-edit-in-place-blur`, init));
  }

  /**
   * Handle keyboard events
   */
  private _handleKeyDown(e: KeyboardEvent) {
    switch (e.key) {
      case 'Escape':
        this._escaping = true;
        this._inputElement?.blur();
        this._handleCancel(false);
        this._escaping = false;
        break;
      case 'Enter':
        this._escaping = true;
        this._inputElement?.blur();
        if (this._canSave) {
          this._handleSave(false);
        }
        this._escaping = false;
        break;
      case 'Tab':
        // When tabbing from input, check if we're going outside the component
        // If shift+tab, we're going backwards (let it handle naturally)
        // If tab forward and no changes, we should exit edit mode
        if (!e.shiftKey && !this._hasValueChanged) {
          // Exit edit mode when tabbing out without changes
          this._handleCancel(true);
        }
        break;
      default:
        break;
    }
  }

  /**
   * Handle toolbar mousedown to track button clicks
   * Uses composedPath() to properly handle Shadow DOM boundaries
   */
  private _handleToolbarMouseDown(e: MouseEvent) {
    const path = e.composedPath();
    const foundButton = path.find(
      (el) =>
        el instanceof HTMLElement &&
        (el.tagName === 'BUTTON' || el.tagName === 'CDS-ICON-BUTTON')
    ) as HTMLElement | undefined;

    if (foundButton) {
      this._clickingWithin = true;

      // For disabled buttons, prevent default to stop blur
      const isDisabled =
        foundButton.hasAttribute('disabled') ||
        foundButton.getAttribute('aria-disabled') === 'true';
      if (isDisabled) {
        e.preventDefault();
      }
    }
  }

  /**
   * Handle keydown on save button to exit edit mode on Tab
   */
  private _handleSaveButtonKeyDown(e: KeyboardEvent) {
    if (e.key === 'Tab' && !e.shiftKey) {
      // Tab forward from save button - exit edit mode
      this._focused = false;
      this._inputElement?.blur();
    }
  }

  /**
   * Handle clicks outside the component
   */
  private _handleDocumentClick(e: MouseEvent) {
    // Only handle if we're in focused mode
    if (!this._focused) {
      return;
    }

    // Check if click is outside the component
    const path = e.composedPath();
    const clickedInside = path.includes(this);

    if (!clickedInside) {
      // Click was outside - exit edit mode
      if (this._canSave) {
        this._handleSave(true);
      } else {
        this._handleCancel(true);
      }
    }
  }

  /**
   * Initialize component
   */
  connectedCallback() {
    super.connectedCallback();
    this._internalValue = this.value || this.defaultValue;
    this._initialValue = this._internalValue;

    // Set up document click listener
    this._boundHandleDocumentClick = this._handleDocumentClick.bind(this);
    document.addEventListener('click', this._boundHandleDocumentClick, true);
  }

  /**
   * Cleanup component state when removed from DOM
   */
  disconnectedCallback() {
    super.disconnectedCallback();
    this._escaping = false;
    this._clickingWithin = false;
    this._focused = false;

    // Clean up document click listener
    if (this._boundHandleDocumentClick) {
      document.removeEventListener(
        'click',
        this._boundHandleDocumentClick,
        true
      );
      this._boundHandleDocumentClick = null;
    }
  }

  /**
   * Render the input element
   */
  private _renderInput() {
    const inputClasses = {
      [`${blockClass}__text-input`]: true,
      [`${carbonPrefix}--text-input`]: true,
      [`${carbonPrefix}--text-input--${this.size}`]: true,
    };

    const inputElement = html`
      <input
        id=${this.id}
        class=${classMap(inputClasses)}
        type="text"
        part="input"
        placeholder=${this.placeholder}
        .value=${this._internalValue}
        @input=${this._handleChange}
        @focus=${this._handleFocus}
        @keydown=${this._handleKeyDown}
        aria-label=${this.labelText}
        aria-invalid=${this.invalid ? 'true' : 'false'}
        ?readonly=${this.readOnly}
      />
    `;

    if (this.readOnly) {
      return html`
        <cds-tooltip
          align=${this.toggleTipAlignment}
          class="${blockClass}__toggletip-wrapper"
        >
          ${inputElement}
          <cds-tooltip-content
            >${this.readOnlyToggleTipText}</cds-tooltip-content
          >
        </cds-tooltip>
      `;
    }

    return inputElement;
  }

  /**
   * Render action buttons
   */
  private _renderActions() {
    if (this.readOnly) {
      return html`
        <cds-icon-button
          class="${blockClass}__btn-readonly"
          size=${this.size}
          align=${this.tooltipAlignment}
          kind="ghost"
          @click=${this._handleFocus}
        >
          ${iconLoader(EditOff16, { slot: 'icon' })}
          <span slot="tooltip-content">${this.readOnlyLabel}</span>
        </cds-icon-button>
      `;
    }

    if (this._focused) {
      return html`
        <cds-icon-button
          class="${blockClass}__btn ${blockClass}__btn-cancel"
          size=${this.size}
          align=${this.tooltipAlignment}
          kind="ghost"
          ?disabled=${!this._canCancel}
          @click=${() => this._handleCancel(false)}
        >
          ${iconLoader(Close16, { slot: 'icon' })}
          <span slot="tooltip-content">${this.cancelLabel}</span>
        </cds-icon-button>
        <cds-icon-button
          class="${blockClass}__btn ${blockClass}__btn-save"
          size=${this.size}
          align=${this.tooltipAlignment}
          kind="ghost"
          ?disabled=${!this._canSave}
          @click=${() => this._handleSave(false)}
          @keydown=${this._handleSaveButtonKeyDown}
        >
          ${iconLoader(Checkmark16, { slot: 'icon' })}
          <span slot="tooltip-content">${this.saveLabel}</span>
        </cds-icon-button>
      `;
    }

    const editBtnClasses = {
      [`${blockClass}__btn`]: true,
      [`${blockClass}__btn-edit`]: true,
      [`${blockClass}__btn-edit--always-visible`]: this.editAlwaysVisible,
    };

    return html`
      <cds-icon-button
        class=${classMap(editBtnClasses)}
        size=${this.size}
        align=${this.tooltipAlignment}
        kind="ghost"
        @click=${this._handleFocus}
      >
        ${iconLoader(Edit16, { slot: 'icon' })}
        <span slot="tooltip-content">${this.editLabel}</span>
      </cds-icon-button>
    `;
  }

  render() {
    const containerClasses = {
      [`${blockClass}__container`]: true,
      [`${blockClass}--${this.size}`]: true,
      [`${blockClass}--focused`]: this._focused,
      [`${blockClass}--invalid`]: this.invalid,
      [`${blockClass}--inherit-type`]: this.inheritTypography,
      [`${blockClass}--readonly`]: this.readOnly,
    };

    return html`
      <div class=${classMap(containerClasses)} @blur=${this._handleBlur}>
        ${this._renderInput()}
        <div
          class="${blockClass}__toolbar"
          part="actions"
          @mousedown=${this._handleToolbarMouseDown}
        >
          ${this.invalid
            ? iconLoader(WarningFilled16, {
                class: `${blockClass}__warning-icon`,
              })
            : ''}
          ${this._renderActions()}
        </div>
      </div>
      ${this.invalid
        ? html`<p class="${blockClass}__warning-text" part="invalid-text">
            ${this.invalidText}
          </p>`
        : ''}
    `;
  }

  static styles = styles;
}

export default C4PEditInPlace;
