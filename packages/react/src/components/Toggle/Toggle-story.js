/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { action } from '@storybook/addon-actions';
import { withKnobs, text, boolean, select } from '@storybook/addon-knobs';
import Toggle from '../Toggle';

const sizes = {
  'Small  (sm)': 'sm',
  'Medium (md) - default': undefined,
};

const toggleProps = () => ({
  labelText: text(
    'Label toggle input control (labelText)',
    'Toggle element label'
  ),
  className: 'some-class',
  labelA: text('Label for untoggled state (labelA)', 'Off'),
  labelB: text('Label for toggled state (labelB)', 'On'),
  disabled: boolean('Disabled (disabled)', false),
  onChange: action('onChange'),
  onToggle: action('onToggle'),
  size: select('Field size (size)', sizes, undefined) || undefined,
});

export default {
  title: 'Components/Toggle',
  decorators: [withKnobs],

  parameters: {
    component: Toggle,
    subcomponents: {},
  },
};

export const Default = () => (
  <>
    <Toggle
      labelText="Toggle (md)"
      size="md"
      labelA="Off"
      labelB="On"
      defaultToggled
      className="some-class"
      id="toggle-1"
    />
    <br />
    <Toggle
      labelText="Toggle (sm)"
      size="sm"
      defaultToggled
      className="some-class"
      id="toggle-2"
    />
  </>
);

export const Playground = () => (
  <Toggle
    defaultToggled
    {...toggleProps()}
    className="some-class"
    id="toggle-3"
  />
);

Default.storyName = 'Toggle';
