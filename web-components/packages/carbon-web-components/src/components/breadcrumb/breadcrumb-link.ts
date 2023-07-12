/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import { prefix } from '../../globals/settings';
import CDSLink from '../link/link';
import styles from './breadcrumb.scss';
import { carbonElement as customElement } from '../../globals/decorators/carbon-element';

/**
 * Link in breadcrumb.
 *
 * @element cds-breadcrumb-link
 */
@customElement(`${prefix}-breadcrumb-link`)
class CDSBreadcrumbLink extends CDSLink {
  render() {
    return html`
      ${this.href
        ? super.render()
        : html`<span class="${prefix}--link"><slot></slot></span>`}
    `;
  }
  static styles = styles;
}

export default CDSBreadcrumbLink;
