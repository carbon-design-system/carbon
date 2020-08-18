/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { action } from '@storybook/addon-actions';
import { withKnobs, text, boolean } from '@storybook/addon-knobs';
import ToggleSmall from '../ToggleSmall';
import ToggleSmallSkeleton from '../ToggleSmall/ToggleSmall.Skeleton';
import mdx from './ToggleSmall.mdx';

const a11yprops = () => ({
  labelText: text('Label toggle input control (labelText)', ''),
  ['aria-label']: text('ARIA label of the toggle (aria-label)', ''),
});

const toggleProps = () => ({
  ...a11yprops(),
  className: 'some-class',
  labelA: text('Label for untoggled state (labelA)', ''),
  labelB: text('Label for toggled state (labelB)', ''),
  disabled: boolean('Disabled (disabled)', false),
  onChange: action('onChange'),
  onToggle: action('onToggle'),
});

export default {
  title: 'ToggleSmall',
  decorators: [withKnobs],

  parameters: {
    component: ToggleSmall,
    docs: {
      page: mdx,
    },
    subcomponents: {
      ToggleSmallSkeleton,
    },
  },
};

export const Toggled = () => (
  <ToggleSmall
    defaultToggled
    {...toggleProps()}
    className="some-class"
    id="toggle-1"
  />
);

Toggled.storyName = 'toggled';

export const Untoggled = () => (
  <ToggleSmall {...toggleProps()} className="some-class" id="toggle-1" />
);

Untoggled.storyName = 'untoggled';

export const Skeleton = () => <ToggleSmallSkeleton {...a11yprops()} />;

Skeleton.storyName = 'skeleton';
