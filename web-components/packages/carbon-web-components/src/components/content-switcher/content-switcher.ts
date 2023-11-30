/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';
import { prefix } from '../../globals/settings';
import { forEach, indexOf } from '../../globals/internal/collection-helpers';
import { NAVIGATION_DIRECTION, CONTENT_SWITCHER_SIZE } from './defs';
import CDSContentSwitcherItem from './content-switcher-item';
import styles from './content-switcher.scss';
import { carbonElement as customElement } from '../../globals/decorators/carbon-element';

export { NAVIGATION_DIRECTION, CONTENT_SWITCHER_SIZE };

/**
 * @param index The index
 * @param length The length of the array.
 * @returns The new index, adjusting overflow/underflow.
 */
const capIndex = (index: number, length: number) => {
  if (index < 0) {
    return length - 1;
  }
  if (index >= length) {
    return 0;
  }
  return index;
};

/**
 * Content switcher.
 *
 * @element cds-content-switcher
 * @fires cds-content-switcher-beingselected
 *   The custom event fired before a content switcher item is selected upon a user gesture.
 *   Cancellation of this event stops changing the user-initiated selection.
 * @fires cds-content-switcher-selected - The custom event fired after a a content switcher item is selected upon a user gesture.
 */
@customElement(`${prefix}-content-switcher`)
export default class CDSContentSwitcher extends LitElement {
  /**
   * Handles `mouseover`/`mouseout` events on `<slot>`.
   *
   * @param event The event.
   */
  private _handleHover({ target, type }: MouseEvent) {
    const { selectorItem } = this.constructor as typeof CDSContentSwitcher;
    const items = this.querySelectorAll(selectorItem);
    const index =
      type !== 'mouseover'
        ? -1
        : indexOf(items, (target as Element).closest(selectorItem)!);
    const nextIndex = index < 0 ? index : index + 1;
    forEach(this.querySelectorAll(selectorItem), (elem, i) => {
      // Specifies child `<cds-content-switcher-item>` to hide its divider instead of using CSS,
      // until `:host-context()` gets supported in all major browsers
      (elem as CDSContentSwitcherItem).hideDivider = i === nextIndex;
    });

    const { selectorItemSelected } = this
      .constructor as typeof CDSContentSwitcher;
    const selectedItem = this.querySelector(selectorItemSelected);
    const nextItem = this._getNextItem(
      selectedItem as CDSContentSwitcherItem,
      1
    );
    (nextItem as CDSContentSwitcherItem).hideDivider = true;
  }

  /**
   * @param currentItem The currently selected item.
   * @param direction The navigation direction.
   * @returns The item to be selected.
   */
  protected _getNextItem(
    currentItem: CDSContentSwitcherItem,
    direction: number
  ) {
    const items = this.querySelectorAll(
      (this.constructor as typeof CDSContentSwitcher).selectorItemEnabled
    );
    const currentIndex = indexOf(items, currentItem);
    const nextIndex = capIndex(currentIndex + direction, items.length);
    return nextIndex === currentIndex ? null : items[nextIndex];
  }

  /**
   * Handles `click` event on the top-level element in the shadow DOM.
   *
   * @param event The event.
   */
  protected _handleClick({ target }: MouseEvent) {
    this._handleUserInitiatedSelectItem(target as CDSContentSwitcherItem);
  }

  /**
   * Handles `keydown` event on the top-level element in the shadow DOM.
   *
   * @param event The event.
   */
  protected _handleKeydown({ key }: KeyboardEvent) {
    if (key in NAVIGATION_DIRECTION) {
      this._navigate(NAVIGATION_DIRECTION[key]);
    }
  }

