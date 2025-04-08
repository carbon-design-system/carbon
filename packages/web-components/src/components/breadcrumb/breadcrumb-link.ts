/**
 * Copyright IBM Corp. 2019, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import { prefix } from '../../globals/settings';
import CDSLink from '../link/link';
import styles from './breadcrumb.scss?lit';
import { carbonElement as customElement } from '../../globals/decorators/carbon-element';
import { property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
/**
 * Link in breadcrumb.
 *
 * @element cds-breadcrumb-link
 */
@customElement(`${prefix}-breadcrumb-link`)
class CDSBreadcrumbLink extends CDSLink {
  /**
   * indicates that this breadcrumb item represents the current item
   */
  @property({ type: String, attribute: 'aria-current' })
  ariaCurrent;

  /**
   * Provide if this breadcrumb item represents the current page
   */
  @property({ type: Boolean, attribute: 'is-currentpage' })
  isCurrentPage = false;

  render() {
    const { ariaCurrent, isCurrentPage } = this;

    const linkClass = classMap({
      [`${prefix}--link`]: true,
      [`${prefix}--breadcrumb-item--current`]:
        isCurrentPage && ariaCurrent !== 'page',
    });

    return html`
      ${this.href
        ? super.render()
        : html`<span
            class="${linkClass}"
            aria-current="${ariaCurrent || isCurrentPage}"
            ><slot></slot
          ></span>`}
    `;
  }
  static styles = styles;
}

export default CDSBreadcrumbLink;
