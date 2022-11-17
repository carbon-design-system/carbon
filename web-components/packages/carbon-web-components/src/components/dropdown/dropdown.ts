/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import settings from 'carbon-components/es/globals/js/settings';
import { classMap } from 'lit-html/directives/class-map';
import { TemplateResult } from 'lit-html';
import { ifDefined } from 'lit-html/directives/if-defined';
import { html, property, query, customElement, LitElement } from 'lit-element';
import ChevronDown16 from '@carbon/icons/lib/chevron--down/16';
import WarningFilled16 from '@carbon/icons/lib/warning--filled/16';
import FocusMixin from '../../globals/mixins/focus';
import FormMixin from '../../globals/mixins/form';
import HostListenerMixin from '../../globals/mixins/host-listener';
import ValidityMixin from '../../globals/mixins/validity';
import HostListener from '../../globals/decorators/host-listener';
import { find, forEach, indexOf } from '../../globals/internal/collection-helpers';
import { DROPDOWN_COLOR_SCHEME, DROPDOWN_KEYBOARD_ACTION, DROPDOWN_SIZE, DROPDOWN_TYPE, NAVIGATION_DIRECTION } from './defs';
import BXDropdownItem from './dropdown-item';
import styles from './dropdown.scss';

export { DROPDOWN_COLOR_SCHEME, DROPDOWN_KEYBOARD_ACTION, DROPDOWN_SIZE, DROPDOWN_TYPE, NAVIGATION_DIRECTION };

const { prefix } = settings;

/**
 * Dropdown.
 *
 * @element bx-dropdown
 * @csspart label-text The label text.
 * @csspart helper-text The helper text.
 * @csspart trigger-button The trigger button.
 * @csspart menu-body The menu body.
 * @csspart validity-message The validity message.
 * @fires bx-dropdown-beingselected
 *   The custom event fired before a dropdown item is selected upon a user gesture.
 *   Cancellation of this event stops changing the user-initiated selection.
 * @fires bx-dropdown-beingtoggled
 *   The custom event fired before the open state of this dropdown is toggled upon a user gesture.
 *   Cancellation of this event stops the user-initiated toggling.
 * @fires bx-dropdown-selected - The custom event fired after a dropdown item is selected upon a user gesture.
 * @fires bx-dropdown-toggled - The custom event fired after the open state of this dropdown is toggled upon a user gesture.
 */
@customElement(`${prefix}-dropdown`)
class BXDropdown extends ValidityMixin(HostListenerMixin(FormMixin(FocusMixin(LitElement)))) {
  /**
   * The latest status of this dropdown, for screen reader to accounce.
   */
  protected _assistiveStatusText?: string;

  /**
   * The content of the selected item.
   */
  protected _selectedItemContent: DocumentFragment | null = null;

  /**
   * `true` if the trigger button should be focusable.
   * Derived class can set `false` to this if the trigger button contains another primary focusable element (e.g. `<input>`).
   */
  protected _shouldTriggerBeFocusable = true;

  /**
   * The list box `<div>` node.
   */
  @query(`.${prefix}--list-box`)
  protected _listBoxNode!: HTMLDivElement;

  /**
   * The `<slot>` element for the helper text in the shadow DOM.
   */
  @query('slot[name="helper-text"]')
  protected _slotHelperTextNode!: HTMLSlotElement;

  /**
   * The `<slot>` element for the label text in the shadow DOM.
   */
  @query('slot[name="label-text"]')
  protected _slotLabelTextNode!: HTMLSlotElement;

  /**
   * @param itemToSelect A dropdown item. Absense of this argument means clearing selection.
   * @returns `true` if the selection of this dropdown should change if the given item is selected upon user interaction.
   */
  protected _selectionShouldChange(itemToSelect?: BXDropdownItem) {
    return !itemToSelect || itemToSelect.value !== this.value;
  }

