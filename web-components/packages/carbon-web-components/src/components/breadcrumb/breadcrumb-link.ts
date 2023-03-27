/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import settings from 'carbon-components/es/globals/js/settings';
import BXLink from '../link/link';
import styles from './breadcrumb.scss';
import { carbonElement as customElement } from '../../globals/decorators/carbon-element';

const { prefix } = settings;

/**
 * Link in breadcrumb.
 *
 * @element bx-breadcrumb-link
 */
@customElement(`${prefix}-breadcrumb-link`)
class BXBreadcrumbLink extends BXLink {
  static styles = styles;
}

export default BXBreadcrumbLink;
