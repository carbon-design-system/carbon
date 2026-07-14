/**
 * Copyright IBM Corp. 2021, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import './story.scss';

import { action } from 'storybook/actions';
import { ActionSet } from '.';
import { actionsOptions, actionsLabels, actionsMapping } from './actions.js';
import mdx from './ActionSet.mdx';
import React from 'react';

const actionsMappingWithLabels = actionsMapping(
  {
    primary: 'Save',
    danger: 'Delete',
    secondary: 'Back',
    secondary2: 'Keep both',
    dangerGhost: 'Abort',
    ghost: 'Cancel',
  },
  action
);

export default {
  title: 'IBM Products/Utilities/ActionSet',
  component: ActionSet,
  parameters: {
    layout: 'centered',
    docs: {
      page: mdx,
    },
  },
  argTypes: {
    actions: {
      control: {
        type: 'select',
        labels: actionsLabels,
      },
      options: actionsOptions,
      mapping: actionsMappingWithLabels,
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg', 'xl', '2xl'],
    },
    buttonSize: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg', 'xl', '2xl'],
    },
    containerWidth: {
      control: { type: 'range', min: 150, max: 800, step: 10 },
      description:
        'Story-only prop: sets the width of the container around the ActionSet.',
    },
  },
};

const renderActionSet = ({ containerWidth, size = 'md', actions, ...rest }) => (
  <div className="sb-action-set-story" style={{ width: containerWidth }}>
    <ActionSet actions={actions} size={size} {...rest} />
  </div>
);

/**
 * Default — a single primary action button in a `md` container.
 */
export const Default = (args) => renderActionSet(args);
Default.args = {
  actions: 1,
  size: 'md',
  containerWidth: 300,
};

/**
 * Two buttons — primary + ghost — fitting side by side in `md` size.
 */
export const TwoButtons = (args) => renderActionSet(args);
TwoButtons.storyName = 'Two buttons';
TwoButtons.args = {
  actions: 5,
  size: 'md',
  containerWidth: 400,
};

/**
 * Three buttons arranged in a row within a `lg` container.
 */
export const ThreeButtons = (args) => renderActionSet(args);
ThreeButtons.storyName = 'Three buttons';
ThreeButtons.args = {
  actions: 7,
  size: 'lg',
  containerWidth: 600,
};

/**
 * Four buttons at `xl` size — quarter-width layout applies.
 */
export const FourButtons = (args) => renderActionSet(args);
FourButtons.storyName = 'Four buttons';
FourButtons.args = {
  actions: 9,
  size: 'xl',
  containerWidth: 700,
};

/**
 * Stacked — at `sm` size the buttons are automatically stacked vertically.
 */
export const Stacked = (args) => renderActionSet(args);
Stacked.storyName = 'Stacked (sm)';
Stacked.args = {
  actions: 4,
  size: 'sm',
  containerWidth: 320,
};
