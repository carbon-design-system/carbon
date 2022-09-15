/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { customElement } from 'lit-element';
import settings from 'carbon-components/es/globals/js/settings';
import BXLink from '../link/link';
import styles from './breadcrumb.scss';

const { prefix } = settings;

/**
 * Link in breadcrumb.
 * @element bx-breadcrumb-link
 */
@customElement(`${prefix}-breadcrumb-link`)
class BXBreadcrumbLink extends BXLink {
  static styles = styles;
}

export default BXBreadcrumbLink;
