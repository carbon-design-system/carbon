/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement, html } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import { prefix } from '../../globals/settings';
import styles from './list.scss';

/**
 * List item.
 *
 * @element cds-list-item
 * @slot nested - The nested child list.
 */
@customElement(`${prefix}-list-item`)
class BXListItem extends LitElement {
  /**
   * `true` if there is slotted nested child list.
   */
  private _hasNestedChild = false;

  /**
   * Handles `slotchange` event for the `<slot>` for the nested child list.
   *
   * @param event The event.
   */
  private _handleSlotChangeNested({ target }: Event) {
    this._hasNestedChild =
      (target as HTMLSlotElement).assignedNodes().length > 0;
    this.requestUpdate();
  }

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
        this.closest((this.constructor as typeof BXListItem).selectorNestedList)
      )
    );
    if (!this.hasAttribute('role')) {
      this.setAttribute('role', 'listitem');
    }
    super.connectedCallback();
  }

  render() {
    const {
      _hasNestedChild: hasNestedChild,
      _handleSlotChangeNested: handleSlotChangeNested,
    } = this;
    return html`
      <slot></slot>
      <div
        ?hidden="${!hasNestedChild}"
        class="${prefix}-ce--list__item__nested-child">
        <slot name="nested" @slotchange="${handleSlotChangeNested}"></slot>
      </div>
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

export default BXListItem;
