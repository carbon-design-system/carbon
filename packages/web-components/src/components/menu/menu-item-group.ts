/**
 * Copyright IBM Corp. 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';
import { prefix } from '../../globals/settings';
import styles from './menu-item.scss?lit';
/**
 * Menu Item.
 *
 * @element cds-menu-item-group
 */
class CDSmenuItemGroup extends LitElement {
  static is = `${prefix}-menu-item-group`;

  /**
   * Label for the menu item.
   */
  @property({ type: String })
  label;

  render() {
    const { label } = this;
    return html`
      <ul role="group" aria-label="${label}">
        <slot></slot>
      </ul>
    `;
  }
  static styles = styles;
}
export default CDSmenuItemGroup;
