/**
 * Copyright IBM Corp. 2019, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { classMap } from 'lit/directives/class-map.js';
import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';
import { prefix } from '../../globals/settings';
import { BREADCRUMB_SIZE } from './defs';
import styles from './breadcrumb.scss?lit';
import { carbonElement as customElement } from '../../globals/decorators/carbon-element';

const renderItem = () => {
  return html`
    <div class="${prefix}--breadcrumb-item">
      <span class="${prefix}--link">&nbsp;</span>
    </div>
  `;
};

/**
 * Skeleton of breadcrumb.
 */
@customElement(`${prefix}-breadcrumb-skeleton`)
class CDSBreadcrumbSkeleton extends LitElement {
  /**
   * Specify the number of items
   */
  @property({ type: Number, reflect: true })
  items = 3;

  /**
   * Optional prop to omit the trailing slash for the breadcrumbs
   */
  @property({ type: Boolean, reflect: true, attribute: 'no-trailing-slash' })
  noTrailingSlash = false;

  /**
   * Specify the size of the Breadcrumb. Currently
   * supports the following: `sm` & `md` (default: 'md')
   */
  @property({ type: BREADCRUMB_SIZE, reflect: true })
  size = BREADCRUMB_SIZE.MEDIUM;

  render() {
    const classes = classMap({
      [`${prefix}--breadcrumb`]: true,
      [`${prefix}--skeleton`]: true,
      [`${prefix}--breadcrumb--no-trailing-slash`]: this.noTrailingSlash,
      [`${prefix}--breadcrumb--sm`]: this.size === BREADCRUMB_SIZE.SMALL,
    });
    return html`
      <div class="${classes}">
        ${[...Array(this.items)].map(() => renderItem())}
      </div>
    `;
  }

  static styles = styles;
}

export default CDSBreadcrumbSkeleton;
