/**
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useEffect, useState } from 'react';
import { action } from '@storybook/addon-actions';
import { FolderShared16, Edit16, TrashCan16 } from '@carbon/icons-react';
import { InlineNotification } from '../Notification';

import ContextMenu, {
  ContextMenuOption,
  ContextMenuDivider,
  ContextMenuSelectableOption,
  ContextMenuRadioGroup,
} from '../ContextMenu';

export default {
  title: 'ContextMenu',
  parameters: {
    component: ContextMenu,
  },
};

export const _ContextMenu = () => {
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState([0, 0]);

  function openContextMenu(e) {
    e.preventDefault();

    const { x, y } = e;

    setPosition([x, y]);
    setOpen(true);
  }

  useEffect(() => {
    document.addEventListener('contextmenu', openContextMenu);

    return () => {
      document.removeEventListener('contextmenu', openContextMenu);
    };
  });

  return (
    <>
      <InlineNotification
        kind="info"
        title="Context menu"
        subtitle="Right-click anywhere on this page to access a demo of this component"
        lowContrast
        hideCloseButton
      />
      <ContextMenu
        open={open}
        x={position[0]}
        y={position[1]}
        onClose={() => {
          setOpen(false);
        }}>
        <ContextMenuOption label="Share with" renderIcon={FolderShared16}>
          <ContextMenuRadioGroup
            label="Share with"
            items={['None', 'Product team', 'Organization', 'Company']}
            initialSelectedItem="Product team"
            onChange={action('onChange')}
          />
        </ContextMenuOption>
        <ContextMenuDivider />
        <ContextMenuOption
          label="Cut"
          shortcut="⌘X"
          shortcutText="command x"
          onClick={action('onClick')}
        />
        <ContextMenuOption
          label="Copy"
          shortcut="⌘C"
          shortcutText="command c"
          onClick={action('onClick')}
        />
        <ContextMenuOption
          label="Copy path"
          shortcut="⌥⌘C"
          shortcutText="option command c"
          onClick={action('onClick')}
        />
        <ContextMenuOption
          label="Paste"
          shortcut="⌘V"
          shortcutText="command v"
          disabled
          onClick={action('onClick')}
        />
        <ContextMenuOption label="Duplicate" onClick={action('onClick')} />
        <ContextMenuDivider />
        <ContextMenuSelectableOption
          label="Publish"
          initialChecked
          onChange={action('onChange')}
        />
        <ContextMenuDivider />
        <ContextMenuOption
          label="Rename"
          shortcut="↩︎"
          shortcutText="enter"
          renderIcon={Edit16}
          onClick={action('onClick')}
        />
        <ContextMenuOption
          label="Delete"
          shortcut="⌘⌫"
          shortcutText="command backspace"
          renderIcon={TrashCan16}
          onClick={action('onClick')}
        />
      </ContextMenu>
    </>
  );
};

_ContextMenu.storyName = 'ContextMenu';