  /**
   * A callback that runs after change in dropdown selection upon user interaction is confirmed.
   *
   * @param itemToSelect
   *   A dropdown item.
   *   Absense of this argument means clearing selection, which may be handled by a derived class.
   */
  protected _selectionDidChange(itemToSelect?: BXDropdownItem) {
    if (itemToSelect) {
      this.value = itemToSelect.value;
      forEach(this.querySelectorAll((this.constructor as typeof BXDropdown).selectorItemSelected), item => {
        (item as BXDropdownItem).selected = false;
      });
      itemToSelect.selected = true;
      this._assistiveStatusText = this.selectedItemAssistiveText;
      this._handleUserInitiatedToggle(false);
    }
  }

  /**
   * Handles `click` event on the top-level element in the shadow DOM.
   *
   * @param event The event.
   */
  protected _handleClickInner(event: MouseEvent) {
    if (this.shadowRoot!.contains(event.target as Node)) {
      this._handleUserInitiatedToggle();
    } else {
      const item = (event.target as Element).closest((this.constructor as typeof BXDropdown).selectorItem) as BXDropdownItem;
      if (this.contains(item)) {
        this._handleUserInitiatedSelectItem(item);
      }
    }
  }

  /**
   * Handler for the `keydown` event on the top-level element in the shadow DOM.
   */
  protected _handleKeydownInner(event: KeyboardEvent) {
    const { key } = event;
    const action = (this.constructor as typeof BXDropdown).getAction(key);
    if (!this.open) {
      switch (action) {
        case DROPDOWN_KEYBOARD_ACTION.NAVIGATING:
          this._handleUserInitiatedToggle(true);
          // If this menu gets open with an arrow key, reset the highlight
          this._clearHighlight();
          break;
        default:
          break;
      }
    } else {
      switch (action) {
        case DROPDOWN_KEYBOARD_ACTION.CLOSING:
          this._handleUserInitiatedToggle(false);
          break;
        case DROPDOWN_KEYBOARD_ACTION.NAVIGATING:
          this._navigate(NAVIGATION_DIRECTION[key]);
          break;
        default:
          break;
      }
    }
  }

  /**
   * Handler for the `keypress` event on the top-level element in the shadow DOM.
   */
  protected _handleKeypressInner(event: KeyboardEvent) {
    const { key } = event;
    const action = (this.constructor as typeof BXDropdown).getAction(key);
    if (!this.open) {
      switch (action) {
        case DROPDOWN_KEYBOARD_ACTION.TRIGGERING:
          this._handleUserInitiatedToggle(true);
          break;
        default:
          break;
      }
    } else {
      switch (action) {
        case DROPDOWN_KEYBOARD_ACTION.TRIGGERING:
          {
            const constructor = this.constructor as typeof BXDropdown;
            const highlightedItem = this.querySelector(constructor.selectorItemHighlighted) as BXDropdownItem;
            if (highlightedItem) {
              this._handleUserInitiatedSelectItem(highlightedItem);
            } else {
              this._handleUserInitiatedToggle(false);
            }
          }
          break;
        default:
          break;
      }
    }
  }

  /**
   * Handles `blur` event handler on the document this element is in.
   *
   * @param event The event.
   */
  @HostListener('focusout')
  // @ts-ignore: The decorator refers to this method but TS thinks this method is not referred to
  protected _handleFocusOut(event: FocusEvent) {
    if (!this.contains(event.relatedTarget as Node)) {
      this._handleUserInitiatedToggle(false);
    }
  }

  /**
   * Handles `slotchange` event for the `<slot>` for helper text.
   */
  protected _handleSlotchangeHelperText() {
    this.requestUpdate();
  }

  /**
   * Handles `slotchange` event for the `<slot>` for label text.
   */
  protected _handleSlotchangeLabelText() {
    this.requestUpdate();
  }

