import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, text } from '@storybook/addon-knobs';
import ToggleSmall from '../ToggleSmall';
import ToggleSmallSkeleton from '../ToggleSmall/ToggleSmall.Skeleton';

const toggleProps = () => ({
  className: 'some-class',
  ariaLabel: text('ARIA label (ariaLabel)', 'Label Name'),
  onChange: action('onChange'),
  onToggle: action('onToggle'),
});

storiesOf('ToggleSmall', module)
  .addDecorator(withKnobs)
  .add(
    'toggled',
    withInfo({
      text: `
        Toggles are controls that are used to quickly switch between two possible states. The example below shows
        an uncontrolled Toggle component. To use the Toggle component as a controlled component, set the toggled property.
        Setting the toggled property will allow you to change the value dynamically, whereas setting the defaultToggled
        prop will only set the value initially. This example has defaultToggled set to true. Small toggles may be used
        when there is not enough space for a regular sized toggle. This issue is most commonly found in tables.
      `,
    })(() => (
      <ToggleSmall
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
        prop will only set the value initially. This example has defaultToggled set to false. Small toggles may be used
        when there is not enough space for a regular sized toggle. This issue is most commonly found in tables.
      `,
    })(() => (
      <ToggleSmall {...toggleProps()} className="some-class" id="toggle-1" />
    ))
  )
  .add(
    'skeleton',
    withInfo({
      text: `
        Placeholder skeleton state to use when content is loading.
      `,
    })(() => <ToggleSmallSkeleton />)
  );
