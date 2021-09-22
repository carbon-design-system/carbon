/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { action } from '@storybook/addon-actions';
import { withKnobs, boolean, select } from '@storybook/addon-knobs';
import ContentSwitcher from '../ContentSwitcher';
import Switch from '../Switch';
import mdx from './ContentSwitcher.mdx';

const selectionModes = {
  'Change selection automatically upon focus (automatic)': 'automatic',
  'Change selection on explicit gesture (manual)': 'manual',
};

const sizes = {
  'Small  (sm)': 'sm',
  'Medium (md) - default': undefined,
  'Large  (lg)': 'lg',
};

const props = {
  contentSwitcher: () => ({
    light: boolean('[Deprecated]: Light variant (light)', false),
    selectedIndex: select('Selected index (selectedIndex)', [0, 1, 2], 0),
    selectionMode: select(
      'Selection mode (selectionMode)',
      selectionModes,
      'automatic'
    ),
    size: select('Field size (size)', sizes, undefined) || undefined,
    onChange: action('onChange'),
  }),
  switch: () => ({
    onClick: action('onClick - Switch'),
    disabled: boolean('Disabled (disabled)', false),
  }),
};

export default {
  title: 'Components/ContentSwitcher',
  decorators: [withKnobs],

  parameters: {
    component: ContentSwitcher,

    subcomponents: {
      Switch,
    },
    docs: {
      page: mdx,
    },
  },
};

export const Default = () => (
  <ContentSwitcher onChange={() => {}}>
    <Switch name="one" text="First section" />
    <Switch name="two" text="Second section" />
    <Switch name="three" text="Third section" />
  </ContentSwitcher>
);

Default.story = { name: 'Content Switcher' };

export const ContentSwitcherPlayground = () => {
  const switchProps = props.switch();
  return (
    <ContentSwitcher {...props.contentSwitcher()}>
      <Switch name="one" text="First section" {...switchProps} />
      <Switch name="two" text="Second section" {...switchProps} />
      <Switch name="three" text="Third section" {...switchProps} />
    </ContentSwitcher>
  );
};