  /**
   * Handles user-initiated selection of a dropdown item.
   *
   * @param [item] The dropdown item user wants to select. Absense of this argument means clearing selection.
   */
  protected _handleUserInitiatedSelectItem(item?: BXDropdownItem) {
    if (this._selectionShouldChange(item)) {
      const init = {
        bubbles: true,
        composed: true,
        detail: {
          item,
        },
      };
      const constructor = this.constructor as typeof BXDropdown;
      const beforeSelectEvent = new CustomEvent(constructor.eventBeforeSelect, {
        ...init,
        cancelable: true,
      });
      if (this.dispatchEvent(beforeSelectEvent)) {
        this._selectionDidChange(item);
        const afterSelectEvent = new CustomEvent(constructor.eventSelect, init);
        this.dispatchEvent(afterSelectEvent);
      }
    }
  }

  /**
   * Handles user-initiated toggling the open state.
   *
   * @param [force] If specified, forces the open state to the given one.
   */
  protected _handleUserInitiatedToggle(force: boolean = !this.open) {
    const { eventBeforeToggle, eventToggle } = this.constructor as typeof BXDropdown;
    const init = {
      bubbles: true,
      cancelable: true,
      composed: true,
      detail: {
        open: force,
      },
    };
    if (this.dispatchEvent(new CustomEvent(eventBeforeToggle, init))) {
      this.open = force;
      if (this.open) {
        this._assistiveStatusText = this.selectingItemsAssistiveText;
      } else {
        const {
          selectedItemAssistiveText,
          triggerContent,
          _assistiveStatusText: assistiveStatusText,
          _selectedItemContent: selectedItemContent,
        } = this;
        const selectedItemText = (selectedItemContent && selectedItemContent.textContent) || triggerContent;
        if (selectedItemText && assistiveStatusText !== selectedItemAssistiveText) {
          this._assistiveStatusText = selectedItemText;
        }
        forEach(this.querySelectorAll((this.constructor as typeof BXDropdown).selectorItemHighlighted), item => {
          (item as BXDropdownItem).highlighted = false;
        });
      }
      this.requestUpdate();
      this.dispatchEvent(new CustomEvent(eventToggle, init));
    }
  }

  /**
   * Clears the selection of dropdown items.
   */
  protected _clearHighlight() {
    forEach(this.querySelectorAll((this.constructor as typeof BXDropdown).selectorItem), item => {
      (item as BXDropdownItem).highlighted = false;
    });
  }

  /**
   * Navigate through dropdown items.
   *
   * @param direction `-1` to navigate backward, `1` to navigate forward.
   */
  protected _navigate(direction: number) {
    const constructor = this.constructor as typeof BXDropdown;
    const items = this.querySelectorAll(constructor.selectorItem);
    const highlightedItem = this.querySelector(constructor.selectorItemHighlighted);
    const highlightedIndex = indexOf(items, highlightedItem!);
    let nextIndex = highlightedIndex + direction;
    if (nextIndex < 0) {
      nextIndex = items.length - 1;
    }
    if (nextIndex >= items.length) {
      nextIndex = 0;
    }
    forEach(items, (item, i) => {
      (item as BXDropdownItem).highlighted = i === nextIndex;
    });

    const nextItem = items[nextIndex];
    // Using `{ block: 'nearest' }` to prevent scrolling unless scrolling is absolutely necessary.
    // `scrollIntoViewOptions` seems to work in latest Safari despite of MDN/caniuse table.
    // IE falls back to the old behavior.
    nextItem.scrollIntoView({ block: 'nearest' });

    const nextItemText = nextItem.textContent;
    if (nextItemText) {
      this._assistiveStatusText = nextItemText;
    }
    this.requestUpdate();
  }

  /* eslint-disable class-methods-use-this */
  /**
   * @returns The content preceding the trigger button.
   */
  protected _renderPrecedingTriggerContent(): TemplateResult | void {
    return undefined;
  }
  /* eslint-enable class-methods-use-this */

  /**
   * @returns The main content of the trigger button.
   */
  protected _renderTriggerContent(): TemplateResult {
    const { triggerContent, _selectedItemContent: selectedItemContent } = this;
    return html`
      <span id="trigger-label" class="${prefix}--list-box__label">${selectedItemContent || triggerContent}</span>
    `;
  }

