/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { LitElement, html, TemplateResult } from 'lit';
import { property, query } from 'lit/decorators.js';
import { prefix } from '../../globals/settings';
import ChevronDown16 from '@carbon/icons/lib/chevron--down/16';
import WarningFilled16 from '@carbon/icons/lib/warning--filled/16';
import WarningAltFilled16 from '@carbon/icons/lib/warning--alt--filled/16';
import FocusMixin from '../../globals/mixins/focus';
import FormMixin from '../../globals/mixins/form';
import HostListenerMixin from '../../globals/mixins/host-listener';
import ValidityMixin from '../../globals/mixins/validity';
import HostListener from '../../globals/decorators/host-listener';
import {
  find,
  forEach,
  indexOf,
} from '../../globals/internal/collection-helpers';
import {
  DROPDOWN_DIRECTION,
  DROPDOWN_KEYBOARD_ACTION,
  DROPDOWN_SIZE,
  DROPDOWN_TYPE,
  NAVIGATION_DIRECTION,
} from './defs';
import CDSDropdownItem from './dropdown-item';
import styles from './dropdown.scss';
import { carbonElement as customElement } from '../../globals/decorators/carbon-element';

export {
  DROPDOWN_KEYBOARD_ACTION,
  DROPDOWN_DIRECTION,
  DROPDOWN_SIZE,
  DROPDOWN_TYPE,
  NAVIGATION_DIRECTION,
};

/**
 * Dropdown.
 *
 * @element cds-dropdown
 * @csspart label-text The label text.
 * @csspart helper-text The helper text.
 * @csspart trigger-button The trigger button.
 * @csspart menu-body The menu body.
 * @csspart validity-message The validity message.
 * @fires cds-dropdown-beingselected
 *   The custom event fired before a dropdown item is selected upon a user gesture.
 *   Cancellation of this event stops changing the user-initiated selection.
 * @fires cds-dropdown-beingtoggled
 *   The custom event fired before the open state of this dropdown is toggled upon a user gesture.
 *   Cancellation of this event stops the user-initiated toggling.
 * @fires cds-dropdown-selected - The custom event fired after a dropdown item is selected upon a user gesture.
 * @fires cds-dropdown-toggled - The custom event fired after the open state of this dropdown is toggled upon a user gesture.
 */