  /**
   * Handles user-initiated selection of a content switcher item.
   *
   * @param [item] The content switcher item user wants to select.
   */
  protected _handleUserInitiatedSelectItem(item: CDSContentSwitcherItem) {
    if (!item.disabled && item.value !== this.value) {
      const init = {
        bubbles: true,
        composed: true,
        detail: {
          item,
        },
      };
      const constructor = this.constructor as typeof CDSContentSwitcher;
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
   * Navigates through content switcher items.
   *
   * @param direction `-1` to navigate backward, `1` to navigate forward.
   */
  protected _navigate(direction: number) {
    const { selectorItemSelected } = this
      .constructor as typeof CDSContentSwitcher;
    const nextItem = this._getNextItem(
      this.querySelector(selectorItemSelected) as CDSContentSwitcherItem,
      direction
    );
    if (nextItem) {
      this._handleUserInitiatedSelectItem(nextItem as CDSContentSwitcherItem);
      this.requestUpdate();
    }
  }

  /**
   * A callback that runs after change in content switcher selection upon user interaction is confirmed.
   *
   * @param itemToSelect A content switcher item.
   */
  protected _selectionDidChange(itemToSelect: CDSContentSwitcherItem) {
    this.value = itemToSelect.value;
    forEach(
      this.querySelectorAll(
        (this.constructor as typeof CDSContentSwitcher).selectorItemSelected
      ),
      (item) => {
        (item as CDSContentSwitcherItem).selected = false;
      }
    );
    itemToSelect.selected = true;
    // Waits for rendering with the new state that updates `tabindex`
    Promise.resolve().then(() => {
      itemToSelect.focus();

      const { selectorItem } = this.constructor as typeof CDSContentSwitcher;
      const items = this.querySelectorAll(selectorItem);
      const index = indexOf(
        items,
        (itemToSelect as Element).closest(selectorItem)!
      );
      const nextIndex = index < 0 ? index : index + 1;
      forEach(this.querySelectorAll(selectorItem), (elem, i) => {
        // Specifies child `<cds-content-switcher-item>` to hide its divider instead of using CSS,
        // until `:host-context()` gets supported in all major browsers
        (elem as CDSContentSwitcherItem).hideDivider = i === nextIndex;
      });
    });
  }

  /**
   * The value of the selected item.
   */
  @property({ reflect: true })
  value = '';

  /**
   * Content switcher size.
   */
  @property({ reflect: true })
  size = CONTENT_SWITCHER_SIZE.REGULAR;

  /**
   * Icon only.
   */
  @property({ type: Boolean, reflect: true, attribute: 'icon' })
  iconOnly = false;

  shouldUpdate(changedProperties) {
    if (changedProperties.has('value')) {
      const { selectorItem } = this.constructor as typeof CDSContentSwitcher;
      forEach(this.querySelectorAll(selectorItem), (elem) => {
        (elem as CDSContentSwitcherItem).selected =
          (elem as CDSContentSwitcherItem).value === this.value;
      });
    }
    const { selectorIconItem } = this.constructor as typeof CDSContentSwitcher;
    if (this.querySelector(selectorIconItem)) {
      this.iconOnly = true;
    }
    return true;
  }

  _handleSlotchange() {
    const { selectorItemSelected } = this
      .constructor as typeof CDSContentSwitcher;
    const selectedItem = this.querySelector(selectorItemSelected);
    const nextItem = this._getNextItem(
      selectedItem as CDSContentSwitcherItem,
      1
    );

    // Specifies child `<cds-content-switcher-item>` to hide its divider instead of using CSS,
    // until `:host-context()` gets supported in all major browsers
    (nextItem as CDSContentSwitcherItem).hideDivider = true;
  }

  /**
   * A selector that will return content switcher items.
   */
  static get selectorItem() {
    return `${prefix}-content-switcher-item`;
  }

  /**
   * A selector that will return content switcher icon items.
   */
  static get selectorIconItem() {
    return `${prefix}-content-switcher-item[icon]`;
  }

  /**
   * A selector that will return enabled content switcher items.
   */
  static get selectorItemEnabled() {
    return `${prefix}-content-switcher-item:not([disabled])`;
  }

  /**
   * A selector that will return selected items.
   */
  static get selectorItemSelected() {
    return `${prefix}-content-switcher-item[selected]`;
  }

  /**
   * The name of the custom event fired before a content switcher item is selected upon a user gesture.
   * Cancellation of this event stops changing the user-initiated selection.
   */
  static get eventBeforeSelect() {
    return `${prefix}-content-switcher-beingselected`;
  }

  /**
   * The name of the custom event fired after a a content switcher item is selected upon a user gesture.
   */
  static get eventSelect() {
    return `${prefix}-content-switcher-selected`;
  }

  render() {
    const {
      _handleHover: handleHover,
      _handleKeydown: handleKeydown,
      _handleSlotchange: handleSlotchange,
    } = this;
    return html`
      <slot
        @click="${this._handleClick}"
        @keydown="${handleKeydown}"
        @mouseover="${handleHover}"
        @mouseout="${handleHover}"
        @slotchange=${handleSlotchange}></slot>
    `;
  }

  static styles = styles;
}
