/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { classMap } from 'lit-html/directives/class-map';
import { html, property, query, customElement } from 'lit-element';
import ChevronDown16 from '@carbon/icons/lib/chevron--down/16';
import settings from 'carbon-components/es/globals/js/settings';
import HostListenerMixin from '../../globals/mixins/host-listener';
import HostListener from '../../globals/decorators/host-listener';
import { find, forEach } from '../../globals/internal/collection-helpers';
import BXContentSwitcher, { NAVIGATION_DIRECTION } from '../content-switcher/content-switcher';
import { NAVIGATION_DIRECTION_NARROW, TABS_COLOR_SCHEME, TABS_KEYBOARD_ACTION, TABS_TYPE } from './defs';
import BXTab from './tab';
import styles from './tabs.scss';

const { prefix } = settings;

export { NAVIGATION_DIRECTION, NAVIGATION_DIRECTION_NARROW, TABS_COLOR_SCHEME, TABS_KEYBOARD_ACTION, TABS_TYPE };

/**
 * Tabs.
 *
 * @element bx-tabs
 * @fires bx-tabs-beingselected
 *   The custom event fired before a tab is selected upon a user gesture.
 *   Cancellation of this event stops changing the user-initiated selection.
 * @fires bx-tabs-selected - The custom event fired after a a tab is selected upon a user gesture.
 */
@customElement(`${prefix}-tabs`)
class BXTabs extends HostListenerMixin(BXContentSwitcher) {
  /**
   * The latest status of this dropdown, for screen reader to accounce.
   */
  private _assistiveStatusText?: string;

  /**
   * `true` if the narrow mode dropdown should be open.
   */
  private _open = false;

  /**
   * The content of the selected item, used in the narrow mode.
   */
  private _selectedItemContent: DocumentFragment | null = null;

  /**
   * The DOM element for the trigger button in narrow mode.
   */
  @query('#trigger')
  private _triggerNode!: HTMLDivElement;

  /**
   * Handles `focus` event handler on this element.
   */
  @HostListener('focusin')
  // @ts-ignore: The decorator refers to this method but TS thinks this method is not referred to
  private _handleFocusIn() {
    const { selectorItem } = this.constructor as typeof BXTabs;
    forEach(this.querySelectorAll(selectorItem), (item) => {
      (item as BXTab).inFocus = true;
    });
  }

  /**
   * Handles `blur` event handler on this element.
   *
   * @param event The event.
   */
  @HostListener('focusout')
  // @ts-ignore: The decorator refers to this method but TS thinks this method is not referred to
  private _handleFocusOut({ relatedTarget }: FocusEvent) {
    if (!this.contains(relatedTarget as Node)) {
      const { selectorItem } = this.constructor as typeof BXTabs;
      forEach(this.querySelectorAll(selectorItem), (item) => {
        (item as BXTab).inFocus = false;
      });
      this._handleUserInitiatedToggle(false);
    }
  }

  /**
   * Handles user-initiated toggling the open state.
   *
   * @param [force] If specified, forces the open state to the given one.
   */
  private _handleUserInitiatedToggle(force: boolean = !this._open) {
    this._open = force;
    if (this._open) {
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
    }
    this.requestUpdate();
  }

  /**
   * Clears the selection of tabs.
   */
  private _clearHighlight() {
    forEach(this.querySelectorAll((this.constructor as typeof BXTabs).selectorItem), (item) => {
      (item as BXTab).highlighted = false;
    });
  }

