/**
 * Copyright IBM Corp. 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useRef } from 'react';
import { action } from 'storybook/actions';

import {
  Copy,
  Cut,
  FolderShared,
  Paste,
  TextBold,
  TextItalic,
  TrashCan,
} from '@carbon/icons-react';

import {
  Menu,
  MenuItem,
  MenuItemSelectable,
  MenuItemGroup,
  MenuItemRadioGroup,
  MenuItemDivider,
} from './';
import { useContextMenu } from '../ContextMenu';
import mdx from './Menu.mdx';

export default {
  title: 'Components/Menu',
  component: Menu,
  subcomponents: {
    MenuItem,
    MenuItemSelectable,
    MenuItemGroup,
    MenuItemRadioGroup,
    MenuItemDivider,
  },
  parameters: {
    docs: {
      page: mdx,
    },
    controls: {
      exclude: ['target'],
    },
  },
  argTypes: {
    mode: {
      control: false,
    },
  },
};

export const Default = (args) => {
  const itemOnClick = action('onClick (MenuItem)');
  const selectableOnChange = action('onChange (MenuItemSelectable)');
  const radioOnChange = action('onChange (MenuItemRadioGroup)');

  const target = document.getElementById('storybook-root');

  return (
    <Menu {...args} target={target} x={document?.dir === 'rtl' ? 250 : 0}>
      <MenuItem label="Share with" renderIcon={FolderShared}>
        <MenuItemRadioGroup
          label="Share with"
          items={['None', 'Product team', 'Organization', 'Company']}
          defaultSelectedItem="Product team"
          onChange={radioOnChange}
        />
      </MenuItem>
      <MenuItemDivider />
      <MenuItem
        label="Cut"
        shortcut="⌘X"
        onClick={itemOnClick}
        renderIcon={Cut}
      />
      <MenuItem
        label="Copy"
        shortcut="⌘C"
        onClick={itemOnClick}
        renderIcon={Copy}
      />
      <MenuItem
        label="Paste"
        shortcut="⌘V"
        disabled
        onClick={itemOnClick}
        renderIcon={Paste}
      />
      <MenuItemDivider />
      <MenuItemGroup label="Font style">
        <MenuItemSelectable
          label="Bold"
          shortcut="⌘B"
          defaultSelected
          onChange={selectableOnChange}
          renderIcon={TextBold}
        />
        <MenuItemSelectable
          label="Italic"
          shortcut="⌘I"
          onChange={selectableOnChange}
          renderIcon={TextItalic}
        />
      </MenuItemGroup>
      <MenuItemDivider />
      <MenuItemRadioGroup
        label="Text decoration"
        items={['None', 'Overline', 'Line-through', 'Underline']}
        defaultSelectedItem="None"
        onChange={radioOnChange}
      />
      <MenuItemDivider />
      <MenuItem
        label="Delete"
        shortcut="⌫"
        kind="danger"
        onClick={itemOnClick}
        renderIcon={TrashCan}
      />
    </Menu>
  );
};

Default.args = {
  onClose: action('onClose'),
  open: true,
};

const ContextMenuTile = ({ index }) => {
  const tileRef = useRef(null);
  const menuProps = useContextMenu(tileRef);

  return (
    <div
      ref={tileRef}
      style={{
        width: '40px',
        height: '40px',
        backgroundColor: 'var(--cds-layer-01)',
        border: '1px solid var(--cds-border-subtle-01)',
        cursor: 'context-menu',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '10px',
        userSelect: 'none',
      }}>
      {index + 1}
      <Menu {...menuProps}>
        <MenuItem label="Action" />
        <MenuItem label="Share with">
          {/* <MenuItem label="Product team">
            <MenuItem label="Designer" />
            <MenuItem label="Developer" />
            <MenuItem label="Manager" />
          </MenuItem> */}
          <MenuItem label="Organization" />
          <MenuItem label="Company" />
        </MenuItem>
        <MenuItem label="Another action" disabled />
        <MenuItemDivider />
        <MenuItem label="Delete" kind="danger" />
      </Menu>
    </div>
  );
};

export const ExperimentalAutoAlignStressTest = () => (
  <div
    style={{
      display: 'grid',
      placeContent: 'center',
      gridTemplateColumns: 'repeat(10, auto)',
      gap: '8px',
      width: '200vw',
      height: '200vh',
    }}>
    {Array.from({ length: 50 }, (_, i) => (
      <ContextMenuTile key={i} index={i} />
    ))}
  </div>
);

ExperimentalAutoAlignStressTest.storyName =
  'Experimental auto align – stress test (50 instances)';

ExperimentalAutoAlignStressTest.parameters = {
  controls: { disable: true },
};
