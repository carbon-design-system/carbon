/**
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useEffect, useState } from 'react';
import { action } from '@storybook/addon-actions';
import { InlineNotification } from '../Notification';

import ContextMenu, {
  ContextMenuItem,
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

function useContextMenu() {
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState([0, 0]);

  function openContextMenu(e) {
    e.preventDefault();

    const { x, y } = e;

    setPosition([x, y]);
    setOpen(true);
  }

  function onClose() {
    setOpen(false);
  }

  useEffect(() => {
    document.addEventListener('contextmenu', openContextMenu);

    return () => {
      document.removeEventListener('contextmenu', openContextMenu);
    };
  });

  return {
    open,
    x: position[0],
    y: position[1],
    onClose,
  };
}

const InfoBanner = () => (
  <InlineNotification
    kind="info"
    title="Context menu"
    subtitle="Right-click anywhere on this page to access a demo of this component"
    lowContrast
    hideCloseButton
  />
);

export const _ContextMenu = () => {
  const contextMenuProps = useContextMenu();

  return (
    <div style={{ height: 'calc(100vh - 6.25rem)' }}>
      <InfoBanner />
      <ContextMenu {...contextMenuProps}>
        <ContextMenuItem label="Share with">
          <ContextMenuRadioGroup
            label="Share with"
            items={['None', 'Product team', 'Organization', 'Company']}
            initialSelectedItem="Product team"
            onChange={action('onChange')}
          />
        </ContextMenuItem>
        <ContextMenuDivider />
        <ContextMenuItem
          label="Cut"
          shortcut="⌘X"
          shortcutText="command x"
          onClick={action('onClick')}
        />
        <ContextMenuItem
          label="Copy"
          shortcut="⌘C"
          shortcutText="command c"
          onClick={action('onClick')}
        />
        <ContextMenuItem
          label="Copy path"
          shortcut="⌥⌘C"
          shortcutText="option command c"
          onClick={action('onClick')}
        />
        <ContextMenuItem
          label="Paste"
          shortcut="⌘V"
          shortcutText="command v"
          disabled
          onClick={action('onClick')}
        />
        <ContextMenuItem label="Duplicate" onClick={action('onClick')} />
        <ContextMenuDivider />
        <ContextMenuSelectableOption
          label="Publish"
          initialChecked
          onChange={action('onChange')}
        />
        <ContextMenuDivider />
        <ContextMenuItem
          label="Rename"
          shortcut="↩︎"
          shortcutText="enter"
          onClick={action('onClick')}
        />
        <ContextMenuItem
          label="Delete"
          shortcut="⌘⌫"
          shortcutText="command backspace"
          onClick={action('onClick')}
        />
      </ContextMenu>
    </div>
  );
};

_ContextMenu.storyName = 'ContextMenu';