  /**
   * Navigates through tabs.
   *
   * @param direction `-1` to navigate backward, `1` to navigate forward.
   * @param [options] The options.
   * @param [options.immediate]
   *   `true` to make it "immediate selection change" mode, which does:
   *
   *   * Starts with the selected item
   *   * Going prev/next item immediately changes the selection
   */
  protected _navigate(direction: number, { immediate }: { immediate?: boolean } = {}) {
    const { selectorItem, selectorItemHighlighted, selectorItemSelected } = this.constructor as typeof BXTabs;
    const nextItem = this._getNextItem(
      this.querySelector(immediate ? selectorItemSelected : selectorItemHighlighted) as BXTab,
      direction
    );
    if (!nextItem) {
      return;
    }

    if (immediate) {
      this._handleUserInitiatedSelectItem(nextItem as BXTab);
    } else {
      forEach(this.querySelectorAll(selectorItem), (item) => {
        (item as BXTab)[immediate ? 'selected' : 'highlighted'] = nextItem === item;
      });
    }

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

  @HostListener('click')
  protected _handleClick(event: MouseEvent) {
    const { target } = event;
    if (this === target) {
      this._handleUserInitiatedToggle();
    } else if ((target as BXTab).value === this.value) {
      // Clicking on selected item, simply closes the narrow mode dropdown
      this._handleUserInitiatedToggle(false);
    } else {
      // Trying to select the item
      // If the custom event of the selection is canceled, we don't close the narrow mode dropdown
      super._handleClick(event);
    }
  }

  @HostListener('keydown')
  protected _handleKeydown({ key }: KeyboardEvent) {
    const { _open: open, _triggerNode: triggerNode } = this;
    const narrowMode = Boolean(triggerNode.offsetParent);
    const action = (this.constructor as typeof BXTabs).getAction(key, { narrowMode });
    if (!open && narrowMode) {
      // Menu closed in narrow mode
      switch (action) {
        case TABS_KEYBOARD_ACTION.NAVIGATING:
          this._handleUserInitiatedToggle(true);
          // If this menu gets open with an arrow key, resets the highlight
          this._clearHighlight();
          break;
        case TABS_KEYBOARD_ACTION.TRIGGERING:
          this._handleUserInitiatedToggle(true);
          break;
        default:
          break;
      }
    } else {
      switch (action) {
        case TABS_KEYBOARD_ACTION.CLOSING:
          this._handleUserInitiatedToggle(false);
          break;
        case TABS_KEYBOARD_ACTION.NAVIGATING:
          {
            const direction = narrowMode ? NAVIGATION_DIRECTION_NARROW[key] : NAVIGATION_DIRECTION[key];
            if (direction) {
              this._navigate(direction, { immediate: !narrowMode });
            }
          }
          break;
        case TABS_KEYBOARD_ACTION.TRIGGERING:
          {
            const { selectorItemHighlighted } = this.constructor as typeof BXTabs;
            const highlightedItem = this.querySelector(selectorItemHighlighted) as BXTab;
            if (highlightedItem) {
              if (highlightedItem.value === this.value) {
                // Selecting an already-selected item, simply closes the narrow mode dropdown
                this._handleUserInitiatedToggle(false);
              } else {
                // Trying to select the item
                // If the custom event of the selection is canceled, we don't close the narrow mode dropdown
                this._handleUserInitiatedSelectItem(highlightedItem);
              }
            } else {
              this._handleUserInitiatedToggle();
            }
          }
          break;
        default:
          break;
      }
    }
  }

  protected _selectionDidChange(itemToSelect: BXTab) {
    super._selectionDidChange(itemToSelect);
    this._assistiveStatusText = this.selectedItemAssistiveText;
    this._handleUserInitiatedToggle(false);
  }

  /**
   * The color scheme.
   */
  @property({ attribute: 'color-scheme', reflect: true })
  colorScheme = TABS_COLOR_SCHEME.REGULAR;

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
   * The content of the trigger button for narrow mode.
   */
  @property({ attribute: 'trigger-content' })
  triggerContent = '';

  /**
   * Tabs type.
   */
  @property({ reflect: true })
  type = TABS_TYPE.REGULAR;

  shouldUpdate(changedProperties) {
    super.shouldUpdate(changedProperties);
    const { selectorItem } = this.constructor as typeof BXTabs;
    if (changedProperties.has('type')) {
      forEach(this.querySelectorAll(selectorItem), (elem) => {
        (elem as BXTab).type = this.type;
      });
    }
    if (changedProperties.has('value')) {
      const item = find(this.querySelectorAll(selectorItem), (elem) => (elem as BXTab).value === this.value);
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

  render() {
    const {
      triggerContent,
      _assistiveStatusText: assistiveStatusText,
      _open: open,
      _selectedItemContent: selectedItemContent,
    } = this;
    const triggerClasses = classMap({
      [`${prefix}--tabs-trigger`]: true,
      [`${prefix}--tabs-trigger--open`]: open,
    });
    const listClasses = classMap({
      [`${prefix}--tabs__nav`]: true,
      [`${prefix}--tabs__nav--hidden`]: !open,
    });
    return html`
      <div
        id="trigger"
        role="button"
        class="${triggerClasses}"
        aria-labelledby="trigger-label"
        aria-expanded="${String(open)}"
        aria-haspopup="listbox"
        aria-owns="tablist"
        aria-controls="tablist"
      >
        <span id="trigger-label" class="${prefix}--tabs-trigger-text"> ${selectedItemContent || triggerContent} </span>
        ${ChevronDown16({ 'aria-hidden': 'true' })}
      </div>
      <ul id="tablist" role="tablist" class="${listClasses}">
        <slot></slot>
      </ul>
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
   * A selector that will return tabs.
   */
  static get selectorItem() {
    return `${prefix}-tab`;
  }

  /**
   * A selector that will return enabled tabs.
   */
  static get selectorItemEnabled() {
    return `${prefix}-tab:not([disabled])`;
  }

  /**
   * A selector that will return highlighted tabs.
   */
  static get selectorItemHighlighted() {
    return `${prefix}-tab[highlighted]`;
  }

  /**
   * A selector that will return selected tabs.
   */
  static get selectorItemSelected() {
    return `${prefix}-tab[selected]`;
  }

  /**
   * The name of the custom event fired before a tab is selected upon a user gesture.
   * Cancellation of this event stops changing the user-initiated selection.
   */
  static get eventBeforeSelect() {
    return `${prefix}-tabs-beingselected`;
  }

  /**
   * The name of the custom event fired after a a tab is selected upon a user gesture.
   */
  static get eventSelect() {
    return `${prefix}-tabs-selected`;
  }

  static styles = styles;

  /**
   * @param key The key symbol.
   * @param [options] The options.
   * @param [options.narrowMode] `true` to get the action for narrow mode.
   * @returns A action for dropdown for the given key symbol.
   */
  static getAction(key: string, { narrowMode }: { narrowMode?: boolean }) {
    if (key === 'Escape') {
      return TABS_KEYBOARD_ACTION.CLOSING;
    }
    if (key in (narrowMode ? NAVIGATION_DIRECTION_NARROW : NAVIGATION_DIRECTION)) {
      return TABS_KEYBOARD_ACTION.NAVIGATING;
    }
    if (narrowMode && this.TRIGGER_KEYS.has(key)) {
      return TABS_KEYBOARD_ACTION.TRIGGERING;
    }
    return TABS_KEYBOARD_ACTION.NONE;
  }
}

export default BXTabs;