  /* eslint-disable class-methods-use-this */
  /**
   * @returns The content following the trigger button.
   */
  protected _renderFollowingTriggerContent(): TemplateResult | void {
    return undefined;
  }
  /* eslint-enable class-methods-use-this */

  /**
   * Handles event to include selected value on the parent form.
   *
   * @param event The event.
   */
  _handleFormdata(event: Event) {
    const { formData } = event as any; // TODO: Wait for `FormDataEvent` being available in `lib.dom.d.ts`
    const { disabled, name, value } = this;
    if (!disabled) {
      formData.append(name, value);
    }
  }

  /**
   * The color scheme.
   */
  @property({ attribute: 'color-scheme', reflect: true })
  colorScheme = DROPDOWN_COLOR_SCHEME.REGULAR;

  /**
   * `true` if this dropdown should be disabled.
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /**
   * The helper text.
   */
  @property({ attribute: 'helper-text' })
  helperText = '';

  /**
   * `true` to show the UI of the invalid state.
   */
  @property({ type: Boolean, reflect: true })
  invalid = false;

  /**
   * The label text.
   */
  @property({ attribute: 'label-text' })
  labelText = '';

  /**
   * Name for the dropdown in the `FormData`
   */
  @property()
  name = '';

  /**
   * `true` if this dropdown should be open.
   */
  @property({ type: Boolean, reflect: true })
  open = false;

  /**
   * `true` if the value is required.
   */
  @property({ type: Boolean, reflect: true })
  required = false;

  /**
   * The special validity message for `required`.
   */
  @property({ attribute: 'required-validity-message' })
  requiredValidityMessage = 'Please fill out this field.';

  /**
   * An assistive text for screen reader to announce, telling the open state.
   */
  @property({ attribute: 'selecting-items-assistive-text' })
  selectingItemsAssistiveText = 'Selecting items. Use up and down arrow keys to navigate.';

  /**
   * An assistive text for screen reader to announce, telling that an item is selected.
   */
  @property({ attribute: 'selected-item-assistive-text' })
  selectedItemAssistiveText = 'Selected an item.';

  /**
   * Dropdown size.
   */
  @property({ reflect: true })
  size = DROPDOWN_SIZE.REGULAR;

  /**
   * The `aria-label` attribute for the UI indicating the closed state.
   */
  @property({ attribute: 'toggle-label-closed' })
  toggleLabelClosed = '';

  /**
   * The `aria-label` attribute for the UI indicating the open state.
   */
  @property({ attribute: 'toggle-label-open' })
  toggleLabelOpen = '';

  /**
   * The content of the trigger button.
   */
  @property({ attribute: 'trigger-content' })
  triggerContent = '';

  /**
   * `true` if this dropdown should use the inline UI variant.
   */
  @property({ reflect: true })
  type = DROPDOWN_TYPE.REGULAR;

  /**
   * The validity message.
   */
  @property({ attribute: 'validity-message' })
  validityMessage = '';

  /**
   * The value of the selected item.
   */
  @property({ reflect: true })
  value = '';

  createRenderRoot() {
    return this.attachShadow({
      mode: 'open',
      delegatesFocus: Number((/Safari\/(\d+)/.exec(navigator.userAgent) ?? ['', 0])[1]) <= 537,
    });
  }

  shouldUpdate(changedProperties) {
    const { selectorItem } = this.constructor as typeof BXDropdown;
    if (changedProperties.has('size')) {
      forEach(this.querySelectorAll(selectorItem), elem => {
        (elem as BXDropdownItem).size = this.size;
      });
    }
    if (changedProperties.has('value')) {
      // `<bx-multi-select>` updates selection beforehand
      // because our rendering logic for `<bx-multi-select>` looks for selected items via `qSA()`
      forEach(this.querySelectorAll(selectorItem), elem => {
        (elem as BXDropdownItem).selected = (elem as BXDropdownItem).value === this.value;
      });
      const item = find(this.querySelectorAll(selectorItem), elem => (elem as BXDropdownItem).value === this.value);
      if (item) {
        const range = this.ownerDocument!.createRange();
        range.selectNodeContents(item);
        this._selectedItemContent = range.cloneContents();
      } else {
        this._selectedItemContent = null;
      }
    }
    return true;
  }

