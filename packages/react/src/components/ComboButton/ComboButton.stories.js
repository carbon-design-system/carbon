/**
 * Copyright IBM Corp. 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { action } from 'storybook/actions';

import { MenuItem, MenuItemDivider } from '../Menu';
import { CopyFile, Export } from '@carbon/icons-react';

import { ComboButton } from './';
import mdx from './ComboButton.mdx';

export default {
  title: 'Components/ComboButton',
  component: ComboButton,
  subcomponents: {
    MenuItem,
    MenuItemDivider,
  },
  parameters: {
    docs: {
      page: mdx,
    },
  },
};

const sharedArgTypes = {
  children: {
    table: {
      disable: true,
    },
  },
  className: {
    table: {
      disable: true,
    },
  },
  translateWithId: {
    table: {
      disable: true,
    },
  },
};

export const Default = (args) => {
  return (
    <ComboButton {...args} onClick={action('onClick')} label="Primary action">
      <MenuItem
        label="Second action with a long label description"
        onClick={action('onClick')}
      />
      <MenuItem label="Third action" onClick={action('onClick')} />
      <MenuItem label="Fourth action" disabled onClick={action('onClick')} />
      <MenuItemDivider />
      <MenuItem
        label="Danger action"
        kind="danger"
        onClick={action('onClick')}
      />
    </ComboButton>
  );
};

Default.argTypes = { ...sharedArgTypes };

export const ExperimentalAutoAlign = (args) => (
  <div style={{ width: '5000px', height: '5000px' }}>
    <div
      style={{
        position: 'absolute',
        bottom: '20px',
      }}>
      <ComboButton label="Primary action" {...args}>
        <MenuItem label="Second action with a long label description" />
        <MenuItem label="Third action" />
        <MenuItem label="Fourth action" disabled />
      </ComboButton>
    </div>{' '}
  </div>
);

ExperimentalAutoAlign.argTypes = { ...sharedArgTypes };

export const WithDanger = (args) => {
  return (
    <ComboButton label="Primary action" {...args}>
      <MenuItem label="Second action with a long label description" />
      <MenuItem label="Third action" />
      <MenuItem label="Fourth action" />
      <MenuItemDivider />
      <MenuItem label="Danger action" kind="danger" />
    </ComboButton>
  );
};

WithDanger.argTypes = { ...sharedArgTypes };

export const WithIcons = (args) => {
  return (
    <ComboButton label="Save record" {...args}>
      <MenuItem label="Save as a copy" renderIcon={CopyFile} />
      <MenuItem label="Export" renderIcon={Export} />
    </ComboButton>
  );
};

WithIcons.argTypes = { ...sharedArgTypes };

export const WithMenuAlignment = () => {
  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <ComboButton label="Bottom" menuAlignment="bottom">
          <MenuItem label="Second action with a long label description" />
          <MenuItem label="Third action" />
          <MenuItem label="Fourth action" disabled />
        </ComboButton>

        <ComboButton label="Bottom start" menuAlignment="bottom-start">
          <MenuItem label="Second action with a long label description" />
          <MenuItem label="Third action" />
          <MenuItem label="Fourth action" disabled />
        </ComboButton>

        <ComboButton label="Bottom end" menuAlignment="bottom-end">
          <MenuItem label="Second action with a long label description" />
          <MenuItem label="Third action" />
          <MenuItem label="Fourth action" disabled />
        </ComboButton>
      </div>

      <div
        style={{
          display: 'flex',
          marginTop: '15rem',
          justifyContent: 'space-between',
        }}>
        <ComboButton label="Top" menuAlignment="top" tooltipAlignment="bottom">
          <MenuItem label="Second action with a long label description" />
          <MenuItem label="Third action" />
          <MenuItem label="Fourth action" disabled />
        </ComboButton>

        <ComboButton
          label="Top start"
          menuAlignment="top-start"
          tooltipAlignment="bottom">
          <MenuItem label="Second action with a long label description" />
          <MenuItem label="Third action" />
          <MenuItem label="Fourth action" disabled />
        </ComboButton>

        <ComboButton
          label="Top end"
          menuAlignment="top-end"
          tooltipAlignment="bottom">
          <MenuItem label="Second action with a long label description" />
          <MenuItem label="Third action" />
          <MenuItem label="Fourth action" disabled />
        </ComboButton>
      </div>
    </>
  );
};
