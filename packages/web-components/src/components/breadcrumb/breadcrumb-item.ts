/**
 * Copyright IBM Corp. 2019, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement, html } from 'lit';
import { prefix } from '../../globals/settings';
import styles from './breadcrumb.scss?lit';
import { carbonElement as customElement } from '../../globals/decorators/carbon-element';
import type CDSOverflowMenuBody from '../overflow-menu/overflow-menu-body';
/**
 * Breadcrumb item.
 *
 * @element cds-breadcrumb-item
 */
@customElement(`${prefix}-breadcrumb-item`)
class CDSBreadcrumbItem extends LitElement {
  /**
   * Handles `slotchange` event.
   */
  private _handleSlotChange({ target }: Event) {
    const items = (target as HTMLSlotElement)
      .assignedNodes()
      .filter(
        (node) =>
          node.nodeType === Node.ELEMENT_NODE &&
          (node as Element).tagName.toLowerCase() === `${prefix}-overflow-menu`
      );

    items.forEach((item) => {
      if (this.getAttribute('size')) {
        (item as HTMLElement).setAttribute(
          'breadcrumb-size',
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- https://github.com/carbon-design-system/carbon/issues/20452
          this.getAttribute('size')!
        );
      }

      const overflowMenuBody = (item as HTMLElement).querySelector(
        `${prefix}-overflow-menu-body`
      ) as CDSOverflowMenuBody;

      if (overflowMenuBody) {
        overflowMenuBody.menuOffset = { top: 10, left: 59 };
      }
    });
  }

  connectedCallback() {
    if (!this.hasAttribute('role')) {
      this.setAttribute('role', 'listitem');
    }
    super.connectedCallback();
  }

  render() {
    return html` <slot @slotchange=${this._handleSlotChange}></slot> `;
  }

  static styles = styles;
}

export default CDSBreadcrumbItem;