  updated(changedProperties) {
    const { helperText, type } = this;
    const inline = type === DROPDOWN_TYPE.INLINE;
    const { selectorItem } = this.constructor as typeof BXDropdown;
    if (changedProperties.has('disabled')) {
      const { disabled } = this;
      // Propagate `disabled` attribute to descendants until `:host-context()` gets supported in all major browsers
      forEach(this.querySelectorAll(selectorItem), elem => {
        (elem as BXDropdownItem).disabled = disabled;
      });
    }
    if ((changedProperties.has('helperText') || changedProperties.has('type')) && helperText && inline) {
      // eslint-disable-next-line no-console
      console.warn('Found `helperText` property/attribute usage in inline mode, that is not supported, at:', this);
    }
  }

  render() {
    const {
      colorScheme,
      disabled,
      helperText,
      invalid,
      labelText,
      open,
      toggleLabelClosed,
      toggleLabelOpen,
      size,
      type,
      validityMessage,
      _assistiveStatusText: assistiveStatusText,
      _shouldTriggerBeFocusable: shouldTriggerBeFocusable,
      _handleClickInner: handleClickInner,
      _handleKeydownInner: handleKeydownInner,
      _handleKeypressInner: handleKeypressInner,
      _handleSlotchangeHelperText: handleSlotchangeHelperText,
      _handleSlotchangeLabelText: handleSlotchangeLabelText,
      _slotHelperTextNode: slotHelperTextNode,
      _slotLabelTextNode: slotLabelTextNode,
    } = this;
    const inline = type === DROPDOWN_TYPE.INLINE;
    const selectedItemsCount = this.querySelectorAll((this.constructor as typeof BXDropdown).selectorItemSelected).length;
    const classes = classMap({
      [`${prefix}--dropdown`]: true,
      [`${prefix}--list-box`]: true,
      [`${prefix}--list-box--${colorScheme}`]: colorScheme,
      [`${prefix}--list-box--disabled`]: disabled,
      [`${prefix}--list-box--inline`]: inline,
      [`${prefix}--list-box--expanded`]: open,
      [`${prefix}--list-box--${size}`]: size,
      [`${prefix}--dropdown--invalid`]: invalid,
      [`${prefix}--dropdown--inline`]: inline,
      [`${prefix}--dropdown--selected`]: selectedItemsCount > 0,
    });
    const labelClasses = classMap({
      [`${prefix}--label`]: true,
      [`${prefix}--label--disabled`]: disabled,
    });
    const helperClasses = classMap({
      [`${prefix}--form__helper-text`]: true,
      [`${prefix}--form__helper-text--disabled`]: disabled,
    });
    const iconContainerClasses = classMap({
      [`${prefix}--list-box__menu-icon`]: true,
      [`${prefix}--list-box__menu-icon--open`]: open,
    });
    const toggleLabel = (open ? toggleLabelOpen : toggleLabelClosed) || undefined;
    const hasHelperText = helperText || (slotHelperTextNode && slotHelperTextNode.assignedNodes().length > 0);
    const hasLabelText = labelText || (slotLabelTextNode && slotLabelTextNode.assignedNodes().length > 0);
    const helper = !invalid
      ? html`
          <div part="helper-text" class="${helperClasses}" ?hidden="${inline || !hasHelperText}">
            <slot name="helper-text" @slotchange="${handleSlotchangeHelperText}">${helperText}</slot>
          </div>
        `
      : html`
          <div part="validity-message" class=${`${prefix}--form-requirement`}>
            <slot name="validity-message">${validityMessage}</slot>
          </div>
        `;
    const validityIcon = !invalid
      ? undefined
      : WarningFilled16({ class: `${prefix}--list-box__invalid-icon`, 'aria-label': toggleLabel });
    const menuBody = !open
      ? undefined
      : html`
          <div id="menu-body" part="menu-body" class="${prefix}--list-box__menu" role="listbox" tabindex="-1">
            <slot></slot>
          </div>
        `;
    return html`
      <label part="label-text" class="${labelClasses}" ?hidden="${!hasLabelText}">
        <slot name="label-text" @slotchange="${handleSlotchangeLabelText}">${labelText}</slot>
      </label>
      <div
        role="listbox"
        class="${classes}"
        ?data-invalid=${invalid}
        @click=${handleClickInner}
        @keydown=${handleKeydownInner}
        @keypress=${handleKeypressInner}
      >
        ${validityIcon}
        <div
          part="trigger-button"
          role="${ifDefined(!shouldTriggerBeFocusable ? undefined : 'button')}"
          class="${prefix}--list-box__field"
          tabindex="${ifDefined(!shouldTriggerBeFocusable ? undefined : '0')}"
          aria-labelledby="trigger-label"
          aria-expanded="${String(open)}"
          aria-haspopup="listbox"
          aria-owns="menu-body"
          aria-controls="menu-body"
        >
          ${this._renderPrecedingTriggerContent()}${this._renderTriggerContent()}${this._renderFollowingTriggerContent()}
          <div class="${iconContainerClasses}">${ChevronDown16({ 'aria-label': toggleLabel })}</div>
        </div>
        ${menuBody}
      </div>
      ${helper}
      <div class="${prefix}--assistive-text" role="status" aria-live="assertive" aria-relevant="additions text">
        ${assistiveStatusText}
      </div>
    `;
  }

