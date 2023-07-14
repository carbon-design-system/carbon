/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { prefix } from '../../globals/settings';
import styles from './skeleton-placeholder.scss';

/**
 * Skeleton placeholder.
 *
 * @element cds-skeleton-placeholder
 */
@customElement(`${prefix}-skeleton-placeholder`)
class CDSSkeletonPlaceholder extends LitElement {
  render() {
    return html` <div class="${prefix}--skeleton__placeholder"></div> `;
  }

  static styles = styles;
}

export default CDSSkeletonPlaceholder;
