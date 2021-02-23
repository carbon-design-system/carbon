/**
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import ContextMenu from './ContextMenu';
import ContextMenuDivider from './ContextMenuDivider';
import ContextMenuGroup from './ContextMenuGroup';
import ContextMenuItem from './ContextMenuItem';
import ContextMenuRadioGroup from './ContextMenuRadioGroup';
import ContextMenuSelectableItem from './ContextMenuSelectableItem';

ContextMenu.ContextMenuDivider = ContextMenuDivider;
ContextMenu.ContextMenuGroup = ContextMenuGroup;
ContextMenu.ContextMenuItem = ContextMenuItem;
ContextMenu.ContextMenuRadioGroup = ContextMenuRadioGroup;
ContextMenu.ContextMenuSelectableItem = ContextMenuSelectableItem;

import useContextMenu from './useContextMenu';

export {
  ContextMenuDivider,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuRadioGroup,
  ContextMenuSelectableItem,
  useContextMenu,
};
export default ContextMenu;
