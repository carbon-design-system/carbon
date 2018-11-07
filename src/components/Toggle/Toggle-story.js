import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, text } from '@storybook/addon-knobs';
import Toggle from '../Toggle';
import ToggleSkeleton from '../Toggle/Toggle.Skeleton';

const toggleProps = () => ({
  className: 'some-class',
  labelA: text('Label for untoggled state (labelA)', 'Off'),
  labelB: text('Label for toggled state (labelB)', 'On'),
  onChange: action('onChange'),
  onToggle: action('onToggle'),
});

storiesOf('Toggle', module)
  .addDecorator(withKnobs)
  .add(
    'toggled',
    withInfo({
      text: `
        Toggles are controls that are used to quickly switch between two possible states. The example below shows
        an uncontrolled Toggle component. To use the Toggle component as a controlled component, set the toggled property.
        Setting the toggled property will allow you to change the value dynamically, whereas setting the defaultToggled
        prop will only set the value initially. This example has defaultToggled set to true.
      `,
    })(() => (
      <Toggle
        defaultToggled
        {...toggleProps()}
        className="some-class"
        id="toggle-1"
      />
    ))
  )
  .add(
    'untoggled',
    withInfo({
      text: `
        Toggles are controls that are used to quickly switch between two possible states. The example below shows
        an uncontrolled Toggle component. To use the Toggle component as a controlled component, set the toggled property.
        Setting the toggled property will allow you to change the value dynamically, whereas setting the defaultToggled
        prop will only set the value initially. This example has defaultToggled set to false.
      `,
    })(() => <Toggle {...toggleProps()} className="some-class" id="toggle-1" />)
  )
  .add(
    'skeleton',
    withInfo({
      text: `
        Placeholder skeleton state to use when content is loading.
      `,
    })(() => <ToggleSkeleton />)
  );
