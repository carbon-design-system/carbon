/**
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { action } from '@storybook/addon-actions';

import CodeSnippet from '../CodeSnippet';
import UnorderedList from '../UnorderedList';
import ListItem from '../ListItem';

import { Menu, MenuItem, MenuItemDivider, MenuItemRadioGroup } from '../Menu';

import { useContextMenu } from './';

export default {
  title: 'Experimental/unstable__useContextMenu',
  component: useContextMenu,
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
        <ListItem>className</ListItem>
        <ListItem>label</ListItem>
        <ListItem>size</ListItem>
        <ListItem>target</ListItem>
      </UnorderedList>
    </p>
    <p>
      The
      <CodeSnippet type="inline">{`<MenuItemGroup>`}</CodeSnippet> and
      <CodeSnippet type="inline">{`<MenuItem>`}</CodeSnippet>
      components accept children items for nested menus, although the{' '}
      <CodeSnippet type="inline">{`<MenuItem>`}</CodeSnippet> component can also
      be used as a stand alone item. The other types of menu items ({' '}
      <CodeSnippet type="inline">{`<MenuItemDivider>`}</CodeSnippet>,
      <CodeSnippet type="inline">{`<MenuItemSelectable>`}</CodeSnippet>,
      <CodeSnippet type="inline">{`<MenuItemRadioGroup>`}</CodeSnippet>) do not
      accept children. The{' '}
      <CodeSnippet type="inline">{`<MenuItemRadioGroup>`}</CodeSnippet> accepts
      an array of items to display as a group of single choice selection.
    </p>
  </div>
);

export const _useContextMenu = () => {
  const onClick = action('onClick (MenuItem)');
  const onChange = action('onClick (MenuItemRadioGroup)');

  const menuProps = useContextMenu();

  return (
    <>
      <Text />
      <Menu {...menuProps}>
        <MenuItem label="Share with">
          <MenuItemRadioGroup
            label="Share with"
            items={['None', 'Product team', 'Organization', 'Company']}
            defaultSelectedItem="Product team"
            onChange={onChange}
          />
        </MenuItem>
        <MenuItemDivider />
        <MenuItem label="Cut" shortcut="⌘X" onClick={onClick} />
        <MenuItem label="Copy" shortcut="⌘C" onClick={onClick} />
        <MenuItem label="Copy path" shortcut="⌥⌘C" onClick={onClick} />
        <MenuItem label="Paste" disabled shortcut="⌘V" onClick={onClick} />
        <MenuItem label="Duplicate" onClick={onClick} />
        <MenuItemDivider />
        <MenuItem label="Rename" onClick={onClick} />
        <MenuItem label="Delete" shortcut="⌫" kind="danger" onClick={onClick} />
      </Menu>
    </>
  );
};
