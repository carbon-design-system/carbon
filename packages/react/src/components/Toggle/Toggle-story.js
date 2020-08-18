/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { action } from '@storybook/addon-actions';
import { withKnobs, text, boolean } from '@storybook/addon-knobs';
import Toggle from '../Toggle';
import ToggleSkeleton from '../Toggle/Toggle.Skeleton';
import mdx from './Toggle.mdx';

const a11yProps = () => ({
  labelText: text('Label toggle input control (labelText)', ''),
  ['aria-label']: text('ARIA label of the toggle (aria-label)', ''),
});

const toggleProps = () => ({
  ...a11yProps(),
  className: 'some-class',
  labelA: text('Label for untoggled state (labelA)', 'Off'),
  labelB: text('Label for toggled state (labelB)', 'On'),
  disabled: boolean('Disabled (disabled)', false),
  onChange: action('onChange'),
  onToggle: action('onToggle'),
});

export default {
  title: 'Toggle',
  decorators: [withKnobs],

  parameters: {
    component: Toggle,
    docs: {
      page: mdx,
    },
    subcomponents: {
      ToggleSkeleton,
    },
  },
};

export const Toggled = () => (
  <Toggle
    defaultToggled
    {...toggleProps()}
    className="some-class"
    id="toggle-1"
  />
);

Toggled.storyName = 'toggled';

export const Untoggled = () => (
  <Toggle {...toggleProps()} className="some-class" id="toggle-1" />
);

Untoggled.storyName = 'untoggled';

export const Skeleton = () => <ToggleSkeleton {...a11yProps()} />;

Skeleton.storyName = 'skeleton';
