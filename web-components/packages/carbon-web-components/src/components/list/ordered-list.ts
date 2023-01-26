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
import { customElement } from 'lit/decorators.js';
import settings from 'carbon-components/es/globals/js/settings';
import BXUnorderedList from './unordered-list';

const { prefix } = settings;

/**
 * Ordered list.
 */
@customElement(`${prefix}-ordered-list`)
class BXOrderedList extends BXUnorderedList {
  render() {
    const classes = classMap({
      [`${prefix}--list--ordered`]: true,
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
