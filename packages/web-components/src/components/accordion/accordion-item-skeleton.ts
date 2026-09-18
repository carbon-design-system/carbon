/**
 * Copyright IBM Corp. 2019, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement, html } from 'lit';
import { iconLoader } from '../../globals/internal/icon-loader';
import ChevronRight16 from '@carbon/icons/es/chevron--right/16.js';
import { prefix } from '../../globals/settings';
import '../skeleton-text/index';
import styles from './accordion.scss?lit';

/**
 * Skeleton of accordion item.
 */
class CDSAccordionItemSkeleton extends LitElement {
  static is = `${prefix}-accordion-item-skeleton`;

  render() {
    return html`
      <span class="${prefix}--accordion__heading">
        ${iconLoader(ChevronRight16, {
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
