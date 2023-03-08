/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { customElement } from 'lit/decorators.js';
import { prefix } from '../../globals/settings';
import BXLink from '../link/link';
import styles from './breadcrumb.scss';

/**
 * Link in breadcrumb.
 *
 * @element cds-breadcrumb-link
 */
@customElement(`${prefix}-breadcrumb-link`)
class BXBreadcrumbLink extends BXLink {
  static styles = styles;
}

export default BXBreadcrumbLink;
