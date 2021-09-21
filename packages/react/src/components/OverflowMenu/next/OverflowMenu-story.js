/**
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { ArrowsVertical16 } from '@carbon/icons-react';

import Menu from '../../Menu';
import { StoryFrame, buildMenu } from '../../Menu/_storybook-utils';

import OverflowMenu from './OverflowMenu';

export default {
  title: 'Experimental/unstable_Menu/OverflowMenu',
  parameters: {
    component: Menu,
  },
};

const Story = (items, props = {}) => (
  <StoryFrame>
    <OverflowMenu {...props}>{buildMenu(items)}</OverflowMenu>
  </StoryFrame>
);

export const _OverflowMenu = () =>
  Story([
    { type: 'item', label: 'Stop app' },
    { type: 'item', label: 'Restart app' },
    { type: 'item', label: 'Rename app' },
    { type: 'item', label: 'Edit routes and access' },
    { type: 'divider' },
    { type: 'item', label: 'Delete app', kind: 'danger' },
  ]);

export const CustomIcon = () =>
  Story(
    [
      {
        type: 'radiogroup',
        label: 'Sort by',
        items: ['Name', 'Date created', 'Date last modified', 'Size'],
        initialSelectedItem: 'Date created',
      },
      { type: 'divider' },
      {
        type: 'radiogroup',
        label: 'Sort order',
        items: ['Ascending', 'Descending'],
        initialSelectedItem: 'Descending',
      },
    ],
    {
      renderIcon: ArrowsVertical16,
    }
  );

export const Nested = () =>
  Story([
    { type: 'item', label: 'Level 1' },
    { type: 'item', label: 'Level 1' },
    {
      type: 'item',
      label: 'Level 1',
      children: [
        { type: 'item', label: 'Level 2' },
        { type: 'item', label: 'Level 2' },
        { type: 'item', label: 'Level 2' },
      ],
    },
    { type: 'item', label: 'Level 1' },
  ]);
