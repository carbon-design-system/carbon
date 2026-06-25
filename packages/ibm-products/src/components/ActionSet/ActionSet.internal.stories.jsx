/**
 * Copyright IBM Corp. 2021, 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';

import { action } from 'storybook/actions';

import { pkg } from '../../settings';
import { DisplayBox } from '../../global/js/utils/DisplayBox';

import { ActionSet } from '.';
import { actionsOptions, actionsLabels, actionsMapping } from './actions.js';

import styles from './_storybook-styles.scss?inline';

const blockClass = `${pkg.prefix}--action-set`;

export default {
  title: 'Internal/ActionSet',
  component: ActionSet,
  tags: ['autodocs'],
  parameters: {
    styles,
  },
  argTypes: {
    actions: {
      control: {
        type: 'select',
        labels: actionsLabels,
      },
      options: actionsOptions,
      mapping: actionsMapping({}, action),
    },
    containerWidth: {
      control: { type: 'range', min: 150, max: 800, step: 10 },
    },
  },
  decorators: [(story) => <DisplayBox>{story()}</DisplayBox>],
};

// eslint-disable-next-line react/prop-types
const Template = ({ actions, size = 'md', containerWidth, ...args }) => {
  return (
    <div
      className={`${blockClass}__story-container ${blockClass}__story-container--${size}`}
      style={{ width: containerWidth }}
    >
      <ActionSet {...{ actions, size, ...args }} />
    </div>
  );
};

export const actionSet = Template.bind({});
actionSet.args = { actions: 3, containerWidth: 300 };
