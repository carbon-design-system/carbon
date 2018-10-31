import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { withKnobs, boolean, text } from '@storybook/addon-knobs';
import ToggleSmall from '../ToggleSmall';
import ToggleSmallSkeleton from '../ToggleSmall/ToggleSmall.Skeleton';

const toggleProps = () => ({
  className: 'some-class',
  toggled: boolean('Toggled (toggled)', false),
  ariaLabel: text('ARIA label (ariaLabel)', 'Label Name'),
  onChange: action('onChange'),
  onToggle: action('onToggle'),
});

storiesOf('ToggleSmall', module)
  .addDecorator(withKnobs)
  .add(
    'Default',
    () => (
      <ToggleSmall {...toggleProps()} className="some-class" id="toggle-1" />
    ),
    {
      info: {
        text: `
            Toggles are controls that are used to quickly switch between two possible states. The example below shows
            an uncontrolled Toggle component. To use the Toggle component as a controlled component, set the toggled property.
            Setting the toggled property will allow you to change the value dynamically, whereas setting the defaultToggled
            prop will only set the value initially. Small toggles may be used when there is not enough space for a regular sized toggle. This issue is most
            commonly found in tables.
          `,
      },
    }
  )
  .add('skeleton', () => <ToggleSmallSkeleton />, {
    info: {
      text: `
            Placeholder skeleton state to use when content is loading.
          `,
    },
  });
