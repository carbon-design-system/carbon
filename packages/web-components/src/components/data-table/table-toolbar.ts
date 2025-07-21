/**
 * Copyright IBM Corp. 2019, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';
import { prefix } from '../../globals/settings';
import styles from './data-table.scss?lit';
import { carbonElement as customElement } from '../../globals/decorators/carbon-element';

/**
 * Table toolbar.
 *
 * @element cds-table-toolbar
 */
@customElement(`${prefix}-table-toolbar`)
class CDSTableToolbar extends LitElement {
  /**
   * Toolbar size
   */
  @property({ reflect: true })
  size;

  connectedCallback() {
    if (!this.hasAttribute('role')) {
      this.setAttribute('role', 'toolbar');
    }
    super.connectedCallback();
  }

  updated(changedProperties) {
    if (changedProperties.has('size')) {
      const toolbarContent = this.querySelector(
        (this.constructor as typeof CDSTableToolbar).selectorToolbarContent
      );
      const batchActions = this.querySelector(
        (this.constructor as typeof CDSTableToolbar).selectorBatchActions
      );

      if (toolbarContent) {
        toolbarContent.setAttribute('size', this.size);
      }

      if (batchActions) {
        batchActions.setAttribute('size', this.size);
      }
    }
  }

  render() {
    return html` <slot></slot> `;
  }

  /**
   * The CSS selector to find the toolbar contents
   */
  static get selectorToolbarContent() {
    return `${prefix}-table-toolbar-content`;
  }

  /**
   * The CSS selector to find the batch actions
   */
  static get selectorBatchActions() {
    return `${prefix}-table-batch-actions`;
  }

  static styles = styles;
}

export default CDSTableToolbar;
