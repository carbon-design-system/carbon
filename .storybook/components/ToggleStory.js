import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import Toggle from '../../components/Toggle';

const toggleProps = {
  onToggle: action('toggle'),
  className: 'some-class',
};

storiesOf('Toggle', module)
  .addWithInfo(
    '',
    `
      Toggles are controls that are used to quickly switch between two possible states. The example below shows
      an uncontrolled Toggle component. To use the Toggle component as a controlled component, set the toggled property.
      Setting the toggled property will allow you to change the value dynamically, whereas setting the defaultToggled
      prop will only set the value initially.
    `,
    () => (
      <Toggle {...toggleProps} className="some-class" id="toggle-1" />
    )
  );
