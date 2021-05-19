/**
 * Copyright IBM Corp. 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';

import { withKnobs, text, boolean, number } from '@storybook/addon-knobs';
import ProgressBar from '../ProgressBar';

const props = () => ({
  label: text('Label text (label)', 'Progress bar label'),
  helperText: text('Helper text (helperText)', 'Optional helper text'),
  hideLabel: boolean('Hide the label (hideLabel)', false),
  value: number('Current value (value)', 75),
  max: number('Maximum value (max)', 100),
});

export default {
  title: 'Experimental/unstable_ProgressBar',
  decorators: [withKnobs],

  parameters: {
    component: ProgressBar,
  },
};

export const _ProgressBar = () => (
  <ProgressBar
    label="Progress bar label"
    helperText="Optional helper text"
    value={75}
  />
);
_ProgressBar.storyName = 'ProgressBar';

export const _Indeterminate = () => (
  <ProgressBar label="Progress bar label" helperText="Optional helper text" />
);

export const Playground = () => <ProgressBar {...props()} />;
