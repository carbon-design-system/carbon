/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { prefix } from '../../globals/settings';
import CDSHeaderNavItem from './header-nav-item';
import { carbonElement as customElement } from '../../globals/decorators/carbon-element';

/**
 * Header submenu item.
 *
 * @element cds-header-menu-item
 */
@customElement(`${prefix}-header-menu-item`)
class CDSHeaderMenuItem extends CDSHeaderNavItem {}

export default CDSHeaderMenuItem;
