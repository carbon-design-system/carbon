/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { prefix } from '../../globals/settings';
import styles from './data-table.scss';
import { CDSTableToolbarContent } from '../..';

/**
 * Table toolbar.
 *
 * @element cds-table-toolbar
 */
@customElement(`${prefix}-table-toolbar`)
class CDSTableToolbar extends LitElement {
  /**
   * Boolean to reflect the overflow menu body
   */
  @property({ type: Boolean, reflect: true })
  flipped = true;

  /**
   * Toolbar size
   */
  @property({ reflect: true })
  size;

  connectedCallback() {
    if (!this.hasAttribute('role')) {
      this.setAttribute('role', 'section');
    }
    super.connectedCallback();
  }

  updated(changedProperties) {
    if (changedProperties.has('flipped')) {
      this.querySelector(
        (this.constructor as typeof CDSTableToolbar).selectorOverflowMenuBody
      )?.setAttribute('flipped', '');
    }

    if (changedProperties.has('size')) {
      (
        this.querySelector(
          (this.constructor as typeof CDSTableToolbar).selectorToolbarContent
        ) as CDSTableToolbarContent
      ).size = this.size;
    }
  }

  render() {
    return html` <slot></slot> `;
  }

  /**
   * The CSS selector to find the overflow menu body
   */
  static get selectorOverflowMenuBody() {
    return `${prefix}-overflow-menu-body`;
  }

  /**
   * The CSS selector to find the toolbar contents
   */
  static get selectorToolbarContent() {
    return `${prefix}-table-toolbar-content`;
  }

  static styles = styles;
}

export default CDSTableToolbar;
