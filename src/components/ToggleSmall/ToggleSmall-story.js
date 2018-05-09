import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import ToggleSmall from '../ToggleSmall';
import ToggleSmallSkeleton from '../ToggleSmall/ToggleSmall.Skeleton';

const toggleProps = {
  onToggle: action('toggle'),
  className: 'some-class',
  ariaLabel: 'Label Name',
};

storiesOf('ToggleSmall', module)
  .addWithInfo(
    'Default',
    `
      Toggles are controls that are used to quickly switch between two possible states. The example below shows
      an uncontrolled Toggle component. To use the Toggle component as a controlled component, set the toggled property.
      Setting the toggled property will allow you to change the value dynamically, whereas setting the defaultToggled
      prop will only set the value initially. Small toggles may be used when there is not enough space for a regular sized toggle. This issue is most
      commonly found in tables.
    `,
    () => <ToggleSmall {...toggleProps} className="some-class" id="toggle-1" />
  )
  .addWithInfo(
    'skeleton',
    `
    Placeholder skeleton state to use when content is loading.
    `,
    () => <ToggleSmallSkeleton />
  );
