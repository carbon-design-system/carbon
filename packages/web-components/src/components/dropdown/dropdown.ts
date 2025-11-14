/**
 * Copyright IBM Corp. 2019, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { LitElement, html, TemplateResult } from 'lit';
import { property, query, state } from 'lit/decorators.js';
import { prefix } from '../../globals/settings';
import { iconLoader } from '../../globals/internal/icon-loader';
import WarningFilled16 from '@carbon/icons/es/warning--filled/16.js';
import WarningAltFilled16 from '@carbon/icons/es/warning--alt--filled/16.js';
import ChevronDown16 from '@carbon/icons/es/chevron--down/16.js';
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
import styles from './dropdown.scss?lit';
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
   * `true` if there is an AI Label.
   */
  protected _hasAILabel = false;

  /**
   * Currently slotted AI decorator nodes (`cds-ai-label`/slug) with listeners attached.
   */
  private _aiDecoratorNodes: HTMLElement[] = [];

  /**
   * Handles interaction on an AI decorator while the menu is open.
   */
  private _handleAIDecoratorInteraction = () => {
    if (!this.open) {
      return;
    }

    this._handleUserInitiatedToggle(false);
  };

  @state()
  protected _activeDescendant?: string;

  /**
   * The content of the selected item.
   */
  protected _selectedItemContent: DocumentFragment | null = null;

  /**
   * `true` if the trigger button should be focusable.
   * Derived class can set `false` to this if the trigger button contains another primary focusable element (e.g. `input`).
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
    const constructor = this.constructor as typeof CDSDropdown;
    if (itemToSelect) {
      this.value = itemToSelect.value;
      this._activeDescendant = itemToSelect.id;
      forEach(
        this.querySelectorAll(constructor.selectorItemSelected),
        (item) => {
          (item as CDSDropdownItem).selected = false;
          item.setAttribute('aria-selected', 'false');
        }
      );
      itemToSelect.selected = true;
      itemToSelect.setAttribute('aria-selected', 'true');
      this._updateSelectedNextSibling(itemToSelect);
    } else {
      this._updateSelectedNextSibling();
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

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20452
    if (this.shadowRoot!.contains(event.target as Node)) {
      const opening = !this.open;
      const constructor = this.constructor as typeof CDSDropdown;
      const selectedItem = this.querySelector(
        constructor.selectorItemSelected
      ) as CDSDropdownItem | null;
      if (opening) {
        const shouldFocusMenu = Boolean(selectedItem);
        this._handleUserInitiatedToggle(true, {
          focusMenu: shouldFocusMenu,
          highlightSelectedOnOpen: shouldFocusMenu,
        });
      } else {
        this._handleUserInitiatedToggle(false, {
          restoreTriggerFocus: true,
        });
      }
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
    if (this._handleMenuInputKeydown(event)) {
      return;
    }

    const { key } = event;
    const action = (this.constructor as typeof CDSDropdown).getAction(key);
    if (!this.open) {
      switch (action) {
        case DROPDOWN_KEYBOARD_ACTION.NAVIGATING: {
          const shouldKeepInputFocus = this._shouldRetainMenuInputFocus(event);
          const menuInputNode = this._menuInputNode;
          if (this.readOnly) {
            event.preventDefault();
            return;
          }
          const direction =
            NAVIGATION_DIRECTION[key as keyof typeof NAVIGATION_DIRECTION];

          event.preventDefault();
          if (direction === -1) {
            break;
          }
          const constructor = this.constructor as typeof CDSDropdown;
          const selectedItem = this.querySelector(
            constructor.selectorItemSelected
          ) as CDSDropdownItem | null;
          const shouldHighlightSelected = Boolean(selectedItem);

          this._handleUserInitiatedToggle(true, {
            focusMenu: false,
            highlightSelectedOnOpen: shouldHighlightSelected,
          });

          this.updateComplete.then(() => {
            const constructor = this.constructor as typeof CDSDropdown;
            const items = this.querySelectorAll(constructor.selectorItem);
            if (items.length > 0) {
              const selectedItem = this.querySelector(
                constructor.selectorItemSelected
              ) as CDSDropdownItem | null;

              const firstEnabledItem = Array.from(items).find(
                (item) => !(item as CDSDropdownItem).hasAttribute('disabled')
              ) as CDSDropdownItem | undefined;

              const initialItem =
                selectedItem && !selectedItem.hasAttribute('disabled')
                  ? selectedItem
                  : (firstEnabledItem ?? null);

              if (initialItem) {
                this._setHighlightedItem(initialItem, { scrollIntoView: true });
              } else {
                this._clearHighlight();
              }

              const menu = this.shadowRoot?.getElementById('menu-body');
              if (shouldKeepInputFocus && menuInputNode) {
                menuInputNode.focus({ preventScroll: true });
              } else if (menu) {
                menu.focus();
              }
            }
          });
          break;
        }
        default:
          break;
      }
    } else {
      switch (action) {
        case DROPDOWN_KEYBOARD_ACTION.CLOSING:
          this._handleUserInitiatedToggle(false, {
            restoreTriggerFocus: true,
          });
          break;
        case DROPDOWN_KEYBOARD_ACTION.NAVIGATING: {
          event.preventDefault();
          const menu = this.shadowRoot?.getElementById('menu-body');
          const menuInputNode = this._menuInputNode;
          const shouldKeepInputFocus = this._shouldRetainMenuInputFocus(event);
          if (shouldKeepInputFocus && menuInputNode) {
            menuInputNode.focus({ preventScroll: true });
          } else if (menu) {
            menu.focus();
          }
          this._navigate(NAVIGATION_DIRECTION[key]);
          break;
        }
        default:
          break;
      }
    }
  }

  private _handleMenuInputKeydown(event: KeyboardEvent) {
    if (
      event.defaultPrevented ||
      !this._supportsMenuInputFiltering ||
      !this._menuInputNode
    ) {
      return false;
    }

    const input = this._menuInputNode;
    if (!input) {
      return false;
    }
    const isInputTarget = event.target === input;

    const hasFilterValue = Boolean(input.value || this.value);
    if (
      event.key === 'Escape' &&
      hasFilterValue &&
      this._shouldClearMenuInputOnEscape({
        event,
        menuOpen: this.open,
        isInputTarget,
      })
    ) {
      event.preventDefault();
      this._clearMenuInputFiltering();
      return true;
    }

    if (!this.open || isInputTarget) {
      return false;
    }

    if (this._shouldForwardKeyToMenuInput(event)) {
      event.preventDefault();
      this._forwardKeyToMenuInput(event, input);
      return true;
    }

    return false;
  }

  protected _shouldClearMenuInputOnEscape({
    menuOpen,
  }: {
    event: KeyboardEvent;
    menuOpen: boolean;
    isInputTarget: boolean;
  }) {
    return menuOpen;
  }

  protected get _supportsMenuInputFiltering() {
    return false;
  }

  protected get _menuInputNode(): HTMLInputElement | null {
    return null;
  }

  protected _clearMenuInputFiltering() {}

  private _shouldForwardKeyToMenuInput(event: KeyboardEvent) {
    if (event.altKey || event.metaKey || event.ctrlKey) {
      return false;
    }
    const { key } = event;
    if (key === 'Backspace' || key === 'Delete') {
      return true;
    }
    return key.length === 1;
  }

  private _forwardKeyToMenuInput(
    event: KeyboardEvent,
    input: HTMLInputElement
  ) {
    input.focus({ preventScroll: true });
    const key = event.key;
    const selectionStart = input.selectionStart ?? input.value.length;
    const selectionEnd = input.selectionEnd ?? input.value.length;
    if (key === 'Backspace') {
      if (selectionStart === 0 && selectionEnd === 0) {
        return;
      }
      const start =
        selectionStart === selectionEnd
          ? Math.max(0, selectionStart - 1)
          : selectionStart;
      input.setRangeText('', start, selectionEnd, 'end');
    } else if (key === 'Delete') {
      if (
        selectionStart === input.value.length &&
        selectionStart === selectionEnd
      ) {
        return;
      }
      const end =
        selectionStart === selectionEnd
          ? Math.min(input.value.length, selectionEnd + 1)
          : selectionEnd;
      input.setRangeText('', selectionStart, end, 'end');
    } else if (key.length === 1) {
      input.setRangeText(key, selectionStart, selectionEnd, 'end');
    }
    input.dispatchEvent(new Event('input', { bubbles: true, composed: true }));
  }

  private _shouldRetainMenuInputFocus(event: Event) {
    if (!this._supportsMenuInputFiltering || !this._menuInputNode) {
      return false;
    }
    if (event.target === this._menuInputNode) {
      return true;
    }
    const path =
      typeof event.composedPath === 'function' ? event.composedPath() : [];
    return path.includes(this._menuInputNode);
  }

  /**
   * Handles keypress events (Space, Enter)
   */
  protected _handleKeypressInner(event: KeyboardEvent) {
    const { key } = event;
    const action = (this.constructor as typeof CDSDropdown).getAction(key);
    // When closed
    if (!this.open) {
      if (this.readOnly && action === DROPDOWN_KEYBOARD_ACTION.TRIGGERING) {
        if (key === ' ' || key === 'Space') {
          event.preventDefault();
        }
        return;
      }
      switch (action) {
        case DROPDOWN_KEYBOARD_ACTION.TRIGGERING: {
          if (key === ' ' || key === 'Space') {
            event.preventDefault();
          }

          const constructor = this.constructor as typeof CDSDropdown;
          const selectedItem = this.querySelector(
            constructor.selectorItemSelected
          ) as CDSDropdownItem | null;
          const shouldFocusMenu = Boolean(selectedItem);

          this._handleUserInitiatedToggle(true, {
            focusMenu: shouldFocusMenu,
            highlightSelectedOnOpen: shouldFocusMenu,
          });
          break;
        }
        default:
          break;
      }
    } else {
      // When open
      switch (action) {
        case DROPDOWN_KEYBOARD_ACTION.TRIGGERING: {
          const constructor = this.constructor as typeof CDSDropdown;
          const selectedItem = this.querySelector(
            constructor.selectorItemSelected
          ) as CDSDropdownItem | null;
          const highlightedItem = this.querySelector(
            constructor.selectorItemHighlighted
          ) as CDSDropdownItem;
          if (highlightedItem) {
            this._handleUserInitiatedSelectItem(highlightedItem);
          } else if (selectedItem) {
            this._handleUserInitiatedSelectItem(selectedItem);
          } else {
            this._handleUserInitiatedToggle(false, {
              restoreTriggerFocus: true,
            });
          }
          break;
        }
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

  protected _handleMouseoverInner(event: MouseEvent) {
    if (!this.open) {
      return;
    }

    const item = this._getDropdownItemFromEvent(event);
    if (!item) {
      return;
    }

    if (item.hasAttribute('disabled')) {
      this._clearHighlight();
      return;
    }

    this._setHighlightedItem(item);
  }

  protected _handleMouseleaveInner(event: MouseEvent) {
    if (!this.open) {
      return;
    }

    const menu = this.shadowRoot?.getElementById('menu-body');
    const relatedTarget = event.relatedTarget as Node | null;
    if (menu && relatedTarget && menu.contains(relatedTarget)) {
      return;
    }

    const shadowActiveElement = this.shadowRoot?.activeElement;
    if (menu && shadowActiveElement && menu.contains(shadowActiveElement)) {
      return;
    }

    if (
      this._supportsMenuInputFiltering &&
      this._menuInputNode &&
      this.shadowRoot?.activeElement === this._menuInputNode
    ) {
      return;
    }

    this._clearHighlight();
  }

  @HostListener('focusout')
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment -- https://github.com/carbon-design-system/carbon/issues/20452
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
  protected _handleAILabelSlotChange({ target }: Event) {
    const decoratorNodes = (target as HTMLSlotElement)
      .assignedNodes()
      .filter((elem) =>
        (elem as HTMLElement).matches !== undefined
          ? (elem as HTMLElement).matches(
              (this.constructor as typeof CDSDropdown).aiLabelItem
            ) ||
            // remove reference to slug in v12
            (elem as HTMLElement).matches(
              (this.constructor as typeof CDSDropdown).slugItem
            )
          : false
      );

    const decoratorElements = decoratorNodes.filter(
      (node): node is HTMLElement => node instanceof HTMLElement
    );

    this._updateAIDecoratorListeners(decoratorElements);

    this._hasAILabel = Boolean(decoratorElements.length);
    decoratorElements[0]?.setAttribute('size', 'mini');
    this.requestUpdate();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._updateAIDecoratorListeners([]);
  }

  /**
   * Updates listeners for AI decorator nodes to ensure only one menu stays open.
   */
  private _updateAIDecoratorListeners(nodes: HTMLElement[]) {
    this._aiDecoratorNodes.forEach((node) => {
      node.removeEventListener('click', this._handleAIDecoratorInteraction);
    });

    this._aiDecoratorNodes = nodes;

    this._aiDecoratorNodes.forEach((node) => {
      node.addEventListener('click', this._handleAIDecoratorInteraction);
    });
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

    const shouldClose = this._shouldCloseAfterSelection(item);

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
        if (shouldClose) {
          this._handleUserInitiatedToggle(false, {
            restoreTriggerFocus: true,
          });
        }
      }
    } else if (item && shouldClose) {
      this._handleUserInitiatedToggle(false, {
        restoreTriggerFocus: true,
      });
    }
  }

  // Default dropdowns close after user selection.
  // eslint-disable-next-line @typescript-eslint/no-unused-vars -- https://github.com/carbon-design-system/carbon/issues/20452
  protected _shouldCloseAfterSelection(_item?: CDSDropdownItem) {
    return true;
  }

  /**
   * Handles user-initiated toggling the open state.
   *
   * @param [force] If specified, forces the open state to the given one.
   */
  protected _handleUserInitiatedToggle(
    force = !this.open,
    {
      restoreTriggerFocus = false,
      focusMenu = true,
      highlightSelectedOnOpen = false,
    }: {
      restoreTriggerFocus?: boolean;
      focusMenu?: boolean;
      highlightSelectedOnOpen?: boolean;
    } = {}
  ) {
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
          const activeElement = this.shadowRoot?.activeElement;
          const preserveFocusTarget =
            activeElement instanceof HTMLInputElement ? activeElement : null;
          this.updateComplete.then(() => {
            if (preserveFocusTarget) {
              preserveFocusTarget.focus();
            } else if (focusMenu) {
              const menu = this.shadowRoot?.getElementById('menu-body');
              menu?.focus();
            } else if (this._shouldTriggerBeFocusable) {
              const trigger = this.shadowRoot?.getElementById('trigger-button');
              trigger?.focus();
            }

            if (highlightSelectedOnOpen) {
              this._highlightSelectedItem();
            }
          });
        } else if (restoreTriggerFocus && this._shouldTriggerBeFocusable) {
          this.updateComplete.then(() => {
            const trigger = this.shadowRoot?.getElementById('trigger-button');
            trigger?.focus();
          });
        }

        if (!this.open) {
          this._clearHighlight();
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
    this._setHighlightedItem();
  }

  protected _getDropdownItemFromEvent(event: Event): CDSDropdownItem | null {
    const constructor = this.constructor as typeof CDSDropdown;
    const selector = constructor.selectorItem;
    const path = event.composedPath();

    for (const node of path) {
      if (
        node instanceof Element &&
        typeof node.matches === 'function' &&
        node.matches(selector)
      ) {
        return node as CDSDropdownItem;
      }
    }

    return null;
  }

  protected _setHighlightedItem(
    item?: CDSDropdownItem | null,
    { scrollIntoView = false }: { scrollIntoView?: boolean } = {}
  ) {
    const constructor = this.constructor as typeof CDSDropdown;
    const items = this.querySelectorAll(constructor.selectorItem);
    const target =
      item && !item.hasAttribute('disabled') ? (item as CDSDropdownItem) : null;

    forEach(items, (listItem) => {
      const dropdownItem = listItem as CDSDropdownItem;
      dropdownItem.highlighted = dropdownItem === target;
      dropdownItem.removeAttribute('highlighted-next-sibling');
    });

    if (target) {
      const nextSibling = this._getNextDropdownItem(target);
      if (nextSibling) {
        nextSibling.setAttribute('highlighted-next-sibling', '');
      }

      const itemId = target.id;
      if (itemId) {
        this._activeDescendant = itemId;
      }

      if (scrollIntoView) {
        target.scrollIntoView({ block: 'nearest' });
      }
    } else {
      this._activeDescendant = undefined;
    }
  }

  protected _getNextDropdownItem(
    item: CDSDropdownItem
  ): CDSDropdownItem | null {
    const constructor = this.constructor as typeof CDSDropdown;
    const selector = constructor.selectorItem;
    let next = item.nextElementSibling as Element | null;

    while (next) {
      if (typeof next.matches === 'function' && next.matches(selector)) {
        return next as CDSDropdownItem;
      }
      next = next.nextElementSibling as Element | null;
    }

    return null;
  }

  protected _updateSelectedNextSibling(item?: CDSDropdownItem | null): void {
    const constructor = this.constructor as typeof CDSDropdown;
    forEach(this.querySelectorAll(constructor.selectorItem), (listItem) => {
      (listItem as CDSDropdownItem).removeAttribute('selected-next-sibling');
    });

    if (item) {
      const nextSibling = this._getNextDropdownItem(item);
      if (nextSibling) {
        nextSibling.setAttribute('selected-next-sibling', '');
      }
    }
  }

  protected _highlightSelectedItem() {
    const constructor = this.constructor as typeof CDSDropdown;
    const selectedItem = this.querySelector(
      constructor.selectorItemSelected
    ) as CDSDropdownItem | null;

    if (selectedItem && !selectedItem.hasAttribute('disabled')) {
      this._setHighlightedItem(selectedItem, { scrollIntoView: true });
    } else {
      this._clearHighlight();
    }
  }

  protected _navigate(direction: number) {
    const constructor = this.constructor as typeof CDSDropdown;
    const items = this.querySelectorAll(constructor.selectorItem);
    if (!items.length) {
      return;
    }
    const highlightedItem = this.querySelector(
      constructor.selectorItemHighlighted
    );
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20452
    const highlightedIndex = indexOf(items, highlightedItem!);
    let nextIndex =
      highlightedIndex === -1
        ? direction > 0
          ? 0
          : items.length - 1
        : highlightedIndex + direction;

    while (
      nextIndex >= 0 &&
      nextIndex < items.length &&
      items[nextIndex]?.hasAttribute('disabled')
    ) {
      nextIndex += direction;
    }
    if (nextIndex < 0 || nextIndex >= items.length) {
      return;
    }

    const nextItem = items[nextIndex] as CDSDropdownItem;
    this._setHighlightedItem(nextItem, { scrollIntoView: true });
  }

  /**
   * @returns The content preceding the trigger button.
   */
  // eslint-disable-next-line   @typescript-eslint/no-invalid-void-type -- https://github.com/carbon-design-system/carbon/issues/20452
  protected _renderPrecedingLabel(): TemplateResult | void {
    return undefined;
  }

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
        id="dropdown-label"
        part="title-text"
        class="${labelClasses}"
        for="trigger-button"
        ?hidden="${!hasTitleText}">
        <slot name="title-text" @slotchange="${handleSlotchangeLabelText}"
          >${titleText}</slot
        >
      </label>
    `;
  }

  /**
   * @returns The content following the trigger button.
   */
  // eslint-disable-next-line   @typescript-eslint/no-invalid-void-type -- https://github.com/carbon-design-system/carbon/issues/20452
  protected _renderFollowingLabel(): TemplateResult | void {
    return undefined;
  }

  /**
   * Handles event to include selected value on the parent form.
   *
   * @param event The event.
   */
  _handleFormdata(event: FormDataEvent) {
    const { formData } = event;
    const { disabled, name, value } = this;
    if (!disabled) {
      formData.append(name, value);
    }
  }

  /**
   * 'aria-label' of the ListBox component.
   * Specify a label to be read by screen readers on the container node
   */
  @property({ type: String, attribute: 'aria-label' })
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

  /**
   * The computed aria-label for the toggle button based on open state.
   */
  get toggleLabel(): string {
    return (this.open ? this.toggleLabelOpen : this.toggleLabelClosed) || '';
  }

  shouldUpdate(changedProperties) {
    const { selectorItem } = this.constructor as typeof CDSDropdown;
    if (changedProperties.has('size')) {
      forEach(this.querySelectorAll(selectorItem), (elem) => {
        (elem as CDSDropdownItem).size = this.size;
      });
    }
    if (changedProperties.has('disabled')) {
      const { disabled } = this;
      // Propagate `disabled` attribute to descendants until `:host-context()` gets supported in all major browsers
      forEach(this.querySelectorAll(selectorItem), (elem) => {
        const item = elem as CDSDropdownItem;
        if (disabled) {
          if (!item.disabled) {
            item.setAttribute('parent-disabled', '');
          }
          item.disabled = true;
        } else if (item.hasAttribute('parent-disabled')) {
          item.removeAttribute('parent-disabled');
          item.disabled = false;
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
      const selectedItem = find(
        this.querySelectorAll(selectorItem),
        (elem) => (elem as CDSDropdownItem).value === this.value
      ) as CDSDropdownItem | undefined;
      if (selectedItem) {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20452
        const range = this.ownerDocument!.createRange();
        range.selectNodeContents(selectedItem);
        this._selectedItemContent = range.cloneContents();
      } else {
        this._selectedItemContent = null;
      }
      this._updateSelectedNextSibling(selectedItem);
    }
    return true;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  updated(_changedProperties) {
    // eslint-disable-next-line  @typescript-eslint/no-unused-expressions -- https://github.com/carbon-design-system/carbon/issues/20452
    this._hasAILabel
      ? this.setAttribute('ai-label', '')
      : this.removeAttribute('ai-label');

    const label = this.shadowRoot?.querySelector("slot[name='ai-label']");
    if (label) {
      label?.classList.toggle(
        `${prefix}--slug--revert`,
        this.querySelector(`${prefix}-ai-label`)?.hasAttribute('revert-active')
      );
    } else {
      this.shadowRoot
        ?.querySelector("slot[name='slug']")
        ?.classList.toggle(
          `${prefix}--slug--revert`,
          this.querySelector(`${prefix}-slug`)?.hasAttribute('revert-active')
        );
    }
  }

  /**
   * Normalizes validation props based on disabled and readOnly states
   */
  protected get _normalizedProps() {
    const { disabled, readOnly, invalid, warn } = this;
    return {
      disabled: !readOnly && disabled,
      invalid: !readOnly && !disabled && invalid,
      warn: !readOnly && !invalid && !disabled && warn,
    };
  }

  /**
   * The CSS class list for dropdown listbox
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- https://github.com/carbon-design-system/carbon/issues/20452
  protected get _classes(): any {
    const { size, type, open } = this;
    const inline = type === DROPDOWN_TYPE.INLINE;
    const normalizedProps = this._normalizedProps;

    const selectedItemsCount = this.querySelectorAll(
      (this.constructor as typeof CDSDropdown).selectorItemSelected
    ).length;

    return classMap({
      [`${prefix}--dropdown`]: true,
      [`${prefix}--list-box`]: true,
      [`${prefix}--list-box--disabled`]: normalizedProps.disabled,
      [`${prefix}--list-box--inline`]: inline,
      [`${prefix}--list-box--expanded`]: open,
      [`${prefix}--list-box--${size}`]: size,
      [`${prefix}--dropdown--invalid`]: normalizedProps.invalid,
      [`${prefix}--dropdown--warn`]: normalizedProps.warn,
      [`${prefix}--dropdown--inline`]: inline,
      [`${prefix}--dropdown--selected`]: selectedItemsCount > 0,
      [`${prefix}--list-box__wrapper--decorator`]: this._hasAILabel,
    });
  }

  render() {
    const {
      ariaLabel,
      _classes: classes,
      helperText,
      invalidText,
      open,
      toggleLabelClosed,
      toggleLabelOpen,
      type,
      warn,
      warnText,
      _activeDescendant: activeDescendant,
      _shouldTriggerBeFocusable: shouldTriggerBeFocusable,
      _handleClickInner: handleClickInner,
      _handleKeydownInner: handleKeydownInner,
      _handleKeypressInner: handleKeypressInner,
      _handleMouseleaveInner: handleMouseleaveInner,
      _handleMouseoverInner: handleMouseoverInner,
      _handleSlotchangeHelperText: handleSlotchangeHelperText,
      _handleAILabelSlotChange: handleAILabelSlotChange,
      _slotHelperTextNode: slotHelperTextNode,
    } = this;
    const inline = type === DROPDOWN_TYPE.INLINE;
    const normalizedProps = this._normalizedProps;

    let activeDescendantFallback: string | undefined;
    if (open && !activeDescendant) {
      const constructor = this.constructor as typeof CDSDropdown;
      const items = this.querySelectorAll(constructor.selectorItem);
      activeDescendantFallback = items[0]?.id;
    }

    const helperClasses = classMap({
      [`${prefix}--form__helper-text`]: true,
      [`${prefix}--form__helper-text--disabled`]: normalizedProps.disabled,
    });
    const iconContainerClasses = classMap({
      [`${prefix}--list-box__menu-icon`]: true,
      [`${prefix}--list-box__menu-icon--open`]: open,
    });
    const toggleLabel = (open ? toggleLabelOpen : toggleLabelClosed) || '';
    const hasHelperText =
      helperText ||
      invalidText ||
      warnText ||
      (slotHelperTextNode && slotHelperTextNode.assignedNodes().length > 0);
    const validityIcon = !normalizedProps.invalid
      ? undefined
      : iconLoader(WarningFilled16, {
          class: `${prefix}--list-box__invalid-icon`,
          'aria-label': toggleLabel,
        });
    const warningIcon = !normalizedProps.warn
      ? undefined
      : iconLoader(WarningAltFilled16, {
          class: `${prefix}--list-box__invalid-icon ${prefix}--list-box__invalid-icon--warning`,
          'aria-label': toggleLabel,
        });
    const helperMessage = normalizedProps.invalid
      ? invalidText
      : normalizedProps.warn
        ? warnText
        : helperText;
    const menuBody = html`
      <div
        aria-labelledby="${ifDefined(ariaLabel ? undefined : 'dropdown-label')}"
        aria-label="${ifDefined(ariaLabel ? ariaLabel : undefined)}"
        id="menu-body"
        part="menu-body"
        class="${prefix}--list-box__menu"
        role="listbox"
        tabindex="-1"
        ?hidden=${!open}
        @mouseover=${handleMouseoverInner}
        @mouseleave=${handleMouseleaveInner}>
        <slot></slot>
      </div>
    `;
    return html`
      ${this._renderTitleLabel()}
      <div
        class="${classes}"
        ?data-invalid=${normalizedProps.invalid}
        @click=${handleClickInner}
        @keydown=${handleKeydownInner}
        @keypress=${handleKeypressInner}>
        ${validityIcon}${warningIcon}
        <div
          id="${ifDefined(
            !shouldTriggerBeFocusable ? undefined : 'trigger-button'
          )}"
          class="${prefix}--list-box__field"
          part="trigger-button"
          tabindex="${ifDefined(!shouldTriggerBeFocusable ? undefined : '0')}"
          role="${ifDefined(
            !shouldTriggerBeFocusable ? undefined : 'combobox'
          )}"
          aria-label="${ifDefined(ariaLabel ? ariaLabel : undefined)}"
          aria-labelledby="${ifDefined(
            !shouldTriggerBeFocusable ? undefined : 'dropdown-label'
          )}"
          aria-expanded="${ifDefined(
            !shouldTriggerBeFocusable ? undefined : String(open)
          )}"
          aria-haspopup="${ifDefined(
            !shouldTriggerBeFocusable ? undefined : 'listbox'
          )}"
          aria-controls="${ifDefined(
            !shouldTriggerBeFocusable ? undefined : 'menu-body'
          )}"
          aria-activedescendant="${ifDefined(
            !shouldTriggerBeFocusable
              ? undefined
              : open
                ? (activeDescendant ?? activeDescendantFallback)
                : ''
          )}">
          ${this._renderPrecedingLabel()}${this._renderLabel()}${this._renderFollowingLabel()}
          <div id="trigger-caret" class="${iconContainerClasses}">
            ${iconLoader(ChevronDown16, { 'aria-label': toggleLabel })}
          </div>
        </div>
        <slot name="ai-label" @slotchange=${handleAILabelSlotChange}></slot>
        <slot name="slug" @slotchange=${handleAILabelSlotChange}></slot>
        ${menuBody}
      </div>
      <div
        part="helper-text"
        class="${helperClasses}"
        ?hidden="${(inline && !warn && !normalizedProps.invalid) ||
        !hasHelperText}">
        <slot name="helper-text" @slotchange="${handleSlotchangeHelperText}"
          >${helperMessage}</slot
        >
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
