/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { prefix } from '../../globals/settings';
import { carbonElement as customElement } from '../../globals/decorators/carbon-element';
import styles from './contained-list.scss?lit';

/**
 * Contained list kinds
 */
export const CONTAINED_LIST_KIND = {
  ON_PAGE: 'on-page',
  DISCLOSED: 'disclosed',
} as const;

/**
 * Contained list sizes
 */
export const CONTAINED_LIST_SIZE = {
  SMALL: 'sm',
  MEDIUM: 'md',
  LARGE: 'lg',
  EXTRA_LARGE: 'xl',
} as const;

/**
 * Contained list component
 *
 * @element cds-contained-list
 * @slot - The default slot for contained list items
 * @slot action - The slot for action elements (buttons, search)
 * @slot label - The slot for complex label content (overrides label property)
 */
@customElement(`${prefix}-contained-list`)
class CDSContainedList extends LitElement {
  /**
   * A label describing the contained list
   */
  @property({ type: String })
  label = '';

  /**
   * The kind of contained list to display
   */
  @property({ type: String, reflect: true })
  kind: 'on-page' | 'disclosed' = CONTAINED_LIST_KIND.ON_PAGE;

  /**
   * Specify the size of the contained list
   */
  @property({ type: String, reflect: true })
  size?: 'sm' | 'md' | 'lg' | 'xl';

  /**
   * Specify whether the dividing lines between list items should be inset
   */
  @property({ type: Boolean, reflect: true, attribute: 'is-inset' })
  isInset = false;

  /**
   * Internal generated ID for aria-labelledby
   */
  private _labelId = `${prefix}--contained-list-${Math.random().toString(36).slice(2, 11)}`;

  /**
   * Check if action slot contains expandable search
   */
  private _isActionExpandableSearch(): boolean {
    const actionSlot = this.shadowRoot?.querySelector(
      'slot[name="action"]'
    ) as HTMLSlotElement;
    if (!actionSlot) return false;

    const assignedElements = actionSlot.assignedElements();
    return assignedElements.some((el) => {
      const tagName = el.tagName.toLowerCase();
      return tagName === `${prefix}-search` && el.hasAttribute('expandable');
    });
  }

  /**
   * Filter out Search from default slot if action has expandable Search
   */
  private _filterChildren(e: Event) {
    const slot = e.target as HTMLSlotElement;
    if (slot.name !== '') return; // Only process default slot

    if (this._isActionExpandableSearch()) {
      const assignedNodes = slot.assignedNodes({ flatten: true });
      assignedNodes.forEach((node) => {
        if (node.nodeType === Node.ELEMENT_NODE) {
          const el = node as Element;
          const tagName = el.tagName.toLowerCase();
          if (tagName === `${prefix}-search`) {
            (el as HTMLElement).style.display = 'none';
          } else {
            (el as HTMLElement).style.display = '';
          }
        }
      });
    }
  }

  render() {
    const classes = classMap({
      [`${prefix}--contained-list`]: true,
      [`${prefix}--contained-list--inset-rulers`]: this.isInset,
      [`${prefix}--contained-list--${this.size}`]: !!this.size,
      [`${prefix}--layout--size-${this.size}`]: !!this.size,
      [`${prefix}--contained-list--${this.kind}`]: true,
    });

    const hasLabel = this.label || this.querySelector('[slot="label"]');

    return html`
      <div class="${classes}">
        ${hasLabel
          ? html`
              <div class="${prefix}--contained-list__header">
                <div
                  id="${this._labelId}"
                  class="${prefix}--contained-list__label">
                  <slot name="label">${this.label}</slot>
                </div>
                <div class="${prefix}--contained-list__action">
                  <slot name="action"></slot>
                </div>
              </div>
            `
          : ''}
        <ul
          role="list"
          aria-labelledby="${hasLabel ? this._labelId : undefined}">
          <slot @slotchange="${this._filterChildren}"></slot>
        </ul>
      </div>
    `;
  }

  static styles = styles;
}

export default CDSContainedList;