@customElement(`${prefix}-dropdown`)
class CDSDropdown extends ValidityMixin(
  HostListenerMixin(FormMixin(FocusMixin(LitElement)))
) {
  /**
   * `true` if there is a slug.
   */
  protected _hasSlug = false;

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
   * The `<slot>` element for the title text in the shadow DOM.
   */
  @query('slot[name="title-text"]')
  protected _slotTitleTextNode!: HTMLSlotElement;

  /**
   * @param itemToSelect A dropdown item. Absense of this argument means clearing selection.
   * @returns `true` if the selection of this dropdown should change if the given item is selected upon user interaction.
   */
  protected _selectionShouldChange(itemToSelect?: CDSDropdownItem) {
    return !itemToSelect || itemToSelect.value !== this.value;
  }

  /**
   * A callback that runs after change in dropdown selection upon user interaction is confirmed.
   *
   * @param itemToSelect
   *   A dropdown item.
   *   Absense of this argument means clearing selection, which may be handled by a derived class.
   */
  protected _selectionDidChange(itemToSelect?: CDSDropdownItem) {
    if (itemToSelect) {
      this.value = itemToSelect.value;
      forEach(
        this.querySelectorAll(
          (this.constructor as typeof CDSDropdown).selectorItemSelected
        ),
        (item) => {
          (item as CDSDropdownItem).selected = false;
        }
      );
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
    if (this.readOnly) {
      return;
    }

    if (this.shadowRoot!.contains(event.target as Node)) {
      this._handleUserInitiatedToggle();
    } else {
      const item = (event.target as Element).closest(
        (this.constructor as typeof CDSDropdown).selectorItem
      ) as CDSDropdownItem;
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
    const action = (this.constructor as typeof CDSDropdown).getAction(key);
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
    const action = (this.constructor as typeof CDSDropdown).getAction(key);
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
            const constructor = this.constructor as typeof CDSDropdown;
            const highlightedItem = this.querySelector(
              constructor.selectorItemHighlighted
            ) as CDSDropdownItem;
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
   * Handles `slotchange` event.
   */
  protected _handleSlugSlotChange({ target }: Event) {
    const hasContent = (target as HTMLSlotElement)
      .assignedNodes()
      .filter((elem) =>
        (elem as HTMLElement).matches !== undefined
          ? (elem as HTMLElement).matches(
              (this.constructor as typeof CDSDropdown).slugItem
            )
          : false
      );

    this._hasSlug = Boolean(hasContent);
    (hasContent[0] as HTMLElement).setAttribute('size', 'mini');
    this.requestUpdate();
  }

  /**
   * Handles user-initiated selection of a dropdown item.
   *
   * @param [item] The dropdown item user wants to select. Absense of this argument means clearing selection.
   */
  protected _handleUserInitiatedSelectItem(item?: CDSDropdownItem) {
    if (item?.hasAttribute('disabled')) {
      return;
    }

    if (this._selectionShouldChange(item)) {
      const init = {
        bubbles: true,
        composed: true,
        detail: {
          item,
        },
      };
      const constructor = this.constructor as typeof CDSDropdown;
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
  protected _handleUserInitiatedToggle(force = !this.open) {
    const { eventBeforeToggle, eventToggle } = this
      .constructor as typeof CDSDropdown;

    const { disabled } = this;
    const init = {
      bubbles: true,
      cancelable: true,
      composed: true,
      detail: {
        open: force,
      },
    };
    if (!disabled) {
      if (this.dispatchEvent(new CustomEvent(eventBeforeToggle, init))) {
        this.open = force;
        if (this.open) {
          this._assistiveStatusText = this.selectingItemsAssistiveText;
        } else {
          const {
            selectedItemAssistiveText,
            label,
            _assistiveStatusText: assistiveStatusText,
            _selectedItemContent: selectedItemContent,
          } = this;
          const selectedItemText =
            (selectedItemContent && selectedItemContent.textContent) || label;
          if (
            selectedItemText &&
            assistiveStatusText !== selectedItemAssistiveText
          ) {
            this._assistiveStatusText = selectedItemText;
          }
          forEach(
            this.querySelectorAll(
              (this.constructor as typeof CDSDropdown).selectorItemHighlighted
            ),
            (item) => {
              (item as CDSDropdownItem).highlighted = false;
            }
          );
        }
        this.requestUpdate();
        this.dispatchEvent(new CustomEvent(eventToggle, init));
      }
    }
  }

  /**
   * Clears the selection of dropdown items.
   */
  protected _clearHighlight() {
    forEach(
      this.querySelectorAll(
        (this.constructor as typeof CDSDropdown).selectorItem
      ),
      (item) => {
        (item as CDSDropdownItem).highlighted = false;
      }
    );
  }

  /**
   * Navigate through dropdown items.
   *
   * @param direction `-1` to navigate backward, `1` to navigate forward.
   */
  protected _navigate(direction: number) {
    const constructor = this.constructor as typeof CDSDropdown;
    const items = this.querySelectorAll(constructor.selectorItem);
    const highlightedItem = this.querySelector(
      constructor.selectorItemHighlighted
    );
    const highlightedIndex = indexOf(items, highlightedItem!);
    let nextIndex = highlightedIndex + direction;

    if (items[nextIndex]?.hasAttribute('disabled')) {
      nextIndex += direction;
    }
    if (nextIndex < 0) {
      nextIndex = items.length - 1;
    }
    if (nextIndex >= items.length) {
      nextIndex = 0;
    }
    forEach(items, (item, i) => {
      (item as CDSDropdownItem).highlighted = i === nextIndex;
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
  protected _renderPrecedingLabel(): TemplateResult | void {
    return undefined;
  }
  /* eslint-enable class-methods-use-this */

  /**
   * @returns The main content of the trigger button.
   */
  protected _renderLabel(): TemplateResult {
    const { label, _selectedItemContent: selectedItemContent } = this;
    return html`
      <span id="trigger-label" class="${prefix}--list-box__label"
        >${selectedItemContent || label}</span
      >
    `;
  }

  /**
   * @returns The title label.
   */
  protected _renderTitleLabel(): TemplateResult {
    const {
      disabled,
      hideLabel,
      titleText,
      _slotTitleTextNode: slotTitleTextNode,
      _handleSlotchangeLabelText: handleSlotchangeLabelText,
    } = this;

    const labelClasses = classMap({
      [`${prefix}--label`]: true,
      [`${prefix}--label--disabled`]: disabled,
      [`${prefix}--visually-hidden`]: hideLabel,
    });

    const hasTitleText =
      titleText ||
      (slotTitleTextNode && slotTitleTextNode.assignedNodes().length > 0);

    return html`
      <label
        part="title-text"
        class="${labelClasses}"
        ?hidden="${!hasTitleText}">
        <slot name="title-text" @slotchange="${handleSlotchangeLabelText}"
          >${titleText}</slot
        >
      </label>
    `;
  }

  /* eslint-disable class-methods-use-this */
  /**
   * @returns The content following the trigger button.
   */
  protected _renderFollowingLabel(): TemplateResult | void {
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
   * 'aria-label' of the ListBox component.
   * Specify a label to be read by screen readers on the container node
   */
  @property({ type: String, reflect: true, attribute: 'aria-label' })
  ariaLabel = '';

  /**
   * Specify the direction of the dropdown. Can be either top or bottom.
   */
  @property({ type: String, reflect: true })
  direction = DROPDOWN_DIRECTION.BOTTOM;

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
   * Specify whether the title text should be hidden or not
   */
  @property({ type: Boolean, reflect: true, attribute: 'hide-label' })
  hideLabel = false;

  /**
   * `true` to show the UI of the invalid state.
   */
  @property({ type: Boolean, reflect: true })
  invalid = false;

  /**
   * Message which is displayed if the value is invalid.
   */
  @property({ attribute: 'invalid-text' })
  invalidText = '';

  /**
   * Provide the title text that will be read by a screen reader when visiting this control
   */
  @property({ attribute: 'title-text' })
  titleText = '';

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
   * Whether or not the Dropdown is readonly
   */
  @property({ type: Boolean, reflect: true, attribute: 'read-only' })
  readOnly = false;

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
  selectingItemsAssistiveText =
    'Selecting items. Use up and down arrow keys to navigate.';

  /**
   * An assistive text for screen reader to announce, telling that an item is selected.
   */
  @property({ attribute: 'selected-item-assistive-text' })
  selectedItemAssistiveText = 'Selected an item.';

  /**
   * Dropdown size.
   */
  @property({ reflect: true })
  size = DROPDOWN_SIZE.MEDIUM;

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
   * Generic label that will be used as the textual representation of what this field is for
   */
  @property({ attribute: 'label' })
  label = '';

  /**
   * `true` if this dropdown should use the inline UI variant.
   */
  @property({ reflect: true })
  type = DROPDOWN_TYPE.DEFAULT;

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

  /**
   * Specify whether the control is currently in warning state
   */
  @property({ type: Boolean, reflect: true })
  warn = false;

  /**
   * Provide the text that is displayed when the control is in warning state
   */
  @property({ attribute: 'warn-text' })
  warnText = '';

  shouldUpdate(changedProperties) {
    const { selectorItem } = this.constructor as typeof CDSDropdown;
    if (changedProperties.has('size')) {
      forEach(this.querySelectorAll(selectorItem), (elem) => {
        (elem as CDSDropdownItem).size = this.size;
      });
    }
    if (changedProperties.has('disabled') && this.disabled) {
      const { disabled } = this;
      // Propagate `disabled` attribute to descendants until `:host-context()` gets supported in all major browsers
      forEach(this.querySelectorAll(selectorItem), (elem) => {
        if (disabled) {
          (elem as CDSDropdownItem).disabled = disabled;
        } else {
          (elem as CDSDropdownItem).removeAttribute('disabled');
        }
      });
    }
    if (changedProperties.has('value')) {
      // `<cds-multi-select>` updates selection beforehand
      // because our rendering logic for `<cds-multi-select>` looks for selected items via `qSA()`
      forEach(this.querySelectorAll(selectorItem), (elem) => {
        (elem as CDSDropdownItem).selected =
          (elem as CDSDropdownItem).value === this.value;
      });
      const item = find(
        this.querySelectorAll(selectorItem),
        (elem) => (elem as CDSDropdownItem).value === this.value
      );
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

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  updated(_changedProperties) {
    this._hasSlug
      ? this.setAttribute('slug', '')
      : this.removeAttribute('slug');

    this.shadowRoot
      ?.querySelector("slot[name='slug']")
      ?.classList.toggle(
        `${prefix}--slug--revert`,
        this.querySelector(`${prefix}-slug`)?.hasAttribute('revert-active')
      );
  }

  /**
   * The CSS class list for dropdown listbox
   */
  protected get _classes() {
    const { disabled, size, type, invalid, open, warn } = this;
    const inline = type === DROPDOWN_TYPE.INLINE;

    const selectedItemsCount = this.querySelectorAll(
      (this.constructor as typeof CDSDropdown).selectorItemSelected
    ).length;

    return classMap({
      [`${prefix}--dropdown`]: true,
      [`${prefix}--list-box`]: true,
      [`${prefix}--list-box--disabled`]: disabled,
      [`${prefix}--list-box--inline`]: inline,
      [`${prefix}--list-box--expanded`]: open,
      [`${prefix}--list-box--${size}`]: size,
      [`${prefix}--dropdown--invalid`]: invalid,
      [`${prefix}--dropdown--warn`]: warn,
      [`${prefix}--dropdown--inline`]: inline,
      [`${prefix}--dropdown--selected`]: selectedItemsCount > 0,
    });
  }

  render() {
    const {
      ariaLabel,
      _classes: classes,
      disabled,
      helperText,
      invalid,
      invalidText,
      open,
      toggleLabelClosed,
      toggleLabelOpen,
      type,
      warn,
      warnText,
      _assistiveStatusText: assistiveStatusText,
      _shouldTriggerBeFocusable: shouldTriggerBeFocusable,
      _handleClickInner: handleClickInner,
      _handleKeydownInner: handleKeydownInner,
      _handleKeypressInner: handleKeypressInner,
      _handleSlotchangeHelperText: handleSlotchangeHelperText,
      _handleSlugSlotChange: handleSlugSlotChange,
      _slotHelperTextNode: slotHelperTextNode,
    } = this;
    const inline = type === DROPDOWN_TYPE.INLINE;

    const helperClasses = classMap({
      [`${prefix}--form__helper-text`]: true,
      [`${prefix}--form__helper-text--disabled`]: disabled,
    });
    const iconContainerClasses = classMap({
      [`${prefix}--list-box__menu-icon`]: true,
      [`${prefix}--list-box__menu-icon--open`]: open,
    });
    const toggleLabel =
      (open ? toggleLabelOpen : toggleLabelClosed) || undefined;
    const hasHelperText =
      helperText ||
      (slotHelperTextNode && slotHelperTextNode.assignedNodes().length > 0);
    const validityIcon = !invalid
      ? undefined
      : WarningFilled16({
          class: `${prefix}--list-box__invalid-icon`,
          'aria-label': toggleLabel,
        });
    const warningIcon =
      !warn || (invalid && warn)
        ? undefined
        : WarningAltFilled16({
            class: `${prefix}--list-box__invalid-icon ${prefix}--list-box__invalid-icon--warning`,
            'aria-label': toggleLabel,
          });
    const helperMessage = invalid ? invalidText : warn ? warnText : helperText;
    const menuBody = !open
      ? undefined
      : html`
          <div
            aria-label="${ariaLabel}"
            id="menu-body"
            part="menu-body"
            class="${prefix}--list-box__menu"
            role="listbox"
            tabindex="-1">
            <slot></slot>
          </div>
        `;
    return html`
      ${this._renderTitleLabel()}
      <div
        role="listbox"
        class="${classes}"
        ?data-invalid=${invalid}
        @click=${handleClickInner}
        @keydown=${handleKeydownInner}
        @keypress=${handleKeypressInner}>
        <div
          part="trigger-button"
          role="${ifDefined(!shouldTriggerBeFocusable ? undefined : 'button')}"
          class="${prefix}--list-box__field"
          tabindex="${ifDefined(!shouldTriggerBeFocusable ? undefined : '0')}"
          aria-labelledby="trigger-label"
          aria-expanded="${String(open)}"
          aria-haspopup="listbox"
          aria-owns="menu-body"
          aria-controls="menu-body">
          ${this._renderPrecedingLabel()}${this._renderLabel()}${validityIcon}${warningIcon}${this._renderFollowingLabel()}
          <div id="trigger-caret" class="${iconContainerClasses}">
            ${ChevronDown16({ 'aria-label': toggleLabel })}
          </div>
        </div>
        <slot name="slug" @slotchange=${handleSlugSlotChange}></slot>
        ${menuBody}
      </div>
      <div
        part="helper-text"
        class="${helperClasses}"
        ?hidden="${(inline && !warn && !invalid) || !hasHelperText}">
        <slot name="helper-text" @slotchange="${handleSlotchangeHelperText}"
          >${helperMessage}</slot
        >
      </div>
      <div
        class="${prefix}--assistive-text"
        role="status"
        aria-live="assertive"
        aria-relevant="additions text">
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

  /**
   * A selector that will return the slug item.
   */
  static get slugItem() {
    return `${prefix}-slug`;
  }

  static shadowRootOptions = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true,
  };
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

export default CDSDropdown;
