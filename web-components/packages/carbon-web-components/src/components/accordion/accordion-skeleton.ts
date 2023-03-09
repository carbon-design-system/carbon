/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { classMap } from 'lit/directives/class-map.js';
import { LitElement, html } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import { prefix } from '../../globals/settings';
import { ACCORDION_ALIGNMENT } from './accordion';
import { forEach } from '../../globals/internal/collection-helpers';
import ChevronRight16 from '@carbon/icons/lib/chevron--right/16';
import './accordion-item-skeleton';
import '../skeleton-text/index';
import styles from './accordion.scss';

/**
 * Skeleton of code snippet.
 */
@customElement(`${prefix}-accordion-skeleton`)
class BXAccordionSkeleton extends LitElement {
  /**
   * Specify the alignment of the accordion heading title and chevron
   */
  @property({ reflect: true })
  alignment = ACCORDION_ALIGNMENT.END;

  /**
   * Set number of items to render
   */
  @property({ type: Number, attribute: 'count' })
  count = 4;

  /**
   * Specify whether Accordion text should be flush, default is false, does not work with align="start"
   */
  @property({ type: Boolean, reflect: true })
  isFlush = false;

  /**
   * `true` if the first accordion item should be open.
   */
  @property({ type: Boolean, reflect: true })
  open = true;

  updated(changedProperties) {
    if (changedProperties.has('alignment')) {
      // Propagate `alignment` attribute to descendants until `:host-context()` gets supported in all major browsers
      forEach(
        this.shadowRoot!.querySelectorAll(
          (this.constructor as typeof BXAccordionSkeleton)
            .selectorAccordionItemSkeletons
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
        this.shadowRoot!.querySelectorAll(
          (this.constructor as typeof BXAccordionSkeleton)
            .selectorAccordionItemSkeletons
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
    const classes = classMap({
      [`${prefix}--accordion__item`]: true,
      [`${prefix}--accordion__item--active`]: true,
      [`${prefix}--accordion--${this.alignment}`]: this.alignment,
      [`${prefix}--accordion--flush`]:
        this.isFlush && this.alignment !== 'start',
    });
    const numSkeletonItems = this.open ? this.count - 1 : this.count;
    return html`
      ${this.open
        ? html`
            <li class="${classes}">
              <span class="${prefix}--accordion__heading">
                ${ChevronRight16({
                  part: 'expando-icon',
                  class: `${prefix}--accordion__arrow`,
                })}
                <cds-skeleton-text
                  class="${prefix}--accordion__title"></cds-skeleton-text>
              </span>
              <div class="${prefix}--accordion__content">
                <cds-skeleton-text width="90%"></cds-skeleton-text>
                <cds-skeleton-text width="80%"></cds-skeleton-text>
                <cds-skeleton-text width="85%"></cds-skeleton-text>
              </div>
            </li>
          `
        : ``}
      ${Array.from(new Array(numSkeletonItems)).map(
        (_, index) =>
          html`
            <cds-accordion-item-skeleton
              key=${index}></cds-accordion-item-skeleton>
          `
      )}
    `;
  }

  static get selectorAccordionItemSkeletons() {
    return `${prefix}-accordion-item-skeleton`;
  }

  static styles = styles;
}

export default BXAccordionSkeleton;
