/**
 * Copyright IBM Corp. 2025, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
/**
 * @deprecated PageHeader has moved to Carbon for IBM Products.
 * See https://github.com/carbon-design-system/carbon/issues/21926
 */

import { LitElement, html } from 'lit';
import { prefix } from '../../globals/settings';
import styles from './page-header.scss?lit';
import { carbonElement as customElement } from '../../globals/decorators/carbon-element';

/**
 * Page header Hero Image.
 * @deprecated This component has moved to Carbon for IBM Products and is now maintained in
 *   `@carbon/ibm-products-web-components`.
 *   See https://github.com/carbon-design-system/carbon/issues/21926
 * @element cds-page-header-hero-image
 */
@customElement(`${prefix}-page-header-hero-image`)
class CDSPageHeaderHeroImage extends LitElement {
  render() {
    return html`<slot></slot> `;
  }

  static styles = styles;
}

export default CDSPageHeaderHeroImage;
