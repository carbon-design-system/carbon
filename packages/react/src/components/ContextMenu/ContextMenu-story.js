/**
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { InlineNotification } from '../Notification';

import Menu from '../Menu';
import { StoryFrame, buildMenu } from '../Menu/_storybook-utils';

import { useContextMenu } from './index';

export default {
  title: 'Experimental/unstable_Menu/ContextMenu',
  parameters: {
    component: Menu,
  },
};

const Story = (items) => {
  const menuProps = useContextMenu();

  const renderedItems = buildMenu(items);

  return (
    <StoryFrame>
      <InlineNotification
        kind="info"
        title="Context menu"
        subtitle="Right-click anywhere on this page to access an example implementation of this component."
        lowContrast
        hideCloseButton
      />
      <Menu {...menuProps}>{renderedItems}</Menu>
    </StoryFrame>
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
