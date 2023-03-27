/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, property, LitElement } from 'lit-element';
import settings from 'carbon-components/es/globals/js/settings';
import styles from './list.scss';
import { carbonElement as customElement } from '../../globals/decorators/carbon-element';

const { prefix } = settings;

/**
 * List item.
 *
 * @element bx-list-item
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
   * `<bx-ordered-list>` or `<bx-unordered-list>` automatically sets this property.
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
