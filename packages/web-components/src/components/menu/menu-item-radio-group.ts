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
import { carbonElement as customElement } from '../../globals/decorators/carbon-element';
import { consume } from '@lit/context';
import { MenuContext } from './menu-context';

/**
 * Menu Item.
 *
 * @element cds-menu-item-radio-group
 */
@customElement(`${prefix}-menu-item-radio-group`)
class CDSmenuItemRadioGroup extends LitElement {
  @consume({ context: MenuContext })
  context;

  /**
   * Label for the menu item radio group.
   */
  @property({ type: String })
  label;
  /**
   * List of items in the radio group.
   */
  @property({ type: Array })
  items = [];

  /**
   * Selected item in the radio group.
   */
  @property({ type: String, attribute: true })
  selectedItem;

  /**
   * List of items in the radio group.
   */
  @property()
  itemToString?: (item: Array<String | number>) => String;
  /**
   * The name of the custom event fired when the selection state changes.
   */
  static get eventOnChange() {
    return `${prefix}-item-changed`;
  }

  firstUpdated(): void {
    this.context.updateFromChild({ hasSelectableItems: true });

    this.addEventListener(`click`, (e) => {
      this.selectedItem = e.target;
      const init = {
        bubbles: true,
        cancelable: true,
        composed: true,
        detail: {
          triggeredBy: e.target,
        },
      };
      if (
        this.dispatchEvent(
          new CustomEvent(
            (this.constructor as typeof CDSmenuItemRadioGroup).eventOnChange,
            init
          )
        )
      ) {
        this.dispatchEvent(
          new CustomEvent(
            (this.constructor as typeof CDSmenuItemRadioGroup).eventOnChange,
            init
          )
        );
      }
    });
  }

  protected updated(_changedProperties): void {
    if (_changedProperties.has('selectedItem')) {
      this.querySelectorAll(`${prefix}-menu-item`).forEach((item) => {
        if (item === this.selectedItem) {
          item.setAttribute('aria-checked', 'true');
        } else {
          item.setAttribute('aria-checked', 'false');
        }
      });
    }
  }

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
export default CDSmenuItemRadioGroup;
