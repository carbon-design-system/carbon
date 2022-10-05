/**
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { InlineNotification } from '../Notification';
import CodeSnippet from '../CodeSnippet';
import UnorderedList from '../UnorderedList';
import ListItem from '../ListItem';

import Menu, {
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuRadioGroup,
  MenuSelectableItem,
} from '../Menu';

import { StoryFrame, buildMenu } from '../Menu/_storybook-utils';

import { useContextMenu } from './index';

export default {
  title: 'Experimental/unstable_Menu/ContextMenu',
  component: Menu,
  subcomponents: {
    MenuItem,
    MenuGroup,
    MenuDivider,
    MenuSelectableItem,
    MenuRadioGroup,
  },
};

const Text = () => (
  <div style={{ width: '40rem' }}>
    <h2>Right click anywere in the story frame</h2>
    <br />
    <p>
      The <CodeSnippet type="inline">{`<Menu>`}</CodeSnippet> props are set
      using the hook{' '}
      <CodeSnippet type="inline">{`useContextMenu()`}</CodeSnippet>. This
      determines the position the menu should have on right click and handles
      opening. Props that the{' '}
      <CodeSnippet type="inline">{`useContextMenu()`}</CodeSnippet>
      hook does not set and can be configured by the user are:
      <UnorderedList style={{ paddingLeft: '2rem', margin: '2rem 0' }}>
        <ListItem>size</ListItem>
        <ListItem>onClose</ListItem>
        <ListItem>className</ListItem>
        <ListItem>id</ListItem>
        <ListItem>target</ListItem>
      </UnorderedList>
    </p>
    <p>
      The
      <CodeSnippet type="inline">{`<MenuGroup>`}</CodeSnippet> and
      <CodeSnippet type="inline">{`<MenuItem>`}</CodeSnippet>
      components accept children items for nested menus, although the{' '}
      <CodeSnippet type="inline">{`<MenuItem>`}</CodeSnippet> component can also
      be used as a stand alone item. The other types of menu items ({' '}
      <CodeSnippet type="inline">{`<MenuDivider>`}</CodeSnippet>,
      <CodeSnippet type="inline">{`<MenuSelectableItem>`}</CodeSnippet>,
      <CodeSnippet type="inline">{`<MenuRadioGroup>`}</CodeSnippet>) do not
      accept children. The{' '}
      <CodeSnippet type="inline">{`<MenuRadioGroup>`}</CodeSnippet> accepts an
      array of items to display as a group of single choice selection.
    </p>
  </div>
);

export const _ContextMenu = () => {
  const menuProps = useContextMenu();

  const items = [
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
  ];

  const renderedItems = buildMenu(items);

  return (
    <StoryFrame>
      <InlineNotification kind="info" lowContrast hideCloseButton>
        <strong>Context Menu</strong>
        <p>
          Right-click anywhere on this page to access an example implementation
          of this component.
        </p>
      </InlineNotification>
      <Menu {...menuProps}>{renderedItems}</Menu>
    </StoryFrame>
  );
};

export const _MultipleGroups = () => {
  const menuProps = useContextMenu();

  const items = [
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
  ];

  const renderedItems = buildMenu(items);

  return (
    <StoryFrame>
      <InlineNotification kind="info" lowContrast hideCloseButton>
        <strong>Context Menu</strong>
        <p>
          Right-click anywhere on this page to access an example implementation
          of this component.
        </p>
      </InlineNotification>
      <Menu {...menuProps}>{renderedItems}</Menu>
    </StoryFrame>
  );
};

export const _Playground = (args) => {
  const props = useContextMenu();
  return (
    <div style={{ height: 'calc(100vh - 6.25rem)' }}>
      <Text />
      <Menu {...args} {...props}>
        <MenuItem label="Share with">
          <MenuRadioGroup
            label="Share with"
            items={['None', 'Product team', 'Organization', 'Company']}
            initialSelectedItem="Product team"
          />
        </MenuItem>
        <MenuDivider />
        <MenuItem label="Cut" shortcut="⌘X" />
        <MenuItem label="Copy" shortcut="⌘C" />
        <MenuItem label="Copy path" shortcut="⌥⌘C" />
        <MenuItem label="Paste" shortcut="⌘V" disabled />
        <MenuDivider />
        <MenuGroup label="Font style">
          <MenuSelectableItem label="Bold" initialChecked />
          <MenuSelectableItem label="Italic" />
        </MenuGroup>
        <MenuDivider />
        <MenuRadioGroup
          label="Text color"
          items={['None', 'Overline', 'Line-through', 'Underline']}
          initialSelectedItem="None"
        />
        <MenuDivider />
        <MenuItem label="Danger item" kind="danger" />
      </Menu>
    </div>
  );
};

_Playground.argTypes = {
  size: {
    control: { type: 'select' },
    options: ['sm', 'md', 'lg'],
  },
  children: {
    control: false,
  },
  className: {
    control: false,
  },
  id: {
    control: false,
  },
  level: {
    control: false,
  },
  open: {
    control: false,
  },
  onClose: {
    control: false,
  },
  target: {
    control: false,
  },
  x: {
    control: false,
  },
  y: {
    control: false,
  },
};
