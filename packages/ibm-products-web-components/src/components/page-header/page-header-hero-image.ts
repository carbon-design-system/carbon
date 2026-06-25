/**
 * @license
 *
 * Copyright IBM Corp. 2025, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';
import { prefix } from '../../globals/settings';
import styles from './page-header.scss?lit';
import { carbonElement as customElement } from '@carbon/web-components/es/globals/decorators/carbon-element.js';

/**
 * Page header Hero Image.
 * @element c4p-page-header-hero-image
 */
@customElement(`${prefix}-page-header-hero-image`)
class CDSPageHeaderHeroImage extends LitElement {
  /**
   * Specify how the image should fit within the container.
   * - 'cover': Image fills container, may crop edges (default for hero images)
   * - 'contain': Image fits within container, may show empty space
   * - 'fill': Image stretches to fill container
   * - 'none': Image uses its natural size
   */
  @property({ type: String, attribute: 'object-fit', reflect: true })
  objectFit: 'cover' | 'contain' | 'fill' | 'none' = 'cover';

  render() {
    const blockClass = `${prefix}--page-header`;
    const classes = `${blockClass}__hero-image ${blockClass}__hero-image--object-fit-${this.objectFit}`;

    return html`
      <div
        class="${classes}"
        style="--object-fit: ${this.objectFit}; --object-position: center"
      >
        <slot></slot>
      </div>
    `;
  }

  static styles = styles;
}

export default CDSPageHeaderHeroImage;
