/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';
import { prefix } from '../../globals/settings';
import styles from './list.scss?lit';
import { carbonElement as customElement } from '../../globals/decorators/carbon-element';

/**
 * List item.
 *
 * @element cds-list-item
 * @slot nested - The nested child list.
 */
@customElement(`${prefix}-list-item`)
class CDSListItem extends LitElement {
  /**
   * `true` if this list item is a child of a nested list.
   * `<cds-ordered-list>` or `<cds-unordered-list>` automatically sets this property.
   */
  @property({ type: Boolean, reflect: true })
  nested = false;

  connectedCallback() {
    // Uses attribute for lookup from child
    this.toggleAttribute(
      'nested',
      Boolean(
        this.closest(
          (this.constructor as typeof CDSListItem).selectorNestedList
        )
      )
    );
    if (!this.hasAttribute('role')) {
      this.setAttribute('role', 'listitem');
    }
    super.connectedCallback();
  }

  render() {
    return html`
      <slot></slot>
      <slot name="nested"></slot>
    `;
  }

  /**
   * A selector that will return nested list.
   */
  static get selectorNestedList() {
    return `${prefix}-ordered-list[slot="nested"],${prefix}-unordered-list[slot="nested"]`;
  }

  static styles = styles;
}

export default CDSListItem;
