import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import AppContainer from '../../containers/AppContainer';
import Checkbox from '../../elements/Checkbox';

const checkboxEvents = {
  className: 'some-class',
  labelText: 'Checkbox',
  id: 'checkbox-1',
  onChange: action('onChange')
};

storiesOf('Checkbox', module)
  .addDecorator((story) => (
    <AppContainer>
      {story()}
    </AppContainer>
  ))
  .addWithInfo(
    'enabled checked',
    `
      The example below shows how the Checkbox component can be used as an uncontrolled
      component that is intially checked by setting the defaultChecked property to true. To use the component in a controlled way, you
      should set the checked property instead.
    `,
    () => (
      <Checkbox defaultChecked={true} {...checkboxEvents} />
    ),
  )
  .addWithInfo(
    'enabled unchecked',
    `
      The example below shows how the Checkbox component can be used as an uncontrolled
      component that is intially unchecked. To use the component in a controlled way, you
      should set the checked property instead.
    `,
    () => (
      <Checkbox {...checkboxEvents} />
    )
  )
  .addWithInfo('disabled unchecked', () => (
    <Checkbox disabled {...checkboxEvents} />
  ));
