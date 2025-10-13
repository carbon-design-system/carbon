/**
 * Copyright IBM Corp. 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useEffect, useRef, useState } from 'react';
import { action } from 'storybook/actions';

import { MenuItem, MenuItemDivider } from '../Menu';

import { Asset, User, Group } from '@carbon/react/icons';

import { MenuButton } from './';
import mdx from './MenuButton.mdx';

export default {
  title: 'Components/MenuButton',
  component: MenuButton,
  subcomponents: {
    MenuItem,
    MenuItemDivider,
  },
  parameters: {
    docs: {
      page: mdx,
    },
    controls: {
      exclude: ['menuTarget'],
    },
  },
};

export const Default = (args) => {
  return (
    <MenuButton {...args} onClick={action('onClick')} label="Actions">
      <MenuItem
        label="First action with a long label description"
        onClick={action('onClick')}
      />
      <MenuItem label="Second action" onClick={action('onClick')} />
      <MenuItem label="Third action" onClick={action('onClick')} disabled />
    </MenuButton>
  );
};

Default.args = { label: 'Actions' };

export const ExperimentalAutoAlign = (args) => (
  <div style={{ width: '5000px', height: '5000px' }}>
    <div
      style={{
        position: 'absolute',
        bottom: '20px',
      }}>
      <MenuButton label="Actions" {...args}>
        <MenuItem label="First action" />
        <MenuItem label="Second action that is a longer item to test overflow and title." />
        <MenuItem label="Third action" disabled />
      </MenuButton>
    </div>
  </div>
);

export const WithDanger = (args) => {
  return (
    <MenuButton label="Actions" {...args}>
      <MenuItem label="First action" />
      <MenuItem label="Second action" />
      <MenuItem label="Third action" />
      <MenuItemDivider />
      <MenuItem label="Danger action" kind="danger" />
    </MenuButton>
  );
};

export const WithDividers = (args) => {
  return (
    <MenuButton label="Actions" {...args}>
      <MenuItem label="Create service request" />
      <MenuItem label="Create work order" />
      <MenuItemDivider />
      <MenuItem label="Add plan" />
      <MenuItem label="Add flag" />
      <MenuItemDivider />
      <MenuItem label="Edit source location" />
      <MenuItem label="Recalculate source" />
    </MenuButton>
  );
};

export const WithIcons = (args) => {
  return (
    <MenuButton label="Add" {...args}>
      <MenuItem label="Asset" renderIcon={Asset} />
      <MenuItem label="User" renderIcon={User} />
      <MenuItem label="User group" renderIcon={Group} />
    </MenuButton>
  );
};

export const WithNestedMenu = (args) => (
  <MenuButton label="Actions" {...args}>
    <MenuItem label="Save" shortcut="⌘S" />
    <MenuItem label="Save as" shortcut="⌥⌘S" />
    <MenuItem label="Export as">
      <MenuItem label="PDF" />
      <MenuItem label="JPG" />
      <MenuItem label="PNG" />
    </MenuItem>
    <MenuItemDivider />
    <MenuItem label="Delete" kind="danger" />
  </MenuButton>
);

export const WithMenuAlignment = () => {
  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <MenuButton label="Bottom" menuAlignment="bottom">
          <MenuItem label="First action" />
          <MenuItem label="Second action that is a longer item to test overflow and title." />
          <MenuItem label="Third action" disabled />
        </MenuButton>

        <MenuButton label="Bottom start" menuAlignment="bottom-start">
          <MenuItem label="First action" />
          <MenuItem label="Second action that is a longer item to test overflow and title." />
          <MenuItem label="Third action" disabled />
        </MenuButton>

        <MenuButton label="Bottom end" menuAlignment="bottom-end">
          <MenuItem label="First action" />
          <MenuItem label="Second action that is a longer item to test overflow and title." />
          <MenuItem label="Third action" disabled />
        </MenuButton>
      </div>

      <div
        style={{
          display: 'flex',
          marginTop: '15rem',
          justifyContent: 'space-between',
        }}>
        <MenuButton label="Top" menuAlignment="top">
          <MenuItem label="First action" />
          <MenuItem label="Second action that is a longer item to test overflow and title." />
          <MenuItem label="Third action" disabled />
        </MenuButton>

        <MenuButton label="Top start" menuAlignment="top-start">
          <MenuItem label="First action" />
          <MenuItem label="Second action that is a longer item to test overflow and title." />
          <MenuItem label="Third action" disabled />
        </MenuButton>

        <MenuButton label="Top end" menuAlignment="top-end">
          <MenuItem label="First action" />
          <MenuItem label="Second action that is a longer item to test overflow and title." />
          <MenuItem label="Third action" disabled />
        </MenuButton>
      </div>
    </>
  );
};

export const InScrollableContainer = () => {
  const containerRef = useRef(null);
  const [target, setTarget] = useState(undefined);
  useEffect(() => {
    if (containerRef.current) {
      setTarget(containerRef.current);
    }
  }, []);

  return (
    <div className="app">
      <div className="container">
        <div
          className="scrollable-container"
          ref={containerRef}
          style={{
            height: '200px',
            width: '8000px',
            overflowY: 'auto',
            overflowX: 'auto',
            border: '1px solid #ddd',
            padding: '20px',
          }}>
          <p> This is the scrollable container</p>
          <div style={{ height: '300px' }}></div>
          <MenuButton
            label="Bottom"
            menuTarget={target}
            boundary={containerRef.current}>
            <MenuItem label="First action with a long label description" />
            <MenuItem label="Second action" />
            <MenuItem label="Third action" disabled />
          </MenuButton>
          <div style={{ height: '100px' }}></div>
          <MenuButton
            label="Right"
            menuTarget={target}
            boundary={containerRef.current}
            menuAlignment="right">
            <MenuItem label="First action with a long label description" />
            <MenuItem label="Second action" />
            <MenuItem label="Third action" disabled />
          </MenuButton>
          <div style={{ height: '200px' }}></div>
        </div>
      </div>
    </div>
  );
};