  /**
   * Symbols of keys that triggers opening/closing menu and selecting/deselecting menu item.
   */
  static TRIGGER_KEYS = new Set([' ', 'Enter']);

  /**
   * A selector that will return highlighted items.
   */
  static get selectorItemHighlighted() {
    return `${prefix}-dropdown-item[highlighted]`;
  }

  /**
   * A selector that will return dropdown items.
   */
  static get selectorItem() {
    return `${prefix}-dropdown-item`;
  }

  /**
   * A selector that will return selected items.
   */
  static get selectorItemSelected() {
    return `${prefix}-dropdown-item[selected]`;
  }

  /**
   * The name of the custom event fired before a dropdown item is selected upon a user gesture.
   * Cancellation of this event stops changing the user-initiated selection.
   */
  static get eventBeforeSelect() {
    return `${prefix}-dropdown-beingselected`;
  }

  /**
   * The name of the custom event fired after a a dropdown item is selected upon a user gesture.
   */
  static get eventSelect() {
    return `${prefix}-dropdown-selected`;
  }

  /**
   * The name of the custom event fired before this dropdown item is being toggled upon a user gesture.
   * Cancellation of this event stops the user-initiated action of toggling this dropdown item.
   */
  static get eventBeforeToggle() {
    return `${prefix}-dropdown-beingtoggled`;
  }

  /**
   * The name of the custom event fired after this dropdown item is toggled upon a user gesture.
   */
  static get eventToggle() {
    return `${prefix}-dropdown-toggled`;
  }

  static styles = styles;

  /**
   * @returns A action for dropdown for the given key symbol.
   */
  static getAction(key: string) {
    if (key === 'Escape') {
      return DROPDOWN_KEYBOARD_ACTION.CLOSING;
    }
    if (key in NAVIGATION_DIRECTION) {
      return DROPDOWN_KEYBOARD_ACTION.NAVIGATING;
    }
    if (this.TRIGGER_KEYS.has(key)) {
      return DROPDOWN_KEYBOARD_ACTION.TRIGGERING;
    }
    return DROPDOWN_KEYBOARD_ACTION.NONE;
  }
}

export default BXDropdown;
