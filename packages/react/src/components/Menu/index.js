/**
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import Menu from './Menu';
import MenuDivider from './MenuDivider';
import MenuGroup from './MenuGroup';
import MenuItem from './MenuItem';
import MenuRadioGroup from './MenuRadioGroup';
import MenuSelectableItem from './MenuSelectableItem';

Menu.MenuDivider = MenuDivider;
Menu.MenuGroup = MenuGroup;
Menu.MenuItem = MenuItem;
Menu.MenuRadioGroup = MenuRadioGroup;
Menu.MenuSelectableItem = MenuSelectableItem;

export { MenuDivider, MenuGroup, MenuItem, MenuRadioGroup, MenuSelectableItem };
export default Menu;
