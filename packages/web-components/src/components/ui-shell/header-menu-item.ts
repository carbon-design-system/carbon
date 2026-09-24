/**
 * Copyright IBM Corp. 2019, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { prefix } from '../../globals/settings';
import CDSHeaderNavItem from './header-nav-item';

/**
 * Header submenu item.
 *
 * @element cds-header-menu-item
 */
class CDSHeaderMenuItem extends CDSHeaderNavItem {
  static is = `${prefix}-header-menu-item`;
}

export default CDSHeaderMenuItem;
