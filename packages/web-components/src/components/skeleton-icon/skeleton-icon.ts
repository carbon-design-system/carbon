/**
 * Copyright IBM Corp. 2019, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LitElement } from 'lit';
import { prefix } from '../../globals/settings';
import styles from './skeleton-icon.scss?lit';

/**
 * Skeleton icon.
 *
 * @element cds-skeleton-icon
 */
class CDSSkeletonIcon extends LitElement {
  static is = `${prefix}-skeleton-icon`;

  static styles = styles;
}

export default CDSSkeletonIcon;
