/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement, html } from 'lit';
import { property, query } from 'lit/decorators.js';
import { prefix } from '../../globals/settings';
import CDSTableRow from './table-row';
import styles from './data-table.scss';
import { carbonElement as customElement } from '../../globals/decorators/carbon-element';

/**
 * Data table body.
 *
 * @element cds-table-body
 */
@customElement(`${prefix}-table-body`)
class CDSTableBody extends LitElement {
  /**
   * The `<slot>` element in the shadow DOM.
   */
  @query('slot')
  private _slotNode!: HTMLSlotElement;

  /**
   * Updates `even`/`odd` properties of the child `<cds-table-row>`s.
   */
  private _updateZebra() {
    const { useZebraStyles, _slotNode: slotNode } = this;
    slotNode.assignedNodes().forEach((node) => {
      if (node.nodeType === Node.ELEMENT_NODE) {
        const even = (node as HTMLElement).matches('*:nth-of-type(even)');
        (node as CDSTableRow).even = useZebraStyles && even;
        (node as CDSTableRow).odd = useZebraStyles && !even;
      }
    });
  }

  /**
   * Handles `slotchange` event in the `<slot>` element in the shadow DOM.
   */
  private _handleSlotChange = () => {
    this._updateZebra();
  };

  /**
   * TODO: Uncomment when Carbon fully implements sticky header
   * Specify whether the header should be sticky.
   * Still experimental: may not work with every combination of table props
   */
  // @property({ type: Boolean, reflect: true, attribute: 'sticky-header' })
  // stickyHeader = false;

  /**
   * The color scheme.
   */
  @property({ type: Boolean, reflect: true, attribute: 'use-zebra-styles' })
  useZebraStyles = false;

  connectedCallback() {
    if (!this.hasAttribute('role')) {
      this.setAttribute('role', 'rowgroup');
    }
    super.connectedCallback();
  }

  updated(changedProperties) {
    if (changedProperties.has('useZebraStyles')) {
      this._updateZebra();
    }
  }

  render() {
    const { _handleSlotChange: handleSlotChange } = this;
    return html` <slot @slotchange="${handleSlotChange}"></slot> `;
  }

  static styles = styles;
}

export default CDSTableBody;
