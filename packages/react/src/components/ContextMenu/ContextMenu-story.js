/**
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { action } from '@storybook/addon-actions';
import { InlineNotification } from '../Notification';

import ContextMenu, {
  ContextMenuDivider,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuRadioGroup,
  ContextMenuSelectableItem,
  useContextMenu,
} from '../ContextMenu';

export default {
  title: 'Experimental/unstable_ContextMenu',
  parameters: {
    component: ContextMenu,
  },
};

const InfoBanners = () => (
  <>
    <InlineNotification
      kind="info"
      title="Experimental component"
      subtitle="This component is considered experimental. Its API may change until the stable version is released."
      lowContrast
      hideCloseButton
    />
    <InlineNotification
      kind="info"
      title="Context menu"
      subtitle="Right-click anywhere on this page to access an example implementation of this component."
      lowContrast
      hideCloseButton
    />
  </>
);

const Story = (items) => {
  const contextMenuProps = useContextMenu();

  function renderItem(item, i) {
    switch (item.type) {
      case 'item':
        return (
          <ContextMenuItem
            key={i}
            label={item.label}
            shortcut={item.shortcut}
            disabled={item.disabled}
            kind={item.kind}
            onClick={!item.children ? action('onClick') : null}>
            {item.children && item.children.map(renderItem)}
          </ContextMenuItem>
        );
      case 'divider':
        return <ContextMenuDivider key={i} />;
      case 'selectable':
        return (
          <ContextMenuSelectableItem
            key={i}
            label={item.label}
            initialChecked={item.initialChecked}
            onChange={action('onChange')}
          />
        );
      case 'radiogroup':
        return (
          <ContextMenuRadioGroup
            key={i}
            label={item.label}
            items={item.items}
            initialSelectedItem={item.initialSelectedItem}
            onChange={action('onChange')}
          />
        );
      case 'group':
        return (
          <ContextMenuGroup key={i} label={item.label}>
            {item.children && item.children.map(renderItem)}
          </ContextMenuGroup>
        );
    }
  }

  return (
    <div style={{ height: 'calc(100vh - 6.25rem)' }}>
      <InfoBanners />
      <ContextMenu {...contextMenuProps}>{items.map(renderItem)}</ContextMenu>
    </div>
  );
};

export const _ContextMenu = () =>
  Story([
    {
      type: 'item',
      label: 'Share with',
      children: [
        {
          type: 'radiogroup',
          label: 'Share with',
          items: ['None', 'Product team', 'Organization', 'Company'],
          initialSelectedItem: 'Product team',
        },
      ],
    },
    { type: 'divider' },
    { type: 'item', label: 'Cut', shortcut: '⌘X' },
    { type: 'item', label: 'Copy', shortcut: '⌘C' },
    { type: 'item', label: 'Copy path', shortcut: '⌥⌘C' },
    { type: 'item', label: 'Paste', shortcut: '⌘V', disabled: true },
    { type: 'item', label: 'Duplicate' },
    { type: 'divider' },
    { type: 'selectable', label: 'Publish', initialChecked: true },
    { type: 'divider' },
    { type: 'item', label: 'Rename', shortcut: '↩︎' },
    { type: 'item', label: 'Delete', shortcut: '⌘⌫', kind: 'danger' },
  ]);
_ContextMenu.storyName = 'ContextMenu';

export const _MultipleGroups = () =>
  Story([
    {
      type: 'group',
      label: 'Font style',
      children: [
        { type: 'selectable', label: 'Bold' },
        { type: 'selectable', label: 'Italic' },
      ],
    },
    { type: 'divider' },
    {
      type: 'radiogroup',
      label: 'Text color',
      items: ['Black', 'Blue', 'Red', 'Green'],
      initialSelectedItem: 'Black',
    },
    { type: 'divider' },
    {
      type: 'radiogroup',
      label: 'Text decoration',
      items: ['None', 'Overline', 'Line-through', 'Underline'],
      initialSelectedItem: 'None',
    },
  ]);
_MultipleGroups.storyName = 'MultipleGroups';
