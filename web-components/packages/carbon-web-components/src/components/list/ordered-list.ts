/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { classMap } from 'lit/directives/class-map.js';
import { html } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import { prefix } from '../../globals/settings';
import BXUnorderedList from './unordered-list';

/**
 * Ordered list.
 */
@customElement(`${prefix}-ordered-list`)
class BXOrderedList extends BXUnorderedList {
  /**
   * Specify whether the ordered list should use native list styles instead of
   * custom counter
   */
  @property({ type: Boolean, reflect: true })
  native = false;

  render() {
    const classes = classMap({
      [`${prefix}--list--ordered`]: !this.native,
      [`${prefix}--list--ordered--native`]: this.native,
      [`${prefix}--list--nested`]: this.getAttribute('slot') === 'nested',
      [`${prefix}--list--expressive`]: this.isExpressive,
    });
    return html`
      <ol class="${classes}">
        <slot></slot>
      </ol>
    `;
  }
}

export default BXOrderedList;
