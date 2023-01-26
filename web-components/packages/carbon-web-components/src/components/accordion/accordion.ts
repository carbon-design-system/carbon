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
import settings from 'carbon-components/es/globals/js/settings';
import { forEach } from '../../globals/internal/collection-helpers';
import { ACCORDION_SIZE } from './defs';
import styles from './accordion.scss';

export { ACCORDION_SIZE };

const { prefix } = settings;

/**
 * Accordion container.
 *
 * @element bx-accordion
 */
@customElement(`${prefix}-accordion`)
class BXAccordion extends LitElement {
  /**
   * Accordion size.
   */
  @property({ reflect: true })
  size = ACCORDION_SIZE.REGULAR;

  connectedCallback() {
    if (!this.hasAttribute('role')) {
      this.setAttribute('role', 'list');
    }
    super.connectedCallback();
  }

  updated(changedProperties) {
    if (changedProperties.has('size')) {
      // Propagate `size` attribute to descendants until `:host-context()` gets supported in all major browsers
      forEach(
        this.querySelectorAll(
          (this.constructor as typeof BXAccordion).selectorAccordionItems
        ),
        (elem) => {
          elem.setAttribute('size', this.size);
        }
      );
    }
  }

  render() {
    return html` <slot></slot> `;
  }

  static get selectorAccordionItems() {
    return `${prefix}-accordion-item`;
  }

  static styles = styles;
}

export default BXAccordion;
