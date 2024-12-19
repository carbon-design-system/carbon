/**
 * @license
 *
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
 * Table toolbar content.
 *
 * @element cds-table-toolbar-content
 */
@customElement(`${prefix}-table-toolbar-content`)
class CDSTableToolbarContent extends LitElement {
  /**
   * `true` if this batch actions bar is active.
   */
  @property({ type: Boolean, reflect: true, attribute: 'has-batch-actions' })
  hasBatchActions = false;

  /**
   * Table toolbar contents size
   */
  @property({ reflect: true })
  size;

  updated(changedProperties) {
    if (changedProperties.has('hasBatchActions')) {
      this.setAttribute('tabindex', `${this.hasBatchActions ? '-1' : ''}`);
    }

    if (changedProperties.has('size')) {
      [...this.children].forEach((e) => {
        const size =
          this.size === 'xs'
            ? 'sm'
            : this.size === 'md' || this.size === 'xl'
            ? 'lg'
            : this.size;
        e.setAttribute('size', size);
      });
    }
  }

  render() {
    return html` <slot></slot> `;
  }

  static styles = styles;
}

export default CDSTableToolbarContent;
