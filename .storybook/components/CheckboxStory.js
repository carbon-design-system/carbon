import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import Checkbox from '../../components/Checkbox';

const checkboxEvents = {
  className: 'some-class',
  labelText: 'Checkbox',
  id: 'checkbox-1',
  onChange: action('onChange'),
};

storiesOf('Checkbox', module)
  .addWithInfo(
    'enabled checked',
    `
      Checkboxes are used when there is a list of options and the user may select multiple options, including all or none.
      The example below shows how the Checkbox component can be used as an uncontrolled component that is initially checked
      by setting the defaultChecked property to true. To use the component in a controlled way, you should set the
      checked property instead.
    `,
    () => (
      <Checkbox defaultChecked {...checkboxEvents} />
    ),
  )
  .addWithInfo(
    'enabled unchecked',
    `
      Checkboxes are used when there is a list of options and the user may select multiple options, including all or none.
      The example below shows how the Checkbox component can be used as an uncontrolled component that is initially
      unchecked. To use the component in a controlled way, you should set the checked property instead.
    `,
    () => (
      <Checkbox {...checkboxEvents} />
    )
  )
  .addWithInfo(
    'disabled',
    `
      Checkboxes are used when there is a list of options and the user may select multiple options, including all or none.
      The example below shows a disabled Checkbox component.
    `,
    () => (
      <Checkbox disabled {...checkboxEvents} />
  ));
