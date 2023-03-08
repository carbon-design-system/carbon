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
import BXHeaderNavItem from './header-nav-item';

/**
 * Header submenu item.
 *
 * @element cds-header-menu-item
 */
@customElement(`${prefix}-header-menu-item`)
class BXHeaderMenuItem extends BXHeaderNavItem {}

export default BXHeaderMenuItem;
