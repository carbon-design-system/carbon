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
import { property } from 'lit/decorators.js';
import { prefix } from '../../globals/settings';
import styles from './list.scss?lit';
import { carbonElement as customElement } from '../../globals/decorators/carbon-element';

/**
 * Unordered list.
 *
 * @element cds-unordered-list
 */
@customElement(`${prefix}-unordered-list`)
class CDSUnorderedList extends LitElement {
  /**
   * Specify whether this ordered list is expressive or not
   */
  @property({ type: Boolean, reflect: true, attribute: 'is-expressive' })
  isExpressive = false;

  /**
   * Specify whether the list is nested, or not
   */
  @property({ type: Boolean, reflect: true })
  nested = false;

  connectedCallback() {
    // Auto-detect nesting if 'nested' attribute isn't explicitly set
    if (!this.hasAttribute('nested')) {
      // Check if this list is inside a list item
      if (
        this.closest(
          (this.constructor as typeof CDSUnorderedList).selectorListItem
        )
      ) {
        this.nested = true;
        this.setAttribute('slot', 'nested');
      } else {
        this.nested = false;
        this.removeAttribute('slot');
      }
    } else if (this.nested) {
      this.setAttribute('slot', 'nested');
    } else {
      this.removeAttribute('slot');
    }
    super.connectedCallback();
  }

  render() {
    const classes = classMap({
      [`${prefix}--list--unordered`]: true,
      [`${prefix}--list--nested`]: this.nested,
      [`${prefix}--list--expressive`]: this.isExpressive,
    });
    return html`
      <ul class="${classes}">
        <slot></slot>
      </ul>
    `;
  }

  /**
   * A selector that will return list item.
   */
  static get selectorListItem() {
    return `${prefix}-list-item`;
  }

  static styles = styles;
}

export default CDSUnorderedList;
