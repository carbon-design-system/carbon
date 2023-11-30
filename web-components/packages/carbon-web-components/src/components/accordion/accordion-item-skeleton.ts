/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement, html } from 'lit';
import ChevronRight16 from '@carbon/icons/lib/chevron--right/16';
import { customElement } from 'lit/decorators.js';
import { prefix } from '../../globals/settings';
import '../skeleton-text/index';
import styles from './accordion.scss';

/**
 * Skeleton of accordion item.
 */
@customElement(`${prefix}-accordion-item-skeleton`)
class CDSAccordionItemSkeleton extends LitElement {
  render() {
    return html`
      <span class="${prefix}--accordion__heading">
        ${ChevronRight16({
          part: 'expando-icon',
          class: `${prefix}--accordion__arrow`,
        })}
        <cds-skeleton-text
          class="${prefix}--accordion__title"></cds-skeleton-text>
      </span>
    `;
  }

  static styles = styles;
}

export default CDSAccordionItemSkeleton;
