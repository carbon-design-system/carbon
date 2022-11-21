/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import settings from 'carbon-components/es/globals/js/settings';
import { customElement } from 'lit-element';
import BXHeaderNavItem from './header-nav-item';

const { prefix } = settings;

/**
 * Header submenu item.
 *
 * @element bx-header-menu-item
 */
@customElement(`${prefix}-header-menu-item`)
class BXHeaderMenuItem extends BXHeaderNavItem {}

export default BXHeaderMenuItem;
