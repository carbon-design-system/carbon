/**
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import ContextMenu from './ContextMenu';
import ContextMenuItem from './ContextMenuItem';
import ContextMenuDivider from './ContextMenuDivider';
import ContextMenuSelectableOption from './ContextMenuSelectableOption';
import ContextMenuRadioGroup from './ContextMenuRadioGroup';

ContextMenu.ContextMenuItem = ContextMenuItem;
ContextMenu.ContextMenuDivider = ContextMenuDivider;
ContextMenu.ContextMenuSelectableOption = ContextMenuSelectableOption;
ContextMenu.ContextMenuRadioGroup = ContextMenuRadioGroup;

export {
  ContextMenuItem,
  ContextMenuDivider,
  ContextMenuSelectableOption,
  ContextMenuRadioGroup,
};
export default ContextMenu;
