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
import { forEach } from '../../globals/internal/collection-helpers';
import { ACCORDION_SIZE, ACCORDION_ALIGNMENT } from './defs';
import styles from './accordion.scss';

export { ACCORDION_SIZE, ACCORDION_ALIGNMENT };

/**
 * Accordion container.
 *
 * @element cds-accordion
 */
@customElement(`${prefix}-accordion`)
class CDSAccordion extends LitElement {
  /**
   * Accordion size should be sm, md, lg.
   */
  @property({ reflect: true })
  size = ACCORDION_SIZE.MEDIUM;

  /**
   * Specify the alignment of the accordion heading title and chevron
   */
  @property({ reflect: true })
  alignment = ACCORDION_ALIGNMENT.END;

  /**
   * Specify whether Accordion text should be flush, default is false, does not work with align="start"
   */
  @property({ type: Boolean, reflect: true })
  isFlush = false;

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
          (this.constructor as typeof CDSAccordion).selectorAccordionItems
        ),
        (elem) => {
          elem.setAttribute('size', this.size);
        }
      );
    }
    if (changedProperties.has('alignment')) {
      // Propagate `alignment` attribute to descendants until `:host-context()` gets supported in all major browsers
      forEach(
        this.querySelectorAll(
          (this.constructor as typeof CDSAccordion).selectorAccordionItems
        ),
        (elem) => {
          elem.setAttribute('alignment', this.alignment);
        }
      );
    }
    if (
      changedProperties.has('isFlush') ||
      changedProperties.has('alignment')
    ) {
      // Propagate `isFlush` attribute to descendants until `:host-context()` gets supported in all major browsers
      forEach(
        this.querySelectorAll(
          (this.constructor as typeof CDSAccordion).selectorAccordionItems
        ),
        (elem) => {
          this.isFlush && this.alignment !== 'start'
            ? elem.setAttribute('isFlush', '')
            : elem.removeAttribute('isFlush');
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

export default CDSAccordion;
