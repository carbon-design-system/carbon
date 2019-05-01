/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, text, boolean } from '@storybook/addon-knobs';
import Toggle from '../Toggle';
import ToggleSkeleton from '../Toggle/Toggle.Skeleton';

const toggleProps = () => ({
  className: 'some-class',
  labelText: text('Label for toggle button input', ''),
  labelA: text('Label for untoggled state (labelA)', 'Off'),
  labelB: text('Label for toggled state (labelB)', 'On'),
  disabled: boolean('Disabled (disabled)', false),
  onChange: action('onChange'),
  onToggle: action('onToggle'),
});

storiesOf('Toggle', module)
  .addDecorator(withKnobs)
  .add(
    'toggled',
    () => (
      <Toggle
        defaultToggled
        {...toggleProps()}
        className="some-class"
        id="toggle-1"
      />
    ),
    {
      info: {
        text: `
            Toggles are controls that are used to quickly switch between two possible states. The example below shows
            an uncontrolled Toggle component. To use the Toggle component as a controlled component, set the toggled property.
            Setting the toggled property will allow you to change the value dynamically, whereas setting the defaultToggled
            prop will only set the value initially. This example has defaultToggled set to true.
          `,
      },
    }
  )
  .add(
    'untoggled',
    () => <Toggle {...toggleProps()} className="some-class" id="toggle-1" />,
    {
      info: {
        text: `
            Toggles are controls that are used to quickly switch between two possible states. The example below shows
            an uncontrolled Toggle component. To use the Toggle component as a controlled component, set the toggled property.
            Setting the toggled property will allow you to change the value dynamically, whereas setting the defaultToggled
            prop will only set the value initially. This example has defaultToggled set to false.
          `,
      },
    }
  )
  .add('skeleton', () => <ToggleSkeleton />, {
    info: {
      text: `
            Placeholder skeleton state to use when content is loading.
          `,
    },
  });
