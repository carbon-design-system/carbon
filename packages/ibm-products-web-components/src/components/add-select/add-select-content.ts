/**
 * @license
 *
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement, html } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { carbonElement as customElement } from '@carbon/web-components/es/globals/decorators/carbon-element.js';
import { prefix } from '../../globals/settings';
import styles from './add-select-content.scss?lit';

const blockClass = `${prefix}--add-select__next-list`;

/**
 * Add Select Content component - contains the list of selectable items
 * @element c4p-add-select-content
 * @slot default - Contains c4p-add-select-row components
 */
@customElement(`${prefix}-add-select-content`)
class CDSAddSelectContent extends LitElement {
  /**
   * Whether this is a multi-select list (inherited from parent c4p-add-select)
   * @private
   */
  private get _multi(): boolean {
    const parent = this.closest(`${prefix}-add-select`) as any;
    return parent?.multi ?? false;
  }

  /**
   * Current focused item index
   */
  private _focusedIndex = 0;

  /**
   * Track if user has interacted with keyboard navigation
   */
  private _hasKeyboardInteraction = false;

  /**
   * Get all item elements
   */
  private _getItems(): HTMLElement[] {
    const slot = this.shadowRoot?.querySelector('slot');
    if (!slot) {
      return [];
    }

    const assignedElements = slot.assignedElements({ flatten: true });
    return assignedElements.filter(
      (el) => el.tagName.toLowerCase() === `${prefix}-add-select-row`
    ) as HTMLElement[];
  }

  /**
   * Update focus on items - only one item should have tabindex="0"
   */
  private _updateItemFocus(focusIndex: number, shouldFocus = true) {
    const items = this._getItems();
    if (items.length === 0) {
      return;
    }

    // Ensure focusIndex is within bounds
    this._focusedIndex = Math.max(0, Math.min(focusIndex, items.length - 1));

    items.forEach((item, index) => {
      if (index === this._focusedIndex) {
        item.setAttribute('tabindex', '0');
        if (shouldFocus) {
          item.focus();
        }
      } else {
        item.setAttribute('tabindex', '-1');
      }
    });
  }

  /**
   * Handle keyboard navigation
   */
  private _handleKeyDown(event: KeyboardEvent) {
    const items = this._getItems();
    if (items.length === 0) {
      return;
    }

    // Mark that keyboard interaction has occurred
    this._hasKeyboardInteraction = true;

    const currentItem = items[this._focusedIndex];
    let handled = false;

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        this._updateItemFocus(this._focusedIndex + 1);
        handled = true;
        break;

      case 'ArrowUp':
        event.preventDefault();
        this._updateItemFocus(this._focusedIndex - 1);
        handled = true;
        break;

      case 'ArrowRight':
        // Check if current item has children
        if (currentItem && currentItem.hasAttribute('has-children')) {
          event.preventDefault();
          // Trigger the item's navigate event
          const navigateEvent = new CustomEvent('c4p-add-select-row-navigate', {
            bubbles: true,
            composed: true,
            detail: {
              itemId: currentItem.getAttribute('item-id'),
              title: currentItem.getAttribute('title'),
              parentId: currentItem.getAttribute('parent-id') || '',
            },
          });
          currentItem.dispatchEvent(navigateEvent);
          handled = true;
        }
        break;

      case 'Enter':
      case ' ':
        event.preventDefault();
        // Trigger the item's selection
        if (currentItem) {
          const isSelected = currentItem.hasAttribute('selected');
          const newSelected = !isSelected;

          // Update the item's selected attribute
          if (newSelected) {
            currentItem.setAttribute('selected', '');
          } else {
            currentItem.removeAttribute('selected');
          }

          // Dispatch selection event
          const selectEvent = new CustomEvent('c4p-add-select-row-select', {
            bubbles: true,
            composed: true,
            detail: {
              itemId: currentItem.getAttribute('item-id'),
              selected: newSelected,
              value: currentItem.getAttribute('value'),
            },
          });
          currentItem.dispatchEvent(selectEvent);
        }
        handled = true;
        break;

      case 'Home':
        if (event.ctrlKey) {
          event.preventDefault();
          this._updateItemFocus(0);
          handled = true;
        }
        break;

      case 'End':
        if (event.ctrlKey) {
          event.preventDefault();
          this._updateItemFocus(items.length - 1);
          handled = true;
        }
        break;
    }

    if (handled) {
      event.stopPropagation();
    }
  }

  /**
   * Initialize focus management after first update
   */
  firstUpdated() {
    // Set initial tabindex but don't focus
    this._updateItemFocus(0, false);
  }

  /**
   * Handle slot change to update focus management
   */
  private _handleSlotChange() {
    // Ensure focus is maintained when items change
    const items = this._getItems();
    if (items.length > 0) {
      // Reset to first item if current index is out of bounds
      if (this._focusedIndex >= items.length) {
        this._focusedIndex = 0;
      }
      // Re-apply focus management to new items, but only actually focus if keyboard interaction occurred
      this._updateItemFocus(this._focusedIndex, this._hasKeyboardInteraction);
    }
  }

  /**
   * Update lifecycle - ensure focus is maintained when items change
   */
  updated(changedProperties: Map<string, any>) {
    super.updated(changedProperties);

    // Re-initialize focus when items might have changed
    const items = this._getItems();
    if (items.length > 0) {
      // Ensure at least one item has tabindex="0"
      const hasFocusableItem = items.some(
        (item) => item.getAttribute('tabindex') === '0'
      );
      if (!hasFocusableItem) {
        // Set tabindex but don't focus unless keyboard interaction occurred
        this._updateItemFocus(0, this._hasKeyboardInteraction);
      }
    }
  }

  render() {
    const {
      _handleKeyDown: handleKeyDown,
      _handleSlotChange: handleSlotChange,
    } = this;

    const listClasses = classMap({
      [`${blockClass}-list`]: true,
    });

    return html`
      <div
        class=${listClasses}
        role="grid"
        aria-multiselectable=${this._multi}
        tabindex="0"
        @keydown=${handleKeyDown}
      >
        <div class="${blockClass}-list-body">
          <slot @slotchange=${handleSlotChange}></slot>
        </div>
      </div>
    `;
  }

  static styles = styles;
}

export default CDSAddSelectContent;
